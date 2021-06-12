import { useMemo, useState, useEffect, useRef } from "react";
import { Object3D, Color, DoubleSide, VertexColors } from "three";
import { useFrame } from "react-three-fiber";
import niceColors from "nice-color-palettes";

const Boxes = () => {
  const tempObject = new Object3D();
  const tempColor = new Color();
  const colors = new Array(1000)

    .fill()
    .map(() => niceColors[17][Math.floor(Math.random() * 5)]);

  const [hovered, setHovered] = useState();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i]).toArray())
      ),
    []
  );

  const ref = useRef();
  const previous = useRef();

  useEffect(() => void (previous.current = hovered), [hovered]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    let i = 0;
    for (let x = 0; x < 15; x++)
      for (let y = 0; y < 15; y++) {
        const id = i++;
        tempObject.scale.z =
          Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + 10;
        tempObject.position.set(x - 7, y - 7, 0);
        if (hovered !== previous.current) {
          ref.current.geometry.attributes.color.needsUpdate = true;
        }
        const scale = id === hovered ? 1.5 : 1;
        tempObject.scale.x = tempObject.scale.y = scale;
        tempObject.updateMatrix();
        ref.current.setMatrixAt(id, tempObject.matrix);
      }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, 200]}
      onPointerMove={(e) => setHovered(e.instanceId)}
      onPointerOut={() => setHovered(undefined)}
      position={[1, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[colorArray, 1]}
        />
      </boxBufferGeometry>
      <meshPhysicalMaterial
        attach="material"
        vertexColors={VertexColors}
        side={DoubleSide}
      />
    </instancedMesh>
  );
};

export default Boxes;
