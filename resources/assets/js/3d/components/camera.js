import * as THREE from 'three';
import Config     from '../config';

// Class that creates and updates the main camera
export default class Camera {
    constructor(renderer) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;

        // Create and position a Perspective Camera
        this.threeCamera = new THREE.PerspectiveCamera(Config.camera.fov, 1, Config.camera.near, Config.camera.far);

        //this.threeCamera = new THREE.OrthographicCamera (0.5 * 600 / - 2, 0.5 * 600 / 2, 600 / 2, 600 / - 2, 150, 1000);

        this.threeCamera.position.set(Config.camera.posX, Config.camera.posY, Config.camera.posZ);

        // Initial sizing
        this.updateSize(renderer);

        // Listeners
        window.addEventListener('resize', () => this.updateSize(renderer), false);
        document.getElementById("step4_3d_container").addEventListener('resize', () => this.updateSize(renderer), false);
    }

    updateSize(renderer) {
        console.log("Update camera");
        // Multiply by dpr in case it is retina device
        this.threeCamera.aspect = renderer.domElement.width * Config.dpr / renderer.domElement.height * Config.dpr;

        // Always call updateProjectionMatrix on camera change
        this.threeCamera.updateProjectionMatrix();
    }
}