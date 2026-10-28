/**
 * AdvancedTurbineSchematic Component
 * 
 * Renders authentic, high-precision engineering CAD blueprint schematics
 * for unconventional wind turbine architectures with accurate aerodynamic
 * streamlines, structural load vectors, and mechanical components.
 */

export default function AdvancedTurbineSchematic({ type }) {
  switch (type) {
    case 'counter-rotating':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Counter-Rotating VAWT Engineering Schematic">
          {/* Blueprint Grid Background */}
          <defs>
            <pattern id="grid-cr" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="wake-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-cr)" />

          {/* Dimension & Axis Lines */}
          <line x1="300" y1="20" x2="300" y2="340" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          <text x="310" y="32" fill="#94a3b8" fontSize="11" fontFamily="monospace">CENTRAL COAXIAL AXIS (Z)</text>

          {/* Floating Platform / Hull Base */}
          <path d="M220 320 L380 320 L360 355 L240 355 Z" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
          <text x="300" y="342" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">FLOATING SUBMERSIBLE HULL</text>
          
          {/* Deck-level Coaxial Generator */}
          <rect x="260" y="270" width="80" height="50" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="300" y="295" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">COAXIAL PMSG</text>
          <text x="300" y="308" fill="#94a3b8" fontSize="8" textAnchor="middle">DUAL-ROTOR STATORLESS</text>

          {/* Concentric Shafts */}
          <rect x="293" y="60" width="14" height="210" fill="#334155" stroke="#64748b" strokeWidth="1" />
          <rect x="296" y="60" width="8" height="210" fill="#475569" />

          {/* TIER 1: Upper Rotor (Clockwise Rotation - CW) */}
          <g className="rotor-tier-upper">
            <line x1="200" y1="80" x2="400" y2="80" stroke="#0ea5e9" strokeWidth="3" />
            <line x1="200" y1="160" x2="400" y2="160" stroke="#0ea5e9" strokeWidth="3" />
            {/* Blades */}
            <rect x="194" y="60" width="12" height="120" rx="2" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
            <rect x="394" y="60" width="12" height="120" rx="2" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
            {/* Rotation Direction Arrow CW */}
            <path d="M 230 65 Q 260 50 290 60" fill="none" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow)" />
            <polygon points="292,61 285,55 288,65" fill="#22d3ee" />
            <text x="260" y="52" fill="#22d3ee" fontSize="10" fontWeight="bold">TIER 1 (CW: +Ω₁)</text>
          </g>

          {/* TIER 2: Lower Rotor (Counter-Clockwise - CCW) */}
          <g className="rotor-tier-lower">
            <line x1="170" y1="190" x2="430" y2="190" stroke="#0284c7" strokeWidth="3" />
            <line x1="170" y1="260" x2="430" y2="260" stroke="#0284c7" strokeWidth="3" />
            {/* Blades */}
            <rect x="164" y="175" width="12" height="100" rx="2" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
            <rect x="424" y="175" width="12" height="100" rx="2" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
            {/* Rotation Direction Arrow CCW */}
            <path d="M 370 275 Q 340 290 310 280" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="308,279 315,285 312,275" fill="#38bdf8" />
            <text x="340" y="298" fill="#38bdf8" fontSize="10" fontWeight="bold">TIER 2 (CCW: -Ω₂)</text>
          </g>

          {/* Airflow & Swirl Cancellation Vectors */}
          <path d="M40 100 L120 100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="125,100 115,96 115,104" fill="#38bdf8" />
          <path d="M40 220 L120 220" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="125,220 115,216 115,224" fill="#38bdf8" />
          <text x="45" y="85" fill="#38bdf8" fontSize="10" fontWeight="bold">INCOMING STREAM</text>

          {/* Downstream Straightened Streamtube */}
          <path d="M460 120 Q510 120 560 120" stroke="#22c55e" strokeWidth="2" />
          <polygon points="565,120 555,116 555,124" fill="#22c55e" />
          <path d="M460 220 Q510 220 560 220" stroke="#22c55e" strokeWidth="2" />
          <polygon points="565,220 555,216 555,224" fill="#22c55e" />
          <text x="470" y="175" fill="#22c55e" fontSize="10" fontWeight="bold">STRAIGHTENED WAKE</text>
          <text x="470" y="190" fill="#94a3b8" fontSize="9">(Swirl kinetic losses recovered)</text>
        </svg>
      );

    case 'variable-pitch':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Variable-Pitch Giromill Technical Schematic">
          <defs>
            <pattern id="grid-vp" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-vp)" />

          {/* Central Hub & Circular Track (Top-Down Orthographic View) */}
          <circle cx="300" cy="190" r="120" fill="none" stroke="#1e293b" strokeWidth="4" strokeDasharray="6 4" />
          <circle cx="300" cy="190" r="28" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="300" cy="190" r="6" fill="#38bdf8" />
          <text x="300" y="194" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">HUB SHAFT</text>

          {/* Radial Support Struts */}
          <line x1="300" y1="190" x2="300" y2="70" stroke="#0ea5e9" strokeWidth="2.5" />
          <line x1="300" y1="190" x2="196" y2="250" stroke="#0ea5e9" strokeWidth="2.5" />
          <line x1="300" y1="190" x2="404" y2="250" stroke="#0ea5e9" strokeWidth="2.5" />

          {/* Blade 1 (Top / Upwind) - Actively Pitched +15 deg */}
          <g transform="translate(300, 70) rotate(-15)">
            <ellipse cx="0" cy="0" rx="9" ry="38" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2" />
            <circle cx="0" cy="-10" r="3.5" fill="#ef4444" />
            <line x1="0" y1="-45" x2="0" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          </g>
          <text x="320" y="55" fill="#22d3ee" fontSize="10" fontWeight="bold">BLADE 1: +15° POSITIVE ATTACK</text>
          <text x="320" y="68" fill="#94a3b8" fontSize="9">(Peak aerodynamic lift torque)</text>

          {/* Blade 2 (Retreating Downwind) - Feathered to 0 deg */}
          <g transform="translate(196, 250) rotate(55)">
            <ellipse cx="0" cy="0" rx="9" ry="38" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2" />
            <circle cx="0" cy="-10" r="3.5" fill="#ef4444" />
          </g>
          <text x="75" y="275" fill="#22d3ee" fontSize="10" fontWeight="bold">BLADE 2: FEATHERED</text>
          <text x="75" y="288" fill="#94a3b8" fontSize="9">(Suppresses drag stall)</text>

          {/* Blade 3 (Advancing) - Pitched -12 deg */}
          <g transform="translate(404, 250) rotate(-45)">
            <ellipse cx="0" cy="0" rx="9" ry="38" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2" />
            <circle cx="0" cy="-10" r="3.5" fill="#ef4444" />
          </g>
          <text x="420" y="275" fill="#22d3ee" fontSize="10" fontWeight="bold">BLADE 3: -12° CYCLIC PITCH</text>

          {/* Mechanical Linkage Cam / Servo Ring */}
          <circle cx="300" cy="190" r="55" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="300" y="145" fill="#f59e0b" fontSize="9" textAnchor="middle">ECCENTRIC CAM LINKAGE</text>

          {/* Inflow Wind Direction */}
          <line x1="60" y1="50" x2="160" y2="50" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="165,50 155,46 155,54" fill="#38bdf8" />
          <text x="60" y="40" fill="#38bdf8" fontSize="10" fontWeight="bold">FREE STREAM WIND (V∞)</text>
        </svg>
      );

    case 'phi-rotor':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Ø-Rotor Floating VAWT Blueprint">
          <defs>
            <pattern id="grid-pr" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-pr)" />

          {/* Sea Surface & Wave Waterline */}
          <line x1="40" y1="280" x2="560" y2="280" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="8 4" opacity="0.8" />
          <text x="50" y="272" fill="#0ea5e9" fontSize="10" fontWeight="bold">SEA LEVEL DATUM</text>

          {/* Tilted Floating Platform Body */}
          <g transform="translate(300, 290) rotate(14)">
            {/* Buoyant Floater Body */}
            <rect x="-80" y="-15" width="160" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            {/* Deep Water Ballast & Generator Core */}
            <rect x="-40" y="0" width="80" height="25" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="0" y="16" fill="#22d3ee" fontSize="8" textAnchor="middle" fontWeight="bold">SUBMERGED GEN & BALLAST</text>

            {/* Giant V-Shaped Rotor Arms (Ø-Configuration) */}
            <path d="M0 0 L-140 -240" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
            <path d="M0 0 L140 -240" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
            {/* Top Tie-Rod Cable */}
            <line x1="-140" y1="-240" x2="140" y2="-240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 3" />
            {/* Blade Elements */}
            <rect x="-146" y="-245" width="12" height="18" rx="2" fill="#0284c7" />
            <rect x="134" y="-245" width="12" height="18" rx="2" fill="#0284c7" />

            {/* Center Pivot Bearing */}
            <circle cx="0" cy="0" r="10" fill="#f59e0b" />
          </g>

          {/* Inverted Pendulum Kinematics Overlay */}
          <path d="M300 290 L300 50" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="305" y="70" fill="#64748b" fontSize="10">TRUE VERTICAL</text>

          {/* Tilt Arc */}
          <path d="M300 120 A170 170 0 0 1 342 125" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <text x="350" y="125" fill="#22d3ee" fontSize="11" fontWeight="bold">θ = 14° PASSIVE TILT</text>

          {/* Taut Mooring Lines to Seabed */}
          <line x1="240" y1="310" x2="120" y2="370" stroke="#f59e0b" strokeWidth="2" />
          <line x1="360" y1="310" x2="480" y2="370" stroke="#f59e0b" strokeWidth="2" />
          <text x="130" y="360" fill="#f59e0b" fontSize="9">TAUT TETHER</text>
          <text x="410" y="360" fill="#f59e0b" fontSize="9">TAUT TETHER</text>
        </svg>
      );

    case 'magnus-effect':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Magnus Effect Turbine Schematic">
          <defs>
            <pattern id="grid-me" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-me)" />

          {/* Central Rotating Cylinder Section (Cross-Section & Aerodynamic Flow) */}
          <circle cx="260" cy="190" r="55" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="260" cy="190" r="45" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="260" cy="190" r="8" fill="#f59e0b" />
          <text x="260" y="194" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">MOTOR AXIS</text>

          {/* Cylinder Rotation Direction Indicator (Clockwise) */}
          <path d="M 260 115 A 75 75 0 0 1 335 190" fill="none" stroke="#22d3ee" strokeWidth="3" />
          <polygon points="335,193 330,183 340,183" fill="#22d3ee" />
          <text x="285" y="130" fill="#22d3ee" fontSize="11" fontWeight="bold">SPIN: +ω (HIGH RPM)</text>

          {/* Aerodynamic Streamlines (Magnus Asymmetry) */}
          {/* Top side: Accelerated flow = Low Pressure */}
          <path d="M60 110 C150 110, 200 90, 260 90 C320 90, 370 120, 480 120" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M60 135 C160 135, 210 115, 260 115 C310 115, 360 145, 480 145" fill="none" stroke="#38bdf8" strokeWidth="2" />
          <text x="260" y="75" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">HIGH VELOCITY / LOW PRESSURE ZONE</text>

          {/* Bottom side: Decelerated flow = High Pressure */}
          <path d="M60 270 C160 270, 210 280, 260 280 C320 280, 380 260, 480 260" fill="none" stroke="#64748b" strokeWidth="2" />
          <path d="M60 245 C150 245, 210 260, 260 260 C310 260, 370 235, 480 235" fill="none" stroke="#64748b" strokeWidth="2.5" />
          <text x="260" y="310" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">STAGNATION / HIGH PRESSURE ZONE</text>

          {/* Net Generated Magnus Lift Vector (Pointing Upward) */}
          <line x1="260" y1="190" x2="260" y2="40" stroke="#22c55e" strokeWidth="4" />
          <polygon points="260,30 252,45 268,45" fill="#22c55e" />
          <text x="275" y="45" fill="#22c55e" fontSize="12" fontWeight="bold">MAGNUS LIFT FORCE (L)</text>
          <text x="275" y="60" fill="#94a3b8" fontSize="9">CL = 8.0 - 10.0 (5x conventional blade)</text>

          {/* Incoming Flow Direction */}
          <line x1="60" y1="190" x2="160" y2="190" stroke="#38bdf8" strokeWidth="2.5" />
          <polygon points="165,190 155,185 155,195" fill="#38bdf8" />
          <text x="60" y="180" fill="#38bdf8" fontSize="10" fontWeight="bold">WIND VELOCITY (V∞)</text>
        </svg>
      );

    case 'multi-rotor':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Multi-Rotor HAWT Array Engineering Blueprint">
          <defs>
            <pattern id="grid-mr" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-mr)" />

          {/* Main Central Mast */}
          <line x1="300" y1="360" x2="300" y2="150" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
          <line x1="300" y1="360" x2="300" y2="150" stroke="#94a3b8" strokeWidth="2" />

          {/* Lightweight Spaceframe Tubular Grid */}
          <polygon points="180,80 420,80 420,240 180,240" fill="rgba(14, 165, 233, 0.05)" stroke="#0ea5e9" strokeWidth="3" />
          {/* Diagonal Cross-Bracing */}
          <line x1="180" y1="80" x2="420" y2="240" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="420" y1="80" x2="180" y2="240" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Rotor 1 (Top Left) */}
          <circle cx="180" cy="80" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="180" cy="80" r="50" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="180" y1="30" x2="180" y2="130" stroke="#e2e8f0" strokeWidth="3.5" />
          <line x1="130" y1="80" x2="230" y2="80" stroke="#e2e8f0" strokeWidth="3.5" />
          <text x="180" y="84" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">R1</text>

          {/* Rotor 2 (Top Right) */}
          <circle cx="420" cy="80" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="420" cy="80" r="50" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="420" y1="30" x2="420" y2="130" stroke="#e2e8f0" strokeWidth="3.5" />
          <line x1="370" y1="80" x2="470" y2="80" stroke="#e2e8f0" strokeWidth="3.5" />
          <text x="420" y="84" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">R2</text>

          {/* Rotor 3 (Bottom Left) */}
          <circle cx="180" cy="240" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="180" cy="240" r="50" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="180" y1="190" x2="180" y2="290" stroke="#e2e8f0" strokeWidth="3.5" />
          <line x1="130" y1="240" x2="230" y2="240" stroke="#e2e8f0" strokeWidth="3.5" />
          <text x="180" y="244" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">R3</text>

          {/* Rotor 4 (Bottom Right) */}
          <circle cx="420" cy="240" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="420" cy="240" r="50" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="420" y1="190" x2="420" y2="290" stroke="#e2e8f0" strokeWidth="3.5" />
          <line x1="370" y1="240" x2="470" y2="240" stroke="#e2e8f0" strokeWidth="3.5" />
          <text x="420" y="244" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">R4</text>

          {/* Engineering Annotations */}
          <text x="300" y="160" fill="#22d3ee" fontSize="10" textAnchor="middle" fontWeight="bold">COMMON LATTICE FRAME</text>
          <text x="300" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle">4x Modular 3 MW Nacelles (12 MW Total)</text>
          <text x="300" y="188" fill="#22c55e" fontSize="9" textAnchor="middle" fontWeight="bold">Blade Weight Reduced by 45% (L³ Law)</text>
        </svg>
      );

    case 'diffuser-dawt':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Diffuser-Augmented Wind Turbine Schematic">
          <defs>
            <pattern id="grid-dw" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-dw)" />

          {/* Flared Aerodynamic Shroud / Duct Top Half */}
          <path d="M 170 120 Q 240 135 320 100 L 320 70 L 340 70 L 340 105 Q 240 145 170 130 Z" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          {/* Brim at exit */}
          <rect x="330" y="65" width="15" height="45" fill="#f59e0b" rx="2" />

          {/* Flared Aerodynamic Shroud / Duct Bottom Half */}
          <path d="M 170 260 Q 240 245 320 280 L 320 310 L 340 310 L 340 275 Q 240 235 170 250 Z" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          {/* Brim at exit bottom */}
          <rect x="330" y="270" width="15" height="45" fill="#f59e0b" rx="2" />

          {/* Central Nacelle & Rotor Plane inside Throat */}
          <ellipse cx="230" cy="190" rx="35" ry="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          {/* Rotor Blades inside Shroud */}
          <line x1="230" y1="138" x2="230" y2="242" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
          <circle cx="230" cy="190" r="6" fill="#0284c7" />

          {/* Low-Pressure Wake Vortex Depression behind Exit Brim */}
          <ellipse cx="370" cy="100" rx="22" ry="14" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <ellipse cx="370" cy="280" rx="22" ry="14" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="400" y="105" fill="#ef4444" fontSize="9" fontWeight="bold">EXIT VORTEX RING</text>
          <text x="400" y="285" fill="#ef4444" fontSize="9" fontWeight="bold">LOW-PRESSURE RECESS</text>

          {/* Converging Streamlines Being Drawn Through Throat */}
          <path d="M 60 90 Q 140 100 230 145 Q 320 160 480 160" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
          <path d="M 60 190 L 480 190" fill="none" stroke="#22d3ee" strokeWidth="3" />
          <path d="M 60 290 Q 140 280 230 235 Q 320 220 480 220" fill="none" stroke="#22d3ee" strokeWidth="2.5" />

          <text x="60" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">CONCENTRATED MASS FLUX</text>
          <text x="60" y="90" fill="#94a3b8" fontSize="9">Airflow accelerated by exit depression</text>

          <text x="440" y="185" fill="#22c55e" fontSize="11" fontWeight="bold">CP = 1.4 - 1.8</text>
          <text x="440" y="200" fill="#94a3b8" fontSize="9">(Exceeds standard Betz limit)</text>
        </svg>
      );

    case 'downwind-hawt':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Downwind HAWT Blueprint">
          <defs>
            <pattern id="grid-dw2" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-dw2)" />

          {/* Support Tower (Upwind of Rotor) */}
          <line x1="220" y1="360" x2="220" y2="120" stroke="#475569" strokeWidth="18" strokeLinecap="round" />
          <line x1="220" y1="360" x2="220" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 6" />
          <text x="220" y="375" fill="#94a3b8" fontSize="10" textAnchor="middle">UPWIND TOWER MAST</text>

          {/* Nacelle housing on top of tower */}
          <rect x="180" y="100" width="130" height="40" rx="5" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
          <text x="245" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">NACELLE</text>

          {/* Downwind Rotor Hub (Positioned to the right / downwind) */}
          <polygon points="310,120 340,110 340,130" fill="#0284c7" />

          {/* Flexible Aeroelastic Blades Coning Away from Tower */}
          {/* Upper blade curving backward downwind */}
          <path d="M 330 110 Q 350 70 385 25" fill="none" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
          <path d="M 330 110 Q 350 70 385 25" fill="none" stroke="#22d3ee" strokeWidth="2" />

          {/* Lower blade curving backward downwind */}
          <path d="M 330 130 Q 350 170 385 215" fill="none" stroke="#e2e8f0" strokeWidth="7" strokeLinecap="round" />
          <path d="M 330 130 Q 350 170 385 215" fill="none" stroke="#22d3ee" strokeWidth="2" />

          {/* Coning Angle Marker */}
          <line x1="330" y1="120" x2="330" y2="20" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 330 50 A 60 60 0 0 1 365 42" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="375" y="52" fill="#f59e0b" fontSize="10" fontWeight="bold">CONING ANGLE γ = 12°</text>

          {/* Wind Inflow Direction from Left to Right */}
          <line x1="60" y1="120" x2="160" y2="120" stroke="#38bdf8" strokeWidth="3" />
          <polygon points="165,120 155,114 155,126" fill="#38bdf8" />
          <text x="60" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">INFLOW WIND</text>

          {/* Tower Clearance Guarantee */}
          <text x="350" y="150" fill="#22c55e" fontSize="10" fontWeight="bold">ZERO TOWER STRIKE RISK</text>
          <text x="350" y="165" fill="#94a3b8" fontSize="9">Blades cone naturally away from steel mast</text>
          <text x="350" y="178" fill="#94a3b8" fontSize="9">Passive weather-vane yaw stability</text>
        </svg>
      );

    case 'airborne-drone':
      return (
        <svg viewBox="0 0 600 380" className="tech-blueprint-svg" aria-label="Airborne Wind Energy System Blueprint">
          <defs>
            <pattern id="grid-aw" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14, 165, 233, 0.08)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="600" height="380" fill="#081320" />
          <rect width="600" height="380" fill="url(#grid-aw)" />

          {/* Ground Station with Winch Drum & Generator */}
          <rect x="80" y="310" width="110" height="45" rx="4" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="135" cy="332" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="135" cy="332" r="4" fill="#f59e0b" />
          <text x="135" y="322" fill="#94a3b8" fontSize="7" textAnchor="middle">WINCH DRUM</text>
          <text x="135" y="370" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">GROUND GENERATION STATION</text>

          {/* High-Altitude Wind Profile Gradient Lines */}
          <line x1="40" y1="80" x2="560" y2="80" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="50" y="74" fill="#38bdf8" fontSize="10">HIGH-ALTITUDE JET CORRIDOR: 400 METERS AGL</text>

          {/* High-Tension Tether */}
          <line x1="135" y1="332" x2="420" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 2" />
          <text x="240" y="240" fill="#f59e0b" fontSize="9" fontWeight="bold" transform="rotate(-36 240 240)">
            DYNEEMA UHMWPE TETHER (HIGH TENSION)
          </text>

          {/* Figure-Eight Crosswind Trajectory Loop */}
          <path d="M 370 120 C 370 80, 470 80, 470 120 C 470 160, 370 160, 370 120 Z" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 3" />
          <text x="420" y="100" fill="#22d3ee" fontSize="9" textAnchor="middle">FIGURE-8 CROSSWIND FLIGHT</text>

          {/* Autonomous Tethered Drone Wing */}
          <g transform="translate(420, 120) rotate(-25)">
            {/* Main Swept Wing */}
            <polygon points="-28,-5 28,-5 20,4 -20,4" fill="#e2e8f0" stroke="#0284c7" strokeWidth="1.5" />
            {/* Fuselage & Tail */}
            <rect x="-3" y="-12" width="6" height="22" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="-12,8 12,8 8,12 -8,12" fill="#0284c7" />
          </g>

          {/* Force Vectors */}
          <line x1="420" y1="120" x2="475" y2="65" stroke="#22c55e" strokeWidth="2.5" />
          <polygon points="480,60 468,68 474,74" fill="#22c55e" />
          <text x="485" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">LIFT TRACTION (PULL)</text>

          {/* Wind Speed Gradient Bar */}
          <line x1="40" y1="280" x2="40" y2="80" stroke="#64748b" strokeWidth="3" />
          <polygon points="40,75 35,85 45,85" fill="#64748b" />
          <text x="50" y="180" fill="#94a3b8" fontSize="9">WIND VELOCITY V(z) INCREASES WITH ALTITUDE</text>
        </svg>
      );

    default:
      return null;
  }
}
