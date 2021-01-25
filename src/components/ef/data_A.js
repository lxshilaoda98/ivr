let dataA = {
  "name": "电话流程",
  "nodeList": [
    {
      "id": "obkab1esau",
      "name": "开始",
      "type": "begin",
      "left": "161px",
      "top": "192px",
      "ico": "el-icon-thumb",
      "state": "success"
    },
    {
      "id": "4udv1k8lxx",
      "name": "工作时间",
      "type": "offTime",
      "left": "157px",
      "top": "305px",
      "ico": "el-icon-time",
      "state": "success"
    },
    {
      "id": "i2trp8m3et",
      "name": "播放音乐",
      "type": "music",
      "left": "51px",
      "top": "506px",
      "ico": "el-icon-video-play",
      "state": "success"
    },
    {
      "id": "wgv30ph1ps",
      "name": "播放音乐1",
      "type": "music",
      "left": "290px",
      "top": "504px",
      "ico": "el-icon-video-play",
      "state": "success"
    },
    {
      "id": "q0gl8fsiqo",
      "name": "转人工",
      "type": "agent",
      "left": "37px",
      "top": "652px",
      "ico": "el-icon-user",
      "state": "success"
    },
    {
      "id": "bfflib2mek",
      "name": "转组",
      "type": "group",
      "left": "291px",
      "top": "650px",
      "ico": "el-icon-files",
      "state": "success"
    }
  ],
  "lineList": [
    {
      "from": "obkab1esau",
      "to": "4udv1k8lxx"
    },
    {
      "from": "4udv1k8lxx",
      "to": "i2trp8m3et",
      "label": "是"
    },
    {
      "from": "4udv1k8lxx",
      "to": "wgv30ph1ps",
      "label": "否"
    },
    {
      "from": "i2trp8m3et",
      "to": "q0gl8fsiqo"
    },
    {
      "from": "wgv30ph1ps",
      "to": "bfflib2mek"
    }
  ]
}

export function getDataA() {
  return dataA
}
