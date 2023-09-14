/**
 * 标签页配置项
 * @param key 唯一id
 * @param name 名称
 */
export interface TabList {
  key: string;
  name: string;
  closable?: boolean;
  showIcon?: boolean;
  dynamic?: boolean;
  num?: number | string;
  outputContent?: string;
  permissionKey?: string;
  id?: string;

  tooltipText?: string;
  style?: any;
  activeStyle?: any;
  styleCatelog?: string;

  imgCatelog?: string;
  imgUrl?: string;
  imgStyle?: any;
  activeImgUrl?: string;
  activeImgStyle?: any;
  useActiveImg?: boolean;
}
/**
 * 数据源
 * @param type 类型（外观）
 * @param centered 标签是否居中
 * @param tabList 标签页配置数组
 * @param prohibitClick 是否禁止点击切换tab
 * @param defaultActiveKey 当前tab的key值
 * @param tabPosition 标签未知
 */
export interface Data {
  type: any;
  centered: boolean;
  tabList: TabList[];
  prohibitClick: boolean;
  defaultActiveKey: string;
  tabPosition: 'left' | 'top' | 'bottom' | 'right';
  hideAdd?: boolean;
  hideSlots?: boolean;
  active?: boolean;

  useLeftExtra?: boolean;
  useRigthExtra?: boolean;
  tabBarGutter?: number;
  changeWhenHover?: boolean;

  tabBarStyle?: any;
  hideBorder?: boolean;
  activeLineStyle?: any;
  useCustomActiveLine?: boolean;
  hidePadding?: boolean;
}

export enum SlotIds {
  LeftExtra = 'leftExtra',
  RigthExtra = 'rigthExtra'
}

export enum InputIds {
  SetActiveTab = 'active',
  PreviousTab = 'previous',
  NextTab = 'next',
  OutActiveTab = 'outActiveTab'
}

export enum OutputIds {
  OnTabClick = 'tabClick',
  OutActiveTab = 'outActiveTab'
}

export enum PositionEnum {
  Left = 'left',
  Top = 'top',
  Bottom = 'bottom',
  Right = 'right'
}
