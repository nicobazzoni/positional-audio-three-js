import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import { RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
const hdrTextureURL = new URL('../img/quarry_01_1k.hdr', import.meta.url)



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(2, 0, 7);
camera.rotation.set(0.5, 0, 0)
orbit.maxDistance = 300
orbit.update();

renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.8

const loader = new RGBELoader();
loader.load(hdrTextureURL, function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;


})

const textureLoader = new THREE.TextureLoader()
const rope = textureLoader.load('./img/enemy.jpg');



const listener = new THREE.AudioListener();
camera.add( listener );



// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );
const sound2 = new THREE.PositionalAudio( listener );
const sound3 = new THREE.PositionalAudio( listener );
// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../sounds/Nme.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 2 );
	sound.play();
    sound.setLoop(false)
    sound.setVolume(0.5)
    sound.setPlaybackRate(1)
    sound.setDirectionalCone(2, 180, 0.1)
   
});

audioLoader.load( '../sounds/junky.mp3', function( buffer ) {
	sound2.setBuffer( buffer );
	sound2.setRefDistance( 3 );
	sound2.play();
    sound2.setLoop(false)
    sound2.setVolume(0.5)
    sound2.setPlaybackRate(1)
    sound2.setDirectionalCone(3, 180, 0.1)
});

audioLoader.load( '../sounds/Revival.wav', function( buffer ) {
	sound3.setBuffer( buffer );
	sound3.setRefDistance( 4 );
	sound3.play();
    sound3.setLoop(false)
    sound3.setVolume(0.5)
    sound3.setPlaybackRate(1)
    sound3.setDirectionalCone(4, 180, 0.1)
});







const sphere = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 1, map: rope })
  
)
scene.add(sphere)
sphere.add(sound)

sphere.position.x = 1.5

const textureLoader2 = new THREE.TextureLoader()
const junky2 = textureLoader2.load('./img/jk.jpg')
const sphere2 = new THREE.Mesh(
    new THREE.BoxGeometry(3, 10, 32),
    new THREE.MeshStandardMaterial({ color:0xffffff, roughness: 0, metalness: 1, map: junky2})

)
scene.add(sphere2)
sphere2.position.x = 50.5

sphere2.add(sound2)

const textureLoader3 = new THREE.TextureLoader()
const revival = textureLoader3.load('./img/rev.jpg')

const sphere3 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 10, 32),
    new THREE.MeshBasicMaterial({ color:0xffffff,  roughness: 0, metalness: 1, map: revival })

)
scene.add(sphere3)
sphere3.position.x = 100.5
sphere3.add(sound3)

// Sets a 12 by 12 gird helper



function animate() {
    renderer.render(scene, camera);
    

    sphere.rotation.y += 0.01;
    sphere2.rotation.y += 0.01;
    sphere3.rotation.y += 0.01;
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});