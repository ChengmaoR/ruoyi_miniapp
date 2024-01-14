<template>
  <!-- <view class="item" :class="{ itemisQuestion: chat.type == 'question' }">
    <view class="avatar">
      <AtAvatar
        :image="chat.type == 'anwser' ? avatarUrl : avatarUrl1"
        circle
      />
    </view>
    <view
      class="chatContent"
      :class="{
        isAnwser: chat.type == 'anwser',
        isQuestion: chat.type == 'question',
      }"
    >
      <view class="chatTime">{{ chat.time }}</view>
      <view
        class="chatText"
        :class="{
          chatTextisAnwser: chat.type == 'anwser',
          chatTextisQuestion: chat.type == 'question',
        }"
      >
        <view class="cursor" v-if="chat.loading == true"></view>
        <view v-else>{{ chat.message }}</view>
      </view>
    </view> -->
  <AtTimeline pending :items="chat"> </AtTimeline>
  <!-- </view> -->
</template>
<script setup>
defineProps(["chat"]);
import { AtAvatar, AtTimeline } from "taro-ui-vue3";
import avatarUrl from "../images/avatar.jpg";
import avatarUrl1 from "../images/avatar1.jpeg";
</script>
<style scoped>
.item {
  display: flex;
  width: 100%;
  height: 100%;
  /* align-items: start; */
  font-weight: bold;
}
.avatar {
  margin: 3px;
  min-width: 40px;
}
.itemisQuestion {
  flex-direction: row-reverse;
}
.isQuestion {
  align-items: end;
}
.isAnwser {
  /* align-items: start; */
}
@keyframes blink {
  0% {
    opacity: 1;
  } /* 光标初始状态，完全可见 */
  50% {
    opacity: 0;
  } /* 光标消失状态，完全透明 */
  100% {
    opacity: 1;
  } /* 光标再次出现，完全可见 */
}

.cursor {
  display: inline-block;
  width: 2px; /* 光标的宽度 */
  height: 20px; /* 光标的高度 */
  background-color: #fff; /* 光标的颜色 */
  animation: blink 1s infinite; /* 应用动画效果，持续时间为 1 秒，并且无限循环 */
}

.chatContent {
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chatTime {
  color: #8d9095;
}
.chatText {
  text-align: left;
  padding: 0.5rem;
  border-radius: 5px;
  white-space: normal;
  word-break: break-word;
}
.chatTextisAnwser {
  color: var(--el-color-info-light-8);
  /* background-color: var(--el-color-primary-dark-2); */
  background-color: rgba(0, 0, 0, 0.6);
}
.chatTextisQuestion {
  /* background-color: #e5eaf3; */
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
