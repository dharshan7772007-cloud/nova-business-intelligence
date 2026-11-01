import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroDataSphereProps {
  className?: string;
}

export const HeroDataSphere: React.FC<HeroDataSphereProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#080B14', 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.replaceChildren(renderer.domElement);

    // 3. Lighting Rig (Warm Key Light, Cool Fill Light, Backlight)
    const keyLight = new THREE.DirectionalLight('#22D3EE', 2.8);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#8B5CF6', 3.2);
    fillLight.position.set(-5, -3, 4);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight('#8B5CF6', '#080B14', 1.0);
    scene.add(hemiLight);

    // 4. Procedural Hero 3D Composite Data Object (Multi-part THREE.Group)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Part A: Inner Icosahedron Core with glowing emissive pulses
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: '#151C2C',
      roughness: 0.15,
      metalness: 0.85,
      wireframe: wireframeMode,
      emissive: '#4C1D95',
      emissiveIntensity: 0.4,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // Part B: Outer Lattice Cage (Wireframe Geodesic)
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: '#22D3EE',
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.9,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    rootGroup.add(outerMesh);

    // Part C: Orbital Rings (Data Bands)
    const ringGeo = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#8B5CF6',
      metalness: 0.9,
      roughness: 0.1,
      emissive: '#8B5CF6',
      emissiveIntensity: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    rootGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    ring2.scale.set(1.15, 1.15, 1.15);
    rootGroup.add(ring2);

    // Part D: Floating Analytical Data Node Points (Instanced Nodes)
    const particleCount = isSoftwareGl ? 80 : 220;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colCyan = new THREE.Color('#22D3EE');
    const colPurple = new THREE.Color('#8B5CF6');

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixedColor = Math.random() > 0.5 ? colCyan : colPurple;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 5. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;
    };

    window.addEventListener('pointermove', onPointerMove);

    // 6. Animation Loop with frame-rate independent rotation and damping
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (isRotating) {
        rootGroup.rotation.y += delta * 0.3;
        rootGroup.rotation.x += delta * 0.12;
        ring1.rotation.z += delta * 0.4;
        ring2.rotation.y += delta * -0.3;
        particles.rotation.y -= delta * 0.08;
      }

      // Smooth mouse parallax interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2;
      camera.position.y = mouseY * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [isRotating, wireframeMode]);

  return (
    <div className={`relative w-full h-full min-h-[420px] flex items-center justify-center ${className}`}>
      {/* Three.js canvas container */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto" />

      {/* Futuristic dimensional subtle control dock (Zero-occlusion bottom dock) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151C2C]/80 backdrop-blur-md border border-[#8B5CF6]/20 text-xs text-[#94A3B8] shadow-lg pointer-events-auto z-10">
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
            isRotating ? 'bg-[#8B5CF6]/25 text-[#22D3EE] border border-[#22D3EE]/30' : 'hover:text-[#F8FAFC]'
          }`}
        >
          {isRotating ? 'Orbit Active' : 'Orbit Paused'}
        </button>
        <div className="h-3 w-px bg-white/10" />
        <button
          type="button"
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
            wireframeMode ? 'bg-[#22D3EE]/20 text-[#22D3EE]' : 'hover:text-[#F8FAFC]'
          }`}
        >
          {wireframeMode ? 'Wireframe Matrix' : 'Solid Shell'}
        </button>
      </div>
    </div>
  );
};
