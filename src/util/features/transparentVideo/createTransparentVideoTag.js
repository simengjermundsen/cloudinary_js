/**
 * @description Creates a hidden HTMLVideoElement with the specified videoOptions
 * @param {{autoplay, playsinline, loop, muted, poster, src, dataSrc }} videoOptions
 * @return {HTMLVideoElement}
 */
function createTransparentVideoTag(videoOptions) {
  let { autoplay, playsinline, loop, muted, poster, src, dataSrc} = videoOptions;

  let el = document.createElement('video');
  el.style.visibility = 'hidden';
  el.position = 'absolute';
  el.x = 0;
  el.y = 0;
  el.src = src;
  el.setAttribute('data-src', dataSrc); // for debugging/testing

  autoplay && el.setAttribute('autoplay', autoplay);
  playsinline && el.setAttribute('playsinline', playsinline);
  loop && el.setAttribute('loop', loop);
  muted && el.setAttribute('muted', muted);
  muted && (el.muted = muted); // this is also needed for autoplay, on top of setAttribute
  poster && el.setAttribute('poster', poster || '');

  // Free memory at the end of the file loading.
  el.onload = () => {
    URL.revokeObjectURL(src);
  };

  return el;
}

export default createTransparentVideoTag;