// pages/exam/index/index.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    spinShow: false,
    queryParam: {
      pageIndex: 1,
      pageSize: 8
    },
    tableData: [],
    total: 1
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.search()
  },
  pageChange({
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      this.setData({
        ['queryParam.pageIndex']: this.data.queryParam.pageIndex + 1
      });
    } else if (type === 'prev') {
      this.setData({
        ['queryParam.pageIndex']: this.data.queryParam.pageIndex - 1
      });
    }
    this.search()
  },
  search: function () {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/exampaper/answer/pageList', this.data.queryParam, function (data) {
      if (data.code === 1) {
        const re = data.response
        _this.setData({
          ['queryParam.pageIndex']: re.pageNum,
          ['queryParam.pageSize']: 8,
          tableData: re.list,
          total: re.pages
        });
      }
    }, function () {
      _this.setData({
        spinShow: false
      });
    })
  }
})