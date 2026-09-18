import { motion } from "framer-motion";

const GOLD = "#FBB22B";
const SUN = "#FFD700";
const CHARCOAL = "#333333";

// Ayçiçek taç yaprağı — kafanın etrafındaki halka için (yukarı bakan tek yaprak)
const PETAL = "M12 3.4 C13.35 4.6 13.45 6.0 12 6.6 C10.55 6.0 10.65 4.6 12 3.4 Z";
const PETAL_ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

// Göğüsteki mini ayçiçek ambleminin taç yaprağı
const CHEST_PETAL = "M12 16.55 C12.6 16.95 12.6 17.5 12 17.9 C11.4 17.5 11.4 16.95 12 16.55 Z";

// DijiTrak maskotu: ayçiçek taç yapraklı, yuvarlak hatlı beyaz robot asistan.
// Tamamı kavisli formlar — hiçbir kare köşe yok. expression: "idle" | "happy" | "wink"
export default function RobotMascot({ expression = "idle", spin = false, className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="robot-mascot-petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE133" />
          <stop offset="55%" stopColor={SUN} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="robot-mascot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.55" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="robot-mascot-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SUN} stopOpacity="0.35" />
          <stop offset="100%" stopColor={SUN} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Tüm robot: yumuşak süzülme */}
      <motion.g
        animate={{ y: [0, -0.9, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ayaklardan yayılan sıcak parıltı */}
        <motion.ellipse
          cx="12"
          cy="22.7"
          rx="4.8"
          ry="1.5"
          fill="url(#robot-mascot-glow)"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Taç yaprakların arkasında yumuşak hale */}
        <motion.circle
          cx="12"
          cy="11"
          r="8.4"
          fill="url(#robot-mascot-halo)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ayçiçek taç yaprakları — kafayı çerçeveleyen halka */}
        <motion.g
          style={{ transformOrigin: "12px 11px", transformBox: "view-box" }}
          animate={{ rotate: spin ? [-7, 7, -7] : [-2.5, 2.5, -2.5] }}
          transition={
            spin
              ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          {PETAL_ANGLES.map((a) => (
            <path key={a} d={PETAL} fill="url(#robot-mascot-petal)" transform={`rotate(${a} 12 11)`} />
          ))}
        </motion.g>

        {/* Kollar — yuvarlak, tombul */}
        <rect x="5.3" y="16.1" width="2.3" height="1.5" rx="0.75" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="0.35" transform="rotate(-16 6.4 16.85)" />
        <rect x="16.4" y="16.1" width="2.3" height="1.5" rx="0.75" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="0.35" transform="rotate(16 17.6 16.85)" />
        <circle cx="7.3" cy="16.7" r="0.8" fill={CHARCOAL} />
        <circle cx="16.7" cy="16.7" r="0.8" fill={CHARCOAL} />

        {/* Bacaklar — yuvarlak kapsül ayaklar */}
        <rect x="9.3" y="20.6" width="1.8" height="1.8" rx="0.9" fill={CHARCOAL} />
        <rect x="12.9" y="20.6" width="1.8" height="1.8" rx="0.9" fill={CHARCOAL} />

        {/* Gövde — tam yuvarlak uçlu kapsül */}
        <rect x="8.7" y="15.2" width="6.6" height="6" rx="3" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="0.45" />

        {/* Kafa — beyaz küre */}
        <circle cx="12" cy="11" r="4.8" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="0.45" />
        {/* Alt gölge (hacim) */}
        <path d="M7.35 12.3 A4.8 4.8 0 0 0 16.65 12.3 A4.8 3.1 0 0 1 7.35 12.3 Z" fill="#EDEDED" />
        {/* Üst parlaklık */}
        <ellipse cx="10.3" cy="8.5" rx="1.7" ry="1" fill="#FFFFFF" opacity="0.95" />

        {/* Yanak allığı */}
        <circle cx="8.9" cy="12.2" r="0.55" fill={SUN} opacity="0.45" />
        <circle cx="15.1" cy="12.2" r="0.55" fill={SUN} opacity="0.45" />

        {/* Yüz — büyük, ışıltılı siyah gözler */}
        <g>
          <g className="mascot-eye">
            <circle cx="10.1" cy="10.3" r="1.3" fill="#1A1A1A" />
            <circle cx="9.65" cy="9.85" r="0.46" fill="#FFFFFF" />
            <circle cx="10.7" cy="11" r="0.18" fill="#FFFFFF" opacity="0.85" />
          </g>
          {expression === "wink" ? (
            <path
              d="M13.0 10.5 Q13.9 11.6 14.8 10.5"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          ) : (
            <g className="mascot-eye">
              <circle cx="13.9" cy="10.3" r="1.3" fill="#1A1A1A" />
              <circle cx="13.45" cy="9.85" r="0.46" fill="#FFFFFF" />
              <circle cx="14.5" cy="11" r="0.18" fill="#FFFFFF" opacity="0.85" />
            </g>
          )}
          {/* Ağız */}
          {expression === "happy" ? (
            <g>
              <path d="M10.6 12.3 Q12 14.6 13.4 12.3 Z" fill="#1A1A1A" />
              <path d="M11.2 13.5 Q12 14.3 12.8 13.5 Z" fill={GOLD} />
            </g>
          ) : (
            <path
              d="M10.9 12.4 Q12 13.7 13.1 12.4"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          )}
        </g>

        {/* Göğüste ayçiçek amblemi */}
        <g>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d={CHEST_PETAL} fill={SUN} transform={`rotate(${a} 12 17.9)`} />
          ))}
          <circle cx="12" cy="17.9" r="0.6" fill="#7A4E1D" />
        </g>
      </motion.g>
    </svg>
  );
}