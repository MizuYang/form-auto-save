<template>
  <form class="position-absolute-center text-cen">
    <ol class="text-18 text-gray mb-5">
      <li>表單輸入文字後 1秒內未操作, 就會自動儲存</li>
      <li>此處模擬 AJAX 非同步3秒後才儲存完畢, 並顯示儲存成功提示</li>
      <li>若在儲存完畢前離開、重整頁面, 就會彈窗提示用戶表單尚未儲存好</li>
    </ol>

    <!-- 姓名 -->
    <div>
      <label for="name" class="form-label text-18 text-gray">
        姓名
        <input type="text"
               class="form-control mb-2"
               id="name"
               v-model-save="form.name"
               placeholder="請輸入姓名">
      </label>
    </div>

    <!-- 信箱 -->
    <div>
      <label for="email" class="form-label text-18 text-gray">
        信箱
        <input type="email"
               class="form-control mb-2"
               id="email"
               v-model-save="form.email"
               placeholder="請輸入信箱">
      </label>
    </div>

    <!-- 手機 -->
    <div>
      <label for="phone" class="form-label text-18 text-gray">
        手機
        <input type="phone"
               class="form-control mb-2"
               id="phone"
               maxlength="10"
               v-model-save="form.phone"
               placeholder="請輸入手機">
      </label>
    </div>

    <!-- 身分證 -->
    <div>
      <label for="id" class="form-label text-18 text-gray">
        身分證
        <input type="text"
               class="form-control mb-2"
               id="id"
               maxlength="10"
               v-model-save="form.id"
               placeholder="請輸入身分證">
      </label>
    </div>

    <pre class="mt-10"><code>{{ form }}</code></pre>

    <!-- 自動儲存提示 -->
    <template v-if="tipMessage.isShow">
      <div class="position-absolute d-flex align-items-center">
        <div class="spinner-border text-20"
             :class="tipMessage.spinnerClassName"
             role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span class="text-20 text-gray fw-bold-7 ms-5"
              :class="tipMessage.className">
          {{ tipMessage.message }}
        </span>
      </div>
    </template>
  </form>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import debounce from 'lodash/debounce.js'

// data
const form = reactive({
  name: '',
  id: '',
  email: '',
  phone: ''
})

const tipMessage = ref({
  isShow: false,
  message: '自動儲存中...',
  className: 'text-gray',
  spinnerClassName: 'text-secondary'
})
const startWatchFormChange = ref(false) // 避免生命週期取得 localStorage 時, 重複觸發自動儲存
const hasSave = ref(false) // 若自動儲存尚未成功, 則在用戶重整頁面時提醒
const saveFormDebounce = debounce(saveForm, 1000)

// watch
watch(form, () => {
  if (!startWatchFormChange.value) return

  hasSave.value = false

  // 若 window 底下沒監聽 beforeunload 事件, 才監聽
  addBeforeunloadEvent()

  saveFormDebounce()
}, { deep: true })

onMounted(() => {
  // 生命週期1秒後開始表單的自動儲存
  setTimeout(() => {
    startWatchFormChange.value = true
  }, 1000)
})

// 將表單變數暴露給 model-save direcitve
defineExpose({
  form
})

async function saveForm () {
  console.log('此處 call api 儲存表單', form)
  // tipMessage.value = '自動儲存中...'
  setSaveTip('loading')
  await savePromise()

  console.log('儲存完畢')

  // 儲存完表單後, 移除 beforeunload 事件
  removeBeforeunloadEvent()

  setSaveTip('success')
  setTimeout(() => {
    setSaveTip('loading')
    tipMessage.value.isShow = false

    // call api 儲存完畢後才執行
    hasSave.value = false
  }, 1000)
}
// 模擬 ajax 非同步 (3秒)
function savePromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}
// 表單尚未儲存完時, 阻止用戶離開、重整頁面
function handleBeforeUnload (event) {
  // 若已經儲存過，則不顯示提示訊息
  if (hasSave.value) return ''

  // 阻止默認行為，以顯示自定義的提示訊息
  event.preventDefault()

  // Chrome 需要返回值
  event.returnValue = ''

  // 顯示提示訊息
  const message = '您的表單尚未儲存，確定要離開嗎？'
  return message
}
function addBeforeunloadEvent () {
  // 若未監聽 beforeunload 事件, 才監聽
  if (!window.onbeforeunload) {
    window.addEventListener('beforeunload', handleBeforeUnload)
  }
}
function removeBeforeunloadEvent () {
  window.removeEventListener('beforeunload', handleBeforeUnload)
}
function setSaveTip (status) {
  const data = {
    loading: {
      isShow: true,
      message: '自動儲存中...',
      className: 'text-gray',
      spinnerClassName: 'text-secondary'
    },
    success: {
      isShow: true,
      message: '自動儲存成功',
      className: 'text-success',
      spinnerClassName: 'text-success'
    }
  }
  tipMessage.value = data[status]
}

</script>

<style lang='scss' scope></style>
