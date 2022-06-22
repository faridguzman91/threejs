import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

console.log(gsap)

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

let time = Date.now()

// clock

const Clock = new THREE.Clock();

//gsap right left movement

gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  ease: "power2.inOut",
  delay: 1,
})

gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  ease: "power2.inOut",
  delay: 2,
  })

 


const tick = () => {
  console.log("tick");

  //time to wait before next frame

//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;

//use Clock

// const elapsedTime = Clock.getElapsedTime();
// console.log(elapsedTime);

//   mesh.rotation.y += 0.01;

  // console.log(deltaTime)

  //update objects
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();

console.log(tick)
