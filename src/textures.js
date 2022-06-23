import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**texture */

/** faster */

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('loading started')
}
loadingManager.onLoaded = () => {
    console.log('loading complete')
}
loadingManager.onProgress = () => {
    console.log('loading progress')
}
loadingManager.onError = () => {
    console.log('loading error')
}


const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load("/textures/door/color.jpg" );
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg" );
const heightTexture = textureLoader.load("/textures/door/height.jpg" );
const normalTexture = textureLoader.load("/textures/door/normal.jpg" );
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg" );
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg" );
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg" );

//repeat is a vector2 that defines the number of times the texture is repeated across the surface.

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// //WRAP TEXTURE around the object

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// //offset (vector2) is a vector2 that defines the offset of the texture from the surface.

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5


///rotation 

colorTexture.rotation = Math.PI / 4
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5







// const image = new Image()
// const texture = new THREE.Texture(image)

// image.addEventListener('load' , () => {
//     texture.needsUpdate = true
//     console.log('image loaded')
// })

// image.src = '/textures/door/color.jpg'



const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width:  window.innerWidth,
    height: window.innerHeight
}

// console.log(imageSource)


const scene = new THREE.Scene()

// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xfafafa })
// )

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
console.log(geometry.attributes.uv)

const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 3
camera.position.x = 3
camera.lookAt(mesh.position)
scene.add(camera)

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

//controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //controls update
    controls.update()

    // mesh.rotation.y = elapsedTime

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

}

tick();
