import React, { useEffect, useState, useRef } from 'react';
import { RightOutlined } from '@ant-design/icons';
import css from '../runtime.less';

const list = [
  {
    title: '最近使用',
    items: [
      { title: '流程中心', url: 'http://k.com' },
      { title: '团队协作工具', url: 'http://k.com' },
      { title: '配置管理', url: 'http://k.com' },
      { title: '业务监控', url: 'http://k.com' },
    ],
  },
  {
    title: '业务平台接入指南',
    items: [
      { title: '产品首页注册指南', url: 'http://k.com' },
      { title: '控制台接入与共建手册', url: 'http://k.com' },
      { title: '权限中心', url: 'http://k.com' }
    ],
  },
];
export default function MenuList({ data, index, env }) {
  const [indexConfig, setIndexConfig] = useState({
    mainIndex: index,
    subIndex: 0,
  });

  const popOverRef = useRef();

  const onMouseOver = (config: any) => {
    setIndexConfig(config);
  };

  useEffect(() => {
    const { contentWidth = 1440 } = data;
    popOverRef.current.style.width = String(contentWidth).trim().endsWith('%')
    ? contentWidth
    : `${contentWidth}px`;
  }, [data.contentWidth]);

  const MidMenus = () => {
    const { mainIndex, subIndex } = indexConfig;
    return data.leftMenus[mainIndex].menus[subIndex].subMenus.map(
      ({ label, url }, index) => {
        return (
          <a
            data-left-menu-item-index={JSON.stringify({ ...indexConfig, itemIndex: index})}
            target='_blank'
            className={css['pop-over-content__mid--item']}
            href={env.runtime ? url || void 0 : void 0}
          >
            {label}
          </a>
        );
      }
    );
  };

  const recentUse = () => {
    return list.map(({ title, items }) => (
      <div className={css['pop-over-content__right--item']}>
        <p>{title}</p>
        {items.map(({ title, url }) => (
          <div>
            <a target="_blank" href={env.runtime ? url || void 0 : void 0}>{title}</a>
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className={css['pop-over-container']}>
      <div className={css['pop-over-content']} ref={popOverRef}>
        <section className={css['pop-over-content__left']}>
          {data.leftMenus[index].menus.map((item, subIndex) => (
            <div
              data-parent-menu-index={index}
              data-submenu-index={subIndex}
              onMouseOver={() => onMouseOver({ mainIndex: index, subIndex })}
              className={`${css['pop-over-content__left--item']} ${subIndex===indexConfig.subIndex ? css['pop-over-content__left--item-active'] : ''}`}
            >
              <span>{item.label}</span>
              <RightOutlined />
            </div>
          ))}
        </section>
        <section className={css['pop-over-content__mid']}>
          <MidMenus />
        </section>
        <section className={css['pop-over-content__right']}>
        </section>
      </div>
    </div>
  );
}
