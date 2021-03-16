import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import Boxes from "../components/Boxes";
import LightPoint from "../components/LightPoint";
import { Effects } from "../components/Utils";
import TypedAnimation from "../components/TypedAnimation";

const Section_1 = () => {
  return (
    <>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        onCreated={({ gl }) => {
          gl.setClearColor("#610000");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
        }}
        camera={{ position: [0, 0, 6.5] }}
        className="main"
        concurrent // Enables React concurrent mode
        colorManagement // Auto sRGBEncoding encoding for all colors and textures + ACESFilmic
      >
        <spotLight position={[100, 100, 100]} angle={0.15} penumbra={0.5} />
        <LightPoint />
        <Boxes />
        <Effects />
        <fog attach="fog" args={["#790000", 2.5, 5.5]} />
      </Canvas>
      <TypedAnimation />
    </>
  );
};

export default Section_1;
