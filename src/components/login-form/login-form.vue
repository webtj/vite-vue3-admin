<template>
  <el-form ref="loginForm" :model="form" :rules="rules">
    <el-form-item prop="userName">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <template #prefix>
          <e-icon type="User" size="16"></e-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <template #prefix>
          <e-icon type="Lock" size="16"></e-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSubmit" class="loginBtn">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
const emit = defineEmits(['on-success-valid'])
const loginForm = ref(null)
const form = reactive({
  userName: 'admin',
  password: 'admin'
})

//校验规则
const rules = reactive({
  userName: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})

//提交表单
const handleSubmit = async () => {
  if (!loginForm.value) return
  await loginForm.value.validate((valid, fields) => {
    if (valid) {
      emit('on-success-valid', {
        userName: form.userName,
        password: form.password
      })
    }
  })
}
</script>
