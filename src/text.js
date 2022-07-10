import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// debug ui

const gui = new dat.GUI();

//canvas

const canvas = document.querySelector("canvas.webgl");

//fonts

const fontLoader = new FontLoader();

//lights




///textures
const textureLoader = new THREE.TextureLoader();
//matcap loader

const matcapTexture = textureLoader.load("/textures/matcaps/9.png");

fontLoader.load("/font/Camila_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Hello World", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 5,
    bevelOffset: 0,
  });



  //(box3) compute the bounding box of the text geometry

  textGeometry.computeBoundingBox();

//   textGeometry.translate(
//     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
//     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
//     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
//   );

textGeometry.center()
  console.log(textGeometry.boundingBox);

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  console.log("loaded font");

  //randomise positions

      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      });

  for (let i = 0; i < 100; i++) {

            const donut = new THREE.Mesh(donutGeometry, donutMaterial);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z =  (Math.random() - 0.5) * 10;

            //rotate

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;

            //scaling

            const scale = Math.random()
            donut.scale.set(scale, scale, scale);
        scene.add(donut);

}
});

//scene

const scene = new THREE.Scene();

const pointLight = new THREE.PointLight(0xfafafa, 20, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);


//object

// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()

// )

// scene.add(cube)

//window size

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  //update sizze
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//animate

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
