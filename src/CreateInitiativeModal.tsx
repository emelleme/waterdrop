import React, { useState } from "react";
import { 
  X, Building, Shield, Timer, Target, Coins, TrendingUp, 
  Calendar, MapPin, Users, Zap, CheckCircle, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateInitiativeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Basic Info
  initiativeName: string;
  organizationName: string;
  description: string;
  category: string;
  location: string;
  
  // DeFi Configuration
  defiProtocol: string;
  liquidityAmount: string;
  expectedVolume: string;
  feeTier: string;
  poolType: string;
  
  // Impact & Timeline
  goalAmount: string;
  timeLimit: string;
  impactMetrics: string;
  successCriteria: string;
  
  // Verification
  website: string;
  socialMedia: string;
  verificationDocs: string;
}

const CreateInitiativeModal: React.FC<CreateInitiativeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    initiativeName: "",
    organizationName: "",
    description: "",
    category: "",
    location: "",
    defiProtocol: "raydium",
    liquidityAmount: "",
    expectedVolume: "",
    feeTier: "0.25",
    poolType: "amm",
    goalAmount: "",
    timeLimit: "",
    impactMetrics: "",
    successCriteria: "",
    website: "",
    socialMedia: "",
    verificationDocs: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Initiative submitted:", formData);
    // Here you would typically send the data to your backend
    onClose();
  };

  const steps = [
    { number: 1, title: "Basic Information", icon: Building },
    { number: 2, title: "DeFi Configuration", icon: Coins },
    { number: 3, title: "Impact & Timeline", icon: Target },
    { number: 4, title: "Verification", icon: Shield }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0b0220] border border-emerald-400/30 rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-emerald-400/20">
              <h2 className="text-2xl font-bold text-emerald-200">Create Hope Collective Initiative</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 py-4 border-b border-emerald-400/20">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-white/30 text-white/50'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-emerald-200' : 'text-white/50'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Initiative Name *
                      </label>
                      <input
                        type="text"
                        value={formData.initiativeName}
                        onChange={(e) => handleInputChange('initiativeName', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                        placeholder="Emergency Housing for Storm Victims"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                        placeholder="Jamaica Disaster Relief Foundation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="Describe your initiative and how it will help communities in need..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="">Select Category</option>
                        <option value="emergency-shelter">Emergency Shelter</option>
                        <option value="medical-aid">Medical Aid</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="food-security">Food Security</option>
                        <option value="education">Education</option>
                        <option value="climate-resilience">Climate Resilience</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                        placeholder="Kingston, Jamaica"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: DeFi Configuration */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-4">
                      DeFi Protocol *
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'raydium',
                          name: 'Raydium',
                          subtitle: 'Community Favorite',
                          apr: '0.77% - 76.7%',
                          description: 'Fastest integration, battle-tested'
                        },
                        {
                          id: 'kamino',
                          name: 'Kamino',
                          subtitle: 'Set & Forget',
                          apr: '5% - 25%',
                          description: 'Managed vaults with auto-rebalancing'
                        },
                        {
                          id: 'meteora',
                          name: 'Meteora',
                          subtitle: 'Advanced Analytics',
                          apr: '1% - 50%',
                          description: 'Professional-grade analytics'
                        }
                      ].map((protocol) => (
                        <div
                          key={protocol.id}
                          onClick={() => handleInputChange('defiProtocol', protocol.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.defiProtocol === protocol.id
                              ? 'border-emerald-400 bg-emerald-500/10'
                              : 'border-white/20 hover:border-emerald-400/50'
                          }`}
                        >
                          <h3 className="font-semibold text-emerald-200">{protocol.name}</h3>
                          <p className="text-sm text-cyan-300">{protocol.subtitle}</p>
                          <p className="text-xs text-white/60 mt-1">{protocol.description}</p>
                          <p className="text-xs text-emerald-300 mt-2">APR: {protocol.apr}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Target Liquidity Amount (USD) *
                    </label>
                    <input
                      type="number"
                      value={formData.liquidityAmount}
                      onChange={(e) => handleInputChange('liquidityAmount', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="5000"
                      min="1000"
                    />
                    <p className="text-xs text-white/60 mt-1">Minimum: $1,000 (Community initiatives welcome!)</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Expected Daily Volume (USD) *
                    </label>
                    <input
                      type="number"
                      value={formData.expectedVolume}
                      onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="500"
                    />
                    <p className="text-xs text-white/60 mt-1">Even small volume creates meaningful impact</p>
                  </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Fee Tier
                      </label>
                      <select
                        value={formData.feeTier}
                        onChange={(e) => handleInputChange('feeTier', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="0.25">0.25% (Standard)</option>
                        <option value="0.30">0.30% (Premium)</option>
                        <option value="0.05">0.05% (Low Fee)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Pool Type
                      </label>
                      <select
                        value={formData.poolType}
                        onChange={(e) => handleInputChange('poolType', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="amm">AMM (Automated Market Maker)</option>
                        <option value="clmm">CLMM (Concentrated Liquidity)</option>
                        <option value="vault">Managed Vault</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Impact & Timeline */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-emerald-200 mb-2">
                        Fundraising Goal (USD) *
                      </label>
                      <input
                        type="number"
                        value={formData.goalAmount}
                        onChange={(e) => handleInputChange('goalAmount', e.target.value)}
                        className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                        placeholder="100000"
                      />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Campaign Duration *
                    </label>
                    <select
                      value={formData.timeLimit}
                      onChange={(e) => handleInputChange('timeLimit', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="">Select Duration</option>
                      <option value="3">3 days (Emergency)</option>
                      <option value="7">7 days (Urgent)</option>
                      <option value="14">14 days (Standard)</option>
                      <option value="30">30 days (Extended)</option>
                      <option value="60">60 days (Long-term)</option>
                    </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Impact Metrics *
                    </label>
                    <textarea
                      value={formData.impactMetrics}
                      onChange={(e) => handleInputChange('impactMetrics', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="e.g., Number of families housed, medical supplies delivered, communities protected..."
                    />
                    <p className="text-xs text-white/60 mt-1">Be specific with numbers and timeframes</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Success Criteria *
                    </label>
                    <textarea
                      value={formData.successCriteria}
                      onChange={(e) => handleInputChange('successCriteria', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="Define what success looks like for this initiative..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-amber-200">Verification Required</h3>
                        <p className="text-sm text-white/80 mt-1">
                          All initiatives must be verified to ensure legitimacy and protect community funds.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Organization Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="https://example.org"
                    />
                    <p className="text-xs text-white/60 mt-1">Not required for grassroots community initiatives</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Social Media Presence
                    </label>
                    <input
                      type="text"
                      value={formData.socialMedia}
                      onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="Twitter, Facebook, LinkedIn, etc."
                    />
                    <p className="text-xs text-white/60 mt-1">Active for at least 2 months preferred</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-200 mb-2">
                      Verification Documents
                    </label>
                    <textarea
                      value={formData.verificationDocs}
                      onChange={(e) => handleInputChange('verificationDocs', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0a021d] border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none"
                      placeholder="Registration documents, community endorsements, or other verification materials..."
                    />
                    <p className="text-xs text-white/60 mt-1">Community endorsements acceptable for grassroots initiatives</p>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-emerald-200">Review & Submit</h3>
                        <p className="text-sm text-white/80 mt-1">
                          Once submitted, our team will review your initiative within 24-48 hours and provide feedback or approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-emerald-400/20">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="text-sm text-white/60">
                Step {currentStep} of {steps.length}
              </div>
              
              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
                >
                  Submit Initiative
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateInitiativeModal;
