import React from "react";
import { Calendar, Clock, MapPin, Droplets, Waves, Ticket, ShieldCheck, ExternalLink, Sparkles, Music, Moon, Users, Gift, Coins, Info, PartyPopper, Trophy, RadioReceiver } from "lucide-react";
import { motion } from "framer-motion";

/**
 * WATERDROP '88 — Event Page (Single File)
 * Mobile-first, Tailwind + DaisyUI. Neon 80s aesthetic.
 * Drop straight into your site or use as a route component.
 *
 * Notes:
 * - Links point to cseas.fun/waterdrop (update as needed)
 * - "Lineup" placeholders are TBA; swap with confirmed talent
 * - Liquidity Bond visual shows live-looking progress with props/state hooks
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
          <p className="mt-2 text-base sm:text-lg text-white/80">{subtitle}</p>
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

// ---------- Liquidity Bond Visual ----------
function BondMeter({ lockedPct = 68, targetUSD = 100000, lockedUSD = 68000, donors = 342 }: any) {
  const ring = 440; // svg circumference baseline
  const pct = Math.max(0, Math.min(100, lockedPct));
  const dash = (ring * pct) / 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
      <div className="sm:col-span-2 card bg-[#0d0227]/60 border border-fuchsia-500/30 shadow-[0_0_24px_rgba(217,70,239,.25)]">
        <div className="card-body">
          <h3 className="card-title text-fuchsia-200"><Waves className="w-5 h-5"/> Liquidity Bond Status</h3>
          <div className="flex items-center justify-center py-6">
            <svg width="180" height="180" viewBox="0 0 160 160" className="drop-shadow-[0_0_28px_rgba(56,189,248,0.35)]">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="70" stroke="#341053" strokeWidth="14" fill="none" />
              <circle
                cx="80" cy="80" r="70"
                stroke="url(#grad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${ring}`}
                fill="none"
                transform="rotate(-90 80 80)"
              />
              <text x="80" y="86" textAnchor="middle" className="fill-white font-extrabold" style={{ fontSize: 24 }}>{pct}%</text>
            </svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Locked</span>
              <span className="font-semibold text-cyan-200">${lockedUSD.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Target</span>
              <span className="font-semibold text-fuchsia-200">${targetUSD.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Guardians</span>
              <span className="font-semibold text-violet-200">{donors.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4">
            <progress className="progress progress-secondary w-full" value={pct} max="100"/>
            <p className="mt-2 text-xs text-white/70">
              Funds are bonded to #100REEFS build phases. No yield or profit claims; impact-only.
            </p>
          </div>
            <div className="mt-3 flex gap-2">
            <a href="#stake" className="btn btn-secondary btn-sm"><Coins className="w-4 h-4"/> Stake $💧</a>
            <a href="#explorer" className="btn btn-ghost btn-sm text-cyan-200"><ExternalLink className="w-4 h-4"/> View tx on explorer</a>
          </div>
        </div>
      </div>

      <div className="sm:col-span-3 card bg-[#07011a]/60 border border-cyan-500/30 shadow-[0_0_24px_rgba(34,211,238,.2)]">
        <div className="card-body">
          <h3 className="card-title text-cyan-200"><Droplets className="w-5 h-5"/> Bond Curve (illustrative)</h3>
          <p className="text-sm text-white/80">Projection of liquidity vs. time. Inputs update live during the event.</p>
          <div className="mt-3">
            {/* Simple SVG curve */}
            <svg viewBox="0 0 600 220" className="w-full h-[180px]">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <path d="M10 170 C 130 160, 220 120, 300 130 S 500 60, 590 40" fill="none" stroke="url(#line)" strokeWidth="4" />
              {/* grid */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1={i * 100} y1={20} x2={i * 100} y2={200} stroke="#312e81" strokeDasharray="4 6" />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <line key={`h-${i}`} x1={10} y1={40 + i * 40} x2={590} y2={40 + i * 40} stroke="#1f1b4d" strokeDasharray="4 6" />
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="stat bg-base-100/10 rounded-2xl border border-white/10">
              <div className="stat-title text-white/70">Event Swap Volume</div>
              <div className="stat-value text-2xl text-cyan-200">$218k</div>
            </div>
            <div className="stat bg-base-100/10 rounded-2xl border border-white/10">
              <div className="stat-title text-white/70">Moon-Lock ETA</div>
              <div className="stat-value text-2xl text-fuchsia-200">9:36 pm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Timeline data ----------
const schedule = [
  { t: "12:00", label: "Doors open • Neon check-in & wallet desk", icon: PartyPopper },
  { t: "12:30", label: "Learn‑2‑Earn AR Reef Hunt goes live", icon: RadioReceiver },
  { t: "1:00", label: "Pick’em Lounge (Free‑to‑Play) opens", icon: Trophy },
  { t: "2:00", label: "Structured‑Water tastings & vendor village", icon: Droplets },
  { t: "3:00", label: "Rooftop yoga & sound‑healing pulses (hourly)", icon: Waves },
  { t: "5:30–6:00", label: "Grandmothers’ Water Blessing → First Reef Bloom", icon: Moon },
  { t: "7:00", label: "Raffle & Guardians of the Reef staking push", icon: Gift },
  { t: "9:36", label: "Moon‑Lock ceremony (on‑chain visual)", icon: Moon },
];

// ---------- Main Page ----------
export default function EventPage() {
  return (
    <div className="min-h-screen text-white selection:bg-fuchsia-400/30 selection:text-white">
      <NeonGrid />

      {/* Sticky RSVP bar */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-[#07011a]/70 border-b border-fuchsia-500/20">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Pill>WATERDROP ’88</Pill>
            <span className="hidden sm:inline-flex items-center gap-1"><Calendar className="w-4 h-4"/> Sat Nov 8, 2025</span>
            <span className="hidden sm:inline-flex items-center gap-1"><Clock className="w-4 h-4"/> 12pm → Sunset</span>
            <span className="hidden md:inline-flex items-center gap-1"><MapPin className="w-4 h-4"/> DAER Pool Club, Hollywood FL</span>
          </div>
          <a href="https://cseas.fun/waterdrop" className="btn btn-secondary btn-sm text-[#17022b] font-bold">
            RSVP Free <ExternalLink className="w-4 h-4"/>
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
                <span className="block">A Ripple in Time</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
                  WATERDROP ’88
                </span>
              </motion.h1>
              <p className="mt-4 text-lg sm:text-xl text-white/85 max-w-prose">
                An 80s‑themed, tech‑powered, sacred‑water fundraiser you can actually play. Every scan, mint, and dance‑move powers artificial reefs, tribal water programs, and two South‑Florida nonprofits.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Pill>Free Entry (RSVP)</Pill>
                <Pill>21+ • Valid ID</Pill>
                <Pill>#100REEFS</Pill>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://cseas.fun/waterdrop" className="btn btn-secondary">
                  <Ticket className="w-5 h-5"/> Reserve Free Ticket
                </a>
                <a href="#playground" className="btn btn-ghost text-cyan-200">
                  <Waves className="w-5 h-5"/> Explore Phygital Playground
                </a>
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="mockup-window border border-cyan-500/30 bg-[#07011a]/60 shadow-[0_0_30px_rgba(34,211,238,.25)]">
                <div className="p-4">
                  <div className="stats bg-base-100/5 text-primary-content w-full rounded-2xl border border-white/10">
                    <div className="stat">
                      <div className="stat-title text-white/70">Sunset Blessing</div>
                      <div className="stat-value text-2xl text-cyan-200">5:30–6:00 pm</div>
                      <div className="stat-desc text-white/60">Poolside ceremony → First Reef Bloom</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-white/70">Moon‑Lock</div>
                      <div className="stat-value text-2xl text-fuchsia-200">9:36 pm</div>
                      <div className="stat-desc text-white/60">On‑chain visual & thank‑yous</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Narrative */}
      <Section id="about" title="Why we gather" subtitle="Sacred water × neon play × real‑world impact">
        <div className="prose prose-invert max-w-none">
          <p>
            We’re here to be blessed by the Grandmothers, to activate the waters both physically and digitally, and to kick off the first chapter of the #100REEFS challenge. The pool becomes our gameboard; your phone becomes a coral seed; the reef blooms on the big screen as we learn, earn, and plant together.
          </p>
        </div>
      </Section>

      {/* Phygital Playground */}
      <Section id="playground" title="Phygital Playground" subtitle="Scan → Learn → Claim → Plant → Bloom">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: RadioReceiver, title: "Learn‑2‑Earn AR Reef", desc: "Scan short stories posted around the venue. Claim a tiny $💧 drip + a Coral Seed cNFT." },
            { icon: Waves, title: "Plant at Reef Nodes", desc: "Tap NFC buoys to ‘plant’ your seed. Watch the LED wall ripple as the reef blooms." },
            { icon: Coins, title: "Guardians of the Reef", desc: "Stake your $💧 or seed to fund a specific polyp on the Sea Siren Reef build." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card bg-[#0b0220]/70 border border-white/10 hover:border-fuchsia-400/40 hover:shadow-[0_0_24px_rgba(244,114,182,.25)]">
              <div className="card-body">
                <h3 className="card-title text-white/90"><c.icon className="w-5 h-5"/> {c.title}</h3>
                <p className="text-white/80">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="card bg-[#0b0220]/70 border border-cyan-400/30">
            <div className="card-body">
              <h3 className="card-title text-cyan-200"><Trophy className="w-5 h-5"/> Pick’em Lounge (Free‑to‑Play)</h3>
              <p className="text-white/80">
                Make your picks on the day’s slate. Crowd score unlocks donation milestones. We don’t accept or handle wagers; guests may use Hard Rock Bet independently.
              </p>
              <div className="text-xs text-white/60 mt-2">
                No purchase necessary. See Official Rules on the RSVP page. Gamble responsibly.
              </div>
            </div>
          </div>
          <div className="card bg-[#0b0220]/70 border border-fuchsia-400/30">
            <div className="card-body">
              <h3 className="card-title text-fuchsia-200"><Ticket className="w-5 h-5"/> Raffle & Prizes</h3>
              <p className="text-white/80">Structured‑water unit, stay‑cay packages, $💧 airdrops, and more. No purchase necessary. See Official Rules; NPN entry available on site and online.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Blessing */}
      <Section id="blessing" title="Grandmothers’ Water Blessing" subtitle="A quiet, focused moment to activate the waters">
        <div className="card bg-[#0a021d]/60 border border-white/10">
          <div className="card-body grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="text-white/85">
                At sunset we pause the music. The Tribal Grandmothers gather poolside to offer a blessing—mingling sacred waters and intention. As the ceremony completes, the reef blossoms for the first time across the LED wall.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>5:30–6:00 pm</Pill>
                <Pill>Poolside • DAER</Pill>
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="p-4 rounded-2xl bg-[#0b0220]/60 border border-fuchsia-400/30">
                <div className="flex items-center gap-3 text-fuchsia-200 font-semibold"><Moon className="w-5 h-5"/> First Reef Bloom</div>
                <p className="text-sm text-white/75 mt-2">A synchronized LED + on‑screen ripple ushers in the phygital play.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lineup */}
      <Section id="lineup" title="Special Musical Guests & 80s DJs" subtitle="Retro fire all afternoon into sunset">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "TBA – 80s Icon DJ Set", slot: "6:30p • Sunset Stage" },
            { name: "TBA – Live Synthwave", slot: "4:30p • Main Deck" },
            { name: "Resident Neon Selector", slot: "1:30p • Pool Booth" },
            { name: "Surprise Guest MC", slot: "5:15p • Blessing Prelude" },
            { name: "Sound‑Healing Ensemble", slot: "3:00p & 4:00p • Rooftop" },
            { name: "After‑Party Host (Indoor)", slot: "9:30p • Moon‑Lock" },
          ].map((g) => (
            <div key={g.name} className="card bg-[#0a021d]/70 border border-white/10 hover:border-cyan-300/40">
              <div className="card-body">
                <div className="flex items-center gap-2 text-cyan-200 font-semibold"><Music className="w-4 h-4"/> {g.name}</div>
                <div className="text-sm text-white/75">{g.slot}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Wristband */}
      <Section id="wristband" title="Moonlet Wristband ($20 optional)" subtitle="Fast check‑in + preloaded perks for games & mints">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-[#09021a]/70 border border-white/10">
            <div className="card-body">
              <ul className="list-disc list-inside text-white/85 space-y-1">
                <li>$15 in $💧 preloaded for the Phygital Playground</li>
                <li>Auto‑entry for raffle (NPN path available)</li>
                <li>VIP after‑party auto‑stake pass</li>
                <li>100% of wristband revenue to the causes</li>
              </ul>
              <div className="mt-4 flex gap-2">
                <a href="https://cseas.fun/waterdrop" className="btn btn-secondary"><Ticket className="w-5 h-5"/> Add to RSVP</a>
                <a href="#rules" className="btn btn-ghost text-cyan-200"><Info className="w-5 h-5"/> Official Rules</a>
              </div>
            </div>
          </div>
          <div className="card bg-[#09021a]/70 border border-white/10">
            <div className="card-body">
              <h3 className="card-title text-fuchsia-200"><ShieldCheck className="w-5 h-5"/> Door & Policy</h3>
              <p className="text-white/80">21+ only. Valid ID required. Venue dress code applies. We do not accept or handle wagers; guests may use Hard Rock Bet independently. No purchase necessary for raffle or contests.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Bond status */}
      <Section id="bond" title="$💧 Liquidity Bond" subtitle="Impact‑first pool supporting #100REEFS & Sea Siren Reef">
        <BondMeter />
      </Section>

      {/* Tokenomics */}
      <Section id="tokenomics" title="$💧 Tokenomics" subtitle="Optimized for Learn‑2‑Earn & #100REEFS">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-[#0b0220]/70 border border-white/10">
            <div className="card-body">
              <h3 className="card-title text-cyan-200">Supply & Distribution</h3>
              <ul className="list-disc list-inside text-white/85 space-y-1">
                <li><span className="font-semibold">Total Supply:</span> 1,000,000,000 $💧</li>
                <li><span className="font-semibold">Community Rewards (L2E):</span> 40% — streamed to quests & AR hunts over 24 months</li>
                <li><span className="font-semibold">#100REEFS Fund:</span> 20% — multisig, milestone‑based releases to Sea Siren Reef & builds</li>
                <li><span className="font-semibold">Liquidity & MM:</span> 15% — depth, event market ops (LP tokens Moon‑Locked 6 mo)</li>
                <li><span className="font-semibold">Partnerships & Events:</span> 10% — activations, venue collabs, prizes</li>
                <li><span className="font-semibold">Team & Core Contributors:</span> 10% — 36‑mo vest, 12‑mo cliff (monthly)</li>
                <li><span className="font-semibold">Treasury/Reserves:</span> 5% — operations & audits</li>
              </ul>
            </div>
          </div>
          <div className="card bg-[#0b0220]/70 border border-cyan-400/30">
            <div className="card-body">
              <h3 className="card-title text-cyan-200">Impact Fee (tx 1%)</h3>
              <p className="text-white/80">Minimal transfer fee routes impact without pay‑to‑win economics.</p>
              <ul className="list-disc list-inside text-white/85 mt-2 space-y-1">
                <li><span className="font-semibold">0.40%</span> → #100REEFS Fund</li>
                <li><span className="font-semibold">0.30%</span> → L2E Rewards Pool</li>
                <li><span className="font-semibold">0.20%</span> → Liquidity Refill</li>
                <li><span className="font-semibold">0.10%</span> → Ops/Security</li>
              </ul>
              <p className="text-xs text-white/60 mt-2">No yield or profit promises. Pure utility & impact routing.</p>
            </div>
          </div>
          <div className="card bg-[#0b0220]/70 border border-fuchsia-400/30">
            <div className="card-body">
              <h3 className="card-title text-fuchsia-200">Launch Parameters (event)</h3>
              <ul className="list-disc list-inside text-white/85 space-y-1">
                <li><span className="font-semibold">Quote:</span> USDC • <span className="font-semibold">Initial MCAP:</span> $5k</li>
                <li><span className="font-semibold">Graduation MCAP:</span> $75k (≈ $15.39k raised pre‑grad)</li>
                <li><span className="font-semibold">Anti‑Sniping:</span> ON • <span className="font-semibold">Tx Fee:</span> 1%</li>
                <li><span className="font-semibold">LP:</span> auto‑added at graduation; <span className="font-semibold">Moon‑Lock:</span> 6 months</li>
                <li><span className="font-semibold">Vesting:</span> team/partners timelocked (36m; 12m cliff; monthly)</li>
                <li><span className="font-semibold">LP Fee Share:</span> routed to #100REEFS (70%) & ops (30%)</li>
              </ul>
              <div className="alert alert-info mt-3 text-sm">
                <Info className="w-4 h-4"/> Wristband top‑ups buy $💧 at market to avoid custodial handling and keep pricing transparent.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/60">
          $💧 is a community utility token for participation and impact routing. It is not an investment; no expectation of profit. Donations can be made without acquiring tokens.
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" title="Schedule" subtitle="Subject to update; arrive early for onboarding">
        <div className="timeline timeline-vertical">
          {schedule.map((s) => (
            <div key={s.t} className="timeline-item">
              <div className="timeline-middle">
                <s.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="timeline-start md:text-end mb-4">
                <time className="font-bold text-fuchsia-200">{s.t}</time>
              </div>
              <div className="timeline-end timeline-box bg-[#0b0220]/70 border border-white/10 text-white/90">
                {s.label}
              </div>
              <hr className="bg-cyan-400/30" />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="FAQ & Policies" subtitle="The quick answers">
        <div className="join join-vertical w-full">
          {[
            { q: "Is it really free?", a: "Yes. RSVP is required for entry. Optional Moonlet wristband supports the causes and speeds up gameplay." },
            { q: "Do I need crypto?", a: "No. We’ll help you set up a wallet if you want to mint or stake. Cash/card accepted for donations & wristbands." },
            { q: "What about gambling?", a: "Our Pick’em is free‑to‑play. We do not accept or handle wagers. Guests may use Hard Rock Bet independently if they choose." },
            { q: "Is there a no‑purchase‑necessary entry?", a: "Yes. All drawings & promotions include an NPN entry method online and on site; see Official Rules." },
            { q: "Where do donations go?", a: "Seed 2 Sea & We Have 1 Foundation (501(c)(3)), the #100REEFS artificial reef build, and Tribal Grandmothers’ language & water preservation." },
          ].map((f) => (
            <div key={f.q} className="collapse collapse-arrow join-item bg-[#09021a]/70 border border-white/10">
              <input type="checkbox" />
              <div className="collapse-title text-md sm:text-lg font-semibold">{f.q}</div>
              <div className="collapse-content text-white/80"><p>{f.a}</p></div>
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
              Built on the open web. Donations support Seed 2 Sea & We Have 1 Foundation (501(c)(3)).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill>21+ Only</Pill>
              <Pill>No Purchase Necessary</Pill>
              <Pill>#100REEFS</Pill>
            </div>
          </div>
          <div className="sm:justify-self-end">
            <a className="btn btn-secondary" href="https://cseas.fun/waterdrop">
              RSVP Free <ExternalLink className="w-5 h-5"/>
            </a>
            <p className="text-xs text-white/60 mt-2 max-w-xs">
              By entering you agree to venue policies. We do not accept or handle wagers. Gamble responsibly.
            </p>
          </div>
        </div>
        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: "WATERDROP '88 — A Ripple in Time",
              startDate: '2025-11-08T12:00:00-05:00',
              endDate: '2025-11-08T21:30:00-05:00',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              eventStatus: 'https://schema.org/EventScheduled',
              location: {
                '@type': 'Place',
                name: 'DAER Pool Club, Seminole Hard Rock',
                address: '1 Seminole Way, Hollywood, FL'
              },
              image: ['https://cseas.fun/assets/waterdrop-cover.jpg'],
              description:
                'An 80s-themed, tech-powered, sacred-water fundraiser at DAER Pool Club. Learn-2-Earn, phygital reef game, Grandmothers’ Blessing, DJs, and Moon-Lock ceremony.',
              organizer: {
                '@type': 'Organization',
                name: 'CurrentSeas • Seed 2 Sea • We Have 1 Foundation',
                url: 'https://cseas.fun'
              },
              offers: {
                '@type': 'Offer',
                url: 'https://cseas.fun/waterdrop',
                price: 0,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock'
              }
            })
          }}
        />
      </footer>
    </div>
  );
}
