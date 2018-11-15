const canvasSketch = require('canvas-sketch');
const convexHull = require('convex-hull');
const random = require('canvas-sketch-util/random');
const { linspace } = require('canvas-sketch-util/math');
const glslify = require('glslify');

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require('three');

// Include any additional ThreeJS examples below
require('three/examples/js/controls/OrbitControls');

const settings = {
  dimensions: [ 512, 512 ],
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true }
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context
  });

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 0%)', 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  const vertexShader = glslify(`
    varying vec2 vUv;

    uniform float time;

    #pragma glslify: noise = require('glsl-noise/simplex/4d');
 
    void main () {
      vUv = uv;

      vec3 transformed = position.xyz;

      float offset = 0.0;
      offset += 0.5 * (noise(vec4(normal.xyz * 1.0, time * 0.25)) * 0.5 + 0.5);

      transformed += normal * offset;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
  `);

  const fragmentShader = glslify(`
    varying vec2 vUv;
    uniform float time;

    #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

    void main () {
      vec3 color = hsl2rgb(mod(vUv.y * 0.1 + time * 0.1, 1.0), 0.5, 0.5);
      gl_FragColor = vec4(color, 1.0);
      if (!gl_FrontFacing) {
        gl_FragColor = vec4(color * 0.25, 1.0);
      }
    }
  `);

  const geometry = new THREE.DodecahedronGeometry(1, 0);
  geometry.computeFlatVertexNormals();

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.ShaderMaterial({
      flatShading: true,
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 }
      }
    })
  );
  scene.add(mesh);

  // draw each frame
  return {
    // Handle resize events here
    resize ({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;

      // Ortho zoom
      const zoom = 2.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render ({ time }) {
      mesh.rotation.z = 0.1 * time;
      mesh.material.uniforms.time.value = time;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload () {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
