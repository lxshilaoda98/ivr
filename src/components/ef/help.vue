<template>
  <el-dialog
    title="帮助"
    :visible.sync="dialogVisible"
    width="70%"
    customClass="flowHelp"
  >
    <el-tabs tab-position="left">
      <el-tab-pane label="如何新增">
        <el-divider content-position="left">如何新增</el-divider>
        <div>按住鼠标拖拽左侧组件到中间画布中松开鼠标即可</div>
      </el-tab-pane>
      <el-tab-pane label="如何删除">
        <el-divider content-position="left">页面删除</el-divider>
        <div>
          鼠标点中需要删除的节点，点击左上角的删除图标
        </div>
        <!--                <el-divider content-position="left">通过代码删除</el-divider>-->
        <!--                <pre>this.deleteNode(nodeId)</pre>-->
      </el-tab-pane>
      <el-tab-pane label="如何移动">
        <el-divider content-position="left">如何移动</el-divider>
        <div>鼠标移动到节点中，当鼠标变为可拖拽的图标时按下鼠标移动到新的位置松开鼠标</div>
      </el-tab-pane>
      <el-tab-pane label="如何连线">
        <el-divider content-position="left">如何连线</el-divider>
        <div>鼠标移动到节点中左侧的图标上，当鼠标变为+时按下鼠标移动到另一个节点中松开鼠标</div>
      </el-tab-pane>
      <el-tab-pane label="如何添加条件">
        <el-divider content-position="left">如何添加条件</el-divider>
        <div>点击画布中的连线，在页面右侧会出现一个表单，输入新的条件，点击【保存】</div>
      </el-tab-pane>
      <el-tab-pane label="如何获取接口">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="comment"
            label="参数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cont"
            label="说明"
            width="180">
          </el-table-column>
          <el-table-column
            prop="use"
            label="可用节点">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="TTS">
        <el-divider content-position="left">内置TTS接口信息</el-divider>
        <h3>需要网络</h3>
        <div>链接信息： http://127.0.0.1:6767/tts/baiduTTS?tts=要转换的文字</div>

      </el-tab-pane>

      <el-tab-pane label="全局变量">
        <el-divider content-position="left">如果设置全局变量</el-divider>
        <div>在[httpApi]/[music]节点上，勾选"全局"然后起个名字</div>
        <el-divider content-position="left">如果使用全局变量</el-divider>
        <div>使用@符号+变量的名字即可。例如：@user </div>
      </el-tab-pane>

    </el-tabs>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [{
        comment: '{val}',
        cont: '获取上个接口返回的数据',
        use: '播放音乐，语音类型为[TTS] / 接口调用'
      },{
        comment: '{CallerNumber}',
        cont: '主叫号码',
        use: '接口调用'
      },{
        comment: '{CalleeNumber}',
        cont: '被叫号码',
        use: '接口调用'
      },{
        comment: '{key}',
        cont: '按键信息',
        use: '接口调用'
      },{
        comment: '{UUid}',
        cont: '呼叫id',
        use: '接口调用'
      }]
    }
  },
  components: {},
  methods: {
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.flowHelp {
  height: 80%;
}
</style>
