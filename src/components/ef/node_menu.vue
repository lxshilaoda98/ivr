<template>
  <div ref="tool" class="flow-menu">
    <div v-for="menu  in  menuList" :key="menu.id">
      <span class="ef-node-pmenu" @click="menu.open = !menu.open"><i
        :class="{'el-icon-caret-bottom': menu.open,'el-icon-caret-right': !menu.open}"></i>&nbsp;{{ menu.name }}</span>
      <ul v-show="menu.open" class="ef-node-menu-ul">
        <draggable v-model="menu.children" :options="draggableOptions" @end="end" @start="move">
          <li v-for="subMenu in menu.children" :key="subMenu.id" :type="subMenu.type" class="ef-node-menu-li">
            <i :class="subMenu.ico"></i> {{ subMenu.name }}
          </li>
        </draggable>
      </ul>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

var mousePosition = {
  left: -1,
  top: -1
}

export default {
  data() {
    return {
      activeNames: '1',
      // draggable配置参数参考 https://www.cnblogs.com/weixin186/p/10108679.html
      draggableOptions: {
        preventOnFilter: false,
        sort: false,
        disabled: false,
        ghostClass: 'tt',
        // 不使用H5原生的配置
        forceFallback: true,
        // 拖拽的时候样式
        // fallbackClass: 'flow-node-draggable'
      },
      // 默认打开的左侧菜单的id
      defaultOpeneds: ['1', '2', '3'],
      menuList: [
        {
          id: '1',
          type: 'group',
          name: '开始',
          ico: 'el-icon-video-play',
          open: true,
          children: [
            {
              id: '11',
              type: 'begin',
              name: '开始',
              ico: 'el-icon-thumb',
              // 自定义覆盖样式
              style: {}
            },{
              id: '12',
              type: 'offTime',
              name: '工作时间',
              ico: 'el-icon-time',
              // 自定义覆盖样式
              style: {}
            },{
              id: '36',
              type: 'evaluateNode',
              name: '满意度开始',
              ico: 'el-icon-coordinate',
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: '2',
          type: 'music',
          name: '播放节点',
          ico: 'el-icon-video-pause',
          open: true,
          children: [
             {
              id: '13',
              type: 'music',
              name: '按键音乐',
              ico: 'el-icon-thumb',
              // 自定义覆盖样式
              style: {}
            },
            {
              id: '14',
              type: 'musicT',
              name: '播放音乐',
              ico: 'el-icon-service',
              // 自定义覆盖样式
              style: {}
            }
          ]
        },
        {
          id: '3',
          type: 'transfer',
          name: '转接节点',
          ico: 'el-icon-video-pause',
          open: true,
          children: [
            {
              id: '13',
              type: 'transferSipUrl',
              name: '转外部',
              ico: 'el-icon-share',
              // 自定义覆盖样式
              style: {}
            },
             {
              id: '14',
              type: 'agent',
              name: '转人工',
              ico: 'el-icon-user',
              // 自定义覆盖样式
              style: {}
            },
            {
              id: '15',
              type: 'group',
              name: '转组',
              ico: 'el-icon-files',
              // 自定义覆盖样式
              style: {}
            }, {
              id: '16',
              type: 'transferPhone',
              name: '转手机',
              ico: 'el-icon-mobile-phone',
              // 自定义覆盖样式
              style: {}
            }, {
              id: '17',
              type: 'voiceMail',
              name: '转留言',
              ico: 'el-icon-message',
              // 自定义覆盖样式
              style: {}
            }

          ]
        },
        {
          id: '4',
          type: 'group',
          name: '自定义节点',
          ico: 'el-icon-video-pause',
          open: true,
          children: [
             {
              id: '31',
              type: 'httpApi',
              name: '接口调用',
              ico: 'el-icon-sort',
              // 自定义覆盖样式
              style: {}
            },{
              id: '32',
              type: 'flowEnd',
              name: '流程结束',
              ico: 'el-icon-circle-close',
              // 自定义覆盖样式
              style: {}
            },{
              id: '33',
              type: 'transferNode',
              name: '虚拟跳转',
              ico: 'el-icon-refresh-right',
              // 自定义覆盖样式
              style: {}
            },{
              id: '34',
              type: 'aceCode',
              name: '自定义代码',
              ico: 'el-icon-document',
              // 自定义覆盖样式
              style: {}
            }

          ]
        },
        {
          id: '5',
          type: 'intelligent',
          name: '智能节点',
          ico: 'el-icon-magic-stick',
          open: true,
          children: [{
            id: '35',
            type: 'robotName',
            name: '智能机器人',
            ico: 'el-icon-user',
            // 自定义覆盖样式
            style: {}
          },{
            id: '36',
            type: 'gpt',
            name: 'GPT',
            ico: 'el-icon-hot-water',
            // 自定义覆盖样式
            style: {}
          }]
        }
      ],
      nodeMenu: {}
    }
  },
  components: {
    draggable
  },
  created() {
    /**
     * 以下是为了解决在火狐浏览器上推拽时弹出tab页到搜索问题
     * @param event
     */
    if (this.isFirefox()) {
      document.body.ondrop = function (event) {
        // 解决火狐浏览器无法获取鼠标拖拽结束的坐标问题
        mousePosition.left = event.layerX
        mousePosition.top = event.clientY - 50
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },
  methods: {
    // 根据类型获取左侧菜单对象
    getMenuByType(type) {
      for (let i = 0; i < this.menuList.length; i++) {
        let children = this.menuList[i].children;
        for (let j = 0; j < children.length; j++) {
          if (children[j].type === type) {
            return children[j]
          }
        }
      }
    },
    // 拖拽开始时触发
    move(evt, a, b, c) {
      var type = evt.item.attributes.type.nodeValue
      this.nodeMenu = this.getMenuByType(type)
    },
    // 拖拽结束时触发
    end(evt, e) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
    // 是否是火狐浏览器
    isFirefox() {
      var userAgent = navigator.userAgent
      if (userAgent.indexOf("Firefox") > -1) {
        return true
      }
      return false
    }
  }
}
</script>
