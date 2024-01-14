<template>
  <view class="index">
    <view class="userInfo">
      <at-flex>
        <at-flex-item :size="3" align="center">
          <AtAvatar circle :image="avataruser" size="large"></AtAvatar>
        </at-flex-item>
        <at-flex-item :size="9" align="center">
          <!-- <view class="my_nickname">{{ userInfo.nickName }}</view> -->
          <view class="my_nickname">{{ phoneNumberStr }}</view>
        </at-flex-item>
      </at-flex>
    </view>
    <view class="list_title">已溯源记录</view>
    <view class="list" v-if="items.length > 0">
      <view
        class="goods"
        v-for="(item, index) in items"
        :key="index"
        @tap="showAi(item.id || null)"
      >
        <at-flex align="center">
          <at-flex-item :size="3" align="center">
            <image
              style="width: 6rem; height: 4rem; background: #fff"
              mode="scaleToFill"
              :src="
                item.url ? getBaseUrl() + item.url : '../../images/index1.jpg'
              "
            />
          </at-flex-item>
          <at-flex-item :size="9" align="center">
            <view class="content">{{ item.name }}</view>
          </at-flex-item>
        </at-flex>
      </view>
    </view>
    <view class="empty" v-else>
      <image
        style="width: 50%; background: #fff"
        mode="widthFix"
        src="../../images/empty.png"
      />
      <view style="color: #b80000">暂无数据</view>
    </view>
    <AtCurtain :isOpened="isOpened" @close="onClose" closeBtnPosition="top">
      <view class="textContent"> 已验证此溯源码 </view>
    </AtCurtain>
  </view>
</template>

<script setup>
import "./index.less";
import { AtFlex, AtFlexItem, AtAvatar, AtCurtain } from "taro-ui-vue3";
import { ref } from "vue";
import Taro, { useReady, useLoad, useDidShow } from "@tarojs/taro";
import { hasCode } from "../../api/code";
import { getUserInfo, remoteUserInfo } from "../../utils/authwx";
import avataruser from "../../images/logo.jpeg";
import { getBaseUrl } from "../../utils/request";
import { useCounterStore } from "../../stores/tab";
const tabSelected = useCounterStore();
const items = ref([]);
const myVideo = ref(null);
const isOpened = ref(false);
const videoContext = ref();
const phoneNumberStr = ref();

useDidShow(() => {
  console.log("useDidShow");
  tabSelected.setSelected(1);
  let phoneNumber = getUserInfo() && getUserInfo().phoneNumber;
  if (!phoneNumber || phoneNumber == undefined) {
    remoteUserInfo();
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  } else {
    phoneNumberStr.value = phoneNumber;
    getData();
  }
});
function handleReachTop() {
  Taro.showToast({
    title: `reachTop 刷新数据`,
    icon: "loading",
    duration: genRandomNumber(3000),
    success(_) {
      // 模拟刷新数据
      items.value = getData();
    },
  });
}
function showAi() {
  isOpened.value = true;
}
function onClose() {
  isOpened.value = false;
}
function handleReachBottom() {
  Taro.showToast({
    title: `reachBottom 加载数据`,
    icon: "loading",
    duration: genRandomNumber(3000),
    success: (_) => {
      // 模拟加载数据 -> 附加 100 条数据
      items.value = items.value.concat(getData(10));
    },
  });
}
function getData() {
  let openid = getUserInfo() && getUserInfo().openid;
  console.log("openid", openid, !openid);
  if (!openid) {
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  }
  hasCode({ openid }).then((response) => {
    if (response.code == 200) {
      items.value = response.rows;
    }
  });
}
</script>
