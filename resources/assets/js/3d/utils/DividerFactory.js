import * as THREE from 'three';

// Class that creates and updates the main camera
export default class DividerFactory {
    constructor(manager,scene) {
        //Local copy of the scene
        this.scene = scene;
        //Dividers Container
        this.dividersCollection = {};

        //Init textureLoader
        this.textureLoader = new THREE.ImageLoader( manager );
        this.OBJLoader = require('three-obj-loader');
        this.OBJLoader(THREE);
        this.loader = new THREE.OBJLoader( manager );
    }

    /*
     var onProgress = function ( xhr ) {
     if ( xhr.lengthComputable ) {
     var percentComplete = xhr.loaded / xhr.total * 100;
     console.log( Math.round(percentComplete, 2) + '% downloaded' );
     }
     };

     var onError = function ( xhr ) {
     };*/

    addDivider (name,model,textureImg,coords) {

        // # Prepare texture
        let texture = new THREE.Texture();
        this.textureLoader.load( textureImg,  ( image ) => {
            texture.image = image;
            texture.needsUpdate = true;
        } );

        //Load model and add the texture
        this.loader.load( model ,  ( object )  => {

            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = texture;

                }

            } );

            object.position.x = coords.x;
            object.position.y = coords.y;
            object.position.z = coords.z;

            this.scene.add(object);
            this.dividersCollection[name]=object;
        } );
    }

    removeDivider(name) {
        // # Get object from collection by name
        let _obj = this.dividersCollection[name];

        // # Remove obj from the scene
        this.scene.remove(_obj);

        // # remove obj from collection
        //this.dividersCollection.remove(_obj);
    }
}

