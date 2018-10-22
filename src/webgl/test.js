setInterval(() => {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('webgl');
  console.log('Created');

  const ext = context.getExtension('WEBGL_lose_context');
  if (ext && typeof ext.loseContext === 'function') {
    ext.loseContext();
  }
}, 250);
