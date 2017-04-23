import SplitObjLoader from './splitObjLoader';


/**
 * Factory class that help handle divider logic
 */
export default class DividerHelper {
    /**
     *
     * @param manager
     * @param scene
     */
    constructor(manager,scene) {
        //Local copy of the scene
        this.scene = scene;
        //Dividers Container
        this.objLoader = new SplitObjLoader(manager);
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

    /**
     * Remove an object from the scene
     * @param name
     */
    removeDivider(name) {
        let _objToRemove = this.scene.getObjectByName( name, true );

        if (_objToRemove) {
            this.scene.remove( _objToRemove );
        }
    }

    /**
     * Change a divider Position
     * @param name
     * @param x
     * @param z
     */
    updateDividerPosition(name,x,z) {
        let _obj = this.scene.getObjectByName( name, true );

        if (_obj) {

            _obj.translateX (x - _obj.position.x);
            _obj.translateZ (z - _obj.position.z);

        }


    }

    /**
     * Update Divider texture.
     *
     * @param name
     * @param textureImg
     */
    updateDividerTexture(name, textureImg) {

        let _obj = this.scene.getObjectByName( name, true );

        this.objLoader.changeObjectTexture(_obj,textureImg);

    }
}

