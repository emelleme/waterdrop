import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, MapPin, Droplets, Waves, Shield, ExternalLink, 
  Sparkles, Music, Moon, Users, Gift, Coins, Info, PartyPopper, 
  Trophy, RadioReceiver, Heart, Zap, Globe, Star, Timer,
  TrendingUp, Target, Award, CheckCircle, ArrowRight,
  Building, Vote, Hand, Compass, Play, Gauge, Flame,
  TrendingDown, Crown, Gem, Rocket
} from "lucide-react";
import { motion } from "framer-motion";

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

// ---------- Stretch Goals with Deflationary Mechanics ----------
function StretchGoalsDeflationary() {
  const [currentAmount, setCurrentAmount] = useState(18500);
  
  const stretchGoals = [
    {
      amount: 25000,
      title: "First Deflationary Trigger",
      subtitle: "10% Token Burn Event",
      icon: TrendingDown,
      color: "emerald",
      benefits: [
        "🔥 10% token supply burn",
        "📈 Staking rewards: 20-30% APY",
        "🎮 Advanced AR Reef Hunt unlock",
        "🌍 2x relief funding efficiency"
      ],
      unlocked: currentAmount >= 25000
    },
    {
      amount: 50000,
      title: "Major Deflationary Event",
      subtitle: "15% Additional Supply Reduction",
      icon: Flame,
      color: "cyan",
      benefits: [
        "🔥 15% additional token burn",
        "💎 Rare NFT drops for contributors",
        "🏆 Volume leaderboard rewards",
        "🌊 First reef construction begins"
      ],
      unlocked: currentAmount >= 50000
    },
    {
      amount: 100000,
      title: "Ecosystem Transformation",
      subtitle: "20% Supply Reduction + DAO",
      icon: Crown,
      color: "fuchsia",
      benefits: [
        "🔥 20% massive supply burn",
        "🎯 AI-driven relief distribution",
        "🏝️ 5 reefs simultaneously built",
        "👑 Community governance activation"
      ],
      unlocked: currentAmount >= 100000
    }
  ];

  return (
    <div className="card bg-[#0b0220]/70 border border-amber-400/30 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title text-amber-200 text-xl">
            <Rocket className="w-6 h-6 mr-2" /> Stretch Goals & Deflationary Mechanics
          </h3>
          <div className="text-amber-300 font-bold">
            Current: ${currentAmount.toLocaleString()}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-white/80">
            🎯 <strong>Each milestone triggers deflationary events that increase token value while multiplying relief impact</strong> 🎯
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {stretchGoals.map((goal, index) => (
            <div key={index} className={`p-6 rounded-lg border transition-all ${
              goal.unlocked 
                ? `bg-${goal.color}-500/20 border-${goal.color}-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]`
                : 'bg-[#0a021d]/50 border-white/20'
            }`}>
              <div className="text-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  goal.unlocked 
                    ? `bg-${goal.color}-500/30 border border-${goal.color}-400/50`
                    : 'bg-gray-500/20 border border-gray-400/30'
                }`}>
                  <goal.icon className={`w-8 h-8 ${
                    goal.unlocked ? `text-${goal.color}-300` : 'text-gray-400'
                  }`} />
                </div>
                <h4 className={`font-bold text-lg mb-1 ${
                  goal.unlocked ? `text-${goal.color}-200` : 'text-white/60'
                }`}>
                  ${goal.amount.toLocaleString()}
                </h4>
                <p className={`text-sm font-semibold mb-2 ${
                  goal.unlocked ? `text-${goal.color}-300` : 'text-white/50'
                }`}>
                  {goal.title}
                </p>
                <p className={`text-xs ${
                  goal.unlocked ? `text-${goal.color}-200/80` : 'text-white/40'
                }`}>
                  {goal.subtitle}
                </p>
              </div>
              
              <div className="space-y-2">
                {goal.benefits.map((benefit, idx) => (
                  <div key={idx} className={`text-xs flex items-center gap-2 ${
                    goal.unlocked ? 'text-white/90' : 'text-white/40'
                  }`}>
                    <span className={goal.unlocked ? `text-${goal.color}-300` : 'text-gray-500'}>
                      •
                    </span>
                    {benefit}
                  </div>
                ))}
              </div>
              
              {goal.unlocked && (
                <div className="mt-4 text-center">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-${goal.color}-500/30 border border-${goal.color}-400/50`}>
                    <CheckCircle className="w-3 h-3" />
                    UNLOCKED
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-cyan-500/10 rounded-lg border border-amber-400/20">
          <div className="text-center">
            <div className="text-white/90 font-semibold mb-2">
              💎 Revolutionary Model: Deflationary Relief Funding
            </div>
            <div className="text-amber-200 text-sm">
              Every stretch goal reached creates <strong>compound value</strong> - 
              as we help Jamaica, token holders benefit from decreasing supply and increasing utility.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Volume Impact Meter ----------
function VolumeImpactMeter() {
  const [currentVolume, setCurrentVolume] = useState(85420);
  const [yieldRate, setYieldRate] = useState(8.7);
  
  useEffect(() => {
    // Simulate real-time volume updates
    const interval = setInterval(() => {
      setCurrentVolume(prev => prev + (Math.random() - 0.5) * 1000);
      setYieldRate(prev => Math.max(5, Math.min(25, prev + (Math.random() - 0.5) * 0.5)));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card bg-[#0b0220]/70 border border-cyan-400/30 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-cyan-200 text-xl">
            <Gauge className="w-6 h-6 mr-2" /> Volume-Driven Yield Engine
          </h3>
          <div className="flex items-center gap-2 text-amber-200">
            <Zap className="w-5 h-5" />
            <span className="font-bold">LIVE</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">24h Transaction Volume</span>
              <span className="text-cyan-200 font-bold text-xl">
                ${currentVolume.toLocaleString()}
              </span>
            </div>
            
            <div className="relative">
              <div className="text-sm text-white/60 mb-2">Volume Level</div>
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-fuchsia-500 transition-all duration-1000"
                  style={{ width: `${Math.min(100, (currentVolume / 100000) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Current Yield Rate</span>
              <span className="text-emerald-200 font-bold text-2xl">
                {yieldRate.toFixed(1)}% APY
              </span>
            </div>
            
            <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
              <div className="text-emerald-200 font-semibold text-sm">Yield Multiplier</div>
              <div className="text-white/80 text-sm">
                Volume Boost: +{(yieldRate - 5).toFixed(1)}% 
                <span className="text-emerald-300 ml-2">
                  (from {(currentVolume / 1000).toFixed(0)}K daily volume)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-fuchsia-500/10 rounded-lg border border-emerald-400/20">
          <div className="text-center">
            <div className="text-white/90 font-semibold mb-2">
              🎮 Play Games → Increase Volume → Higher Yields → More Impact for Jamaica
            </div>
            <div className="text-emerald-200 text-sm">
              Every game session, every transaction, every interaction drives more funding to verified relief organizations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Quick Staking Interface ----------
function QuickStakingInterface() {
  const [selectedTerm, setSelectedTerm] = useState('14');
  const [stakeAmount, setStakeAmount] = useState('');
  const [donationPercent, setDonationPercent] = useState(100);
  
  const terms = [
    { days: '7', apy: '12.5%', risk: 'Low', color: 'emerald' },
    { days: '10', apy: '15.2%', risk: 'Medium', color: 'cyan' },
    { days: '14', apy: '18.7%', risk: 'Standard', color: 'fuchsia' }
  ];

  return (
    <div className="card bg-[#0b0220]/70 border border-white/10 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title text-emerald-200 text-xl">
            <Coins className="w-6 h-6 mr-2" /> Quick Staking Interface
          </h3>
          <button className="btn btn-ghost btn-sm text-cyan-200">
            <Heart className="w-4 h-4 mr-1" /> Instant Donation
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                Staking Amount ($💧)
              </label>
              <input
                type="number"
                placeholder="1000"
                className="input input-bordered w-full bg-[#0a021d]/50 border-emerald-400/30 text-white"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                Staking Term
              </label>
              <div className="grid grid-cols-3 gap-2">
                {terms.map((term) => (
                  <button
                    key={term.days}
                    onClick={() => setSelectedTerm(term.days)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      selectedTerm === term.days
                        ? `border-${term.color}-400 bg-${term.color}-500/20 text-${term.color}-200`
                        : 'border-white/20 text-white/70 hover:border-white/40'
                    }`}
                  >
                    <div className="font-bold">{term.days} days</div>
                    <div className="text-xs">{term.apy}</div>
                    <div className="text-xs opacity-75">{term.risk}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">
                Donation to Beneficiaries
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={donationPercent}
                  onChange={(e) => setDonationPercent(parseInt(e.target.value))}
                  className="range range-emerald"
                />
                <div className="flex justify-between text-sm text-emerald-200">
                  <span>0%</span>
                  <span className="font-bold">{donationPercent}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
              <div className="text-emerald-200 font-semibold text-sm mb-2">Estimated Returns</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Daily Yield:</span>
                  <span className="text-emerald-300">
                    ${(parseFloat(stakeAmount || '0') * (selectedTerm === '7' ? 12.5 : selectedTerm === '10' ? 15.2 : 18.7) / 100 / 365).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">To Beneficiaries:</span>
                  <span className="text-emerald-300">
                    ${(parseFloat(stakeAmount || '0') * donationPercent / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <button className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold">
            <Coins className="w-5 h-5 mr-2" /> Stake Now
          </button>
          <button className="btn btn-secondary flex-1 bg-gradient-to-r from-fuchsia-500 to-emerald-500 border-0 text-white font-bold">
            <Heart className="w-5 h-5 mr-2" /> Donate Instant
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Impact Multiplication Visualization ----------
function ImpactMultiplicationViz() {
  return (
    <div className="card bg-gradient-to-r from-[#0b0220] to-[#1a0b2e] border border-emerald-400/30 mb-8">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <h3 className="card-title text-emerald-200 text-xl">
            <Star className="w-6 h-6 mr-2" /> Impact Multiplication
          </h3>
          <div className="text-amber-200 font-bold">
            🔥 The Flywheel Effect
          </div>
        </div>
        
        <div className="grid md:grid-cols-5 gap-4 items-center">
          {[
            { step: "Play Games", icon: Play, color: "fuchsia", desc: "Volume increases" },
            { step: "Higher Yields", icon: TrendingUp, color: "cyan", desc: "Better staking rewards" },
            { step: "More Stakers", icon: Users, color: "emerald", desc: "Ecosystem grows" },
            { step: "Greater Impact", icon: Heart, color: "amber", desc: "More funding to Jamaica" },
            { step: "Loop Continues", icon: ArrowRight, color: "fuchsia", desc: "Self-reinforcing" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`p-4 rounded-full bg-${item.color}-500/20 border border-${item.color}-400/30 mb-3 mx-auto w-16 h-16 flex items-center justify-center`}>
                <item.icon className={`w-8 h-8 text-${item.color}-300`} />
              </div>
              <div className="text-white/90 font-semibold text-sm mb-1">{item.step}</div>
              <div className="text-white/60 text-xs">{item.desc}</div>
              {index < 4 && (
                <ArrowRight className="w-4 h-4 text-emerald-400 mx-auto mt-2" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
          <div className="text-center">
            <div className="text-emerald-200 font-semibold mb-2">
              💡 Revolutionary Model: Every Game Session = More Relief Funding
            </div>
            <div className="text-white/80 text-sm">
              Unlike traditional charity, our volume-driven approach creates <strong>compound impact</strong> - 
              as the ecosystem grows, so does the funding available for Jamaica's recovery.
            </div>
          </div>
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
              {pool.participants} stakers
            </div>
            <div className="text-emerald-200">
              {pool.currentYield}% APY
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold">
              <Coins className="w-4 h-4 mr-2" /> Stake
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
                  Revolutionary Staking Hub
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Where Games Drive Impact • Bonds Multiply Relief • Volume Fuels Jamaica's Recovery
              </p>
              <p className="text-lg text-emerald-200/90 max-w-3xl mx-auto mt-4">
                Play → Stake → Impact → Repeat • The Future of Community-Powered Disaster Relief
              </p>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Revolutionary Bonding Curve Progress */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <BondingCurveProgress />
      </div>

      {/* Stretch Goals with Deflationary Mechanics */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <StretchGoalsDeflationary />
      </div>

      {/* Volume Impact Meter */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <VolumeImpactMeter />
      </div>

      {/* Revolutionary Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="tabs tabs-boxed bg-[#09021a]/60 border border-emerald-400/20 max-w-2xl mx-auto">
          <button 
            className={`tab flex-1 ${activeTab === 'staking' ? 'tab-active bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-white' : 'text-white/70'}`} 
            onClick={() => setActiveTab('staking')}
          >
            <Coins className="w-4 h-4 mr-2" /> Quick Stake/Unstake
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
            {/* Quick Staking Interface */}
            <QuickStakingInterface />
            
            {/* Active Initiatives with Staking */}
            <Section title="Active Impact Staking" subtitle="Stake to verified organizations with instant yield tracking">
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
            {/* Impact Multiplication */}
            <ImpactMultiplicationViz />
            
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
                          <div className="font-bold text-white">Token Staking</div>
                          <div className="text-sm text-cyan-200">$89,450 actively staked</div>
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
                  every game, every stake creates compound impact for Jamaica's recovery.
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
                      disaster relief ecosystem. Every game, every stake, every interaction multiplies impact.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button className="btn btn-primary btn-lg bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        <Coins className="w-5 h-5 mr-2" /> Start Staking
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
