import "./style.css";
import * as THREE from "three";

console.log('Hello Three Js')

// Scene

console.log('three')
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

//positioning
// mesh.position.z = 0.7;
// mesh.position.y = -0.6;
// mesh.position.x = -0.6;
// scene.add(mesh);

//positioning ex. 2

// mesh.position.set(0.7, -0.6, -0.6);

//scaling

// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;

//or

// mesh.scale.set(2, 0.5, 0.5)

//rotation
// mesh.rotation.reorder('XYZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25;


//GROUP multiple OBJECTS

const group = new THREE.Group();

//position group
group.position.y = 1;

//scale group
group.scale.y = 2;

//rotate group
group.rotation.x = Math.PI * 0.25;
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })

)

group.add(cube1)


const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff99 })
);

cube2.position.set(-2, 1, -0.6);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xfafafa })
);

cube3.position.set(1, 1, -0.6);
group.add(cube3);



//axes helper
const axesHelper = new THREE.AxesHelper();
//add to scene  
scene.add(axesHelper);


//reduce vector to 1
// mesh.position.normalize()

//instead of setting position individually we can use set


// // length, width, height
// console.log(mesh.position.length())

// //distance to point
// console.log(mesh.position.distanceTo( new THREE.Vector3(0,0,0) ))



// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
scene.add(camera);

//look directly at the origin

// camera.lookAt(mesh.position)

//distance to camera

// console.log(mesh.position.distanceTo(camera.position))

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
