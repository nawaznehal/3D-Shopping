import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import CustomButton from './CustomButton';
import state from '../store';

const DecalControl = () => {
  const snap = useSnapshot(state);

  // State for controlling position, rotation, and scale
  const [position, setPosition] = useState(snap.decalPosition.shirt);
  const [rotation, setRotation] = useState(snap.decalRotation.shirt);
  const [scale, setScale] = useState(snap.decalScale.shirt);

  // Update the decal properties in the state
  const handlePositionChange = (newPosition) => {
    state.updateDecalProperties('shirt', newPosition, rotation, scale);
    setPosition(newPosition);
  };

  const handleRotationChange = (newRotation) => {
    state.updateDecalProperties('shirt', position, newRotation, scale);
    setRotation(newRotation);
  };

  const handleScaleChange = (newScale) => {
    state.updateDecalProperties('shirt', position, rotation, newScale);
    setScale(newScale);
  };

  return (
    <div className="decal-control-container">
    <div className='flex-1 flex flex-col'>
      <h2>Shirt Decal Control</h2>
      
      {/* Position Controls */}
      <div className="control-group">
        <label>Position</label>
        <div>
          <input
            type="number"
            value={position[0]}
            onChange={(e) => handlePositionChange([parseFloat(e.target.value), position[1], position[2]])}
          />
          <input
            type="number"
            value={position[1]}
            onChange={(e) => handlePositionChange([position[0], parseFloat(e.target.value), position[2]])}
          />
          <input
            type="number"
            value={position[2]}
            onChange={(e) => handlePositionChange([position[0], position[1], parseFloat(e.target.value)])}
          />
        </div>
        
      </div>

      {/* Rotation Controls */}
      <div className="control-group">
        <label>Rotation (degrees)</label>
        <div>
          <input
            type="number"
            value={(rotation[0] * 180) / Math.PI}  // Convert from radians to degrees
            onChange={(e) => handleRotationChange([parseFloat(e.target.value) * (Math.PI / 180), rotation[1], rotation[2]])}
          />
          <input
            type="number"
            value={(rotation[1] * 180) / Math.PI}
            onChange={(e) => handleRotationChange([rotation[0], parseFloat(e.target.value) * (Math.PI / 180), rotation[2]])}
          />
          <input
            type="number"
            value={(rotation[2] * 180) / Math.PI}
            onChange={(e) => handleRotationChange([rotation[0], rotation[1], parseFloat(e.target.value) * (Math.PI / 180)])}
          />
        </div>
      </div>

      {/* Scale Controls */}
      <div className="control-group">
        <label>Scale</label>
        <div>
          <input
            type="number"
            step="0.01"
            value={scale}
            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <CustomButton 
          type="outline"
          title="Reset"
          handleClick={() => {
            handlePositionChange([0, 0.04, 0.15]);
            handleRotationChange([0, 0, 0]);
            handleScaleChange(0.17);
          }}
          customStyles="text-xs"
        />
      </div>
      </div>
      
    </div>
  );
};

export default DecalControl;
