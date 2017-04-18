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
    fog: {
        color: 0xffffff,
        near: 0.0006
    },
    camera: {
        fov: 50,
        near: 1,
        far: 20000,
        aspect: 1,
        posX: 300,
        posY: 1500,
        posZ: 2000
    },
    controls: {
        autoRotate: true,
        autoRotateSpeed: -0.5,
        rotateSpeed: 0.5,
        zoomSpeed: 0.8,
        minDistance: 200,
        maxDistance: 2000,
        minPolarAngle:  - Math.PI ,
        maxPolarAngle: Math.PI ,
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
    ambientLight: {
        enabled: false,
        color: 0x141414
    },
    directionalLight: {
        enabled: true,
        color: 0xffffff,
        intensity: 0.7,
        x: -75,
        y: 280,
        z: 150
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
    pointLight: {
        enabled: true,
        color: 0xffffff,
        intensity: 0.34,
        distance: 115,
        x: 0,
        y: 0,
        z: 0
    },
    hemiLight: {
        enabled: true,
        color: 0xc8c8c8,
        groundColor: 0xffffff,
        intensity: 0.55,
        x: 0,
        y: 0,
        z: 0
    }
};