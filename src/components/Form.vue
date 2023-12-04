<template>
  <form class="position-absolute-center">
    <!-- 姓名 -->
    <label for="name" class="form-label text-18 text-gray">
      姓名
      <input type="text"
             class="form-control mb-2"
             id="name"
             v-model-save="form.name"
             placeholder="請輸入姓名">
    </label>

    <!-- 信箱 -->
    <label for="email" class="form-label text-18 text-gray">
      信箱
      <input type="email"
             class="form-control mb-2"
             id="email"
             v-model-save="form.email"
             placeholder="請輸入信箱">
    </label>

    <!-- 手機 -->
    <label for="phone" class="form-label text-18 text-gray">
      手機
      <input type="phone"
             class="form-control mb-2"
             id="phone"
             v-model-save="form.phone"
             placeholder="請輸入手機">
    </label>

    <!-- 身分證 -->
    <label for="id" class="form-label text-18 text-gray">
      身分證
      <input type="text"
             class="form-control mb-2"
             id="id"
             v-model-save="form.id"
             placeholder="請輸入身分證">
    </label>

    <pre class="mt-10"><code>{{ form }}</code></pre>
  </form>

</template>

<script setup>
import { reactive } from 'vue'

// data
const form = reactive({
  name: '',
  id: '',
  email: '',
  phone: ''
})

defineExpose({
  form
})

</script>

<style lang='scss' scope></style>
