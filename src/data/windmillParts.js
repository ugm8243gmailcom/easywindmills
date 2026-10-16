/**
 * EasyWindmill - Verified Geared Synchronous Wind Turbine Parts Data
 * Configuration: Horizontal-Axis Wind Turbine with Parallel-Shaft Geared Drivetrain and Synchronous Generator.
 * Normalized coordinates based on frame_050 render (1280x720 16:9)
 * All components verified against U.S. Department of Energy (EERE) and NREL/WES peer-reviewed publications.
 */

export const WINDMILL_PARTS = [
  {
    id: 'rotor',
    number: '01',
    name: 'Aerodynamic Rotor and Hub',
    category: 'Rotor Assembly',
    shortRole: 'Aerodynamic lift extraction and rotational torque',
    hotspot: { x: 28.5, y: 62.0 },
    zoom: { x: 28.5, y: 60.0, scale: 2.2 },
    badge: 'Rotor Assembly',
    description:
      'The aerodynamic rotor converts kinetic energy from moving wind streams into mechanical rotational torque. It consists of three fiberglass and carbon composite aerofoil blades secured to a central cast ductile iron hub. Air flowing across the curved aerofoil profiles produces aerodynamic lift forces that overcome aerodynamic drag, driving the rotor around its horizontal axis.',
    roleInConfig:
      'Acts as the primary prime mover for the geared drivetrain, delivering low-speed, high-torque mechanical power to the main drive shaft.',
    adjacentComponents:
      'Fastened to the low-speed main drive shaft flange; blade root pitch bearings link each blade to internal electromechanical pitch drives within the cast hub.',
    specs: [
      { label: 'Aerodynamic Principle', value: 'Aerofoil Lift-over-Drag Ratio' },
      { label: 'Rotor Geometry', value: '3-Blade Upwind Configuration' },
      { label: 'Blade Construction', value: 'Glass and Carbon Fiber Composite Spars' },
      { label: 'Pitch Regulation', value: 'Independent Full-Span Blade Feathering' }
    ],
    mechanism:
      'Electromechanical pitch motors within the hub actively rotate each blade around its longitudinal axis. In normal operating winds, the pitch angle is fine-tuned to maintain optimal aerodynamic lift. During extreme gale conditions or emergency stops, blades are feathered 90 degrees parallel to the wind, stalling aerodynamic lift and bringing the rotor to an aerodynamic halt.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'shaft',
    number: '02',
    name: 'Main Low-Speed Shaft and Pillow Block Bearings',
    category: 'Mechanical Drivetrain',
    shortRole: 'Low-speed torque transmission and structural load isolation',
    hotspot: { x: 45.5, y: 50.0 },
    zoom: { x: 46.0, y: 50.0, scale: 2.3 },
    badge: 'Mechanical Drivetrain',
    description:
      'The primary low-speed shaft transfers rotational torque from the rotor hub directly into the speed-increasing gearbox. Heavy-duty spherical roller bearings housed in cast pillow blocks support the rotor overhang mass and absorb extreme aerodynamic thrust and pitching moments, channeling non-torque structural loads safely into the bedplate and tower.',
    roleInConfig:
      'Transfers high-torque, low-RPM mechanical rotation from the rotor directly to the planetary input stage of the gearbox.',
    adjacentComponents:
      'Bolted to the rotor hub at its forward flange and coupled to the gearbox input carrier at its rear flange; supported by pillow blocks mounted on the nacelle bedplate.',
    specs: [
      { label: 'Component Type', value: 'Forged Alloy Steel Low-Speed Shaft' },
      { label: 'Bearing Arrangement', value: 'Spherical Roller Pillow Block Bearings' },
      { label: 'Load Distribution', value: 'Isolates Non-Torque Bending and Thrust Moments' },
      { label: 'Lubrication', value: 'Pressurized Automatic Greasing Circuit' }
    ],
    mechanism:
      'Self-aligning spherical roller bearings accommodate dynamic structural deflections caused by wind gusts and turbulence. By isolating axial thrust and bending loads, the main bearing assembly ensures that only pure torsional torque enters the gearbox gear meshes.',
    reference: {
      source: 'Copernicus / NREL Research',
      title: 'Wind Turbine Drivetrains: State-of-the-Art Technologies (WES)',
      url: 'https://wes.copernicus.org/articles/7/387/2022/',
      label: 'Read more in Wind Energy Science (NREL Collaborative Review)'
    }
  },
  {
    id: 'gearbox',
    number: '03',
    name: 'Multi-Stage Speed-Increasing Gearbox',
    category: 'Mechanical Transmission',
    shortRole: 'Rotational speed conversion from rotor to generator',
    hotspot: { x: 57.5, y: 40.5 },
    zoom: { x: 58.0, y: 40.0, scale: 2.4 },
    badge: 'Mechanical Transmission',
    description:
      'The speed-increasing gearbox matches the low rotational speed of the turbine rotor (typically 10-20 RPM) to the high rotational speed required by the synchronous generator (typically 1,000-1,800 RPM). It employs an epicyclic planetary gear stage for high torque density followed by parallel helical gear stages to step up shaft speed smoothly.',
    roleInConfig:
      'Serves as the mechanical speed increaser in this geared configuration, allowing the installation of a compact, lightweight high-speed generator.',
    adjacentComponents:
      'Driven by the low-speed main drive shaft; its high-speed output shaft drives the mechanical brake disc and synchronous generator.',
    specs: [
      { label: 'Gearbox Architecture', value: 'Epicyclic Planetary + Parallel Helical Stages' },
      { label: 'Speed Conversion', value: 'Approx. 1:80 to 1:100 Speed Step-Up' },
      { label: 'Thermal Management', value: 'Forced-Oil Circulation with External Radiator' },
      { label: 'Condition Monitoring', value: 'Vibration Accelerometers and Oil Particle Sensors' }
    ],
    mechanism:
      'Sun, planet, and ring gears divide the extreme rotor torque across multiple gear contact meshes in the planetary stage. The subsequent parallel helical stages deliver low-noise high-speed rotation to the output shaft, while an integrated lubrication system pumps filtered, cooled synthetic oil across all contact surfaces.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine: Gearbox Function (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'generator',
    number: '04',
    name: 'High-Speed Synchronous Generator',
    category: 'Electrical Machine',
    shortRole: 'Electromechanical energy conversion',
    hotspot: { x: 63.5, y: 36.0 },
    zoom: { x: 63.5, y: 36.0, scale: 2.4 },
    badge: 'Electrical Machine',
    description:
      'The synchronous generator converts rotational mechanical power from the high-speed shaft into electrical energy. Rotated at high speed by the gearbox output shaft, magnetic field excitation on the rotor induces alternating current (AC) in the three-phase copper stator windings through electromagnetic induction.',
    roleInConfig:
      'Converts mechanical power from the high-speed shaft into raw electrical power, which is routed directly to the full-scale power electronic converter.',
    adjacentComponents:
      'Mechanically coupled to the high-speed shaft of the gearbox; output terminals connect via heavy copper busbars to the power converter.',
    specs: [
      { label: 'Machine Type', value: 'Synchronous Alternating Current (AC) Machine' },
      { label: 'Operating Speed', value: 'Synchronous Operating Range (1,000-1,800 RPM)' },
      { label: 'Cooling Method', value: 'Enclosed Air-to-Air or Liquid Cooling Heat Exchanger' },
      { label: 'Output Connection', value: 'Three-Phase AC to Power Electronic Converter' }
    ],
    mechanism:
      'As the high-speed rotor spins within the stationary stator core, its magnetic flux rotates across insulated copper stator coils, inducing three-phase sinusoidal voltages. The resulting electrical power is transferred directly to the power converter for frequency decoupling and grid conditioning.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'How Does a Wind Turbine Work? (EERE)',
      url: 'https://www.energy.gov/eere/wind/how-does-wind-turbine-work',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'brake',
    number: '05',
    name: 'High-Speed Mechanical Brake',
    category: 'Safety and Braking',
    shortRole: 'Mechanical holding and auxiliary emergency stopping',
    hotspot: { x: 71.5, y: 30.0 },
    zoom: { x: 71.5, y: 32.0, scale: 2.3 },
    badge: 'Safety Subsystem',
    description:
      'A fail-safe hydraulic disc brake installed on the high-speed shaft between the gearbox and generator. While aerodynamic blade pitch feathering serves as the primary stopping mechanism, the mechanical disc brake provides parking holding torque during routine maintenance and serves as a secondary emergency arrestor.',
    roleInConfig:
      'Arrests the high-speed shaft where braking torque requirements are significantly lower than on the slow-turning rotor shaft.',
    adjacentComponents:
      'Mounted on the high-speed coupling shaft directly adjacent to the generator housing.',
    specs: [
      { label: 'Brake Architecture', value: 'Spring-Applied, Hydraulically Released Calipers' },
      { label: 'Mounting Position', value: 'High-Speed Output Shaft' },
      { label: 'Safety Mode', value: 'Fail-Safe (Engages on Loss of Hydraulic Pressure)' },
      { label: 'Primary Braking', value: 'Aerodynamic Blade Feathering (Pitch Control)' }
    ],
    mechanism:
      'Hydraulic pressure keeps heavy-duty internal springs compressed during normal operation. In the event of emergency grid disconnection, overspeed, or maintenance lock-out, hydraulic valves dump pressure, allowing spring packs to clamp brake pads firmly against the ventilated steel rotor disc.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine: Braking Systems (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'canopy',
    number: '06',
    name: 'Nacelle Enclosure and Bedplate',
    category: 'Structural Housing',
    shortRole: 'Machinery enclosure, weather isolation, and structural support',
    hotspot: { x: 56.5, y: 18.0 },
    zoom: { x: 56.5, y: 20.0, scale: 2.0 },
    badge: 'Structural Housing',
    description:
      'The nacelle assembly consists of a heavy cast structural bedplate (chassis) and a fiberglass-reinforced composite canopy. The bedplate carries the weight of the main shaft, gearbox, generator, and auxiliary equipment, transferring reaction moments into the yaw ring and tower. The canopy shields internal mechanics from rain, snow, UV radiation, and windblown particulates.',
    roleInConfig:
      'Provides the rigid structural alignment and environmental protection required for the reliable operation of the geared drivetrain and synchronous generator.',
    adjacentComponents:
      'Rests on the yaw slew bearing at the tower top; completely encloses the drivetrain, generator, cooling circuits, and control cabinets.',
    specs: [
      { label: 'Structural Bedplate', value: 'Cast Spheroidal Graphite Ductile Iron' },
      { label: 'Canopy Shell', value: 'Fiberglass Reinforced Polymer (FRP Composite)' },
      { label: 'Maintenance Access', value: 'Internal Service Hatches and Service Hoists' },
      { label: 'Environmental Isolation', value: 'Corrosion-Resistant Multi-Layer Coating' }
    ],
    mechanism:
      'Molded with an aerodynamic profile to minimize turbulent drag around the blade roots, the nacelle incorporates interior sound-damping insulation, service cranes, and safety anchor points for technician maintenance access at hub height.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine: Nacelle (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'yaw',
    number: '07',
    name: 'Yaw Orientation Drive and Slew Bearing',
    category: 'Orientation Subsystem',
    shortRole: 'Active wind vector tracking and structural alignment',
    hotspot: { x: 57.0, y: 65.0 },
    zoom: { x: 57.0, y: 65.0, scale: 2.2 },
    badge: 'Orientation Subsystem',
    description:
      'Positioned at the junction between the nacelle bedplate and the tubular tower top, the yaw mechanism actively rotates the entire nacelle to keep the rotor perpendicular to changing wind directions. This eliminates destructive asymmetrical yaw moments and maximizes energy capture.',
    roleInConfig:
      'Rotates the complete nacelle, rotor, and internal drivetrain relative to the stationary tower.',
    adjacentComponents:
      'Bolted between the tower top flange and the underside of the nacelle bedplate.',
    specs: [
      { label: 'Bearing Type', value: 'Large-Diameter Geared Slew Ring Bearing' },
      { label: 'Drive Units', value: 'Multiple Electric Planetary Geared Yaw Motors' },
      { label: 'Holding Mechanism', value: 'Hydraulic Yaw Brake Friction Calipers' },
      { label: 'Cable Protection', value: 'Automated Controller Cable Untwist Routine' }
    ],
    mechanism:
      'When roof sensors detect a sustained shift in wind heading, electric planetary motors turn pinions meshed with teeth on the slew ring. Hydraulic calipers maintain calibrated holding friction throughout rotation to prevent fluttering, locking firmly into place once aligned.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine: Yaw System (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'electronics',
    number: '08',
    name: 'Full-Scale Power Converter and Controller',
    category: 'Power Electronics and Controls',
    shortRole: 'Grid synchronization and autonomous supervisory control',
    hotspot: { x: 76.0, y: 46.0 },
    zoom: { x: 76.0, y: 46.0, scale: 2.3 },
    badge: 'Power Electronics',
    description:
      'In a synchronous generator drivetrain, the full-scale power converter processes 100% of the variable-frequency AC electricity generated by the turbine, rectifying it to a direct current (DC) link and inverting it back into grid-synchronized 50/60 Hz AC. The adjacent programmable logic controller executes supervisory control (SCADA), continuously monitoring sensor channels in real time.',
    roleInConfig:
      'Decouples the synchronous generator rotational frequency from the utility grid frequency, enabling variable-speed rotor operation and full low-voltage fault ride-through compliance.',
    adjacentComponents:
      'Connected electrically between the generator stator terminals and down-tower cables leading to the step-up transformer.',
    specs: [
      { label: 'Converter Architecture', value: 'Full-Scale 4-Quadrant Back-to-Back IGBT Bridge' },
      { label: 'Grid Compliance', value: 'Active/Reactive Power and Fault Ride-Through' },
      { label: 'Controller Network', value: 'Real-Time Industrial Ethernet Telemetry' },
      { label: 'Safety Interlocks', value: 'Hardware-Interlocked Emergency Shutdown Loop' }
    ],
    mechanism:
      'High-speed insulated-gate bipolar transistors (IGBTs) modulate voltage and frequency. The central turbine computer dynamically calculates optimal pitch and torque setpoints, adjusting active and reactive power delivery to stabilize grid voltage.',
    reference: {
      source: 'Copernicus / NREL Research',
      title: 'Wind Turbine Drivetrains: Power Electronics Topologies (WES)',
      url: 'https://wes.copernicus.org/articles/7/387/2022/',
      label: 'Read more in Wind Energy Science (Drivetrain Review)'
    }
  },
  {
    id: 'sensors',
    number: '09',
    name: 'Ultrasonic Meteorological Sensor Mast',
    category: 'Instrumentation',
    shortRole: 'Wind speed and directional vector measurement',
    hotspot: { x: 86.5, y: 9.0 },
    zoom: { x: 86.5, y: 12.0, scale: 2.5 },
    badge: 'Instrumentation',
    description:
      'Mounted on an exterior instrument mast on the rear roof of the nacelle canopy, solid-state ultrasonic anemometers and wind direction vanes continuously measure inflow wind vectors. Because they contain no rotating mechanical cups or vanes, they resist freezing, mechanical wear, and aerodynamic inertia delay.',
    roleInConfig:
      'Provides real-time wind speed and directional telemetry to the turbine controller to command yaw alignment and blade pitch angles.',
    adjacentComponents:
      'Mounted on the rear nacelle canopy roof; wired directly to the supervisory controller input modules.',
    specs: [
      { label: 'Measurement Principle', value: 'Ultrasonic Acoustic Time-of-Flight' },
      { label: 'Measured Vectors', value: 'Horizontal Wind Speed and Relative Wind Direction' },
      { label: 'De-Icing System', value: 'Integrated Thermostatically Controlled Heating' },
      { label: 'Sampling Rate', value: 'Continuous High-Frequency Real-Time Input' }
    ],
    mechanism:
      'Pairs of ultrasonic transducers send acoustic pulses back and forth across a measurement cavity. Air movement speeds up acoustic pulses traveling with the wind and retards pulses traveling against it; time-of-flight differences enable the controller to compute instantaneous wind velocity and direction.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Inside a Wind Turbine: Anemometer and Wind Vane (EERE)',
      url: 'https://www.energy.gov/eere/wind/inside-wind-turbine',
      label: 'Read more at the U.S. Department of Energy'
    }
  }
];
