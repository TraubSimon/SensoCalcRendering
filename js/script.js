import * as THREE from "./three.module.js";
import {OBJLoader} from "./OBJLoader.js";
import {MTLLoader} from "./MTLLoader.js";
import {OrbitControls} from "./OrbitControls.js"

console.log("Hello Gehauese S-Mount");
console.log("translationZ value when the script.js is loaded: " +  document.getElementById("translationZ").value)


var scene = new THREE.Scene();

//var camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight /  2, window.innerHeight / - 2,  0.1, 1000);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.getWorldPosition.z = 20;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new MTLLoader();
//mtlLoader.setTexturePath('./models/');
mtlLoader.setPath('./models/');
mtlLoader.load('Gehäuse S-Mount.mtl', function (materials)
{
    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);  
    objLoader.setPath('./models/');
    objLoader.load('Gehäuse S-Mount.obj', function  ( object ) 
    {   
        window.object = object;
        scene.add(object);
        object.position.z -= 10;       
    });
});

window.update = function ()
{
    
    var readRotationX = document.getElementById("rotationX").value
    var readRotationY = document.getElementById("rotationY").value
    var readRotationZ = document.getElementById("rotationZ").value
    var rotationX, rotationY, rotationZ; 
    
    readRotationX == "" ? rotationX = 0.0 : rotationX = readRotationX
    readRotationY == "" ? rotationY = 0.0 : rotationY = readRotationY
    readRotationZ == "" ? rotationZ = 0.0 : rotationZ = readRotationZ
    
    
    var readTranslationX = document.getElementById("translationX").value
    var readTranslationY = document.getElementById("translationY").value
    var readTranslationZ = document.getElementById("translationZ").value
    var translationX, translationY, translationZ; 
    
    readTranslationX == "" ? translationX = 0.0 : translationX = readTranslationX
    readTranslationY == "" ? translationY = 0.0 : translationY = readTranslationY
    readTranslationZ == "" ? translationZ = 0.0 : translationZ = readTranslationZ
    
    object.rotateX(rotationX);
    object.rotateY(rotationY);
    object.rotateZ(rotationZ);
    object.position.x += translationX;
    object.position.y += translationY;
    object.position.z -= translationZ;
    
    console.log("function UPDATE(): translationZ value: " +  document.getElementById("translationZ").value)
    console.log("function UPDATE(): translationZ type: " +  document.getElementById("translationZ"))
    console.log(document.getElementById("translationZ"))
    
    
    animate();
};

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//animate();

