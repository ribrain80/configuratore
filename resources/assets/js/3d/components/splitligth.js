import * as THREE from 'three';
import Config from '../config';

export default class SplitLight {
    constructor (scene) {
        this.scene = scene; //Set Internal scene property
        
        // Directional light from bottom
        this.topLight = new THREE.DirectionalLight(Config.lightBaseConfig.color, Config.lightBaseConfig.intensity);
        this.topLight.position.set( -Config.lightBaseConfig.x, Config.lightBaseConfig.y, Config.lightBaseConfig.z );
        this.topLight.visible = true;

        // Shadow map
        this.topLight.castShadow = Config.shadow.enabled;
        this.topLight.shadow.bias = Config.shadow.bias;
        this.topLight.shadow.camera.near = Config.shadow.near;
        this.topLight.shadow.camera.far = Config.shadow.far;
        this.topLight.shadow.camera.left = Config.shadow.left;
        this.topLight.shadow.camera.right = Config.shadow.right;
        this.topLight.shadow.camera.top = Config.shadow.top;
        this.topLight.shadow.camera.bottom = Config.shadow.bottom;
        this.topLight.shadow.mapSize.width = Config.shadow.mapWidth;
        this.topLight.shadow.mapSize.height = Config.shadow.mapHeight;


        // Directional light from bottom
        this.bottomLight = new THREE.DirectionalLight(Config.lightBaseConfig.color, Config.lightBaseConfig.intensity);
        this.bottomLight.position.set( Config.lightBaseConfig.x, -Config.lightBaseConfig.y, Config.lightBaseConfig.z );
        this.bottomLight.visible = true;

        // Shadow map
        this.bottomLight.castShadow = Config.shadow.enabled;
        this.bottomLight.shadow.bias = Config.shadow.bias;
        this.bottomLight.shadow.camera.near = Config.shadow.near;
        this.bottomLight.shadow.camera.far = Config.shadow.far;
        this.bottomLight.shadow.camera.left = Config.shadow.left;
        this.bottomLight.shadow.camera.right = Config.shadow.right;
        this.bottomLight.shadow.camera.top = Config.shadow.top;
        this.bottomLight.shadow.camera.bottom = Config.shadow.bottom;
        this.bottomLight.shadow.mapSize.width = Config.shadow.mapWidth;
        this.bottomLight.shadow.mapSize.height = Config.shadow.mapHeight;


        // Directional light from bottom
        this.rearTopLight = new THREE.DirectionalLight(Config.lightBaseConfig.color, Config.lightBaseConfig.intensity);
        this.rearTopLight.position.set( -Config.lightBaseConfig.x, Config.lightBaseConfig.y, -Config.lightBaseConfig.z );
        this.rearTopLight.visible = true;

        // Shadow map
        this.rearTopLight.castShadow = Config.shadow.enabled;
        this.rearTopLight.shadow.bias = Config.shadow.bias;
        this.rearTopLight.shadow.camera.near = Config.shadow.near;
        this.rearTopLight.shadow.camera.far = Config.shadow.far;
        this.rearTopLight.shadow.camera.left = Config.shadow.left;
        this.rearTopLight.shadow.camera.right = Config.shadow.right;
        this.rearTopLight.shadow.camera.top = Config.shadow.top;
        this.rearTopLight.shadow.camera.bottom = Config.shadow.bottom;
        this.rearTopLight.shadow.mapSize.width = Config.shadow.mapWidth;
        this.rearTopLight.shadow.mapSize.height = Config.shadow.mapHeight;


        // Directional light from bottom
        this.rearBottomLight = new THREE.DirectionalLight(Config.lightBaseConfig.color, Config.lightBaseConfig.intensity);
        this.rearBottomLight.position.set( -Config.lightBaseConfig.x, -Config.lightBaseConfig.y, -Config.lightBaseConfig.z );
        this.rearBottomLight.visible = true;

        // Shadow map
        this.rearBottomLight.castShadow = Config.shadow.enabled;
        this.rearBottomLight.shadow.bias = Config.shadow.bias;
        this.rearBottomLight.shadow.camera.near = Config.shadow.near;
        this.rearBottomLight.shadow.camera.far = Config.shadow.far;
        this.rearBottomLight.shadow.camera.left = Config.shadow.left;
        this.rearBottomLight.shadow.camera.right = Config.shadow.right;
        this.rearBottomLight.shadow.camera.top = Config.shadow.top;
        this.rearBottomLight.shadow.camera.bottom = Config.shadow.bottom;
        this.rearBottomLight.shadow.mapSize.width = Config.shadow.mapWidth;
        this.rearBottomLight.shadow.mapSize.height = Config.shadow.mapHeight;


        this.scene.add(this.topLight);
        this.scene.add(this.rearTopLight);
        this.scene.add(this.bottomLight);
        this.scene.add(this.rearBottomLight);

    }

}