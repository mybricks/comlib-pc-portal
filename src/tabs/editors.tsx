import { uuid } from '../utils';
import { Data, PositionEnum } from './constants';

export default {
  ':root': ({}: EditorResult<Data>, cate1, cate2) => {
    cate1.title = '常规';
    cate1.items = [
      {
        title: '添加标签页',
        type: 'Button',
        value: {
          set({ data, slot }: EditorResult<Data>) {
            const key = uuid();
            const title = `新标签页`;
            slot.add(`${key}`, `${title}内容`);
            const len = data.tabList.length;
            data.tabList.push({
              name: title,
              key: key,
              id: `tab${len}`,
              style: {
                lineHeight: '22px'
              },
              activeStyle: {
                color: '#0075ff',
                lineHeight: '22px'
              }
            });
          }
        }
      },
      {
        title: 'hover时切换',
        type: 'Switch',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.changeWhenHover;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.changeWhenHover = value;
          }
        }
      }
    ];
    cate2.title = '样式';
    cate2.items = [
      {
        title: '外观',
        type: 'Select',
        options: [
          { value: 'card', label: '卡片' },
          { value: 'line', label: '简约' }
        ],
        value: {
          get({ data }: EditorResult<Data>) {
            return data.type;
          },
          set({ data }: EditorResult<Data>, value: string) {
            data.type = value;
          }
        }
      },
      {
        title: 'tabs之间的间隙',
        type: 'Text',
        options: {
          placeholder: 'tabs之间的间隙',
          type: 'number'
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.tabBarGutter;
          },
          set({ data }: EditorResult<Data>, value: number) {
            data.tabBarGutter = Number(value) || 0;
          }
        }
      },
      {
        title: '页签位置',
        type: 'Select',
        options: [
          { label: '上', value: PositionEnum.Top },
          { label: '左', value: PositionEnum.Left },
          { label: '右', value: PositionEnum.Right },
          { label: '下', value: PositionEnum.Bottom }
        ],
        value: {
          get({ data }: EditorResult<Data>) {
            return data.tabPosition || PositionEnum.Top;
          },
          set({ data }: EditorResult<Data>, value: PositionEnum) {
            data.tabPosition = value;
          }
        }
      },
      {
        title: '标签居中',
        type: 'Switch',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.centered;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.centered = value;
          }
        }
      },
      {
        title: '头部样式',
        type: 'Style',
        options: {
          plugins: ['Padding', 'border', 'BgColor']
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.tabBarStyle;
          },
          set({ data }: EditorResult<Data>, value: any) {
            data.tabBarStyle = value;
          }
        }
      },
      {
        title: '隐藏tab上下间距',
        type: 'Switch',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.hidePadding;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.hidePadding = value;
          }
        }
      },
      {
        title: '隐藏tab底部线',
        type: 'Switch',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.hideBorder;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.hideBorder = value;
          }
        }
      },
      {
        title: '隐藏插槽占位',
        type: 'Switch',
        value: {
          get({ data }: EditorResult<Data>) {
            return !!data.hideSlots;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.hideSlots = value;
          }
        }
      },
      {
        title: '自定义激活线',
        type: 'Switch',
        ifVisible({ data }: EditorResult<Data>) {
          return data.type === 'line';
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.useCustomActiveLine;
          },
          set({ data }: EditorResult<Data>, value: boolean) {
            data.useCustomActiveLine = value;
          }
        }
      },
      {
        title: '激活线配置',
        type: 'Style',
        options: {
          plugins: ['BgColor']
        },
        ifVisible({ data }: EditorResult<Data>) {
          return data.type === 'line' && data.useCustomActiveLine;
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.activeLineStyle;
          },
          set({ data }: EditorResult<Data>, value: any) {
            data.activeLineStyle = value;
          }
        }
      }
    ];

    return { title: 'Tabs' };
  },
  '.ant-tabs-tab': ({}: EditorResult<Data>, cate1, cate2) => {
    cate1.title = '常规';
    cate1.items = [
      {
        title: '名称',
        type: 'Text',
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            const { index } = focusArea;
            return data.tabList[index]?.name;
          },
          set({ data, slot, focusArea }: EditorResult<Data>, title: string) {
            const { index } = focusArea;
            const item = data.tabList[index];
            item.name = title;

            slot.setTitle(item.key, title);
          }
        }
      },
      {
        title: '唯一标识',
        type: 'Text',
        value: {
          get({ data, focusArea }: EditorResult<Data>) {
            const { index } = focusArea;
            return data.tabList[index]?.id;
          },
          set({ data, focusArea }: EditorResult<Data>, value: string) {
            const { index } = focusArea;
            const item = data.tabList[index];
            item.id = value;
          }
        }
      },
      {
        title: '向前移动',
        type: 'Button',
        value: {
          get({ focusArea }: EditorResult<Data>) {
            return focusArea.index;
          },
          set({ data, focusArea }: EditorResult<Data>) {
            const { index } = focusArea;
            const { tabList } = data;
            if (index === 0) return;
            [tabList[index - 1], tabList[index]] = [
              tabList[index],
              tabList[index - 1]
            ];
          }
        }
      },
      {
        title: '向后移动',
        type: 'Button',
        value: {
          get({ focusArea }: EditorResult<Data>) {
            return focusArea.index;
          },
          set({ data, focusArea }: EditorResult<Data>) {
            const { index } = focusArea;
            const { tabList } = data;
            if (index === tabList.length - 1) return;
            [tabList[index], tabList[index + 1]] = [
              tabList[index + 1],
              tabList[index]
            ];
          }
        }
      },
      {
        title: '删除',
        type: 'Button',
        value: {
          get({ focusArea }: EditorResult<Data>) {
            return focusArea.index;
          },
          set({ data, focusArea, slot }: EditorResult<Data>) {
            slot.remove(data.tabList[focusArea.index]?.key);
            data.tabList.splice(focusArea.index, 1);
          }
        }
      }
    ];

    cate2.title = '样式';
    cate2.items = [
      {
        title: '标题样式',
        catelogChange: {
          value: {
            get({ data, focusArea }: EditorResult<Data>) {
              if (!focusArea) return;
              const { index } = focusArea;
              return data.tabList[index]?.styleCatelog;
            },
            set({ data, focusArea, catelog }: EditorResult<Data>) {
              if (!focusArea) return;
              const { index } = focusArea;
              data.tabList[index].styleCatelog = catelog;
            }
          }
        },
        items: [
          {
            type: 'Style',
            catelog: '默认样式',
            options: {
              plugins: [
                'Size',
                'Padding',
                'Font',
                'Border',
                'BgColor',
                'BgImage'
              ]
            },
            value: {
              get({ data, focusArea }: EditorResult<Data>) {
                if (!focusArea) return;
                const { index } = focusArea;
                return data.tabList[index]?.style;
              },
              set({ data, focusArea }: EditorResult<Data>, value: any) {
                if (!focusArea) return;
                const { index } = focusArea;
                data.tabList[index].style = value;
              }
            }
          },
          {
            type: 'Style',
            catelog: '激活样式',
            options: {
              plugins: ['Font', 'BgColor', 'BgImage']
            },
            value: {
              get({ data, focusArea }: EditorResult<Data>) {
                if (!focusArea) return;
                const { index } = focusArea;
                return data.tabList[index]?.activeStyle;
              },
              set({ data, focusArea }: EditorResult<Data>, value: any) {
                if (!focusArea) return;
                const { index } = focusArea;
                data.tabList[index].activeStyle = value;
              }
            }
          }
        ]
      },
      {
        title: '应用所有tabs',
        type: 'Button',
        value: {
          set({ data, focusArea }: EditorResult<Data>) {
            if (!focusArea) return;
            const { index } = focusArea;
            const currItem = data.tabList[index];
            data.tabList.forEach((item) => {
              item.style = {
                ...currItem.style
              };
              item.activeStyle = {
                ...currItem.activeStyle
              };
            });
          }
        }
      },
      {
        title: '图片配置',
        items: [
          {
            title: '区分默认/激活',
            type: 'Switch',
            value: {
              get({ data, focusArea }: EditorResult<Data>) {
                if (!focusArea) return;
                const { index } = focusArea;
                return data.tabList[index]?.useActiveImg;
              },
              set({ data, focusArea }: EditorResult<Data>, value: boolean) {
                if (!focusArea) return;
                const { index } = focusArea;
                data.tabList[index].useActiveImg = value;
              }
            }
          },
          {
            title: '图片',
            type: 'ImageSelector',
            ifVisible({ data, focusArea }: EditorResult<Data>) {
              if (!focusArea) return;
              const { index } = focusArea;
              return !data.tabList[index]?.useActiveImg;
            },
            value: {
              get({ data, focusArea }: EditorResult<Data>) {
                if (!focusArea) return;
                const { index } = focusArea;
                return data.tabList[index]?.imgUrl;
              },
              set({ data, focusArea }: EditorResult<Data>, value: string) {
                if (!focusArea) return;
                const { index } = focusArea;
                data.tabList[index].imgUrl = value;
              }
            }
          },
          {
            title: '大小',
            type: 'Style',
            options: {
              plugins: ['Size']
            },
            ifVisible({ data, focusArea }: EditorResult<Data>) {
              if (!focusArea) return;
              const { index } = focusArea;
              return !data.tabList[index]?.useActiveImg;
            },
            value: {
              get({ data, focusArea }: EditorResult<Data>) {
                if (!focusArea) return;
                const { index } = focusArea;
                return (
                  data.tabList[index]?.imgStyle || {
                    width: 'auto',
                    height: 'auto'
                  }
                );
              },
              set({ data, focusArea }: EditorResult<Data>, value: any) {
                if (!focusArea) return;
                const { index } = focusArea;
                data.tabList[index].imgStyle = value;
              }
            }
          },
          {
            ifVisible({ data, focusArea }: EditorResult<Data>) {
              if (!focusArea) return;
              const { index } = focusArea;
              return !!data.tabList[index]?.useActiveImg;
            },
            catelogChange: {
              value: {
                get({ data, focusArea }: EditorResult<Data>) {
                  if (!focusArea) return;
                  const { index } = focusArea;
                  return data.tabList[index]?.imgCatelog;
                },
                set({ data, focusArea, catelog }: EditorResult<Data>) {
                  if (!focusArea) return;
                  const { index } = focusArea;
                  data.tabList[index].imgCatelog = catelog;
                }
              }
            },
            items: [
              {
                catelog: '默认配置',
                title: '图片',
                type: 'ImageSelector',
                value: {
                  get({ data, focusArea }: EditorResult<Data>) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    return data.tabList[index]?.imgUrl;
                  },
                  set({ data, focusArea }: EditorResult<Data>, value: string) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    data.tabList[index].imgUrl = value;
                  }
                }
              },
              {
                catelog: '默认配置',
                title: '大小',
                type: 'Style',
                options: {
                  plugins: ['Size']
                },
                value: {
                  get({ data, focusArea }: EditorResult<Data>) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    return (
                      data.tabList[index]?.imgStyle || {
                        width: 'auto',
                        height: 'auto'
                      }
                    );
                  },
                  set({ data, focusArea }: EditorResult<Data>, value: any) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    data.tabList[index].imgStyle = value;
                  }
                }
              },
              {
                catelog: '激活配置',
                title: '图片',
                type: 'ImageSelector',
                value: {
                  get({ data, focusArea }: EditorResult<Data>) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    return data.tabList[index]?.activeImgUrl;
                  },
                  set({ data, focusArea }: EditorResult<Data>, value: string) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    data.tabList[index].activeImgUrl = value;
                  }
                }
              },
              {
                catelog: '激活配置',
                title: '大小',
                type: 'Style',
                options: {
                  plugins: ['Size']
                },
                value: {
                  get({ data, focusArea }: EditorResult<Data>) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    return (
                      data.tabList[index]?.activeImgStyle || {
                        width: 'auto',
                        height: 'auto'
                      }
                    );
                  },
                  set({ data, focusArea }: EditorResult<Data>, value: any) {
                    if (!focusArea) return;
                    const { index } = focusArea;
                    data.tabList[index].activeImgStyle = value;
                  }
                }
              }
            ]
          }
        ]
      }
    ];

    return { title: '标签页' };
  }
};
