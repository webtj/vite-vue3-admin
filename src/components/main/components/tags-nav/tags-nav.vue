<template>
  <div class="tags-nav" ref="tagsNav">
    <div class="close-con">
      <el-dropdown @command="handleTagsOption">
        <e-icon type="CircleClose" class="closeTagHandle"></e-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="close-others">{{
              t("router.closeOther")
            }}</el-dropdown-item>
            <el-dropdown-item command="close-all">{{
              t("router.closeAll")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <ul
      v-show="visible"
      :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
      class="contextmenu"
    >
      <li
        v-for="(item, key) of menuList"
        @click="handleTagsOption(key)"
        :key="key"
      >
        {{ item }}
      </li>
    </ul>
    <div class="btn-con left-btn">
      <el-button type="text" @click="handleScroll(240)">
        <e-icon type="ArrowLeft" size="18"></e-icon>
      </el-button>
    </div>
    <div class="btn-con right-btn">
      <el-button type="text" @click="handleScroll(-240)">
        <e-icon type="ArrowRight" size="18"></e-icon>
      </el-button>
    </div>
    <div class="scroll-outer" ref="scrollOuter">
      <div
        ref="scrollBody"
        class="scroll-body"
        :style="{ left: tagBodyLeft + 'px' }"
      >
        <TransitionGroup name="tag-list">
          <el-tag
            v-for="(item, index) in list"
            ref="tagsPageOpened"
            :key="`tag-nav-${index}`"
            class="tag-nav"
            :class="{ active: isCurrentTag(item) }"
            :type="isCurrentTag(item) ? '' : 'info'"
            effect="plain"
            :closable="isCloseable(item.name)"
            @click="handleClick(item)"
            @close="handleClose(item)"
            @contextmenu.prevent.native="contextMenu(item, $event)"
          >
            <span class="tag-dot-inner"></span>
            <span class="tag-text">{{ showTitleInside(item) }}</span>
          </el-tag>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { showTitle, routeEqual } from "@/libs/utils";
import beforeClose from "@/router/before-close";
import config from "@/config";
const router = useRouter();
const { t } = useI18n();
const emit = defineEmits(["input", "on-close"]);
const props = defineProps({
  value: Object,
  list: {
    type: Array,
    default() {
      return [];
    },
  },
});

//获取refs
const scrollOuter = ref(null);
const scrollBody = ref(null);
const tagsNav = ref(null);

//获取当前路由信息
const currentRouteObj = computed(() => {
  const { name, params, query } = props.value;
  return { name, params, query };
});

let tagBodyLeft = ref(0);
let rightOffset = ref(40);
let outerPadding = ref(4);
let contextMenuLeft = ref(0);
let contextMenuTop = ref(0);
let visible = ref(false);
let menuList = reactive({
  others: t("router.closeOther"),
  all: t("router.closeAll"),
});

//vue当前实例
let currentInstance = null;

//关闭标签操作
const handleTagsOption = (type) => {
  if (type.includes("all")) {
    // 关闭所有，除了home
    let res = props.list.filter((item) => item.name === config.homeName);
    emit("on-close", res, "all");
  } else if (type.includes("others")) {
    // 关闭除当前页和home页的其他页
    let res = props.list.filter(
      (item) =>
        routeEqual(currentRouteObj.value, item) || item.name === config.homeName
    );
    emit("on-close", res, "others", currentRouteObj.value);
    setTimeout(() => {
      getTagElementByRoute(currentRouteObj.value);
    }, 100);
  }
};

//首页标签不可关闭
const isCloseable = (name) => name != config.homeName;

//展示标题
const showTitleInside = (item) => showTitle(item);

//tag标签上右击，可关闭其他 和关闭所有
const contextMenu = (item, e) => {
  //首页没有右击功能
  if (item.name === config.homeName) return;
  visible.value = true;
  const offsetLeft = tagsNav.value.getBoundingClientRect().left;
  contextMenuLeft.value = e.clientX - offsetLeft + 10;
  contextMenuTop.value = e.clientY - 64;
};
//关闭右击出现的菜单
const closeContextMenu = () => (visible.value = false);
watch(visible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeContextMenu);
  } else {
    document.body.removeEventListener("click", closeContextMenu);
  }
});

//点击tag标签
const handleClick = (item) => emit("input", item);
const handleClose = (current) => {
  //关闭当前标签,b并检查是否有前置关闭的是否已经关闭
  if (
    current.meta &&
    current.meta.beforeCloseName &&
    current.meta.beforeCloseName in beforeClose
  ) {
    new Promise(beforeClose[current.meta.beforeCloseName]).then((close) => {
      if (close) closeTag(current);
    });
  } else closeTag(current);
};
const closeTag = (route) => {
  //拿到删除后剩下的tagNavList
  let remainTagNavList = props.list.filter((item) => !routeEqual(route, item));
  emit("on-close", remainTagNavList, undefined, route);
};

//判断是否重复点击路由
const isCurrentTag = (item) => {
  return routeEqual(currentRouteObj.value, item);
};

//执行左右滚动操作
const handleScroll = (offset) => {
  nextTick(() => {
    const outerWidth = scrollOuter.value.offsetWidth;
    const bodyWidth = scrollBody.value.offsetWidth;
    if (offset > 0) {
      tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset);
    } else {
      if (outerWidth < bodyWidth) {
        if (tagBodyLeft.value < -(bodyWidth - outerWidth)) {
          tagBodyLeft.value = tagBodyLeft.value;
        } else {
          tagBodyLeft.value = Math.max(
            tagBodyLeft.value + offset,
            outerWidth - bodyWidth
          );
        }
      } else {
        tagBodyLeft.value = 0;
      }
    }
  });
};

//点击左侧菜单时，标签可能过多滚动，则将试图定位到该标签上
const moveToView = (tag) => {
  const outerWidth = scrollOuter.value.offsetWidth;
  const bodyWidth = scrollBody.value.offsetWidth;
  if (bodyWidth < outerWidth) {
    tagBodyLeft.value = 0;
  } else if (tag.offsetLeft < -tagBodyLeft.value) {
    // 标签在可视区域左侧
    tagBodyLeft.value = -tag.offsetLeft + outerPadding.value;
  } else if (
    tag.offsetLeft > -tagBodyLeft.value &&
    tag.offsetLeft + tag.offsetWidth < -tagBodyLeft.value + outerWidth
  ) {
    // 标签在可视区域
    tagBodyLeft.value = Math.min(
      0,
      outerWidth - tag.offsetWidth - tag.offsetLeft - outerPadding.value
    );
  } else {
    // 标签在可视区域右侧
    tagBodyLeft.value = -(
      tag.offsetLeft -
      (outerWidth - outerPadding.value - tag.offsetWidth)
    );
  }
};

const getTagElementByRoute = (route) => {
  nextTick(() => {
    //有没有更好的方法获取多个refs？？
    let refsTag = currentInstance.proxy.$refs.tagsPageOpened;
    refsTag.forEach((item) => moveToView(item.$el));
  });
};

onMounted(() => {
  currentInstance = getCurrentInstance();
});
</script>

<style lang="scss">
@import "./tags-nav.scss";
</style>
