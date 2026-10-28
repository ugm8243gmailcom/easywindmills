/**
 * EasyWindmill: Advanced Turbine Tech Data
 * 
 * In-depth technical specifications, working principles, aerodynamic physics,
 * and real-world deployment records for unconventional VAWT and HAWT wind turbine systems.
 */

export const ADVANCED_TURBINE_CATEGORIES = [
  {
    id: 'counter-rotating-vawt',
    title: 'Counter-Rotating Vertical Axis Wind Turbines (VAWTs)',
    shortTitle: 'Counter-Rotating VAWT',
    family: 'VAWT Architecture',
    badge: 'Coaxial Counter-Rotation',
    concept: 'Splits the rotor into two or more independent coaxial tiers spinning in opposite directions on the same central axis.',
    coreProblemSolved: 'Eliminates downstream wake swirl (recovering lost kinetic energy), cancels out net reactive torque on the drive shaft, and lowers the structural center of gravity for floating deep-water farms.',
    physicsAndOperation: [
      'Wake Swirl Kinetic Recovery: In conventional single-rotor turbines, rotational torque applied to the rotor induces an equal and opposite helical swirl in the downstream wake. The counter-rotating second tier intercepts this swirling wake, straightening the exit streamtube and converting residual swirl kinetic energy into additional electrical shaft power (boosting total aerodynamic efficiency by 12% to 25%).',
      'Net Torque Cancellation: Counter-rotating stages exert equal and opposing reactive moments on the central support column. On floating offshore substructures, this cancels the continuous overturning yaw moment, reducing mooring line tension loads and stabilizing floating platform orientation.',
      'Deck-Level Coaxial Generator: Both rotor shafts drive a dual-rotor coaxial generator situated at or near base/deck level, lowering the nacelle mass to near zero and dramatically reducing topside mass on floating offshore installations.'
    ],
    technicalSpecs: [
      { label: 'Rotor Configuration', value: 'Dual coaxial counter-rotating Darrieus/H-rotor tiers' },
      { label: 'Shaft Topology', value: 'Concentric inner and outer drive shafts' },
      { label: 'Efficiency Gain', value: '+12% to +25% over equivalent single-rotor VAWT' },
      { label: 'Generator Machine', value: 'Direct-drive coaxial contra-rotating PMSG at tower base' },
      { label: 'Floating Advantage', value: 'Zero net steady-state reactive overturning torque' }
    ],
    diagramType: 'counter-rotating',
    realImplementations: [
      {
        id: 'seatwirl-s2',
        title: 'SeaTwirl S2 Floating Offshore VAWT',
        developer: 'SeaTwirl AB',
        location: 'Bokn Offshore Test Site, Rogaland, Norway',
        status: 'Full-Scale 1 MW Offshore Demonstration',
        image: '/turbines/real-seatwirl-s2.jpg',
        specs: '1 MW Rated | 55 m Rotor Diameter | Submerged Spar Direct-Drive',
        description: 'A floating spar-buoy vertical turbine where the entire rotating tower and below-water ballast axle rotate as a rigid unit inside a buoyant non-rotating collar housing the subsea generator and mooring attachment points.'
      },
      {
        id: 'world-wide-wind',
        title: 'World Wide Wind (WWW) 30 MW Contra-Rotating VAWT',
        developer: 'World Wide Wind AS',
        location: 'Vats Floating Wind Hub, Norway',
        status: '30 MW Commercial Offshore Engineering Program',
        image: '/turbines/real-worldwidewind-cr.jpg',
        specs: '30 MW Multi-Tier | Dual Contra-Rotating Rotors | Passive Spar Tilting',
        description: 'Features two sets of 3-bladed vertical rotors rotating in opposing directions around a single central column. The counter-rotating torque cancels gyroscopic and reactive overturning moments on the floating spar, enabling unprecedented scaling up to 30 MW.'
      }
    ]
  },
  {
    id: 'variable-pitch-giromill',
    title: 'Variable-Pitch Giromills',
    shortTitle: 'Variable-Pitch Giromill',
    family: 'Unconventional VAWT Systems',
    badge: 'Cyclic Pitch Control',
    concept: 'Straight-bladed vertical turbines equipped with active mechanical linkage or servo systems that continuously cycle the blade angle of attack through a full 360-degree rotation.',
    coreProblemSolved: 'Overcomes traditional Darrieus self-starting failures and prevents aerodynamic stall at high tip-speed ratios.',
    physicsAndOperation: [
      'Continuous Cyclic Angle-of-Attack Modulation: In a fixed-pitch H-rotor, the relative wind vector angle of attack varies wildly from positive stall to negative stall over a single azimuth revolution. The variable-pitch Giromill actively pivots each blade about its chordline quarter-chord via eccentric cam linkages or individual electromechanical actuators.',
      'Self-Starting Torque Generation: At zero initial rotor speed (TSR = 0), fixed blades experience symmetric boundary-layer separation with zero net torque. By pitching the upwind blade into a high-lift angle (+12° to +18°) and feathering the retreating blade (-15°), the rotor develops immediate positive breakaway torque in light breezes (as low as 1.8 m/s).',
      'Dynamic Stall Suppression: At peak operational speeds, dynamic pitch cycling keeps the instantaneous blade angle within the linear lift slope, suppressing the shedding of destructive dynamic stall leading-edge vortices.'
    ],
    technicalSpecs: [
      { label: 'Pitch Mechanism', value: 'Eccentric mechanical cam track or high-speed servo actuators' },
      { label: 'Cut-In Wind Speed', value: '1.8 - 2.2 m/s (vs 4.5 m/s for fixed-pitch Darrieus)' },
      { label: 'Azimuthal Pitch Range', value: '-20° to +20° continuous sinusoidal cycling' },
      { label: 'Blade Profile', value: 'Symmetric NACA 0018 / DU 06-W-200 aerofoils' },
      { label: 'Aerodynamic Fatigue', value: 'Cyclic peak bending loads attenuated by ~30%' }
    ],
    diagramType: 'variable-pitch',
    realImplementations: [
      {
        id: 'agile-verticalsky',
        title: 'Agile Wind Power Vertical Sky A32',
        developer: 'Agile Wind Power AG (Switzerland)',
        location: 'Grevenbroich Wind Test Facility, Germany',
        status: '750 kW Full-Scale Field Prototype',
        image: '/turbines/real-agile-verticalsky.jpg',
        specs: '750 kW Rated | 32 m Rotor Diameter | Active Continuous Pitch',
        description: 'The worlds first utility-scale variable-pitch vertical axis wind turbine. High-speed electromechanical pitch actuators in each blade root continuously adjust the blade angle of attack throughout each revolution, eliminating dynamic stall and acoustic noise.'
      },
      {
        id: 'mcdonnell-giromill',
        title: 'McDonnell Douglas 40 kW Giromill',
        developer: 'McDonnell Douglas / US Department of Energy',
        location: 'Rocky Flats National Wind Test Site, Colorado, USA',
        status: 'Historic DOE Cycloturbine Field Program',
        image: '/turbines/real-mcdonnell-giromill.svg',
        specs: '40 kW Rated | 18.3 m Span | Cam-Driven Mechanical Pitch',
        description: 'Groundbreaking cycloturbine prototype engineered with straight vertical NACA 0018 blades coupled through radial pushrods to a central cam bearing, demonstrating reliable self-starting at low wind velocities (under 2 m/s).'
      }
    ]
  },
  {
    id: 'phi-rotor-floating-vawt',
    title: 'Ø-Rotor (Floating V-Shaped VAWTs)',
    shortTitle: 'Ø-Rotor / V-Shaped VAWT',
    family: 'Unconventional VAWT Systems',
    badge: 'Inverted Pendulum Floater',
    concept: 'Giant V-shaped vertical configurations designed to tilt with the wind as an inverted pendulum over deep-water floating foundations.',
    coreProblemSolved: 'Bypasses extreme bending moments at the base of rigid vertical towers.',
    physicsAndOperation: [
      'Passive Load-Shedding Inverted Pendulum: When high aerodynamic thrust pushes against the giant V-shaped swept area, the entire buoyant floating platform tilts downstream by 10° to 25°. This tilting naturally shrinks the projected frontal swept area exposed to extreme storm winds, creating passive load relief without requiring complex blade pitch systems.',
      'Direct Rotor-to-Deck Structural Load Path: The V-shaped rotor blades connect directly to the low-profile deck hub without an elevated cantilever tower mast. The massive cantilever root bending moment typical of 150-meter steel HAWT towers is completely eliminated.',
      'Low Center of Mass (CoM): The heavy multi-megawatt generator, transformers, power converters, and mooring load interfaces are housed directly inside the buoyant hull, drastically lowering platform draft and ballasting requirements.'
    ],
    technicalSpecs: [
      { label: 'Geometry', value: 'Cantilever V-shaped dual-blade dihedral array' },
      { label: 'Platform Kinematics', value: 'Controlled tilt angle (0° to 28° off vertical)' },
      { label: 'Tower Bending Moment', value: 'Virtually eliminated; loads transferred directly to deck' },
      { label: 'Operating Water Depth', value: 'Deep water (> 80 m to 1000 m+)' },
      { label: 'Scalability Potential', value: 'Suited for 15 MW to 25 MW offshore ultra-large turbines' }
    ],
    diagramType: 'phi-rotor',
    realImplementations: [
      {
        id: 'deepwind-vrotor',
        title: 'DeepWind 5 MW Floating Offshore V-Rotor',
        developer: 'DTU Wind Energy / EU FP7 Consortium',
        location: 'Risø Campus & North Sea Deep-Water Test Basin, Denmark',
        status: 'EU FP7 5 MW Multi-Megawatt Engineering Program',
        image: '/turbines/real-deepwind-vrotor.jpg',
        specs: '5 MW Rated | Darrieus V-Blade Geometry | Rotating Spar Shaft',
        description: 'Pioneered an inverted-pendulum V-shaped rotor mounted atop a rotating slender spar buoy that tilts naturally with aerodynamic thrust, dramatically decreasing tower bending stress and lowering drivetrain mass to deep ocean depths.'
      },
      {
        id: 'touchwind-floater',
        title: 'TouchWind 6 MW Tilting Mono-Rotor Floater',
        developer: 'TouchWind B.V. (Netherlands)',
        location: 'Port of Rotterdam / Oostvoorne Lake Field Trials',
        status: 'Scale-Model Field Validated & 6 MW Demonstrator',
        image: '/turbines/real-touchwind-floater.svg',
        specs: '6 MW Rated | Single-Piece Two-Bladed Rotor | 0°-25° Tilt Range',
        description: 'Engineered with a low-cost rigid two-bladed rotor tethered to a floating spar buoy that pitches over into a tilted orientation during high winds, shedding extreme storm loads without expensive individual blade pitch bearings.'
      }
    ]
  },
  {
    id: 'magnus-effect-cylinders',
    title: 'Magnus-Effect / Cylinder Turbines',
    shortTitle: 'Magnus-Effect Turbine',
    family: 'Unconventional VAWT Systems',
    badge: 'Spinning Cylinder Aerodynamics',
    concept: 'Replaces standard aerodynamic blades with smooth, motor-driven spinning cylinders that generate transverse lift via the Magnus effect.',
    coreProblemSolved: 'Simplifies blade geometry and allows dynamic lift adjustment simply by altering cylinder rotation speed.',
    physicsAndOperation: [
      'Magnus Lift Generation: When an electric motor spins a cylinder in an incoming crosswind, the air speed increases on the side rotating with the wind (low pressure) and decreases on the side rotating against it (high pressure). This asymmetric Bernoulli pressure differential generates immense transverse aerodynamic lift perpendicular to the relative wind stream.',
      'Unsurpassed Lift Coefficients: Traditional aerodynamic aerofoils stall at maximum lift coefficients (CL) around 1.4 to 1.8. Rotating Magnus cylinders routinely generate lift coefficients exceeding CL = 8 to 10 without geometric stall.',
      'Zero-Geometry Dynamic Load Regulation: In extreme storm winds, aerodynamic lift can be instantly dialed to zero in milliseconds simply by cutting electric power to the cylinder rotation motors, providing fail-safe aerodynamic protection without complex mechanical pitch bearings.'
    ],
    technicalSpecs: [
      { label: 'Rotor Elements', value: 'Smooth or spiral-finned motorized composite cylinders' },
      { label: 'Lift Coefficient (CL)', value: 'CL = 6.0 - 10.0 (5x higher than conventional airfoils)' },
      { label: 'Spin Velocity Ratio', value: 'Cylinder surface speed / wind speed = 2.0 to 4.0' },
      { label: 'Auxiliary Motor Power', value: 'Consumes ~5% to 8% of generated power for cylinder spin' },
      { label: 'Structural Durability', value: 'Cylindrical geometry resists extreme torsional gust loads' }
    ],
    diagramType: 'magnus-effect',
    realImplementations: [
      {
        id: 'challenergy-typhoon',
        title: 'Challenergy Typhoon Magnus Wind Turbine',
        developer: 'Challenergy Inc. (Tokyo, Japan)',
        location: 'Ishigaki Island (Okinawa) & Batanes, Philippines',
        status: '10 kW Grid-Connected Commercial Typhoon-Proof Fleet',
        image: '/turbines/real-challenergy-magnus.jpg',
        specs: '10 kW Rated | 3 Motorized Vertical Cylinders | Category 5 Survival',
        description: 'Replaces airfoil blades with 3 spinning vertical cylinders that generate aerodynamic lift via the Magnus effect. When hit by typhoons exceeding 60 m/s (216 km/h), the cylinders maintain controlled power generation where conventional bladed turbines would shatter.'
      },
      {
        id: 'enercon-eship',
        title: 'Enercon E-Ship 1 Commercial Rotor Vessel',
        developer: 'Enercon GmbH (Aurich, Germany)',
        location: 'Global Commercial Sea Routes / Lindenau Shipyard',
        status: 'Commercial Maritime Fleet Deployment (15+ Years Service)',
        image: '/turbines/real-enercon-eship1.jpg',
        specs: '4x 27 m Flettner Cylinders | 4 m Diameter | Up to 25% Fuel Savings',
        description: 'A 130-meter commercial cargo ship powered by four massive motorized spinning composite cylinders standing on the deck. Operating via the Magnus effect, the rotating cylinders convert crosswinds into forward auxiliary propulsion.'
      }
    ]
  },
  {
    id: 'multi-rotor-coaxial-hawt',
    title: 'Multi-Rotor / Co-Axial HAWT Arrays',
    shortTitle: 'Multi-Rotor HAWT Arrays',
    family: 'Unconventional HAWT Systems',
    badge: 'Modular Multi-Rotor Lattice',
    concept: 'Places multiple smaller horizontal rotors onto a single grid structure or nacelle instead of one massive monolithic blade pair.',
    coreProblemSolved: 'Reduces individual blade weight, eases logistics and transport, and scales up capture area without building unmanageably long single blades.',
    physicsAndOperation: [
      'Square-Cube Scaling Law Overcome: In wind turbine engineering, rotor swept area (and power capture) scales with the square of blade length (L²), but blade structural mass and gravity fatigue scale with the cube of length (L³). By deploying an array of e.g. four 50-meter rotors instead of one giant 100-meter rotor, total rotor blade mass is reduced by over 50% for identical power output.',
      'Logistics and Highway Transport: 50-meter blades and standard 3 MW drivetrains can be transported on standard semi-trailers over conventional highway networks without requiring specialized road closures, escort convoys, or specialized coastal harbors.',
      'Accelerated Array Wake Mixing: The vortex wakes shed by multiple adjacent small rotors interact and induce rapid turbulent breakdown of velocity deficits, recovering ambient wind kinetic velocity within 3 to 4 rotor diameters (compared to 7 to 10 diameters for monolithic single rotors).'
    ],
    technicalSpecs: [
      { label: 'Array Structure', value: 'Lightweight tetrahedral tubular steel spaceframe' },
      { label: 'Rotor Count', value: '4 to 12 modular standardized rotor-generator units' },
      { label: 'Mass Savings', value: '> 40% reduction in total composite blade and drivetrain mass' },
      { label: 'Redundancy', value: 'Single rotor maintenance does not stop remaining units' },
      { label: 'Wake Recovery Distance', value: '3 - 4D downstream (vs 8D for monolithic single rotor)' }
    ],
    diagramType: 'multi-rotor',
    realImplementations: [
      {
        id: 'vestas-4rotor',
        title: 'Vestas 4-Rotor Multi-Rotor Demonstrator',
        developer: 'Vestas Wind Systems & DTU Risø',
        location: 'DTU Risø Campus, Roskilde, Denmark',
        status: 'Full-Scale 4x V29 Operational Demonstration',
        image: '/turbines/real-vestas-4rotor.jpg',
        specs: '4x 225 kW Rotors (900 kW total) | 48 m Spaceframe Lattice | 4-in-1 Tower',
        description: 'Installed four refurbished Vestas V29 nacelles on a single tubular steel spaceframe tower. The multi-rotor demonstrator confirmed 1.5% aerodynamic interaction lift bonus, rapid wake dissipation within 3 rotor diameters, and over 40% reduction in blade mass.'
      },
      {
        id: 'hexicon-twinwind',
        title: 'Hexicon TwinWind Floating Offshore Platform',
        developer: 'Hexicon AB (Stockholm, Sweden)',
        location: 'Dounreay Tri (Scotland) & MunmuBaram Project (South Korea)',
        status: 'Multi-Megawatt Deep-Water Commercial Foundation',
        image: '/turbines/real-hexicon-twinwind.jpg',
        specs: '2x 8 MW - 15 MW Turbines | Triangular Semi-Submersible | Passive Weathervaning',
        description: 'Mounts two large horizontal wind turbines on a single triangular floating foundation that passively weathervanes around a single mooring turret, capturing double the power per maritime seabed lease area.'
      }
    ]
  },
  {
    id: 'diffuser-augmented-dawt',
    title: 'Diffuser-Augmented (Ducted) Wind Turbines (DAWTs)',
    shortTitle: 'Diffuser-Augmented (DAWT)',
    family: 'Unconventional HAWT Systems',
    badge: 'Diffuser Shroud Aerodynamics',
    concept: 'Encloses the rotor inside an aerodynamic flared shroud or duct.',
    coreProblemSolved: 'The shroud creates a low-pressure exit zone that pulls significantly greater mass flow through the blades, boosting power output far beyond what an un-ducted rotor of the same diameter can achieve.',
    physicsAndOperation: [
      'Venturi Suction and Mass Flux Augmentation: The annular duct features a converging-diverging nozzle geometry with a wide brim at the exit. The expanding diffuser slows the exhaust air, creating a strong low-pressure depression directly behind the rotor plane that actively pulls ambient air through the rotor at velocities higher than free-stream wind.',
      'Transgressing the Classical Betz Limit: The classical Betz limit of Cp,max = 59.3% assumes an unconstrained streamtube in open air. By providing a fixed boundary wall and exit vortex ring suction, DAWTs achieve apparent power coefficients of Cp = 1.2 to 1.8 relative to the rotor blade diameter.',
      'Elimination of Blade Tip Vortices: The tight clearance between the blade tips and the interior shroud wall blocks high-pressure air from curling over the tip to the low-pressure side, eliminating blade-tip vortex losses and radically lowering aerodynamic acoustic noise.'
    ],
    technicalSpecs: [
      { label: 'Duct Topology', value: 'Flared aerodynamic shroud with rear expansion brim' },
      { label: 'Mass Flow Gain', value: '1.5x to 2.4x volume flux increase through rotor disk' },
      { label: 'Apparent Power Coeff.', value: 'Cp = 1.2 - 1.8 based on rotor disk area' },
      { label: 'Tip Losses', value: 'Virtually zero tip vortex formation' },
      { label: 'Aeroacoustic Noise', value: 'Substantial noise reduction due to vortex shielding' }
    ],
    diagramType: 'diffuser-dawt',
    realImplementations: [
      {
        id: 'kyushu-windlens',
        title: 'Kyushu University Windlens Marine Array',
        developer: 'Research Institute for Applied Mechanics (RIAM), Kyushu University',
        location: 'Hakata Bay Offshore Field Facility, Fukuoka, Japan',
        status: 'Field-Operational Floating Hexagonal DAWT Array',
        image: '/turbines/real-kyushu-windlens.jpg',
        specs: '3x 5 kW Windlens Turbines | Diffuser Ring with Exit Brim | 2.5x Power Boost',
        description: 'Features a perimeter ring shroud with an aerodynamic brim at the exit that sheds low-pressure vortices. The resulting low-pressure suction draws 1.6x higher wind velocity through the rotor disk, generating 2.5 times the electrical output of a bare turbine.'
      },
      {
        id: 'ogin-dawt',
        title: 'Ogin Energy / FloDesign Ducted Turbine Prototype',
        developer: 'Ogin Energy Inc. / FloDesign Wind Turbine',
        location: 'Deerfield, Massachusetts & Tehachapi Pass, California, USA',
        status: 'Full-Scale 100 kW Aerodynamic Shroud Demonstration',
        image: '/turbines/real-ogin-dawt.jpg',
        specs: '100 kW Rated | Dual-Slot Aerodynamic Diffuser | Stator Mixing Vanes',
        description: 'Utilized aerospace-derived mixer/ejector diffuser cowl technology adapted from jet engine nacelles. The slotted shroud injects high-energy bypass airflow into the wake, accelerating exit velocity and suppressing tip turbulence.'
      }
    ]
  },
  {
    id: 'downwind-hawt',
    title: 'Downwind HAWTs',
    shortTitle: 'Downwind HAWT',
    family: 'Unconventional HAWT Systems',
    badge: 'Aeroelastic Rotor Coning',
    concept: 'Positions the rotor downwind of the support tower rather than upstream.',
    coreProblemSolved: 'Allows flexible blades to cone away from the wind under high aerodynamic loads, preventing catastrophic tower strikes during severe wind gusts.',
    physicsAndOperation: [
      'Aeroelastic Rotor Coning: In standard upwind turbines, blades must be manufactured with extreme structural stiffness and pre-bend to prevent them from deflecting backward and striking the tower during sudden wind gusts. In a downwind turbine, thrust forces bend the blades safely away from the tower, allowing the rotor to use ultra-flexible, lightweight, slender composite blades.',
      'Passive Free-Yaw Alignment: The aerodynamic drag of the downwind rotor creates a natural windvane restoring moment, allowing passive alignment with incoming wind directions and reducing reliance on active high-maintenance yaw drive motors.',
      'Centrifugal and Thrust Load Balancing: At high rotational speeds, centrifugal forces pull outward along the blade span while aerodynamic thrust pushes downwind. In an aeroelastically coned downwind blade, these two forces naturally balance, reducing root flapwise bending fatigue.'
    ],
    technicalSpecs: [
      { label: 'Rotor Orientation', value: 'Downwind (lee of the support tower)' },
      { label: 'Blade Stiffness', value: 'Ultra-flexible composite allowing up to 15° coning deflection' },
      { label: 'Tower Clearance Hazard', value: 'Completely eliminated; blades bend away from mast' },
      { label: 'Yaw Mechanism', value: 'Passive weather-vaning with auxiliary damping' },
      { label: 'Weight Reduction', value: '25% - 35% lighter blade laminate schedules' }
    ],
    diagramType: 'downwind-hawt',
    realImplementations: [
      {
        id: 'hitachi-downwind',
        title: 'Hitachi HTW5.2-136 Downwind Offshore Turbine',
        developer: 'Hitachi Ltd. / Subsea Renewables',
        location: 'Fukushima FORWARD Offshore Demo & Kashima Port, Japan',
        status: '5.2 MW Commercial Offshore Typhoon Installation',
        image: '/turbines/real-hitachi-downwind.jpg',
        specs: '5.2 MW Rated | 136 m Rotor Diameter | Downwind Rotor Orientation',
        description: 'Engineered specifically for extreme typhoon zones and complex offshore sea-cliff up-drafts. Positioning the rotor downwind eliminates tower-blade collision risks, reduces yaw motor fatigue loads, and allows flexible blade coning.'
      },
      {
        id: 'vergnet-downwind',
        title: 'Vergnet GEV HP 275 kW Guyed Downwind System',
        developer: 'Vergnet SA (France)',
        location: 'Guadeloupe, Martinique, Reunion Island & Pacific Islands',
        status: 'Commercial Fleet (Over 1,000 Turbines Deployed Globally)',
        image: '/turbines/real-vergnet-downwind.svg',
        specs: '275 kW Rated | Two-Bladed Teetering Downwind Hub | Lowerable Guyed Mast',
        description: 'Operating downwind of a slender guy-wired tubular tower, the two flexible blades cone freely with heavy wind gusts. The entire tower can be winched flat to the ground in under 45 minutes ahead of category 5 tropical hurricanes.'
      }
    ]
  },
  {
    id: 'airborne-wind-energy-awes',
    title: 'Airborne Wind Energy Systems (AWES) / Tethered Drones',
    shortTitle: 'Airborne Wind Energy (AWES)',
    family: 'Unconventional HAWT Systems',
    badge: 'Tethered High-Altitude Drone',
    concept: 'Utilizes flying tethered aircraft or cross-wind kites that sweep across high-altitude winds (300 to 500 meters up).',
    coreProblemSolved: 'Accesses much stronger, steadier high-altitude winds without requiring immensely tall, heavy steel or concrete towers.',
    physicsAndOperation: [
      'Access to Boundary Layer High-Altitude Wind Resources: Ground-level wind is slowed by terrain friction and obstacles. At altitudes of 300 to 500 meters, wind speeds are 2x to 3x higher, and power density (scaling with the cube of wind velocity, V³) is up to 8x greater than at 100-meter tower heights.',
      'Crosswind Aerodynamic Pumping Mode (Ground-Gen): An autonomous rigid-wing drone or power kite flies continuous high-speed figure-eight trajectories crosswind. The extreme aerodynamic lift pulls a ultra-high-molecular-weight polyethylene (Dyneema) tether from an unspooling ground-station drum connected to a generator.',
      'Reel-In Recovery Cycle: Once the tether reaches maximum altitude, the drone pitches into an aerodynamic depowered dive, reeling back in using less than 10% of the energy harvested during the pull phase, yielding high net positive grid power with 90% less embodied material mass.'
    ],
    technicalSpecs: [
      { label: 'Operating Altitude', value: '300 m to 600 m above ground level (AGL)' },
      { label: 'Airborne Wing', value: 'Carbon-fiber autonomous rigid glider or leading-edge inflatable kite' },
      { label: 'Tether Material', value: 'Ultra-high-molecular-weight polyethylene (UHMWPE / Dyneema)' },
      { label: 'Operating Cycle', value: 'Two-phase pumping cycle (high-tension reel-out, low-tension reel-in)' },
      { label: 'Embodied Carbon', value: '> 85% reduction in concrete and steel foundations' }
    ],
    diagramType: 'airborne-drone',
    realImplementations: [
      {
        id: 'makani-m600',
        title: 'Makani M600 Energy Kite Offshore',
        developer: 'Makani Power / Alphabet (Google X) & Shell',
        location: 'Karmøy Offshore Energy Test Site, Norway',
        status: '600 kW Full-Scale Airborne Demonstration',
        image: '/turbines/real-makani-m600.jpg',
        specs: '600 kW Rated | 26 m Carbon Wing | 8 Onboard Rotors | 350 m Altitude',
        description: 'An autonomous carbon-composite airframe equipped with eight onboard motor-generators. Flying continuous high-speed circular crosswind paths at 350 meters altitude, the onboard rotors harvest clean energy and transmit power down a conductive umbilical tether.'
      },
      {
        id: 'kitepower-falcon',
        title: 'Kitepower Falcon 100 kW Mobile Pumping Kite',
        developer: 'Kitepower B.V. & TU Delft',
        location: 'Valkenburg Naval Air Base & Aruba, Caribbean',
        status: '100 kW Containerized Commercial Mobile Power System',
        image: '/turbines/real-kitepower-falcon.svg',
        specs: '100 kW Rated | 60 m² Inflatable Membrane Kite | 450 m Dyneema Tether',
        description: 'A containerized ground winch station connected via a high-strength Dyneema tether to an inflatable leading-edge kite. The system operates in continuous pumping cycles, generating electricity during high-tension reel-out with 90% less material than conventional towers.'
      }
    ]
  }
];
