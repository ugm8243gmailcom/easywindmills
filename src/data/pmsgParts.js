/**
 * EasyWindmill - Direct-Drive Permanent-Magnet Synchronous Generator (PMSG) Parts Data
 * Configuration: Gearless Ring Generator with Permanent-Magnet Rotor and Full-Scale Converter Interface.
 *
 * All components mapped directly to the supplied exploded video footage.
 * Technical principles verified against U.S. Department of Energy (DOE) and NREL technical literature.
 * No em dashes used in accordance with project constraints.
 */

export const PMSG_PARTS = [
  {
    id: 'front-shield',
    number: '01',
    name: 'Front End-Shield and Bearing Retaining Flange',
    category: 'Structural Enclosure',
    badge: 'Structural Enclosure',
    shortDescription: 'Heavy cast steel closure ring with central annular doughnut bore for through-shaft rotor hub interface.',
    shortRole: 'Housing closure, air-gap sealing, and bearing location',
    function: 'Seals the internal electromagnetic air gap and winding space against ambient moisture and particulates, while locating and supporting the front main bearing outer race.',
    construction: 'Heavy-section ductile iron or cast structural steel ring with precision-machined axial locating shoulders, concentric O-ring labyrinth seal groove, and radial bolt circle for secure clamping to the stator frame.',
    workingPrinciple: 'Maintains precise mechanical concentricity between stationary and rotating subassemblies under extreme aerodynamic bending moments, ensuring the uniform radial air gap (nominal 2 to 5 mm) does not deflect or collide.',
    systemRole: 'Direct structural interface between the nacelle forward bulkhead, main bearing carrier, and the stator frame housing.',
    sourceTitle: 'U.S. Department of Energy - Explore a Wind Turbine (Text Version)',
    sourceUrl: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
    hotspot: { x: 13.5, y: 51.5 },
    zoom: { x: 13.5, y: 51.5, scale: 2.3 },
    description: 'The front end-shield is a heavy-duty structural annular flange with a central doughnut bore designed to accommodate through-shaft rotor hub interfaces. It serves the dual purpose of enclosing the generator front cavity against environmental contamination and rigidly locating the front main bearing outer ring.',
    roleInConfig: 'Eliminates separate intermediate gearbox adapter housings by providing direct structural containment and bearing support at the front face of the direct-drive ring generator.',
    adjacentComponents: 'Bolted circumferentially to the front face of the stator housing; inner diameter fits over the outer race of the primary main bearing and bearing seal carrier.',
    specs: [
      { label: 'Component Type', value: 'Machined Annular End-Shield Flange' },
      { label: 'Central Bore', value: 'Large-Diameter Annular Doughnut Opening' },
      { label: 'Sealing System', value: 'Non-Contact Labyrinth and Radial Lip Seals' },
      { label: 'Structural Role', value: 'Air-Gap Concentricity and Bearing Location' }
    ],
    mechanism: 'Precision-machined concentric locating spigots align the end-shield with the stator core center-axis to micrometer tolerances. High-strength pre-tensioned perimeter fasteners clamp the assembly into a single monolithic structural unit capable of withstanding turbulent aerodynamic pitch and yaw moments.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Explore a Wind Turbine (Text Version)',
      url: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'main-bearing',
    number: '02',
    name: 'Direct-Drive Main Rotor Bearing Assembly',
    category: 'Mechanical Support',
    badge: 'Mechanical Support',
    shortDescription: 'Large-diameter precision annular roller bearing carrying aerodynamic rotor thrust and radial loads.',
    shortRole: 'Low-friction rotor support and aerodynamic load transfer',
    function: 'Supports the rotating permanent-magnet rotor assembly and transmits aerodynamic thrust, pitching, and yawing moments from the turbine blades safely into the stationary nacelle bedplate.',
    construction: 'Hardened high-carbon chromium steel (typically 100Cr6 / 52100) inner and outer rings with caged rolling elements (cylindrical, spherical, or tapered rollers), ground raceways, and automatic grease lubrication ports.',
    workingPrinciple: 'Substitutes sliding friction with rolling friction along the inner and outer raceways, enabling low-loss rotation of multi-ton rotor masses at slow operational speeds (approx. 7 to 15 RPM).',
    systemRole: 'Critical primary load-bearing interface in a direct-drive turbine; because there is no intermediate gearbox, this bearing directly carries both structural loads and rotational torque.',
    sourceTitle: 'U.S. Department of Energy - Advanced Wind Turbine Drivetrain Trends and Opportunities',
    sourceUrl: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
    hotspot: { x: 27.0, y: 51.0 },
    zoom: { x: 27.0, y: 51.0, scale: 2.6 },
    description: 'The main bearing assembly is a large-diameter precision bearing engineered to support the multi-ton rotating mass of both the aerodynamic wind rotor and the internal generator permanent-magnet rotor. Because direct-drive turbines eliminate the speed-increasing gearbox, this bearing must absorb high multi-directional aerodynamic moments.',
    roleInConfig: 'Directly supports the low-speed rotating assembly at typical wind operating speeds of 7 to 15 RPM without speed multiplication.',
    adjacentComponents: 'Positioned axially between the front end-shield flange and the bearing retaining collar; outer ring seats inside the stationary frame housing and inner ring seats on the rotating hub sleeve.',
    specs: [
      { label: 'Bearing Configuration', value: 'Large-Diameter Annular Roller Bearing' },
      { label: 'Operating Speed', value: 'Low-RPM Direct-Rotor Coupling (~7-15 RPM)' },
      { label: 'Load Capacity', value: 'Combined Axial Thrust and Radial Bending Moments' },
      { label: 'Lubrication', value: 'Automatic Recirculating or Metered Grease Circuit' }
    ],
    mechanism: 'Precision-ground rolling elements distribute multi-meganewton thrust loads across hardened raceways. Controlled internal clearance ensures minimal friction torque during calm starts while maintaining rigid radial alignment to preserve the air gap under turbulent gust deflections.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Advanced Wind Turbine Drivetrain Trends and Opportunities',
      url: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'bearing-collar',
    number: '03',
    name: 'Bearing Retaining Collar and Preload Spacer',
    category: 'Mechanical Alignment',
    badge: 'Mechanical Alignment',
    shortDescription: 'Precision-machined spacer ring providing axial clamping and thermal expansion clearance.',
    shortRole: 'Axial bearing race retention and preload calibration',
    function: 'Clamps the bearing races axially against structural shoulders to maintain calibrated bearing internal preload, prevent axial creep, and accommodate differential thermal expansion.',
    construction: 'Forged alloy steel ring with ground parallel reference faces and circumferential clamping fastener holes.',
    workingPrinciple: 'Applies controlled axial preloading to eliminate internal bearing clearance, reducing micro-motion, fretting wear, and dynamic vibration under turbulent wind gusts.',
    systemRole: 'Ensures rigid axial positioning of the main bearing relative to the stator core and rotating magnet ring.',
    sourceTitle: 'U.S. Department of Energy - Advanced Wind Turbine Drivetrain Trends and Opportunities',
    sourceUrl: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
    hotspot: { x: 34.0, y: 51.5 },
    zoom: { x: 34.0, y: 51.5, scale: 2.8 },
    description: 'The bearing retaining collar is a precision spacer ring positioned immediately adjacent to the main bearing. It maintains continuous axial clamp force against the bearing outer or inner race, ensuring zero axial play during dynamic changes in wind direction and aerodynamic thrust reversals.',
    roleInConfig: 'Locks the bearing assembly axially into the generator chassis, preventing axial movement that could cause stator-rotor misalignment.',
    adjacentComponents: 'Mates directly with the rear face of the main bearing outer ring on one side and the forward structural shoulder of the stator housing on the other.',
    specs: [
      { label: 'Component Type', value: 'Precision Ground Clamping Collar' },
      { label: 'Primary Purpose', value: 'Axial Preload and Bearing Retention' },
      { label: 'Fastening', value: 'High-Tensile Pre-Torqued Bolt Array' },
      { label: 'Tolerances', value: 'Micrometer-Tolerance Ground Parallel Faces' }
    ],
    mechanism: 'Pre-torqued high-strength fasteners pass through the collar to compress the bearing outer race against the internal housing locating shoulder. The ground parallel faces ensure uniform contact pressure around the entire 360-degree circumference.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Advanced Wind Turbine Drivetrain Trends and Opportunities',
      url: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'stator-assembly',
    number: '04',
    name: 'Slotted Stator Core and Three-Phase Copper Windings',
    category: 'Electromagnetic Subsystem',
    badge: 'Electromagnetic Subsystem',
    shortDescription: 'Laminated silicon electrical steel core with insulated copper coil windings in radial slots.',
    shortRole: 'Electromagnetic power induction and AC voltage generation',
    function: 'Provides the stationary magnetic circuit and electrical conductors in which high-voltage three-phase AC electricity is induced as permanent magnet poles rotate past the stator teeth.',
    construction: 'Stacked thin laminations (typically 0.35 to 0.5 mm) of high-grade non-oriented silicon electrical steel coated with insulating varnish to suppress eddy current losses, wound with heavy-gauge Class H/F insulated copper coils.',
    workingPrinciple: 'Operates via Faraday Law of Electromagnetic Induction: the alternating magnetic flux from the rotating permanent-magnet poles cuts across the stator copper coils, inducing sinusoidal alternating electromotive force (EMF).',
    systemRole: 'The central electricity-generating subsystem; converts mechanical rotational power directly into raw electrical power.',
    sourceTitle: 'U.S. Department of Energy - Explore a Wind Turbine (Text Version)',
    sourceUrl: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
    hotspot: { x: 43.5, y: 50.5 },
    zoom: { x: 43.5, y: 50.5, scale: 2.4 },
    description: 'The stator core and copper windings constitute the electrical heart of the PMSG. The annular core is assembled from thousands of thin, insulated electrical steel laminations slotted along its circumference. Heavy-gauge form-wound copper coils are inserted into the slots and interconnected to produce a balanced three-phase AC output.',
    roleInConfig: 'Receives the rotating magnetic flux from the permanent magnets without any mechanical gear multiplication, generating utility-scale electrical power directly at rotor rotational speed.',
    adjacentComponents: 'Fixed rigidly inside the stator structural housing; faces the rotating permanent-magnet poles across the narrow radial air gap.',
    specs: [
      { label: 'Magnetic Core', value: 'Laminated Low-Loss Silicon Electrical Steel' },
      { label: 'Winding Material', value: 'High-Conductivity Insulated Oxygen-Free Copper' },
      { label: 'Insulation Class', value: 'High-Temperature Resin Vacuum-Pressure Impregnated (VPI)' },
      { label: 'Electrical Output', value: 'Variable-Frequency, Variable-Voltage 3-Phase AC' }
    ],
    mechanism: 'As the rotor permanent magnets sweep past the slotted stator teeth, the magnetic flux linkage through each copper coil varies sinusoidally with time. In accordance with Faraday law, this rate of change of magnetic flux induces an alternating voltage. Vacuum-pressure impregnation (VPI) seals the windings against moisture, thermal stress, and vibrational wear.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Explore a Wind Turbine (Text Version)',
      url: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'stator-frame',
    number: '05',
    name: 'Stator Frame Housing with Base Mounts and Lifting Lugs',
    category: 'Structural Enclosure',
    badge: 'Structural Enclosure',
    shortDescription: 'Heavy structural cylindrical frame shell with mounting foot brackets and overhead lifting lugs.',
    shortRole: 'Torque reaction, structural support, and rigging interface',
    function: 'Encapsulates the stator core, provides rigid mounting pads for anchoring to the nacelle main bedplate, and incorporates dual top lifting eyes for heavy crane installation and service.',
    construction: 'Welded heavy structural steel plate or cast ductile iron cylindrical shell reinforced with circumferential stiffening ribs and machined foot mounting pads.',
    workingPrinciple: 'Reacts the tremendous electromagnetic counter-torque (generated by the stator windings opposing rotor rotation) and transfers it safely into the turbine tower foundation.',
    systemRole: 'Main structural skeleton uniting the electromagnetic active components with the wind turbine nacelle structure.',
    sourceTitle: 'U.S. Department of Energy - Advanced Wind Turbine Drivetrain Trends and Opportunities',
    sourceUrl: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
    hotspot: { x: 57.5, y: 51.0 },
    zoom: { x: 57.5, y: 51.0, scale: 2.3 },
    description: 'The stator frame housing forms the central outer structural body of the generator. It encloses the stator core, supports internal bearing carriers, and features substantial bottom mounting feet that bolt directly to the nacelle bedplate. Robust top lifting lugs allow safe rigging during crane hoisting.',
    roleInConfig: 'Transfers 100% of the electromagnetic counter-torque directly into the wind turbine bedplate and tower without passing through gear teeth.',
    adjacentComponents: 'Surrounds the stator laminated core; bolted at the front to the front end-shield and at the rear to the rear terminal plate.',
    specs: [
      { label: 'Material', value: 'Fabricated Structural Steel / Cast Ductile Iron' },
      { label: 'Base Interface', value: 'Machined Foot Flanges for Nacelle Bedplate Bolting' },
      { label: 'Rigging System', value: 'Dual Heavy-Capacity Overhead Lifting Lugs' },
      { label: 'Torque Reaction', value: 'Full Generator Counter-Torque Direct to Tower' }
    ],
    mechanism: 'When the generator generates power under electrical load, Lorentz forces exert a counter-torque equal and opposite to rotor drive torque. The frame housing must possess extreme torsional rigidity to react this multi-meganewton-meter torque without angular deflection that could pinch the air gap.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Advanced Wind Turbine Drivetrain Trends and Opportunities',
      url: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'airgap-sleeve',
    number: '06',
    name: 'Air-Gap Support Ring and Rotor Intermediate Cylinder',
    category: 'Mechanical Alignment',
    badge: 'Mechanical Alignment',
    shortDescription: 'Cylindrical spacer ring maintaining concentricity across the narrow magnetic air gap.',
    shortRole: 'Air-gap dimension control and rotor concentricity support',
    function: 'Maintains precise radial concentricity and structural stiffness between the stationary stator core and the spinning permanent-magnet rotor, preventing air-gap deflection.',
    construction: 'Precision-machined structural alloy cylinder with radial stiffening ribs and internal concentric bearing seats.',
    workingPrinciple: 'Counteracts tremendous magnetic attractive forces (Maxwell stress) acting across the 2 to 5 mm electromagnetic air gap between permanent magnets and the stator iron core.',
    systemRole: 'Ensures air-gap dimensional stability across extreme thermal ranges, gust loads, and structural tower flexure.',
    sourceTitle: 'U.S. Department of Energy - Advanced Wind Turbine Drivetrain Trends and Opportunities',
    sourceUrl: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
    hotspot: { x: 66.5, y: 51.0 },
    zoom: { x: 66.5, y: 51.0, scale: 2.6 },
    description: 'The air-gap support ring is an intermediate structural sleeve engineered to maintain strict radial alignment across the generator magnetic air gap. In large-diameter ring generators, radial magnetic attraction between the magnets and the stator core can exceed several tons per meter, requiring high radial stiffness.',
    roleInConfig: 'Prevents air-gap closure or uneven eccentricity between the multi-pole rotor and the stationary stator.',
    adjacentComponents: 'Positioned intermediate to the stator inner circumference and the rotor magnetic back iron.',
    specs: [
      { label: 'Structural Target', value: 'Air-Gap Uniformity Under Dynamic Maxwell Stress' },
      { label: 'Air-Gap Tolerance', value: 'Strict Radial Concentricity (Nominal 2-5 mm Gap)' },
      { label: 'Machining Standard', value: 'High-Precision Concentric Turning and Milling' },
      { label: 'Stiffness Profile', value: 'High Circumferential Radial Rigidity' }
    ],
    mechanism: 'The cylinder combines high modulus of elasticity with internal web reinforcement to resist unbalanced magnetic pull (UMP). Even under extreme gust loading or temperature differentials, it keeps radial deflection within fractional millimeter limits to avoid rotor-stator contact.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Advanced Wind Turbine Drivetrain Trends and Opportunities',
      url: 'https://www.energy.gov/cmei/wind/articles/advanced-wind-turbine-drivetrain-trends-and-opportunities',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'rotor-magnets',
    number: '07',
    name: 'Permanent Magnet Rotor Rim and Outer Cooling Ribs',
    category: 'Electromagnetic Subsystem',
    badge: 'Electromagnetic Subsystem',
    shortDescription: 'High-permeability rotor back iron carrying rare-earth NdFeB permanent magnet poles with perimeter cooling channels.',
    shortRole: 'High-flux rotating magnetic field excitation without electrical losses',
    function: 'Generates the strong, constant rotating magnetic field required for power generation without requiring electrical excitation currents, slip rings, or rotor copper coils.',
    construction: 'Heavy forged carbon steel magnetic back-iron yoke with high-energy sintered neodymium-iron-boron (NdFeB) permanent magnets secured in protective anti-corrosion modules, flanked by perimeter axial cooling ribs.',
    workingPrinciple: 'High-remanence permanent magnets establish alternating north-south magnetic poles. As the turbine rotor turns this assembly at low speed, the rotating magnetic field sweeps across the stator windings with zero rotor copper excitation losses.',
    systemRole: 'The rotating magnetic field generator of the PMSG; eliminates rotor resistive heating losses and avoids failure-prone slip-ring carbon brushes.',
    sourceTitle: 'U.S. Department of Energy - Explore a Wind Turbine (Text Version)',
    sourceUrl: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
    hotspot: { x: 72.5, y: 50.5 },
    zoom: { x: 72.5, y: 50.5, scale: 2.4 },
    description: 'The rotor rim assembly carries high-energy rare-earth neodymium-iron-boron (NdFeB) permanent magnets arranged in alternating north-south magnetic poles. The outer perimeter features fine cooling ribs to dissipate heat generated by stator electromagnetic radiation and aerodynamic air shearing.',
    roleInConfig: 'Replaces the wound-field rotor, slip rings, and external DC excitation system of traditional synchronous machines with permanent excitation.',
    adjacentComponents: 'Bolted to the turbine main hub flange; faces the slotted stator core across the air gap and aligns with the rear terminal plate.',
    specs: [
      { label: 'Excitation Source', value: 'Rare-Earth Sintered NdFeB Permanent Magnets' },
      { label: 'Thermal Protection', value: 'Surface Cooling Ribs and Corrosion Barrier Coating' },
      { label: 'Brush Interface', value: '100% Brushless (Zero Slip Rings or Commutators)' },
      { label: 'Efficiency Advantage', value: 'Zero Rotor Copper Joule Losses (I²R = 0)' }
    ],
    mechanism: 'Permanent magnet blocks produce high magnetic remanence (typically 1.2 to 1.4 Tesla) and high coercive force to resist demagnetization under severe electrical short-circuit or high-temperature conditions. Perimeter cooling ribs transfer thermal energy to the ambient nacelle airflow via natural or forced convection.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Explore a Wind Turbine (Text Version)',
      url: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
      label: 'Read more at the U.S. Department of Energy'
    }
  },
  {
    id: 'rear-terminals',
    number: '08',
    name: 'Rear End-Shield and Three-Phase Power Terminals',
    category: 'Electrical Power Interface',
    badge: 'Electrical Power Interface',
    shortDescription: 'Rear closure plate equipped with heavy output terminal studs, cable feedthrough glands, and sensor ports.',
    shortRole: 'High-power electrical collection and converter connection',
    function: 'Encloses the generator rear section, anchors the three-phase AC power output leads, and routes high-amperage variable-frequency electricity to the full-scale power electronic converter.',
    construction: 'Machined structural steel plate with insulated high-voltage copper terminal bushings, heavy-duty cable glands, grounding studs, and embedded temperature/vibration sensor ports.',
    workingPrinciple: 'Transfers the high electrical currents generated in the stator phases into flexible nacelle busbars or droop cables, feeding the back-to-back power converter for grid synchronization.',
    systemRole: 'The primary electrical power outlet of the generator, connecting the electromechanical machine directly to the power conditioning converter.',
    sourceTitle: 'U.S. Department of Energy - Explore a Wind Turbine (Text Version)',
    sourceUrl: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
    hotspot: { x: 84.5, y: 49.5 },
    zoom: { x: 84.5, y: 49.5, scale: 2.4 },
    description: 'The rear end-shield and terminal ring seals the aft section of the generator while providing robust, vibration-resistant mounting for the primary electrical output terminals. Heavy insulated copper studs route the multi-phase alternating current from the stationary stator windings out to the power converter.',
    roleInConfig: 'Serves as the high-current electrical gateway connecting the generator to the 100% full-scale back-to-back frequency converter.',
    adjacentComponents: 'Fastened to the rear flange of the stator frame housing; connects internally to stator phase leads and externally to nacelle bus ducts.',
    specs: [
      { label: 'Electrical Termination', value: 'Heavy Copper Stator Busbars and Terminal Studs' },
      { label: 'Grid Interface', value: 'Feeds 100% Full-Scale Back-to-Back Converter' },
      { label: 'Monitoring Sensors', value: 'Embedded Pt100 RTDs and Accelerometer Ports' },
      { label: 'Cable Management', value: 'Vibration-Damped Flexible Droop Cable Interface' }
    ],
    mechanism: 'Heavy insulated ceramic or polymer bushings insulate the high-current copper terminals from the grounded steel casing. Sealed cable glands prevent ingress of humid or salt-laden marine air, preserving electrical insulation resistance over decades of utility operation.',
    reference: {
      source: 'U.S. Department of Energy',
      title: 'Explore a Wind Turbine (Text Version)',
      url: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
      label: 'Read more at the U.S. Department of Energy'
    }
  }
];
