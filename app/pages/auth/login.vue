<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs8>
        <v-layout row justify-center>
          <h1 class="headline">
            ログイン
          </h1>
        </v-layout>
        <v-text-field
          solo
          disabled
          value="テストユーザーをセットしてあります"
        />
        <v-text-field
          v-model="formData.email"
          type="text"
          label="メールアドレス"
        />
        <v-text-field
          v-model="formData.password"
          type="password"
          label="パスワード"
        />
        <v-layout row justify-center>
          <v-btn round dark @click="handleClickSubmit">
            ログイン
          </v-btn>
          <v-btn round dark color="info" to="/auth/signup">
            新規登録へ
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'auth',
  asyncData({ redirect, store }) {
    return {
      formData: {
        name: '',
        email: 'sample1@test.com',
        password: 'password'
      }
    }
  },
  methods: {
    async handleClickSubmit() {
      await this.logIn({ ...this.formData })
      this.$router.push('/mypage')
    },
    ...mapActions('auth', ['logIn'])
  }
}
</script>
