import {
  EffectComposer,
  Bloom,
  SSAO,
  Glitch,
  Noise,
} from "react-postprocessing";
import { BlendFunction } from "postprocessing";

export const Effects = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <SSAO />
      <Glitch
        delay={[5, 0]}
        duration={[1, 0]}
        active
        ratio={10}
        strength={[0.3, 0.6]}
      />
      <Noise blendFunction={BlendFunction.MULTIPLY} />
    </EffectComposer>
  );
};
