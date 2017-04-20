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

        this.objLoader.loadModel(name,model,textureImg,coords).then((obj3d) => {
            console.log("PROMISE RESOLVED",obj3d);
            this.scene.add(obj3d);
        });

    }

    removeDivider(name) {

    }
}

