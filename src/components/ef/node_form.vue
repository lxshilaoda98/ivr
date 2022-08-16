<script src="../../ace/ace.js"></script>
<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">
        编辑
      </div>
      <div class="ef-node-form-body">
        <el-form :model="begin" ref="dataForm" label-width="100px" v-show="type === 'begin'">
          <el-form-item label="类型">
            <el-input v-model="begin.btype" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="begin.bname" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="设置变量">
            <el-table :data="begin.dataForm.paramList" size="mini">
              <el-table-column prop="paramkey" label="变量名" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.paramkey"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                  <el-button size="mini" type="text"
                             @click="handleDelIcrmBegin(scope.$index)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <div @click="addHandleIcrmBegin()">
            <el-button type="text" icon="el-icon-plus">新增参数</el-button>
          </div>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('begin')">保存</el-button>
          </el-form-item>
        </el-form>
        <!--线控件-->
        <el-form :model="line" ref="dataForm" label-width="100px" v-show="type === 'line'">
          <el-form-item label="条件">
            <el-input v-model="line.label"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
          </el-form-item>
          <h4 style="color: red">注：需要保存一下流程</h4>
        </el-form>
        <!--时间控件-->
        <el-form :model="offTimeNode" ref="dataForm" label-width="100px" v-show="type === 'offTime'">
          <el-form-item label="名称">
            <el-input v-model="offTimeNode.Title"></el-input>
          </el-form-item>
          <el-form-item label="上午">
            <el-time-picker
              is-range
              v-model="offTimeNode.TimeStart"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="下午">
            <el-time-picker
              is-range
              v-model="offTimeNode.TimeEnd"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="日期">
            <el-checkbox-group v-model="offTimeNode.CheckedCities" style="width: 410px;">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特定工作日">
            <el-date-picker
              type="dates"
              v-model="offTimeNode.Time4"
              placeholder="选择一个或多个日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="特定非工作日">
            <el-date-picker
              type="dates"
              v-model="offTimeNode.Time5"
              placeholder="选择一个或多个日期"
              format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('offTime')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="musicNode" ref="dataForm" label-width="100px" v-show="type === 'music'">
          <el-form-item label="名称">
            <el-input v-model="musicNode.Title"></el-input>
          </el-form-item>

          <el-form-item label="语音类型">
            <el-radio-group v-model="musicNode.musicType" @change="valMusicType">
              <el-radio-button label="文件"></el-radio-button>
              <el-radio-button label="TTS"></el-radio-button>
              <el-radio-button label="链接"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-row v-if="musicHidden=='d'">
            <el-form-item label="选择语音文件">
              <el-upload
                :on-success="dwSuccess"
                :on-remove="rmSuccess"
                class="upload-demo"
                :action=this.fileUploadUrl
                :on-change="handleChange"
                :file-list="musicNode.fileList"
                accept=".mp3"
                :before-upload="GetFileSize"
                :data={0:this.node.id}
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过10MB</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="播放的录音">
              <el-select v-model="musicNode.SuccWav" placeholder="请选择">
                <el-option
                  v-for="item in musicNode.fileList"
                  :key="item.url"
                  :label="item.name"
                  :value="item.url">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-video-play" @click="playMusic(musicNode.SuccWav)"></el-button>
            </el-form-item>
            <el-form-item label="按键错误录音">
              <el-select v-model="musicNode.ErrWav" placeholder="请选择">
                <el-option
                  v-for="item in musicNode.fileList"
                  :key="item.url"
                  :label="item.name"
                  :value="item.url">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-video-play" @click="playMusic(musicNode.ErrWav)"></el-button>
            </el-form-item>
          </el-row>
          <el-row v-if="musicHidden=='t'">
            <el-form-item label="文本">
              <el-input
                type="textarea"
                placeholder="请输入要播报的文本"
                v-model="musicNode.tts_content">
              </el-input>
            </el-form-item>
            <el-form-item label="按键失败">
              <el-input
                type="textarea"
                placeholder="请输入按键失败要播报的文本"
                v-model="musicNode.tts_content_err">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row v-if="musicHidden=='l'">
            <el-form-item label="链接">
              <el-input
                type="textarea"
                placeholder="请输入语音url链接地址"
                v-model="musicNode.link_url">
              </el-input>
            </el-form-item>
            <el-form-item label="按键失败">
              <el-input
                type="textarea"
                placeholder="请输入按键失败语音url链接地址"
                v-model="musicNode.link_url_err">
              </el-input>
            </el-form-item>
            <p style="color: red;text-align: right">http链接并且格式为mp3</p>
          </el-row>

          <el-form-item label="最小位数">
            <el-input v-model="musicNode.Min"></el-input>
          </el-form-item>
          <el-form-item label="最大位数">
            <el-input v-model="musicNode.Max"></el-input>
          </el-form-item>
          <el-form-item label="重复次数">
            <el-input v-model="musicNode.Name"></el-input>
          </el-form-item>
          <el-form-item label="超时">
            <el-input v-model="musicNode.Timeout"></el-input>
          </el-form-item>
          <el-form-item label="按键结束符">
            <el-input v-model="musicNode.Terminators"></el-input>
          </el-form-item>

          <el-form-item label="返回上级菜单">
            <el-select v-model="musicNode.Backmenu" clearable placeholder="请选择">
              <el-option
                v-for="item in againmenus"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重听">
            <el-select v-model="musicNode.Againmenu" clearable placeholder="请选择">
              <el-option
                v-for="item in againmenus"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="可否打断" v-if="false">
            <el-select v-model="musicNode.IsCheck" placeholder="请选择">
              <el-option
                v-for="item in SelectCheck1"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="可选按键">
            <el-select v-model="musicNode.KxCheck" clearable multiple placeholder="请选择">
              <el-option
                v-for="item in Kxoptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="全局">
            <el-switch
              v-model="musicNode.globaldisplay"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="变量名">
            <el-input v-model="musicNode.globalVal" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('music')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="agentNode" ref="dataForm" label-width="100px" v-show="type === 'agent'">

          <el-form-item label="人员信息">
            <el-input v-model="agentNode.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('agent')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="groupNode" ref="dataForm" label-width="100px" v-show="type === 'group'">
          <el-form-item label="名称">
            <el-input v-model="groupNode.Title"></el-input>
          </el-form-item>
          <el-form-item label="选择语音文件">
            <el-upload
              :on-success="dwSuccess"
              :on-remove="rmSuccess"
              class="upload-demo"
              :action=this.fileUploadUrl
              :on-change="handleChange"
              :file-list="groupNode.DataList"
              accept=".mp3"
              :before-upload="GetFileSize"
              :data={0:this.node.id}
            >

              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="转接前">
            <el-select v-model="groupNode.bef_music" placeholder="请选择">
              <el-option
                v-for="item in groupNode.DataList"
                :key="item.url"
                :label="item.name"
                :value="item.url">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-video-play" @click="playMusic(groupNode.bef_music)"></el-button>
          </el-form-item>
          <el-form-item label="组信息">
            <el-select v-model="groupNode.name" placeholder="请选择">
              <el-option
                v-for="item in GroupList"
                :key="item.svc_code"
                :label="item.svc_name"
                :value="item.svc_code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('group')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="httpApiNode" ref="dataForm" label-width="100px" v-show="type === 'httpApi'">

          <el-form-item label="名称">
            <el-input v-model="httpApiNode.name"></el-input>
          </el-form-item>
          <el-form-item label="接口地址">
            <el-input v-model="httpApiNode.url"></el-input>
          </el-form-item>
          <el-form-item label="请求方法">

            <el-select v-model="httpApiNode.method" placeholder="请选择">
              <el-option
                v-for="item in methodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求参数">
            <el-table :data="httpApiNode.dataForm.paramList" size="mini">
              <el-table-column prop="paramkey" label="key" width="150">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.paramkey"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="paramvalue" label="value">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.paramvalue"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="50">
                <template slot-scope="scope">
                  <el-button size="mini" type="text"
                             @click="handleDelIcrmWorktimeoverrideEntityList(scope.$index)"
                  >删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <div @click="addHandleIcrmWorktimeoverrideEntityList()">
            <el-button type="text" icon="el-icon-plus">新增参数</el-button>
          </div>
          <el-form-item label="全局">
            <el-switch
              v-model="httpApiNode.globaldisplay"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="变量名">
            <el-input v-model="httpApiNode.globalVal" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('httpApi')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="transferPhone" ref="dataForm" label-width="100px" v-show="type === 'transferPhone'">
          <el-form-item label="名称">
            <el-input v-model="transferPhone.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码池">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="transferPhone.phone_list">
            </el-input>
            <h4 style="color: red">注：手机号请用英文“,”号隔开</h4>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('transferPhone')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="voiceMail" ref="dataForm" label-width="100px" v-show="type === 'voiceMail'">
          <el-form-item label="名称">
            <el-input v-model="voiceMail.title"></el-input>
          </el-form-item>
          <el-form-item label="选择语音文件">
            <el-upload
              :on-success="dwSuccess"
              :on-remove="rmSuccess"
              class="upload-demo"
              :action=this.fileUploadUrl
              :on-change="handleChange"
              :file-list="voiceMail.DataList"
              accept=".mp3"
              :before-upload="GetFileSize"
              :data={0:this.node.id}
            >

              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="转接前">
            <el-select v-model="voiceMail.bef_music" placeholder="请选择">
              <el-option
                v-for="item in voiceMail.DataList"
                :key="item.url"
                :label="item.name"
                :value="item.url">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-video-play" @click="playMusic(voiceMail.bef_music)"></el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('voiceMail')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="musicTNode" ref="dataForm" label-width="100px" v-show="type === 'musicT'">
          <el-form-item label="名称">
            <el-input v-model="musicTNode.Title"></el-input>
          </el-form-item>

          <el-form-item label="语音类型">
            <el-radio-group v-model="musicTNode.musicType" @change="valMusicTType">
              <el-radio-button label="文件"></el-radio-button>
              <el-radio-button label="TTS"></el-radio-button>
              <el-radio-button label="链接"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-row v-if="musicTHidden=='d'">
            <el-form-item label="选择语音文件">
              <el-upload
                :on-success="dwSuccess"
                :on-remove="rmSuccess"
                class="upload-demo"
                :action=this.fileUploadUrl
                :on-change="handleChange"
                :file-list="musicTNode.fileList"
                accept=".mp3"
                :before-upload="GetFileSize"
                :data={0:this.node.id}
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传MP3文件，且不超过10MB</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="播放的录音">
              <el-select v-model="musicTNode.SuccWav" placeholder="请选择">
                <el-option
                  v-for="item in musicTNode.fileList"
                  :key="item.url"
                  :label="item.name"
                  :value="item.url">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-video-play" @click="playMusic(musicTNode.SuccWav)"></el-button>
            </el-form-item>
          </el-row>
          <el-row v-if="musicTHidden=='t'">
            <el-form-item label="文本">
              <el-input
                type="textarea"
                placeholder="请输入要播报的文本"
                v-model="musicTNode.tts_content">
              </el-input>
            </el-form-item>

          </el-row>
          <el-row v-if="musicTHidden=='l'">
            <el-form-item label="语音链接">
              <el-input
                type="textarea"
                placeholder="请输入语音url链接地址"
                v-model="musicTNode.link_url">
              </el-input>
            </el-form-item>


            <p style="color: red;text-align: right">http链接并且格式为mp3</p>
          </el-row>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('musicT')">保存</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="aceCodeNode" ref="dataForm" label-width="100px" v-show="type === 'aceCode'">
          <el-form-item label="名称">
            <el-input v-model="aceCodeNode.title"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('aceCode')">保存</el-button>
            <el-button type="primary" icon="el-icon-check" @click="writerCode">编码</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="transferNode" ref="dataForm" label-width="100px" v-show="type === 'transferNode'">
          <el-form-item label="名称">
            <el-input v-model="transferNode.title"></el-input>
          </el-form-item>
          <el-form-item label="选择节点">
            <el-select filterable v-model="transferNode.xnTransferNode" placeholder="请选择">
              <el-option
                v-for="item in codeList"
                :key="item.viewsOid"
                :label="item.title"
                :value="item.viewsOid">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('transferNode')">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="robotNameNode" ref="dataForm" label-width="100px" v-show="type === 'robotName'">

          <el-form-item label="名称">
            <el-input v-model="robotNameNode.title"></el-input>
          </el-form-item>
          <el-form-item label="机器人">
            <el-select v-model="robotNameNode.templateId" placeholder="请选择">
              <el-option
                v-for="item in tenantIdList"
                :key="item.templateId"
                :label="item.templateName"
                :value="item.templateId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人工关键字" v-if="false">
            <el-input v-model="robotNameNode.transferAgent"></el-input>
          </el-form-item>
          <el-form-item label="组信息" v-if="false">
            <el-select v-model="robotNameNode.groupName" placeholder="请选择">
              <el-option
                v-for="item in GroupList"
                :key="item.svc_code"
                :label="item.svc_name"
                :value="item.svc_code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('robotName')">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="transferSipUrl" ref="dataForm" label-width="100px" v-show="type === 'transferSipUrl'">

          <el-form-item label="名称">
            <el-input v-model="transferSipUrl.title"></el-input>
          </el-form-item>
          <el-form-item label="模式">
            <el-radio-group v-model="transferSipUrl.callType" @change="transferSipUrlChange">
              <el-radio-button label="呼叫串"></el-radio-button>
              <el-radio-button label="网关"></el-radio-button>
            </el-radio-group>
          </el-form-item>

          <!--originate {effective_caller_id_number=86668220}user/1002 &bridge(sofia/internal/017600082595@10.117.2.96)-->

          <el-form-item label="sip串" v-show="transferSipUrlvis.sipurl">
            <el-input v-model="transferSipUrl.sipurl" placeholder="sip:被叫号码@对端ip"></el-input>
          </el-form-item>

          <el-form-item label="选择网关" v-show="transferSipUrlvis.gateway">
            <template>
              <el-select v-model="transferSipUrl.gateway" placeholder="请选择">
                <el-option
                  v-for="item in transferSipUrl.gatewayList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="被叫号码" v-show="transferSipUrlvis.gateway">
            <el-input v-model="transferSipUrl.calleeNumber" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('transferSipUrl')">保存</el-button>
          </el-form-item>
        </el-form>

      </div>

    </div>
    <el-dialog
      title="自定义"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">

      <editor v-model="aceCodeNode.code" @init="editorInit" lang="javascript" theme="chrome"
              width="100%" height="500" :options="options"></editor>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCode()">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import moment from 'moment'
import {
  saveViewsType,
  GetViewsType,
  SaveFile,
  RmFile,
  GetIVRSvc,
  saveViewsCode,
  getViewsCode,
  getViewsList, GetRobotList
} from './saveApi'
import {cloneDeep} from 'lodash'

const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const isOptions = ['是', '否'];
const errOptions = ['转组', '挂断'];
const againmenus = ['#', '*'];
const myAppUrl = window.appConig;

export default {
  components: {
    editor: require('vue2-ace-editor'),
  },
  created() {
    this.initSipUser()
  },
  data() {
    return {
      foid: '',
      robotNameNode: {
        url: 'http://127.0.0.1'
      },
      transferSipUrlvis:{sipurl:false,gateway:false},
      codeList: [],
      options: {
        enableBasicAutocompletion: true, // 启用基本自动完成
        enableSnippets: true, // 启用代码段
        enableLiveAutocompletion: true, // 启用实时自动完成
        printMarginColumn: 30,
        displayIndentGuides: false, // 显示参考线
        enableEmmet: true, // 启用Emmet
        tabSize: 6, // 标签大小
        fontSize: 14, // 设置字号
        useWorker: true, // 使用辅助对象
        showPrintMargin: false, //去除编辑器里的竖线
        enableMultiselect: true, //     选中多处
        readOnly: false, // 是否只读
        showFoldWidgets: true, // 显示折叠部件
        fadeFoldWidgets: true, // 淡入折叠部件
        wrap: true //换行
      },
      transferSipUrl:{callType:'呼叫串',gatewayList:[]},
      transferNode: {},
      dialogVisible: false,
      methodOptions: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }],
      fileUploadUrl: myAppUrl.baseURL + '/file/upload',
      tenantIdList:[],
      GroupList: [],
      GoHTTPUrl: myAppUrl.baseURL + '/file/playMusic', //播放语音的地址
      Kxoptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#'],
      SelectCheck1: isOptions,
      SelectCheck2: errOptions,
      againmenus: againmenus,
      cities: cityOptions,
      visible: true,
      // node 或 line
      type: 'node',
      aceCodeNode: {},
      begin: {btype: "begin", bname: "开始", dataForm: {paramList: [], paramkey: ''}},
      node: {},
      line: {},
      data: {},
      musicHidden: '',
      musicTHidden: '',
      musicTNode: {},
      offTimeNode: {
        TimeStart: [
          new Date(2016, 9, 10, 8, 0),
          new Date(2016, 9, 10, 12, 0)
        ],
        TimeEnd: [
          new Date(2016, 9, 10, 13, 0),
          new Date(2016, 9, 10, 17, 30)
        ],
        CheckedCities: ['周一', '周二', '周三', '周四', '周五'],
        Time4: null,
        Time5: null,
      },
      musicNode: {
        Title: '',
        Min: '1',
        Max: '1',
        Name: '1',
        Timeout: '5000',
        Terminators: '',
        IsCheck: '是',
        ErrWav: '',
        SuccWav: '',
        Backmenu: '',
        Againmenu: ''
      },
      agentNode: {},
      groupNode: {},
      httpApiNode: {
        name: '接口调用',
        method: 'GET',
        url: 'http://127.0.0.1',
        dataForm: {paramList: [], paramkey: '', paramvalue: ''}
      },
      transferPhone: {},
      voiceMail: {},
      stateList: [{
        state: 'success',
        label: '成功'
      }, {
        state: 'warning',
        label: '警告'
      }, {
        state: 'error',
        label: '错误'
      }, {
        state: 'running',
        label: '运行中'
      }],

    }
  },
  methods: {
    initSipUser(){
        if (this.transferSipUrl.callType=="呼叫串"){
          this.transferSipUrlvis.sipurl = true;
          this.transferSipUrlvis.gateway = false;
        }else if (this.transferSipUrl.callType =="网关"){
          this.transferSipUrlvis.sipurl = false;
          this.transferSipUrlvis.gateway = true;
        }
    },
    transferSipUrlChange(val){
      if (val =="呼叫串"){
        this.transferSipUrlvis.sipurl = true;
        this.transferSipUrlvis.gateway = false;
      }else if (val =="网关"){
        this.transferSipUrlvis.sipurl = false;
        this.transferSipUrlvis.gateway = true;
      }
    },
    writerCode() {
      this.dialogVisible = true;
      console.log("node" + this.node.id)
      let params = {
        id: this.node.id
      }
      getViewsCode(params).then((result) => {
        if (result.code == "20000") {
          this.aceCodeNode.code = result.nodeList.code;
        } else {
          this.$notify({
            title: '失败',
            message: '接口返回异常',
            type: 'error',
            duration: result.code
          })
        }
      })
    },
    saveCode() {
      let param = {
        id: this.node.id,
        code: this.aceCodeNode.code
      }
      saveViewsCode(param).then((result) => {
        if (result.code == "20000") {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '保存失败' + result.msg,
            type: 'error',
            duration: result.code
          })
        }
      })
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    editorInit: function (editor) {
      editor.resize();
      // 监听编辑器变化

      editor.getSession().on("change", val => {
        console.log("debug log --> ", editor.getValue());
        this.$emit("change", editor.getValue());
      });
      editor.commands.addCommand({
        name: 'save',
        bindKey: {win: 'Ctrl-S', mac: 'Command-S'},
        exec: editor => this.$emit('save-change', this.value, editor)
      })
      editor.commands.addCommand({
        name: 'formatter',
        bindKey: {win: 'Ctrl-Shift-F', mac: 'Command-Shift-F'},
        exec: () => this.$emit('formatter', this.editor)
      })


      require('brace/ext/language_tools'); //language extension prerequsite...
      // require('brace/mode/html')
      require('brace/mode/javascript');    //language
      // require('brace/mode/less')
      require('brace/theme/chrome'); //主题
      require('brace/snippets/javascript'); //snippet
    },
    valMusicTType(val) {
      if (val == "文件") {
        this.musicTHidden = 'd';
      } else if (val == "TTS") {
        this.musicTHidden = 't';
      } else if (val == "链接") {
        this.musicTHidden = 'l';
      }
    },
    valMusicType(val) {
      if (val == "文件") {
        this.musicHidden = 'd';
      } else if (val == "TTS") {
        this.musicHidden = 't';
      } else if (val == "链接") {
        this.musicHidden = 'l';
      }
    },
    playMusic(val) {
      val = this.GoHTTPUrl + "?musicFile=" + val;
      // <audio src="../viper.mp3" controls="controls"></audio>
      this.$alert('<audio src="' + val + '" controls="controls"></audio> ', '试听', {
        dangerouslyUseHTMLString: true
      });
    },
    handleDelIcrmWorktimeoverrideEntityList(index) {
      this.httpApiNode.dataForm.paramList.splice(index, 1)
    },
    handleDelIcrmBegin(index) {
      this.begin.dataForm.paramList.splice(index, 1)
    },
    addHandleIcrmWorktimeoverrideEntityList() {
      let item = {
        paramkey: undefined,
        paramvalue: undefined,
      }
      this.httpApiNode.dataForm.paramList.push(item);
    },
    addHandleIcrmBegin() {
      let item = {
        paramkey: undefined
      }
      this.begin.dataForm.paramList.push(item);
    },

    //上传文件成功后方法
    dwSuccess(response, file) {
      //成功后修改数据库存储的数据
      if (response.code == 0) {
        let params = {
          "id": this.node.id,
          "sJson": response.data,
          "fid": file.uid,
        }
        SaveFile(params).then((result) => {
          if (result.code == "20000") {

          } else {
            console.log("接口返回异常")
          }
        })
      }
    },
    //移除文件方法
    rmSuccess(file) {
      let params = {
        "fid": file.uid
      }
      RmFile(params).then((result) => {
        if (result.code == "20000") {

        } else {
          console.log("接口返回异常")
        }
      })
    },
    handleChange(file, fileList) {
      this.musicNode.fileList = fileList.slice(-3);
    },
    GetFileSize(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      const isJPG = file.type === 'audio/mpeg';
      if (!isLt2M) {
        this.$message.error('上传的文件不能超过 10MB!');
      }
      if (!isJPG) {
        this.$message.error('格式错误,只能是mp3文件!');
      }
      return isJPG && isLt2M;
    },
    getUrlParam(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象\
      let r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      let fid = this.getUrlParam('fid');
      this.type = 'node'
      this.data = data
      data.nodeList.filter((node) => {
        if (node.id === id) {

          if (node.type == "begindasd") {
            this.type = 'node';
          } else {

            this.type = node.type;
            //调用接口，查询本次节点的属性.
            let params = {
              "foid": fid,
              "id": id,
              "type": node.type
            }
            GetViewsType(params).then((result) => {

              if (result.code == "20000") {
                if (node.type == "offTime") {
                  if (result.nodeList.Oid != "") {
                    node.name = result.nodeList.Title;
                    this.offTimeNode = result.nodeList
                  }
                } else if (node.type == "music") {
                  if (result.nodeList.Oid != "") {
                    if (result.nodeList.musicType == "文件") {
                      this.musicHidden = 'd';
                    } else if (result.nodeList.musicType == "TTS") {
                      this.musicHidden = 't';
                    } else if (result.nodeList.musicType == "链接") {
                      this.musicHidden = 'l';
                    }
                    node.name = result.nodeList.Title;
                    this.musicNode = result.nodeList
                    this.musicNode.fileList = result.nodeList.DataList
                  } else {
                    this.musicNode.fileList = []
                  }
                  // this.musicNode.fileList = [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg',uid:12312123123}]
                } else if (node.type == "musicT") {

                  if (result.nodeList.Oid != "") {
                    if (result.nodeList.musicType == "文件") {
                      this.musicTHidden = 'd';
                    } else if (result.nodeList.musicType == "TTS") {
                      this.musicTHidden = 't';
                    } else if (result.nodeList.musicType == "链接") {
                      this.musicTHidden = 'l';
                    }
                    node.name = result.nodeList.Title;
                    this.musicTNode = result.nodeList
                    this.musicTNode.fileList = result.nodeList.DataList
                  } else {
                    this.musicTNode.fileList = []
                  }
                } else if (node.type == "agent") {
                  this.agentNode = result.nodeList;
                } else if (node.type == "group") {

                  node.name = result.nodeList.Title;
                  this.groupNode = result.nodeList;
                } else if (node.type == "httpApi") {
                  node.name = result.nodeList.name;
                  this.httpApiNode = result.nodeList;
                } else if (node.type == "transferPhone") {
                  node.name = result.nodeList.name;

                  this.transferPhone = result.nodeList;
                } else if (node.type == "voiceMail") {
                  node.name = result.nodeList.title;

                  this.voiceMail = result.nodeList;
                } else if (node.type == "begin") {
                  this.begin = result.nodeList;
                } else if (node.type == "aceCode") {
                  this.aceCodeNode = result.nodeList
                } else if (node.type == "transferNode") {
                  //请求url返回结果getViewsList
                  this.transferNode = result.nodeList
                }else if (node.type == "robotName") {
                  //请求url返回结果getViewsList
                  this.robotNameNode = result.nodeList
                }else if (node.type == "transferSipUrl") {

                  this.transferSipUrl = result.nodeList
                  this.initSipUser();
                }
              } else {
                console.log("接口返回异常")
              }
            });
            this.foid = fid;
            let ListP = {
              foid: fid
            }
            console.log("node.type>>"+node.type)
            if (node.type == "transferNode") {
              getViewsList(ListP).then((result) => {
                if (result.code == "20000") {
                  this.codeList = result.nodeList;
                } else {
                  this.$notify({
                    title: '失败',
                    message: '接口返回异常',
                    type: 'error',
                    duration: result.code
                  })
                }
              })
            } else if (node.type == "group" || node.type=="robotName") {
              //填充下拉框
              GetIVRSvc(ListP).then((result) => {
                if (result.code == "20000") {
                  this.GroupList = result.result
                } else {
                  console.log("接口返回异常");
                }
              })
              let robotBody = {
                "company": fid
              }
              GetRobotList(robotBody).then((result) => {
                if (result.code == "20000") {
                  this.tenantIdList = result.msg.data
                } else {
                  console.log("接口返回异常")
                }
              })
            }
          }
          this.node = cloneDeep(node)

        }
      })
    },
    lineInit(line) {
      this.type = 'line'
      this.line = line
    },
    // 修改连线
    saveLine() {
      console.log("保存线")
      this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
    },
    //保存按钮
    save(val) {
      let param = {}
      switch (val) {
        case "aceCode":
          param = {
            "id": this.node.id,
            "sJson": this.aceCodeNode,
            "type": val
          }
          this.node.name = this.aceCodeNode.title;
          break;
        case "begin" :
          param = {
            "foid": this.foid,
            "id": this.node.id,
            "sJson": this.begin,
            "type": val
          }
          break;
        case "offTime":
          param = {
            "id": this.node.id,
            "sJson": this.offTimeNode,
            "type": val
          }
          this.node.name = this.offTimeNode.Title;
          break;
        case "music":
          param = {
            "id": this.node.id,
            "sJson": this.musicNode,
            "type": val
          }
          this.node.name = this.musicNode.Title;
          break;
        case "agent":
          param = {
            "id": this.node.id,
            "sJson": this.agentNode,
            "type": val
          }
          break;
        case "group":
          param = {
            "id": this.node.id,
            "sJson": this.groupNode,
            "type": val
          }
          this.node.name = this.groupNode.Title;
          break;
        case "httpApi":
          param = {
            "name": this.httpApiNode.name,
            "id": this.node.id,
            "sJson": this.httpApiNode,
            "type": val
          }
          this.node.name = this.httpApiNode.name;
          break;
        case "transferPhone":
          param = {
            "name": this.transferPhone.name,
            "id": this.node.id,
            "sJson": this.transferPhone,
            "type": val
          }
          this.node.name = this.transferPhone.name;
          break;
        case "voiceMail":
          param = {
            "id": this.node.id,
            "sJson": this.voiceMail,
            "type": val
          }
          this.node.name = this.voiceMail.title;
          break;
        case "musicT":
          param = {
            "id": this.node.id,
            "sJson": this.musicTNode,
            "type": val
          }
          this.node.name = this.musicTNode.Title;
          break;
        case "transferNode":
          param = {
            "id": this.node.id,
            "sJson": this.transferNode,
            "type": val
          }
          this.node.name = this.transferNode.title;
          break;
        case "robotName":
          param = {
            "id": this.node.id,
            "sJson": this.robotNameNode,
            "type": val
          }
          this.node.name = this.robotNameNode.title;
        case "transferSipUrl":
          param = {
            "id": this.node.id,
            "sJson": this.transferSipUrl,
            "type": val
          }
          this.node.name = this.transferSipUrl.title;
        default :
          break;
      }
      saveViewsType(param).then((result) => {
        if (result.code == "20000") {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '保存失败' + result.msg,
            type: 'error',
            duration: result.code
          })
        }
      })
      this.data.nodeList.filter((node) => {
        if (node.id === this.node.id) {
          node.name = this.node.name
          node.left = this.node.left
          node.top = this.node.top
          node.ico = this.node.ico
          node.state = this.node.state
        }
      })
    }
  }
}
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
</style>
