import { Button, Popover } from 'antd';
import React, { useCallback, useState } from 'react';
import { Data } from '../constants';
import css from '../runtime.less';

import MenuList from './menuList';
export default function LeftContent({
  data,
  env,
  ct,
  slots
}: RuntimeParams<Data>) {
  const [activePop, setActivePop] = useState(-1);

  const onMenuClick = useCallback((index) => {
    if (env.runtime) return;
    setActivePop(index);
  }, []);


  const renderMenu = useCallback(
    ({ label, url, type }, index) => {
      switch (type) {
        case 'link':
          return (
            <Button
              data-left-menu-index={index}
              type='link'
              target='_blank'
              href={env.runtime ? url : void 0}
              onClick={() => onMenuClick(index)}
            >
              {label}
            </Button>
          );
        case 'menu':
          return (
            <Popover
              visible={env.runtime ? void 0 : index === activePop}
              getPopupContainer={() => ct.current }
              overlayClassName={css['top-menu__content--left-popover']}
              placement='bottom'
              content={<MenuList index={index} data={data} env={env} />}
              trigger={env.runtime ? 'hover' : 'click'}
            >
              <Button
                data-left-menu-index={index}
                type='link'
                key={url}
                onClick={() => onMenuClick(index)}
              >
                {label}
              </Button>
            </Popover>
          );
        case 'slot':
          return (
            <Popover
              placement='bottom'
              content={slots.menuContent?.render()}
              trigger={env.runtime ? 'hover' : 'click'}
            >
              <Button
                data-left-menu-index={index}
                type='link'
                key={url}
              >
                {label}
              </Button>
            </Popover>
          );
      }
    },
    [activePop]
  );

  return (
    <>
      <img data-logo src={data.logo} 
      style={{height:'100%', width: data.logoSize[1] }}
       />
      {data.leftMenus.map(renderMenu)}
      {/* <SearchCOM data={data} /> */}
    </>
  );
}
