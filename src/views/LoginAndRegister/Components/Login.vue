<script setup lang="ts">
import type { FormState } from '@/api/login/types.ts'
import { reactive, watch } from 'vue'
import { Form } from 'ant-design-vue'

const formState = reactive<FormState>({
  username: '',
  phone: '',
  password: '',
  rePassword: ''
})

const formRef = ref<Form>()

// 定义表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: '密码必须包含大小写字母和数字',
      trigger: ['blur', 'change']
    }
  ],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve() // 如果确认密码为空，直接通过验证
        return value === formState.password ? Promise.resolve() : Promise.reject('两次输入的密码不一致')
      },
      trigger: ['blur', 'change']
    }
  ]
}

watch(
  () => formState.password,
  () => {
    formRef.value?.validateFields(['rePassword'])
  }
)
</script>

<template>
  <div class="login-page">
    <div class="form-container">
      <a-form ref="formRef" :model="formState">
        <a-form-item label="用户名" name="username" :rules="rules.username">
          <a-input v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="手机号" name="phone" :rules="rules.phone">
          <a-input v-model:value="formState.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="rules.password">
          <a-input v-model:value="formState.password" type="password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item label="确认密码" name="rePassword" :rules="rules.rePassword">
          <a-input v-model:value="formState.rePassword" type="password" placeholder="请再次输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  flex: 1;
}
</style>
