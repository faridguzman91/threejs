import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Camera } from 'three'

//BASE Debug

const gui = new dat.GUI()

//CANVAS

    const canvas = document.querySelector('canvas.webgl')

    //SCENE

    const scene = new THREE.Scene()

    //lights

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    scene.add(ambientLight)

    //directional light

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(2, 2, -1)
    directionalLight.castShadow = true
    console.log(directionalLight.shadow)

    //spotlight

    const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI * 0.3)
    spotLight.castShadow = false

    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048

    spotLight.shadow.camera.fov = 30

    spotLight.shadow.camera.near = 1
    spotLight.shadow.camera.far = 6

    spotLight.shadow.radius = 20

    
    // spotLight.position.set(0, 2 ,2)
    scene.add(spotLight)
    scene.add(spotLight.target)

    gui.add(spotLight, 'intensity').min(0).max(1).step(0.001)
    gui.add(spotLight, 'distance').min(0).max(10).step(0.001)
    gui.add(spotLight, 'angle').min(0).max(Math.PI).step(0.001)
    gui.add(spotLight.position, 'x').min(-10).max(10).step(0.001)
    gui.add(spotLight.position, 'y').min(-10).max(10).step(0.001)

    const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
    // scene.add(spotLightCameraHelper)


    //shadow map resolution

    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048

    //near and far plane
    directionalLight.shadow.camera.near = 1
    directionalLight.shadow.camera.far = 6

    gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
    gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
    gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)
    gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001)
    // scene.add(directionalLight)

    //camera amplitude
    directionalLight.shadow.camera.left = -1
    directionalLight.shadow.camera.right = 1
    directionalLight.shadow.camera.top = 1
    directionalLight.shadow.camera.bottom = -1

    //blur

    directionalLight.shadow.radius = 20



    //camerahelper

    const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(cameraHelper)
    console.log(cameraHelper)

    //materials

    const material = new THREE.MeshStandardMaterial()
    material.roughness = 0.4
    gui.add(material, 'roughness').min(0).max(1).step(0.001)
    gui.add(material, 'metalness').min(0).max(1).step(0.001)

    //objects

    //sphere

         const textureLoader = new THREE.TextureLoader();
         const bakedShadow = textureLoader.load(
           "/textures/baked/bakedShadow.jpg"
         );
         const simpleShadow = textureLoader.load(
           "/textures/baked/simpleShadow.jpg"
         );

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            map: bakedShadow,
            receiveShadow: true
        })
         )

    
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        map: bakedShadow,
      })
    );

    const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);

    plane2.rotation.x = Math.PI * 0.5;
    plane2.position.y = -0.5;
    plane2.castShadow = true;
    plane2.receiveShadow = true;

    const sphereShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1.5),
        new THREE.MeshBasicMaterial({
            color : 0x000000,
            transparent : true,
            alphaMap : simpleShadow
        }))

        sphereShadow.rotation.x = Math.PI * 0.5
        sphereShadow.position.y = plane.position.y + 0.01

        // sphere.add(sphereShadow)



    sphere.position.y = 1.2
    sphere.castShadow = false
    gui.add(sphere, 'castShadow')
    gui.add(sphere.position, 'x').min(-5).max(5).step(0.001)
    gui.add(sphere.position, 'y').min(-5).max(5).step(0.001)
    gui.add(sphere.position, 'z').min(-5).max(5).step(0.001)

    //plane





    scene.add(sphere, sphereShadow, plane,)

    //sizes

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () => {

        //update sizes

        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        //update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        //update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(window.devicePixelRatio, 2)
    
    })

    //base camera 

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 2
    scene.add(camera)

    //controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true


    //renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    })

    //texture loader

   
    renderer.shadowMap.enabled = false
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio, 2)

    //ANIMATE

    const spin = new THREE.Clock()

    const animate = () => {

        const clockSpin = spin.getElapsedTime()
        window.requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }

    animate()
