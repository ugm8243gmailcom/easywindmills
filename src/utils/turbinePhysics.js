/**
 * EasyWindmill - Client-Side Real-Time HAWT Physics Calculation Engine
 *
 * Implements deterministic horizontal-axis wind turbine (HAWT) physics
 * calculations purely in-browser with zero API or network requests.
 * All internal calculations use standard International System of Units (SI).
 */

// Standard sea-level dry air density at 15 deg C (ISO 2533 / IEC 61400-12-1)
export const STANDARD_AIR_DENSITY_KG_M3 = 1.225;

// Theoretical maximum aerodynamic power coefficient (Betz Limit = 16/27)
export const BETZ_LIMIT = 16 / 27; // ~0.5925925925925926

// Educational baseline parameters
export const EDUCATIONAL_BASELINE = {
  assumedCp: 0.42,
  assumedDrivetrainEfficiency: 0.95,
  assumedGeneratorEfficiency: 0.94,
  assumedTargetTipSpeedRatio: 7.5,
  assumedGearboxRatio: 90.0,
  assumedMaxRotorRPM: 20.0
};

/**
 * Calculates rotor geometry for 3-bladed HAWT.
 * Equations:
 *   D = 2 * R
 *   A = pi * R^2
 */
export function calculateRotorGeometry(radius_m) {
  const radius = Math.max(0, Number(radius_m) || 0);
  const diameter = 2.0 * radius;
  const sweptArea = Math.PI * Math.pow(radius, 2);

  return {
    rotorRadius_m: radius,
    rotorDiameter_m: diameter,
    sweptArea_m2: sweptArea,
    bladeCount: 3
  };
}

/**
 * Calculates kinetic wind power passing through the swept area.
 * Equation:
 *   P_wind = 0.5 * rho * A * v^3
 */
export function calculateAvailableWindPower(sweptArea_m2, windSpeed_mps, airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3) {
  if (windSpeed_mps <= 0 || sweptArea_m2 <= 0) {
    return 0.0;
  }
  return 0.5 * airDensity_kgpm3 * sweptArea_m2 * Math.pow(windSpeed_mps, 3);
}

/**
 * Calculates captured mechanical power from available wind power.
 * Equation:
 *   P_mech = P_wind * Cp
 */
export function calculateMechanicalPower(availableWindPower_W, cp) {
  if (cp === null || cp === undefined) {
    return null;
  }
  const clampedCp = Math.min(Math.max(0, cp), BETZ_LIMIT);
  return availableWindPower_W * clampedCp;
}

/**
 * Calculates rotor rotational speed, tip-speed ratio, and aerodynamic torque.
 * Equations:
 *   omega = lambda_target * v / R
 *   RPM = omega * 60 / (2 * pi)
 *   v_tip = omega * R
 *   tau = P_mech / omega
 */
export function calculateRotorDynamics({
  windSpeed_mps,
  rotorRadius_m,
  mechanicalPower_W,
  targetTipSpeedRatio = 7.5,
  maxRotorRPM = 20.0
}) {
  if (windSpeed_mps <= 0 || rotorRadius_m <= 0) {
    return {
      angularVelocity_radps: 0.0,
      rotorRPM: 0.0,
      tipSpeed_mps: 0.0,
      tipSpeedRatio: 0.0,
      aerodynamicTorque_Nm: 0.0,
      isRPMClamped: false
    };
  }

  // Target operational angular velocity
  let omega = (targetTipSpeedRatio * windSpeed_mps) / rotorRadius_m;
  let isRPMClamped = false;

  if (maxRotorRPM && maxRotorRPM > 0) {
    const maxOmega = (maxRotorRPM * 2.0 * Math.PI) / 60.0;
    if (omega > maxOmega) {
      omega = maxOmega;
      isRPMClamped = true;
    }
  }

  const rotorRPM = (omega * 60.0) / (2.0 * Math.PI);
  const tipSpeed_mps = omega * rotorRadius_m;
  const tipSpeedRatio = tipSpeed_mps / windSpeed_mps;

  // Low-speed shaft torque: tau = P_mech / omega
  let aerodynamicTorque_Nm = 0.0;
  if (mechanicalPower_W !== null && mechanicalPower_W > 0 && omega > 0) {
    aerodynamicTorque_Nm = mechanicalPower_W / omega;
  }

  return {
    angularVelocity_radps: omega,
    rotorRPM,
    tipSpeed_mps,
    tipSpeedRatio,
    aerodynamicTorque_Nm,
    isRPMClamped
  };
}

/**
 * Calculates gearbox output speed and torque.
 * Equations:
 *   omega_gen = omega_rotor * gearboxRatio
 *   RPM_gen = RPM_rotor * gearboxRatio
 *   tau_gen = (tau_rotor * eff) / gearboxRatio
 */
export function calculateGearboxOutput({
  rotorAngularVelocity_radps,
  rotorRPM,
  aerodynamicTorque_Nm,
  gearboxRatio = 90.0,
  gearboxEfficiency = 0.95
}) {
  if (!gearboxRatio || rotorRPM === null) {
    return {
      generatorShaftAngularVelocity_radps: null,
      generatorShaftRPM: null,
      generatorShaftTorque_Nm: null,
      gearboxRatio: null
    };
  }

  const generatorShaftAngularVelocity_radps = rotorAngularVelocity_radps * gearboxRatio;
  const generatorShaftRPM = rotorRPM * gearboxRatio;
  const generatorShaftTorque_Nm = (aerodynamicTorque_Nm * gearboxEfficiency) / gearboxRatio;

  return {
    generatorShaftAngularVelocity_radps,
    generatorShaftRPM,
    generatorShaftTorque_Nm,
    gearboxRatio
  };
}

/**
 * Calculates electrical generation and power conversion losses.
 * Equation:
 *   P_elec = P_mech * eta_drive * eta_gen
 */
export function calculateElectricalPower(
  mechanicalPower_W,
  drivetrainEfficiency = 0.95,
  generatorEfficiency = 0.94
) {
  if (mechanicalPower_W === null || mechanicalPower_W === undefined) {
    return {
      electricalPower_W: null,
      drivetrainEfficiency,
      generatorEfficiency,
      combinedEfficiency: null,
      losses: null
    };
  }

  const combinedEfficiency = drivetrainEfficiency * generatorEfficiency;
  const electricalPower_W = mechanicalPower_W * combinedEfficiency;
  const drivetrainLoss_W = mechanicalPower_W * (1.0 - drivetrainEfficiency);
  const generatorLoss_W = (mechanicalPower_W * drivetrainEfficiency) * (1.0 - generatorEfficiency);

  return {
    electricalPower_W,
    drivetrainEfficiency,
    generatorEfficiency,
    combinedEfficiency,
    losses: {
      drivetrainLoss_W,
      generatorLoss_W,
      totalLoss_W: drivetrainLoss_W + generatorLoss_W
    }
  };
}

/**
 * Unified real-time simulation evaluation function.
 * Computes the complete deterministic physics state in a single synchronous pass.
 */
export function computeRealtimeSimulation({
  windSpeed_mps,
  rotorRadius_m,
  airDensity_kgpm3 = STANDARD_AIR_DENSITY_KG_M3,
  useEducationalAssumptions = true
}) {
  const v = Math.max(0, parseFloat(windSpeed_mps) || 0);
  const r = Math.max(1, parseFloat(rotorRadius_m) || 1);
  const rho = Math.max(0.1, parseFloat(airDensity_kgpm3) || STANDARD_AIR_DENSITY_KG_M3);

  // 1. Geometry
  const geometry = calculateRotorGeometry(r);

  // 2. Kinetic Wind Power
  const availableWindPower_W = calculateAvailableWindPower(geometry.sweptArea_m2, v, rho);
  const availableWindPower_kW = availableWindPower_W / 1000.0;

  // 3. Captured Mechanical Power
  const cp = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedCp : null;
  const mechanicalPower_W = cp !== null ? calculateMechanicalPower(availableWindPower_W, cp) : null;
  const mechanicalPower_kW = mechanicalPower_W !== null ? mechanicalPower_W / 1000.0 : null;

  // 4. Rotor Dynamics
  const targetTSR = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedTargetTipSpeedRatio : null;
  const maxRPM = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedMaxRotorRPM : null;
  const rotorDynamics = targetTSR !== null ? calculateRotorDynamics({
    windSpeed_mps: v,
    rotorRadius_m: r,
    mechanicalPower_W,
    targetTipSpeedRatio: targetTSR,
    maxRotorRPM: maxRPM
  }) : {
    angularVelocity_radps: null,
    rotorRPM: null,
    tipSpeed_mps: null,
    tipSpeedRatio: null,
    aerodynamicTorque_Nm: null,
    isRPMClamped: false
  };

  // 5. Gearbox & Drivetrain
  const gearboxRatio = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedGearboxRatio : null;
  const drivetrainEfficiency = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedDrivetrainEfficiency : null;
  const generatorEfficiency = useEducationalAssumptions ? EDUCATIONAL_BASELINE.assumedGeneratorEfficiency : null;

  const drivetrain = calculateGearboxOutput({
    rotorAngularVelocity_radps: rotorDynamics.angularVelocity_radps,
    rotorRPM: rotorDynamics.rotorRPM,
    aerodynamicTorque_Nm: rotorDynamics.aerodynamicTorque_Nm,
    gearboxRatio,
    gearboxEfficiency: drivetrainEfficiency || 1.0
  });

  // 6. Electrical Generation
  const electrical = (drivetrainEfficiency !== null && generatorEfficiency !== null)
    ? calculateElectricalPower(mechanicalPower_W, drivetrainEfficiency, generatorEfficiency)
    : { electricalPower_W: null, combinedEfficiency: null, losses: null };

  return {
    inputs: {
      windSpeed_mps: v,
      rotorRadius_m: r,
      airDensity_kgpm3: rho,
      useEducationalAssumptions
    },
    results: {
      geometry,
      aerodynamics: {
        availableWindPower_W,
        availableWindPower_kW,
        cp,
        betzLimit: BETZ_LIMIT,
        mechanicalPower_W,
        mechanicalPower_kW
      },
      rotorDynamics,
      drivetrain,
      electrical
    }
  };
}
