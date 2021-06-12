import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { WaterPass } from "../shaders/Waterpass";
import { Effects } from "@react-three/drei";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  WaterPass,
  AfterimagePass,
  UnrealBloomPass,
});

function Swarm({ count }) {
  const mesh = useRef();
  const light = useRef();
  const { viewport, mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    light.current.position.set(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 20;
      const b = Math.sin(t) + Math.cos(t * 2) / 20;
      const s = Math.cos(t);
      particle.mx += mouse.x * viewport.width * particle.mx * 0.01;
      particle.my += mouse.y * viewport.height * particle.my * 0.01;
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={50} intensity={0.8} color="skyblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereBufferGeometry args={[0.2, 30, 30]} />
        <meshStandardMaterial color="#790000" />
      </instancedMesh>
    </>
  );
}

function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30;
  });
  return null;
}

const Particles = () => {
  return (
    <>
      <Canvas camera={{ fov: 75, position: [0, 0, 70] }}>
        <pointLight intensity={0.7} color="white" />
        <pointLight intensity={0.5} position={[70, 70, 70]} color="lightblue" />
        <Swarm count={5000} />
        <Effects>
          <waterPass attachArray="passes" factor={2} />
          <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
        </Effects>
        <Dolly />
      </Canvas>
    </>
  );
};

export default Particles;
