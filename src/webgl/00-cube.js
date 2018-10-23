global.THREE = require('three');

const canvasSketch = require('canvas-sketch');

const settings = {
  animate: true,
  dimensions: [ 1024, 1280 ],
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context, width, height }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1);

  // Setup a camera, we will update its settings on resize
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(2, 2, 2);
  camera.lookAt(new THREE.Vector3());

  // Setup your scene
  const scene = new THREE.Scene();

  // Re-use the same Geometry across all our cubes
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  // Basic "unlit" material with no depth
  const material = new THREE.MeshNormalMaterial();

  // Create the mesh
  const mesh = new THREE.Mesh(geometry, material);

  // Smaller cube
  mesh.scale.setScalar(0.5);

  // Then add the group to the scene
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      camera.aspect = viewportWidth / viewportHeight;

      // Update camera properties
      camera.updateProjectionMatrix();
    },
    // And render events here
    render ({ time }) {
      // Rotate mesh
      mesh.rotation.y = time * 0.25;
      // Draw scene with our camera
      renderer.render(scene, camera);
    },
    // Dispose of WebGL context (optional)
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
