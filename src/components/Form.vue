<template>
  <form class="position-absolute-center">
    <!-- 姓名 -->
    <label for="name" class="form-label text-18 text-gray">
      姓名
      <input type="text"
             class="form-control mb-2"
             id="name"
             maxlength="10"
             v-model-save="form.name"
             placeholder="請輸入姓名">
    </label>

    <!-- 信箱 -->
    <label for="email" class="form-label text-18 text-gray">
      信箱
      <input type="email"
             class="form-control mb-2"
             id="email"
             maxlength="10"
             v-model-save="form.email"
             placeholder="請輸入信箱">
    </label>

    <!-- 手機 -->
    <label for="phone" class="form-label text-18 text-gray">
      手機
      <input type="phone"
             class="form-control mb-2"
             id="phone"
             maxlength="10"
             v-model-save="form.phone"
             placeholder="請輸入手機">
    </label>

    <!-- 身分證 -->
    <label for="id" class="form-label text-18 text-gray">
      身分證
      <input type="text"
             class="form-control mb-2"
             id="id"
             maxlength="10"
             v-model-save="form.id"
             placeholder="請輸入身分證">
    </label>

    <pre class="mt-10"><code>{{ form }}</code></pre>

    <!-- 自動儲存提示 -->
    <template v-if="isSaveTipShow">
      <div class="position-absolute d-flex align-items-center">
        <div class="spinner-border text-secondary text-20" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span class="text-20 text-gray fw-bold-7 ms-5">已自動儲存</span>
      </div>
    </template>
  </form>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import debounce from 'lodash/debounce.js'

console.log(debounce)

// data
const form = reactive({
  name: '',
  id: '',
  email: '',
  phone: ''
})
const isSaveTipShow = ref(false)
const startAutoSave = ref(false)
const saveFormDebounce = debounce(saveForm, 1000)

// watch
watch(form, () => {
  if (!startAutoSave.value) return

  saveFormDebounce()
}, { deep: true })

onMounted(() => {
  // 生命週期1秒後開始自動儲存
  setTimeout(() => {
    startAutoSave.value = true
  }, 1000)
})

// 將表單變數暴露給 model-save direcitve
defineExpose({
  form
})

function saveForm () {
  console.log('此處 call api 儲存表單', form)

  isSaveTipShow.value = true

  setTimeout(() => {
    isSaveTipShow.value = false
  }, 1000)
}

</script>

<style lang='scss' scope></style>
