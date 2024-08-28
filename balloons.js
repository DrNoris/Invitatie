import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.getElementById('sceneContainer');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true pentru fundal transparent
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x000000, 0); // Transparent
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, container.clientWidth / container.clientHeight, 1, 5000);
camera.position.set(0, 0, 0);

if (window.innerWidth <= 768) {
  camera.position.set(0, 0, 7); 
}
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 1000, 200, 90);
spotLight.position.set(0, 10, 10); // Poziționează lumina la 10 unități deasupra și în față
spotLight.lookAt(0, 1.5, 0); // Direcționează lumina către baloane
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const backLight = new THREE.SpotLight(0xffffff, 800, 200, 90);
backLight.position.set(0, 10, -10); // Poziționează lumina la 10 unități deasupra și în spate
backLight.lookAt(0, 1.5, 0); // Direcționează lumina către baloane din spate
backLight.castShadow = false; // Poți dezactiva umbrele pentru această lumină dacă vrei
scene.add(backLight);

const loader = new GLTFLoader();
loader.load('balloons2.gltf', (gltf) => {
    const mesh = gltf.scene;

    // Calcularea unei bounding box pentru a obține centrul geometriei
    const box = new THREE.Box3().setFromObject(mesh);

    // Obține centrul box-ului
    const center = box.getCenter(new THREE.Vector3());

    // Muta mesh-ul astfel încât centrul să fie la origine (0, 0, 0)
    mesh.position.sub(center);

    // Scalează și ajustează poziția pe Y dacă este necesar
    mesh.scale.set(4, 4, 4);
    mesh.position.y += 1.5;
    mesh.position.x -= 1;

    scene.add(mesh);
}, undefined, (error) => {
    console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
