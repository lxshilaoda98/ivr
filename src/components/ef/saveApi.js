/**
 * Created by Administrator on 2020/12/29.
 */
import request from './request_utils'


export function saveModel(query) {
  return request({
    url: '/IvrSave',
    method: 'post',
    params: query
  })
}


