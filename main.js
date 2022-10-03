import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js';
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
camera.position.set(2, 2, 7);


camera.rotation.order = "YXZ";
orbit.maxDistance = 2000
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


const loader2 = new GLTFLoader();

loader2.load( '../img/trees.glb', function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.position.y = 10
}, undefined, function ( error ) {

	console.error( error );

} );

const loader3 = new GLTFLoader();

loader3.load( '../img/rocks.glb', function ( gltf ) {

	 scene.add( gltf.scene );
     gltf.scene.position.y = 1
     gltf.scene.position.x = 15
    gltf.scene.position.z = 1
    gltf.scene.scale.set(20, 20, 20)

      
        
}, undefined, function ( error ) {
  
    

	console.error( error );

} );

let loadedModel;
const gltfLoader = new GLTFLoader();
gltfLoader.load('../img/rocks.glb', (gltfScene) => { 
    loadedModel = gltfScene.scene.children[0];
    gltfScene.scene.scale.set(20, 20, 20)
    gltfScene.scene.position.set(20, 0, 0)
   
    gltfScene.scene.rotation.x += 0.01
    scene.add(gltfScene.scene)
    gltfScene.scene.traverse((node) => {
        if (node.isMesh) {
            node.material.map = rope
        }
    })

    

})

 


  const loader4 = new GLTFLoader();

loader4.load( '../img/grass.glb', function ( gltf ) {

	scene.add( gltf.scene );
   
   
 
}, undefined, function ( error ) {

	console.error( error );

} );

const loader5 = new GLTFLoader();

loader5.load( '../img/soldier.glb', function ( soldier ) {

	scene.add( soldier.scene );
    soldier.scene.position.y = 10
    
   
   
 
}, undefined, function ( error ) {

	console.error( error );

} );









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
	
    sound.setLoop(false)
    sound.setVolume(0.5)
    sound.setPlaybackRate(1)
    sound.setDirectionalCone( 180, 230, 0.1 )
   
});

audioLoader.load( '../sounds/junky.mp3', function( buffer ) {
	sound2.setBuffer( buffer );
	
	
    sound2.setLoop(false)
    sound2.setVolume(0.5)
    sound2.setPlaybackRate(1)
    sound.setDirectionalCone(3, 180, 0.1)
  
});

audioLoader.load( '../sounds/Revival.wav', function( buffer ) {
	sound3.setBuffer( buffer );
	
	

    sound3.setLoop()
    sound3.setVolume(1.5)
    sound3.setPlaybackRate(1)
    sound.setDirectionalCone(4, 180, 0.1)
   
});


const star = new THREE.Mesh(
    new THREE.TorusGeometry(2,3,4,5),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 1,  }),
    

)
scene.add(star)
star.position.x = 300
star.position.y = 50





// const sphere = new THREE.Mesh(
//     new THREE.BoxGeometry(10, 10, 32),
//     new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 1, map: rope })
  
// )


// scene.add(sphere)
// sphere.add(sound)

// sphere.position.x = 1.5

const textureLoader2 = new THREE.TextureLoader()
const junky2 = textureLoader2.load('./img/jk.jpg')
const sphere2 = new THREE.Mesh(
    new THREE.BoxGeometry(3, 10, 32),
    new THREE.MeshStandardMaterial({ color:0xffffff, roughness: 0, metalness: 1, map: junky2})

)
scene.add(sphere2)
sphere2.position.x = 200.5

sphere2.add(sound2) 


document.onkeydown = function(event) {
 if (event.keyCode === 13 ) {
    sphere2.position.x -= 20.1
    sound2.play()

 }  else  {if (event.keyCode === 32 ) {
        
        sphere2.position.y -= 20.1
        sound2.stop()
        
 
        
    }

    

    

 }
}






  

const textureLoader3 = new THREE.TextureLoader()
const revival = textureLoader3.load('./img/rev.jpg')

const sphere3 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 10, 32),
    new THREE.MeshStandardMaterial({ color:0xffffff,  roughness: 0, metalness: 1, map: revival })

)
scene.add(sphere3)
sphere3.position.x = 400.5
sphere3.add(sound3)






function animate() {
    renderer.render(scene, camera);
    star.rotation.x += 0.01
    
    if (loadedModel) 
    {
        loadedModel.rotation.y += 0.01
        loadedModel.rotation.x += 0.01
        loadedModel.rotation.z += 0.01
        loadedModel.position.y += 0.01
        loadedModel.position.x += 0.01
        loadedModel.position.z += 0.01
        

    }

    

   
    
   
 
   
}


////////main animation function




renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

