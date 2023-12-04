import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

// directive
app.directive('model-save', {
  mounted (el, binding) {
    console.log('binding', binding)

    // 設定輸入框的值為 localStorage 的值
    const setInputValue = (value) => (el.value = value)

    // 將欄位的值存入 form
    const setSyncDate = (value) => (binding.instance.form[el.id] = value)

    // 將欄位的值存入 localStorage
    const setLocalStorage = (value) => localStorage.setItem(`form-${el.id}`, value)

    // 如果 localStorage 中不存在該欄位的值，則將初始值存入 localStorage
    if (!localStorage[`form-${el.id}`]) {
      setLocalStorage(binding.value)
    }

    setInputValue(localStorage[`form-${el.id}`])
    setSyncDate(el.value)

    el.handSave = (e) => {
      setLocalStorage(e.target.value)
      setSyncDate(e.target.value)
    }

    el.addEventListener('input', el.handSave)
    el.addEventListener('change', el.handSave)
  },
  unmounted (el) {
    el.removeEventListener('input', el.handSave)
    el.removeEventListener('change', el.handSave)
  }
})

app.mount('#app')
