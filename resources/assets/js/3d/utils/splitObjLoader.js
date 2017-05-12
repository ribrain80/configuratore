import * as THREE from 'three';
import Config from '../config';

export default class SplitObjLoader {
    constructor(manager) {
        this.manager = manager;
        //Init textureLoader
        this.textureLoader = new THREE.ImageLoader( manager );
        this.OBJLoader = require('three-obj-loader');
        this.OBJLoader(THREE);
        this.loader = new THREE.OBJLoader( manager );
    }


    changeObjectTexture( object, textureImg, transparent ) {
        let t = false;
        let opacity = 1;
        if (transparent) {
            opacity=0.6;
            t = true;
        }
        console.log("Texture IMG on CHANGE:",textureImg);
        let texture = new THREE.Texture();
        let material = new THREE.MeshPhongMaterial(  );
        // # Load img for texture only if required!
        if (textureImg) {
            this.textureLoader.load( textureImg,  ( image ) => {
                texture.image = image;
                texture.anisotropy= Config.maxAnisotropy;
                
                texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                texture.repeat.set(2 ,2);
                
                texture.needsUpdate = true;
            } );
            material = new THREE.MeshPhongMaterial( { map: texture , overdraw: 0.5,  side: THREE.DoubleSide, transparent: t, opacity: opacity} );
            material.needsUpdate=true;
        }
        if (textureImg) {
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    child.material = material;
                    //child.material.transparent = false;
                    child.castShadow=true;
                    child.receiveShadow=true;
                }
            } );
        }

    }


    /**
     * Add a support on a side
     * @param side string values: left,right,back,front
     * @param w width/lenght of the support
     * @param w height of the support
     * @param texture support material
     */
    addSupport(side,w,l,h,textureImg) {
        w = parseFloat(w);
        h = parseFloat(h);
        let yDeltaCorrection = (h==90)?40:20;

        let zDeltaCorrection = -12;
        let hDeltaCorrection = 8;

        let supportWidth = 6;
        let supportNamePrefix= "SP_";
        let baseGeometry = new THREE.BoxGeometry(w, (h + hDeltaCorrection), supportWidth);
        let texture = new THREE.Texture();
        let material = new THREE.MeshPhongMaterial(  );
        // # Load img for texture only if required!
        if (textureImg) {
            this.textureLoader.load(textureImg, (image) => {
                texture.image = image;
                texture.anisotropy= Config.maxAnisotropy;
                texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                texture.repeat.set(2 ,2);
                texture.needsUpdate = true;
            });
            material = new THREE.MeshPhongMaterial({map: texture, overdraw: 0.75});
            material.needsUpdate = true;
        }
        let support = new THREE.Mesh(baseGeometry, material);
        support.name = supportNamePrefix+side;
        console.log("NOME SUPPORTO INSERITO :",support.name);

        //Gestione SIDE


        switch (side) {
            case "left":
                support.rotateY(Math.PI/2);
                support.updateMatrix();
                support.position.x = supportWidth/2;
                support.position.y = yDeltaCorrection;
                support.position.z = w/2 + zDeltaCorrection;
                support.updateMatrix();
                break;
            case "right":
                support.rotateY(Math.PI/2);
                support.updateMatrix();
                support.position.x = l-supportWidth/2;
                support.position.y = yDeltaCorrection;
                support.position.z = w/2 + zDeltaCorrection;
                support.updateMatrix();
                break;
            case "front":
                support.position.x = w/2;
                support.position.y =  yDeltaCorrection;
                support.position.z = zDeltaCorrection;
                support.updateMatrix();
                break;
            case "back":
                support.position.x = w/2;
                support.position.y = yDeltaCorrection;
                support.position.z = l + zDeltaCorrection;
                break;
        }



        return support;

    }



    /**
     *
     * @param name name of the object
     * @param model vawefront obj model url
     * @param textureImg img texture url
     * @param coords 3dObject coords
     */
    loadModel(name,model,textureImg,coords,transparent) {
        let t = false;
        let opacity = 1;
        if (transparent) {
            opacity=0.6;
            t = true;
        }
        let texture = new THREE.Texture();
        let material = new THREE.MeshPhongMaterial(  );
        // # Load img for texture only if required!
        if (textureImg) {
            this.textureLoader.load( textureImg,  ( image ) => {
                texture.image = image;
                texture.anisotropy= Config.maxAnisotropy;
                texture.needsUpdate = true;
                
                texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                texture.repeat.set(2 ,2);
            } );
            material = new THREE.MeshPhongMaterial( { map: texture , overdraw: 0.5,  side: THREE.DoubleSide, transparent: t, opacity: opacity} );
            material.needsUpdate=true;




        }

        //Load model then  add the texture and coords if required
        return new Promise( (resolve,reject) => {
            this.loader.load( model ,  ( object )  => {

                // # Apply texture only if required
                if (textureImg) {
                    object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            child.material = material;
                           // child.material.transparent = false;
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
