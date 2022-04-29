import { ElMessageBox } from 'element-plus'

const beforeClose = {
  before_close_normal: (resolve) => {
    ElMessageBox.confirm({
      title: '确定要关闭这一页吗',
      callback: function (action) {
        if (action == 'confirm') resolve(true)
        else resolve(false)
      }
    })
  }
}

export default beforeClose
