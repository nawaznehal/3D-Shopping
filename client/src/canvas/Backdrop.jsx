import React, {useRef} from 'react'
import {easing} from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      rotation={[Math.PI / 2,0,0]}
      position={[0,0,-0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={2.2}
        ambient={0.25}
        position={[5,5,-10]}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={2.2}
        ambient={0.25}
        // position={[-5,5,-9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
