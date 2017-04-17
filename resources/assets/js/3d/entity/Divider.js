import * as THREE from 'three';

// Class that creates and updates the main camera
export default class Divider {
    constructor(manager,scene,model,textureImg) {
        let texture = new THREE.Texture();
        //Init textureLoader
        let textureLoader = new THREE.ImageLoader( manager );
        textureLoader.load( textureImg,  ( image ) => {
            texture.image = image;
            texture.needsUpdate = true;

        } );

        //Import ObjLoader
        this.OBJLoader = require('three-obj-loader');
        this.OBJLoader(THREE);

        let  loader = new THREE.OBJLoader( manager );
        //Load model and add the texture
        loader.load( model ,  ( object )  => {

            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    child.material.map = texture;

                }

            } );

            //@Todo: Set it well
            object.position.y = - 95;

            //Right now it directly add the object to the scene, next step just return the the model+texture
            scene.add( object );

        } );
    }
}

