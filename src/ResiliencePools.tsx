import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, Droplets, Waves, Shield, ExternalLink, 
  Sparkles, Music, Moon, Users, Gift, Coins, Info, PartyPopper, 
  Trophy, RadioReceiver, Heart, Zap, Globe, Star, Timer,
  TrendingUp, Target, Award, CheckCircle, ArrowRight,
  Building, Vote, Hand, Compass, Play, Gauge, Flame,
  TrendingDown, Crown, Gem, Rocket, Anchor
} from "lucide-react";
import { motion } from "framer-motion";

// ---------- Type Definitions ----------
interface RaydiumPool {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  volume24h?: number;
  fee?: number;
  risk: string;
  description: string;
  color: string;
  poolAddress?: string;
  tokenA?: { symbol: string; address: string };
  tokenB?: { symbol: string; address: string };
}

// ---------- Shared visual bits ----------
const Section = ({ id, title, subtitle, children }: any) => (
  <section id={id} className="relative py-12 sm:py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.55)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-lg sm:text-xl font-semibold text-white/90">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }: any) => (
  <span className="badge badge-lg border-0 bg-emerald-500/20 text-emerald-200 backdrop-blur-sm shadow-[0_0_18px_rgba(34,211,238,0.35)]">
    {children}
  </span>
);

const NeonGrid = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-b from-[#12051f] via-[#0b0220] to-[#050112]" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[56%] opacity-40">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-full">
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={(i * 100) / 30}
            y1={0}
            x2={(i * 100) / 30}
            y2={60}
            stroke="url(#gridGrad)"
            strokeWidth="0.2"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={60 - i * (i / 1.9)}
            x2={100}
            y2={60 - i * (i / 1.9)}
            stroke="url(#gridGrad)"
            strokeWidth="0.2"
          />
        ))}
        <defs>
          <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.25),transparent_25%),radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.15),transparent_15%),radial-gradient(circle_at_90%_25%,rgba(255,255,255,0.12),transparent_12%)]" />
    <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_bottom,rgba(255,255,255,.4)_1px,transparent_1px)] bg-[length:100%_3px]" />
  </div>
);

// ---------- Revolutionary Bonding Curve Progress Component ----------
function BondingCurveProgress() {
  const [currentProgress, setCurrentProgress] = useState(8247);
  const targetAmount = 15000;
  const progressPercent = Math.min(100, (currentProgress / targetAmount) * 100);
  
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentProgress(prev => prev + Math.random() * 50);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-gradient-to-r from-[#0b0220] to-[#1a0b2e] border border-emerald-400/30 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-emerald-200 text-xl">
            <Flame className="w-6 h-6 mr-2" /> Revolutionary Bonding Curve Launch
          </h3>
          <div className="flex items-center gap-2 text-amber-200">
            <Target className="w-5 h-5" />
            <span className="font-bold">Phase 1: $15K Target</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/80">Progress to Bonding Curve Launch</span>
            <span className="text-emerald-200 font-bold">
              ${currentProgress.toLocaleString()} / ${targetAmount.toLocaleString()}
            </span>
          </div>
          
          <div className="relative">
            <progress 
              className="progress progress-emerald-500 w-full h-3" 
              value={progressPercent} 
              max="100"
            ></progress>
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-emerald-300">{Math.round(progressPercent)}% Complete</span>
            <span className="text-cyan-200">
              ~${(targetAmount - currentProgress).toLocaleString()} remaining
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
            <div className="text-emerald-200 font-semibold">Early Adopter Benefits</div>
            <div className="text-white/70 text-sm">Favorable pricing + ecosystem rewards</div>
          </div>
          <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
            <div className="text-cyan-200 font-semibold">Volume Growth</div>
            <div className="text-white/70 text-sm">Higher game activity = better yields</div>
          </div>
          <div className="p-3 bg-fuchsia-500/20 rounded-lg border border-fuchsia-400/30">
            <div className="text-fuchsia-200 font-semibold">Impact Multiplication</div>
            <div className="text-white/70 text-sm">Success funds more relief initiatives</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Revolutionary Anchoring Interface ----------
function QuickAnchoringInterface() {
  const [selectedPool, setSelectedPool] = useState('raydium-usdc-sol');
  const [anchorAmount, setAnchorAmount] = useState('');
  const [reliefAllocation, setReliefAllocation] = useState(50);
  const [raydiumPools, setRaydiumPools] = useState<RaydiumPool[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch live Raydium pool data
  useEffect(() => {
    async function fetchRaydiumPools() {
      try {
        setLoading(true);
        const response = await fetch('/api/raydium');
        if (response.ok) {
          const data = await response.json();
          setRaydiumPools(data.pools || []);
        }
      } catch (error) {
        console.error('Failed to fetch Raydium pools:', error);
        // Fallback to default pools
        setRaydiumPools([
          { 
            id: 'raydium-usdc-sol', 
            name: 'USDC-SOL Pool', 
            apy: 12.5, 
            tvl: 2400000,
            risk: 'Low',
            color: 'emerald',
            description: 'Stable yield with deep liquidity'
          },
          { 
            id: 'raydium-sol-mango', 
            name: 'SOL-MANGO Pool', 
            apy: 18.7, 
            tvl: 890000,
            risk: 'Medium',
            color: 'cyan',
            description: 'Higher yield with moderate volatility'
          },
          { 
            id: 'raydium-jup-sol', 
            name: 'JUP-SOL Pool', 
            apy: 22.1, 
            tvl: 1200000,
            risk: 'High',
            color: 'fuchsia',
            description: 'Maximum yield for Hurricane relief'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchRaydiumPools();
  }, []);

  const selectedPoolData = raydiumPools.find(p => p.id === selectedPool) || raydiumPools[0];

  if (loading) {
    return (
      <div className="card bg-[#0b0220]/70 border border-white/10 mb-8">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="card-title text-emerald-200 text-xl">
              <Anchor className="w-6 h-6 mr-2" /> Revolutionary Anchoring System
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-cyan-200 bg-cyan-500/20 px-2 py-1 rounded">Powered by Raydium</span>
              <button className="btn btn-ghost btn-sm text-cyan-200">
                <Heart className="w-4 h-4 mr-1" /> Instant Relief
              </button>
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="text-white/60">Loading Raydium pools...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-[#0b0220]/70 border border-white/10 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title text-emerald-200 text-xl">
            <Anchor className="w-6 h-6 mr-2" /> Revolutionary Anchoring System
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-cyan-200 bg-cyan-500/20 px-2 py-1 rounded">Powered by Raydium</span>
            <button className="btn btn-ghost btn-sm text-cyan-200">
              <Heart className="w-4 h-4 mr-1" /> Instant Relief
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                ⚓ Anchor Amount ($💧)
              </label>
              <input
                type="number"
                placeholder="1000"
                className="input input-bordered w-full bg-[#0a021d]/50 border-emerald-400/30 text-white"
                value={anchorAmount}
                onChange={(e) => setAnchorAmount(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                🏊‍♂️ Raydium Pool Selection
              </label>
              <div className="space-y-2">
                {raydiumPools.map((pool) => (
                  <button
                    key={pool.id}
                    onClick={() => setSelectedPool(pool.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      selectedPool === pool.id
                        ? `border-${pool.color}-400 bg-${pool.color}-500/20`
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className={`font-bold ${selectedPool === pool.id ? `text-${pool.color}-200` : 'text-white'}`}>
                        {pool.name}
                      </div>
                      <div className={`text-sm font-bold ${selectedPool === pool.id ? `text-${pool.color}-300` : 'text-emerald-300'}`}>
                        {pool.apy.toFixed(1)}% APY
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white/60">{pool.description}</span>
                      <span className="text-white/60">TVL: ${(pool.tvl / 1000000).toFixed(1)}M</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                🇯🇲 Jamaica Relief Allocation
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reliefAllocation}
                  onChange={(e) => setReliefAllocation(parseInt(e.target.value))}
                  className="range range-emerald"
                />
                <div className="flex justify-between text-sm text-emerald-200">
                  <span>0%</span>
                  <span className="font-bold">{reliefAllocation}% Jamaica Relief</span>
                  <span>100%</span>
                </div>
                <div className="text-xs text-white/60 text-center mt-1">
                  Remaining {100 - reliefAllocation}% goes to Raydium pool for compound growth
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
              <div className="text-emerald-200 font-semibold text-sm mb-2">⚓ Anchoring Impact</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">To Jamaica Relief:</span>
                  <span className="text-emerald-300">
                    ${(parseFloat(anchorAmount || '0') * reliefAllocation / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">To Raydium Pool:</span>
                  <span className="text-cyan-300">
                    ${(parseFloat(anchorAmount || '0') * (100 - reliefAllocation) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Est. Daily Yield:</span>
                  <span className="text-fuchsia-300">
                    ${(parseFloat(anchorAmount || '0') * (100 - reliefAllocation) / 100 * selectedPoolData.apy / 100 / 365).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
              <div className="text-cyan-200 font-semibold text-sm mb-1">🌊 Revolutionary Model</div>
              <div className="text-xs text-white/80">
                Your anchor creates compound impact: Pool yields fund more relief while your principal grows for future anchoring.
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <button className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold">
            <Anchor className="w-5 h-5 mr-2" /> ⚓ Anchor Now
          </button>
          <button className="btn btn-secondary flex-1 bg-gradient-to-r from-fuchsia-500 to-emerald-500 border-0 text-white font-bold">
            <Heart className="w-5 h-5 mr-2" /> 🇯🇲 Instant Relief
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Mock Data ----------
const activePools = [
  {
    id: 1,
    creator: "Jamaica Disaster Relief Foundation",
    type: "Emergency Shelter",
    title: "Emergency Housing for Storm Displaced Families",
    goal: 50000,
    raised: 32500,
    timeRemaining: "4d 14h 23m",
    participants: 247,
    impact: "150 families housed",
    verified: true,
    urgency: "high",
    tokenReward: 2500,
    currentYield: 18.7,
    stakingEnabled: true
  },
  {
    id: 2,
    creator: "Caribbean Climate Resilience DAO",
    type: "Infrastructure",
    title: "Coastal Protection Barriers Construction",
    goal: 75000,
    raised: 68000,
    timeRemaining: "2d 8h 45m",
    participants: 421,
    impact: "3 communities protected",
    verified: true,
    urgency: "medium",
    tokenReward: 1800,
    currentYield: 15.2,
    stakingEnabled: true
  },
  {
    id: 3,
    creator: "Jamaica Healthcare Collective",
    type: "Medical Aid",
    title: "Mobile Medical Units Deployment",
    goal: 35000,
    raised: 18500,
    timeRemaining: "6d 2h 12m",
    participants: 156,
    impact: "12 clinics supported",
    verified: true,
    urgency: "high",
    tokenReward: 3200,
    currentYield: 22.1,
    stakingEnabled: true
  }
];

// ---------- Pool Card Component ----------
function PoolCard({ pool }: { pool: typeof activePools[0] }) {
  const progress = (pool.raised / pool.goal) * 100;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-[#0b0220]/70 border border-white/10 hover:border-emerald-400/40 hover:shadow-[0_0_24px_rgba(16,185,129,.25)]"
    >
      <div className="card-body">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="badge badge-success badge-sm">✓ Verified</div>
            <span className={`badge ${pool.urgency === 'high' ? 'badge-error' : 'badge-warning'} badge-sm`}>
              {pool.urgency === 'high' ? 'URGENT' : 'ACTIVE'}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/60">{pool.type}</div>
            <div className="text-xs text-emerald-200 flex items-center gap-1">
              <Timer className="w-3 h-3" />
              {pool.timeRemaining}
            </div>
          </div>
        </div>
        
        <h3 className="card-title text-emerald-200 text-lg mb-2">{pool.title}</h3>
        <p className="text-white/80 text-sm mb-1">{pool.creator}</p>
        <p className="text-white/60 text-xs mb-4">{pool.impact}</p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/70">Progress</span>
              <span className="text-emerald-200">${pool.raised.toLocaleString()} / ${pool.goal.toLocaleString()}</span>
            </div>
            <progress className="progress progress-emerald-500" value={progress} max="100"></progress>
            <div className="text-xs text-white/60 mt-1">{Math.round(progress)}% funded</div>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="text-white/70">
              <Users className="w-4 h-4 inline mr-1" />
              {pool.participants} anchors
            </div>
            <div className="text-emerald-200">
              {pool.currentYield}% APY
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold">
              <Anchor className="w-4 h-4 mr-2" /> ⚓ Anchor
            </button>
            <button className="btn btn-secondary bg-gradient-to-r from-fuchsia-500 to-emerald-500 border-0 text-white font-bold">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Main Component ----------
export default function ResiliencePools() {
  const [activeTab, setActiveTab] = useState<'staking' | 'impact' | 'games' | 'community'>('staking');

  return (
    <div className="min-h-screen text-white selection:bg-emerald-400/30 selection:text-white">
      <NeonGrid />

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">
                  Revolutionary Anchoring Hub ⚓
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Where Games Drive Impact • Bonds Multiply Relief • Volume Fuels Jamaica's Recovery
              </p>
              <p className="text-lg text-emerald-200/90 max-w-3xl mx-auto mt-4">
                Play → Anchor → Impact → Repeat • The Future of Community-Powered Disaster Relief
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Revolutionary Bonding Curve Progress */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <BondingCurveProgress />
      </div>

      {/* Revolutionary Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="tabs tabs-boxed bg-[#09021a]/60 border border-emerald-400/20 max-w-2xl mx-auto">
          <button 
            className={`tab flex-1 ${activeTab === 'staking' ? 'tab-active bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-white' : 'text-white/70'}`} 
            onClick={() => setActiveTab('staking')}
          >
            <Anchor className="w-4 h-4 mr-2" /> ⚓ Quick Anchor/Unanchor
          </button>
          <button 
            className={`tab flex-1 ${activeTab === 'impact' ? 'tab-active bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-white' : 'text-white/70'}`} 
            onClick={() => setActiveTab('impact')}
          >
            <TrendingUp className="w-4 h-4 mr-2" /> Impact Tracking
          </button>
          <button 
            className={`tab flex-1 ${activeTab === 'community' ? 'tab-active bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-white' : 'text-white/70'}`} 
            onClick={() => setActiveTab('community')}
          >
            <Users className="w-4 h-4 mr-2" /> Community
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {activeTab === 'staking' && (
          <div className="space-y-8">
            {/* Revolutionary Anchoring Interface */}
            <QuickAnchoringInterface />
            
            {/* Active Initiatives with Staking */}
            <Section title="Active Impact Anchoring" subtitle="⚓ Anchor to verified organizations with instant yield tracking">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePools.map((pool) => (
                  <PoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            </Section>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-8">
            {/* Real-time Impact Tracking */}
            <Section title="Real-Time Impact Tracking" subtitle="See exactly how volume drives relief funding">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-[#0b0220]/70 border border-emerald-500/30">
                  <div className="card-body">
                    <h3 className="card-title text-emerald-200 mb-4">
                      <Globe className="w-5 h-5" /> Live Fund Deployment
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/80">Emergency Relief</span>
                          <span className="text-emerald-200">$142,000 (48%)</span>
                        </div>
                        <progress className="progress progress-emerald-500" value="48" max="100"></progress>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/80">Infrastructure</span>
                          <span className="text-emerald-200">$95,500 (32%)</span>
                        </div>
                        <progress className="progress progress-emerald-500" value="32" max="100"></progress>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/80">Healthcare</span>
                          <span className="text-emerald-200">$45,200 (15%)</span>
                        </div>
                        <progress className="progress progress-emerald-500" value="15" max="100"></progress>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/80">Reef Building</span>
                          <span className="text-emerald-200">$15,100 (5%)</span>
                        </div>
                        <progress className="progress progress-emerald-500" value="5" max="100"></progress>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-[#0b0220]/70 border border-cyan-500/30">
                  <div className="card-body">
                    <h3 className="card-title text-cyan-200 mb-4">
                      <Users className="w-5 h-5" /> Community Impact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                            <span className="text-xl">🎮</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">Game Volume Impact</div>
                          <div className="text-sm text-cyan-200">+$47,230 generated this month</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                            <span className="text-xl">💧</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">⚓ Token Anchoring</div>
                          <div className="text-sm text-cyan-200">$89,450 actively anchored</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="avatar placeholder">
                          <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                            <span className="text-xl">❤️</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">Direct Donations</div>
                          <div className="text-sm text-cyan-200">$23,670 instant impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-8">
            {/* Community Achievements */}
            <Section title="Revolutionary Community" subtitle="Building the future of impact funding together">
              <div className="text-center mb-8">
                <p className="text-white/90 text-lg max-w-3xl mx-auto">
                  We're not just raising funds - we're creating a revolutionary model where every interaction, 
                  every game, every anchor creates compound impact for Jamaica's recovery.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="card bg-[#0b0220]/70 border border-emerald-400/30">
                  <div className="card-body text-center">
                    <Target className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="card-title text-emerald-200 mb-2">Volume-Driven Yields</h3>
                    <p className="text-white/80 text-sm">
                      More activity = higher yields = more funding for relief initiatives
                    </p>
                  </div>
                </div>
                
                <div className="card bg-[#0b0220]/70 border border-cyan-400/30">
                  <div className="card-body text-center">
                    <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="card-title text-cyan-200 mb-2">Community Ownership</h3>
                    <p className="text-white/80 text-sm">
                      Bonding curve success creates aligned incentives for all participants
                    </p>
                  </div>
                </div>
                
                <div className="card bg-[#0b0220]/70 border border-fuchsia-400/30">
                  <div className="card-body text-center">
                    <Heart className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
                    <h3 className="card-title text-fuchsia-200 mb-2">Sustainable Impact</h3>
                    <p className="text-white/80 text-sm">
                      Self-reinforcing ecosystem ensures long-term relief funding
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Call to Action */}
            <Section title="Join the Revolution" subtitle="Be part of the future of community-powered disaster relief">
              <div className="text-center">
                <div className="card bg-gradient-to-r from-[#0b0220] to-[#1a0b2e] border border-emerald-400/30 max-w-2xl mx-auto">
                  <div className="card-body">
                    <h3 className="card-title text-emerald-200 mb-4">
                      <Hand className="w-6 h-6 mr-2" /> Ready to Change Everything?
                    </h3>
                    <p className="text-white/90 text-lg mb-6">
                      Connect your wallet and join thousands of people creating the first volume-driven 
                      disaster relief ecosystem. Every game, every anchor, every interaction multiplies impact.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button className="btn btn-primary btn-lg bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        <Anchor className="w-5 h-5 mr-2" /> ⚓ Start Anchoring
                      </button>
                      <button className="btn btn-secondary btn-lg bg-gradient-to-r from-fuchsia-500 to-emerald-500 border-0 text-white font-bold">
                        <Play className="w-5 h-5 mr-2" /> Play Games
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
