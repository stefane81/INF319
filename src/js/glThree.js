var THREE = require('three');
var OBJLoader = require('three-obj-loader')(THREE)
var OrbitControls = require('three-orbit-controls')(THREE)

class glThree {
	constructor() {

		var clock = new THREE.Clock();
		var delta = clock.getDelta(); // seconds.
		var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
		var container, stats;

		var camera, scene, renderer;

		var mouseX = 0,
			mouseY = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;


		init();
		animate();

		function init() {

			container = document.createElement('div');
			document.body.appendChild(container);

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
			camera.position.z = 600;

			// scene

			scene = new THREE.Scene();

			var ambient = new THREE.AmbientLight(0x101030);
			scene.add(ambient);

			var directionalLight = new THREE.DirectionalLight(0xffeedd);
			directionalLight.position.set(0, 0, 1);
			scene.add(directionalLight);

			// texture

			var manager = new THREE.LoadingManager();
			manager.onProgress = function (item, loaded, total) {
				console.log(item, loaded, total);
			};


			/**
			 * Load models and add them to scene
			 */
			var loader = new THREE.OBJLoader(manager);
			loader.load('/data/models/rect/rectum1.obj', function (object) {
				scene.add(objectMod(object));
			});

			loader.load('/data/models/rect/rectum2.obj', function (object) {
				scene.add(objectMod(object));
			});

			loader.load('/data/models/rect/rectum3.obj', function (object) {
				scene.add(objectMod(object));
			});

			loader.load('/data/models/rect/rectum4.obj', function (object) {
				scene.add(objectMod(object));
			});

			renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			document.addEventListener('mousemove', onDocumentMouseMove, false);

			window.addEventListener('resize', onWindowResize, false);

		}

		/**
		 * Modify object model
		 * 
		 * @param {any} object 
		 * @returns 
		 */
		function objectMod(object) {
			let objectScale = 0.5;
			object.traverse(function (child) {

				if (child instanceof THREE.Mesh) {
					//child.material.map = texture;
				}
			});

//			object.position.x = -5;
			object.scale.x = objectScale;
			object.scale.y = objectScale;
			object.scale.z = objectScale;
			return object;
		}

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function onDocumentMouseMove(event) {
			mouseX = (event.clientX);// - windowHalfX) ;
			mouseY = (event.clientY);// - windowHalfY) ;
		}

		function animate() {
			requestAnimationFrame(animate);
			render();
		}

/**
 * Renering loop
 * 
 */
		function render() {
			//obj.rotation.x += (0.2 * (Math.PI / 180));
			// obj.rotation.x %= 360;

			camera.position.x += (mouseX - camera.position.x);
			camera.position.y += (-mouseY - camera.position.y);

			camera.lookAt(scene.position);

			renderer.render(scene, camera);
		}
	}
}
export default glThree;