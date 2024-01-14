import Taro from '@tarojs/taro'
const TokenKey = 'userInfo'

// 获取用户信息并存储到本地
const setUserInfo = (userInfo) => {
  try {
    // 使用 Taro 提供的本地存储方法，将用户信息转换为 JSON 字符串并存储到本地
    Taro.setStorageSync(TokenKey, JSON.stringify(userInfo));
    console.log('用户信息已存储');
  } catch (error) {
    console.error('存储用户信息失败：', error);
  }
};
// 获取用户信息并存储到本地
const remoteUserInfo = (userInfo) => {
  try {
    // 使用 Taro 提供的本地存储方法，将用户信息转换为 JSON 字符串并存储到本地
    Taro.removeStorageSync(TokenKey);
    console.log('用户信息已删除');
  } catch (error) {
    console.error('删除用户信息失败：', error);
  }
};

// 从本地获取用户信息
const getUserInfo = () => {
  try {
    // 使用 Taro 提供的本地存储方法，获取存储在本地的用户信息
    const userInfoString = Taro.getStorageSync(TokenKey);
    if (userInfoString) {
      // 将 JSON 字符串转换为对象并返回
      return JSON.parse(userInfoString);
    } else {
      return null;
    }
  } catch (error) {
    console.error('获取用户信息失败：', error);
    return null;
  }
};

export { setUserInfo, getUserInfo, remoteUserInfo };
