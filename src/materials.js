import './style.css'
import * as THREE from 'three'
import  {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

//debug ui

const gui = new dat.GUI


//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//object

//add textures

const textureLoader = new THREE.TextureLoader()


//LOAD ENVIRONMENT MAP  

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/0/px.jpg',
    'textures/environmentMaps/0/nx.jpg',
    'textures/environmentMaps/0/py.jpg',
    'textures/environmentMaps/0/ny.jpg',
    'textures/environmentMaps/0/pz.jpg',
    'textures/environmentMaps/0/nz.jpg'
])

//load textures




const doorColorTexture = textureLoader.load('textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg')
// const matcapTexture = textureLoader.load('textures/matcaps/1.png')
const gradientTexture = textureLoader.load('textures/gradients/5.jpg')

//matcaps

const matcapTexture = textureLoader.load('textures/matcaps/4.png')


//use normal materials to calculate illumination on the fly

const material = new THREE.MeshStandardMaterial()
// material.map = doorColorTexture



//debug ui material

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//env map

material.envMap = environmentMapTexture

material.roughness = 0
material.metalness = 1

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1

// material.gradientMap = gradientTexture
// gradientTexture.minFilter  = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// material.specular = new THREE.Color(0x1188ff)
// material.shininess = 100


// material.matcap = matcapTexture
// // material.flatShading = true
// // material.map = doorColorTexture
// // material.color = new THREE.Color(0xffffff)
// material.wireframe = false
// // // material.transparent = true
// // material.opacity = 1
// // material.alphaMap = doorAlphaTexture
material.side = THREE.DoubleSide


//lights

//ambient light


// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// scene.add(ambientLight)

//pointlight

const pointLight = new THREE.PointLight(0xffffff, 1, 100)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 2
scene.add(pointLight)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)

sphere.geometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

sphere.position.x = -1.5


const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
  
);
torus.geometry.setAttribute(
  "uv",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5

scene.add(sphere, plane,torus);








//window size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//resize window
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 3
camera.position.x = 3
scene.add(camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    //update objects

    sphere.rotation.y = elapsedTime * 0.5
    torus.rotation.y = elapsedTime * 0.5
    plane.rotation.y = elapsedTime * 0.5
    
    sphere.rotation.x = elapsedTime * 0.5
    plane.rotation.x = elapsedTime * 0.5
    torus.rotation.x = elapsedTime * 0.5

    controls.update()

    renderer.render(scene, camera)


    window.requestAnimationFrame(tick)
}

tick()
