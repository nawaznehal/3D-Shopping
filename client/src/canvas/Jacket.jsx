import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/jacket.glb')

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => easing.dampC(materials.lambert1.color,
    snap.color, 0.25, delta))

    const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      scale={0.6}
    >
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial.geometry}
            material={materials.lambert1}
          >
          
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_1.geometry}
            material={materials.lambert1}
          >
          
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_2.geometry}
            material={materials.lambert1}
          >
          
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_3.geometry}
            material={materials.lambert1}
          >
          
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_4.geometry}
            material={materials.lambert1}
          >
          {snap.isFullTexture && (
            <Decal
              position={[0, 0.04,0]} //it was [0, 0,0], add option to change it from the UI of the app
              rotation={[0,0,0]}
              scale={1}
              map={fullTexture}
            />
          )}
          {snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0,0,0]}
              scale={0.17} //modify this to change the size of the logo
              // scale={0.15}
              map={logoTexture}
              anisotropy={16}
              // map-anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_5.geometry}
            material={materials.lambert1}
          >
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_6.geometry}
            material={materials.lambert1}
          >
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.defaultMaterial_7.geometry}
            material={materials.lambert1}
          >
          
        </mesh> 
    </group>
  )
}

export default Shirt
