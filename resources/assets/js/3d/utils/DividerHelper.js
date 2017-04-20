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
        console.log("TEXTURE IMG:", textureImg);
        this.objLoader.loadModel(name,model,textureImg,coords).then((obj3d) => {
            this.scene.add(obj3d);
        });

    }

    removeDivider(name) {
        let _objToRemove = this.scene.getObjectByName( name, true );
        this.scene.remove( _objToRemove );
    }

    updateDividerPosition(name,x,z) {
        let _obj = this.scene.getObjectByName( name, true );
        console.log("UPDATE 3D POS",name,_obj);
        if (_obj) {
            _obj.position.set( x, 0, z )
        }
    }

    updateDividerTexture(name,model,textureImg) {
        let _obj = this.scene.getObjectByName( name, true );
        console.log("UPDATE TEXTURE!!!",name,model,textureImg,_obj);
        let _coords = {
            x:_obj.position.x,
            y:_obj.position.y,
            z:_obj.position.z,
        };
        this.objLoader.loadModel(name,model,textureImg,_coords).then((obj3d) => {
            this.scene.add(obj3d);
            this.scene.remove(_obj);
        });

    }
}

