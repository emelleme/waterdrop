import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';

interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  lives: number;
  level: number;
}

interface Drop {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: number;
  horizontalDrift: number;
  points: number;
}

interface Bucket {
  x: number;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const WaterDropCatcher88: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('waterdrop88-highscore') || '0'),
    lives: 3,
    level: 1
  });
  
  const [bucket, setBucket] = useState<Bucket>({ x: 300, width: 60 });
  const [drops, setDrops] = useState<Drop[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const GRAVITY = 0.5;
  const TERMINAL_VELOCITY = 8;
  const DROP_SPAWN_RATE = 0.02;

  // Device orientation for tilt controls
  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      // iOS 13+ permission request
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission();
      }
      enableTiltControls();
    }
  }, []);

  const enableTiltControls = useCallback(() => {
    window.addEventListener('deviceorientation', (event) => {
      if (gameState.isPlaying && !gameState.isPaused) {
        const gamma = event.gamma || 0;
        const normalizedGamma = Math.max(-30, Math.min(30, gamma)) / 30;
        const newX = (CANVAS_WIDTH / 2) + (normalizedGamma * (CANVAS_WIDTH / 3));
        setBucket(prev => ({ ...prev, x: Math.max(30, Math.min(CANVAS_WIDTH - 30, newX)) }));
      }
    });
  }, [gameState.isPlaying, gameState.isPaused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameState.isPlaying) return;

      setBucket(prev => {
        let newX = prev.x;
        const moveSpeed = 15;
        switch (event.key.toLowerCase()) {
          case 'arrowleft':
          case 'a':
            newX = Math.max(30, prev.x - moveSpeed);
            break;
          case 'arrowright':
          case 'd':
            newX = Math.min(CANVAS_WIDTH - 30, prev.x + moveSpeed);
            break;
          case ' ':
            startGame();
            break;
        }
        return { ...prev, x: newX };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isPlaying]);

  // Main game loop
  const gameLoop = useCallback((currentTime: number) => {
    if (!gameState.isPlaying || gameState.isPaused) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Update drops with realistic physics
    setDrops(prevDrops => {
      const updatedDrops = prevDrops.map(drop => ({
        ...drop,
        velocity: Math.min(drop.velocity + GRAVITY, TERMINAL_VELOCITY),
        x: drop.x + drop.horizontalDrift,
        y: drop.y + drop.velocity,
        horizontalDrift: drop.horizontalDrift + (Math.random() - 0.5) * 0.1
      }));

      // Remove drops that hit the ground
      const groundHits = updatedDrops.filter(drop => drop.y > CANVAS_HEIGHT + drop.size);
      groundHits.forEach(drop => {
        createSplash(drop.x, CANVAS_HEIGHT, drop.size / 8);
        playSound(150, 0.1);
        setGameState(prev => ({
          ...prev,
          lives: Math.max(0, prev.lives - 1),
          level: prev.score > prev.highScore ? Math.floor(prev.score / 100) + 1 : prev.level
        }));
      });

      return updatedDrops.filter(drop => drop.y <= CANVAS_HEIGHT + drop.size);
    });

    // Check for catches
    setDrops(prevDrops => {
      const caughtDrops: Drop[] = [];
      const remainingDrops = prevDrops.filter(drop => {
        if (checkCollision(drop, bucket)) {
          caughtDrops.push(drop);
          return false;
        }
        return true;
      });

      if (caughtDrops.length > 0) {
        const pointsEarned = caughtDrops.reduce((sum, drop) => sum + drop.points, 0);
        setGameState(prev => ({
          ...prev,
          score: prev.score + pointsEarned
        }));
        
        // Play catch sound
        playSound(400 + caughtDrops.length * 100, 0.2, 'triangle');
        
        // Create splash effect
        caughtDrops.forEach(drop => {
          createSplash(bucket.x, CANVAS_HEIGHT - 20, 1);
        });
      }

      return remainingDrops;
    });

    // Update particles
    setParticles(prevParticles => {
      return prevParticles.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        vy: particle.vy + 0.3,
        life: particle.life - 1
      })).filter(particle => particle.life > 0);
    });

    // Spawn new drops
    if (Math.random() < DROP_SPAWN_RATE * (1 + gameState.level * 0.1)) {
      spawnDrop();
    }

    // Check game over
    if (gameState.lives <= 0) {
      setGameState(prev => ({ ...prev, isPlaying: false }));
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, bucket]);

  // Audio effects
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [isMuted]);

  // Create splash particles
  const createSplash = useCallback((x: number, y: number, intensity: number = 1) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < intensity * 8; i++) {
      newParticles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 6 - 2,
        life: 30,
        maxLife: 30
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Spawn water drops with realistic physics
  const spawnDrop = useCallback(() => {
    const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
    const dropSize = size === 'large' ? 16 : size === 'medium' ? 12 : 8;
    const velocity = Math.random() * 2 + 1;
    const horizontalDrift = (Math.random() - 0.5) * 2;
    
    const newDrop: Drop = {
      id: Date.now() + Math.random(),
      x: Math.random() * (CANVAS_WIDTH - dropSize),
      y: -dropSize,
      size: dropSize,
      velocity: velocity,
      horizontalDrift: horizontalDrift,
      points: size === 'large' ? 10 : size === 'medium' ? 15 : 25
    };
    
    setDrops(prev => [...prev, newDrop]);
  }, []);

  // Check collision between drop and bucket
  const checkCollision = useCallback((drop: Drop, bucket: Bucket): boolean => {
    return drop.x + drop.size > bucket.x - bucket.width / 2 &&
           drop.x < bucket.x + bucket.width / 2 &&
           drop.y + drop.size > CANVAS_HEIGHT - 40 &&
           drop.y < CANVAS_HEIGHT;
  }, []);

  // Game control functions
  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      score: 0,
      lives: 3,
      level: 1
    }));
    setDrops([]);
    setParticles([]);
    setBucket({ x: CANVAS_WIDTH / 2, width: 60 });
    lastTimeRef.current = performance.now();
  };

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const resetGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    setDrops([]);
    setParticles([]);
    setBucket({ x: CANVAS_WIDTH / 2, width: 60 });
  };

  // Canvas render function
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a021d';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    skyGradient.addColorStop(0, '#1e3a8a');
    skyGradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw drops
    drops.forEach(drop => {
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.ellipse(
        drop.x + drop.size / 2,
        drop.y + drop.size / 2,
        drop.size / 2,
        drop.size * 0.8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Add highlight
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(
        drop.x + drop.size / 4,
        drop.y + drop.size / 4,
        2,
        2
      );
    });

    // Draw particles
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
      ctx.fillRect(particle.x, particle.y, 3, 3);
    });

    // Draw bucket
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(
      bucket.x - bucket.width / 2,
      CANVAS_HEIGHT - 30,
      bucket.width,
      20
    );

    // Bucket rim
    ctx.fillStyle = '#e879f9';
    ctx.fillRect(
      bucket.x - bucket.width / 2 - 5,
      CANVAS_HEIGHT - 35,
      bucket.width + 10,
      5
    );

    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH / 2, 30);
    ctx.fillText(`Lives: ${gameState.lives}`, CANVAS_WIDTH / 2, 50);
    ctx.fillText(`Level: ${gameState.level}`, CANVAS_WIDTH / 2, 70);
  }, [drops, particles, bucket, gameState]);

  // Update canvas
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Start game loop effect
  useEffect(() => {
    if (gameState.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop, gameState.isPlaying]);

  // Render component
  return (
    <div className="relative h-[600px] w-[800px] border-4 border-cyan-400/50 rounded-lg overflow-hidden shadow-2xl">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="absolute top-0 left-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Game Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <button
          onClick={startGame}
          className={`btn btn-primary ${gameState.isPlaying ? 'btn-sm' : 'btn-lg'}`}
        >
          {gameState.isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
        
        <button
          onClick={pauseGame}
          className="btn btn-warning btn-sm"
          disabled={!gameState.isPlaying}
        >
          <Pause className="w-4 h-4" />
        </button>
        
        <button
          onClick={resetGame}
          className="btn btn-error btn-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="btn btn-ghost btn-sm"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Gyro Permission */}
      {navigator.userAgent.includes('iPhone') && gyroPermission !== 'granted' && (
        <div className="absolute top-4 right-4 z-10 p-2 bg-yellow-500 text-white rounded-lg">
          <button onClick={requestGyroPermission} className="btn btn-sm btn-ghost">
            Enable Tilt Controls
          </button>
        </div>
      )}

      {/* Game Over Overlay */}
      {!gameState.isPlaying && gameState.score > 0 && gameState.lives <= 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
          <div className="text-center text-white p-8 rounded-lg bg-gray-900/90 border border-red-500">
            <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
            <p>Final Score: {gameState.score}</p>
            <button onClick={startGame} className="btn btn-primary mt-4">
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterDropCatcher88;
