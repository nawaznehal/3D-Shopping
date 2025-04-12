import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Hoodie = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/hoodie.glb')

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color,
    snap.color, 0.25, delta))

    const stateString = JSON.stringify(snap);
    console.log("Hoodie component loaded");
  return (
    <group
      key={stateString}
    >
        <mesh 
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={0.75}
        
        >
          {snap.isFullTexture && (
            <Decal
              position={[0, 0,0]}
              rotation={[0,0,0]}
              scale={1}
              map={fullTexture}
            />
          )}
          {snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0,0,0]}
              scale={0.15}
              map={logoTexture}
              anisotropy={16}
              // map-anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh> 
    </group>
  )
}
console.log("Hoodie component loaded");

export default Hoodie
