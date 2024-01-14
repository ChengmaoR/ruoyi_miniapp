<template>
  <view class="out">
    <view class="video" v-if="showWebView">
      <web-view :src="url" />
    </view>
    <!-- <AtModal
      isOpened
      title="产品溯源"
      confirmText="确认"
      @confirm="handleConfirm"
      :content="content"
    /> -->
    <!-- <AtCurtain :isOpened="isOpened" @close="handleConfirm">
      <image
        style="width: 100%; height: 250px"
        src="https://img1.baidu.com/it/u=3924402649,2987002415&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      />
      <view class="textContent">{{ content }}</view>
    </AtCurtain> -->
  </view>
</template>

<script setup>
import "./index.less";
import Taro, { useLoad, useDidShow } from "@tarojs/taro";
import { getCodeInfo, codeCheck } from "../../api/code";
import { ref, nextTick } from "vue";
import { AtModal, AtCurtain } from "taro-ui-vue3";
import { setUserInfo, getUserInfo } from "../../utils/authwx";
import { View } from "@tarojs/components";
const codeInfo = ref({});
const codeid = ref("");
const content = ref("");
const isOpened = ref(false);
const showWebView = ref(false);
const flag = ref("");
const url = ref("");
useDidShow(() => {
  console.log("useDidShow");
  let openid = getUserInfo() && getUserInfo().openid;
  if (!openid) {
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  } else {
    if (codeid.value) {
      codeCheck({ id: codeid.value, openid }).then((response) => {
        flag.value = response.flag;
        // if (response.flag == 0) {
        //   content.value = "本次查询为第一次查询";
        // } else {
        //   content.value = "该溯源码已失效";
        // }
        getCodeInfo(codeid.value).then((response) => {
          if (response.code == 200) {
            codeInfo.value = response.data;
            url.value = `https://dianshang.upp100.com:9996?robotId=${codeInfo.value.robotId}&id=${codeInfo.value.id}&flag=${flag.value}`;
            console.log("codeInfo", url);
            nextTick(() => {
              showWebView.value = true;
            });
            // url.value = `http://127.0.0.1:5173?robotId=robot_${codeInfo.value.robotId}&id=${codeInfo.value.id}`;
          }
        });
      });
      // handleChange();
    }
  }
});
useLoad((query) => {
  if (query.q && query.q != "undefined") {
    //扫码进入
    const qrUrl = decodeURIComponent(query.q); // 获取到二维码原始链接内容
    //GetWxMiniProgramUrlParam() 这个方法是解析链接地址中的参数方法
    const e = GetWxMiniProgramUrlParam(qrUrl); //此处就是我们要获取的参数 json
    //比如我要得到orderId的值，直接取值即可
    const id = e.id;
    codeid.value = id;
  } else {
    Taro.showToast({
      title: "请扫码进入此页面",
      icon: "error",
      duration: 3000,
      complete: () => {
        Taro.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  }
});
function GetWxMiniProgramUrlParam(url) {
  let theRequest = {};
  if (url.indexOf("#") != -1) {
    const str = url.split("#")[1];
    const strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  } else if (url.indexOf("?") != -1) {
    const str = url.split("?")[1];
    const strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
function handleChange() {
  isOpened.value = true;
}
function handleConfirm() {
  if (flag.value == 0) {
    showWebView.value = true;
    isOpened.value = false;
  } else {
    // Taro.exitMiniProgram();
    Taro.switchTab({
      url: "/pages/index/index",
    });
  }
}
</script>
