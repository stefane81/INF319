/// <reference path="../node_modules/@types/three/index.d.ts" />
/// <reference path="../node_modules/@types/dat-gui/index.d.ts" />
declare function require(name: string): any;
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// global variables. Need to limit these
let camera: any, scene: any, renderer: any, group: any, mode: any, controls: any, loader: any;

const testFolder = './models/';
// const fs = require('fs');
// fs.readdir(testFolder, (err:any, files:any) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })
// initiate all values
init();
// animation loop
animate();
function init() {
	var container = document.body;
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.z = -10;
	scene = new THREE.Scene();
	var light, object;
	scene.add(new THREE.AmbientLight(0x404040));
	light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 1, 0);
	scene.add(light);

	// Loading and adding model to scene
	var loader = new THREE.ObjectLoader();
	var loader2 = new THREE.JSONLoader();
	loader.load('models/CSP.json', function (obj: any) {
		scene.add(obj);
	});
	// loader.load('models/E11.5/Meshes/CSP.json', function (obj: any) {
	// 	scene.add(obj);
	// });
	// loader.load('models/E11.5/Meshes/D.json', function (obj: any) {
	// 	scene.add(obj);
	// });
	// loader.load('models/E11.5/Meshes/EN.json', function (obj: any) {
	// 	scene.add(obj);
	// });

	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// OrbitControls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enableZoom = true;

	// browser window resize
	window.addEventListener('resize', onWindowResize, false);
}

/**
 * Update camera and renderer on browser window resize
 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * animation loop
 */
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	render();
}

/**
 * Render Scene
 */
function render() {

	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}
