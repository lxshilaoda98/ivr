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
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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
          <el-form-item label="选择语音文件">
            <el-upload
              :on-success="dwSuccess"
              :on-remove="rmSuccess"
              class="upload-demo"
              action="http://62.234.131.99:8000/file/upload"
              :on-change="handleChange"
              :file-list="musicNode.fileList"
              accept=".wav,.mp3"
              :before-upload="GetFileSize">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传wav文件，且不超过10MB</div>
            </el-upload>
          </el-form-item>

          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
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
          <el-form-item label="结束符">
            <el-input v-model="musicNode.Terminators"></el-input>
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

          <el-form-item label="组信息">
            <el-input v-model="groupNode.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="save('group')">保存</el-button>
          </el-form-item>
        </el-form>


      </div>

    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import {saveViewsType,GetViewsType,SaveFile,RmFile} from './saveApi'
  import {cloneDeep} from 'lodash'
  const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const isOptions = ['是', '否'];
  const errOptions = ['转组', '挂断']
  export default {
    data() {
      return {
        Kxoptions:['1','2','3','4','5','6','7','8','9','0','*','#'],
        SelectCheck1: isOptions,
        SelectCheck2: errOptions,
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
        musicNode: {Min:'1',Max:'1',Name:'1',Timeout:'5000',Terminators:'#',IsCheck:'是'},
        agentNode: {},
        groupNode: {},
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
      //上传文件成功后方法
      dwSuccess(response,file){
        //成功后修改数据库存储的数据
        if(response.code ==0){
          let params ={
              "id":this.node.id,
              "sJson":response.data,
              "fid":file.uid,
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
      rmSuccess(file){
        let params={
          "fid":file.uid
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
      GetFileSize(file){
        const isLt2M = file.size / 1024 / 1024 < 10;
        const isJPG = file.type === 'audio/wav';
        if (!isLt2M) {
          this.$message.error('上传的文件不能超过 10MB!');
        }
        if (!isJPG) {
          this.$message.error('格式错误,只能是wav文件!');
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
              let params ={
                "id":id,
                "type":node.type
              }
              GetViewsType(params).then((result) => {
                if (result.code == "20000") {
                  if(node.type =="offTime"){
                      if(result.nodeList.Oid!=""){
                        this.offTimeNode=result.nodeList
                      }

                  }else if(node.type =="music"){
                    if(result.nodeList.Oid!=""){
                      this.musicNode=result.nodeList
                      this.musicNode.fileList = result.nodeList.DataList
                    }

                   // this.musicNode.fileList = [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg',uid:12312123123}]
                  }else if(node.type =="agent"){
                    this.agentNode=result.nodeList
                  }else if(node.type =="group"){
                    this.groupNode=result.nodeList
                  }
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
      save(val) {
        switch (val) {
          case "begin" :
            break;
          case "offTime":
            let params = {
              "id": this.node.id,
              "sJson": this.offTimeNode,
              "type": val
            }
            saveViewsType(params).then((result) => {
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
            break;
          case "music":
              console.log(this.musicNode)
            let paramsM = {
              "id": this.node.id,
              "sJson": this.musicNode,
              "type": val
            }
            saveViewsType(paramsM).then((result) => {
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
            break;
          case "agent":
            let paramsAgent = {
              "id": this.node.id,
              "sJson": this.agentNode,
              "type": val
            }
            saveViewsType(paramsAgent).then((result) => {
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
              break;
          case "group":
            let paramsGroup = {
              "id": this.node.id,
              "sJson": this.groupNode,
              "type": val
            }
            saveViewsType(paramsGroup).then((result) => {
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
            break;
          default :
            console.log('asdasd')
            break;

        }
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
