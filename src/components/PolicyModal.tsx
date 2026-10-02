import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Truck, RefreshCw, Phone, MapPin, Mail, Award, Clock, CheckCircle2, Box, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PolicyModalProps {
  policyName: string | null;
  isOpen: boolean;
  onClose: () => void;
  trackedOrderCode?: string | null;
  onSelectPolicy?: (policy: string) => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  policyName,
  isOpen,
  onClose,
  trackedOrderCode,
  onSelectPolicy,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [activeTrackingResult, setActiveTrackingResult] = useState<string | null>(null);

  useEffect(() => {
    if (trackedOrderCode) {
      setSearchInput(trackedOrderCode);
      setActiveTrackingResult(trackedOrderCode);
    } else if (policyName === 'Track Order' && !activeTrackingResult) {
      // Default sample order for preview
      setSearchInput('NINE-842109');
      setActiveTrackingResult('NINE-842109');
    }
  }, [trackedOrderCode, policyName]);

  if (!isOpen || !policyName) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveTrackingResult(searchInput.trim().toUpperCase());
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17140F]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#17140F] shadow-2xl p-6 sm:p-10 border border-[#D8CDBD]/60 animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CDBD]/60 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-[1px] bg-[#C9A45C]" />
            <h3 className="font-serif text-2xl font-medium text-[#17140F]">
              {policyName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#786851] hover:text-[#17140F] transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Policy Content */}
        <div className="text-xs sm:text-sm text-[#17140F]/80 font-sans leading-relaxed space-y-4 max-h-[68vh] overflow-y-auto pr-2">
          
          {policyName === 'Contact Us' && (
            <div className="space-y-4">
              <p>
                Our private concierge is at your service for sizing consultation, custom engraving requests, and corporate gifting.
              </p>
              
              <div className="p-4 bg-[#F5EFE4] space-y-3 border border-[#D8CDBD]/50">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#063B2B] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-[#17140F] block">EVOLUXE Gold Exchange & Bullion Store</strong>
                    <span>Flat No: XI/814B, NH-Moonupedika, Kaipamangalam, Thrissur, Kerala – 680681, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#063B2B] flex-shrink-0" />
                  <div className="font-mono tabular-nums">
                    <span>Direct Call: +91 907 265 5200</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-[#25D366] flex-shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#063B2B] font-semibold">
                      WhatsApp Customer Service
                    </span>
                    <a
                      href="https://wa.me/919072656000?text=Hello%20NINE%20by%20EVOLUXE%2C%20I%20would%20like%20customer%20service%20assistance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono tabular-nums text-[#063B2B] hover:text-[#C9A45C] font-medium underline flex items-center gap-1"
                    >
                      <span>+91 9072656000 (Click to Chat)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#063B2B] flex-shrink-0" />
                  <span>evoluxe194@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#063B2B] flex-shrink-0" />
                  <span>Mon – Sat: 9:30 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>
          )}

          {policyName === 'Insured Shipping' && (
            <div className="space-y-3">
              <p>
                Every NINE order is treated with bullion-grade security. Shipments are transported in tamper-evident, sealed parcels through authorized armored security carriers across India.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#786851]">
                <li><strong>Transit Insurance:</strong> 100% covered against transit loss or damage until verified OTP delivery.</li>
                <li><strong>Dispatch:</strong> Ready-to-wear pieces dispatch within 24 to 48 hours. Bespoke engraved pieces dispatch within 72 hours.</li>
                <li><strong>Delivery Window:</strong> Metro cities: 2–3 business days. Rest of India: 3–5 business days.</li>
                <li><strong>Cost:</strong> Complimentary on all orders across India.</li>
                <li><strong>Courier Partners:</strong> Blue Dart Apex Armored, BVC Logistics Precious Cargo, Sequel Secure.</li>
              </ul>
            </div>
          )}

          {policyName === 'Returns & Exchange' && (
            <div className="space-y-3">
              <p>
                We stand firmly behind every millimeter of gold we craft. If you are not completely satisfied with your piece or require a different size:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#786851]">
                <li><strong>15-Day Exchange Window:</strong> Initiate an exchange or store credit within 15 calendar days of receiving your parcel.</li>
                <li><strong>Condition:</strong> Jewellery must be unworn, undamaged, with original tags intact and accompanied by the EVOLUXE bullion authenticity card.</li>
                <li><strong>Custom Inscriptions:</strong> Personalized laser-engraved pieces are exchangeable for sizing adjustment at zero labor fee.</li>
              </ul>
            </div>
          )}

          {policyName === 'Hallmarking & Purity' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#063B2B] font-semibold text-sm">
                <Award size={18} className="text-[#C9A45C]" />
                <span>375 Solid Gold Standard</span>
              </div>
              <p>
                9 karat gold (marked 375) represents 37.5% pure solid gold, alloyed with precious silver and copper. This metallurgical formula offers superior tensile hardness over traditional 22K gold, preventing distortion, bent prongs, and abrasive surface wear.
              </p>
              <p>
                Every piece is assayed, certified, and carries the EVOLUXE hallmark.
              </p>
            </div>
          )}

          {policyName === 'Daily Care Guide' && (
            <div className="space-y-3">
              <p>
                NINE jewellery is crafted to live with you through morning runs, office desks, and evening showers. To maintain maximum mirror brilliance:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#786851]">
                <li>Rinse gently with warm water and mild, non-detergent soap once a month.</li>
                <li>Buff with the soft microfibre polishing cloth included in your keepsake box.</li>
                <li>Avoid direct prolonged exposure to harsh household bleach or chlorine pools.</li>
                <li>Store in the velvet-lined NINE box when not in use.</li>
              </ul>
            </div>
          )}

          {/* Enhanced Order Tracking Integration */}
          {policyName === 'Track Order' && (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-[#786851]">
                  Enter your NINE order ID (e.g. NINE-842109) to view its real-time bullion logistics status and security checkpoints:
                </p>
                
                <form onSubmit={handleTrackSubmit} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                    placeholder="ENTER ORDER CODE (E.G. NINE-104288)"
                    className="flex-1 bg-[#FAF7F2] border border-[#D8CDBD] p-2.5 text-xs text-[#17140F] font-mono tracking-wider focus:outline-none focus:border-[#063B2B]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#063B2B] text-[#FAF7F2] text-xs uppercase font-sans font-semibold tracking-wider hover:bg-[#04291E] transition-colors"
                  >
                    Track
                  </button>
                </form>
              </div>

              <AnimatePresence mode="wait">
                {activeTrackingResult && (
                  <motion.div
                    key={activeTrackingResult}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5 bg-[#F5EFE4] border border-[#D8CDBD]/70 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D8CDBD]/50">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#786851] block">
                          Verified Consignment Code
                        </span>
                        <span className="font-mono text-sm font-bold text-[#063B2B]">
                          {activeTrackingResult}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#063B2B] text-[#FAF7F2] text-[10px] tracking-wider uppercase px-2.5 py-1 font-semibold">
                        <Truck size={12} className="text-[#C9A45C]" />
                        <span>IN ARMORED TRANSIT</span>
                      </div>
                    </div>

                    {/* 4-Stage Visual Timeline with staggered motion */}
                    <div className="py-2">
                      <div className="text-[11px] font-semibold text-[#17140F] uppercase tracking-wider mb-3">
                        Consignment Checkpoints
                      </div>

                      <div className="space-y-3 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[2px] before:bg-[#C9A45C]/40">
                        
                        {/* Step 1 */}
                        <motion.div
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-3 relative z-10"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#063B2B] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 shadow-xs">
                            <CheckCircle2 size={14} className="text-[#C9A45C]" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-[#17140F]">Order Verified & 375 Hallmarked</div>
                            <div className="text-[11px] text-[#786851]">Thrissur Central Bullion Exchange · Passed Purity Assay</div>
                          </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.16, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-3 relative z-10"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#063B2B] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 shadow-xs">
                            <CheckCircle2 size={14} className="text-[#C9A45C]" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-[#17140F]">Velvet Keepsake Box Sealed</div>
                            <div className="text-[11px] text-[#786851]">Tamper-evident holographic security seal applied with warranty card</div>
                          </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.24, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-3 relative z-10"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#C9A45C] text-[#17140F] flex items-center justify-center flex-shrink-0 shadow-xs">
                            <Truck size={14} />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-[#063B2B]">Armored Courier Hub En Route</div>
                            <div className="text-[11px] text-[#786851]">Dispatched via BVC Secured Transit · Insured for full declared value</div>
                          </div>
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.32, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-3 relative z-10"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#D8CDBD] text-[#786851] flex items-center justify-center flex-shrink-0">
                            <Box size={14} />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-[#786851]">Out for Doorstep Handover</div>
                            <div className="text-[11px] text-[#786851]">Expected within 48 Hours · Requires mandatory SMS OTP from recipient</div>
                          </div>
                        </motion.div>

                      </div>
                    </div>

                    {/* Security Footnote & Cross Links */}
                    <div className="pt-3 border-t border-[#D8CDBD]/50 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#063B2B] font-medium">
                        <ShieldCheck size={14} className="text-[#C9A45C]" />
                        <span>100% Insured Bullion Transit Guarantee</span>
                      </div>

                      {onSelectPolicy && (
                        <button
                          onClick={() => onSelectPolicy('Insured Shipping')}
                          className="text-[#063B2B] underline hover:text-[#C9A45C] font-semibold"
                        >
                          Read Logistics Terms
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Policy'].includes(policyName) && (
            <div className="space-y-3 text-xs text-[#786851]">
              <p>
                <strong>NINE by EVOLUXE</strong> is committed to preserving client confidentiality and transactional integrity. All transactions are encrypted through 256-bit SSL protocols.
              </p>
              <p>
                Client personal data collected during order processing is strictly used for shipment dispatch and regulatory compliance under Indian precious metals retail standards. We never monetize or distribute client contact details to third-party ad networks.
              </p>
              <p>
                Governing Jurisdiction: Courts of Thrissur, Kerala, India.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#D8CDBD]/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#063B2B] text-[#FAF7F2] text-xs tracking-wider uppercase font-semibold hover:bg-[#04291E] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
