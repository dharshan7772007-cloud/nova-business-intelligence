import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NovaSphereIndicatorProps {
  size?: number;
  isThinking?: boolean;
}

export const NovaSphereIndicator: React.FC<NovaSphereIndicatorProps> = ({
  size = 64,
  isThinking = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.replaceChildren(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core Orb
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: '#8B5CF6',
      emissive: isThinking ? '#22D3EE' : '#8B5CF6',
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.25, 0.035, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: '#22D3EE',
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    // Orbital Ring 2
    const ring2 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    const light1 = new THREE.PointLight('#22D3EE', 2, 10);
    light1.position.set(2, 2, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight('#8B5CF6', 2, 10);
    light2.position.set(-2, -2, 2);
    scene.add(light2);

    let frameId = 0;
    const speed = isThinking ? 2.5 : 1.0;

    const animate = () => {
      group.rotation.y += 0.015 * speed;
      ring1.rotation.z += 0.02 * speed;
      ring2.rotation.x -= 0.02 * speed;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [size, isThinking]);

  return <div ref={mountRef} style={{ width: size, height: size }} className="shrink-0 flex items-center justify-center" />;
};
