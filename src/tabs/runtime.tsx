import React, { useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { Tabs, Tooltip } from 'antd';
import { Data, InputIds, OutputIds } from './constants';
import css from './style.less';

const { TabPane } = Tabs;

export default function ({
  env,
  data,
  slots,
  inputs,
  outputs
}: RuntimeParams<Data>) {
  const ref = useRef<any>();

  useEffect(() => {
    if (data.activeLineStyle && ref.current) {
      const lineEle: HTMLElement =
        ref.current.querySelector('.ant-tabs-ink-bar');
      if (lineEle) {
        Object.keys(data.activeLineStyle).forEach((key) => {
          lineEle.style[key] = data.useCustomActiveLine
            ? data.activeLineStyle[key]
            : '';
        });
      }
    }
  }, [data.useCustomActiveLine, ref.current, data.activeLineStyle]);

  useEffect(() => {
    if (data.tabList.length > 0 && !data.active) {
      data.defaultActiveKey = data.tabList[0].key;
    }
    if (env.runtime) {
      // 激活
      inputs[InputIds.SetActiveTab] &&
        inputs[InputIds.SetActiveTab]((id) => {
          const activeTab = data.tabList.find((item) => {
            return item.name === id || item.id === id;
          });
          if (activeTab) {
            data.defaultActiveKey = activeTab.key;
            data.active = true;
          } else {
            data.defaultActiveKey = null;
            data.active = false;
          }
        });
      // 上一页
      inputs[InputIds.PreviousTab] &&
        inputs[InputIds.PreviousTab](() => {
          const currentIndex = data.tabList.findIndex((item) => {
            return item.key === data.defaultActiveKey;
          });
          if (data.tabList[currentIndex - 1]) {
            data.defaultActiveKey = data.tabList[currentIndex - 1].key;
          }
        });
      // 下一页
      inputs[InputIds.NextTab] &&
        inputs[InputIds.NextTab](() => {
          const currentIndex = data.tabList.findIndex((item) => {
            return item.key === data.defaultActiveKey;
          });
          if (data.tabList[currentIndex + 1]) {
            data.defaultActiveKey = data.tabList[currentIndex + 1].key;
          }
        });
      inputs[InputIds.OutActiveTab] &&
        inputs[InputIds.OutActiveTab](() => {
          const current = data.tabList.filter(
            (item) => item.key === data.defaultActiveKey
          )[0];
          outputs[OutputIds.OutActiveTab](
            current?.outputContent || current?.name
          );
        });
    }
  }, []);

  const handleClickItem = useCallback((tabKey) => {
    if (env.runtime && outputs && outputs[OutputIds.OnTabClick]) {
      const current = data.tabList.filter((item) => item.key === tabKey)[0];
      outputs[OutputIds.OnTabClick](current?.outputContent || current?.name);
    }
    data.defaultActiveKey = tabKey;
  }, []);

  const renderItemTabTitle = (item) => {
    const { key, useActiveImg, activeImgUrl, activeImgStyle } = item;
    const isActive = data.defaultActiveKey === key;
    const style = Object.assign(
      {},
      item.style,
      isActive ? item.activeStyle : {}
    );

    const imgUrl = useActiveImg && isActive ? activeImgUrl : item.imgUrl;
    const imgStyle = useActiveImg && isActive ? activeImgStyle : item.imgStyle;

    return (
      <Tooltip title={item.tooltipText}>
        <div
          style={style}
          className={css.tabTitle}
          onMouseOver={() => {
            data.changeWhenHover && handleClickItem(key);
          }}
        >
          {imgUrl ? <img src={imgUrl} style={imgStyle} /> : null}
          <div>{item.name}</div>
        </div>
      </Tooltip>
    );
  };
  const renderItems = () => {
    return (
      <>
        {data.tabList.map((item) => {
          return (
            <TabPane
              tab={renderItemTabTitle(item)}
              key={item.key}
              closable={!!item.closable}
            >
              {data.hideSlots ? null : (
                <div
                  className={classnames(css.content, env.edit && css.minHeight)}
                >
                  {slots[item.key].render()}
                </div>
              )}
            </TabPane>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={classnames(
        css.tabbox,
        data.hideBorder ? css.hideBorder : css.showBorder,
        data.hidePadding ? css.hidePadding : css.showPadding
      )}
      ref={ref}
    >
      <Tabs
        tabBarStyle={data.tabBarStyle}
        activeKey={data.defaultActiveKey}
        type={data.type}
        centered={data.centered}
        tabPosition={data.tabPosition}
        onChange={handleClickItem}
        hideAdd={true}
        tabBarGutter={data.tabBarGutter}
      >
        {renderItems()}
      </Tabs>
    </div>
  );
}
