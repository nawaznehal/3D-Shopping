import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion'
import state from '../store'
import { CustomButton } from '../components'
import ModelCanvas from '../canvas/ModelCanvas';
import ModelSelector from '../components/ModelSelector';
import { Canvas } from '@react-three/fiber'
// import { Canvas } from '@react-three/fiber';
// import ModelCanvas from '../canvas/ModelCanvas';
// import ModelSelector from '../components/ModelSelector';


const Home = () => {
    const snap = useSnapshot(state);
  return (
    
    <AnimatePresence>
        {snap.intro && (
            <motion.section className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
                <img 
                    src='./threejs.png'
                    alt='logo'
                    className='w-8 h-8 object-contain'
                />
            </motion.header>
            <motion.div className='home-content' {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                    <h1 className='head-text' >
                    DESIGN<br className='xl:block hidden' />BOLDLY
                    </h1>
                    
                </motion.div>
                <motion.div {...headContentAnimation}>
                    <p className='max-w-md font-normal text-gray-600 text-base'>
                        Nawaz Designs Visualizes <strong>a unique  
                        way</strong>{' '} of shooping your favorite shirt, fully customizable
                        and upgradable in 3D.
                    </p>
                    <motion.div {...headContentAnimation}>
                    <p className='max-w-md font-normal text-gray-600 text-base'>
                        <strong>YOU DESIGN WHAT YOU WANT TO WEAR.</strong>{' '} choose between variety of models, colors and sizes!
                    </p>
                    </motion.div>
                    <CustomButton
                        type='filled'
                        title='Start Designing'
                        handleClick={()=> state.intro = false}
                        customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                    />

                </motion.div>

            </motion.div>

           
            </motion.section>
        )}
    </AnimatePresence>
    
  )
}

export default Home
