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
        this.drawer = new THREE.Object3D();
        this.scene.add(this.drawer);
    }

    /**
     * Add an obj to the scene
     * @param name
     * @param model
     * @param textureImg
     * @param orr
     * @param coords
     */
    addDivider (name,model,textureImg,coords,orr) {

        this.objLoader.loadModel(name,model,textureImg).then((obj3d) => {
            if (orr) {
                obj3d.rotateY(Math.PI/2);
                obj3d.updateMatrix();
            }
            if (coords) {
                obj3d.position.x=coords.x;
                obj3d.position.y=coords.y;
                obj3d.position.z=coords.z;
                obj3d.updateMatrix();
            }
            obj3d.castShadow = true;
            obj3d.receiveShadow = false;

            this.drawer.add(obj3d);
        });

    }

    /**
     * Remove an object from the scene
     * @param name
     */
    removeDivider(name) {
        let _objToRemove = this.drawer.getObjectByName( name, true );

        if (_objToRemove) {
            this.drawer.remove( _objToRemove );
        }
    }


    /**
     * Change a divider Position
     * @param name
     * @param x
     * @param z
     */
    updateDividerPosition(name,x,z) {
        let _obj = this.drawer.getObjectByName( name, true );

        let deltacorrection = -10;

        if (_obj) {

            /*_obj.translateX (x - _obj.position.x);
            _obj.translateZ (z - _obj.position.z);*/
            _obj.position.x = x;
            _obj.position.z = z + deltacorrection;

        }


    }

    /**
     * Update Divider texture.
     *
     * @param name
     * @param textureImg
     */
    updateDividerTexture(name, textureImg) {

        let _obj = this.drawer.getObjectByName( name, true );
        if (_obj) {
            this.objLoader.changeObjectTexture(_obj,textureImg);
        }

    }


    updateSupportsTexture(textureImg) {
        let front = this.drawer.getObjectByName( 'SP_front', true );
        let back = this.drawer.getObjectByName( 'SP_back', true );
        let left = this.drawer.getObjectByName( 'SP_left', true );
        let right = this.drawer.getObjectByName( 'SP_right', true );
        if (front) {this.objLoader.changeObjectTexture(front,textureImg);}
        if (back) {this.objLoader.changeObjectTexture(back,textureImg);}
        if (left) {this.objLoader.changeObjectTexture(left,textureImg);}
        if (right) {this.objLoader.changeObjectTexture(right,textureImg);}
    }

    /**
     * Add a support on a side
     * Just wrap the objectLoader function
     * @param side string values: left,right,back,front
     * @param w width/lenght of the support
     * @param w height of the support
     * @param texture support material
     */
    addSupport(side,w,h,texture) {
        this.scene.add(this.objLoader.addSupport(side,w,h,texture));
    }


    genDrawer(type,w,l,h) {

        if (!type) {
            return;
        }

        let zDeltaCorrection = -21;
        let yDeltaCorrection = -35;
        //let drawer = false;
        if (type ==4) {
            let backgroundCoords = {x:w/2,y:-30,z:l};
            let sxCoords = {x:0,y:-30,z:l};
            let dxCoords = {x:w,y:-30,z:l};

            // # start loading and placing the background
            // # ugly hack ... i dont know why i need a texture at the first init
            this.objLoader.loadModel("background",'/images/3dmodels/legno/background.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l + zDeltaCorrection;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });


            this.objLoader.loadModel("back",'/images/3dmodels/legno/back.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l ;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });


            this.objLoader.loadModel("front",'/images/3dmodels/legno/front.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = zDeltaCorrection ;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("left",'/images/3dmodels/legno/sx.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                obj3d.updateMatrix();
                obj3d.position.x = 0;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l/2 ;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("right",'/images/3dmodels/legno/dx.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                obj3d.updateMatrix();
                obj3d.position.x = w;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l/2 ;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });



        } else {
            // # Empiric z correction
            zDeltaCorrection = -10;
            // # Here the lineabox Drawers
            // # switch depending on h
            let backgroundModel = false;
            let dxModel = false;
            let sxModel = false;
            let backModel = false;
            console.log("H in switch: ",h);
            h = parseFloat(h);
            switch (h) {
                case 45.5:
                    console.log("QUIIIII");
                    // # SPONDA BASSA
                    backgroundModel = '/images/3dmodels/lineabox/basso/' + type + '/background.obj';
                    dxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    sxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    backModel = '/images/3dmodels/lineabox/alto/' + type + '/back.obj';
                    break;
                case 72:
                    // # SPONDA MEDIA
                    backgroundModel = '/images/3dmodels/lineabox/medio/' + type + '/background.obj';
                    dxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    sxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    backModel = '/images/3dmodels/lineabox/alto/' + type + '/back.obj';
                    break;
                case 148.0:
                    backgroundModel = '/images/3dmodels/lineabox/alto/' + type + '/background.obj';
                    dxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    sxModel = '/images/3dmodels/lineabox/alto/' + type + '/dx.obj';
                    backModel = '/images/3dmodels/lineabox/alto/' + type + '/back.obj';
                    break;
            }

            if (backgroundModel) {
                this.objLoader.loadModel("background",backgroundModel,'/images/textures/02_Acero.jpg').then((obj3d) => {
                    // # Change background dimension
                    let bbox = new THREE.Box3().setFromObject( obj3d );
                    obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                    console.log("BBOX MAX Y",Math.abs(bbox.max.y));
                    let extraYCorrection = (type==2)?-60:0;
                    obj3d.updateMatrix();
                    obj3d.position.x = 0;
                    obj3d.position.y = Math.abs(bbox.max.y) + extraYCorrection;
                    obj3d.position.z = l + zDeltaCorrection;
                    obj3d.updateMatrix();
                    // # Add background to the scene
                    this.drawer.add(obj3d);
                });
            }

            if (dxModel) {
                this.objLoader.loadModel("right",dxModel,'/images/textures/02_Acero.jpg').then((obj3d) => {
                   let bbox = new THREE.Box3().setFromObject( obj3d );
                    obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                    obj3d.updateMatrix();
                    obj3d.position.x = w;
                    obj3d.position.y = 0;
                    obj3d.position.z = l/2 ;
                    obj3d.updateMatrix();
                    // # Add background to the scene
                    this.drawer.add(obj3d);
                });
            }

            if (sxModel) {
                this.objLoader.loadModel("left",sxModel,'/images/textures/02_Acero.jpg').then((obj3d) => {
                    let bbox = new THREE.Box3().setFromObject( obj3d );
                    obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                    obj3d.updateMatrix();
                    obj3d.position.x = 0;
                    obj3d.position.y = 0;
                    obj3d.position.z = l/2 ;
                    obj3d.updateMatrix();
                    obj3d.rotateY(Math.PI);
                    obj3d.updateMatrix();
                    // # Add background to the scene
                    this.drawer.add(obj3d);
                });
            }

            if (backModel) {
                this.objLoader.loadModel("back",backModel,'/images/textures/02_Acero.jpg').then((obj3d) => {
                    // # Change background dimension
                    let bbox = new THREE.Box3().setFromObject( obj3d );
                    obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                    obj3d.updateMatrix();
                    obj3d.position.x = w/2;
                    obj3d.position.y = 0;
                    obj3d.position.z = l ;
                    obj3d.updateMatrix();
                    // # Add background to the scene
                    this.drawer.add(obj3d);
                });
            }

            // Rimosso in attesa di modello !!!!!

            this.objLoader.loadModel("front",'/images/3dmodels/legno/front.obj','/images/textures/02_Acero.jpg').then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let zDeltaCorrection = -21;
                let yDeltaCorrection = -35;
                obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,1);
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = zDeltaCorrection ;
                obj3d.updateMatrix();
                // # Add background to the scene
                this.drawer.add(obj3d);
            });


        }
    }

}

