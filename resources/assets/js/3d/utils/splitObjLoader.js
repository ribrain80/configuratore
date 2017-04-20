import * as THREE from 'three';

export default class SplitObjLoader {
    constructor(manager) {
        this.manager = manager;
        //Init textureLoader
        this.textureLoader = new THREE.ImageLoader( manager );
        this.OBJLoader = require('three-obj-loader');
        this.OBJLoader(THREE);
        this.loader = new THREE.OBJLoader( manager );
    }

    /**
     *
     * @param name name of the object
     * @param model vawefront obj model url
     * @param textureImg img texture url
     * @param coords 3dObject coords
     */
    loadModel(name,model,textureImg,coords) {
        let texture = new THREE.Texture();

        // # Load img for texture only if required!
        if (textureImg) {
            this.textureLoader.load( textureImg,  ( image ) => {
                texture.image = image;
                texture.needsUpdate = true;
            } );
        }

        //Load model then  add the texture and coords if required

        //let promise = new Promise

         this.loader.load( model ,  ( object )  => {

            // # Apply texture only if required
            if (textureImg) {
                object.traverse( function ( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material.map = texture;
                    }
                } );
            }

            // # Change object position ( default: 0,0,0 )
            if (coords) {
                object.position.x = coords.x;
                object.position.y = coords.y;
                object.position.z = coords.z;
            }
            console.log("IN LOADER LOAD FUNCTION MODEL:",object);

            return object;
        }, this._onProgress , this._onError);



    }

     _onProgress  ( xhr ) {
     if ( xhr.lengthComputable ) {
         let percentComplete = xhr.loaded / xhr.total * 100;
         console.log( Math.round(percentComplete) + '% downloaded' );
     }
     };

     _onError  ( xhr ) {
         // # todo nop for now
     };
}
