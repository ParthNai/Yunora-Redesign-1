import { useState, useEffect, useCallback } from "react";

const POPUP_KEY = "yunora_popup_last_shown";
const HOURS_24 = 24 * 60 * 60 * 1000;

function useCountdown(targetDays: number, targetHours: number, targetMins: number, targetSecs: number) {
  const [time, setTime] = useState({
    days: targetDays,
    hours: targetHours,
    minutes: targetMins,
    seconds: targetSecs,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

interface TimeBoxProps {
  value: number;
  label: string;
}

function TimeBox({ value, label }: TimeBoxProps) {
  return (
    <div className="yunora-timebox">
      <div className="yunora-timebox-num">{String(value).padStart(2, "0")}</div>
      <div className="yunora-timebox-label">{label}</div>
    </div>
  );
}

export default function YunoraPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const countdown = useCountdown(11, 1, 33, 50);

  useEffect(() => {
    const last = localStorage.getItem(POPUP_KEY);
    const shouldShow = !last || Date.now() - parseInt(last, 10) > HOURS_24;

    if (shouldShow) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    localStorage.setItem(POPUP_KEY, String(Date.now()));
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 500);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(handleClose, 2000);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`yunora-overlay ${closing ? "yunora-overlay--closing" : ""}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="YUNORA Exclusive Offer"
    >
      <div className={`yunora-modal ${closing ? "yunora-modal--closing" : ""}`}>
        {/* Close Button */}
        <button
          className="yunora-close"
          onClick={handleClose}
          aria-label="Close popup"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* LEFT PANEL */}
        <div className="yunora-left">
          {/* Logo */}
          <div className="yunora-logo">
            <div className="yunora-logo-text">
              <span className="yunora-logo-brand">YUNORA</span>
              <span className="yunora-logo-sub">FURNISHING</span>
            </div>
          </div>

          <div className="yunora-divider-line">
            <span className="yunora-divider-dot" />
            <span className="yunora-divider-text">EXCLUSIVE YUNORA OFFER</span>
            <span className="yunora-divider-dot" />
          </div>

          <p className="yunora-tagline">Luxury Living Starts Here</p>

          <div className="yunora-offer-block">
            <span className="yunora-up-to">UP TO</span>
            <div className="yunora-percent">
              <span className="yunora-percent-num">40</span>
              <span className="yunora-percent-sign">%</span>
              <span className="yunora-percent-off">OFF</span>
            </div>
            <p className="yunora-collection">Premium Furnishing Collection</p>
          </div>

          <div className="yunora-prepaid">
            <span className="yunora-prepaid-icon">✦</span>
            Extra 5% OFF on Prepaid Orders
          </div>

          {/* Coupon */}
          <div className="yunora-coupon-wrapper">
            <span className="yunora-coupon-label">Coupon Code:</span>
            <div className="yunora-coupon">
              <span className="yunora-coupon-icon">🎁</span>
              <span className="yunora-coupon-code">YUNORA5</span>
              <button
                className="yunora-coupon-copy"
                onClick={() => navigator.clipboard?.writeText("YUNORA5")}
                title="Copy code"
              >
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
                  <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M4 14H3a2 2 0 01-2-2V3a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Countdown */}
          <div className="yunora-countdown">
            <TimeBox value={countdown.days} label="DAYS" />
            <div className="yunora-colon">:</div>
            <TimeBox value={countdown.hours} label="HRS" />
            <div className="yunora-colon">:</div>
            <TimeBox value={countdown.minutes} label="MINS" />
            <div className="yunora-colon">:</div>
            <TimeBox value={countdown.seconds} label="SECS" />
          </div>

          {/* Email Capture */}
          {submitted ? (
            <div className="yunora-success">
              <span>🎉</span> Welcome to YUNORA! Check your inbox.
            </div>
          ) : (
            <form className="yunora-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="yunora-input"
                required
              />
              <button type="submit" className="yunora-cta-btn">
                CLAIM MY OFFER
              </button>
            </form>
          )}

          {/* Trust Badges */}
          <div className="yunora-badges">
            {[
              { icon: "✦", label: "Premium Quality" },
              { icon: "🚚", label: "Free Delivery" },
              { icon: "🔒", label: "Secure Payments" },
              { icon: "🛡", label: "10 Year Warranty" },
              { icon: "🇮🇳", label: "Made In India" },
            ].map((b) => (
              <div key={b.label} className="yunora-badge">
                <span className="yunora-badge-icon">{b.icon}</span>
                <span className="yunora-badge-label">{b.label}</span>
              </div>
            ))}
          </div>

          <button className="yunora-skip" onClick={handleClose}>
            Continue Shopping →
          </button>
        </div>

        {/* RIGHT PANEL — Luxury Image */}
        <div className="yunora-right">
          <img
            src="/yunora-website.png"
            alt="YUNORA Luxury Furnishing"
            className="yunora-room-img"
          />
          <div className="yunora-image-overlay" />
          <div className="yunora-image-badge">
            <span>Summer Sale</span>
            <span className="yunora-image-badge-sub">Luxury Redefined</span>
          </div>
        </div>
      </div>
    </div>
  );
}
