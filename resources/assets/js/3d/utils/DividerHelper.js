import SplitObjLoader from './splitObjLoader';
import * as THREE from 'three';

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
        if (_obj) {
            this.objLoader.changeObjectTexture(_obj,textureImg);
        }

    }


    genDrawer(type,w,l) {
        if (type ==4) {



            let backgroundCoords = {x:w/2,y:-30,z:l};
            let frontCoords = {x:w/2,y:-30,z:l};
            let backCoords = {x:w/2,y:-30,z:l};
            let sxCoords = {x:0,y:-30,z:l};
            let dxCoords = {x:w,y:-30,z:l};


            // # start loading and placing the background
            // # ugly hack ... i dont know why i need a texture at the first init
            this.objLoader.loadModel("background",'/images/3dmodels/legno/background.obj','http://homestead.app/images/textures/02_Acero.jpg',backgroundCoords).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                // # Add background to the scene
                this.scene.add(obj3d);
            });

            // # load and place the front
            this.objLoader.loadModel("front",'/images/3dmodels/legno/front.obj','http://homestead.app/images/textures/02_Acero.jpg',frontCoords).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                // # Add background to the scene
                this.scene.add(obj3d);
            });

            // # load and place the back
            this.objLoader.loadModel("back",'/images/3dmodels/legno/back.obj','http://homestead.app/images/textures/02_Acero.jpg',backCoords).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                // # Add background to the scene
                this.scene.add(obj3d);
            });

            // # load and place the back
            this.objLoader.loadModel("left",'/images/3dmodels/legno/sx.obj','http://homestead.app/images/textures/02_Acero.jpg',sxCoords).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(1,1,1);
                console.log("SX BBOX",bbox);
                // # Add background to the scene
                this.scene.add(obj3d);
            });

            // # load and place the back
            this.objLoader.loadModel("right",'/images/3dmodels/legno/dx.obj','http://homestead.app/images/textures/02_Acero.jpg',dxCoords).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(1,1,1);
                // # Add background to the scene
                this.scene.add(obj3d);
            });

        }
    }

}

