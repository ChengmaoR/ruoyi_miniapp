<template>
  <AtTabBar
    backgroundColor="#B80000"
    selectedColor="#F5DF4D"
    color="#fff"
    fixed
    :tabList="[
      { title: '首页', iconType: 'home' },
      { title: '我的', iconType: 'user' },
    ]"
    @click="switchTab"
    :current="tabSelected.selected"
  />
</template>

<script setup>
import { AtTabBar } from "taro-ui-vue3";
import Taro from "@tarojs/taro";
import { useCounterStore } from "../stores/tab";
const tabSelected = useCounterStore();
const list = ["/pages/index/index", "/pages/center/index"];
function switchTab(index) {
  setSelected(index);
  let url = list[index];
  Taro.switchTab({ url });
}

function setSelected(index) {
  tabSelected.setSelected(index);
}
</script>

<style lang="scss">
@import "taro-ui-vue3/dist/style/components/tab-bar.scss";
@import "taro-ui-vue3/dist/style/components/icon.scss";
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 54px;
  height: 54px;
}

.tab-bar-item cover-view {
  font-size: 20px;
}
</style>
