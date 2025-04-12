import React, {useState, useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download, logoShirt, stylishShirt } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import ModelCanvas from '../canvas/ModelCanvas';
import ModelSelector from '../components/ModelSelector';
import { Canvas } from '@react-three/fiber';
import DecalControl from '../components/DecalControl';

const Customizer = () => {
  const snap = useSnapshot(state);
  // const [selectedModel, setSelectedModel] = useState(snap.model);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("decalcontrol");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt:false
  })

  //show tab contents depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'decalcontrol':
        return <DecalControl />;
      case 'colorpicker':
        return <ColorPicker/>
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
        case 'aipicker':
        return <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
        />
    
      default:
        return null;
    }

  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");
    try {
      // call bnackend to generate AI
      setGeneratingImg(true);
      
      const response = await fetch('https://threejs-mod.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      });


      // 'http://localhost:8080/api/v1/dalle'

      // const data = await response.json();

      // handleDecals(type, `data:image/png;base64,${data.photo}`)


      // if (response.ok) {
      //   const data = await response.json();
      //   handleDecals(type, `data:image/png;base64,${data.photo}`);
      // } else {
      //   // Handle non-OK responses (e.g., 404) here
      //   alert("Error: Unable to fetch data from the server");
      // }
      if (response.ok) {
        const data = await response.json();
        handleDecals(type, `data:image/png;base64,${data.photo}`);
    } else {
        if (response.status === 404) {
            alert("Error: Resource not found");
        } else if (response.status === 500) {
            alert("Error: Internal server error");
        } else {
            alert("Error: Unable to fetch data from the server");
        }
    }
    

    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  const handleDecals = (type, result) => {

    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
    
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }
    //  after setting the state, set activeFilterTab to update UI 
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }
  const readFile = (type) => {
    reader(file)
    .then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    })
  }

//  const handlePositionChange = (type, newPosition) => {
    
//     state.updateDecalProperties(type, newPosition, state.decalRotation[type], state.decalScale[type]);
//   }
//   const handleRotationChange = (type, newRotation) => {
//     state.updateDecalProperties(type, state.decalPosition[type], newRotation, state.decalScale[type]);
//   }
//   const handleScaleChange = (type, newScale) => {
//     state.updateDecalProperties(type, state.decalPosition[type], state.decalRotation[type], newScale);
//   }
  return (
    <>
    <ModelSelector/>
    <Canvas>
    
    <ModelCanvas/>
    </Canvas>
    
    <AnimatePresence>
      {!snap.intro && (
        <>
        
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name} 
                    tab={tab} 
                    handleClick={() => setActiveEditorTab(tab.name)} 
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <ModelSelector/>
          {/* <ModelCanvas /> */}
          
          <motion.div className='absolute z-10 top-5 right-5' 
            {...fadeAnimation}
          >
             <CustomButton
             type='filled'
             title='Go Back'
             handleClick={() => state.intro = true}
             customStyles='w-fit px-4 py-2.5 font-bold text-sm'
             />
          </motion.div>
          <motion.div 
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab 
                key={tab.name} 
                tab={tab} 
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)} 
              />
            ))}

          </motion.div>
          {/* <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md">
            <select
              value={snap.model} // The model currently selected
              onChange={handleModelChange} // Updates model in state
              className="p-2 border rounded"
            >
              <option value="">Select a model</option>
              <option value="shirt">Shirt</option>
              <option value="hoodie">Hoodie</option>
            </select>
          </div> */}

        </>
      )}
    </AnimatePresence>
    </>
  );
};

export default Customizer;
