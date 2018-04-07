const pi = Math.PI;

// Container is where in the HTML we're loading the scene
// Scene loads and stores all our objects
// Renderer loads scene via webGL
// Camera self explanatory

var container, scene, renderer, camera;

//Setting up container
container = document.querySelector('#container');

// Setting up a new scene 
scene = new THREE.Scene();

// Loading the WebGL renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 1, window.innerHeight * 1);

// Stick the renderer into our container, and therefore our HTML
container.appendChild(renderer.domElement);

// Loading camera variables 
var lens_angle = 90;
var aspect = window.innerWidth / window.innerHeight;
var near = 1;
var far = 2000;

// Loading perspective camera (as opposed to orthographic!)
camera = new THREE.PerspectiveCamera( lens_angle, aspect, near, far );
camera.position.set(6, 10, 6);

camera.rotation.x = -pi/4;//-pi/4;
camera.rotation.y = pi/4;
camera.rotation.z = pi/6;

// Adding camera to the scene - nice!
scene.add(camera);

// Materials!  
const redMat =
  new THREE.MeshBasicMaterial(
    {
      color: 0xCC0000
    });
const blueMat =
  new THREE.MeshBasicMaterial(
    {
      color: 0x00CC00,
      side: THREE.DoubleSide
    });
const greenMat =
  new THREE.MeshBasicMaterial(
    {
      color: 0x0000CC,
      side: THREE.DoubleSide
    });
const whiteMat =
  new THREE.MeshPhongMaterial(
    {
      color: 0xF0F0F0,
      side: THREE.DoubleSide
    });

// Lights!
var ambientLight = new THREE.AmbientLight( 0x404040 )
var directionalLight = new THREE.DirectionalLight( 0xFFCCFF );

ambientLight.position.set( 0, 1, 0 );
directionalLight.position.set(0, 0, 1);

scene.add(ambientLight);
scene.add(directionalLight);

// Objects!  These use the materials we made earlier!
var x = new THREE.Mesh( new THREE.BoxGeometry(100, .1, .1), redMat);
  x.position.set(0, 0, 0);
var y = new THREE.Mesh( new THREE.BoxGeometry(.1, 100, .1), blueMat);
  y.position.set(0, 0, 0);
var z = new THREE.Mesh( new THREE.BoxGeometry(.1, .1, 100), greenMat);
  z.position.set(0, 0, 0);

scene.add(x);
scene.add(y);
scene.add(z);

var body = new THREE.Mesh( new THREE.CylinderGeometry(1, 1, 16, 8), whiteMat);
body.position.set(0, 0, 0);


var fin1 = new THREE.Mesh( new THREE.BoxGeometry(4,1,.2), whiteMat);
fin1.position.set(0, -7, 0);

var fin2 = new THREE.Mesh( new THREE.BoxGeometry(.2,1,4), whiteMat);
fin2.position.set(0, -7, 0);


var rocket = new THREE.Group();
rocket.add(body);
rocket.add(fin1);
rocket.add(fin2);

scene.add(rocket);

var quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
rocket.applyQuaternion( quaternion );

window.onkeydown = function(e)
{
  console.log(e.keyCode);
  var up = 38;
  var down = 40;
  var left = 37;
  var right = 39;
  
  switch(e.keyCode)
  {
    case up:
      break;
    case down:
      break;
    case left:
      break;
    case right:
      break;
  }
};

var time = 0;

// Render function
function update () {
  time += .5;
  
  // Draw!
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);

// Socket connection code.
var socket = io.connect();
socket.on('test', function (data) {
    console.log(data);
    var quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle( new THREE.Vector3( data.qx, data.qy, data.qz ), Math.PI / 2 );
    rocket.applyQuaternion(quaternion);
    rocket.rotation.y = data.qw;

    socket.emit('updated', data.qw);
});