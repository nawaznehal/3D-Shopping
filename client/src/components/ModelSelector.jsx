// components/ModelSelector.jsx
import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';


const ModelSelector = () => {
  const snap = useSnapshot(state);

  const handleChange = (e) => {
    state.model = e.target.value;
    console.log("Model changed to:", state.model);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <select
        value={snap.model}
        onChange={handleChange}
        className="px-3 py-2 bg-white text-black rounded-md shadow-md"
      >
        <option value="Shirt">Shirt</option>
        <option value="Hoodie">Hoodie</option>
      
      </select>
    </div>
  );
};

export default ModelSelector;
