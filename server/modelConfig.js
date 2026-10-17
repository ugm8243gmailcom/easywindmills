/**
 * EasyWindmill - Educational HAWT Model Configuration
 *
 * Configuration: Horizontal-Axis Wind Turbine (HAWT)
 * Drivetrain: Parallel-shaft speed-increasing gearbox
 * Generator: Synchronous AC generator
 *
 * ENGINEERING INTEGRITY STATEMENT:
 * The precise engineering specifications of this specific 3D model asset
 * are unverified. Therefore, this model distinguishes verified architectural
 * attributes from unverified real-world parameters. All default values provided
 * below are educational assumptions for conceptual teaching and must NOT be
 * interpreted as manufacturer-validated performance ratings.
 */

import { BETZ_LIMIT, STANDARD_AIR_DENSITY_KG_M3, TECHNICAL_REFERENCES } from './constants.js';

export const TURBINE_MODEL_METADATA = {
  modelId: 'hawt-geared-educational',
  modelName: 'Educational Geared HAWT (Synchronous Generator)',
  architecture: {
    rotorAxis: 'horizontal',
    bladeCount: 3,
    orientation: 'upwind',
    aerodynamicPrinciple: 'aerofoil_lift',
    drivetrainType: 'speed_increasing_parallel_shaft_gearbox',
    generatorType: 'synchronous_ac'
  },
  specificationsStatus: {
    dimensions: 'unverified_educational_example',
    powerRating: 'unverified_educational_example',
    powerCurve: 'unverified_educational_example',
    gearboxRatio: 'unverified_educational_example',
    generatorEfficiency: 'unverified_educational_example',
    cutInCutOutLimits: 'unverified_educational_example'
  },
  // Educational baseline parameters (used ONLY when explicit educational assumptions are requested)
  educationalBaseline: {
    rotorRadius_m: 40.0,
    rotorDiameter_m: 80.0,
    bladeLength_m: 40.0, // Assumes blade length approximates rotor radius measured from hub rotation axis to blade tip
    airDensity_kgpm3: STANDARD_AIR_DENSITY_KG_M3,
    assumedCp: 0.42, // Realistic peak aerodynamic efficiency for a 3-blade HAWT, below Betz limit (0.593)
    assumedDrivetrainEfficiency: 0.95, // Accounts for main bearing and parallel-shaft gearbox mechanical losses
    assumedGeneratorEfficiency: 0.94, // High-speed synchronous generator electromechanical conversion efficiency
    assumedTargetTipSpeedRatio: 7.5, // Standard optimal tip-speed ratio for 3-bladed modern rotors
    assumedGearboxRatio: 90.0, // Speed step-up ratio: generator-side speed / rotor-side speed
    assumedMaxRotorRPM: 20.0, // Operational upper RPM limit for a 80m diameter rotor
    assumedCutInWindSpeed_mps: 3.0,
    assumedRatedWindSpeed_mps: 11.5,
    assumedCutOutWindSpeed_mps: 25.0
  },
  modelLimitations: [
    'The 3D asset represents an educational CAD representation; dimensions and performance parameters are not validated against a physical commercial turbine.',
    'A constant Cp model assumes static aerodynamic efficiency. Real turbines exhibit variable Cp as a dynamic function of tip-speed ratio (lambda) and blade pitch angle (beta).',
    'Target tip-speed ratio provides a quasi-steady operating-point estimate. It is not a dynamic model of aerodynamic torque, rotor inertia, or generator pitch/torque control.',
    'Gearbox speed calculation assumes an ideal constant speed-increasing ratio without modeling gear mesh backlash, tooth friction, or dynamic torsional vibrations.',
    'Generator model estimates shaft speed and electromechanical efficiency; it does not simulate magnetic flux dynamics, pole counts, power factor, or grid synchronization slip.'
  ],
  references: TECHNICAL_REFERENCES
};
