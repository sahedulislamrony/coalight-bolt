import { useEffect, useRef } from "react";
import * as THREE from "three";

interface WormholeProps {
  mouseX: { get: () => number };
  mouseY: { get: () => number };
}

const Wormhole = ({ mouseX, mouseY }: WormholeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Wormhole geometry
    const geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x38b6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 5;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      torus.rotation.x += 0.005;
      torus.rotation.y += 0.01;

      // Respond to mouse movement
      torus.position.x = (mouseX.get() / window.innerWidth - 0.5) * 2;
      torus.position.y = -(mouseY.get() / window.innerHeight - 0.5) * 2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mouseX, mouseY]);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none" />;
};

export default Wormhole;
