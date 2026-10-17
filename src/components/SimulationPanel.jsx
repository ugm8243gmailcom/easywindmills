import { useState, useEffect, useCallback } from 'react';

export default function SimulationPanel() {
  const [windSpeed, setWindSpeed] = useState(10.0);
  const [rotorRadius, setRotorRadius] = useState(40.0);
  const [airDensity, setAirDensity] = useState(1.225);
  const [useEducationalAssumptions, setUseEducationalAssumptions] = useState(true);

  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true, message: 'Checking backend...' });
  const [simResults, setSimResults] = useState(null);
  const [simLoading, setSimLoading] = useState(false);
  const [simError, setSimError] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          setBackendStatus({
            online: true,
            checking: false,
            service: data.service,
            version: data.version,
            message: 'Live Backend Connected'
          });
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus({
            online: false,
            checking: false,
            message: `Backend Connection Offline: ${err.message}`
          });
        }
      }
    }
    checkHealth();
    return () => { isMounted = false; };
  }, []);

  // Run calculation
  const executeCalculation = useCallback(async (speed, radius, density, assumptions) => {
    setSimLoading(true);
    setSimError(null);
    try {
      const res = await fetch('/api/simulation/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          windSpeed_mps: parseFloat(speed),
          rotorRadius_m: parseFloat(radius),
          airDensity_kgpm3: parseFloat(density),
          useEducationalAssumptions: assumptions
        })
      });

      if (!res.ok) {
        const errPayload = await res.json().catch(() => ({}));
        throw new Error(errPayload.message || `Calculation failed with HTTP ${res.status}`);
      }

      const payload = await res.json();
      setSimResults(payload);
    } catch (err) {
      setSimError(err.message);
    } finally {
      setSimLoading(false);
    }
  }, []);

  // Auto-run when inputs change
  useEffect(() => {
    const timer = setTimeout(() => {
      executeCalculation(windSpeed, rotorRadius, airDensity, useEducationalAssumptions);
    }, 150);
    return () => clearTimeout(timer);
  }, [windSpeed, rotorRadius, airDensity, useEducationalAssumptions, executeCalculation]);

  return (
    <section className="simulation-section" id="simulation-calculator">
      <div className="simulation-panel-container">
        {/* Header Bar */}
        <div className="simulation-header-bar">
          <div className="simulation-header-titles">
            <div className="simulation-badge-row">
              <span className="sim-tag-cat">HAWT Engineering Model</span>
              <span className={`sim-tag-status ${backendStatus.online ? 'status-online' : 'status-offline'}`}>
                <span className="status-indicator-dot" />
                <span>{backendStatus.checking ? 'Connecting to API...' : backendStatus.online ? 'Backend Live: /api/simulation' : 'API Offline'}</span>
              </span>
            </div>
            <h3 className="simulation-title">Educational HAWT Aerodynamic and Electrical Simulation</h3>
            <p className="simulation-subtitle">
              Calculates theoretical kinetic wind power, low-speed shaft mechanical torque, rotational speeds, and generator output based on documented physical equations.
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
                step="0.5"
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
              <span>Deterministic Physics Output {simLoading && '(Calculating...)'}</span>
            </h4>

            {simError && (
              <div className="sim-error-alert" role="alert">
                <span>Calculation Error: {simError}</span>
              </div>
            )}

            {simResults && (
              <div className="sim-outputs-grid">
                {/* Metric 1: Kinetic Power */}
                <div className="sim-metric-box">
                  <div className="metric-header">
                    <span className="metric-label">Available Wind Power (P_wind)</span>
                    <span className="metric-eq">0.5 * rho * A * v³</span>
                  </div>
                  <div className="metric-main-value">
                    {simResults.results.aerodynamics.availableWindPower_kW < 1000
                      ? `${simResults.results.aerodynamics.availableWindPower_kW.toFixed(1)} kW`
                      : `${(simResults.results.aerodynamics.availableWindPower_kW / 1000).toFixed(2)} MW`}
                  </div>
                  <div className="metric-sub">
                    Swept Area: {Math.round(simResults.results.geometry.sweptArea_m2).toLocaleString()} m²
                  </div>
                </div>

                {/* Metric 2: Mechanical Power */}
                <div className="sim-metric-box">
                  <div className="metric-header">
                    <span className="metric-label">Captured Mechanical Power (P_mech)</span>
                    <span className="metric-eq">P_wind * Cp</span>
                  </div>
                  <div className="metric-main-value">
                    {simResults.results.aerodynamics.mechanicalPower_kW !== null
                      ? (simResults.results.aerodynamics.mechanicalPower_kW < 1000
                          ? `${simResults.results.aerodynamics.mechanicalPower_kW.toFixed(1)} kW`
                          : `${(simResults.results.aerodynamics.mechanicalPower_kW / 1000).toFixed(2)} MW`)
                      : 'Unavailable'}
                  </div>
                  <div className="metric-sub">
                    {simResults.results.aerodynamics.cp !== null
                      ? `Rotor Cp: ${simResults.results.aerodynamics.cp} (Betz Limit: 0.593)`
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
                    {simResults.results.rotorDynamics.rotorRPM !== null
                      ? `${simResults.results.rotorDynamics.rotorRPM.toFixed(1)} RPM`
                      : 'Unavailable'}
                  </div>
                  <div className="metric-sub">
                    {simResults.results.rotorDynamics.aerodynamicTorque_Nm !== null
                      ? `Shaft Torque: ${(simResults.results.rotorDynamics.aerodynamicTorque_Nm / 1000).toFixed(1)} kN*m | Tip Speed: ${simResults.results.rotorDynamics.tipSpeed_mps.toFixed(1)} m/s`
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
                    {simResults.results.electrical.electricalPower_W !== null
                      ? (simResults.results.electrical.electricalPower_W < 1e6
                          ? `${(simResults.results.electrical.electricalPower_W / 1000).toFixed(1)} kW`
                          : `${(simResults.results.electrical.electricalPower_W / 1e6).toFixed(2)} MW`)
                      : 'Unavailable (Efficiencies required)'}
                  </div>
                  <div className="metric-sub">
                    {simResults.results.drivetrain.generatorShaftRPM !== null
                      ? `Generator Shaft: ${Math.round(simResults.results.drivetrain.generatorShaftRPM)} RPM (90:1 Gearbox)`
                      : 'Generator speed unverified'}
                  </div>
                </div>
              </div>
            )}

            {/* Engineering Integrity Notice */}
            <div className="sim-integrity-notice">
              <span className="notice-icon">i</span>
              <p>
                <strong>Educational Model Notice:</strong> These results represent theoretical aerodynamic and electromechanical conversion for a 3-blade geared HAWT. Calculations reflect quasi-steady kinematic equations and educational assumptions, not physical predictions for a specific commercial turbine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
