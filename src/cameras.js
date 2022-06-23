import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";


/**Dbug */

const gui = new dat.GUI({closed : true, width: 500});
// gui.hide();

//spin function

function spin() {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + 10 , duration: 1 });

  };


//object param

const parameters = {
  color: 0xff0000,
  intensity: 1,
  spin: () => {
    spin();
    console.log("spin");

  }

}

gui.addColor(parameters, 'color').onChange(() => {
  material.color.set(parameters.color);
})

//spin

gui.add(parameters, 'spin')

window.addEventListener('keydown', (event) => {
  if (event.key === 'h') {
    console.log("h");
    if(gui._hidden)
    gui.show()
    else
    gui.hide()
  }
}
)


//update the scene




//ADD CONTROLS
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  console.log("resized");

  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  //update camera

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //pixel ratio is the limit of the device
});

//listen to double click to change size

window.addEventListener("dblclick", () => {
  //  console.log('dblclick')

  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement;

  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

console.log(dat)

//instatiat



//object

// const positionArray = new Float32Array([
//   0,0,0, //1st vertex (x, y, z)
//   0, 1, 0, //2nd vertex (x, y, z)
//   1, 0, 0, //3rd vertex (x, y, z)
// ]);

// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);

const geometry = new THREE.BufferGeometry();

const count = 5000
const positionArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 *3 ; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4;

}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute('position', positionAttribute);


// geometry.setAttribute('position' , positionsAttribute);

// positionArray[0] = 0
// positionArray[1] = 0
// positionArray[2] = 0

// positionArray[3] = 0
// positionArray[4] = 1
// positionArray[5] = 0

// positionArray[6] = 1
// positionArray[7] = 0
// positionArray[8] = 0





const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true,
})

const mesh = new THREE.Mesh(geometry, material);
// mesh.visible = false
scene.add(mesh);

//debug

// obect, min max values for x, y, z

//chaining

gui
.add(mesh.position, 'y', -3, 3, 0.01)
.min(-3)
.max(3)
.step(0.01)
.name('elevation')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

// gui.addColor(material, 'color')

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
