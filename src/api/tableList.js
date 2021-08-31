import request from './index'
export const getList = (params)=>{
  // 请求列表数据
  return request.get('/api/tableList', {
    params
  })
};

export const getTreeList = () => {
  return request.get('/api/tableList/tree')
}

export const getClassTags = () => {
  return request.get('api/tableList/classList')
}

export const addTagList = () => {
  return request.get('api/tableList/addTagList')
}

export const saveTag = (params) => {
  return request.get('api/tableList/saveTag', {
    params
  })
}

export const delTag = (params) => {
  return request.get('api/tableList/delTag', {
    params
  })
}
