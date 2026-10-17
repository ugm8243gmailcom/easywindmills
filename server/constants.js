/**
 * EasyWindmill - Physics Constants and Reference Literature Metadata
 * All internal calculations use standard International System of Units (SI).
 */

// Standard sea-level dry air density at 15 deg C (288.15 K) and 101.325 kPa (ISO 2533 / IEC 61400-12-1)
export const STANDARD_AIR_DENSITY_KG_M3 = 1.225;

// Theoretical maximum aerodynamic power coefficient for an idealized 1D actuator disk (Betz Limit = 16/27)
export const BETZ_LIMIT = 16 / 27; // Approximately 0.5925925925925926

// Standard gravitational acceleration in m/s^2
export const STANDARD_GRAVITY_M_S2 = 9.80665;

// Credible technical references supporting the equations and methodology
export const TECHNICAL_REFERENCES = [
  {
    citationId: 'nrel-sam',
    source: 'NREL System Advisor Model (SAM)',
    title: 'Wind Turbine Model Documentation',
    url: 'https://samrepo.nlr.gov/help/wind_turbine.html',
    description: 'Reference for aerodynamic swept area, wind kinetic power, tip-speed ratio, and power curve representation.'
  },
  {
    citationId: 'nrel-dynamic-models',
    source: 'National Renewable Energy Laboratory (NREL)',
    title: 'Dynamic Models for Wind Turbines (FY12 Technical Report NREL/TP-5500-52780)',
    url: 'https://nrel.gov/docs/fy12osti/52780.pdf',
    description: 'Reference for horizontal-axis wind turbine drivetrain architectures, gearbox speed step-up ratios, and generator torque coupling.'
  },
  {
    citationId: 'doe-eere',
    source: 'U.S. Department of Energy (EERE)',
    title: 'Explore a Wind Turbine: Text Version',
    url: 'https://www.energy.gov/cmei/systems/explore-wind-turbine-text-version',
    description: 'Reference for fundamental HAWT subsystems: rotor blades, low-speed shaft, speed-increasing gearbox, and synchronous generator.'
  },
  {
    citationId: 'nrel-pysam',
    source: 'NREL PySAM',
    title: 'Windpower Model Documentation',
    url: 'https://nrel-pysam.readthedocs.io/en/v7.0.0/modules/Windpower.html',
    description: 'Reference for wind turbine power curve calculation, cut-in/cut-out bounds, and efficiency loss accounting.'
  },
  {
    citationId: 'iec-61400-12-1',
    source: 'International Electrotechnical Commission',
    title: 'IEC 61400-12-1: Power Performance Measurements of Electricity Producing Wind Turbines',
    url: 'https://webstore.iec.ch/publication/60074',
    description: 'Standard methodology for wind turbine power curves, air density correction, and surface wind observation heights.'
  }
];
