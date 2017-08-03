export default {
	getItem: function(key) {
    let value
    try {
      value = localStorage.getItem(key)
    } catch (ex) {
      //开发环境下提示错误
      if (__DEV__) {
        console.error('localStorage.getItem报错，', ex.message)
      }
    } finally {
      return value
    }
  },
  setItem: function(key, value) {
    // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
    try {
      localStorage.setItem(key, value)
    } catch (ex) {
      if (__DEV__) {
        console.error('locaStorage.setItem报错，', ex.message)
      }
    }
  }
}