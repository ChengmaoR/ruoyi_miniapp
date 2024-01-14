<template>
  <view class="index">
    <at-flex direction="column">
      <at-flex-item>
        <image
          style="width: 100%; background: #fff"
          mode="widthFix"
          src="../../images/index1.jpg"
        />
      </at-flex-item>
      <at-flex-item>
        <image
          style="width: 100%; background: #fff"
          mode="widthFix"
          src="../../images/index2.png"
        />
      </at-flex-item>
      <at-flex-item>
        <image
          style="width: 100%; background: #fff"
          mode="widthFix"
          src="../../images/index3.png"
        />
      </at-flex-item>
    </at-flex>
  </view>
</template>

<script setup>
import { AtFlex, AtFlexItem } from "taro-ui-vue3";
import "./index.less";
import { useCounterStore } from "../../stores/tab";
const tabSelected = useCounterStore();
import { useDidShow } from "@tarojs/taro";
useDidShow(() => {
  console.log("onLoad");
  tabSelected.setSelected(0);
});
</script>
