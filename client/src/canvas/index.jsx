import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import Shirt from './Shirt'
import { useSnapshot } from 'valtio'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import state from '../store'
import Hoodie from './Hoodie'

const CanvasModel = () => {
  const snap = useSnapshot(state);
  return (
    <Canvas
      shadows
      camera={{ position: [0,0,0], fov: 22}}
      gl={{preserveDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <Environment preset='city' />
      <CameraRig>
        <Backdrop/>
        <Center>
        {snap.model === 'shirt' && <Shirt />}
        {snap.model === 'hoodie' && <Hoodie />}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
