/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import City from "./models/City";
function App() {
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

          {/* <Physics debug> */}
          <directionalLight position={[1, 1, 1]} intensity={3} />
          <ambientLight intensity={0.5} />
          <City
            position={islandPosition}
            islandScale={islandScale}
            islandRotation={islandRotation}
          />
          {/* </Physics> */}
        </Suspense>
      </Canvas>
    </section>
  );
}

export default App;
