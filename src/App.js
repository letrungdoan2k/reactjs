import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect } from "react";

function App() {
  const loader = new GLTFLoader();
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // loader.load( 'https://s3.ap-northeast-1.amazonaws.com/storage.up-t.jp/Drawer/Shapes/3d_model/A_Mug/A_Mug.glb', function ( gltf ) {

  //   scene.add( gltf.scene );

  // }, undefined, function ( error ) {

  //   console.error( error );

  // } );

  const colors = [
    0x009e60,
    0x0051ba,
    0xffd500,
    0xff5800,
    0xC41E3A,
    0xffffff
];

const cubeMaterials = colors.map(color => (new THREE.MeshBasicMaterial({ color: color })));

const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterials);
  scene.add(cubeMesh);

  camera.position.z = 8;

  var controls = new OrbitControls(camera, renderer.domElement);

  // draw scene
  var render = () => {
    renderer.render(scene, camera);
  };

  //run gameloop (update, render, repeat)
  var GameLoop = () => {
    requestAnimationFrame(GameLoop);
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.02;
    render();
  };

  GameLoop();
  // Just for fun
  scene.background = new THREE.Color("skyblue");

  useEffect(() => {
    document.getElementById("root").appendChild(renderer.domElement);
  }, []);
}

export default App;
