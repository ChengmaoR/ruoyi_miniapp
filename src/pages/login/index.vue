<template>
  <view class="index">
    <!-- <AtButton @click="loginClick"> 获取手机号 </AtButton> -->
    <image style="width: 100%" mode="widthFix" src="../../images/index1.jpg" />
    <Button
      class="btn-max-w"
      open-type="getPhoneNumber"
      @GetPhoneNumber="getPhoneNumber"
    >
      一键登录
    </Button>
  </view>
</template>
<script setup>
import "./index.less";
import Taro, { useLoad } from "@tarojs/taro";
import { wxLogin, getInfo } from "../../api/login";
import { Button } from "@tarojs/components";
import { setUserInfo, getUserInfo } from "../../utils/authwx";
import { ref } from "vue";
const myVideo = ref(null);
useLoad(() => {
  console.log("onLoad");
  let userInfo = getUserInfo();
  if (userInfo && userInfo.openid) {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  }
});
// 微信一键登录事件
async function getPhoneNumber(e) {
  if (e.detail.errMsg === "getPhoneNumber:ok") {
    console.log("code", e.detail.code); // 动态令牌
    const { code } = e.detail;
    // 使用 Taro 提供的 API 对 encryptedData 和 iv 进行解密处理
    try {
      const data = await Taro.login();
      console.log("data", data); // 动态令牌
      getInfo({ code }).then((res) => {
        const phoneNumber = res.msg;
        wxLogin({
          code: data.code,
        }).then((response) => {
          console.log("response", response);
          response.phoneNumber = phoneNumber;
          setUserInfo(response);
          Taro.navigateBack({
            delta: 1,
            fail: () => {
              Taro.switchTab({
                url: "/pages/index/index",
              });
            },
          });
        });
      });
    } catch (error) {
      // 处理解密失败的逻辑
      console.log(error);
    }
  } else {
    // 处理用户拒绝授权的逻辑
    console.log("用户拒绝授权");
  }
}
</script>
