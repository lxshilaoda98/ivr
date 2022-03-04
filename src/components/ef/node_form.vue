<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">
        编辑
      </div>
      <div class="ef-node-form-body">
        <el-form :model="node" ref="dataForm" label-width="100px" v-show="type === 'node'">
          <el-form-item label="类型">
            <el-input v-model="node.type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="node.name" :disabled="true"></el-input>
          </el-form-item>

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
            <el-button icon="el-icon-close">重置</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
          </el-form-item>
        </el-form>

        <!--时间控件-->
        <el-form :model="offTimeNode" ref="dataForm" label-width="100px" v-show="type === 'offTime'">
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
            <el-select v-model="musicNode.Backmenu" placeholder="请选择">
              <el-option
                v-for="item in againmenus"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="重听">
            <el-select v-model="musicNode.Againmenu" placeholder="请选择">
              <el-option
                v-for="item in againmenus"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="可否打断">
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
            <el-select v-model="musicNode.KxCheck" multiple placeholder="请选择">
              <el-option
                v-for="item in Kxoptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('music')">保存</el-button>
          </el-form-item>
        </el-form>

        <el-form :model="agentNode" ref="dataForm" label-width="100px" v-show="type === 'agent'">

          <el-form-item label="可否打断">
            <el-select v-model="agentNode.isCheck" placeholder="请选择">
              <el-option
                v-for="item in SelectCheck1"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="人员信息">
            <el-input v-model="agentNode.name"></el-input>
          </el-form-item>

          <el-form-item label="失败操作">
            <el-select v-model="agentNode.err" placeholder="请选择">
              <el-option
                v-for="item in SelectCheck2"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
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
            <el-input v-model="httpApiNode.method"></el-input>
          </el-form-item>
          <el-form-item label="请求参数">
            <el-table :data="httpApiNode.dataForm.paramList" size="mini">
              <el-table-column prop="paramkey" label="key" width="100">
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

      </div>

    </div>
  </div>

</template>

<script>
import moment from 'moment'
import {saveViewsType, GetViewsType, SaveFile, RmFile, GetIVRSvc} from './saveApi'
import {cloneDeep} from 'lodash'

const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const isOptions = ['是', '否'];
const errOptions = ['转组', '挂断'];
const againmenus = ['#', '*'];
export default {
  data() {
    return {

      fileUploadUrl: 'http://47.93.115.11:8000/file/upload',
      GroupList: [],
      GoHTTPUrl: 'http://47.93.115.11:8000/file/playMusic', //播放语音的地址
      Kxoptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#'],
      SelectCheck1: isOptions,
      SelectCheck2: errOptions,
      againmenus: againmenus,
      cities: cityOptions,
      visible: true,
      // node 或 line
      type: 'node',
      node: {},
      line: {},
      data: {},
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
        Terminators: '#',
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
        method: 'get',
        url: 'http://127.0.0.1',
        dataForm: {paramList: [], paramkey: '', paramvalue: ''}
      },
      transferPhone: {},
      voiceMail:{},
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
      }]
    }
  },
  methods: {
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
    addHandleIcrmWorktimeoverrideEntityList() {
      let item = {
        paramkey: undefined,
        paramvalue: undefined,
      }
      this.httpApiNode.dataForm.paramList.push(item);
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
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      this.type = 'node'
      this.data = data
      data.nodeList.filter((node) => {
        if (node.id === id) {
          if (node.type == "begin") {
            this.type = 'node';
          } else {
            this.type = node.type;
            //调用接口，查询本次节点的属性.
            let params = {
              "id": id,
              "type": node.type
            }
            GetViewsType(params).then((result) => {
              if (result.code == "20000") {
                if (node.type == "offTime") {
                  if (result.nodeList.Oid != "") {
                    this.offTimeNode = result.nodeList
                  }
                } else if (node.type == "music") {
                  if (result.nodeList.Oid != "") {
                    node.name = result.nodeList.Title;
                    this.musicNode = result.nodeList
                    this.musicNode.fileList = result.nodeList.DataList
                  } else {
                    this.musicNode.fileList = []
                  }

                  // this.musicNode.fileList = [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg',uid:12312123123}]
                } else if (node.type == "agent") {
                  this.agentNode = result.nodeList;
                } else if (node.type == "group") {

                  node.name = result.nodeList.Title;
                  this.groupNode = result.nodeList;
                } else if (node.type == "httpApi") {
                  node.name = result.nodeList.name;

                  this.httpApiNode = result.nodeList;
                }else if (node.type == "transferPhone") {
                  node.name = result.nodeList.name;

                  this.transferPhone = result.nodeList;
                }else if (node.type == "voiceMail") {
                  node.name = result.nodeList.title;

                  this.voiceMail = result.nodeList;
                }
              } else {
                console.log("接口返回异常")
              }
            })
            //填充下拉框
            GetIVRSvc().then((result) => {
              if (result.code == "20000") {
                this.GroupList = result.result
              } else {
                console.log("接口返回异常")
              }

            })
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
      this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
    },
    //保存按钮
    save(val) {
      let param = {}
      switch (val) {
        case "begin" :
          break;
        case "offTime":
          param = {
            "id": this.node.id,
            "sJson": this.offTimeNode,
            "type": val
          }
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
