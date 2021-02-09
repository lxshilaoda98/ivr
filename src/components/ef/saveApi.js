/**
 * Created by Administrator on 2020/12/29.
 */
import request from './request_utils'


export function GetIvrModel(query) {
  return request({
    url: '/GetIvrModel',
    method: 'get',
    params: query
  })
}
//写入流程
export function SenIvrModel(query) {
  return request({
    url: '/SenIvrModel',
    method: 'post',
    params: query
  })
}

//保存流程
export function saveModel(query) {
  return request({
    url: '/IvrSave',
    method: 'post',
    params: query
  })
}
export function saveViewsType(query) {
  return request({
    url: '/IvrSaveForType',
    method: 'post',
    params: query
  })
}

export function GetViewsType(query) {
  return request({
    url: '/GetViewsType',
    method: 'get',
    params: query
  })
}


export function SaveFile(query) {
  return request({
    url: '/MusicSaveFile',
    method: 'post',
    params: query
  })
}
export function RmFile(query) {
  return request({
    url: '/MusicRmFile',
    method: 'DELETE',
    params: query
  })
}




