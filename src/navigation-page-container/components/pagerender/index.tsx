import React, { useRef, useState, useEffect } from 'react';

import { Spin } from 'antd';
import _debounce from 'lodash/debounce';

import { loadApp, loadInvalidApp } from '../../utils/qiankun-polyfill';

import styles from './index.less';

class AppManager {
  private microApps: { curApp: any; appMap: { [keyName: string]: any } } = {
    curApp: null as any as any,
    appMap: {}
  };

  private _switch = async (nextApp) => {
    console.log('switch -> unmount')
    await this.unmountCurApp();
    console.log(`nextApp`, this.microApps.appMap, nextApp)
    if (!!this.microApps.appMap[nextApp?.name]) {
      await this.microApps.appMap[nextApp?.name].mount({ container: nextApp.container });
      // @ts-ignore
      this.microApps.curApp = this.microApps.appMap[nextApp?.name];
      this.microApps.curApp.name = nextApp?.name
    } else if (!this.microApps.appMap[nextApp?.name]) {
      // @ts-ignore
      this.nextApp = nextApp;
      if (!!window[`__comlibs_rt_`]) {
        delete window[`__comlibs_rt_`]
      }
      this.microApps.curApp = loadApp(nextApp);
      this.microApps.curApp.name = nextApp?.name
      this.microApps.appMap[nextApp?.name] = this.microApps.curApp
    }
  }
    ;

  unmountCurApp = async () => {
    if (!this.microApps?.curApp) {
      return Promise.resolve();
    }

    if (this.microApps?.curApp.getStatus?.() === 'MOUNTED') {
      console.log('begin to unmount', this.microApps.curApp?.unloadApp)
      return this.microApps.curApp?.unmount?.();
    }
    return Promise.resolve();
  };

  switchApp = async (nextApp) => {
    console.log(`switchApp`, nextApp, this.microApps?.curApp)
    if (!nextApp?.name) {
      console.error(`next app name should not be empty`)
      return
    }
    if (this.microApps?.curApp?.name === nextApp.name) {
      return
    }

    return this._switch(nextApp);
  };

  switchInvalidApp = async ({ container }) => {
    await this.unmountCurApp?.();
    this.microApps.curApp = loadInvalidApp?.({ container });
    return Promise.resolve();
  };

  get curApp() {
    const curApp = this.microApps.curApp;

    return curApp
  }
}

// const appManager = new AppManager();

export function PageRender({ env, pageUrl }) {
  const eleRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const appManagerRef = useRef(new AppManager())
  useEffect(() => {
    if (!pageUrl) {
      console.warn('[micro app] invalid app,url is required');
      appManagerRef.current.switchInvalidApp({ container: eleRef.current });
    } else {
      setLoading(true);
      console.log(`appManager`, appManagerRef.current.curApp)
      appManagerRef.current
        .switchApp({ name: pageUrl, entry: pageUrl, container: eleRef.current, activeRule: () => true })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          let time = setInterval(() => {
            if (
              appManagerRef.current.curApp &&
              pageUrl === appManagerRef.current.curApp.name &&
              appManagerRef.current.curApp.getStatus?.() === 'MOUNTED'
            ) {
              clearInterval(time);
              // @ts-ignore
              time = null;
              setLoading(false);
            }
          }, 100);
        });
    }
  }, [pageUrl]);

  return (
    <div className={styles.pageRender}>
      <Spin spinning={loading} tip="加载中...">
        {env.edit ? (
          <div className={styles.tip}>这里是页面渲染区域</div>
        ) : (
          <div className={styles.rtMountNode} ref={eleRef} />
        )}
      </Spin>
    </div>
  );
}
