import { Button,Dropdown, Menu, Popover } from 'm-ui';
import React, { useEffect, useState, useMemo } from 'react';
import { Data } from '../constants';
import css from '../runtime.less';

export default function RightContent({ data, env, slots }: RuntimeParams<Data>) {
  const popoverTitle = useMemo(
    () => (
      <div className={css['top-menu__content--right-popover']}>
        <img src={data.src} />
        <span>{data.name}</span>
      </div>
    ),
    [data.src, data.name]
  );

  const popoverContent = (
    <Menu>
      {data.rightPopoverButtons.map(({ label, url }, index) => (
        <Menu.Item key={url+index}>
          <a href={env.runtime ? url : void 0} target='_blank'>
            {label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <>
      {data.rightMenuType === 'default' ?
        data.rightButtons.map(({ label, url }, index) => (
        <Button data-right-menu-index={index} type='link' key={url + index} target='_blank' href={env.runtime ? url : void 0}>
          {label}
        </Button>
        ))
        :
        slots['topActions'].render()
      }
      {data.isShow === true ? 
      <Popover trigger={env.runtime ? 'hover' : 'click'} title={popoverTitle} placement='bottomRight' content={popoverContent}>
        <img data-popover-img src={data.src} />
      </Popover> :
      void 0
      }
    </>
  );
}
