import { WINDMILL_PARTS } from './windmillParts';
import { PMSG_PARTS } from './pmsgParts';

export const CLASSIFICATION_GROUPS = [
  {
    id: 'group-a',
    code: 'Group A',
    title: 'Rotor Orientation and Aerodynamics',
    description:
      'Classifies turbines by rotor rotational axis (horizontal vs. vertical) and primary aerodynamic energy extraction principle (aerofoil lift vs. aerodynamic drag).'
  },
  {
    id: 'group-b',
    code: 'Group B',
    title: 'Drivetrain Configurations',
    description:
      'Classifies how rotational torque is transmitted from the low-speed rotor hub to the generator, comparing speed-increasing gearboxes with direct-drive mechanical couplings.'
  },
  {
    id: 'group-c',
    code: 'Group C',
    title: 'Generator Technologies',
    description:
      'Classifies the electromechanical machine types that convert rotational mechanical power into AC electricity, and their power electronic interface with the grid.'
  },
  {
    id: 'group-d',
    code: 'Group D',
    title: 'Installation Environments',
    description:
      'Classifies terrestrial versus marine deployment environments, foundation structures, and ambient environmental design requirements.'
  }
];

export const TURBINE_MODELS = [
  // =========================================================================
  // GROUP A: ROTOR ORIENTATION AND AERODYNAMICS
  // =========================================================================
  {
    id: 'hawt-geared',
    groupId: 'group-a',
    groupName: 'Rotor Orientation and Aerodynamics',
    categoryLabel: 'Horizontal-Axis Aerodynamics',
    name: 'Horizontal-Axis Wind Turbine (HAWT)',
    subtitle: 'Parallel-shaft geared drivetrain with synchronous generator',
    image: '/turbines/hawt-geared.jpg',
    isExplosionActive: true,
    status: 'Interactive 3D View Available',
    badge: 'Interactive 3D View Active',
    badgeType: 'active',
    description:
      'The predominant design in utility-scale wind generation worldwide. Utilizes an upwind propeller-style three-bladed rotor rotating about a horizontal axis. Aerodynamic lift turns the low-speed shaft, driving an internal speed-increasing gearbox and synchronous generator.',
    technicalOverview: {
      rotorArchitecture: '3-Blade Upwind Propeller Rotor with Independent Pitch Control',
      drivetrainArchitecture: 'Multi-Stage Geared Speed Increaser (Planetary + Parallel Shafts)',
      generatorArchitecture: 'High-Speed Synchronous AC Generator',
      gridInterface: 'Full-Scale Power Electronic Frequency Converter',
      orientationSystem: 'Active Motorized Yaw Bearing with Hydraulic Holding Brakes'
    },
    keyPoints: [
      'Interactive 3D disassembly experience with selectable internal subassemblies',
      'Speed-increasing gearbox steps up low rotor RPM to synchronous generator operating speed',
      'Independent electromechanical blade pitch feathering provides primary aerodynamic braking',
      'Component data and operational descriptions verified against DOE and NREL technical literature'
    ],
    parts: WINDMILL_PARTS
  },
  {
    id: 'darrieus-vawt',
    groupId: 'group-a',
    groupName: 'Rotor Orientation and Aerodynamics',
    categoryLabel: 'Vertical-Axis Aerodynamics',
    name: 'Darrieus Vertical-Axis Wind Turbine (VAWT)',
    subtitle: 'Lift-based curved troposkein vertical-axis rotor',
    image: '/turbines/darrieus-vawt.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'A lift-driven vertical-axis wind turbine characterized by curved or H-rotor aerofoil blades attached to a central vertical shaft. Because rotation is perpendicular to wind flow, the turbine accepts wind from any direction without requiring a motorized yaw orientation mechanism.',
    technicalOverview: {
      rotorArchitecture: 'Curved Troposkein or H-Rotor Aerofoil Blades',
      drivetrainArchitecture: 'Direct Vertical Shaft Coupling to Base Machinery',
      generatorArchitecture: 'Ground-Level Generator and Power Electronics',
      gridInterface: 'Power Electronic Converter Interface',
      orientationSystem: 'Omnidirectional (No Yaw Mechanism Required)'
    },
    keyPoints: [
      'Accepts wind from any azimuth angle without yaw drive tracking',
      'Heavy generator and mechanical equipment are situated at ground level for easier maintenance',
      'Generates power through aerodynamic lift across curved aerofoil blades',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },
  {
    id: 'savonius-vawt',
    groupId: 'group-a',
    groupName: 'Rotor Orientation and Aerodynamics',
    categoryLabel: 'Vertical-Axis Aerodynamics',
    name: 'Savonius Vertical-Axis Wind Turbine (VAWT)',
    subtitle: 'Drag-based scooped vertical-axis rotor',
    image: '/turbines/savonius-vawt.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'A drag-driven vertical-axis turbine featuring characteristic S-shaped overlapping semicircular buckets. Wind pushes with high drag against the concave bucket while flowing smoothly over the returning convex bucket, generating high starting torque at low wind velocities.',
    technicalOverview: {
      rotorArchitecture: 'S-Shaped Semicircular Overlapping Drag Buckets',
      drivetrainArchitecture: 'Central Vertical Shaft Direct to Base Bearings',
      generatorArchitecture: 'Ground-Mounted Low-Speed Alternator',
      gridInterface: 'Battery Storage or Direct Low-Voltage Rectifier',
      orientationSystem: 'Omnidirectional (Self-Orienting Without Yaw Controls)'
    },
    keyPoints: [
      'Operates primarily on differential aerodynamic drag rather than lift',
      'High starting torque allows reliable self-starting at low cut-in wind speeds',
      'Used primarily in distributed, off-grid, and auxiliary low-power installations',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },

  // =========================================================================
  // GROUP B: DRIVETRAIN CONFIGURATIONS
  // =========================================================================
  {
    id: 'geared-drivetrain',
    groupId: 'group-b',
    groupName: 'Drivetrain Configurations',
    categoryLabel: 'Drivetrain Architecture',
    name: 'Geared Wind Turbine Drivetrain',
    subtitle: 'Mechanical speed increaser with high-speed generator',
    image: '/turbines/geared-drivetrain.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'A drivetrain arrangement that uses a mechanical gearbox between the low-speed main rotor shaft and the generator. The gearbox multiplies rotational speed by a factor of 80 to 100, enabling the use of a physically compact, lighter-weight high-speed generator.',
    technicalOverview: {
      gearboxStages: 'Epicyclic Planetary Stage followed by Parallel Helical Gear Stages',
      speedStepUp: 'Converts Approx. 10-20 RPM Input to 1,000-1,800 RPM Output',
      generatorFrame: 'Compact High-Speed Generator (Induction or Synchronous)',
      brakingMethod: 'High-Speed Shaft Disc Brake plus Aerodynamic Blade Feathering',
      lubricationSystem: 'Forced-Oil Filtered Lubrication with Thermal Oil Cooling'
    },
    keyPoints: [
      'Increases rotational speed to allow smaller generator dimensions and lower copper mass',
      'Employs planetary gearing to distribute high rotor torque across multiple contact meshes',
      'Requires active lubrication, oil conditioning, and vibration monitoring',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },
  {
    id: 'direct-drive',
    groupId: 'group-b',
    groupName: 'Drivetrain Configurations',
    categoryLabel: 'Drivetrain Architecture',
    name: 'Direct-Drive Wind Turbine Drivetrain',
    subtitle: 'Gearless drivetrain with low-speed multi-pole generator',
    image: '/turbines/direct-drive.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'A gearless drivetrain architecture that eliminates the mechanical gearbox entirely. The rotor hub is coupled directly to a large-diameter, low-speed multi-pole ring generator. Removing the gearbox reduces mechanical wear parts, oil maintenance, and acoustic gear mesh vibrations.',
    technicalOverview: {
      gearboxElimination: 'No Mechanical Gearbox (Direct Hub-to-Rotor Coupling)',
      generatorDesign: 'Large-Diameter Multi-Pole Ring Generator (Typically 60-120 Poles)',
      operatingSpeed: 'Operates at Rotor Speed (Approx. 7-15 RPM)',
      powerElectronics: '100% Full-Scale Back-to-Back Frequency Converter',
      maintenanceProfile: 'No Gearbox Oil Changes or Gear Mesh Wear Interfaces'
    },
    keyPoints: [
      'Eliminates the gearbox to reduce drivetrain mechanical failure modes',
      'Requires a significantly larger generator diameter and mass to produce high torque at low RPM',
      'Relies on a full-scale power converter to decouple generator frequency from the electrical grid',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },

  // =========================================================================
  // GROUP C: GENERATOR TECHNOLOGIES
  // =========================================================================
  {
    id: 'dfig-generator',
    groupId: 'group-c',
    groupName: 'Generator Technologies',
    categoryLabel: 'Generator Machine',
    name: 'Doubly-Fed Induction Generator (DFIG)',
    subtitle: 'Wound-rotor induction machine with partial-scale power converter',
    image: '/turbines/dfig-generator.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'An asynchronous wound-rotor generator widely deployed in modern geared turbines. The stator connects directly to the utility grid, while the wound rotor is connected via slip rings to a bidirectional power converter rated for approximately 30% of total turbine capacity, enabling variable-speed operation at lower converter cost.',
    technicalOverview: {
      machineTopology: 'Wound-Rotor Induction Machine with External Slip Rings',
      statorConnection: 'Direct Synchronized Connection to 50/60 Hz AC Grid (~70% Power)',
      rotorConnection: 'Bidirectional AC-DC-AC Back-to-Back Converter (~30% Power)',
      speedRange: 'Variable-Speed Window (+/- 30% Around Synchronous Speed)',
      converterRating: 'Partial-Scale (Approx. 30% of Rated Generator Output)'
    },
    keyPoints: [
      'Enables variable-speed rotor operation with a smaller, lower-cost partial-scale converter',
      'Stator feeds the bulk of generated electricity directly into the grid',
      'Slip rings require periodic inspection and brush replacement',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },
  {
    id: 'pmsg-generator',
    groupId: 'group-c',
    groupName: 'Generator Technologies',
    categoryLabel: 'Generator Machine',
    name: 'Permanent-Magnet Synchronous Generator (PMSG)',
    subtitle: 'Direct-drive ring generator with permanent-magnet rotor and full-scale converter',
    image: '/turbines/pmsg-generator.jpg',
    isExplosionActive: true,
    status: 'Interactive 3D View Available',
    badge: 'Interactive 3D View Active',
    badgeType: 'active',
    description:
      'A synchronous ring generator utilizing high-flux permanent magnets affixed to the rotor. The gearless direct-drive architecture eliminates the mechanical gearbox entirely, coupling the aerodynamic rotor hub directly to the generator low-speed shaft. Output connects to the grid via a 100% full-scale frequency converter, decoupling rotor speed from grid frequency.',
    technicalOverview: {
      rotorArchitecture: 'Permanent-Magnet Ring Rotor (Direct Low-Speed Coupling)',
      drivetrainArchitecture: 'Gearless Direct-Drive (No Speed-Increasing Gearbox)',
      generatorArchitecture: 'Permanent-Magnet Synchronous Machine (PMSG)',
      gridInterface: 'Full-Scale 4-Quadrant Back-to-Back Frequency Converter'
    },
    keyPoints: [
      'Interactive 3D disassembly experience with selectable generator subassemblies',
      'Eliminates gearbox failure modes, lubrication servicing, and gear mesh acoustic vibration',
      'High-energy permanent magnets provide high magnetic flux across the radial air gap without copper excitation losses',
      'Full-scale converter provides comprehensive grid fault ride-through and decoupled reactive power support'
    ],
    parts: PMSG_PARTS
  },
  {
    id: 'scig-generator',
    groupId: 'group-c',
    groupName: 'Generator Technologies',
    categoryLabel: 'Generator Machine',
    name: 'Squirrel-Cage Induction Generator (SCIG)',
    subtitle: 'Brushless asynchronous machine with narrow operating slip',
    image: '/turbines/scig-generator.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'A mechanically simple and robust asynchronous generator using a solid cylindrical rotor with embedded short-circuited conducting bars. Operates at a nearly fixed speed with a narrow slip range (1-2%). Stator connects to the grid, drawing reactive magnetizing current from capacitor banks or the grid.',
    technicalOverview: {
      rotorConstruction: 'Conducting Aluminum or Copper Bars Short-Circuited by End Rings',
      operatingSpeed: 'Nearly Fixed Speed (1-2% Negative Slip Relative to Grid Frequency)',
      reactiveCompensation: 'Requires Capacitor Banks or Static VAR Compensator for Magnetization',
      startingMethod: 'Soft-Starter Thyristor Unit to Limit Grid Inrush Currents',
      drivetrainRelationship: 'Exclusively Paired with Speed-Increasing Gearboxes'
    },
    keyPoints: [
      'Highly durable brushless rotor design with minimal mechanical maintenance requirements',
      'Fixed-speed operation transmits aerodynamic wind gusts directly into drivetrain mechanical torque',
      'Historically foundational in classic Danish-concept utility wind turbines',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },

  // =========================================================================
  // GROUP D: INSTALLATION ENVIRONMENT
  // =========================================================================
  {
    id: 'onshore-environment',
    groupId: 'group-d',
    groupName: 'Installation Environments',
    categoryLabel: 'Installation Environment',
    name: 'Onshore Wind Turbine Installation',
    subtitle: 'Terrestrial deployment with concrete gravity or rock foundations',
    image: '/turbines/onshore-environment.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'Describes wind turbines installed on land across plains, ridgelines, and hillsides. Foundations typically comprise reinforced concrete gravity bases or post-tensioned rock anchors. Engineering must balance wind shear gains at high hub heights with road transport limits and local terrain complexity.',
    technicalOverview: {
      foundationTypes: 'Reinforced Concrete Spread Footings, Piled Slabs, or Post-Tensioned Rock Anchors',
      windCharacteristics: 'Subject to Terrain Friction, Surface Roughness, and High Wind Shear',
      logisticalConstraints: 'Road Highway Clearance, Turning Radii, and Mobile Crane Availability',
      gridInterconnect: 'Direct Buried Medium-Voltage Collection Cables to Local Substation',
      environmentalFactors: 'Acoustic Setback Requirements, Shadow Flicker, and Complex Topography'
    },
    keyPoints: [
      'Describes the physical deployment environment, not a unique rotor or generator design',
      'Capital installation costs are generally lower than marine installations',
      'Blade lengths and tower diameters are constrained by road transport logistics',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  },
  {
    id: 'offshore-environment',
    groupId: 'group-d',
    groupName: 'Installation Environments',
    categoryLabel: 'Installation Environment',
    name: 'Offshore Marine Wind Turbine Installation',
    subtitle: 'Marine deployment with monopile, jacket, or floating foundations',
    image: '/turbines/offshore-environment.svg',
    isExplosionActive: false,
    status: 'In development',
    badge: 'Classification Reference',
    badgeType: 'reference',
    description:
      'Describes wind turbines installed in marine environments to capture stronger, smoother, and more consistent ocean winds. Structures are supported by seabed monopiles, space-frame jackets, gravity bases, or anchored floating platforms, requiring ISO 12944 C5-M marine corrosion isolation.',
    technicalOverview: {
      substructureTypes: 'Seabed Driven Monopiles, Jacket Space Frames, Suction Buckets, or Floating Spars',
      windCharacteristics: 'Low Surface Roughness Yields Higher, Smoother, and More Continuous Winds',
      marineCorrosionControl: 'ISO 12944 C5-M Marine Coating, Cathodic Protection, and Positive-Pressure Nacelles',
      powerExport: 'Armored 66 kV Inter-Array Subsea Cables to Offshore Collector Substation',
      logisticsMethodology: 'Specialized Offshore Jack-Up Installation Vessels and Floating Heavy Cranes'
    },
    keyPoints: [
      'Describes the marine operating environment, distinct from rotor or generator classifications',
      'Enables significantly larger rotor dimensions due to maritime vessel transport',
      'Requires specialized maritime corrosion isolation, internal cranes, and helidecks',
      'Interactive 3D component disassembly for this configuration is in development'
    ],
    parts: []
  }
];
