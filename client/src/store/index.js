import { proxy } from "valtio";

// const logoImages = [
//     '/logo1.png',
//     '/logo2.png',
//     '/logo3.png',
//     '/logo4.png', 
//     '/logo5.png',
//     '/logo6.png',
//     '/logo7.png',
//     '/logo8.png',
//     '/logo9.png',
//     '/logo10.png',
//     '/logo11.png',
//     '/logo12.png',
//   ];
//   const randomLogo = logoImages[Math.floor(Math.random() * logoImages.length)];


const state = proxy( {
    model: 'Shirt', // default model
    intro: true,
    color: '#0066cc',
    isLogoTexture: true,
    isFullTexture: true,
    logoDecal: './12.png ',
    fullDecal: './threejs3.png',

    decalPosition: {shirt: [0, 0.0, 0], hoodie: [0, 0.04, 0]},
    decalRotation: {shirt: [0, 0, 0], hoodie: [0, 0, 0]},
    decalScale: {shirt: 0.51, hoodie: 1},

    updateDecalProperties: (type, newPosition, newRotation, newScale) => {
        state.decalPosition[type] = newPosition;
        state.decalRotation[type] = newRotation;
        state.decalScale[type] = newScale;
    }
    
});

export default state