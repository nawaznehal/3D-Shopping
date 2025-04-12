import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Hoodie = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/NewHoodie.glb')

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color,
    snap.color, 0.25, delta))

    const stateString = JSON.stringify(snap);
    console.log("Hoodie component loaded");
    console.log(nodes); // Log the structure to see actual names

  return (
    <group
      key={stateString}
    >
        <mesh 
        castShadow
        geometry={nodes.Hoodie_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        scale={0.75}
        
        >
          {snap.isFullTexture && (
                      <Decal
                        position={snap.decalPosition.shirt} //it was [0, 0,0], add option to change it from the UI of the app
                        rotation={snap.decalRotation.shirt}
                        scale={snap.decalScale.shirt}
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
