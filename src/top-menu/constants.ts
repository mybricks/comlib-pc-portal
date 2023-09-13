export interface Data {
  rightButtons: any[]
  rightPopoverButtons: any[]
  leftMenus: any[]
  logo: string
  contentWidth: string | number
  rightMenuType: 'default' | 'slot',
  src: string,
  name: string,
  backgroundColor: string,
  contentHeight: string | number,
  isShow: boolean,
  style: Style,
  logoSize: number[]
}

export interface Style {
  fontWeight?: number;
  fontSize: string;
  fontStyle: string;
  letterSpacing: string;
  color: string;
}