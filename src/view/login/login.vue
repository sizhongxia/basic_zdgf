<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="$t('login_card_title')" :bordered="false">
        <a href="#" slot="extra">
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
        </a>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">{{$t('login_tip')}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import Language from '_c/main/components/language'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    LoginForm,
    Language
  },
  computed: {
    local () {
      return this.$store.state.app.local
    }
  },
  methods: {
    ...mapMutations([
      'setLocal'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ userName, password, callback }) {
      const _this = this
      _this.handleLogin({ userName, password }).then(res => {
        this.$router.push({
          name: _this.$config.homeName
        })
      }).catch(function (reason) {
        callback()
        _this.$Modal.error({
          title: _this.$t('login_error') + reason.message
        })
      })
    }
  },
  mounted () {
    // var b = true
    // setInterval(() => {
    //   this.$i18n.locale = b ? 'en-US' : 'zh-CN'
    //   b = !b
    // }, 1000)
  }
}
</script>
