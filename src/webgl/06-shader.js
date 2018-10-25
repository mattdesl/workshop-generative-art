const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');

// Setup our sketch
const settings = {
  dimensions: [ 1440, 900 ],
  exportPixelRatio: 2,
  context: 'webgl',
  animate: true
};

// Your glsl code
const frag = glsl(`
  precision highp float;

  uniform float time;
  uniform float aspect;
  varying vec2 vUv;

  void main () {
    // Get a vector from current UV to (0.5, 0.5)
    vec2 center = vUv - 0.5;

    // Fix it for current aspect ratio
    center.x *= aspect;

    // Get length of the vector (i.e. radius of polar coordinate)
    float dist = length(center);

    // Create a "mask" circle
    float mask = smoothstep(0.2025, 0.2, dist);

    vec3 color = 0.5 + 0.5 * cos(time + vUv.xyx + vec3(0.0, 2.0, 4.0));
    gl_FragColor = vec4(color, mask);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    clearColor: 'hsl(0, 0%, 95%)',
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      time: ({ time }) => time,
      aspect: ({ width, height }) => width / height
    }
  });
};

canvasSketch(sketch, settings);
