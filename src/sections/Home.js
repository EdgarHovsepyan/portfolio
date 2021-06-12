import { ACESFilmicToneMapping, Color } from "three";
import { Canvas } from "react-three-fiber";
import Boxes from "../components/Boxes";
import LightPoint from "../components/LightPoint";
import TypedAnimation from "../components/TypedAnimation";

const Home = () => {
  return (
    <>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        onCreated={({ gl }) => {
          gl.setClearColor(new Color("#610000"));
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.5;
        }}
        camera={{ position: [0, 0, 6.5] }}
        className="main"
        concurrent // Enables React concurrent mode
        colorManagement // Auto sRGBEncoding encoding for all colors and textures + ACESFilmic
      >
        <spotLight
          position={[100, 100, 100]}
          intensity={0.5}
          castShadow={true}
        />
        <LightPoint />
        <Boxes />
        <fog attach="fog" args={["#790000", 2.5, 5.5]} />
      </Canvas>
      <TypedAnimation />
    </>
  );
};

export default Home;
