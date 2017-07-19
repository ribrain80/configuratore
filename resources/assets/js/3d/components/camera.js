import * as THREE from 'three';
import Config     from '../config';

// Class that creates and updates the main camera
export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        // Create and position a Perspective Camera
        this.threeCamera = new THREE.PerspectiveCamera(Config.camera.fov, width / height, Config.camera.near, Config.camera.far);
        this.threeCamera.position.set(Config.camera.posX, Config.camera.posY, Config.camera.posZ);

        // Initial sizing
        this.updateSize(renderer);

        // Listeners
        window.addEventListener('resize', () => this.updateSize(renderer), false);
    }

    updateSize(renderer) {
        let dpr = window.devicePixelRatio?window.devicePixelRatio:1;
        // Multiply by dpr in case it is retina device
        this.threeCamera.aspect = renderer.domElement.width * dpr / renderer.domElement.height ;

        // Always call updateProjectionMatrix on camera change
        this.threeCamera.updateProjectionMatrix();
    }

    chanegPosition (x,y,z) {
        let  xyz = new THREE.Vector3(x, y, z);
        this.threeCamera.lookAt(xyz);
    }
}