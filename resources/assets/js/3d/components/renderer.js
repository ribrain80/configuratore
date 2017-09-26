import * as THREE from 'three';
import Config from '../config';

// Main webGL renderer class
export default class Renderer {
    constructor(scene, container) {
        // Properties
        this.scene = scene;
        this.container = container;

        // Create WebGL renderer and set its antialias
        this.threeRenderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });

        // # Set scene background color
        this.threeRenderer.setClearColor(Config.sceneClearColor);
        this.threeRenderer.setPixelRatio(window.devicePixelRatio?window.devicePixelRatio:1); // For retina

        // Appends canvas

        container.appendChild(this.threeRenderer.domElement);

        // Remove border from renderer
        this.threeRenderer.domElement.style.border="none";

        // Shadow map options
        this.threeRenderer.shadowMap.enabled = true;
        this.threeRenderer.shadowMap.type = THREE.PCFShadowMap;

        // Get anisotropy for textures
        Config.maxAnisotropy = this.threeRenderer.getMaxAnisotropy();

        // Initial size update set to canvas container
        this.updateSize();

        // Listeners
        document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
        window.addEventListener('resize', () => this.updateSize(), false);
        container.addEventListener('resize', () => this.updateSize(), false);
        console.log("WEBGL CONTAINER:",container);
        document.getElementById("step4_3d_container").addEventListener('resize', () => this.updateSize(), false);
    }

    updateSize() {
        console.log("UPDATE RENDERER SIZE!!");
        let dpr = window.devicePixelRatio?window.devicePixelRatio:1;

        this.threeRenderer.setSize(this.container.offsetWidth, this.container.offsetHeight, true);
        this.container.firstChild.style.border = "none";
        this.container.firstChild.style.border = "1px solid #999";
    }

    render(scene, camera) {
        // Renders scene to canvas target
        this.threeRenderer.render(scene, camera);
    }
}
