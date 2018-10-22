const canvasSketch = require('canvas-sketch');
const { WebGLRenderer } = require('three');

setInterval(() => {
  let canvas = document.createElement('canvas');
  let gl = canvas.getContext('webgl');

  const renderer = new WebGLRenderer({ context: gl });

  const ext = gl.getExtension('WEBGL_lose_context');
  renderer.dispose()
  if (ext && typeof ext.loseContext === 'function') {
    ext.loseContext();
    console.log('Lost')
  }
}, 250);


// const settings = {
//   // Make the loop animated
//   animate: true,
//   // Get a WebGL canvas rather than 2D
//   context: 'webgl',
//   // Turn on MSAA
//   attributes: { antialias: true }
// };

// const sketch = ({ gl }) => {
//   // Setup REGL with our canvas context
//   const regl = createRegl({ gl });

//   // Regl GL draw commands
//   // ...

//   // Return the renderer function
//   return ({ time }) => {
//     // Update regl sizes
//     regl.poll();

//     // Clear back buffer
//     regl.clear({
//       color: [ 0, 0, 0, 1 ]
//     });

//     // Draw meshes to scene
//     // ...
//   };
// };

// canvasSketch(sketch, settings);
