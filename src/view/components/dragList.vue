<template>
  <div>
    <el-alert title="组件提示" type="info"
      description="可拖拽的内容都是通过具名作用域插槽工作，左侧left.itemLeft,右侧right.itemRight，操作记录需@on-change接受,拖拽数据已通过v-model实现数据的双向绑定 "
      show-icon>
    </el-alert>
    <el-card class="dragListCon">
      <div class="drag-box-card">
        <drag-list v-model="showList" :dropConClass="dropConClass" @on-change="handleChange">
          <template #left-title>
            <h3>待办事项</h3>
          </template>
          <template #left="left">
            <el-card class="drag-item">
              <span>
                <e-icon type="Lock" color="red" v-if="left.itemLeft.disabled"></e-icon>
                {{ left.itemLeft.name }}
              </span>
            </el-card>
          </template>
          <template #right-title>
            <h3>已完成事项</h3>
          </template>
          <template #right="right">
            <el-card class="drag-item">
              <span>
                <e-icon type="Lock" color="red" v-if="right.itemRight.disabled"></e-icon>
                {{ right.itemRight.name }}
              </span>
            </el-card>
          </template>
        </drag-list>
      </div>
      <div class="handle-log-box">
        <h3>操作记录</h3>
        <div class="handle-inner-box">
          <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
        </div>
      </div>
      <div class="handle-log-box">
        <h3>待办事项数据</h3>
        <div class="handle-inner-box">
          <pre>{{ showList.leftList }}</pre>
        </div>
      </div>
      <div class="handle-log-box">
        <h3>完成事项数据</h3>
        <div class="handle-inner-box">
          <pre>{{ showList.rightList }}</pre>
        </div>
      </div>
    </el-card>

  </div>
</template>
<script setup>
import DragList from '_c/drag-list'
let showList = reactive({
  leftList: [],
  rightList: []
})
let handleList = reactive([])
let dropConClass = reactive({
  left: ['drop-box', 'left-drop-box'],
  right: ['drop-box', 'right-drop-box']
})
const handleChange = ({ src, target, oldIndex, newIndex, time }) => {
  handleList.unshift(`${time} ${src}(${oldIndex}) -> ${target}(${newIndex})`)
}

onMounted(() => {
  showList.leftList = [
    {
      "name": "早晨起来拥抱太阳",
      "id": 10
    },
    {
      "name": "让身体充满灿烂的阳光",
      "id": 20
    },
    {
      "name": "保持激情和冲动",
      "id": 30,
      "disabled": true
    },
    {
      "name": "嘴角向下，会迷失方向",
      "id": 40
    },
    {
      "name": "嘴角向上，蒸蒸日上",
      "id": 50
    },
    {
      "name": "哎嘿，慢慢的正能量",
      "id": 60
    }
  ]

  showList.rightList = [
    {
      "name": "我成了世界上最帅的男人",
      "id": 666,
      "disabled": true
    }
  ]
})
</script>
<style lang="scss">
.dragListCon {
  margin-top: 20px;

  .el-card__body {
    display: flex;
    flex-flow: row wrap;
    flex: 1;

    .drag-box-card {
      width: 600px;
      height: 560px;

      h3 {
        padding: 10px 15px;
      }

      .drop-box {
        border: 1px solid #eeeeee;
        height: 455px;
        border-radius: 5px;
        overflow: auto;
      }

      .drag-item {
        margin: 10px;
      }
    }

    .handle-log-box {
      margin-left: 20px;
      width: 300px;

      h3 {
        padding: 10px 14px;
      }

      .handle-inner-box {
        border: 1px solid #eeeeee;
        height: 455px;
        border-radius: 5px;
        overflow: auto;

        pre {
          padding: 20px;
        }

        p {
          padding: 14px 0;
          margin: 0 14px;
          border-bottom: 1px dashed #eeeeee;
        }
      }
    }
  }
}
</style>
