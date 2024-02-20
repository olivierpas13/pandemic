/* eslint-disable react/prop-types */
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import Human from "../models/Human";
import { useFrame } from "@react-three/fiber";
const MOVEMENT_SPEED = 10;

export const HumanController = ({position, ...props}) => {
  const group = useRef();
  const character = useRef();
  const rigidbody = useRef();
  //   const [animation, setAnimation] = useState("Idle");

  //   const scene = useThree((state) => state.scene);
  //   const spawnRandomly = () => {
  //     const spawns = [];
  //     for (let i = 0; i < 1000; i++) {
  //       const spawn = scene.getObjectByName(`spawn_${i}`);
  //       if (spawn) {
  //         spawns.push(spawn);
  //       } else {
  //         break;
  //       }
  //     }
  //     const spawnPos = spawns[Math.floor(Math.random() * spawns.length)].position;
  //     rigidbody.current.setTranslation(spawnPos);
  //   };

    useFrame((_, delta) => {
  // // //     // CAMERA FOLLOW
  // // //     if (controls.current) {
  // // //       const cameraDistanceY = window.innerWidth < 1024 ? 16 : 20;
  // // //       const cameraDistanceZ = window.innerWidth < 1024 ? 12 : 16;
  // // //       const playerWorldPos = vec3(rigidbody.current.translation());
  // // //       controls.current.setLookAt(
  // // //         playerWorldPos.x,
  // // //         playerWorldPos.y + (state.state.dead ? 12 : cameraDistanceY),
  // // //         playerWorldPos.z + (state.state.dead ? 2 : cameraDistanceZ),
  // // //         playerWorldPos.x,
  // // //         playerWorldPos.y + 1.5,
  // // //         playerWorldPos.z,
  // // //         true
  // // //       );
  // // //     }

  // // //     // Update player position based on joystick state
  // // //       setAnimation("Run");
  // // //       character.current.rotation.y = angle;

  // // //       // move character in its own direction
        // const impulse = {
        //   x: MOVEMENT_SPEED * delta,
        //   y: 0,
        //   z:  MOVEMENT_SPEED * delta,
        // };
        // rigidbody.current.applyImpulse(impulse, true);

    });

  // // //     // if (isHost()) {
  // // //     //   state.setState("pos", rigidbody.current.translation());
  // // //     // } else {
  // // //     //   const pos = state.getState("pos");
  // // //     //   if (pos) {
  // // //     //     rigidbody.current.setTranslation(pos);
  // // //     //   }
  // // //     // }
  // // //   });
  // // //   const controls = useRef();
  // // //   const directionalLight = useRef();

  //   useEffect(() => {
  //     if (character.current && userPlayer) {
  //       directionalLight.current.target = character.current;
  //     }
  //   }, [character.current]);

  return (
    <group  position={position} {...props} ref={group}>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        linearDamping={12}
        lockRotations
        type='dynamic'
      >
        <group ref={character}>
          <Human position={position} scale={[1.4, 1.4, 1.4]} />
        </group>
        <CapsuleCollider args={[0.3, 0.5]} position={[6, 9.8, -11]} />
      </RigidBody>
    </group>
  );
};
