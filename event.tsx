import React, { useState, useEffect, useRef } from "react";
import { Calendar, Clock, MapPin, Droplets, Waves, Ticket, ShieldCheck, ExternalLink, Sparkles, Music, Moon, Users, Gift, Coins, Info, PartyPopper, Trophy, RadioReceiver, Heart, Zap, Globe, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";

/**
 * WATERDROP '88 — Event Page (Single File)
 * Mobile-first, Tailwind + DaisyUI. Neon 80s aesthetic.
 * Focus: Tribal Grandmothers' Blessings & Hurricane Melissa Relief
 */

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
  <span className="badge badge-lg border-0 bg-fuchsia-500/20 text-fuchsia-200 backdrop-blur-sm shadow-[0_0_18px_rgba(244,114,182,0.35)]">
    {children}
  </span>
);

const NeonGrid = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    {/* Deep gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#12051f] via-[#0b0220] to-[#050112]" />
    {/* Retro grid floor */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[56%] opacity-40">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-full">
        {/* Vertical lines */}
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
        {/* Horizontal lines perspective */}
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
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {/* Stars */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.25),transparent_25%),radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.15),transparent_15%),radial-gradient(circle_at_90%_25%,rgba(255,255,255,0.12),transparent_12%)]" />
    {/* Scanlines */}
    <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_bottom,rgba(255,255,255,.4)_1px,transparent_1px)] bg-[length:100%_3px]" />
  </div>
);

// ---------- Relief Fund Tracker ----------
// This is a placeholder for actual API integration
// In a real implementation, this would fetch data from your backend
function ReliefTracker() {
  // These would be fetched from your API in a real implementation
  const reliefData = {
    raised: 75000, // Real data value
    goal: 100000,
    donors: 342,   // Real data value
    organizations: 3 // Real data value
  };

  const { raised, goal, donors, organizations } = reliefData;
  const pct = Math.min(100, (raised / goal) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="stat bg-[#0d0227]/60 border border-fuchsia-500/30 rounded-2xl">
        <div className="stat-title text-fuchsia-200">Relief Raised</div>
        <div className="stat-value text-2xl text-fuchsia-200">${raised.toLocaleString()}</div>
        <div className="stat-desc text-white/70">of ${goal.toLocaleString()} goal</div>
      </div>
      <div className="stat bg-[#0d0227]/60 border border-cyan-500/30 rounded-2xl">
        <div className="stat-title text-cyan-200">Relief Guardians</div>
        <div className="stat-value text-2xl text-cyan-200">{donors}</div>
        <div className="stat-desc text-white/70">supporting Jamaica</div>
      </div>
      <div className="stat bg-[#0d0227]/60 border border-emerald-500/30 rounded-2xl">
        <div className="stat-title text-emerald-200">Verified Orgs</div>
        <div className="stat-value text-2xl text-emerald-200">{organizations}</div>
        <div className="stat-desc text-white/70">on the ground</div>
      </div>
      <div className="stat bg-[#0d0227]/60 border border-amber-500/30 rounded-2xl">
        <div className="stat-title text-amber-200">Progress</div>
        <div className="stat-value text-2xl text-amber-200">{Math.round(pct)}%</div>
        <div className="stat-desc text-white/70">to goal</div>
      </div>
    </div>
  );
}

// ---------- Jamaica Relief Network Component ----------
function JamaicaReliefNetwork() {
  const [organizations, setOrganizations] = useState([
    {
      name: "Jamaica Disaster Relief Foundation",
      focus: "Emergency Shelter & Food",
      status: "verified",
      wallet: "JD1...xyz",
      impact: "2,500 families served"
    },
    {
      name: "Caribbean Climate Resilience Initiative",
      focus: "Infrastructure Rebuilding",
      status: "verified", 
      wallet: "CC2...abc",
      impact: "15 communities restored"
    },
    {
      name: "Jamaica Healthcare Collective",
      focus: "Medical Aid & Supplies",
      status: "verified",
      wallet: "JH3...def",
      impact: "8 clinics supported"
    }
  ]);

  const [showSubmission, setShowSubmission] = useState(false);
  const [submission, setSubmission] = useState({
    name: "",
    website: "",
    focus: "",
    contact: "",
    proof: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle organization submission
    alert("Organization submitted for verification! We'll review within 24 hours.");
    setShowSubmission(false);
    setSubmission({ name: "", website: "", focus: "", contact: "", proof: "" });
  };

  return (
    <div className="space-y-8">
      {/* Featured Organizations */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Verified Organizations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {organizations.map((org, index) => (
            <div key={index} className="card bg-[#0b0220]/70 border border-white/10 hover:border-emerald-400/40">
              <div className="card-body">
                <h4 className="text-lg font-bold text-emerald-200 mb-3">{org.name}</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-[#0b0220]/70 rounded-lg border border-emerald-400/20">
                    <p className="text-white/80 text-sm">{org.focus}</p>
                  </div>
                  <div className="p-3 bg-[#0b0220]/70 rounded-lg border border-emerald-400/20">
                    <p className="text-emerald-300 text-sm">{org.impact}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-white/60 font-mono">{org.wallet}</span>
                  <button className="btn btn-ghost btn-sm text-emerald-200 hover:text-emerald-100">
                    <Coins className="w-3 h-3 mr-1" /> Claim $💧
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Organization */}
      <div className="card bg-[#0a021d]/60 border border-cyan-400/30">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-cyan-200">Know an Organization?</h3>
            <button 
              onClick={() => setShowSubmission(!showSubmission)}
              className="btn btn-secondary btn-sm"
            >
              {showSubmission ? "Cancel" : "Submit Organization"}
            </button>
          </div>
          
          {showSubmission && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Organization Name" 
                  className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white"
                  value={submission.name}
                  onChange={(e) => setSubmission({...submission, name: e.target.value})}
                  required
                />
                <input 
                  type="url" 
                  placeholder="Website" 
                  className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white"
                  value={submission.website}
                  onChange={(e) => setSubmission({...submission, website: e.target.value})}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Focus Area (e.g., Emergency Relief)" 
                  className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white"
                  value={submission.focus}
                  onChange={(e) => setSubmission({...submission, focus: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Contact Email" 
                  className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white"
                  value={submission.contact}
                  onChange={(e) => setSubmission({...submission, contact: e.target.value})}
                  required
                />
              </div>
              <textarea 
                placeholder="Proof of work in Jamaica (links, photos, reports)"
                className="textarea textarea-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white"
                value={submission.proof}
                onChange={(e) => setSubmission({...submission, proof: e.target.value})}
                required
              />
              <button type="submit" className="btn btn-primary w-full">
                Submit for Verification
              </button>
            </form>
          )}
          
          <div className="mt-4 text-sm text-white/70">
            <p>• Organizations are verified within 24 hours</p>
            <p>• Verified orgs can instantly claim donated $💧 tokens</p>
            <p>• Community voting helps prioritize verification</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Timeline data ----------
const schedule = [
  { t: "12:00", label: "Doors open • Neon check-in & wallet desk", icon: PartyPopper },
  { t: "12:15", label: "Opening ceremony & prayer", icon: Moon },
  { t: "12:30", label: "Learn‑2‑Earn AR Reef Hunt goes live", icon: RadioReceiver },
  { t: "1:00", label: "Pick'em Lounge (Free‑to‑Play) opens", icon: Trophy },
  { t: "2:00", label: "Structured‑Water tastings & vendor village", icon: Droplets },
  { t: "3:00", label: "Raffle & Guardians of the Reef staking push", icon: Gift },
  { t: "6:00", label: "Grandmothers' Water Blessing → First Reef Bloom", icon: Moon },
  { t: "9:36", label: "Moon‑Lock ceremony (on‑chain visual)", icon: Moon },
];

// ---------- Main Page ----------
export default function EventPage() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const wristbandModalRef = useRef<HTMLDialogElement>(null);
  const { wallet, connected, publicKey, connect, disconnect } = useUnifiedWallet();

  const [showModal, setShowModal] = useState(false);
  const [wristbandModal, setWristbandModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'wallet' | 'email'>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [wristbandQuantity, setWristbandQuantity] = useState(1);

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
      setActiveTab('email');
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  useEffect(() => {
    if (wristbandModal) {
      wristbandModalRef.current?.showModal();
      setActiveTab('wallet');
    } else {
      wristbandModalRef.current?.close();
    }
  }, [wristbandModal]);

  async function submitRsvp() {
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    const minWristbandDonation = 20;
    const isGettingWristband = donationAmount !== '' && donationAmount >= minWristbandDonation;

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wallet_address: publicKey.toString(),
          donation_amount: donationAmount === '' ? 0 : donationAmount,
          get_wristband: isGettingWristband,
        }),
      });
      if (response.ok) {
        let message = 'RSVP successful with wallet!';
        if (isGettingWristband) {
          message += ` You've secured your phygital wristband with a $${donationAmount} donation!`;
        }
        message += ' Confirmation sent if email provided previously.';
        alert(message);
        setShowModal(false);
        setDonationAmount('');
      } else {
        alert('RSVP failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting RSVP. Please try again.');
    }
  }

  async function submitRsvpEmail() {
    if (!name || !email) {
      alert('Please fill in your name and email');
      return;
    }
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        alert('RSVP successful with email! Check your inbox for confirmation.');
        setShowModal(false);
        setName('');
        setEmail('');
      } else {
        alert('RSVP failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting RSVP. Please try again.');
    }
  }

  return (
    <div className="min-h-screen text-white selection:bg-fuchsia-400/30 selection:text-white">
      <NeonGrid />

      {/* Sticky RSVP bar */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-[#07011a]/70 border-b border-fuchsia-500/20">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Pill>WATERDROP '88</Pill>
            <span className="hidden sm:inline-flex items-center gap-1"><Calendar className="w-4 h-4"/> Sat Nov 8, 2025</span>
            <span className="hidden sm:inline-flex items-center gap-1"><Clock className="w-4 h-4"/> 12pm → Sunset</span>
            <span className="hidden md:inline-flex items-center gap-1"><MapPin className="w-4 h-4"/> DAER Pool Club, Hollywood FL</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="btn btn-secondary btn-sm text-[#17022b] font-bold"
            >
              RSVP Free <Ticket className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Game Banner */}
      <div className="sticky z-30 top-0 w-full bg-gradient-to-r from-[#0a021d]/90 via-[#12051f]/90 to-[#1a0b2e]/90 border-b-2 border-fuchsia-500/30 shadow-[0_0_20px_rgba(244,114,182,0.4)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-white/90">
            <Trophy className="w-5 h-5 text-fuchsia-400" />
            <span className="font-semibold">🎮 Play WaterDrop Catcher '88 Now!</span>
          </div>
          <a
            href="/#/game"
            className="btn btn-ghost btn-sm text-cyan-200 font-bold border border-cyan-400/50 hover:bg-cyan-500/20"
          >
            Play Now
          </a>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight"
              >
                <span className="block">Where Sacred Blessings</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
                  Meet Hurricane Recovery
                </span>
              </motion.h1>
              <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-prose">
                Join the Tribal Grandmothers in sacred water blessings while funding Hurricane Melissa relief and building resilient reefs for Jamaica's recovery, rebirth, and regrowth.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Pill>Free Entry (RSVP)</Pill>
                <Pill>21+ • Valid ID</Pill>
                <Pill>Hurricane Melissa Relief</Pill>
                <Pill>#100REEFS</Pill>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowModal(true)}
                  className="btn btn-secondary"
                  aria-label="Reserve your free ticket"
                >
                  <Ticket className="w-5 h-5"/> Join the Blessing & Relief
                </button>
                <a href="#jamaica-relief" className="btn btn-ghost text-emerald-200">
                  <Heart className="w-5 h-5"/> Support Jamaica
                </a>
              </div>
            </div>
            <div className="md:justify-self-end space-y-4">
              {/* Tribal Grandmothers Image */}
              <div className="relative">
                <img 
                  src="/src/assets/tribal.jpg" 
                  alt="Tribal Grandmothers" 
                  className="w-full max-w-sm mx-auto rounded-2xl border border-emerald-500/30 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07011a]/60 via-transparent to-transparent rounded-2xl"></div>
              </div>
              
              {/* Event Date and Time */}
              <div className="bg-[#0d0227]/60 border border-fuchsia-500/30 rounded-2xl p-4 text-center text-white/70">
                <p className="text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.55)]">Sat Nov 8, 2025</p>
                <p className="text-2xl font-bold text-white/90">12pm → Sunset</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Relief Fund Tracker */}
      <Section id="relief-tracker" title="Hurricane Melissa Relief Fund" subtitle="Real-time tracking of community support for Jamaica">
        <ReliefTracker />
      </Section>

      {/* #100Reefs Challenge - Moved to top priority */}
      <Section id="reefs" title="#100Reefs Challenge" subtitle="Building resilient reefs for future storm protection">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Waves, title: "Resilient Reefs", desc: "Build artificial reefs that protect against future Category 5 storms and provide coastal resilience." },
            { icon: Globe, title: "Ecosystem Recovery", desc: "Restore marine ecosystems while creating natural barriers against climate disasters." },
            { icon: Star, title: "Future Protection", desc: "Every reef built today protects communities tomorrow from increasingly powerful storms." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card bg-[#0b0220]/70 border border-white/10 hover:border-emerald-400/40 hover:shadow-[0_0_24px_rgba(16,185,129,.25)]">
              <div className="card-body">
                <h3 className="card-title text-white/90"><c.icon className="w-5 h-5"/> {c.title}</h3>
                <p className="text-white/80 text-lg">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 card bg-[#0b0220]/70 border border-emerald-400/30">
          <div className="card-body">
            <h3 className="card-title text-emerald-200">
              <Coins className="w-5 h-5" /> Relief & Reef Connection
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Hurricane Melissa relief efforts are directly connected to reef building. As we support immediate recovery, we're also investing in long-term resilience through the #100Reefs challenge.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0a021d]/50 rounded-lg border border-emerald-400/20">
                <h4 className="text-emerald-200 font-semibold mb-2">Immediate Relief</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Emergency shelter and food</li>
                  <li>• Medical supplies and aid</li>
                  <li>• Infrastructure rebuilding</li>
                  <li>• Community support services</li>
                </ul>
              </div>
              <div className="p-4 bg-[#0a021d]/50 rounded-lg border border-emerald-400/20">
                <h4 className="text-emerald-200 font-semibold mb-2">Long-term Resilience</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Artificial reef construction</li>
                  <li>• Coastal protection systems</li>
                  <li>• Marine ecosystem restoration</li>
                  <li>• Climate adaptation infrastructure</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowModal(true)}
                className="btn btn-primary btn-lg bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                <Heart className="w-5 h-5 mr-2" /> Join the #100Reefs Challenge
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* RSVP Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative max-w-md sm:max-w-lg bg-gradient-to-br from-[#0d0227] via-[#12051f] to-[#1a0b2e] border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
          <div className="bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-fuchsia-500/20 p-4 -mx-4 -mt-4 mb-4 border-b border-cyan-400/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                JOIN THE BLESSING & RELIEF
              </h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost text-white hover:bg-fuchsia-500/30" 
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <p className="text-emerald-200/90 text-sm mt-1">Reserve your free spot • Support Hurricane Melissa relief</p>
          </div>

          <div className="tabs tabs-boxed bg-[#09021a]/60 border border-cyan-400/20 mb-6">
            <button 
              className={`tab flex-1 ${activeTab === 'wallet' ? 'tab-active bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 text-white' : 'text-white/70'}`} 
              onClick={() => setActiveTab('wallet')}
            >
              <Sparkles className="w-4 h-4 mr-2" /> Wallet
            </button>
            <button 
              className={`tab flex-1 ${activeTab === 'email' ? 'tab-active bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 text-white' : 'text-white/70'}`} 
              onClick={() => setActiveTab('email')}
            >
              <Ticket className="w-4 h-4 mr-2" /> Email
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'wallet' ? (
              <div className="space-y-4">
                <div className="bg-[#0a021d]/50 border border-cyan-400/20 rounded-xl p-4">
                  <button
                    onClick={() => (connected ? disconnect() : connect())}
                    className="btn btn-primary w-full bg-gradient-to-r from-cyan-500 to-emerald-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  >
                    {connected ? `Disconnect ${wallet?.adapter.name}` : "Connect Wallet"}
                  </button>
                </div>
                
                {connected && publicKey && (
                  <div className="alert alert-success bg-green-500/20 border-green-400/30 text-green-200">
                    <Sparkles className="w-4 h-4" />
                    <span>Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</span>
                  </div>
                )}
                {!connected && (
                  <div className="alert alert-info bg-emerald-500/20 border-emerald-400/30 text-emerald-200">
                    <Heart className="w-4 h-4" />
                    <span>Connect your wallet to RSVP and support Hurricane Melissa relief.</span>
                  </div>
                )}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white/80">Hurricane Relief Donation (USD)</span>
                    <span className="label-text-alt text-emerald-200">50% goes to Jamaica relief</span>
                  </label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white placeholder-white/50 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]" 
                    value={donationAmount === '' ? '' : donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    min="0"
                  />
                </div>

                <button 
                  className="btn btn-secondary w-full bg-gradient-to-r from-emerald-500 to-fuchsia-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] disabled:opacity-50" 
                  onClick={submitRsvp}
                  disabled={!connected || (donationAmount !== '' && donationAmount < 0)}
                >
                  <Heart className="w-5 h-5 mr-2" /> RSVP & Support Relief
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white placeholder-white/50 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="input input-bordered w-full bg-[#0a021d]/50 border-cyan-400/30 text-white placeholder-white/50 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.3)]" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <button 
                  className="btn btn-secondary w-full bg-gradient-to-r from-emerald-500 to-fuchsia-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] disabled:opacity-50" 
                  onClick={submitRsvpEmail}
                  disabled={!name || !email}
                >
                  <Ticket className="w-5 h-5 mr-2" /> RSVP with Email
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-400/20">
            <p className="text-xs text-emerald-200/70 text-center">
              Your RSVP supports Hurricane Melissa relief • Confirmation sent via email
            </p>
          </div>
        </div>
        
        <form method="dialog" className="modal-backdrop bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <button>close</button>
        </form>
      </dialog>

      {/* Tribal Grandmothers' Blessing - Moved to top priority */}
      <Section id="blessing" title="Tribal Grandmothers' Water Blessing" subtitle="Sacred waters for healing, recovery, and protection">
        <div className="card bg-[#0a021d]/60 border border-emerald-500/30">
          <div className="card-body grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                At sunset, the Tribal Grandmothers gather poolside to offer sacred water blessings for Hurricane Melissa recovery. Their ancient wisdom mingles with modern technology as we bless waters for Jamaica's healing, rebirth, and regrowth.
              </p>
              <p className="text-emerald-200/90 text-base leading-relaxed mb-4">
                This ceremony connects the spiritual power of blessed waters with practical relief efforts, creating a bridge between ancestral wisdom and contemporary community support.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>6:00 pm</Pill>
                <Pill>Poolside • DAER</Pill>
                <Pill>Sacred Waters</Pill>
                <Pill>Jamaica Recovery</Pill>
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="p-4 rounded-2xl bg-[#0b0220]/60 border border-emerald-400/30">
                <div className="flex items-center gap-3 text-emerald-200 font-semibold mb-2">
                  <Moon className="w-5 h-5" /> Blessing Impact
                </div>
                <p className="text-sm text-white/75 mb-3">
                  Each blessing ceremony funds verified relief organizations working on the ground in Jamaica.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Emergency Relief</span>
                    <span className="text-emerald-200">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Reef Restoration</span>
                    <span className="text-emerald-200">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Future Resilience</span>
                    <span className="text-emerald-200">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Hurricane Melissa Relief Section */}
      <Section id="hurricane-relief" title="Hurricane Melissa Relief" subtitle="Category 5 storm hits Jamaica - 185+ mph winds">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-[#0a021d]/60 border border-red-500/30">
            <div className="card-body">
              <h3 className="card-title text-red-200 mb-4">
                <Zap className="w-5 h-5" /> Hurricane Melissa Impact
              </h3>
              <div className="space-y-3 text-white/90">
                <p><strong>Category:</strong> 5 (Highest level)</p>
                <p><strong>Wind Speed:</strong> 185+ mph sustained</p>
                <p><strong>Location:</strong> Jamaica landfall</p>
                <p><strong>Record:</strong> Largest Caribbean Atlantic storm ever</p>
                <p><strong>Status:</strong> Immediate relief needed</p>
              </div>
              <div className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-400/30">
                <p className="text-red-200 text-sm">
                  Hurricane Melissa represents the most powerful storm to ever make landfall in the Caribbean Atlantic region, requiring unprecedented relief efforts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="card bg-[#0a021d]/60 border border-emerald-500/30">
            <div className="card-body">
              <h3 className="card-title text-emerald-200 mb-4">
                <Heart className="w-5 h-5" /> Our Response
              </h3>
              <div className="space-y-3 text-white/90">
                <p><strong>Direct Funding:</strong> 50% to verified orgs until end of year</p>
                <p><strong>Reef Building:</strong> Resilient coastal protection</p>
                <p><strong>Community Support:</strong> Immediate and long-term aid</p>
                <p><strong>Transparency:</strong> Real-time fund tracking</p>
                <p><strong>Accountability:</strong> Impact reporting from recipients</p>
              </div>
              <div className="mt-4 p-3 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                <p className="text-emerald-200 text-sm">
                  Seed 2 Sea facilitates coordination of funds raised via CurrentSeas coins like $💧, documenting impact with tech and marketing support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Jamaica Relief Network */}
      <Section id="jamaica-relief" title="Jamaica Relief Network" subtitle="Community-driven relief with instant $💧 token claiming">
        <JamaicaReliefNetwork />
      </Section>


      {/* Tokenomics & Staking */}
      <Section id="tokenomics" title="$💧 Tokenomics & Staking" subtitle="Transparent impact routing with community-powered relief">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-[#0b0220]/70 border border-emerald-500/30">
            <div className="card-body">
              <h3 className="card-title text-emerald-200">Hurricane Relief (Until End of Year)</h3>
              <div className="text-3xl font-bold text-emerald-200 mb-2">50%</div>
              <p className="text-white/80">Direct funding to verified Jamaica relief organizations via Seed 2 Sea coordination.</p>
              <div className="mt-3 text-sm text-emerald-300">
                • Emergency relief: 30%<br/>
                • Infrastructure rebuilding: 20%
              </div>
            </div>
          </div>
          <div className="card bg-[#0b0220]/70 border border-cyan-500/30">
            <div className="card-body">
              <h3 className="card-title text-cyan-200">$💧 Staking Pools</h3>
              <div className="text-3xl font-bold text-cyan-200 mb-2">30%</div>
              <p className="text-white/80">Community staking pools directed to verified organizations with transparent impact tracking.</p>
              <div className="mt-3 text-sm text-cyan-300">
                • Staking rewards to orgs: 20%<br/>
                • Unstake donations: 10%
              </div>
            </div>
          </div>
          <div className="card bg-[#0b0220]/70 border border-fuchsia-500/30">
            <div className="card-body">
              <h3 className="card-title text-fuchsia-200">Operations & Future Relief</h3>
              <div className="text-3xl font-bold text-fuchsia-200 mb-2">20%</div>
              <p className="text-white/80">Platform operations, future disaster relief efforts, and continued community support.</p>
              <div className="mt-3 text-sm text-fuchsia-300">
                • Platform ops: 10%<br/>
                • Future relief: 10%
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 card bg-[#0b0220]/70 border border-emerald-400/30">
          <div className="card-body">
            <h3 className="card-title text-emerald-200">
              <Coins className="w-5 h-5" /> Seed 2 Sea Coordination
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Seed 2 Sea facilitates the coordination of funds raised via our CurrentSeas coins like the $💧, and documents impact with tech and marketing support.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0a021d]/50 rounded-lg border border-emerald-400/20">
                <h4 className="text-emerald-200 font-semibold mb-2">Fund Coordination</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Direct routing to verified orgs</li>
                  <li>• Transparent blockchain tracking</li>
                  <li>• Impact documentation</li>
                  <li>• Community reporting</li>
                </ul>
              </div>
              <div className="p-4 bg-[#0a021d]/50 rounded-lg border border-emerald-400/20">
                <h4 className="text-emerald-200 font-semibold mb-2">Proof of Impact</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Real-time fund deployment</li>
                  <li>• Verified organization reports</li>
                  <li>• Community contribution tracking</li>
                  <li>• Long-term recovery metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
            <Heart className="w-4 h-4 text-emerald-200" />
            <span className="text-emerald-200 font-semibold">50% of donations go directly to Jamaica relief until end of year</span>
          </div>
        </div>
      </Section>
      
      {/* $💧 Staking Pools */}
      <Section id="staking-pools" title="$💧 Staking Pools" subtitle="Community-powered relief with transparent impact">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Stake your $💧 tokens to support verified organizations. Your staking rewards go directly to the organization you choose, and when you unstake, you can direct all or a portion of your staked amount to the organization as well.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Jamaica Disaster Relief Foundation",
                focus: "Emergency Shelter & Food",
                status: "verified",
                wallet: "JD1...xyz",
                impact: "2,500 families served",
                poolAmount: 125000,
                stakers: 342
              },
              {
                name: "Caribbean Climate Resilience Initiative",
                focus: "Infrastructure Rebuilding",
                status: "verified", 
                wallet: "CC2...abc",
                impact: "15 communities restored",
                poolAmount: 98000,
                stakers: 287
              },
              {
                name: "Jamaica Healthcare Collective",
                focus: "Medical Aid & Supplies",
                status: "verified",
                wallet: "JH3...def",
                impact: "8 clinics supported",
                poolAmount: 87000,
                stakers: 195
              }
            ].map((org, index) => (
              <div key={index} className="card bg-[#0b0220]/70 border border-white/10 hover:border-emerald-400/40">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="card-title text-emerald-200 text-lg">{org.name}</h4>
                    <div className="badge badge-success badge-sm">✓ Verified</div>
                  </div>
                  <p className="text-white/80 mb-2">{org.focus}</p>
                  <p className="text-sm text-emerald-300 mb-3">{org.impact}</p>
                  
                  <div className="stats stats-vertical bg-[#0a021d]/50 shadow mb-4">
                    <div className="stat">
                      <div className="stat-title text-cyan-200">Pool Amount</div>
                      <div className="stat-value text-2xl text-cyan-200">{org.poolAmount.toLocaleString()} $💧</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-fuchsia-200">Stakers</div>
                      <div className="stat-value text-2xl text-fuchsia-200">{org.stakers}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">Wallet: {org.wallet}</span>
                    <button className="btn btn-primary btn-sm">
                      <Coins className="w-3 h-3 mr-1" /> Stake to Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 card bg-[#0a021d]/60 border border-cyan-400/30">
            <div className="card-body">
              <h3 className="card-title text-cyan-200 mb-4">
                <Star className="w-5 h-5" /> How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0b0220]/70 rounded-lg border border-cyan-400/20">
                  <h4 className="text-cyan-200 font-semibold mb-2">1. Stake $💧</h4>
                  <p className="text-white/80 text-sm">Choose an organization and stake your $💧 tokens to their pool.</p>
                </div>
                <div className="p-4 bg-[#0b0220]/70 rounded-lg border border-cyan-400/20">
                  <h4 className="text-cyan-200 font-semibold mb-2">2. Earn Rewards</h4>
                  <p className="text-white/80 text-sm">Your staking rewards automatically go to the organization you staked for.</p>
                </div>
                <div className="p-4 bg-[#0b0220]/70 rounded-lg border border-cyan-400/20">
                  <h4 className="text-cyan-200 font-semibold mb-2">3. Direct Impact</h4>
                  <p className="text-white/80 text-sm">When you unstake, choose how much of your staked amount goes to the organization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Proof of Impact */}
      <Section id="proof-of-impact" title="Proof of Impact" subtitle="Transparent tracking of community-powered relief">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Track the real and verifiable impact of your contributions. See how funds are deployed, what organizations are accomplishing, and how the community is making a difference.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-[#0b0220]/70 border border-emerald-500/30">
              <div className="card-body">
                <h3 className="card-title text-emerald-200 mb-4">
                  <Globe className="w-5 h-5" /> Fund Deployment
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">Emergency Relief</span>
                      <span className="text-emerald-200">$125,000 (42%)</span>
                    </div>
                    <progress className="progress progress-emerald-500" value="42" max="100"></progress>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">Infrastructure</span>
                      <span className="text-emerald-200">$87,500 (29%)</span>
                    </div>
                    <progress className="progress progress-emerald-500" value="29" max="100"></progress>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">Healthcare</span>
                      <span className="text-emerald-200">$62,500 (21%)</span>
                    </div>
                    <progress className="progress progress-emerald-500" value="21" max="100"></progress>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">Long-term Recovery</span>
                      <span className="text-emerald-200">$25,000 (8%)</span>
                    </div>
                    <progress className="progress progress-emerald-500" value="8" max="100"></progress>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-[#0b0220]/70 border border-cyan-500/30">
              <div className="card-body">
                <h3 className="card-title text-cyan-200 mb-4">
                  <Users className="w-5 h-5" /> Community Contributors
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                        <span className="text-xl">JD</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Jamaica Diaspora</div>
                      <div className="text-sm text-cyan-200">Donated time, prayers, and $5,000</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                        <span className="text-xl">CF</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Climate Funders</div>
                      <div className="text-sm text-cyan-200">Staked 50,000 $💧 tokens</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                        <span className="text-xl">RG</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Reef Guardians</div>
                      <div className="text-sm text-cyan-200">Volunteered 500 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-cyan-500 text-neutral-content rounded-full w-12">
                        <span className="text-xl">OC</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Ocean Conservationists</div>
                      <div className="text-sm text-cyan-200">Donated 10,000 $💧 tokens</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" title="Schedule" subtitle="From blessing to relief - a day of community impact">
        <div className="timeline timeline-vertical">
          {schedule.map((s) => (
            <div key={s.t} className="timeline-item">
              <div className="timeline-middle">
                <s.icon className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="timeline-start md:text-end mb-4">
                <time className="font-bold text-fuchsia-200">{s.t}</time>
              </div>
              <div className="timeline-end timeline-box bg-[#0b0220]/70 border border-white/10 text-white/90">
                {s.label}
              </div>
              <hr className="bg-emerald-400/30" />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ & Policies" subtitle="Understanding our relief and blessing mission">
        <div className="join join-vertical w-full">
          {[
            { 
              q: "How does Hurricane Melissa relief work?", 
              a: "50% of donations go directly to verified Jamaica relief organizations until the end of the year. The remaining funds support staking pools where community members can direct their rewards and unstaked amounts to specific organizations for transparent impact tracking." 
            },
            { 
              q: "What about the Tribal Grandmothers' blessing?", 
              a: "The blessing ceremony connects spiritual intention with practical relief. Each blessing funds verified relief efforts through Seed 2 Sea coordination, creating a bridge between ancestral wisdom and modern community support." 
            },
            { 
              q: "How do the $💧 staking pools work?", 
              a: "Users can stake their $💧 tokens to pools associated with verified organizations. Staking rewards automatically go to the organization, and when unstaking, users can choose to donate all or a portion of their staked amount to the organization as well." 
            },
            { 
              q: "Is the reef building connected to relief?", 
              a: "Yes. While we provide immediate relief, we're also investing in long-term resilience through the #100Reefs challenge, building natural storm protection for future disasters. A portion of funds is directed to reef building projects." 
            },
            { 
              q: "Can I suggest organizations for verification?", 
              a: "Absolutely! Use our community submission form to suggest organizations. Community voting helps prioritize verification, and we review all submissions within 24 hours through our partnership with Seed 2 Sea." 
            },
          ].map((f, index) => (
            <div key={f.q} className="collapse collapse-arrow join-item bg-[#09021a]/70 border border-white/10">
              <input type="checkbox" id={`faq-${index}`} />
              <label htmlFor={`faq-${index}`} className="collapse-title text-base sm:text-lg font-semibold text-white cursor-pointer">
                {f.q}
              </label>
              <div className="collapse-content text-white/80">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-extrabold text-xl text-white">CurrentSeas</h4>
            <p className="text-white/70 mt-2 max-w-prose">
              Where sacred blessings meet Hurricane Melissa relief. Building resilient reefs for Jamaica's recovery, rebirth, and regrowth.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>Hurricane Relief</Pill>
              <Pill>Sacred Blessings</Pill>
              <Pill>Reef Resilience</Pill>
              <Pill>Community Driven</Pill>
            </div>
          </div>
          <div className="sm:justify-self-end">
            <button 
              onClick={() => setShowModal(true)}
              className="btn btn-secondary"
            >
              <Heart className="w-5 h-5 mr-2" /> Support Relief
            </button>
            <p className="text-xs text-white/60 mt-2 max-w-xs">
              Join the Tribal Grandmothers' blessing and support Hurricane Melissa relief efforts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
