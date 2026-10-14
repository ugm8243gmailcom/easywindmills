import { WINDMILL_PARTS } from './windmillParts';

export const TURBINE_MODELS = [
  {
    id: 'alpha-3200',
    name: 'EasyWindmill Alpha-3200',
    subtitle: '3.2 MW Commercial Onshore Turbine',
    category: 'onshore',
    categoryLabel: 'Utility Onshore',
    badge: '3D Disassembly Stage',
    badgeType: 'technical',
    image: '/turbines/alpha-3200.jpg',
    is3DReady: true,
    specs: {
      ratedPower: '3.2 MW',
      rotorDiameter: '125 m',
      cutInWind: '3.0 m/s',
      ratedWind: '11.5 m/s',
      cutOutWind: '25.0 m/s',
      hubHeight: '110 m',
      efficiency: '48.8% Betz',
      blades: '3-Blade Aero Composite'
    },
    keyBullets: [
      '50-frame interactive 3D disassembly with internal component zoom',
      'High-torque permanent magnet synchronous generator with 97.6% efficiency',
      'Dual independent electromechanical blade pitch control with auto-feathering',
      'High-speed SCADA optical telemetry with vibration and temperature sensors'
    ],
    description:
      'The Alpha-3200 is an onshore utility-scale wind turbine designed for high annual energy production in Class II and Class III wind conditions across undulating terrain, ridges, and open plains.',
    parts: WINDMILL_PARTS
  },
  {
    id: 'oceanic-8000',
    name: 'EasyWindmill Oceanic-8000',
    subtitle: '8.0 MW Deep-Water Offshore Turbine',
    category: 'offshore',
    categoryLabel: 'Offshore Deep-Sea',
    badge: 'Offshore Specification',
    badgeType: 'offshore',
    image: '/turbines/oceanic-8000.svg',
    is3DReady: false,
    specs: {
      ratedPower: '8.0 MW',
      rotorDiameter: '164 m',
      cutInWind: '3.5 m/s',
      ratedWind: '12.0 m/s',
      cutOutWind: '28.0 m/s',
      hubHeight: '140 m',
      efficiency: '49.2% Betz',
      blades: '80m Carbon-Epoxy Spars'
    },
    keyBullets: [
      'Direct-drive permanent magnet generator without a high-maintenance mechanical gearbox',
      'C5-M maritime corrosion protection with pressurized air filtration canopy',
      'Integrated internal 10-tonne service gantry crane and helicopter hoisting area',
      'Dual 66 kV subsea export cables with armored seabed anchoring'
    ],
    description:
      'Engineered for deep-water marine wind farms. Operates on monopile and jacket foundations in harsh ocean storm environments, delivering baseload clean energy into coastal transmission grids.',
    parts: [
      {
        id: 'offshore-rotor',
        number: '01',
        name: '164m Carbon-Infused Rotor',
        category: 'Rotor Assembly',
        shortRole: 'Offshore wind energy extraction',
        badge: '80m Carbon Spar',
        description: 'Blades built with high-modulus carbon fiber spars and vacuum-infused epoxy resin to endure ocean storm turbulence.',
        specs: [
          { label: 'Rotor Diameter', value: '164 m' },
          { label: 'Swept Area', value: '21,124 sq m' },
          { label: 'Blade Weight', value: '28.5 tonnes each' }
        ],
        mechanism: 'Active electromechanical pitch bearings feather blades during gale storms above 28 m/s to prevent structural fatigue while surviving storm winds up to 70 m/s.'
      },
      {
        id: 'direct-drive-gen',
        number: '02',
        name: 'Direct-Drive Permanent Magnet Generator',
        category: 'Drivetrain',
        shortRole: 'Gearless energy conversion',
        badge: 'No Gearbox Required',
        description: 'A multi-pole synchronous ring generator directly coupled to the hub, eliminating high-wear gearboxes and offshore servicing requirements.',
        specs: [
          { label: 'Rated Capacity', value: '8,000 kW (8.0 MW)' },
          { label: 'Poles', value: '120 Poles' },
          { label: 'Cooling', value: 'Closed-loop Liquid Glycol' }
        ],
        mechanism: 'As the hub rotates at 7-12 RPM, permanent neodymium magnets pass copper stator poles to induce electricity directly without gear acceleration.'
      },
      {
        id: 'marine-nacelle',
        number: '03',
        name: 'Pressurized C5-M Nacelle Housing',
        category: 'Protective Enclosure',
        shortRole: 'Saline corrosion isolation',
        badge: 'Positive-Air Pressure',
        description: 'Maintains positive interior air pressure with desalinating intake filters, keeping ocean saltwater spray out of electrical cabinets.',
        specs: [
          { label: 'Rating', value: 'ISO 12944 C5-M Maritime' },
          { label: 'Internal Crane', value: '10 Tonnes Capacity' },
          { label: 'Environmental', value: 'IP66 Sealed Cabinets' }
        ],
        mechanism: 'Air blowers pump dehumidified, filtered fresh air through the housing, preventing moisture accumulation on power inverters and transformers.'
      },
      {
        id: 'subsea-cables',
        number: '04',
        name: '66 kV Subsea Array Cables',
        category: 'Grid Transmission',
        shortRole: 'Ocean floor power transmission',
        badge: 'Armored XLPE Cable',
        description: 'High-voltage copper conductors with cross-linked polyethylene insulation, lead water-barrier sheathing, and galvanized steel armor.',
        specs: [
          { label: 'Voltage', value: '66 kV 3-Phase AC' },
          { label: 'Depth Rating', value: 'Up to 250 meters' },
          { label: 'Armor', value: 'Double Wire Steel Armor' }
        ],
        mechanism: 'Transmits three-phase power directly into offshore substation collector platforms before stepping up to 220 kV for mainland landing.'
      }
    ]
  },
  {
    id: 'skybreeze-1500',
    name: 'EasyWindmill SkyBreeze-1500',
    subtitle: '1.5 MW Distributed Community Turbine',
    category: 'community',
    categoryLabel: 'Community and Distributed',
    badge: 'Acoustic Serrations',
    badgeType: 'community',
    image: '/turbines/skybreeze-1500.svg',
    is3DReady: false,
    specs: {
      ratedPower: '1.5 MW',
      rotorDiameter: '82 m',
      cutInWind: '2.5 m/s',
      ratedWind: '10.5 m/s',
      cutOutWind: '20.0 m/s',
      hubHeight: '75 m',
      efficiency: '46.5% Betz',
      blades: 'Acoustic Serrated Blades'
    },
    keyBullets: [
      'Acoustic trailing-edge blade serrations reduce noise emissions below 38.5 dBA at 300m',
      'Grid-forming smart inverter with optional battery storage synchronization',
      'Standard road-freight transportable modules without oversize convoy permits',
      'Engineered for agricultural cooperatives, university campuses, and commercial parks'
    ],
    description:
      'A compact, quiet turbine designed for distributed microgrids, agricultural cooperatives, and institutional campuses seeking local clean power generation with low acoustic impact.',
    parts: [
      {
        id: 'serrated-blades',
        number: '01',
        name: 'Acoustic-Serrated Rotor Blades',
        category: 'Aerodynamic System',
        shortRole: 'Low-noise wind extraction',
        badge: 'Low-Noise Aerofoil',
        description: 'Trailing edge serrations break down turbulent eddies into smaller vortex structures, significantly reducing audible wind shear.',
        specs: [
          { label: 'Blade Length', value: '39.8 m' },
          { label: 'Sound Level', value: 'Under 38.5 dBA at 300m' },
          { label: 'Tip Speed Ratio', value: '7.8 Optimum' }
        ],
        mechanism: 'Combines micro-serrations with soft aero-transition caps to silence air shearing while maintaining high lift-to-drag aerodynamic efficiency.'
      },
      {
        id: 'microgrid-inverter',
        number: '02',
        name: 'Smart 4-Quadrant Microgrid Inverter',
        category: 'Power Electronics',
        shortRole: 'Microgrid synchronization',
        badge: 'Island-Mode Capable',
        description: 'Provides autonomous grid-forming voltage support, allowing local facilities to maintain power stability during transmission blackouts.',
        specs: [
          { label: 'Grid Voltage', value: '400V / 690V' },
          { label: 'Response Time', value: 'Under 15 ms' },
          { label: 'Islanding', value: 'Autonomous Control' }
        ],
        mechanism: 'Digital signal processors dynamically balance active and reactive power to prevent voltage sags during sudden industrial load changes.'
      },
      {
        id: 'compact-nacelle',
        number: '03',
        name: 'Modular Transportable Nacelle',
        category: 'Mechanical Housing',
        shortRole: 'Low-cost road transit',
        badge: 'Standard Road Width',
        description: 'Compact external dimensions allow transportation on standard flatbed trailers on rural roads without special highway escorts.',
        specs: [
          { label: 'Total Mass', value: '42 tonnes' },
          { label: 'Road Width', value: '3.4 m' },
          { label: 'Erection Time', value: '48 hours on site' }
        ],
        mechanism: 'Pre-assembled internal mechanical modules enable rapid rigging with standard mobile rental cranes.'
      }
    ]
  },
  {
    id: 'aeropeak-5000',
    name: 'EasyWindmill AeroPeak-5000',
    subtitle: '5.0 MW Sub-Zero Alpine Turbine',
    category: 'extreme',
    categoryLabel: 'Extreme Cold Climate',
    badge: 'De-Icing Matrix',
    badgeType: 'alpine',
    image: '/turbines/aeropeak-5000.svg',
    is3DReady: false,
    specs: {
      ratedPower: '5.0 MW',
      rotorDiameter: '145 m',
      cutInWind: '3.0 m/s',
      ratedWind: '11.0 m/s',
      cutOutWind: '26.0 m/s',
      hubHeight: '120 m',
      efficiency: '48.1% Betz',
      blades: 'Resistive De-Icing Matrix'
    },
    keyBullets: [
      'Continuous electro-thermal blade leading edge heating prevents ice accumulation',
      'Synthetic arctic lubricants and internal heating elements operational down to -45 C',
      'Wide blade chord geometry optimized for low air density at high mountain altitudes',
      'Dual reinforced lightning receptor down-conductors rated for 200 kA strikes'
    ],
    description:
      'Engineered for alpine passes and sub-zero highland regions. The AeroPeak-5000 operates continuously through blizzards, freezing fog, and sub-zero temperatures.',
    parts: [
      {
        id: 'heated-blades',
        number: '01',
        name: 'Electro-Thermal Blade Heating Matrix',
        category: 'Aerodynamic Anti-Ice',
        shortRole: 'Ice shedding and prevention',
        badge: 'Resistive Elements',
        description: 'Embedded resistive heating layers on blade leading edges melt rime ice instantly before it can alter the aerofoil contour.',
        specs: [
          { label: 'Heating Power', value: '45 kW per blade' },
          { label: 'Operating Range', value: '-45 C to +40 C' },
          { label: 'Ice Detection', value: 'Resonant Sensors' }
        ],
        mechanism: 'Pulse heating creates a thin liquid water boundary layer beneath ice sheets, letting aerodynamic airflow sweep ice off safely.'
      },
      {
        id: 'cold-climate-nacelle',
        number: '02',
        name: 'Insulated Climate Nacelle',
        category: 'Housing and Thermal Control',
        shortRole: 'Internal component warming',
        badge: 'Thermal Insulation',
        description: 'Heated mechanical rooms and pre-lubricated high-viscosity synthetic oils protect gears and bearings from cold embrittlement.',
        specs: [
          { label: 'Insulation', value: '50mm Polyurethane Foam' },
          { label: 'Aux Heating', value: '18 kW Redundant Heaters' },
          { label: 'Cold Start', value: 'Down to -40 C' }
        ],
        mechanism: 'Thermostatically controlled heaters keep generator windings and hydraulic pumps at operating viscosity even during calm, freezing nights.'
      },
      {
        id: 'reinforced-yaw',
        number: '03',
        name: 'High-Torque Alpine Yaw Drive',
        category: 'Orientation Subsystem',
        shortRole: 'Ridge-top wind tracking',
        badge: 'Dual Slew Motors',
        description: 'Six reinforced planetary gear drives hold the turbine firmly into unpredictable valley cross-winds and mountain turbulence.',
        specs: [
          { label: 'Yaw Motors', value: '6x 11 kW Planetary' },
          { label: 'Holding Torque', value: '4,800 kNm' },
          { label: 'Bearing Type', value: 'Triple-Row Roller Bearing' }
        ],
        mechanism: 'Hydraulic disc brakes with sintered metallic pads prevent wind chatter and oscillation in violent ridge-top updrafts.'
      }
    ]
  }
];
