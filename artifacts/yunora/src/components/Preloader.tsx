import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/image_1782119371063.png";
import bgImg from "@assets/6c37284a-b99d-42ad-8ce5-83157adb6282_1782119220523.jpg";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 650);
    }, 2800);
    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* ── Background image with slow luxury zoom ── */}
          <motion.div
            className="absolute inset-[-5%]"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 8, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(9px)",
            }}
          />

          {/* ── Dark overlay ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(18,12,8,0.78) 0%, rgba(30,20,12,0.82) 60%, rgba(18,12,8,0.75) 100%)",
            }}
          />

          {/* ── Subtle vignette ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* ── Center content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Logo reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[22px] mb-7"
              style={{ width: 164, height: 164, boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)" }}
            >
              <img
                src={logo}
                alt="YUNORA"
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Luxury shine sweep */}
              <motion.div
                initial={{ x: "-120%", skewX: -18 }}
                animate={{ x: "220%" }}
                transition={{ duration: 1.1, delay: 1.05, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.42) 50%, transparent 70%)",
                  width: "55%",
                }}
              />
            </motion.div>

            {/* Brand tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.42em",
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              Luxury Furnishing
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{ width: 120, height: 2, position: "relative" }}
            >
              {/* Track */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(4px)",
                }}
              />
              {/* Fill */}
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.35, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  borderRadius: 2,
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.85) 0%, rgba(244,164,77,0.95) 100%)",
                  boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
