const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

const settings = {
  dimensions: [1440, 900],
  exportPixelRatio: 2,
  scaleToView: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, update }) => {
  random.setSeed(16);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('#000', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);

  // Setup your scene
  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const material1 = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    color: new THREE.Color('hsl(0, 55%, 60%)')
  });
  const mesh1 = new THREE.Mesh(geometry, material1);
  mesh1.position.set(1, 0, 0);
  scene.add(mesh1);

  const material2 = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    color: new THREE.Color('hsl(200, 55%, 60%)')
  });
  const mesh2 = new THREE.Mesh(geometry, material2);
  mesh2.position.set(-1, 0, 0);
  mesh2.scale.x = 0.5;
  mesh2.scale.z = 0.25;
  scene.add(mesh2);

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('hsl(0, 0%, 10%)'));

  // Add some light
  const light = new THREE.DirectionalLight('white', 1.25);
  light.position.set(3, 5, 4);
  light.lookAt(new THREE.Vector3());
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight, width, height }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.setViewOffset(
        width, height,
        0, 40,
        width, height
      );
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ playhead, frame }) {
      const orbit = Math.PI / 4 + playhead * Math.PI * 2;
      const y = 4;
      const radius = 4;
      const x = Math.cos(orbit) * radius;
      const z = Math.sin(orbit) * radius;
      camera.position.set(x, y, z);
      camera.lookAt(new THREE.Vector3());
      camera.position.y -= 0.35;

      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
