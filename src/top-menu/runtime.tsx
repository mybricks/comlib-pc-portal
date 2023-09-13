import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Data } from './constants';
import css from './runtime.less';
import RightContent from './component/rightContent';
import LeftContent from './component/leftContent';

export default ({ env, data, slots, inputs }: RuntimeParams<Data>) => {
  const containerRef = useRef();
  const [sticky, setSticky] = useState(false);
  const ctRef = useRef();

  useEffect(() => {
    if (env.runtime && inputs['headSrc']) {
      inputs['headSrc']((val: string) => {
        data.src = val;
      });
    }
  }, []);
  
  useEffect(() => {
    if (env.runtime && inputs['userName']) {
      inputs['userName']((val: string) => {
        data.name = val;
      });
    }
  }, []);

  useEffect(() => {
    function setBg() {
      const distance =
        containerRef.current.offsetTop - document.documentElement.scrollTop;
      if (distance < 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
    document.addEventListener('scroll', setBg);

    return () => {
      document.removeEventListener('scroll', setBg);
    };
  }, []);

  useEffect(() => {
    const comCt = containerRef.current.parentElement;
    comCt.style.height = data.contentHeight || '64px';
    containerRef.current.parentElement.style.zIndex = 1000;
    if (env.edit) {
      // @ts-ignore
      comCt.parentNode.previousElementSibling?.style.display = 'flex';
    } else {
      // @ts-ignore
      comCt.parentNode.previousElementSibling?.style.display = 'none';
    }
    document.body.style.setProperty('--portal--contentHeight', data.contentHeight as any);
  }, [data.contentHeight]);

  useEffect(() => {
    const { contentWidth = 1440 } = data;
    ctRef.current?.style.width = String(contentWidth).trim().endsWith('%')
      ? contentWidth
      : `${contentWidth}px`;
  }, [data.contentWidth]);

  useEffect(() => {
    document.body.style.setProperty('--portal--color', data.style.color);
    document.body.style.setProperty('--portal--fontSize', data.style.fontSize);
    document.body.style.setProperty('--portal--fontStyle', data.style.fontStyle);
    document.body.style.setProperty('--portal--letterSpacing', data.style.letterSpacing);
    document.body.style.setProperty('--portal--fontWeight', data.style.fontWeight as any);
  }, [data.style])

  useEffect(() => {
    document.body.style.setProperty('--portal--backgroundColor', data.backgroundColor);
  }, [data.backgroundColor])

  return (
      <div
      className={`${css['top-menu']} ${sticky ? css['top-menu-sticky'] : ''}`}
      style={{
             height: data.contentHeight
             }}
      ref={containerRef}
    >
      <div className={css['top-menu__content']}>
        <div ref={ctRef} className={css['top-menu__content--ct']}>
          <div
            className={`${css['top-menu__content--left']} ${
              sticky ? css['top-menu__content--left-sticky'] : ''
            }`}
            style={{height: data.logoSize[0]}}
          >
            <LeftContent
              data={data}
              env={env}
              ct={containerRef}
              slots={slots}
            />
          </div>
          <div
            className={`${css['top-menu__content--right']} ${
              sticky ? css['top-menu__content--right-sticky'] : ''
            }`}
          >
            <RightContent data={data} env={env} slots={slots} />
          </div>
        </div>
      </div>
    </div>
  );
};
