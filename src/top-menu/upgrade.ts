import { Data } from './constants';

export default function ({
  slot,
  data,
  input
}: UpgradeParams<Data>): boolean {

  /* 1.0.10 -> 1.0.11 */
  if (!slot['topActions']) {
    slot.add('topActions', '顶部自定义内容');
  }

  /* 1.0.12 -> 1.0.13 */
  if(typeof data.src === 'undefined'){
    data.src = 'https://cdn.pixabay.com/photo/2013/05/12/18/55/balance-110850__480.jpg';
  }
  if(typeof data.name === 'undefined'){
    data.name = 'username'
  }

  if (!input.get('headSrc')) {
    input.add('headSrc', '设置头像地址', { type: 'string' })
  }
  if (!input.get('userName')) {
    input.add('userName', '设置头像名称', { type: 'string' })
  }
  /* 1.0.13 -> 1.0.14 */
  if(typeof data.backgroundColor === 'undefined'){
    data.backgroundColor = "#434343"
  }
  if(typeof data.contentHeight === 'undefined'){
    data.contentHeight = '64px'
  }
  if(typeof data.isShow === 'undefined'){
    data.isShow = true
  }

  /* 1.0.14 -> 1.0.15 */
  if(typeof data.style === 'undefined'){
    data.style = {
        fontWeight: 400,
        fontSize: "16px",
        fontStyle: "normal",
        letterSpacing: "0px",
        color: "#fff"
    }
  }
  if(typeof data.logoSize === 'undefined'){
    data.logoSize = [32, 86]
  }
  return true;
}
