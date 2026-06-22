import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { X, Eye, EyeOff, ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logo from "@assets/02_1781943228013.png";

type Tab = "login" | "register";

export default function AuthGate() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("login");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Login form */
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  /* Register form */
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "" });

  function setLF(k: keyof typeof loginForm, v: string) { setLoginForm(f => ({ ...f, [k]: v })); setError(""); }
  function setRF(k: keyof typeof regForm, v: string) { setRegForm(f => ({ ...f, [k]: v })); setError(""); }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login({ name: loginForm.email.split("@")[0], email: loginForm.email });
    setLoading(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!regForm.name.trim() || !regForm.email.trim() || !regForm.phone.trim()) { setError("Please fill in all required fields."); return; }
    if (!/^[6-9]\d{9}$/.test(regForm.phone.replace(/\s/g, ""))) { setError("Enter a valid 10-digit mobile number."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login({ name: regForm.name, email: regForm.email, phone: regForm.phone });
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#1A0F08]/80 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-[#2A1F18] pt-8 pb-6 px-8 text-center">
          <img src={logo} alt="YUNORA" className="h-8 mx-auto mb-3 brightness-0 invert opacity-90" />
          <p className="text-white/60 text-xs font-light tracking-widest uppercase">
            {tab === "login" ? "Welcome Back" : "Join YUNORA"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* Tabs */}
          <div className="flex bg-[#F5F0EA] rounded-xl p-1 mb-6">
            {(["login", "register"] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all ${tab === t ? "bg-white text-[#3A2A20] shadow-sm" : "text-[#9E8A78] hover:text-[#3A2A20]"}`}>
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "login" ? (
              <motion.form key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.18 }}
                onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 tracking-wide">Email Address</label>
                  <input type="email" value={loginForm.email} onChange={e => setLF("email", e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#3A2A20] bg-[#FDFAF7] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#C4B09A]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 tracking-wide">Password</label>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={loginForm.password} onChange={e => setLF("password", e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 pr-10 text-sm text-[#3A2A20] bg-[#FDFAF7] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#C4B09A]" />
                    <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8A78]">
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#3A2A20] text-white py-3.5 rounded-xl text-sm font-medium tracking-wider flex items-center justify-center gap-2 hover:bg-[#4A3A30] transition-colors disabled:opacity-60">
                  {loading ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <><Lock className="h-3.5 w-3.5" /> Sign In</>}
                </button>
                <p className="text-center text-xs text-[#9E8A78]">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setTab("register")} className="text-[#D4AF37] font-medium hover:underline">Sign Up</button>
                </p>
              </motion.form>
            ) : (
              <motion.form key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}
                onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 tracking-wide">Full Name</label>
                  <input value={regForm.name} onChange={e => setRF("name", e.target.value)} placeholder="Your Name"
                    className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#3A2A20] bg-[#FDFAF7] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#C4B09A]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 tracking-wide">Email Address</label>
                  <input type="email" value={regForm.email} onChange={e => setRF("email", e.target.value)} placeholder="you@example.com"
                    className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#3A2A20] bg-[#FDFAF7] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#C4B09A]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 tracking-wide">Mobile Number</label>
                  <input type="tel" value={regForm.phone} onChange={e => setRF("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number"
                    className="w-full border border-[#E8DDD0] rounded-xl px-4 py-3 text-sm text-[#3A2A20] bg-[#FDFAF7] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-[#C4B09A]" />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#D4AF37] text-[#1A0F08] py-3.5 rounded-xl text-sm font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#c4a030] transition-colors disabled:opacity-60">
                  {loading ? <span className="animate-spin h-4 w-4 border-2 border-[#1A0F08] border-t-transparent rounded-full" /> : <>Create Account <ArrowRight className="h-3.5 w-3.5" /></>}
                </button>
                <p className="text-center text-xs text-[#9E8A78]">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setTab("login")} className="text-[#D4AF37] font-medium hover:underline">Sign In</button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-5 pt-5 border-t border-[#F0EBE3] text-center">
            <button onClick={() => navigate("/")} className="text-xs text-[#9E8A78] hover:text-[#6B5744] transition-colors">
              Maybe Later — Browse Homepage
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
