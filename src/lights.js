import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//base scene

//debug

const gui = new dat.GUI()

//canvas

const canvas = document.querySelector('canvas.webgl')

//scene

const scene = new THREE.Scene()

//lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 2
pointLight.position.z = 2
scene.add(pointLight)


//object

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material)
sphere.position.x = -1.5

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 32), material)
torus.position.x = 1.5


const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 32, 32), material)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = -1

scene.add(sphere, cube, torus, plane)


//sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight

}

window.addEventListener('resize', () => {

    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio, 2)

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})

//camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10)
camera.position.z = 3
camera.position.y = 1
camera.position.z = 2
scene.add