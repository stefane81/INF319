/// <reference path="../node_modules/@types/three/index.d.ts" />
/// <reference path="../node_modules/@types/dat-gui/index.d.ts" />


declare function require(name: string): any;
import * as THREE from './vendor/three/three';
// import * as OrbitControls from 'vendor/three/OrbitControls';
// OrbitControls(THREE);
var OrbitControls = require('three-orbit-controls')(THREE);
import * as Dat from "./vendor/three/dat.gui.min";
import * as Stats from "./vendor/three/stats.min";
import { ModelLoader } from "./js/modelLoader"

// global variables. Need to limit these
let camera: any, scene: any, renderer: any, group: any, mode: any, controls: any, loader: any;
let datgui: any, stats: any;

let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;

let mouseX: number = 0;
let mouseY: number = 0;

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
	let container: any = document.body;

	// scene loader

	camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 2000);
	camera.position.z = -10;
	scene = new THREE.Scene();
	let light: any, object: any;
	scene.add(new THREE.AmbientLight(0x404040));
	light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 1, 0);
	scene.add(light);
	let loader: any = new THREE.ObjectLoader();
	// Loading and adding model to scene
	
	// Load Models and add to scene
	let loadModels = new ModelLoader(scene, loader);	
	loadModels.loadAllModels();
	scene = loadModels.getScene();
	loader = loadModels.getLoader();
	

		// Renderer
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		container.appendChild(renderer.domElement);

		// OrbitControls
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.enableZoom = true;

		datgui = new Dat.GUI();


		stats = Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = '100';
		container.appendChild(stats.domElement);
		// browser window resize
		window.addEventListener('resize', onWindowResize, false);
	}

/**
 * Update camera and renderer on browser window resize
 */
function onWindowResize() {
			camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
			camera.updateProjectionMatrix();
			renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		}

/**
 * animation loop
 */
function animate() {
			requestAnimationFrame(animate);
			controls.update();
			stats.update();
			render();
		}

/**
 * Render Scene
 */
function render() {
			camera.position.x += (mouseX - camera.position.x) * .001;
			camera.position.y += (- mouseY - camera.position.y) * .001;
			camera.lookAt(scene.position);
			renderer.render(scene, camera);

		}



// function onDocumentMouseMove(event) {
// 	mouseX = (event.clientX - (SCREEN_WIDTH/2));
// 	mouseY = (event.clientY - (SCREEN_HEIGHT/2));
// }