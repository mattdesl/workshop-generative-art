const canvasSketch = require('canvas-sketch');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');
const defaultSubdiv = 16;
const materials = [
  {
    material: new THREE.MeshBasicMaterial({
      color: 'white',
      wireframe: true
    })
  },
  {
    material: new THREE.MeshBasicMaterial({
      color: 'white'
    })
  },
  {
    material: new THREE.MeshNormalMaterial({
      flatShading: true
    })
  },
  {
    material: new THREE.MeshStandardMaterial({
      color: 'white',
      roughness: 1,
      metalness: 0.0,
      flatShading: true
    })
  },
  {
    material: new THREE.MeshStandardMaterial({
      color: 'white',
      roughness: 1,
      metalness: 0.0,
      flatShading: false
    })
  },
  {
    material: new THREE.MeshNormalMaterial({
      flatShading: true
    }),
    geometry: new THREE.TorusGeometry(0.75, 0.25, defaultSubdiv, defaultSubdiv * 2)
  },
  {
    material: new THREE.MeshNormalMaterial({
      flatShading: true
    }),
    geometry: new THREE.BoxGeometry(1, 1, 1)
  }
];

const settings = {
  dimensions: [1440, 900],
  exportPixelRatio: 2,
  scaleToView: true,
  // Make the loop animated
  animate: true,
  totalFrames: materials.length + 1,
  fps: 1,
  playbackRate: 'throttle',
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, update }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('black', 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup your scene
  const scene = new THREE.Scene();

  const mesh = new THREE.Mesh();
  scene.add(mesh);

  // Specify an ambient/unlit colour
  scene.add(new THREE.AmbientLight('#000'));

  // Add some light
  const light = new THREE.PointLight('#fff', 1, 15.5);
  light.position.set(2, 2, -4).multiplyScalar(1.5);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time, frame }) {
      const { material, subdiv = defaultSubdiv, geometry } = materials[frame % materials.length];
      mesh.geometry.dispose();
      mesh.geometry = geometry || new THREE.SphereGeometry(1, subdiv * 2, subdiv);
      mesh.material = material;
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
