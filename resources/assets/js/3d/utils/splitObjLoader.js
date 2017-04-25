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


    changeObjectTexture( object, textureImg ) {
        let texture = new THREE.Texture();
        if (textureImg) {
            this.textureLoader.load( textureImg,  ( image ) => {
                texture.image = image;
                texture.needsUpdate = true;
            } );
        }
        if (textureImg) {
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material.map = texture;
                    child.castShadow=true;
                    child.receiveShadow=true;
                }
            } );
        }

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
        return new Promise( (resolve,reject) => {
            this.loader.load( model ,  ( object )  => {

                // # Apply texture only if required
                if (textureImg) {
                    object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material.map = texture;
                            child.castShadow=true;
                            child.receiveShadow=true;
                        }
                    } );
                }

                // # Change object position ( default: 0,0,0 )
                if (coords) {
                    object.position.x = coords.x;
                    object.position.y = coords.y;
                    object.position.z = coords.z;
                } else {
                    object.position.x = 0;
                    object.position.y = 0;
                    object.position.z = 0;
                }

                object.name=name;


                resolve(object)
            }, this._onProgress , this._onError);

        });
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
