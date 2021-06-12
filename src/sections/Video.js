import React, { Suspense, useEffect, useState } from "react";
import { EffectComposer, Bloom, Vignette } from 'react-postprocessing'
import { DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import videoSrc from "../assets/rolik.mp4";

const Video = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoSrc;
    vid.crossOrigin = "Anonymous";
    vid.muted = true;
    vid.loop = true;
    vid.play();
    return vid;
  });

  const gltfTv = useLoader(GLTFLoader, "../../models/tv/scene.glb");
  gltfTv.scene.scale.set(100, 100, 100);

  const gltfTable = useLoader(GLTFLoader, "../../models/table/scene.glb");
  gltfTable.scene.scale.set(0.1, 0.1, 0.1);

  gltfTv.scene.traverse((item) => {
    if (item.isMesh && item.name === "Object_6") {
      item.visible = false;
    }
  });

  return (
    <Canvas camera={{ fov: 75, position: [-100, 170, 150] }}>
      <OrbitControls />
      <Suspense fallback={null}>
        <group position={[0, 105, 50]}>
          <mesh>
            <planeBufferGeometry args={[92.16, 51.84]} />
            <meshStandardMaterial emissive={"white"} side={DoubleSide}>
              <videoTexture attach="map" args={[video]} />
              <videoTexture attach="emissiveMap" args={[video]} />
            </meshStandardMaterial>
            <primitive object={gltfTv.scene} position={[0, -31, 0]} />
          </mesh>
        </group>
        <primitive object={gltfTable.scene} position={[-45, 0, -40]} />
      </Suspense>
      <ambientLight intensity={1} />
      <pointLight intensity={0.3} color={"white"} position={[-10, 10, 50]} />
      <pointLight intensity={0.3} color={"red"} position={[50, 50, 10]} />
      <pointLight intensity={0.3} color={"white"} position={[50, 100, -50]} />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={1.5} />
      </EffectComposer>
    </Canvas>
  );
};

export default Video;
