export default {
  router_list: [
    {
      name: '首页',
      url: '/home',
      icon: 'el-icon-location',
      children: [
        {
          name: '课程列表',
          url: '/home/index'
        },
        {
          name: '班级列表',
          url: '/home/classList'
        }
      ]
    },
    {
      name: '数据管理',
      url: '/myPage',
      icon: 'el-icon-setting',
      children: [
        {
          name: '数据统计',
          url: '/myPage/index'
        },
      ]
    },
    {
      name: '转介绍用户',
      url: '/transfer',
      icon: 'el-icon-user',
    }
  ]
}
