<script setup lang="ts">
import { FormField } from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const form = useForm({
  validationSchema: toTypedSchema(
    z
      .object({
        phone: z
          .string()
          .min(1, '请输入手机号')
          .regex(/^1[3-9]\d{9}$/, '请输入正确的手机号格式'),
        username: z.string().min(1, '请输入用户名'),
        password: z
          .string()
          .min(1, '请输入密码')
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, '密码必须包含大小写字母和数字'),
        confirmPassword: z.string().min(1, '请再次输入密码'),
        verificationCode: z.string().min(1, '请输入验证码')
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: '两次输入的密码不一致',
        path: ['confirmPassword']
      })
  ),
  initialValues: {
    phone: '',
    username: '',
    verificationCode: '',
    password: '',
    confirmPassword: ''
  }
})

const handleSubmit = form.handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD]"
  >
    <div class="relative w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-xl border border-[#BBDEFB] shadow-lg">
      <!-- Enhanced glow effect -->
      <div
        class="absolute inset-0 rounded-xl bg-gradient-to-r from-[#42A5F5]/30 to-[#1E88E5]/30 blur-2xl glow-effect"
      ></div>

      <div class="relative space-y-6">
        <!-- Header -->
        <div class="text-center">
          <h1 class="text-3xl font-bold bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] bg-clip-text text-transparent">
            欢迎登录
          </h1>
          <p class="mt-2 text-[#0D47A1]">请输入您的凭证以继续</p>
        </div>

        <!-- Form -->
        <form @submit="handleSubmit">
          <FormField v-slot="{ componentField, errors }" name="phone">
            <FormItem class="relative pb-6 space-y-0">
              <FormControl>
                <Input
                  type="text"
                  placeholder="请输入手机号"
                  class="w-full"
                  :class="errors.length && 'border-destructive'"
                  v-bind="componentField"
                />
              </FormControl>
              <Transition
                enter-active-class="transition-opacity"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity"
                leave-to-class="opacity-0"
              >
                <FormMessage class="absolute bottom-1 text-xs" />
              </Transition>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField, errors }" name="username">
            <FormItem class="relative pb-6 space-y-0">
              <FormControl>
                <Input
                  type="text"
                  placeholder="请输入用户名"
                  class="w-full"
                  :class="errors.length && 'border-destructive'"
                  v-bind="componentField"
                />
              </FormControl>
              <Transition
                enter-active-class="transition-opacity"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity"
                leave-to-class="opacity-0"
              >
                <FormMessage class="absolute bottom-1 text-xs" />
              </Transition>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField, errors }" name="password">
            <FormItem class="relative pb-6 space-y-0">
              <FormControl>
                <Input
                  type="password"
                  placeholder="请输入密码"
                  class="w-full"
                  :class="errors.length && 'border-destructive'"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription> 1 </FormDescription>
              <Transition
                enter-active-class="transition-opacity"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity"
                leave-to-class="opacity-0"
              >
                <FormMessage class="absolute bottom-1 text-xs" />
              </Transition>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField, errors }" name="confirmPassword">
            <FormItem class="relative pb-6 space-y-0">
              <FormControl>
                <Input
                  type="password"
                  placeholder="请再次输入密码"
                  class="w-full"
                  :class="errors.length && 'border-destructive'"
                  v-bind="componentField"
                />
              </FormControl>
              <Transition
                enter-active-class="transition-opacity"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity"
                leave-to-class="opacity-0"
              >
                <FormMessage class="absolute bottom-1 text-xs" />
              </Transition>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField, errors }" name="verificationCode">
            <FormItem class="relative pb-6 space-y-0">
              <FormControl>
                <Input
                  type="text"
                  placeholder="请输入验证码"
                  class="w-full"
                  :class="errors.length && 'border-destructive'"
                  v-bind="componentField"
                />
              </FormControl>
              <Transition
                enter-active-class="transition-opacity"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity"
                leave-to-class="opacity-0"
              >
                <FormMessage class="absolute bottom-1 text-xs" />
              </Transition>
            </FormItem>
          </FormField>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-[#BBDEFB]"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-[#0D47A1]">或</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <Button
            type="button"
            class="flex items-center justify-center gap-2 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#0D47A1] border border-[#BBDEFB]"
          >
            <i class="i-logos-google-icon text-xl"></i>
            Google
          </Button>
          <Button
            type="button"
            class="flex items-center justify-center gap-2 bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#0D47A1] border border-[#BBDEFB]"
          >
            <i class="i-logos-github-icon text-xl"></i>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes glow {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.3;
  }
}

.glow-effect {
  animation: glow 2s ease-in-out infinite;
}
</style>
