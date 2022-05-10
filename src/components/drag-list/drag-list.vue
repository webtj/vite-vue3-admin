<template>
  <div class="drag-list-wrapper">
    <div class="drag-list-con con1">
      <slot name="left-title"></slot>
      <draggable v-model="modelValue.leftList" :item-key="itemKey" :chosenClass="chosenClass" forceFallback="true"
        group="drag_list" class="drop-box1" :class="dropConClass.left" @change="handleChange"
        @end="handleEnd($event, 'left')" :move="onMove">
        <template #item="{ element }">
          <div class="drag-list-item">
            <slot name="left" :itemLeft="element">{{ element }}</slot>
          </div>
        </template>
      </draggable>
    </div>
    <div class="drag-list-con con2">
      <slot name="right-title"></slot>
      <draggable v-model="modelValue.rightList" :item-key="itemKey" :chosenClass="chosenClass" forceFallback="true"
        group="drag_list" class="drop-box2" :class="dropConClass.right" @change="handleChange"
        @end="handleEnd($event, 'right')" :move="onMove">
        <template #item="{ element }">
          <div class="drag-list-item">
            <slot name="right" :itemRight="element">{{ element }}</slot>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import draggable from 'vuedraggable'
const emit = defineEmits(['on-change', 'update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      leftList: [],
      rightList: []
    })
  },
  dropConClass: {
    type: Object,
    default: () => ({})
  },
  chosenClass: {
    type: String,
    default: "chosen"
  },
  itemKey: {
    type: String,
    default: "id"
  }
})
//更新父组件数据
const handleChange = () => emit(`update:modelValue`, props['modelValue'])

const handleEnd = (event, type) => {
  //拖拽结束展示拖拽记录
  let [src, target] = [type, '']
  if (event.from === event.to) target = 'left'
  else target = type === 'left' ? 'right' : type
  let date = new Date()
  emit('on-change', {
    src: src,
    target: target,
    oldIndex: event.oldIndex,
    newIndex: event.newIndex,
    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  })
};

//如果选项配置disabled属性，则无法拖动
const onMove = (e, originalEvent) => {
  if (e.draggedContext.element.disabled == true) return false;
  else return true;
}
</script>
<style lang="scss">
.drag-list-wrapper {
  height: 100%;

  .drag-list-con {
    width: 50%;
    float: left;
  }
}

.chosen {
  border: solid 1px var(--el-color-primary) !important;
}
</style>
