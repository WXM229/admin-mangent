import request from './index'

export const sideList = () => {
  return request.get('api/sideBar')
};
