import { useSnapshot } from 'valtio';
import state from '../store';
import Shirt from './Shirt';
import Hoodie from './Hoodie';
import { useEffect } from 'react';

const ModelCanvas = () => {
  const snap = useSnapshot(state);
  // console.log("Currently selected model:", snap.model);
  useEffect(() => {
    console.log("Currently selected model:", snap.model);
  }, [snap.model]); // This will log only when the model changes


  return (
    <>
    {snap.model === 'shirt' && <Shirt key="shirt" />}
    {snap.model === 'hoodie' && <Hoodie key="hoodie" />}
  </>
  );
};

export default ModelCanvas;

