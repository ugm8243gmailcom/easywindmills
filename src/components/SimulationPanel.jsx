import { useState, useMemo } from 'react';
import { computeRealtimeSimulation, BETZ_LIMIT } from '../utils/turbinePhysics';

export default function SimulationPanel({ isGeneratorView = false }) {
  const [windSpeed, setWindSpeed] = useState(10.0);
  const [rotorRadius, setRotorRadius] = useState(40.0);
  const [airDensity, setAirDensity] = useState(1.225);
  const [useEducationalAssumptions, setUseEducationalAssumptions] = useState(true);

  // Synchronous client-side deterministic physics evaluation with ZERO network or API requests
  const simResults = useMemo(() => {
    return computeRealtimeSimulation({
      windSpeed_mps: windSpeed,
      rotorRadius_m: rotorRadius,
      airDensity_kgpm3: airDensity,
      useEducationalAssumptions
    });
  }, [windSpeed, rotorRadius, airDensity, useEducationalAssumptions]);

  const { geometry, aerodynamics, rotorDynamics, drivetrain, electrical } = simResults.results;

  const windPresets = [
    { label: 'Calm (0 m/s)', value: 0 },
    { label: 'Cut-in (3 m/s)', value: 3.0 },
    { label: 'Moderate (8 m/s)', value: 8.0 },
    { label: 'Rated (11.5 m/s)', value: 11.5 },
    { label: 'Gale (20 m/s)', value: 20.0 }
  ];

  return (
    <section className="simulation-section" id="simulation-calculator">
      <div className="simulation-panel-container">
        {/* Header Bar */}
        <div className="simulation-header-bar">
          <div className="simulation-header-titles">
            <div className="simulation-badge-row">
              <span className="sim-tag-cat">
                {isGeneratorView ? 'Direct-Drive PMSG Model' : 'HAWT Engineering Model'}
              </span>
              <span className="sim-tag-status status-online">
                <span className="status-indicator-dot" />
                <span>Real-Time Physics Evaluation (Client-Side)</span>
              </span>
            </div>
            <h3 className="simulation-title">
              {isGeneratorView
                ? 'Direct-Drive PMSG Generator Electromechanical Simulation'
                : 'Educational HAWT Aerodynamic and Electrical Simulation'}
            </h3>
            <p className="simulation-subtitle">
              {isGeneratorView
                ? 'Calculates direct mechanical input torque from the hub, low-speed shaft rotation without a gearbox, multi-pole stator back-EMF, and full-scale power converter electrical output.'
                : 'Calculates theoretical kinetic wind power, low-speed shaft mechanical torque, rotational speeds, and generator output instantly in real time using client-side physics formulas.'}
            </p>
          </div>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="simulation-grid">
          {/* Left Column: Input Controls */}
          <div className="sim-card sim-controls-card">
            <h4 className="sim-card-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Simulation Input Parameters</span>
            </h4>

            {/* Wind Speed Control */}
            <div className="sim-control-group">
              <div className="sim-label-row">
                <label htmlFor="sim-wind-speed" className="sim-label">Inflow Wind Speed (v)</label>
                <span className="sim-value-badge">{windSpeed.toFixed(1)} m/s ({(windSpeed * 3.6).toFixed(1)} km/h)</span>
              </div>
              <input
                id="sim-wind-speed"
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                className="sim-slider"
              />
              <div className="sim-slider-ticks">
                <span>0 m/s (Calm)</span>
                <span>8 m/s (Moderate)</span>
                <span>12 m/s (Rated)</span>
                <span>25 m/s (Gale)</span>
              </div>

              {/* Quick Presets */}
              <div className="sim-presets-row">
                {windPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className={`sim-preset-btn ${windSpeed === preset.value ? 'sim-preset-btn--active' : ''}`}
                    onClick={() => setWindSpeed(preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rotor Radius Control */}
            <div className="sim-control-group">
              <div className="sim-label-row">
                <label htmlFor="sim-rotor-radius" className="sim-label">Rotor Radius (R)</label>
                <span className="sim-value-badge">{rotorRadius.toFixed(1)} m (Diameter: {(rotorRadius * 2).toFixed(1)} m)</span>
              </div>
              <input
                id="sim-rotor-radius"
                type="range"
                min="10"
                max="80"
                step="1"
                value={rotorRadius}
                onChange={(e) => setRotorRadius(parseFloat(e.target.value))}
                className="sim-slider"
              />
              <div className="sim-slider-ticks">
                <span>10 m</span>
                <span>40 m (Baseline)</span>
                <span>80 m</span>
              </div>
            </div>

            {/* Ambient Air Density */}
            <div className="sim-control-group">
              <div className="sim-label-row">
                <label htmlFor="sim-air-density" className="sim-label">Air Density (rho)</label>
                <span className="sim-value-badge">{airDensity.toFixed(3)} kg/m³</span>
              </div>
              <input
                id="sim-air-density"
                type="range"
                min="1.000"
                max="1.350"
                step="0.005"
                value={airDensity}
                onChange={(e) => setAirDensity(parseFloat(e.target.value))}
                className="sim-slider"
              />
              <div className="sim-slider-ticks">
                <span>1.000 (High Alt.)</span>
                <span>1.225 (ISO Sea-level, 15°C)</span>
                <span>1.350 (Dense Cold)</span>
              </div>
            </div>

            {/* Educational Assumptions Toggle */}
            <div className="sim-toggle-row">
              <label className="sim-checkbox-label" htmlFor="sim-assumptions-toggle">
                <input
                  id="sim-assumptions-toggle"
                  type="checkbox"
                  checked={useEducationalAssumptions}
                  onChange={(e) => setUseEducationalAssumptions(e.target.checked)}
                />
                <span className="sim-checkbox-custom" />
                <span className="sim-checkbox-text">
                  Apply educational baseline assumptions (Cp = 0.42, Gearbox ratio = 90:1, Drivetrain eff = 95%, Generator eff = 94%)
                </span>
              </label>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="sim-card sim-results-card">
            <h4 className="sim-card-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Deterministic Real-Time Physics Output</span>
            </h4>

            <div className="sim-outputs-grid">
              {/* Metric 1: Kinetic Power */}
              <div className="sim-metric-box">
                <div className="metric-header">
                  <span className="metric-label">Available Wind Power (P_wind)</span>
                  <span className="metric-eq">0.5 * rho * A * v³</span>
                </div>
                <div className="metric-main-value">
                  {aerodynamics.availableWindPower_kW < 1000
                    ? `${aerodynamics.availableWindPower_kW.toFixed(1)} kW`
                    : `${(aerodynamics.availableWindPower_kW / 1000).toFixed(2)} MW`}
                </div>
                <div className="metric-sub">
                  Swept Area: {Math.round(geometry.sweptArea_m2).toLocaleString()} m² | Rotor Dia: {geometry.rotorDiameter_m.toFixed(1)} m
                </div>
              </div>

              {/* Metric 2: Mechanical Power */}
              <div className="sim-metric-box">
                <div className="metric-header">
                  <span className="metric-label">Captured Mechanical Power (P_mech)</span>
                  <span className="metric-eq">P_wind * Cp</span>
                </div>
                <div className="metric-main-value">
                  {aerodynamics.mechanicalPower_kW !== null
                    ? (aerodynamics.mechanicalPower_kW < 1000
                        ? `${aerodynamics.mechanicalPower_kW.toFixed(1)} kW`
                        : `${(aerodynamics.mechanicalPower_kW / 1000).toFixed(2)} MW`)
                    : 'Unavailable (Requires Cp)'}
                </div>
                <div className="metric-sub">
                  {aerodynamics.cp !== null
                    ? `Rotor Cp: ${aerodynamics.cp} (Betz Limit: ${BETZ_LIMIT.toFixed(3)})`
                    : 'Cp unsupplied'}
                </div>
              </div>

              {/* Metric 3: Rotor Speed and Low-Speed Torque */}
              <div className="sim-metric-box">
                <div className="metric-header">
                  <span className="metric-label">Low-Speed Shaft Dynamics</span>
                  <span className="metric-eq">tau = P_mech / omega</span>
                </div>
                <div className="metric-main-value">
                  {rotorDynamics.rotorRPM !== null
                    ? `${rotorDynamics.rotorRPM.toFixed(1)} RPM`
                    : 'Unavailable'}
                </div>
                <div className="metric-sub">
                  {rotorDynamics.aerodynamicTorque_Nm !== null
                    ? `Shaft Torque: ${(rotorDynamics.aerodynamicTorque_Nm / 1000).toFixed(1)} kN*m | Tip Speed: ${rotorDynamics.tipSpeed_mps.toFixed(1)} m/s`
                    : 'Torque unavailable'}
                </div>
              </div>

              {/* Metric 4: Generator Output and Drivetrain Speed */}
              <div className="sim-metric-box metric-box--highlight">
                <div className="metric-header">
                  <span className="metric-label">Electrical Generation Output</span>
                  <span className="metric-eq">P_mech * eta_drive * eta_gen</span>
                </div>
                <div className="metric-main-value metric-value--highlight">
                  {electrical.electricalPower_W !== null
                    ? (electrical.electricalPower_W < 1e6
                        ? `${(electrical.electricalPower_W / 1000).toFixed(1)} kW`
                        : `${(electrical.electricalPower_W / 1e6).toFixed(2)} MW`)
                    : 'Unavailable (Efficiencies required)'}
                </div>
                <div className="metric-sub">
                  {drivetrain.generatorShaftRPM !== null
                    ? `Generator Shaft: ${Math.round(drivetrain.generatorShaftRPM)} RPM (90:1 Gearbox) | Combined Eff: ${((drivetrain.generatorShaftRPM > 0 && electrical.combinedEfficiency) ? (electrical.combinedEfficiency * 100).toFixed(1) : 0)}%`
                    : 'Generator speed unverified'}
                </div>
              </div>
            </div>

            {/* Formula Step-by-Step Transparency Box */}
            <div className="sim-formula-breakdown">
              <div className="sim-formula-title">Live Mathematical Evaluation</div>
              <div className="sim-formula-items">
                <div className="sim-formula-item">
                  <span className="sim-f-name">P_wind:</span>
                  <span className="sim-f-code">0.5 * {airDensity.toFixed(3)} * {Math.round(geometry.sweptArea_m2)} m² * ({windSpeed.toFixed(1)})³ = {aerodynamics.availableWindPower_kW.toFixed(1)} kW</span>
                </div>
                {aerodynamics.mechanicalPower_kW !== null && (
                  <div className="sim-formula-item">
                    <span className="sim-f-name">P_mech:</span>
                    <span className="sim-f-code">{aerodynamics.availableWindPower_kW.toFixed(1)} kW * {aerodynamics.cp} = {aerodynamics.mechanicalPower_kW.toFixed(1)} kW</span>
                  </div>
                )}
                {electrical.electricalPower_W !== null && (
                  <div className="sim-formula-item">
                    <span className="sim-f-name">P_elec:</span>
                    <span className="sim-f-code">{aerodynamics.mechanicalPower_kW.toFixed(1)} kW * 0.95 * 0.94 = {(electrical.electricalPower_W / 1000).toFixed(1)} kW</span>
                  </div>
                )}
              </div>
            </div>

            {/* Engineering Integrity Notice */}
            <div className="sim-integrity-notice">
              <span className="notice-icon">i</span>
              <p>
                <strong>Educational Model Notice:</strong> These results represent theoretical aerodynamic and electromechanical conversion for a 3-blade geared HAWT computed locally in-browser. Calculations reflect quasi-steady kinematic equations and educational assumptions with zero network calls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
