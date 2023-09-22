import React from 'react';
import { Data } from '../type';
export default React.forwardRef<HTMLVideoElement, RuntimeParams<Data>>(({ data }, ref) => {
  const { src, controls, autoplay, poster, loop } = data;
  const handleClick = () => {
    if (controls) return;
    if (ref.current.paused) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
    console.log(ref);
  };

  return (
    <video
      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'fill' }}
      controls={controls}
      autoPlay={autoplay}
      poster={poster}
      src={src}
      ref={ref}
      loop={loop}
      preload='auto'
      crossOrigin='anonymous'
      onClick={handleClick}
    />
  );
});
