import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

/**
 * ThreeWindmillsBackground Component
 * 
 * High-performance WebGL / Three.js hero background for EasyWindmills.
 * Accurately reproduces the 7 utility-scale wind turbines along the mountain ridge
 * from the reference cinematic shot, with twilight/dusk atmospheric color grading,
 * organic non-uniform wind gust rotation, and responsive positioning.
 */
const ThreeWindmillsBackground = memo(function ThreeWindmillsBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene, Camera & Renderer Setup ---
    const scene = new THREE.Scene();

    // Perspective camera calibrated for 16:9 cinematic framing
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.10;
    container.appendChild(renderer.domElement);

    // --- 2. Twilight / Dusk Lighting Rig ---
    // Ambient light matching the soft twilight sky
    const ambientLight = new THREE.AmbientLight(0x6888a4, 1.25);
    scene.add(ambientLight);

    // Golden-hour sun grazing the towers and blade edges from the upper right
    const sunLight = new THREE.DirectionalLight(0xffeed6, 2.5);
    sunLight.position.set(9, 6, 8);
    scene.add(sunLight);

    // Front key light providing clean silhouette definition on the turbines
    const frontKey = new THREE.DirectionalLight(0xd8e8f8, 1.4);
    frontKey.position.set(0, 4, 10);
    scene.add(frontKey);

    // Soft sky valley fill light from the left
    const valleyFill = new THREE.DirectionalLight(0x5a82a6, 0.85);
    valleyFill.position.set(-8, 3, 7);
    scene.add(valleyFill);

    // --- 3. Background Mountain Plate ---
    let bgMesh = null;
    let bgPlateW = 16;
    let bgPlateH = 9;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/mountain-ridge-clean.jpg',
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        const bgGeo = new THREE.PlaneGeometry(1, 1);
        const bgMat = new THREE.MeshBasicMaterial({
          map: texture,
          depthWrite: false,
          depthTest: true
        });
        bgMesh = new THREE.Mesh(bgGeo, bgMat);
        bgMesh.position.set(0, 0, -0.2);
        bgMesh.renderOrder = -100;
        scene.add(bgMesh);

        handleResize();
      },
      undefined,
      () => {
        scene.background = new THREE.Color(0x0a1626);
      }
    );

    // --- 4. Materials for Turbines ---
    const towerMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3f6f9,
      roughness: 0.32,
      metalness: 0.10
    });

    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbfeff,
      roughness: 0.28,
      metalness: 0.05
    });

    const darkAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.2
    });

    // Red aviation safety light material on nacelle top
    const beaconMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b30
    });

    // Helper: Build a single 3D utility-scale wind turbine
    const createWindTurbine = () => {
      const root = new THREE.Group();

      // Root tower group (scaled dynamically)
      const towerGroup = new THREE.Group();
      root.add(towerGroup);

      // Tapered Tubular Steel Tower (unit height 1.0)
      const towerGeo = new THREE.CylinderGeometry(0.024, 0.046, 1.0, 20);
      const towerMesh = new THREE.Mesh(towerGeo, towerMaterial);
      towerMesh.position.y = 0.5;
      towerGroup.add(towerMesh);

      // Flanged base collar blending into the mountain bedrock
      const collarGeo = new THREE.CylinderGeometry(0.048, 0.056, 0.03, 20);
      const collarMesh = new THREE.Mesh(collarGeo, darkAccentMaterial);
      collarMesh.position.y = 0.015;
      towerGroup.add(collarMesh);

      // Nacelle positioned at top of tower (y = 1.0)
      const nacelleGroup = new THREE.Group();
      nacelleGroup.position.set(0, 1.0, 0);
      root.add(nacelleGroup);

      // Nacelle housing
      const nacelleBodyGeo = new THREE.BoxGeometry(0.065, 0.052, 0.18);
      const nacelleBody = new THREE.Mesh(nacelleBodyGeo, towerMaterial);
      nacelleBody.position.set(0, 0.022, -0.035);
      nacelleGroup.add(nacelleBody);

      // Aviation beacon light on nacelle roof
      const beaconGeo = new THREE.SphereGeometry(0.008, 8, 8);
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMaterial);
      beaconMesh.position.set(0, 0.054, -0.08);
      nacelleGroup.add(beaconMesh);

      // Rotor Hub & Nose Cone
      const hubGeo = new THREE.ConeGeometry(0.036, 0.075, 18);
      hubGeo.rotateX(Math.PI / 2);
      const hubMesh = new THREE.Mesh(hubGeo, towerMaterial);
      hubMesh.position.set(0, 0.022, 0.065);
      nacelleGroup.add(hubMesh);

      // Rotor Group (rotates clockwise around Z axis)
      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(0, 0.022, 0.08);

      // 3 Aerodynamic Airfoil Blades
      for (let b = 0; b < 3; b++) {
        const bladeArm = new THREE.Group();
        bladeArm.rotation.z = (b * 2 * Math.PI) / 3;

        // Custom aerodynamic airfoil blade shape (unit length 1.0)
        const shape = new THREE.Shape();
        shape.moveTo(-0.026, 0.04);
        shape.quadraticCurveTo(-0.042, 0.35, -0.025, 0.70);
        shape.lineTo(-0.008, 1.0);
        shape.lineTo(0.008, 1.0);
        shape.quadraticCurveTo(0.025, 0.70, 0.042, 0.35);
        shape.lineTo(0.026, 0.04);
        shape.closePath();

        const extrudeSettings = {
          depth: 0.016,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.004,
          bevelThickness: 0.004
        };

        const bladeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        bladeGeo.center();
        bladeGeo.translate(0, 0.5, 0); // pivot at root
        bladeGeo.rotateY(0.06); // aerodynamic pitch angle

        const bladeMesh = new THREE.Mesh(bladeGeo, bladeMaterial);
        bladeArm.add(bladeMesh);
        rotorGroup.add(bladeArm);
      }

      nacelleGroup.add(rotorGroup);

      return { root, towerGroup, nacelleGroup, rotorGroup, beaconMesh };
    };

    // --- 5. The 7 Turbines Configuration (Exact Match to Mountain Ridge) ---
    const TURBINES_SPEC = [
      {
        id: 1,
        normX: 0.233,
        normBaseY: 0.697,
        towerHeightRatio: 0.190,
        bladeRatio: 0.148,
        baseSpeed: 0.78,
        phase: 0.45,
        yaw: 0.03,
        seed: 14.2
      },
      {
        id: 2,
        normX: 0.351,
        normBaseY: 0.706,
        towerHeightRatio: 0.186,
        bladeRatio: 0.145,
        baseSpeed: 0.94,
        phase: 2.12,
        yaw: -0.02,
        seed: 48.7
      },
      {
        id: 3,
        normX: 0.463,
        normBaseY: 0.706,
        towerHeightRatio: 0.186,
        bladeRatio: 0.145,
        baseSpeed: 0.82,
        phase: 4.18,
        yaw: 0.01,
        seed: 89.1
      },
      {
        id: 4,
        normX: 0.577,
        normBaseY: 0.700,
        towerHeightRatio: 0.183,
        bladeRatio: 0.143,
        baseSpeed: 1.06,
        phase: 1.15,
        yaw: 0.05,
        seed: 27.6
      },
      {
        id: 5,
        normX: 0.699,
        normBaseY: 0.703,
        towerHeightRatio: 0.183,
        bladeRatio: 0.143,
        baseSpeed: 0.88,
        phase: 5.42,
        yaw: -0.01,
        seed: 63.4
      },
      {
        id: 6,
        normX: 0.817,
        normBaseY: 0.703,
        towerHeightRatio: 0.181,
        bladeRatio: 0.141,
        baseSpeed: 1.01,
        phase: 3.25,
        yaw: 0.04,
        seed: 18.9
      },
      {
        id: 7,
        normX: 0.928,
        normBaseY: 0.692,
        towerHeightRatio: 0.179,
        bladeRatio: 0.139,
        baseSpeed: 0.79,
        phase: 0.85,
        yaw: -0.03,
        seed: 94.3
      }
    ];

    const turbineInstances = TURBINES_SPEC.map((spec) => {
      const turbine = createWindTurbine();
      turbine.nacelleGroup.rotation.y = spec.yaw;
      turbine.rotorGroup.rotation.z = spec.phase;
      scene.add(turbine.root);

      return {
        ...spec,
        ...turbine,
        currentSpeed: spec.baseSpeed,
        currentAngle: spec.phase
      };
    });

    // Helper: Compute viewport and lock turbines to background plate
    const updateSceneLayout = () => {
      const dist = camera.position.z;
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleH = 2 * Math.tan(vFovRad / 2) * dist;
      const visibleW = visibleH * camera.aspect;

      // Cover 16:9 image aspect ratio
      const imgAspect = 16 / 9;
      if (camera.aspect > imgAspect) {
        bgPlateW = visibleW;
        bgPlateH = visibleW / imgAspect;
      } else {
        bgPlateH = visibleH;
        bgPlateW = visibleH * imgAspect;
      }

      if (bgMesh) {
        bgMesh.scale.set(bgPlateW, bgPlateH, 1);
        bgMesh.position.set(0, 0, -0.2);
      }

      // Update each turbine's world position and physical scale
      turbineInstances.forEach((t) => {
        const worldX = (t.normX - 0.5) * bgPlateW;
        const worldY = (0.5 - t.normBaseY) * bgPlateH;
        t.root.position.set(worldX, worldY, 0.05);

        // Tower height in world units
        const towerH = t.towerHeightRatio * bgPlateH;
        // Blade length in world units
        const bladeL = t.bladeRatio * bgPlateH;

        // Scale tower geometry
        t.towerGroup.scale.set(towerH * 0.45, towerH, towerH * 0.45);
        t.nacelleGroup.position.set(0, towerH, 0);
        t.nacelleGroup.scale.set(towerH * 0.45, towerH * 0.45, towerH * 0.45);

        // Rotor group scaled by blade length
        t.rotorGroup.scale.set(bladeL, bladeL, bladeL);
      });
    };

    updateSceneLayout();

    // --- 6. Senior-Level Organic Animation Loop (Non-Uniform Wind Dynamics) ---
    let animFrameId = null;
    let lastTime = performance.now();

    const animate = (timestamp) => {
      animFrameId = requestAnimationFrame(animate);

      const dt = Math.min((timestamp - lastTime) / 1000, 0.1);
      lastTime = timestamp;
      const t = timestamp * 0.001;

      // Update each of the 7 turbines with realistic atmospheric turbulence
      turbineInstances.forEach((turbine) => {
        // Multi-frequency turbulent harmonic fluctuations
        const gustLow = Math.sin(t * 0.25 + turbine.seed) * 0.14;
        const gustMed = Math.sin(t * 0.65 + turbine.seed * 2.3) * 0.06;
        const gustHigh = Math.cos(t * 1.35 + turbine.seed * 0.7) * 0.025;

        const targetSpeed = turbine.baseSpeed * (1.0 + gustLow + gustMed + gustHigh);

        // Inertia damping and smooth acceleration easing
        turbine.currentSpeed += (targetSpeed - turbine.currentSpeed) * 0.035;

        // Clockwise rotation (looking downwind)
        turbine.currentAngle -= turbine.currentSpeed * dt;
        turbine.rotorGroup.rotation.z = turbine.currentAngle;

        // Soft hazard beacon strobe (1.5s period)
        const beaconPulse = Math.sin(t * 4.0 + turbine.seed) * 0.5 + 0.5;
        turbine.beaconMesh.scale.setScalar(0.85 + beaconPulse * 0.4);
      });

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // --- 7. Window Resize Handler ---
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      updateSceneLayout();
    };

    window.addEventListener('resize', handleResize);

    // --- 8. Clean Memory Disposal ---
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="global-webgl-background" aria-hidden="true" ref={containerRef}>
      <div className="bg-atmosphere-overlay" />
    </div>
  );
});

export default ThreeWindmillsBackground;
