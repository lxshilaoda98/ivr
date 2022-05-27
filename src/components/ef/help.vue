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

        <el-divider content-position="left">设置变量</el-divider>
        <div>
          1、在开始的模块中，新增变量名。 <br>
          2、可以在自定义代码中通过 ： 变量名 = xxxx 赋值。<br>
        </div>
        <el-divider content-position="left">条件中使用变量做判断</el-divider>
        <div>列如：(worktime == "true"  && offtime=="false") (worktime == "true"  || offtime=="false")<br>
          ==：等于  <br>
          &&：并且  <br>
          ||：或者  <br>
          需要注意的是：值是字符串类型，需要加""。 </div>

      </el-tab-pane>

      <el-tab-pane label="内置方法">

        <el-table
          :data="interfaceData"
          style="width: 100%">
          <el-table-column
            prop="comment"
            label="方法名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="cont"
            label="参数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="com"
            label="例子">
          </el-table-column>
          <el-table-column
            prop="use"
            label="返回结果">
          </el-table-column>

        </el-table>
        <b>可选驱动： mysql、mssql</b>
      </el-tab-pane>

      <el-tab-pane label="内置变量">

        <el-table
          :data="varName"
          style="width: 100%">
          <el-table-column
            prop="comment"
            label="变量名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="描述">
          </el-table-column>
        </el-table>
        <b>code模块可以通过变量名来获取</b>
      </el-tab-pane>

    </el-tabs>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
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
      }],
      interfaceData: [
        {
          comment: 'exSQL(驱动,sql语句)',
          title: '执行语句',
          cont: '驱动，sql语句',
          com: 'exSQL("mysql","insert into 表名 (字段名) values(值)")',
          use: '返回结果[成功/失败] 。支持语句：insert ，update，delete'
        },{
          comment: 'exQuerySQL(驱动,sql语句)',
          title: '查询语句',
          cont: '驱动，sql语句',
          com: 'exQuerySQL("mysql","select * from 表名 where 1=1")',
          use: '返回[] json 。支持语句：select'
        },{
          comment: 'exJson(json串,"字段名",索引)',
          title: '解析json获取对应字段的值。可以配合exQuerySQL方法使用。获取子级写法：data.data 。获取子级只支持object,不支持[]object .[]object的时候searchIndex才生效',
          cont: 'json串，字段名,索引',
          com: 'exJson("[{"a":"123","b":"xxxxx"}]","a",0)  返回结果：123',
          use: '返回[] json 。支持语句：select。索引0开始'
        },{
          comment: 'evaluate(主叫,按键信息,呼叫id)',
          title: '满意度入库使用的方法',
          cont: '主叫，按键信息,呼叫id',
          com: 'evaluate(callerNumber,endkey,callUuid)',
          use: 'void方法，无返回'
        }],
      varName:[
        {
          "comment":"callUuid",
          "title":"呼叫id"
        },
        {
          "comment":"callerNumber",
          "title":"主叫"
        },
        {
          "comment":"calleeNumber",
          "title":"被叫"
        }
      ]
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
