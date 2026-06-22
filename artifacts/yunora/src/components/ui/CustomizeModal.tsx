import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideProps } from "lucide-react";
import {
  X, ChevronRight, ChevronLeft, Check, Upload, MessageCircle,
  Ruler, Palette, Layers, Sparkles, User, Phone, Mail, MapPin,
  Package, Clock, IndianRupee, ZoomIn, Image as ImageIcon, Send,
  Wind, Moon, Gem, Utensils, Home, FileText, Truck, Minus, Award, Crown
} from "lucide-react";

type LucideIcon = React.FC<LucideProps>;

/* ─── Types ─── */
interface CustomFormData {
  productType: string;
  width: string; widthUnit: string;
  height: string; heightUnit: string;
  depth: string; quantity: string;
  fabric: string;
  color: string;
  design: string;
  specialRequirements: string;
  files: File[];
  name: string; phone: string; whatsapp: string;
  email: string; city: string; state: string; pincode: string;
}

const EMPTY: CustomFormData = {
  productType: "", width: "", widthUnit: "inch", height: "", heightUnit: "inch",
  depth: "", quantity: "1", fabric: "", color: "", design: "",
  specialRequirements: "", files: [],
  name: "", phone: "", whatsapp: "", email: "", city: "", state: "", pincode: ""
};

/* ─── Option data ─── */
const PRODUCT_TYPES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "curtains",       label: "Curtains",       icon: Wind      },
  { id: "bedsheets",      label: "Bedsheets",      icon: Layers    },
  { id: "comforters",     label: "Comforters",     icon: Moon      },
  { id: "sofa-fabrics",   label: "Sofa Fabric",    icon: Gem       },
  { id: "cushions",       label: "Cushions",       icon: Package   },
  { id: "dining-covers",  label: "Dining Cover",   icon: Utensils  },
  { id: "home-decor",     label: "Home Decor",     icon: Home      },
  { id: "custom",         label: "Custom Product", icon: Sparkles  },
];

const FABRICS = [
  { id: "cotton",          label: "Cotton",          desc: "Breathable & Soft" },
  { id: "egyptian-cotton", label: "Egyptian Cotton", desc: "Ultra Premium" },
  { id: "linen",           label: "Linen Sheer",     desc: "Light & Airy" },
  { id: "velvet",          label: "Velvet",          desc: "Rich & Luxurious" },
  { id: "silk-blend",      label: "Silk Blend",      desc: "Elegant Sheen" },
  { id: "jacquard",        label: "Jacquard",        desc: "Woven Pattern" },
  { id: "blackout",        label: "Blackout",        desc: "100% Room Dark" },
  { id: "premium",         label: "Premium Sheer",   desc: "Luxury Finish" },
];

const COLORS = [
  { id: "ivory",     label: "Ivory White", hex: "#F8F5F0" },
  { id: "beige",     label: "Warm Beige",  hex: "#D8C3A5" },
  { id: "sand",      label: "Sand",        hex: "#C4A882" },
  { id: "taupe",     label: "Taupe",       hex: "#A89080" },
  { id: "olive",     label: "Olive Green", hex: "#7A8A5E" },
  { id: "terracotta",label: "Terracotta",  hex: "#C4614A" },
  { id: "grey",      label: "Warm Grey",   hex: "#9E9080" },
  { id: "white",     label: "Pure White",  hex: "#FFFFFF" },
  { id: "charcoal",  label: "Charcoal",    hex: "#4A4040" },
  { id: "navy",      label: "Navy Blue",   hex: "#3A5070" },
  { id: "blush",     label: "Blush Rose",  hex: "#E8BCAD" },
  { id: "custom",    label: "Custom Color",hex: "" },
];

const DESIGNS: { id: string; label: string; desc: string; icon: LucideIcon }[] = [
  { id: "modern",   label: "Modern",   desc: "Clean lines, minimal",  icon: Layers   },
  { id: "minimal",  label: "Minimal",  desc: "Simple & elegant",      icon: Minus    },
  { id: "classic",  label: "Classic",  desc: "Timeless style",        icon: Clock    },
  { id: "luxury",   label: "Luxury",   desc: "Opulent details",       icon: Award    },
  { id: "royal",    label: "Royal",    desc: "Grand & ornate",        icon: Crown    },
  { id: "custom",   label: "Custom",   desc: "Your own design",       icon: Palette  },
];

const UNITS = ["cm", "inch", "feet"];

const STATES_IN = ["Andhra Pradesh","Delhi","Gujarat","Karnataka","Kerala","Maharashtra","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal","Other"];

/* ─── Step header config ─── */
const STEPS = [
  { num: 1, title: "Product Type",        icon: Package  },
  { num: 2, title: "Measurements",        icon: Ruler    },
  { num: 3, title: "Fabric",              icon: Layers   },
  { num: 4, title: "Color",               icon: Palette  },
  { num: 5, title: "Design Style",        icon: Sparkles },
  { num: 6, title: "Special Requirements",icon: ImageIcon},
  { num: 7, title: "Upload Files",        icon: Upload   },
  { num: 8, title: "Your Details",        icon: User     },
  { num: 9, title: "Live Estimate",       icon: IndianRupee },
  { num: 10,title: "Submit",              icon: Send     },
];

/* ─── Estimate helper ─── */
function getEstimate(d: CustomFormData) {
  const w = parseFloat(d.width) || 0;
  const h = parseFloat(d.height) || 0;
  const q = parseInt(d.quantity) || 1;
  const area = w * h;
  const fabricCost = d.fabric === "velvet" ? 450 : d.fabric === "silk-blend" ? 550 : d.fabric === "egyptian-cotton" ? 380 : 220;
  const base = Math.max(800, area * fabricCost * 0.01 * q);
  const low  = Math.round(base * 0.9 / 100) * 100;
  const high = Math.round(base * 1.3 / 100) * 100;
  const days = d.productType === "curtains" ? "7–10" : d.productType === "bedsheets" ? "5–7" : "10–14";
  const fabReq = area > 0 ? `${(area * 0.001 * q).toFixed(1)} metres` : "—";
  return { low, high, days, fabReq };
}

/* ─── WhatsApp message builder ─── */
function buildWhatsAppMsg(d: CustomFormData, productName: string) {
  return encodeURIComponent(
`Hello YUNORA Team! 🌟

I want a customized product.

*Product:* ${productName || d.productType}
*Type:* ${d.productType}
*Size:* ${d.width}${d.widthUnit} × ${d.height}${d.heightUnit}
*Fabric:* ${d.fabric}
*Color:* ${d.color}
*Design Style:* ${d.design}
*Quantity:* ${d.quantity}
*Requirements:* ${d.specialRequirements || "None"}

*Customer Details:*
Name: ${d.name}
Phone: ${d.phone}
City: ${d.city}

Please help me with a custom quote. 🙏`
  );
}

/* ─── Main Modal ─── */
interface CustomizeModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  productType?: string;
}

export default function CustomizeModal({ open, onClose, productName, productType }: CustomizeModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CustomFormData>({ ...EMPTY, productType: productType || "" });
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof CustomFormData, v: string | File[]) =>
    setForm(f => ({ ...f, [k]: v }));

  const canNext = useCallback(() => {
    if (step === 1) return !!form.productType;
    if (step === 2) return !!(form.width && form.height);
    if (step === 3) return !!form.fabric;
    if (step === 4) return !!form.color;
    if (step === 5) return !!form.design;
    if (step === 8) return !!(form.name && form.phone);
    return true;
  }, [step, form]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 5);
    set("files", [...form.files, ...arr].slice(0, 5) as unknown as File[]);
  };

  const handleSubmit = () => {
    const requests: CustomFormData[] = JSON.parse(localStorage.getItem("yunora_custom_requests") || "[]");
    requests.push({ ...form });
    localStorage.setItem("yunora_custom_requests", JSON.stringify(requests));
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const msg = buildWhatsAppMsg(form, productName);
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
  };

  const est = getEstimate(form);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center bg-[#1a0f06]/80 backdrop-blur-md p-2 lg:p-6"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[900px] max-h-[95vh] flex flex-col bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
          style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,175,55,0.2)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DDD0] bg-white shrink-0">
            <div>
              <p className="text-[10px] tracking-[0.22em] font-bold text-[#D4AF37]">YUNORA BESPOKE</p>
              <h2 className="text-base font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Customize Your {form.productType ? PRODUCT_TYPES.find(p => p.id === form.productType)?.label : "Product"}
              </h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F5F0EA] flex items-center justify-center hover:bg-[#E8DDD0] transition-colors">
              <X className="h-4 w-4 text-[#3A2A20]" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="shrink-0 px-6 py-3 bg-white border-b border-[#E8DDD0]">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => !submitted && step > s.num && setStep(s.num)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                      step === s.num ? "bg-[#3A2A20] text-white" :
                      step > s.num  ? "bg-[#D4AF37]/20 text-[#D4AF37] cursor-pointer hover:bg-[#D4AF37]/30" :
                      "text-[#9E8A78]"
                    }`}
                  >
                    {step > s.num ? <Check className="h-3 w-3" /> : <span>{s.num}</span>}
                    <span className="hidden sm:block">{s.title}</span>
                  </button>
                  {i < STEPS.length - 1 && <div className={`w-3 h-px ${step > s.num ? "bg-[#D4AF37]" : "bg-[#E8DDD0]"}`} />}
                </div>
              ))}
            </div>
            {/* Progress track */}
            <div className="mt-2 h-1 bg-[#E8DDD0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#D4AF37] rounded-full"
                animate={{ width: `${(step / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 flex items-center justify-center"><Sparkles className="h-9 w-9 text-[#D4AF37]" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#3A2A20] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request Submitted!</h3>
                    <p className="text-sm text-[#6B5744] max-w-sm">Our design expert will contact you within 30 minutes with a personalized quote.</p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <button onClick={openWhatsApp} className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#1da855] transition-colors">
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                    </button>
                    <button onClick={onClose} className="px-5 py-2.5 border-2 border-[#3A2A20] text-[#3A2A20] text-sm font-bold rounded-xl hover:bg-[#3A2A20] hover:text-white transition-colors">
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>

                  {/* STEP 1 — Product Type */}
                  {step === 1 && (
                    <div>
                      <StepHeader icon={Package} title="Select Product Type" desc="What would you like to customize?" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                        {PRODUCT_TYPES.map(p => {
                          const PIcon = p.icon;
                          return (
                            <button key={p.id} onClick={() => set("productType", p.id)}
                              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all ${form.productType === p.id ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#E8DDD0] bg-white text-[#3A2A20] hover:border-[#D4AF37]"}`}>
                              <PIcon className="h-5 w-5" />
                              <span className="text-xs font-bold tracking-wide">{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Measurements */}
                  {step === 2 && (
                    <div>
                      <StepHeader icon={Ruler} title="Enter Measurements" desc="Enter your exact dimensions for a perfect fit" />
                      <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        <MeasureField label="Width *" value={form.width} unit={form.widthUnit}
                          onValue={v => set("width", v)} onUnit={v => set("widthUnit", v)} placeholder="e.g. 60" />
                        <MeasureField label="Height *" value={form.height} unit={form.heightUnit}
                          onValue={v => set("height", v)} onUnit={v => set("heightUnit", v)} placeholder="e.g. 90" />
                        <MeasureField label="Depth / Length (optional)" value={form.depth} unit="inch"
                          onValue={v => set("depth", v)} onUnit={() => {}} placeholder="e.g. 12" noUnit />
                        <div>
                          <label className="block text-xs font-bold text-[#3A2A20] mb-1.5 tracking-wide">Quantity</label>
                          <input type="number" min="1" max="50" value={form.quantity} onChange={e => set("quantity", e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] bg-white" />
                        </div>
                      </div>
                      <div className="mt-5 p-4 bg-[#F5F0EA] rounded-2xl border border-[#E8DDD0]">
                        <p className="text-xs font-bold text-[#3A2A20] mb-2 flex items-center gap-2"><Ruler className="h-3.5 w-3.5 text-[#D4AF37]" /> Measuring Guide</p>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#6B5744]">
                          <p>• For curtains: measure window width + 20% extra</p>
                          <p>• Height: from rod to floor or desired length</p>
                          <p>• For bedsheets: measure mattress top surface</p>
                          <p>• Add 12–15 inches for tuck-in allowance</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — Fabric */}
                  {step === 3 && (
                    <div>
                      <StepHeader icon={Layers} title="Select Fabric" desc="Choose from our premium fabric collection" />
                      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {FABRICS.map(f => (
                          <button key={f.id} onClick={() => set("fabric", f.id)}
                            className={`flex flex-col gap-1.5 p-4 rounded-2xl border-2 text-left transition-all ${form.fabric === f.id ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#E8DDD0] bg-white text-[#3A2A20] hover:border-[#D4AF37]"}`}>
                            <div className={`w-10 h-10 rounded-xl mb-1 ${form.fabric === f.id ? "bg-white/20" : "bg-[#F5F0EA]"}`} style={{
                              background: form.fabric === f.id ? "rgba(255,255,255,0.15)" :
                                f.id === "velvet" ? "linear-gradient(135deg,#9c5fa3,#7b3fa0)" :
                                f.id === "silk-blend" ? "linear-gradient(135deg,#f0e0c0,#d4af37)" :
                                f.id === "linen" ? "linear-gradient(135deg,#e8ddd0,#c4a882)" :
                                f.id === "blackout" ? "#2a1a10" : "linear-gradient(135deg,#f5f0ea,#d8c3a5)"
                            }} />
                            <p className="text-xs font-bold">{f.label}</p>
                            <p className={`text-[10px] ${form.fabric === f.id ? "text-white/70" : "text-[#9E8A78]"}`}>{f.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4 — Color */}
                  {step === 4 && (
                    <div>
                      <StepHeader icon={Palette} title="Select Color" desc="Choose your preferred color from our luxury palette" />
                      <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {COLORS.map(c => (
                          <button key={c.id} onClick={() => set("color", c.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${form.color === c.id ? "border-[#3A2A20] shadow-md" : "border-[#E8DDD0] hover:border-[#D4AF37]"} bg-white`}>
                            <div className="w-10 h-10 rounded-full border-2 border-[#E8DDD0] relative" style={{ background: c.hex || "conic-gradient(red,orange,yellow,green,blue,violet,red)" }}>
                              {form.color === c.id && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-[#3A2A20] drop-shadow" style={{ filter: c.hex === "#FFFFFF" || c.hex === "#F8F5F0" ? "none" : "invert(1)" }} />
                                </div>
                              )}
                            </div>
                            <p className="text-[10px] font-semibold text-[#3A2A20] text-center leading-tight">{c.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 5 — Design */}
                  {step === 5 && (
                    <div>
                      <StepHeader icon={Sparkles} title="Design Style" desc="Choose the aesthetic that matches your home" />
                      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {DESIGNS.map(d => {
                          const DIcon = d.icon;
                          return (
                            <button key={d.id} onClick={() => set("design", d.id)}
                              className={`flex flex-col gap-2 p-5 rounded-2xl border-2 text-left transition-all ${form.design === d.id ? "border-[#3A2A20] bg-[#3A2A20] text-white" : "border-[#E8DDD0] bg-white text-[#3A2A20] hover:border-[#D4AF37]"}`}>
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${form.design === d.id ? "bg-white/15" : "bg-[#F5F0EA]"}`}>
                                <DIcon className={`h-4 w-4 ${form.design === d.id ? "text-white" : "text-[#D4AF37]"}`} />
                              </div>
                              <p className="text-sm font-bold">{d.label}</p>
                              <p className={`text-xs ${form.design === d.id ? "text-white/65" : "text-[#9E8A78]"}`}>{d.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 6 — Special Requirements */}
                  {step === 6 && (
                    <div>
                      <StepHeader icon={FileText} title="Special Requirements" desc="Tell us anything specific about your order" />
                      <div className="mt-5">
                        <textarea
                          value={form.specialRequirements}
                          onChange={e => set("specialRequirements", e.target.value)}
                          rows={5}
                          placeholder={`Examples:\n• Need matching cushions\n• Need blackout lining\n• Need custom embroidery\n• Need gift packaging\n• Any specific pattern or design inspiration`}
                          className="w-full px-4 py-3 border-2 border-[#D8C3A5] rounded-2xl text-sm outline-none focus:border-[#3A2A20] resize-none bg-white transition-colors"
                        />
                        <p className="text-xs text-[#9E8A78] mt-2">{form.specialRequirements.length}/500 characters</p>
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {["Need blackout lining","Add embroidery","Custom packaging","Matching cushions","Logo printing","Same-day dispatch"].map(tag => (
                            <button key={tag} onClick={() => set("specialRequirements", form.specialRequirements ? form.specialRequirements + "\n• " + tag : "• " + tag)}
                              className="px-3 py-1.5 bg-[#F5F0EA] border border-[#E8DDD0] rounded-lg text-xs text-[#6B5744] text-left hover:bg-[#EDE5D8] transition-colors">
                              + {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 7 — Upload Files */}
                  {step === 7 && (
                    <div>
                      <StepHeader icon={Upload} title="Upload Files" desc="Share room photos, reference images or design sketches" />
                      <div className="mt-5">
                        <div
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragOver ? "border-[#D4AF37] bg-[#D4AF37]/05" : "border-[#D8C3A5] hover:border-[#3A2A20] bg-white"}`}
                        >
                          <Upload className="h-8 w-8 text-[#D4AF37] mx-auto mb-3" />
                          <p className="text-sm font-semibold text-[#3A2A20] mb-1">Drop files here or click to upload</p>
                          <p className="text-xs text-[#9E8A78]">Supports JPG, PNG, PDF · Max 5 files · Up to 10MB each</p>
                          <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={e => handleFiles(e.target.files)} />
                        </div>
                        {form.files.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {(form.files as unknown as File[]).map((f, i) => (
                              <div key={i} className="relative aspect-square rounded-xl bg-[#F5F0EA] flex flex-col items-center justify-center border border-[#E8DDD0] overflow-hidden">
                                {f.type?.startsWith("image/") ? (
                                  <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="" />
                                ) : (
                                  <FileText className="h-6 w-6 text-[#9E8A78]" />
                                )}
                                <button onClick={e => { e.stopPropagation(); const arr = [...(form.files as unknown as File[])]; arr.splice(i,1); set("files", arr as unknown as File[]); }}
                                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#3A2A20]/70 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors">
                                  ×
                                </button>
                                <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] px-1 py-0.5 truncate">{f.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-[#9E8A78] mt-3 text-center">Optional — helps us understand your vision better</p>
                      </div>
                    </div>
                  )}

                  {/* STEP 8 — Customer Details */}
                  {step === 8 && (
                    <div>
                      <StepHeader icon={User} title="Your Details" desc="So we can send you a personalized quote" />
                      <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        <TextInput label="Full Name *" value={form.name} onChange={v => set("name", v)} placeholder="Your full name" icon={User} />
                        <TextInput label="Phone Number *" value={form.phone} onChange={v => set("phone", v)} placeholder="+91 98765 43210" icon={Phone} type="tel" />
                        <TextInput label="WhatsApp Number" value={form.whatsapp} onChange={v => set("whatsapp", v)} placeholder="Same as phone?" icon={MessageCircle} type="tel" />
                        <TextInput label="Email Address" value={form.email} onChange={v => set("email", v)} placeholder="you@email.com" icon={Mail} type="email" />
                        <TextInput label="City" value={form.city} onChange={v => set("city", v)} placeholder="e.g. Mumbai" icon={MapPin} />
                        <div>
                          <label className="block text-xs font-bold text-[#3A2A20] mb-1.5 tracking-wide">State</label>
                          <select value={form.state} onChange={e => set("state", e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] bg-white">
                            <option value="">Select State</option>
                            {STATES_IN.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                        <TextInput label="Pincode" value={form.pincode} onChange={v => set("pincode", v)} placeholder="6-digit pincode" />
                      </div>
                    </div>
                  )}

                  {/* STEP 9 — Live Estimate */}
                  {step === 9 && (
                    <div>
                      <StepHeader icon={IndianRupee} title="Your Live Estimate" desc="Based on your selections — final quote may vary slightly" />
                      <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        <EstCard icon={Layers}      label="Fabric Requirement" value={est.fabReq} color="#D4AF37" />
                        <EstCard icon={Clock}       label="Production Time"    value={`${est.days} business days`} color="#6B9E6E" />
                        <EstCard icon={IndianRupee} label="Price Range"        value={`₹${est.low.toLocaleString("en-IN")} – ₹${est.high.toLocaleString("en-IN")}`} color="#F47C4D" big />
                        <EstCard icon={Truck}       label="Shipping"           value="Free Nationwide Shipping" color="#3A2A20" />
                      </div>
                      <div className="mt-5 p-4 bg-[#F5F0EA] rounded-2xl border border-[#E8DDD0] text-xs text-[#6B5744]">
                        <p className="font-bold text-[#3A2A20] mb-1.5">Order Summary</p>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
                          <Row k="Product"  v={PRODUCT_TYPES.find(p => p.id === form.productType)?.label || "—"} />
                          <Row k="Size"     v={form.width && form.height ? `${form.width}${form.widthUnit} × ${form.height}${form.heightUnit}` : "—"} />
                          <Row k="Fabric"   v={FABRICS.find(f => f.id === form.fabric)?.label || "—"} />
                          <Row k="Color"    v={COLORS.find(c => c.id === form.color)?.label || "—"} />
                          <Row k="Design"   v={DESIGNS.find(d => d.id === form.design)?.label || "—"} />
                          <Row k="Quantity" v={form.quantity} />
                        </div>
                      </div>
                      <p className="text-xs text-[#9E8A78] mt-3 text-center">* Final price confirmed after expert review. 100% transparent pricing.</p>
                    </div>
                  )}

                  {/* STEP 10 — Submit */}
                  {step === 10 && (
                    <div>
                      <StepHeader icon={Send} title="Submit Your Request" desc="We'll reach out within 30 minutes with your personalized quote" />
                      <div className="mt-6 p-5 bg-white rounded-2xl border border-[#E8DDD0]">
                        <p className="text-xs font-bold text-[#3A2A20] mb-3 tracking-wide">YOUR CUSTOMIZATION REQUEST</p>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs text-[#6B5744]">
                          <Row k="Product"    v={PRODUCT_TYPES.find(p => p.id === form.productType)?.label || "—"} />
                          <Row k="Size"       v={`${form.width}${form.widthUnit} × ${form.height}${form.heightUnit}`} />
                          <Row k="Fabric"     v={FABRICS.find(f => f.id === form.fabric)?.label || "—"} />
                          <Row k="Color"      v={COLORS.find(c => c.id === form.color)?.label || "—"} />
                          <Row k="Design"     v={DESIGNS.find(d => d.id === form.design)?.label || "—"} />
                          <Row k="Quantity"   v={form.quantity} />
                          <Row k="Name"       v={form.name || "—"} />
                          <Row k="Phone"      v={form.phone || "—"} />
                          <Row k="Estimate"   v={`₹${est.low.toLocaleString("en-IN")} – ₹${est.high.toLocaleString("en-IN")}`} />
                          <Row k="Delivery"   v={`${est.days} business days`} />
                        </div>
                        {form.specialRequirements && (
                          <div className="mt-3 pt-3 border-t border-[#E8DDD0]">
                            <p className="text-xs font-bold text-[#3A2A20] mb-1">Special Requirements:</p>
                            <p className="text-xs text-[#6B5744] whitespace-pre-wrap">{form.specialRequirements}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 grid sm:grid-cols-2 gap-3">
                        <button onClick={handleSubmit}
                          className="flex items-center justify-center gap-2 h-12 bg-[#3A2A20] text-white text-sm font-bold rounded-xl hover:bg-[#4a3830] transition-colors tracking-wide">
                          <Send className="h-4 w-4" /> REQUEST CUSTOM QUOTE
                        </button>
                        <button onClick={openWhatsApp}
                          className="flex items-center justify-center gap-2 h-12 bg-[#25D366] text-white text-sm font-bold rounded-xl hover:bg-[#1da855] transition-colors">
                          <MessageCircle className="h-4 w-4" /> SEND VIA WHATSAPP
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Nav */}
          {!submitted && (
            <div className="shrink-0 px-6 py-4 border-t border-[#E8DDD0] bg-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm font-semibold text-[#6B5744] hover:border-[#3A2A20] transition-colors">
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <button onClick={openWhatsApp} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366]/10 border-2 border-[#25D366]/30 rounded-xl text-xs font-bold text-[#25D366] hover:bg-[#25D366]/15 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Help
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#9E8A78]">Step {step} of {STEPS.length}</span>
                {step < STEPS.length ? (
                  <button onClick={() => canNext() && setStep(s => s + 1)}
                    disabled={!canNext()}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${canNext() ? "bg-[#3A2A20] text-white hover:bg-[#4a3830]" : "bg-[#D8C3A5] text-[#9E8A78] cursor-not-allowed"}`}>
                    Continue <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#D4AF37] text-[#1a0f06] rounded-xl text-sm font-bold tracking-wide hover:bg-[#b8932a] transition-colors">
                    Submit Request <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Small helper sub-components ─── */
function StepHeader({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <div className="mb-1">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-[#F5F0EA] flex items-center justify-center shrink-0">
          <Icon className="h-4.5 w-4.5 text-[#D4AF37]" />
        </div>
        <h3 className="text-xl font-bold text-[#3A2A20]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{title}</h3>
      </div>
      <p className="text-sm text-[#9E8A78] ml-12">{desc}</p>
    </div>
  );
}

function MeasureField({ label, value, unit, onValue, onUnit, placeholder, noUnit }: {
  label: string; value: string; unit: string; onValue: (v: string) => void; onUnit: (v: string) => void; placeholder: string; noUnit?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#3A2A20] mb-1.5 tracking-wide">{label}</label>
      <div className="flex gap-2">
        <input type="number" min="0" value={value} onChange={e => onValue(e.target.value)} placeholder={placeholder}
          className="flex-1 px-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] bg-white transition-colors" />
        {!noUnit && (
          <select value={unit} onChange={e => onUnit(e.target.value)} className="w-20 px-2 border-2 border-[#D8C3A5] rounded-xl text-xs outline-none focus:border-[#3A2A20] bg-white">
            {UNITS.map(u => <option key={u}>{u}</option>)}
          </select>
        )}
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, icon: Icon, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; icon?: React.FC<{className?: string}>; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#3A2A20] mb-1.5 tracking-wide">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9E8A78]" />}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className={`w-full ${Icon ? "pl-8" : "px-3"} pr-3 py-2.5 border-2 border-[#D8C3A5] rounded-xl text-sm outline-none focus:border-[#3A2A20] bg-white transition-colors`} />
      </div>
    </div>
  );
}

function EstCard({ icon: Icon, label, value, color, big }: { icon: LucideIcon; label: string; value: string; color: string; big?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 p-5 rounded-2xl bg-white border border-[#E8DDD0] ${big ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" style={{ color }} />
        <p className="text-xs font-semibold text-[#9E8A78] tracking-wide">{label.toUpperCase()}</p>
      </div>
      <p className={`font-bold text-[#3A2A20] ${big ? "text-xl" : "text-base"}`} style={{ color }}>{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-semibold text-[#3A2A20] shrink-0">{k}:</span>
      <span className="text-[#6B5744]">{v}</span>
    </div>
  );
}
