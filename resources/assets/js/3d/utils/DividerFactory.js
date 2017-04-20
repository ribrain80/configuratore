import SpliObjLoader from './splitObjLoader';


/**
 * Factory class that help handle divider logic
 */
export default class DividerFactory {
    /**
     *
     * @param manager
     * @param scene
     */
    constructor(manager,scene) {
        //Local copy of the scene
        this.scene = scene;
        //Dividers Container
        this.objLoader = new SpliObjLoader(manager);
    }

    /**
     * Add an obj to the scene
     * @param name
     * @param model
     * @param textureImg
     * @param coords
     */
    addDivider (name,model,textureImg,coords) {

        this.objLoader.loadModel(name,model,textureImg,coords).then((obj3d) => {
            this.scene.add(obj3d);
        });

    }

    removeDivider(name) {
        let _objToRemove = this.scene.getObjectByName( name );
        console.log("REMOVING: ",_objToRemove);
        this.scene.remove( _objToRemove );
    }
}

