/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { CycleRaycast, OrbitControls } from "@react-three/drei";
import City from "./models/City";
import { HumanController } from "./controllers/HumanController";
import NavMesh from "./models/NavMesh";
import { useState } from "react";
// import Human from "./models/Human";
function App() {
  const [position, setPosition] = useState([6, 9, -11]);
  const changePos = (pos) => {
    setPosition(pos);
  };
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [0, -6.5, -43.4];
    const rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  return (
    <section className="w-full h-screen">
      <Canvas
        className={"w-full h-screen bg-transparent"}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense>
          <OrbitControls />

          <Physics>
            <directionalLight position={[1, 1, 1]} intensity={3} />
            <ambientLight intensity={0.5} />
            <HumanController position={position} />
            <NavMesh
              setPosition={changePos}
              humanPosition={position}
              position={islandPosition}
              scale={islandScale}
            />
            <City position={islandPosition} scale={islandScale} />
          </Physics>
        </Suspense>
      </Canvas>
    </section>
  );
}

export default App;
