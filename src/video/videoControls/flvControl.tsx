import React, { useEffect } from 'react';
import { Data } from '../type';
export default React.forwardRef<HTMLVideoElement, RuntimeParams<Data>>(({ data }, ref) => {
  const { src, controls, autoplay, poster, loop } = data;
  //测试地址 https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv
  useEffect(() => {
    let flvPlayer;
    import('flv.js').then((Flv) => {
      if (Flv.isSupported()) {
        flvPlayer = Flv.createPlayer(
          {
            type: 'flv',
            url: src,
            isLive: true,
            hasAudio: true,
            hasVideo: true
          },
          {
            enableWorker: false
          }
        );
        flvPlayer.attachMediaElement(ref.current);
        flvPlayer.load();
        flvPlayer.play();
      }
    });
    return () => {
      flvPlayer.detachMediaElement();
      flvPlayer.destroy();
    };
  }, []);
  const handleClick = () => {
    //控制权交给controls
    if (controls) return;
    if (ref.current.paused) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
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
