/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import navMeshScene from "../assets/navMesh.glb";
import { Pathfinding, PathfindingHelper } from "three-pathfinding";
import { vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
const NavMesh = ({ humanPosition, setPosition, ...props }) => {
  const [navpath, setNavpath] = useState(null); // Initialize navpath with useState hook
  const agentPos = vec3({
    x: humanPosition[0],
    y: humanPosition[1],
    z: humanPosition[2],
  });

  const ZONE = "city";
  const pathfinding = new Pathfinding();
  const pathfindingHelper = new PathfindingHelper();
  const { nodes, materials, scene } = useGLTF(navMeshScene);
  console.log(nodes.Navmesh);
  pathfinding.setZoneData(ZONE, Pathfinding.createZone(nodes.Navmesh.geometry));
  //   const handleClick = (event) => {
  //     console.log(event.point);
  //     let groupID;
  //     let target = event.point;
  //     groupID = pathfinding.getGroup(ZONE, agentPos);
  //     const closest = pathfinding.getClosestNode(agentPos, ZONE, groupID);
  //     console.log(agentPos)
  //     navpath = pathfinding.findPath(agentPos, target, ZONE, groupID);
  //     console.log(navpath)
  //     if (navpath) {
  //       pathfindingHelper.reset();
  //       pathfindingHelper.setPlayerPosition(agentPos);
  //       pathfindingHelper.setTargetPosition(target);
  //       pathfindingHelper.setPath(navpath);
  //     }
  //   };
  const handleClick = (event) => {
    const target = event.unprojectedPoint;
    // // // // console.log(target);c

    const groupID = pathfinding.getGroup(ZONE, agentPos);

    const closest = pathfinding.getClosestNode(agentPos, ZONE, groupID);

    const newPath = pathfinding.findPath(
      closest.centroid,
      new THREE.Vector3(event.point.x, 8.03, event.point.z),
      ZONE,
      groupID
    );
    // console.log(vec3(closest));
    // console.log(target);
    // console.log(closest.centroid);
    // console.log(newPath)
    // console.log(event)
    if (newPath) {
      console.log(newPath);

      setNavpath(newPath); // Update navpath state
      pathfindingHelper.reset();
      pathfindingHelper.setPlayerPosition(agentPos);
      pathfindingHelper.setTargetPosition(target);
      pathfindingHelper.setPath(newPath);
    }
  };
  function move(delta) {
    if (!navpath || navpath.length <= 0) return;
    let targetPosition = navpath[0];
    const distance = targetPosition.clone().sub(agentPos);

    if (distance.lengthSq() > 0.05 * 0.05) {
      distance.normalize();
      agentPos.add(distance.multiplyScalar(delta * 5));
      console.log(agentPos)
    //   setPosition(agentPos);
    } else {
      setNavpath(navpath.slice(1));
      setNavpath([...navpath]); // Update navpath state
    }
  }

  useFrame((_, delta) => {
    move(delta);
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        onClick={(event) => {
          handleClick(event);
        }}
        geometry={nodes.Navmesh.geometry}
        material={nodes.Navmesh.material}
      >
        <meshPhongMaterial color="#ff0000" opacity={0.1} transparent />
      </mesh>
    </group>
  );
};

useGLTF.preload(navMeshScene);

export default NavMesh;
