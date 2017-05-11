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
        this.defaultMaterial = "/images/3dmodels/material/base.png";
        this.currentBridgesMaterial = "/images/3dmodels/material/base.png";
        this.commonBackgroundObj = "/images/3dmodels/common/background.obj";
        this.commonFrontObj = "/images/3dmodels/common/front.obj";
        this.bridge600x255 = "/images/3dmodels/bridges/255x600.obj";
        this.bridge600x48 = "/images/3dmodels/bridges/48x600.obj";
        this.bridge1200x255 = "/images/3dmodels/bridges/255x1200.obj";
        this.bridge1200x48 = "/images/3dmodels/bridges/48x1200.ob";
        this.bridgeWidth = 107;

        //Dividers Container
        this.objLoader = new SplitObjLoader(manager);
        this.drawer = new THREE.Object3D();
        this.bridges = new THREE.Object3D();
        this.scene.add(this.drawer);
        this.scene.add(this.bridges);
    }

    /**
     *
     * @param w
     * @param bh
     * @param sh
     * @param orr
     * @param texture
     */
    addBridgeV ( w, bh, sh) {

        // # Obj selection
        let _model = '';
        let _h = (sh)?45.5:90;
        let _scalefactor = 1;
        w = parseFloat(w);
        if (w>600) {
            if (bh==25.5) {_model=this.bridge1200x255;}
            if (bh==48) {_model=this.bridge1200x48;}
            _scalefactor = Math.abs( w / 1200 );
        } else {
            if (bh==25.5) {_model=this.bridge600x255;}
            if (bh==48) {_model=this.bridge600x48;}
            _scalefactor = Math.abs( w / 600 );
        }
        let _name = "TMP-BR-NAME"; // @todo: trovare una logica semplice

        this.objLoader.loadModel(_name,_model,this.currentBridgesMaterial).then((obj3d) => {

            obj3d.scale.set(1,1,_scalefactor);
            obj3d.updateMatrix();

            obj3d.castShadow = true;
            obj3d.receiveShadow = true;

            obj3d.position.y= _h;
            obj3d.position.z= w/2;
            obj3d.position.x= this.bridgeWidth/2;


            obj3d.updateMatrix();

            this.bridges.add(obj3d);
        });
    }

    updateBridgesTexture(textureImg) {

        // Update di currentBridgeMaterial
        this.currentBridgesMaterial = textureImg;

        // Apply all

        _.forEach(this.bridges.children, (cur) => {
            this.objLoader.changeObjectTexture(cur,textureImg);
        });


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
            obj3d.receiveShadow = true;

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
        console.log(front,back,left,right);
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
    addSupport(side,w,l,h,texture) {
        let support  = this.objLoader.addSupport(side,w,l,h,texture);
        this.drawer.add(support);
    }


    genDrawer(type,w,l,h) {

        if (!type) {
            return;
        }

        h = parseFloat(h);
        l = parseFloat(l);
        w = parseFloat(w);

        //# Lineabox 3 and 4 sides behave in the same way

        type = (type==1)?2:type;

        // # This value correct the divider offset
        let zDeltaCorrection = -12;
        let yDeltaCorrection = -35;

        // All Drawer types share the same background Object
        this.objLoader.loadModel("background",this.commonBackgroundObj,this.defaultMaterial).then((obj3d) => {
            // # Change background dimension
            let bbox = new THREE.Box3().setFromObject( obj3d );
            obj3d.scale.set(Math.abs(w / (bbox.max.x - bbox.min.x)),1,Math.abs(l / (bbox.max.z - bbox.min.z)));
            obj3d.updateMatrix();
            obj3d.position.x = w/2;
            obj3d.position.y = 0;
            obj3d.position.z = l/2 + zDeltaCorrection;
            obj3d.updateMatrix();
            // # Shadow
            obj3d.castShadow = true;
            obj3d.receiveShadow = true;
            // # Add background to the scene
            this.drawer.add(obj3d);
        });

        // All drawer types share the same front Object
        // Element width: 20
        // Element base h:
        this.objLoader.loadModel("front",this.commonFrontObj,this.defaultMaterial).then((obj3d) => {
            // # Change background dimension
            //let bbox = new THREE.Box3().setFromObject( obj3d );
            let elementZ = 20;  //bbox.max.z - bbox.min.z;
            let elementH = 150; //bbox.max.y - bbox.min.y;
            let elementW = 660; //bbox.max.x - bbox.min.x;
            let extendedW = w + 4*elementZ;
            let extendedH = h - yDeltaCorrection +50;
            let coeffH = extendedH / elementH;
            let coeffW = extendedW / elementW;
            obj3d.scale.set(coeffW,coeffH,1);
            obj3d.updateMatrix();
            obj3d.position.x = w/2;
            obj3d.position.y = yDeltaCorrection;
            obj3d.position.z = zDeltaCorrection - elementZ/2 ;
            obj3d.updateMatrix();
            // # Shadow
            obj3d.castShadow = true;
            obj3d.receiveShadow = true;
            // # Add background to the scene
            this.drawer.add(obj3d);

            console.log("Drawer - added front element");
        });

        if (type == 4) {
            // # DrawerType = 4 @todo: Calcolare H
            this.objLoader.loadModel("back",'/images/3dmodels/legno/back.obj',this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                //let bbox = new THREE.Box3().setFromObject( obj3d );

                let elementZS = 20;  //bbox.max.z - bbox.min.z della sponda laterale
                let elementZ = 18;  //bbox.max.z - bbox.min.z della sponda laterale
                let elementH = 150; //bbox.max.y - bbox.min.y;
                let elementW = 600; // (bbox.max.x - bbox.min.x)
                let extendedW = w + 2 * elementZS;  // 2 volte lo spessore della sponda
                let extendedH = h + elementZ - yDeltaCorrection;  // yDeltaCorrection è negativo
                let coeffW = extendedW / elementW;
                let coeffH = extendedH / elementH;

                obj3d.scale.set(coeffW,coeffH,1);
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l -2;   // Correction for model error
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("left",'/images/3dmodels/legno/side.obj',this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let elementL = 500; //(bbox.max.z - bbox.min.z);
                let elementH = 120; //(bbox.max.y - bbox.min.y);
                let elementZ = 18;  //(bbox.max.x - bbox.min.x);


                let extendedH = h - 8  - yDeltaCorrection;  // yDeltaCorrection è negativo il secondo termine è empirico
                let coeffH = extendedH / (bbox.max.y - bbox.min.y);
                let coeffL = l / elementL;

                obj3d.scale.set(1,coeffH,coeffL);
                obj3d.updateMatrix();
                obj3d.position.x = -elementZ/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l/2 + zDeltaCorrection;
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("right",'/images/3dmodels/legno/side.obj',this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let elementL = 500; //(bbox.max.z - bbox.min.z);
                let elementH = 120; //(bbox.max.y - bbox.min.y);
                let elementZ = 18;  //(bbox.max.x - bbox.min.x);


                let extendedH = h - 8  - yDeltaCorrection;  // yDeltaCorrection è negativo il secondo termine è empirico
                let coeffH = extendedH / (bbox.max.y - bbox.min.y);
                let coeffL = l / elementL;

                obj3d.scale.set(1,coeffH,coeffL);
                obj3d.updateMatrix();
                obj3d.position.x = w + elementZ/2;
                obj3d.position.y = yDeltaCorrection;
                obj3d.position.z = l/2 + zDeltaCorrection;
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

        } else {
            h = parseFloat(h);
            let backModel = false;
            let sideModel = false;
            let _backPath = (type==3)?"plain":"withsupport";
            switch (h) {
                case 45.5:
                    // # SPONDA BASSA
                    sideModel = '/images/3dmodels/lineabox/sides/low.obj';
                    backModel = '/images/3dmodels/lineabox/backs/'+_backPath+'/low.obj';
                    break;
                case 72:
                    // # SPONDA MEDIA
                    sideModel = '/images/3dmodels/lineabox/sides/medium.obj';
                    backModel = '/images/3dmodels/lineabox/backs/'+_backPath+'/medium.obj';
                    break;
                case 148.0:
                    sideModel = '/images/3dmodels/lineabox/sides/high.obj';
                    backModel = '/images/3dmodels/lineabox/backs/'+_backPath+'/high.obj';
                    break;
            }

            this.objLoader.loadModel("back",backModel,this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let elementW  =  bbox.max.x - bbox.min.x;
                let elementZS = 15.6;
                let extendedW = w + 2 * elementZS;  // 2 volte lo spessore della sponda
                let coeffW = extendedW / elementW;

                obj3d.scale.set(coeffW,1,1);
                obj3d.updateMatrix();
                obj3d.position.x = w/2;
                obj3d.position.y = 0;
                obj3d.position.z = l ;
                obj3d.updateMatrix();
                obj3d.rotateY(Math.PI);
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("left",sideModel,this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let elementZ = (bbox.max.x - bbox.min.x);

                obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                obj3d.updateMatrix();
                obj3d.position.x = -elementZ/2;
                obj3d.position.y = 0;
                obj3d.position.z = l/2 + zDeltaCorrection;
                obj3d.updateMatrix();
                obj3d.rotateY(Math.PI);
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });

            this.objLoader.loadModel("right",sideModel,this.defaultMaterial).then((obj3d) => {
                // # Change background dimension
                let bbox = new THREE.Box3().setFromObject( obj3d );
                let elementZ = (bbox.max.x - bbox.min.x);
                console.log("ELEMENT Z RIGHT:",elementZ);
                obj3d.scale.set(1,1,Math.abs(l / (bbox.max.z - bbox.min.z)));
                obj3d.updateMatrix();
                obj3d.position.x = w + elementZ/2;
                obj3d.position.y = 0;
                obj3d.position.z = l/2 + zDeltaCorrection;
                obj3d.updateMatrix();
                // # Shadow
                obj3d.castShadow = true;
                obj3d.receiveShadow = true;
                // # Add background to the scene
                this.drawer.add(obj3d);
            });
        }
    }

}

