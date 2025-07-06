
import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('galaxy') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const planets = [];
const textures = [
  'mercury', 'venus', 'earth', 'mars', 'jupiter',
  'saturn', 'uranus', 'neptune', 'pluto'
];

textures.forEach((name, i) => {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${i * 40}, 100%, 50%)`) });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = i * 3 - 12;
  planet.userData.name = name;
  scene.add(planet);
  planets.push(planet);
});

camera.position.z = 20;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const selected = intersects[0].object.userData.name;
    const lang = document.getElementById('language').value;
    document.getElementById('audio').src = `audio/${lang}/${selected}.mp3`;
    document.getElementById('audio').play();
  }
});

function animate() {
  requestAnimationFrame(animate);
  planets.forEach((p, i) => p.rotation.y += 0.01);
  controls.update();
  renderer.render(scene, camera);
}
animate();
