/**
 * Created by Administrator on 2020/12/29.
 */
import request from './request_utils'

export function GetRobotList(query) {
  return request({
    url: '/robot/getList',
    method: 'get',
    params : query
  })
}


export function GetIVRSvc(query) {
  return request({
    url: '/call/getIVRSvc',
    method: 'get',
    params: query
  })
}


export function GetIvrModel(query) {
  return request({
    url: '/GetIvrModel',
    method: 'get',
    params: query
  })
}

//初始化流程
export function initSaveIvr(query) {
  return request({
    url: '/ivr/create',
    method: 'post',
    data: query
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

export function saveViewsCode(query) {
  return request({
    url: '/IvrSaveForCode',
    method: 'post',
    params: query
  })
}

export function getViewsCode(query) {
  return request({
    url: '/GetViewsCode',
    method: 'get',
    params: query
  })
}

export function getViewsList(query) {
  return request({
    url: '/GetViewsList',
    method: 'get',
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




