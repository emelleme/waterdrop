import React, { useState } from "react";
import { 
  ChevronDown, ChevronRight, ExternalLink, CheckCircle, AlertCircle, 
  Building, Coins, Target, Shield, Clock, Users, TrendingUp,
  Info, BookOpen, HelpCircle, Star, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-emerald-400/20 rounded-lg mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-500/5 transition-colors"
      >
        <h3 className="text-lg font-semibold text-emerald-200">{title}</h3>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-emerald-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-emerald-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-emerald-400/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FieldGuide: React.FC<{
  field: string;
  description: string;
  requirements: string[];
  tips: string[];
  examples?: string[];
}> = ({ field, description, requirements, tips, examples }) => (
  <div className="bg-[#0a021d]/50 rounded-lg p-4 mb-4 border border-emerald-400/10">
    <h4 className="font-semibold text-emerald-200 mb-2">{field}</h4>
    <p className="text-white/80 text-sm mb-3">{description}</p>
    
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300 font-medium text-sm">Requirements:</span>
        </div>
        <ul className="text-white/70 text-sm ml-6 space-y-1">
          {requirements.map((req, index) => (
            <li key={index}>• {req}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 font-medium text-sm">Pro Tips:</span>
        </div>
        <ul className="text-white/70 text-sm ml-6 space-y-1">
          {tips.map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
      
      {examples && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-medium text-sm">Examples:</span>
          </div>
          <ul className="text-white/70 text-sm ml-6 space-y-1">
            {examples.map((example, index) => (
              <li key={index}>• {example}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const ProtocolComparison: React.FC = () => (
  <div className="grid md:grid-cols-3 gap-4">
    {[
      {
        name: "Raydium",
        subtitle: "Community Favorite",
        bestFor: "Getting started, high volume potential",
        pros: ["Fastest integration", "Battle-tested", "High liquidity", "Strong community"],
        cons: ["Manual management required", "Higher technical knowledge needed"],
        apr: "0.77% - 76.7%",
        liquidity: "$1K - $500K+",
        difficulty: "Intermediate"
      },
      {
        name: "Kamino",
        subtitle: "Set & Forget",
        bestFor: "Passive investors, consistent yields",
        pros: ["Auto-rebalancing", "Managed strategy", "Lower risk", "Professional management"],
        cons: ["Higher fees", "Less control", "Platform risk"],
        apr: "5% - 25%",
        liquidity: "$1K - $200K",
        difficulty: "Beginner"
      },
      {
        name: "Meteora",
        subtitle: "Advanced Analytics",
        bestFor: "Power users, transparency seekers",
        pros: ["Detailed analytics", "Position tracking", "Low fees", "DLMM efficiency"],
        cons: ["Complex setup", "Requires monitoring", "Newer protocol"],
        apr: "1% - 50%",
        liquidity: "$5K - $300K",
        difficulty: "Advanced"
      }
    ].map((protocol) => (
      <div key={protocol.name} className="bg-[#0a021d]/50 rounded-lg p-4 border border-emerald-400/20">
        <h4 className="font-bold text-emerald-200 mb-1">{protocol.name}</h4>
        <p className="text-cyan-300 text-sm mb-3">{protocol.subtitle}</p>
        
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-white/60">Best for:</span>
            <p className="text-white/80">{protocol.bestFor}</p>
          </div>
          
          <div>
            <span className="text-white/60">Expected APR:</span>
            <p className="text-emerald-300 font-medium">{protocol.apr}</p>
          </div>
          
          <div>
            <span className="text-white/60">Liquidity Range:</span>
            <p className="text-white/80">{protocol.liquidity}</p>
          </div>
          
          <div>
            <span className="text-white/60">Difficulty:</span>
            <span className={`font-medium ${
              protocol.difficulty === 'Beginner' ? 'text-green-400' :
              protocol.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {protocol.difficulty}
            </span>
          </div>
          
          <div>
            <span className="text-white/60">Pros:</span>
            <ul className="text-white/70 text-xs mt-1">
              {protocol.pros.map((pro, index) => (
                <li key={index}>• {pro}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <span className="text-white/60">Cons:</span>
            <ul className="text-white/70 text-xs mt-1">
              {protocol.cons.map((con, index) => (
                <li key={index}>• {con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How long does the review process take?",
      answer: "Our team reviews all submissions within 24-48 hours. Emergency initiatives may be fast-tracked for same-day approval."
    },
    {
      question: "What makes an initiative 'verified'?",
      answer: "Verified initiatives have completed our verification process, including documentation review, organization validation, and impact planning assessment."
    },
    {
      question: "Can I modify my initiative after submission?",
      answer: "Minor changes can be made during the review process. Major modifications require re-submission and additional review time."
    },
    {
      question: "What happens if my initiative doesn't reach its goal?",
      answer: "Funds are returned to contributors automatically. You may re-submit with adjusted goals or improved strategy."
    },
    {
      question: "How are DeFi yields calculated?",
      answer: "Yields depend on trading volume, liquidity amount, and market conditions. We provide estimates, but actual returns may vary."
    },
    {
      question: "What support do you provide during the campaign?",
      answer: "We offer ongoing technical support, marketing assistance, impact tracking, and community engagement guidance."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-emerald-400/20 rounded-lg">
          <button
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-500/5 transition-colors"
          >
            <span className="font-medium text-emerald-200">{faq.question}</span>
            {openFaq === index ? (
              <ChevronDown className="w-5 h-5 text-emerald-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-emerald-400" />
            )}
          </button>
          {openFaq === index && (
            <div className="p-4 pt-0 border-t border-emerald-400/20">
              <p className="text-white/80">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function InitiativeCreationGuide() {
  return (
    <div className="min-h-screen text-white selection:bg-emerald-400/30 selection:text-white bg-gradient-to-b from-[#12051f] to-[#0b0220]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">
                Initiative Creation Guide
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Complete documentation for creating successful Hope Collective initiatives
            </p>
          </motion.div>
        </div>

        {/* Quick Start */}
        <CollapsibleSection title="🚀 Quick Start Overview" defaultOpen={true}>
          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-200 mb-2">What is Hope Collective?</h4>
              <p className="text-white/80">
                Hope Collective is a community-powered platform that connects verified organizations with crypto donors 
                through DeFi-powered fundraising initiatives. Each initiative combines traditional charity with modern 
                financial tools to maximize impact and transparency.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#0a021d]/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-200 mb-2">Who Can Create?</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Registered non-profit organizations</li>
                  <li>• Grassroots community groups</li>
                  <li>• Government agencies</li>
                  <li>• Impact-focused DAOs</li>
                  <li>• Local relief organizations</li>
                </ul>
              </div>
              
              <div className="bg-[#0a021d]/50 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-200 mb-2">Review Timeline</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Initial review: 24-48 hours</li>
                  <li>• Emergency fast-track: Same day</li>
                  <li>• Community initiatives: 12-24 hours</li>
                  <li>• Appeals process: 1-2 days</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 1: Basic Information */}
        <CollapsibleSection title="📋 Step 1: Basic Information">
          <div className="space-y-6">
            <FieldGuide
              field="Initiative Name"
              description="A clear, compelling name that describes your initiative and its impact. This will be displayed prominently to potential donors."
              requirements={[
                "Maximum 100 characters",
                "Must be descriptive and specific",
                "Cannot contain special characters or emojis",
                "Must be unique across the platform"
              ]}
              tips={[
                "Include the location or target population",
                "Focus on the positive outcome you'll achieve",
                "Avoid generic names like 'Disaster Relief'",
                "Make it memorable and shareable"
              ]}
              examples={[
                "Emergency Housing for Storm Victims in Kingston",
                "Medical Supplies for Rural Jamaica Clinics",
                "Coastal Protection for Montego Bay Communities"
              ]}
            />
            
            <FieldGuide
              field="Organization Name"
              description="The official name of your organization as registered with relevant authorities. This must match your verification documents."
              requirements={[
                "Must match official registration documents",
                "Maximum 150 characters",
                "No abbreviations unless officially registered",
                "Must be verifiable through public records"
              ]}
              tips={[
                "Use your full legal name",
                "Include 'Foundation', 'Organization', etc. if applicable",
                "Ensure consistency across all platforms",
                "Double-check spelling and formatting"
              ]}
              examples={[
                "Jamaica Disaster Relief Foundation",
                "Caribbean Climate Resilience DAO",
                "Global Healthcare Collective"
              ]}
            />
            
            <FieldGuide
              field="Description"
              description="A comprehensive overview of your initiative including the problem, your solution, methodology, and expected outcomes. This is your story."
              requirements={[
                "Minimum 100 characters",
                "Maximum 2,000 characters",
                "Must explain both problem and solution",
                "Include specific numbers and timelines where possible"
              ]}
              tips={[
                "Be concise but informative",
                "Start with the human impact story",
                "Use concrete examples and specific details",
                "Explain why traditional funding isn't sufficient",
                "Show your organization's credibility and track record",
                "Include how DeFi yields will amplify traditional donations"
              ]}
              examples={[
                "150 families in Kingston lost their homes to recent flooding. Traditional shelters are overcrowded and inadequate. Our initiative provides dignified temporary housing while families rebuild, using DeFi yields to extend funding beyond initial donations.",
                "Eight rural clinics lack essential medical supplies due to supply chain disruptions. Our mobile medical units will deliver life-saving medications and equipment, with sustainable funding through community staking."
              ]}
            />
            
            <FieldGuide
              field="Category"
              description="Select the primary category that best describes your initiative's focus area. This helps donors find and filter relevant causes."
              requirements={[
                "Must select one primary category",
                "Can request additional categories in description",
                "Categories are verified during review process"
              ]}
              tips={[
                "Choose the category with the highest impact percentage",
                "Emergency categories (shelter, medical) receive priority review",
                "Climate resilience initiatives are trending and well-supported",
                "Education initiatives often have the highest donor retention"
              ]}
              examples={[
                "Emergency Shelter: Housing displaced families, rebuilding after disasters",
                "Medical Aid: Healthcare access, medical supplies, mobile clinics",
                "Infrastructure: Building sustainable systems, protection barriers",
                "Climate Resilience: Environmental protection, sustainable practices"
              ]}
            />
            
            <FieldGuide
              field="Location"
              description="The primary geographic area where your initiative will have impact. Be specific about regions, cities, or communities."
              requirements={[
                "Must include country and region/state",
                "Can specify multiple locations if broader impact",
                "Must have operational presence in listed areas"
              ]}
              tips={[
                "Be specific about communities served",
                "Include nearby major cities for context",
                "Consider mentioning cultural or geographic landmarks",
                "If global, specify primary focus regions"
              ]}
              examples={[
                "Kingston and surrounding parishes, Jamaica",
                "Montego Bay coastal communities, Jamaica",
                "Rural areas of Portland and St. Thomas, Jamaica",
                "Caribbean region (focus on Jamaica and Barbados)"
              ]}
            />
          </div>
        </CollapsibleSection>

        {/* Step 2: DeFi Configuration */}
        <CollapsibleSection title="💰 Step 2: DeFi Configuration">
          <div className="space-y-6">
            <div className="bg-[#0a021d]/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-cyan-200 mb-2">Understanding DeFi for Disaster Relief</h4>
              <p className="text-white/80 text-sm">
                DeFi (Decentralized Finance) allows your initiative to earn yield on donated funds, creating sustainable 
                funding that continues working long after initial donations. This means every dollar has compound impact.
              </p>
            </div>
            
            <FieldGuide
              field="DeFi Protocol Selection"
              description="Choose the decentralized finance platform that best fits your technical capacity and yield goals. Each protocol offers different risk/return profiles."
              requirements={[
                "Must select one primary protocol",
                "Can switch protocols after approval if needed",
                "Must demonstrate understanding of chosen protocol"
              ]}
              tips={[
                "Beginner organizations: Start with Kamino for managed approach",
                "Technical teams: Raydium offers highest yield potential",
                "Transparency-focused: Meteora provides detailed analytics",
                "Consider your team's DeFi experience and time availability"
              ]}
            />
            
            <FieldGuide
              field="Target Liquidity Amount"
              description="The total dollar value of funds you plan to have working in the DeFi pool. Higher liquidity generally means lower yields but more stability."
              requirements={[
                "Minimum $1,000 to be viable",
                "Maximum $1,000,000 for standard review",
                "Must be achievable within campaign timeline",
                "Should consider market conditions and protocol limits"
              ]}
              tips={[
                "Community initiatives welcome from $1,000",
                "Start smaller and scale up after proving concept",
                "Consider your organization's capacity to manage funds",
                "Higher amounts require more sophisticated DeFi knowledge",
                "Factor in potential crypto market volatility",
                "Plan for gradual deployment, not all-at-once"
              ]}
              examples={[
                "Community: $1,000 - $10,000 (grassroots initiatives)",
                "Conservative: $10,000 - $50,000 (stable, manageable)",
                "Aggressive: $50,000 - $250,000 (higher risk/reward)",
                "Enterprise: $250,000+ (requires advanced DeFi expertise)"
              ]}
            />
            
            <FieldGuide
              field="Expected Daily Volume"
              description="Your estimated daily trading volume in the liquidity pool. Higher volume means higher yields from swap fees, but also more price volatility."
              requirements={[
                "Must provide realistic estimate based on marketing plan",
                "Should align with liquidity amount (volume/liquidity ratio)",
                "Will be tracked and verified during campaign"
              ]}
              tips={[
                "Volume should be 10-50% of liquidity amount for healthy yields",
                "Community marketing significantly impacts volume",
                "Consider seasonal and cultural factors affecting trading",
                "Plan volume-building activities and partnerships",
                "Lower initial volume is better than unrealistic projections",
                "Even small volume creates meaningful impact"
              ]}
              examples={[
                "Community: $100-$500/day (5% of $5K-$10K liquidity)",
                "Low volume: $500-$2,500/day (10% of $25K liquidity)",
                "Medium volume: $2,000-$10,000/day (20% of $50K liquidity)",
                "High volume: $10,000-$40,000/day (40% of $100K liquidity)"
              ]}
            />
            
            <FieldGuide
              field="Fee Tier"
              description="The percentage fee charged on each trade in your liquidity pool. Lower fees attract more traders but generate less revenue for your initiative."
              requirements={[
                "Must align with chosen protocol's available fee tiers",
                "Cannot be changed after pool creation without migration",
                "Should match expected trader profile and volume goals"
              ]}
              tips={[
                "0.05% attracts high-frequency traders but low margins",
                "0.25% balances trader attraction with yield generation",
                "0.30% maximizes yield but may reduce volume",
                "Consider your target donor and trader audiences"
              ]}
              examples={[
                "Low Fee (0.05%): For high-volume, low-margin strategies",
                "Standard (0.25%): Most common, good balance",
                "Premium (0.30%): For specialized or premium initiatives"
              ]}
            />
            
            <FieldGuide
              field="Pool Type"
              description="The type of liquidity pool mechanism. Different pool types offer varying levels of capital efficiency and yield potential."
              requirements={[
                "Must be supported by chosen DeFi protocol",
                "Different complexity levels and risk profiles",
                "Can be upgraded or migrated later with proper planning"
              ]}
              tips={[
                "AMM: Simple, predictable, good for beginners",
                "CLMM: Higher yields but requires active management",
                "Managed Vault: Professional management with fees",
                "Consider your team's capacity for active management"
              ]}
            />
            
            <div className="mt-6">
              <h4 className="font-semibold text-emerald-200 mb-4">Protocol Comparison</h4>
              <ProtocolComparison />
            </div>
          </div>
        </CollapsibleSection>

        {/* Step 3: Impact & Timeline */}
        <CollapsibleSection title="🎯 Step 3: Impact & Timeline">
          <div className="space-y-6">
            <div className="bg-[#0a021d]/50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-cyan-200 mb-2">Planning for Measurable Impact</h4>
              <p className="text-white/80 text-sm">
                The most successful initiatives have clear, measurable outcomes that can be tracked and communicated 
                to donors. DeFi yields allow you to extend impact beyond the initial funding period.
              </p>
            </div>
            
            <FieldGuide
              field="Fundraising Goal"
              description="The total dollar amount you aim to raise through the Hope Collective campaign. This should cover both immediate needs and sustainable funding."
              requirements={[
                "Must be achievable within selected timeframe",
                "Should include both immediate deployment and DeFi investment",
                "Cannot exceed $5,000,000 without special approval",
                "Must be justified in impact metrics section"
              ]}
              tips={[
                "Set conservative initial goals and expand after success",
                "Include 20-30% buffer for market volatility",
                "Consider multi-phase funding for larger projects",
                "Plan for compound impact through DeFi yields",
                "Factor in campaign and platform fees"
              ]}
              examples={[
                "Emergency: $5,000 - $25,000 (immediate relief)",
                "Standard: $25,000 - $100,000 (comprehensive response)",
                "Large-scale: $100,000 - $500,000 (systemic change)"
              ]}
            />
            
            <FieldGuide
              field="Campaign Duration"
              description="The length of time your initiative will be active for fundraising. Longer campaigns allow for more community building but may reduce urgency."
              requirements={[
                "Minimum 3 days for emergency initiatives",
                "Maximum 60 days for standard initiatives",
                "Can be extended once during campaign with approval",
                "Must align with urgency of need and complexity"
              ]}
              tips={[
                "Emergency situations: 3-7 days for immediate action",
                "Urgent relief: 7-14 days for rapid response",
                "Standard relief: 14-30 days for community building",
                "Infrastructure projects: 30-60 days for comprehensive funding",
                "Consider seasonal and cultural timing factors",
                "Plan launch timing for maximum community engagement"
              ]}
              examples={[
                "Emergency (3-7 days): Urgent shelter, medical aid",
                "Urgent (7-14 days): Rapid disaster response",
                "Standard (14-30 days): Community rebuilding, education",
                "Extended (30-60 days): Infrastructure, long-term planning"
              ]}
            />
            
            <FieldGuide
              field="Impact Metrics"
              description="Specific, measurable outcomes that will result from your initiative. These should be quantifiable and verifiable through third-party sources."
              requirements={[
                "Must include specific numbers and timeframes",
                "Should be verifiable through documentation",
                "Must align with fundraising goal and timeline",
                "Include both immediate and long-term impacts"
              ]}
              tips={[
                "Use SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound",
                "Include direct beneficiaries and indirect impact",
                "Plan for regular impact reporting to donors",
                "Consider leading and lagging indicators",
                "Include cost-per-beneficiary calculations"
              ]}
              examples={[
                "Housing: 'Provide temporary shelter for 150 families (600 individuals) within 30 days, with average shelter duration of 90 days'",
                "Healthcare: 'Deliver medical supplies to 8 rural clinics, serving 12,000 patients over 6 months, reducing healthcare access gaps by 40%'",
                "Infrastructure: 'Install coastal protection for 3 communities (8,000 residents), reducing flood risk by 60% and protecting $2M in property value'"
              ]}
            />
            
            <FieldGuide
              field="Success Criteria"
              description="Clear benchmarks that define what success looks like for your initiative. These help donors understand the specific outcomes they're funding."
              requirements={[
                "Must be specific and measurable",
                "Should include both quantitative and qualitative measures",
                "Must be achievable within campaign timeline",
                "Should demonstrate clear value proposition"
              ]}
              tips={[
                "Define minimum viable success vs. ideal outcomes",
                "Include donor engagement and retention metrics",
                "Plan for impact verification and third-party validation",
                "Consider DeFi yield sustainability metrics",
                "Include community feedback and satisfaction measures"
              ]}
              examples={[
                "Minimum: 80% of fundraising goal reached, 500 unique donors, verified deployment to 100 families",
                "Target: 100% of goal reached, 1,000 unique donors, comprehensive impact report with third-party verification",
                "Stretch: 150% of goal reached, community adoption of DeFi model, replication in 2 additional regions"
              ]}
            />
          </div>
        </CollapsibleSection>

        {/* Step 4: Verification */}
        <CollapsibleSection title="🔒 Step 4: Verification Requirements">
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-200 mb-2">Why Verification Matters</h4>
                  <p className="text-white/80 text-sm">
                    Verification protects both donors and recipients by ensuring legitimacy, transparency, and accountability. 
                    All initiatives undergo thorough review to maintain community trust.
                  </p>
                </div>
              </div>
            </div>
            
            <FieldGuide
              field="Organization Website"
              description="Your official organization website that provides background, leadership, programs, and impact reporting. This establishes credibility and transparency."
              requirements={[
                "Optional for grassroots community initiatives",
                "If provided, must be live and accessible",
                "Should include organization history and leadership",
                "Must have contact information and physical address",
                "Should feature previous work and impact documentation"
              ]}
              tips={[
                "Not required for grassroots organizations",
                "Include staff bios and organizational structure",
                "Showcase previous successful projects with photos and data",
                "Ensure website is mobile-responsive and professional",
                "Update regularly with current activities and results",
                "Include donor recognition and transparency reporting"
              ]}
            />
            
            <FieldGuide
              field="Social Media Presence"
              description="Active social media accounts that demonstrate community engagement and regular communication. This shows transparency and community trust."
              requirements={[
                "Active for at least 2 months preferred",
                "Should have meaningful engagement and followers",
                "Must demonstrate regular communication and updates",
                "Should show community interaction and support"
              ]}
              tips={[
                "Share regular updates about work and impact",
                "Engage authentically with community members",
                "Post photos and videos from the field when possible",
                "Use consistent branding across platforms",
                "Consider LinkedIn for professional credibility",
                "Even small grassroots accounts are welcome"
              ]}
            />
            
            <FieldGuide
              field="Verification Documents"
              description="Official documentation that proves your organization's legitimacy, registration, and authorization to operate in your stated areas."
              requirements={[
                "Community endorsements acceptable for grassroots initiatives",
                "Include official registration documents if available",
                "Provide tax-exempt status if applicable",
                "Must be current and valid",
                "Should be in English or translated by certified translator"
              ]}
              tips={[
                "Community endorsements are perfectly acceptable",
                "Include board of directors or leadership information",
                "Show annual reports or financial statements if available",
                "Provide partnership letters from local organizations",
                "Include photos of team members and operations",
                "Consider third-party certifications (GuideStar, Charity Navigator)"
              ]}
            />
            
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-200 mb-2">Verification Process</h4>
                  <div className="text-white/80 text-sm space-y-2">
                    <p><strong>Stage 1:</strong> Document review (12-24 hours) - We verify all provided documents and information.</p>
                    <p><strong>Stage 2:</strong> Due diligence (12-24 hours) - We research your organization, check references, and validate claims.</p>
                    <p><strong>Stage 3:</strong> Community validation (12 hours) - We review community engagement and social proof.</p>
                    <p><strong>Final:</strong> Approval and onboarding - Successful initiatives receive approval and launch support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* FAQ */}
        <CollapsibleSection title="❓ Frequently Asked Questions">
          <FAQ />
        </CollapsibleSection>

        {/* Getting Help */}
        <CollapsibleSection title="🆘 Getting Help">
          <div className="space-y-4">
            <div className="bg-[#0a021d]/50 rounded-lg p-4">
              <h4 className="font-semibold text-cyan-200 mb-2">Need Assistance?</h4>
              <p className="text-white/80 mb-4">
                Our team is here to help you create a successful initiative. Don't hesitate to reach out with questions.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-emerald-200 font-medium">Email Support</div>
                    <div className="text-white/70 text-sm">initiatives@hopecollective.org</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-emerald-200 font-medium">Community Discord</div>
                    <div className="text-white/70 text-sm">Join our creator community</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-emerald-200 font-medium">Office Hours</div>
                    <div className="text-white/70 text-sm">Tuesdays & Thursdays, 2-4 PM EST</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-emerald-200 font-medium">Resource Library</div>
                    <div className="text-white/70 text-sm">Templates, guides, and best practices</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-200 mb-2">Next Steps</h4>
              <p className="text-white/80 mb-4">
                Ready to create your initiative? Follow these steps for the best chance of approval and success.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span className="text-white/80">Review this documentation thoroughly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span className="text-white/80">Gather all required documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span className="text-white/80">Complete the initiative creation form</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span className="text-white/80">Submit and await review feedback</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <span className="text-white/80">Launch and begin creating impact!</span>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="card bg-gradient-to-r from-[#0b0220] to-[#1a0b2e] border border-emerald-400/30 max-w-2xl mx-auto">
            <div className="card-body">
              <h3 className="card-title text-emerald-200 mb-4">
                <Building className="w-6 h-6 mr-2" /> Ready to Create Your Initiative?
              </h3>
              <p className="text-white/90 text-lg mb-6">
                You've reviewed the documentation, gathered your materials, and understand the process. 
                Now it's time to turn your vision into a Hope Collective initiative.
              </p>
              <button className="btn btn-primary btn-lg bg-gradient-to-r from-emerald-500 to-cyan-500 border-0 text-white font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <ArrowRight className="w-5 h-5 mr-2" /> Start Creating Initiative
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
