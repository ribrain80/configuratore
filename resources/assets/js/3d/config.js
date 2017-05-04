// This object contains the state of the 3d preview
export default {
    isDev: false,
    isLoaded: false,
    isTweening: false,
    isRotating: true,
    isMouseMoving: false,
    isMouseOver: false,
    maxAnisotropy: 1,
    dpr: 1,
    sceneClearColor: 0xffffff,

    duration: 500,

    mesh: {
        enableHelper: false,
        wireframe: false,
        translucent: false,
        material: {
            color: 0xffffff,
            emissive: 0xffffff
        }
    },

    camera: {
        fov: 50,
        near: 1,
        far: 20000,
        aspect: 1,
        posX: 300,
        posY: 1200,
        posZ: 500
    },
    controls: {
        autoRotate: true,
        autoRotateSpeed: -0.5,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        minDistance: 100,
        maxDistance: 4000,
        minPolarAngle:  -2 * Math.PI ,
        maxPolarAngle: 2 * Math.PI ,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableDamping: true,
        dampingFactor: 0.5,
        enableZoom: true,
        target: {
            x: 0,
            y: 0,
            z: 0
        }
    },

    shadow: {
        enabled: true,
        helperEnabled: true,
        bias: 0,
        mapWidth: 2048,
        mapHeight: 2048,
        near: 250,
        far: 400,
        top: 100,
        right: 100,
        bottom: -100,
        left: -100
    },


    lightBaseConfig: {
        color: 0xffffff,
        intensity: 0.45,
        x:1000,
        y:1000,
        z:1000
    }
};