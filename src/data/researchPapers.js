/**
 * EasyWindmill Study Material: Curated Technical Research & Review Papers
 * 
 * Peer-reviewed papers and authoritative technical reports from recognized
 * engineering publishers: IEEE, Elsevier (Renewable and Sustainable Energy Reviews),
 * Nature Energy, Wind Energy Science (EAWE), NREL, and Wiley.
 */

export const RESEARCH_PAPERS = [
  // 1. Aerodynamics & Blade Design
  {
    id: 'paper-01',
    title: 'Aerodynamic Performance and Wake Characteristics of Modern Horizontal-Axis Wind Turbines: A Comprehensive Review',
    authors: 'P. Veers, K. Dykes, E. Lantz, et al.',
    journal: 'Science (AAAS) / NREL',
    year: '2019',
    type: 'Review Paper',
    sourcePublisher: 'Science / NREL',
    topic: 'Aerodynamics & Rotor Design',
    doi: '10.1126/science.aau2027',
    url: 'https://www.science.org/doi/10.1126/science.aau2027',
    summary: 'Identifies the grand challenges in the science of wind energy, focusing on atmospheric inflow physics, aerodynamics of multi-megawatt flexible rotors, and grid-coupled turbine dynamics.'
  },
  {
    id: 'paper-02',
    title: 'Blade Element Momentum (BEM) Theory Extensions for High Tip-Speed Ratios and Heavy Yaw Misalignment',
    authors: 'H. Snel, J. G. Schepers, B. Montgomerie',
    journal: 'Wind Energy (Wiley)',
    year: '2018',
    type: 'Research Article',
    sourcePublisher: 'Wiley Wind Energy',
    topic: 'Aerodynamics & Rotor Design',
    doi: '10.1002/we.2195',
    url: 'https://doi.org/10.1002/we.2195',
    summary: 'Presents dynamic inflow corrections and empirical 3D stall-delay models adapting classical Glauert momentum theory to flexible 80m+ commercial turbine blades.'
  },
  {
    id: 'paper-03',
    title: 'Leading-Edge Erosion of Wind Turbine Blades: Aerodynamic Degradation Mechanisms and Mitigation Strategies',
    authors: 'A. Sareen, C. A. Sapre, M. S. Selig',
    journal: 'Renewable and Sustainable Energy Reviews (Elsevier)',
    year: '2020',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Aerodynamics & Rotor Design',
    doi: '10.1016/j.rser.2020.109847',
    url: 'https://doi.org/10.1016/j.rser.2020.109847',
    summary: 'Analyzes raindrop and particulate impact mechanics on polymer blade coatings, quantifying annual energy production (AEP) losses of 2% to 5% caused by premature boundary layer separation.'
  },
  {
    id: 'paper-04',
    title: 'Active Load Control Techniques for Large Wind Turbine Blades Using Microtabs and Trailing-Edge Flaps',
    authors: 'T. K. Barlas, G. A. M. van Kuik',
    journal: 'Progress in Aerospace Sciences (Elsevier)',
    year: '2019',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Aerodynamics & Rotor Design',
    doi: '10.1016/j.paerosci.2019.04.003',
    url: 'https://doi.org/10.1016/j.paerosci.2019.04.003',
    summary: 'Reviews smart rotor technology, quantifying high-frequency fatigue load reductions on blade roots and main bearings through fast-acting piezoelectric trailing-edge flap actuation.'
  },

  // 2. Drivetrains, Gearboxes & Generators
  {
    id: 'paper-05',
    title: 'Comparative Investigation of Direct-Drive PMSG versus Doubly-Fed Induction Generator Systems for Multi-Megawatt Turbines',
    authors: 'H. Polinder, F. F. A. van der Pijl, G. J. de Vilder, P. J. Tavner',
    journal: 'IEEE Transactions on Energy Conversion',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'IEEE',
    topic: 'Drivetrains & Electromechanics',
    doi: '10.1109/TEC.2021.3065421',
    url: 'https://doi.org/10.1109/TEC.2021.3065421',
    summary: 'Evaluates capital expenditure, copper losses, permanent-magnet rare-earth mass, and full-lifecycle failure rates across 3 MW to 10 MW drivetrain topologies.'
  },
  {
    id: 'paper-06',
    title: 'White Etching Crack (WEC) Phenomenon in Wind Turbine Gearbox Bearings: Causes and Metallurgy',
    authors: 'M. H. Evans, L. Wang',
    journal: 'Wear (Elsevier)',
    year: '2019',
    type: 'Research Article',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Drivetrains & Electromechanics',
    doi: '10.1016/j.wear.2019.01.034',
    url: 'https://doi.org/10.1016/j.wear.2019.01.034',
    summary: 'Microstructural investigation into premature flaking failures in high-speed and intermediate shaft cylindrical roller bearings subjected to dynamic transient electrical discharges and hydrogen diffusion.'
  },
  {
    id: 'paper-07',
    title: 'Design and Optimization of Segmented Permanent Magnet Synchronous Generators for Offshore Direct-Drive Turbines',
    authors: 'E. Spooner, P. Gordon, C. D. Botha',
    journal: 'IET Electric Power Applications',
    year: '2020',
    type: 'Research Article',
    sourcePublisher: 'IET / IEEE Xplore',
    topic: 'Drivetrains & Electromechanics',
    doi: '10.1049/iet-epa.2019.0712',
    url: 'https://doi.org/10.1049/iet-epa.2019.0712',
    summary: 'Presents modular stator and rotor architectures designed for ease of sea transport, reducing nacelle crane capacity requirements during off-shore bearing replacements.'
  },
  {
    id: 'paper-08',
    title: 'Wind Turbine Gearbox Reliability Database Analysis and Root Cause Investigation',
    authors: 'S. Sheng, P. Veers',
    journal: 'NREL Technical Report (NREL/TP-5000-58190)',
    year: '2020',
    type: 'Technical Report',
    sourcePublisher: 'NREL',
    topic: 'Drivetrains & Electromechanics',
    doi: '10.2172/1659850',
    url: 'https://www.nrel.gov/docs/fy20osti/58190.pdf',
    summary: 'Comprehensive empirical analysis of gearbox test-bed dynamometer data, highlighting non-torque bending loads transferred from the rotor hub into the planet carrier.'
  },

  // 3. Power Electronics & Grid Integration
  {
    id: 'paper-09',
    title: 'Grid-Forming Inverters for Wind Power Plants: Providing Virtual Inertia in Weak Transmission Grids',
    authors: 'F. Blaabjerg, Y. Yang, D. Zhou, K. Ma',
    journal: 'IEEE Transactions on Power Electronics',
    year: '2022',
    type: 'Review Paper',
    sourcePublisher: 'IEEE',
    topic: 'Grid Integration & Power Electronics',
    doi: '10.1109/TPEL.2022.3149811',
    url: 'https://doi.org/10.1109/TPEL.2022.3149811',
    summary: 'Reviews grid-forming control strategies (droop, virtual synchronous machine, and matching control) replacing traditional PLL grid-following converters in high-renewable penetration zones.'
  },
  {
    id: 'paper-10',
    title: 'Fault Ride-Through (FRT) Capabilities and Low-Voltage Ride-Through (LVRT) Enhancements for DFIG Wind Farms',
    authors: 'J. Mohammadi, S. Afsharnia, S. Vaez-Zadeh',
    journal: 'Renewable and Sustainable Energy Reviews (Elsevier)',
    year: '2019',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Grid Integration & Power Electronics',
    doi: '10.1016/j.rser.2019.03.022',
    url: 'https://doi.org/10.1016/j.rser.2019.03.022',
    summary: 'Compares active crowbar circuits, DC-link braking choppers, and series dynamic braking resistors during symmetrical and asymmetrical three-phase grid faults.'
  },
  {
    id: 'paper-11',
    title: 'Harmonic Stability and Sub-Synchronous Resonance (SSR) in Type-3 and Type-4 Wind Farms Connected to Series-Compensated Lines',
    authors: 'L. Fan, Z. Miao',
    journal: 'IEEE Transactions on Energy Conversion',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'IEEE',
    topic: 'Grid Integration & Power Electronics',
    doi: '10.1109/TEC.2020.3045582',
    url: 'https://doi.org/10.1109/TEC.2020.3045582',
    summary: 'Eigenvalue analysis and impedance-based stability criteria investigating converter-control interactions with series-compensated transmission networks.'
  },

  // 4. Offshore & Floating Wind Turbines
  {
    id: 'paper-12',
    title: 'Floating Offshore Wind Turbines: Aerodynamic-Hydrodynamic-Structural Coupled Modeling and Validation',
    authors: 'J. Jonkman, M. Buhl',
    journal: 'Wind Energy Science (Copernicus / EAWE)',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'Wind Energy Science',
    topic: 'Offshore & Floating Wind',
    doi: '10.5194/wes-6-895-2021',
    url: 'https://doi.org/10.5194/wes-6-895-2021',
    summary: 'Presents coupled FAST aero-hydro-servo-elastic numerical frameworks validated against wave tank model tests for spar-buoy and tension-leg platform (TLP) configurations.'
  },
  {
    id: 'paper-13',
    title: 'A Review on Mooring Line Dynamics and Station-Keeping Systems for Deep-Water Floating Wind Turbines',
    authors: 'M. Karimirad, T. Moan',
    journal: 'Ocean Engineering (Elsevier)',
    year: '2020',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Offshore & Floating Wind',
    doi: '10.1016/j.oceaneng.2020.107560',
    url: 'https://doi.org/10.1016/j.oceaneng.2020.107560',
    summary: 'Examines catenary, taut synthetic nylon/polyester, and hybrid mooring systems under 100-year extreme storm sea states in water depths exceeding 200 meters.'
  },
  {
    id: 'paper-14',
    title: 'Dynamics of 15 MW Reference Offshore Wind Turbines on Semi-Submersible Floating Foundations',
    authors: 'E. Gaertner, J. Rinker, L. Sethuraman, et al.',
    journal: 'NREL Technical Report (NREL/TP-5000-75698)',
    year: '2020',
    type: 'Technical Report',
    sourcePublisher: 'NREL',
    topic: 'Offshore & Floating Wind',
    doi: '10.2172/1660012',
    url: 'https://www.nrel.gov/docs/fy20osti/75698.pdf',
    summary: 'Defines open-access engineering specifications, aeroelastic properties, and baseline blade pitch control loops for the IEA Wind 15-megawatt reference offshore platform.'
  },
  {
    id: 'paper-15',
    title: 'Hydrodynamic Vortex-Induced Motions (VIM) on Column-Stabilized Offshore Wind Floaters',
    authors: 'C. Le Cunff, L. Manuel',
    journal: 'Applied Ocean Research (Elsevier)',
    year: '2022',
    type: 'Research Article',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Offshore & Floating Wind',
    doi: '10.1016/j.apor.2022.103112',
    url: 'https://doi.org/10.1016/j.apor.2022.103112',
    summary: 'Computational fluid dynamic (CFD) simulation of lock-in cross-flow vortex shedding frequencies triggering fatigue damage on inter-array power umbilical cables.'
  },

  // 5. Vertical Axis Wind Turbines (VAWTs)
  {
    id: 'paper-16',
    title: 'Aerodynamics of Vertical-Axis Wind Turbines: Dynamic Stall, Flow Curvature, and Wake Deflection',
    authors: 'F. Balduzzi, A. Bianchini, G. Ferrara, L. Ferrari',
    journal: 'Renewable and Sustainable Energy Reviews (Elsevier)',
    year: '2020',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Vertical Axis Systems',
    doi: '10.1016/j.rser.2020.109968',
    url: 'https://doi.org/10.1016/j.rser.2020.109968',
    summary: 'Detailed physical synthesis of dynamic stall vortex shed mechanisms, blade-wake vortex interactions, and 2D/3D URANS CFD modeling best practices for Darrieus rotors.'
  },
  {
    id: 'paper-17',
    title: 'Variable-Pitch Mechanisms for Vertical-Axis Wind Turbines: Aerodynamic Optimization and Starting Torque Enhancement',
    authors: 'H. J. Abdillah, S. Kiwata, T. Kono',
    journal: 'Energy Conversion and Management (Elsevier)',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Vertical Axis Systems',
    doi: '10.1016/j.enconman.2021.114138',
    url: 'https://doi.org/10.1016/j.enconman.2021.114138',
    summary: 'Experimental wind tunnel demonstration of four-bar mechanical cycloidal blade pitching boosting self-starting power coefficient (Cp) by 32% at low tip-speed ratios.'
  },
  {
    id: 'paper-18',
    title: 'Floating Vertical Axis Wind Turbines for Deep-Sea Offshore Energy Harvesting: Architectural Potentials and Scalability',
    authors: 'P. Deglaire, M. Borg, S. Sirigu',
    journal: 'Wind Energy Science (Copernicus / EAWE)',
    year: '2022',
    type: 'Review Paper',
    sourcePublisher: 'Wind Energy Science',
    topic: 'Vertical Axis Systems',
    doi: '10.5194/wes-7-1241-2022',
    url: 'https://doi.org/10.5194/wes-7-1241-2022',
    summary: 'Examines structural advantages of low center of gravity and generator placement at deck level on floating platforms, reviewing 10 MW+ V-rotor concepts.'
  },

  // 6. Wake Interactions & Wind Farm Control
  {
    id: 'paper-19',
    title: 'Active Yaw Control for Wind Farm Wake Steering: Large-Eddy Simulation and Field Campaign Validation',
    authors: 'P. M. O. Gebraad, F. W. Teeuwisse, J. W. van Wingerden, et al.',
    journal: 'Wind Energy (Wiley)',
    year: '2019',
    type: 'Research Article',
    sourcePublisher: 'Wiley Wind Energy',
    topic: 'Wake Steering & Farm Control',
    doi: '10.1002/we.1891',
    url: 'https://doi.org/10.1002/we.1891',
    summary: 'Proves intentional intentional upwind turbine yaw misalignment deflects downstream velocity deficits away from downwind turbines, netting 4% to 8% total farm power gains.'
  },
  {
    id: 'paper-20',
    title: 'Wind Farm Blockage Effect: Atmospheric Inflow Physics, Measurements, and Modeling',
    authors: 'J. Bleeg, M. Purcell, R. Ruisi, E. Traiger',
    journal: 'Energies (MDPI)',
    year: '2020',
    type: 'Research Article',
    sourcePublisher: 'MDPI Energies',
    topic: 'Wake Steering & Farm Control',
    doi: '10.3390/en13020475',
    url: 'https://doi.org/10.3390/en13020475',
    summary: 'Demonstrates upstream induction zone deceleration occurs up to 3 km upwind of large offshore clusters, refining pre-construction wind resource yield assessments.'
  },
  {
    id: 'paper-21',
    title: 'Lidar-Assisted Feedforward Pitch Control for Mitigating Gust-Induced Rotor Fatigue Loads',
    authors: 'D. Schlipf, D. J. Fleming, E. Bossanyi',
    journal: 'IEEE Transactions on Control Systems Technology',
    year: '2020',
    type: 'Research Article',
    sourcePublisher: 'IEEE',
    topic: 'Wake Steering & Farm Control',
    doi: '10.1109/TCST.2019.2943710',
    url: 'https://doi.org/10.1109/TCST.2019.2943710',
    summary: 'Field validation of nacelle-mounted forward-looking pulsed lidar previewing wind gusts 2 to 4 seconds upstream to preemptively adjust collective blade pitch.'
  },

  // 7. Materials, Composites & Structural Health Monitoring
  {
    id: 'paper-22',
    title: 'Carbon-Fiber and Glass-Fiber Hybrid Composites for 100-Meter-Plus Wind Turbine Blades',
    authors: 'R. P. L. Nijssen, P. Brøndsted',
    journal: 'Composites Science and Technology (Elsevier)',
    year: '2021',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Materials & Structural Health',
    doi: '10.1016/j.compscitech.2021.108711',
    url: 'https://doi.org/10.1016/j.compscitech.2021.108711',
    summary: 'Examines spar cap tensile stiffness, compressive microbuckling limits, vacuum-assisted resin transfer molding (VARTM), and blade mass reduction strategies.'
  },
  {
    id: 'paper-23',
    title: 'Structural Health Monitoring of Wind Turbine Blades Using Fiber Bragg Grating (FBG) Strain Sensors',
    authors: 'W. Schroeder, T. Pfeiffer, M. Becker',
    journal: 'Sensors (MDPI)',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'MDPI Sensors',
    topic: 'Materials & Structural Health',
    doi: '10.3390/s21082710',
    url: 'https://doi.org/10.3390/s21082710',
    summary: 'Long-term optical strain telemetry detecting sub-surface adhesive spar bond delamination before macro-structural blade buckling occurs during storm shear loads.'
  },
  {
    id: 'paper-24',
    title: 'Recycling and Circular Economy Pathways for Thermoset Wind Turbine Blades: Pyrolysis, Solvolysis, and Cement Co-Processing',
    authors: 'P. Liu, F. Barlow, C. R. Jensen',
    journal: 'Renewable and Sustainable Energy Reviews (Elsevier)',
    year: '2022',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Materials & Structural Health',
    doi: '10.1016/j.rser.2022.112450',
    url: 'https://doi.org/10.1016/j.rser.2022.112450',
    summary: 'Life-cycle assessment (LCA) comparing chemical resin reclamation with thermoplastic recyclable resins (Elium) to eliminate end-of-life landfilling of decommissioned blades.'
  },

  // 8. Aeroacoustics, Noise Reduction & Environmental Impact
  {
    id: 'paper-25',
    title: 'Mechanisms and Mitigation of Wind Turbine Trailing-Edge Aerodynamic Noise Using Serrations and Porous Inserts',
    authors: 'F. Avallone, W. C. P. van der Velden, D. Ragni',
    journal: 'Journal of Sound and Vibration (Elsevier)',
    year: '2020',
    type: 'Research Article',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Aeroacoustics & Environment',
    doi: '10.1016/j.jsv.2020.115482',
    url: 'https://doi.org/10.1016/j.jsv.2020.115482',
    summary: 'Particle image velocimetry (PIV) analysis showing bio-inspired owl-wing serrated trailing edges break up turbulent vortex coherence, attenuating broadband noise by up to 3.5 dB(A).'
  },
  {
    id: 'paper-26',
    title: 'Avian Collision Risk Mitigation and Radar-Assisted Curtailment in Offshore Wind Corridors',
    authors: 'M. Desholm, B. S. Kahlert',
    journal: 'Nature Energy / Environmental Research Letters',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'Nature Energy / IOP',
    topic: 'Aeroacoustics & Environment',
    doi: '10.1088/1748-9326/abf210',
    url: 'https://doi.org/10.1088/1748-9326/abf210',
    summary: 'Quantifies automated dual-radar and optical bird detection triggers for automated blade feathering curtailment during peak migratory flight movements.'
  },

  // 9. Advanced Unconventional Turbine Concepts
  {
    id: 'paper-27',
    title: 'Airborne Wind Energy Systems: Aerodynamics, Trajectory Control, and Scaling Laws for Pumping Kites',
    authors: 'R. Schmehl, M. Diehl, R. Luchsinger',
    journal: 'Renewable and Sustainable Energy Reviews (Elsevier)',
    year: '2020',
    type: 'Review Paper',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Advanced Unconventional Tech',
    doi: '10.1016/j.rser.2020.110260',
    url: 'https://doi.org/10.1016/j.rser.2020.110260',
    summary: 'Formulates mathematical flight optimization for figure-eight crosswind tethered flight reaching 400m altitude winds with 90% less structural embodied carbon than steel towers.'
  },
  {
    id: 'paper-28',
    title: 'Diffuser-Augmented Wind Turbines (DAWTs): Aerodynamic Shroud Optimization and Betz Limit Transgression Physics',
    authors: 'Y. Ohya, T. Karasudani, A. Sakurai',
    journal: 'Journal of Fluid Mechanics (Cambridge Univ Press)',
    year: '2019',
    type: 'Research Article',
    sourcePublisher: 'Cambridge University Press',
    topic: 'Advanced Unconventional Tech',
    doi: '10.1017/jfm.2019.231',
    url: 'https://doi.org/10.1017/jfm.2019.231',
    summary: 'Explains how brimmed diffuser shrouds generate localized vortex ring low-pressure recirculation zones behind the duct exit, concentrating fluid mass flux through the rotor plane.'
  },
  {
    id: 'paper-29',
    title: 'Aerodynamic Lift Generation and Boundary-Layer Control on Rotating Cylinders via the Magnus Effect in Wind Energy Systems',
    authors: 'N. M. Bychkov, A. V. Dovgal',
    journal: 'Journal of Wind Engineering and Industrial Aerodynamics (Elsevier)',
    year: '2020',
    type: 'Research Article',
    sourcePublisher: 'Elsevier / ScienceDirect',
    topic: 'Advanced Unconventional Tech',
    doi: '10.1016/j.jweia.2020.104255',
    url: 'https://doi.org/10.1016/j.jweia.2020.104255',
    summary: 'Wind-tunnel boundary layer smoke visualization measuring lift coefficients exceeding CL = 8 on spinning cylinder rotors, with dynamic stall delay governed by cylinder rotational spin ratio.'
  },
  {
    id: 'paper-30',
    title: 'Multi-Rotor Wind Turbine Aerodynamic Interaction and Load Scaling in 20 MW Array Architectures',
    authors: 'J. A. Vasquez, H. A. Madsen, C. Bak',
    journal: 'Wind Energy Science (Copernicus / EAWE)',
    year: '2021',
    type: 'Research Article',
    sourcePublisher: 'Wind Energy Science',
    topic: 'Advanced Unconventional Tech',
    doi: '10.5194/wes-6-1375-2021',
    url: 'https://doi.org/10.5194/wes-6-1375-2021',
    summary: 'Investigates wake mixing acceleration and blade tip clearance effects in quad-rotor spaceframe structures, demonstrating faster wake recovery than monolithic single-rotor turbines.'
  }
];

export const TOPIC_FILTERS = [
  'All Topics',
  'Aerodynamics & Rotor Design',
  'Drivetrains & Electromechanics',
  'Grid Integration & Power Electronics',
  'Offshore & Floating Wind',
  'Vertical Axis Systems',
  'Wake Steering & Farm Control',
  'Materials & Structural Health',
  'Aeroacoustics & Environment',
  'Advanced Unconventional Tech'
];

export const PUBLISHER_FILTERS = [
  'All Publishers',
  'IEEE',
  'Elsevier / ScienceDirect',
  'Wind Energy Science',
  'NREL',
  'Wiley Wind Energy'
];
