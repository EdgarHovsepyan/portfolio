import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame, useThree } from "react-three-fiber";

const LightPoint = () => {
  const { viewport, camera } = useThree();
  const ref = useRef();

  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    let vector = new Vector3(x, y, 100);
    vector.unproject(camera);
    let dir = vector.sub(camera.position).normalize();
    let distance = -camera.position.z / dir.z;
    let pos = camera.position.clone().add(dir.multiplyScalar(distance));

    ref.current.position.copy(new Vector3(pos.x, pos.y, pos.z));
  });

  return <pointLight ref={ref} intensity={5} color="skyblue" />;
};

export default LightPoint;
