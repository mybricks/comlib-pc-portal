import { Data } from './constants';

export default {
  ':root': ({ data }: EditorResult<Data>, cate1, cate2, cate3) => {
    cate1.title = '基础配置';
    cate1.items = [
      {
        title: '菜单宽度',
        type: 'text',
        value: {
          get({ data }) {
            return data.contentWidth || 1440;
          },
          set({ data }, value: string) {
            data.contentWidth = value;
          }
        }
      },
      {
        title: '菜单高度',
        type: 'text',
        value: {
          get({ data }: EditorResult<Data>) {
            return String(data.contentHeight);
          },
          set({ data }, value: string) {
            if (/^\d+$/.test(value)) {
              data.contentHeight = `${value}px`;
            } else {
              data.contentHeight = value;
            }
          }
        }
      },
      {
        title: '背景色',
        type: 'colorPicker',
        value: {
          get({ data }) {
            return data.backgroundColor;
          },
          set({ data }, value:string){
            data.backgroundColor = value;
          }
        }
      },
      {
        title: "文本样式",
        type: "Style",
        options: {
          plugins: ["font"],
          fontProps: {
             letterSpace: true,
             fontFamily: false
          },
        },
        value: {
          get({ data }) {
            return data.style;
          },
          set({ data }, value) {
            data.style = {
              ...data.style,
              ...value,
            };
          },
        },
      },
      {
        title: '显示头像',
        type: 'switch',
        value: {
          get({ data }) {
            return data.isShow;
          },
          set({ data, input }, value: boolean){
            data.isShow = value;
          }
        }
      },
      {
        title: '左侧主菜单',
        type: 'array',
        options: {
          getTitle: ({ label }) => {
            return label;
          },
          onAdd: () => {
            const defaultLeftMenu = {
              label: `名称${data.leftMenus.length + 1}`,
              type: 'menu',
              menus: [
                {
                  label: '菜单名称',
                  subMenus: [{ label: '子菜单', url: 'http://k.com' }],
                },
              ],
            };
            return defaultLeftMenu;
          },
          items: [
            {
              title: '菜单名称',
              type: 'text',
              value: 'label'
            },
            {
              title: '类型',
              type: 'select',
              options: [
                { label: '菜单', value: 'menu' },
                { label: '链接', value: 'link' }
              ],
              value: 'type'
            }
          ]
        },
        value: {
          get({ data }: EditorResult<Data>) {
            return data.leftMenus;
          },
          set({ data }: EditorResult<Data>, value) {
            data.leftMenus = value;
          }
        }
      },
      {
        title: '右侧主菜单',
        items: [
          {
            title: '类型',
            type: 'select',
            options: [
              { label: '文字链接', value: 'default' },
              { label: '自定义内容', value: 'slot' }
            ],
            value: {
              get({ data }: EditorResult<Data>) {
                if (!data.rightMenuType) {
                  data.rightMenuType = 'default';
                }
                return data.rightMenuType;
              },
              set({ data }: EditorResult<Data>, value: 'default' | 'slot') {
                data.rightMenuType = value;
              }
            }
          },
          {
            title: '链接配置',
            type: 'array',
            ifVisible({ data }: EditorResult<Data>) {
              return data.rightMenuType === 'default';
            },
            options: {
              getTitle: ({ label }) => {
                return label;
              },
              onAdd: () => {
                const defaultRightMenu = {
                  label: `名称${data.rightButtons.length + 1}`,
                  url: 'http://k.com',
                };
                return defaultRightMenu;
              },
              items: [
                {
                  title: '菜单名称',
                  type: 'text',
                  value: 'label'
                },
                {
                  title: '跳转地址',
                  type: 'textarea',
                  value: 'url'
                },
              ]
            },
            value: {
              get({ data }: EditorResult<Data>) {
                return data.rightButtons;
              },
              set({ data, focusArea }: EditorResult<Data>, value) {
                data.rightButtons = value;
              }
            }
          }
        ]
      }
    ]
    return { title: '顶部菜单' };
  },
  '[data-logo]'({ data }, cate1) {
    cate1.title = 'Logo配置';
    cate1.items = [
      {
        type: 'imageSelector',
        value: {
          get({ data }) {
            return data.logo
          },
          set({ data }, url: string) {
            data.logo = url;
          }
        }
      },
      {
        title: '尺寸',
        type: 'InputNumber',
        options: [
          { title: '高度', min: 0, width: 100 },
          { title: '宽度', min: 0, width: 100 }
        ],
        value: {
          get({ data }) {
            return data.logoSize || [86, 32];
          },
          set({ data }, value: [number, number]) {
            data.logoSize = value;
          }
        }
      },
    ]
  },
  // 左侧主菜单
  '[data-left-menu-index]': (
    { data, focusArea }: EditorResult<Data>,
    cate1
  ) => {
    if (!focusArea) return;
    const { index } = focusArea;
    cate1.title = '左侧主菜单';
    cate1.items = [
      {
        title: '菜单名称',
        type: 'text',
        value: {
          get({ data }: EditorResult<any>) {
            return data.leftMenus[index].label;
          },
          set({ data }: EditorResult<any>, value: string) {
            data.leftMenus[index].label = value;
          },
        },
      },
      {
        title: '跳转地址',
        type: 'textarea',
        value: {
          get({ data }: EditorResult<any>) {
            return data.leftMenus[index].url;
          },
          set({ data }: EditorResult<any>, value: string) {
            data.leftMenus[index].url = value;
          },
        },
      },
      {
        title: '类型',
        type: 'select',
        options: [
          { label: '菜单', value: 'menu' },
          { label: '链接', value: 'link' }
        ],
        value: {
          get({ data }: EditorResult<any>) {
            return data.leftMenus[index].type;
          },
          set({ data }: EditorResult<any>, value: string) {
            data.leftMenus[index].type = value;
          },
        },
      },
      {
        title: '删除该项',
        type: 'button',
        value: {
          set({ data }: EditorResult<any>) {
            data.leftMenus.splice(index, 1);
          },
        },
      },
      {
        title: '添加一项',
        type: 'button',
        value: {
          set({ data }: EditorResult<Data>) {
            data.leftMenus.push({
              label: `名称${data.leftMenus.length + 1}`,
              type: 'menu',
              menus: [
                {
                  label: '菜单名称',
                  subMenus: [{ label: '子菜单', url: 'http://k.com' }],
                },
              ],
            });
          },
        },
      },
    ];
  },

  // 左侧二级菜单
  '[data-submenu-index]': ({ data, focusArea }: EditorResult<Data>, cate1) => {
    if (!focusArea) return;
    const { parentMenuIndex, submenuIndex } = focusArea.dataset;
    cate1.title = '二级菜单配置';
    cate1.items = [
      {
        title: '菜单名称',
        type: 'text',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.leftMenus[parentMenuIndex].menus[submenuIndex].label;
          },
          set({ data }: EditorResult<Data>, value: string) {
            data.leftMenus[parentMenuIndex].menus[submenuIndex].label = value;
          },
        },
      },
      {
        title: '删除该项',
        type: 'button',
        value: {
          set({ data }: EditorResult<any>) {
            data.leftMenus[parentMenuIndex].menus.splice(submenuIndex, 1);
          },
        },
      },
      {
        title: '添加一项',
        type: 'button',
        value: {
          set({ data }: EditorResult<Data>) {
            data.leftMenus[parentMenuIndex].menus.push({
              label: `名称${data.rightButtons.length + 1}`,
              subMenus: [{ label: '子菜单', url: 'http://k.com' }],
            });
          },
        },
      },
    ];
  },

  // 左侧二级菜单的子菜单
  '[data-left-menu-item-index]': (
    { data, focusArea }: EditorResult<Data>,
    cate1
  ) => {
    if (!focusArea) return;
    const { mainIndex, subIndex, itemIndex } = JSON.parse(
      focusArea.dataset.leftMenuItemIndex
    );
    cate1.title = '子菜单配置';
    cate1.items = [
      {
        title: '菜单名称',
        type: 'text',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.leftMenus[mainIndex].menus[subIndex].subMenus[itemIndex]
              .label;
          },
          set({ data }: EditorResult<Data>, value: string) {
            data.leftMenus[mainIndex].menus[subIndex].subMenus[
              itemIndex
            ].label = value;
          },
        },
      },
      {
        title: '跳转地址',
        type: 'textarea',
        value: {
          get({ data }: EditorResult<Data>) {
            return data.leftMenus[mainIndex].menus[subIndex].subMenus[itemIndex]
              .url;
          },
          set({ data }: EditorResult<Data>, value: string) {
            data.leftMenus[mainIndex].menus[subIndex].subMenus[itemIndex].url =
              value;
          },
        },
      },
      {
        title: '删除该项',
        type: 'button',
        value: {
          set({ data }: EditorResult<any>) {
            data.leftMenus[mainIndex].menus[subIndex].subMenus.splice(
              itemIndex,
              1
            );
          },
        },
      },
      {
        title: '添加一项',
        type: 'button',
        value: {
          set({ data }: EditorResult<Data>) {
            data.leftMenus[mainIndex].menus[subIndex].subMenus.push({
              label: `名称${data.rightButtons.length + 1}`,
              url: 'http://k.com',
            });
          },
        },
      },
    ];
  },
  // 右侧头像下拉
  '[data-popover-img]': ({ data, focusArea }: EditorResult<Data>, cate1) => {
    if (!focusArea) return;
    cate1.title = '下拉菜单配置';
    cate1.items = [
      {
        items: [
          {
            title: '头像地址',
            type: 'ImageSelector',
            value: {
              get({ data }: EditorResult<Data>) {
                return data.src;
              },
              set({ data }: EditorResult<Data>, value: string) {
                data.src = value;
              }
            }
          },
          {
            title: '头像名称',
            type: 'text',
            value: {
              get({ data }: EditorResult<Data>) {
                return data.name;
              },
              set({ data }: EditorResult<Data>, value: string) {
                data.name = value;
              }
            }
          },
          {
            title: '头像下拉菜单配置',
            type: 'array',
            options: {
              getTitle: ({ label }) => {
                return `${label}`;
              },
              onRemove: (index: number) => {
                data.rightPopoverButtons.splice(index, 1);
              },
              onAdd: () => {
                const defaultOption = {
                  label: `名称${data.rightPopoverButtons.length + 1}`,
                  url: `https://fangzhou.corp.kuaishou.com`,
                };
                data.rightPopoverButtons.push(defaultOption);
                return defaultOption;
              },
              items: [
                {
                  title: '菜单名称',
                  type: 'textarea',
                  value: 'label',
                },
                {
                  title: '跳转地址',
                  type: 'textarea',
                  description: '点击菜单跳转的地址',
                  value: 'url',
                },
              ],
            },
            value: {
              get({ data }: EditorResult<any>) {
                return data.rightPopoverButtons;
              },
              set({ data }: EditorResult<any>, options: any[]) {
                data.rightPopoverButtons = options;
              },
            },
          },
        ],
      },
    ];
  },

  // 右侧主菜单
  '[data-right-menu-index]': ({ focusArea }: EditorResult<Data>, cate1) => {
    if (!focusArea) return;
    const { index } = focusArea;
    cate1.title = '右侧主菜单配置';
    cate1.items = [
      {
        title: '菜单名称',
        type: 'text',
        value: {
          get({ data }: EditorResult<any>) {
            return data.rightButtons[index].label;
          },
          set({ data }: EditorResult<any>, value: string) {
            data.rightButtons[index].label = value;
          },
        },
      },
      {
        title: '跳转地址',
        type: 'textarea',
        value: {
          get({ data }: EditorResult<any>) {
            return data.rightButtons[index].url;
          },
          set({ data }: EditorResult<any>, value: string) {
            data.rightButtons[index].url = value;
          },
        },
      },
      {
        title: '删除该项',
        type: 'button',
        value: {
          set({ data }: EditorResult<any>) {
            data.rightButtons.splice(index, 1);
          },
        },
      },
      {
        title: '添加一项',
        type: 'button',
        value: {
          set({ data }: EditorResult<Data>) {
            data.rightButtons.push({
              label: `名称${data.rightButtons.length + 1}`,
              url: 'http://k.com',
            });
          },
        },
      },
    ];
  },
};
