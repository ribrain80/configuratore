import * as THREE from 'three';
import SpliObjLoader from './splitObjLoader';

// Class that creates and updates the main camera
export default class DividerFactory {
    constructor(manager,scene) {
        //Local copy of the scene
        this.scene = scene;
        //Dividers Container
        this.objLoader = new SpliObjLoader(manager);
    }



    addDivider (name,model,textureImg,coords) {

        let _divider = this.objLoader.loadModel(name,model,textureImg,coords);

        console.log('LOADED MODEL:',_divider);
       // this.scene.add(_divider);
    }

    removeDivider(name) {

    }
}

