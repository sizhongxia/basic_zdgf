<template>
  <Form ref="loginForm" :model="form" :rules="ruleCustom" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" :placeholder="$t('input_username')">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" :placeholder="$t('input_password')">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" :loading="loading" type="primary" long>{{$t('login')}}</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
  },
  data () {
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('input_username')))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('input_password')))
      }
      callback()
    }
    return {
      loading: false,
      form: {
        userName: '',
        password: ''
      },
      ruleCustom: {
        userName: [{
          validator: validateUserName,
          trigger: 'blur'
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
  },
  methods: {
    handleSubmit () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            callback: () => {
              this.loading = false
            }
          })
        }
      })
    }
  }
}
</script>
