import './style.css'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {
    Camera,
    WebGLBufferRenderer
} from 'three'

//debug

const gui = new dat.GUI()

// canvas 

const canvas = document.querySelectorAll('canvas.webgl')

//scene

const scene = new THREE.Scene()

//lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//objects

//material

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

//objects

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = -1.5

const cube = new THREE.Mesh(
    new THREE.TorusGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

//sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)


window.addEventListener('resize', () => {
    //uodate items
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})



//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sized.widt, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//animate

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.15 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedtime
    torus.rotation.x = 0.15 * elapsedTime

    //update controls
    constrols.update()

    //render
    renderer.render(scene, camera)

    //call tick on next frame
    window.requestAnimationFrame(tick)
}

tick()