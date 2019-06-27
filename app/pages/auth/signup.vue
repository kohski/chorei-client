<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs8>
        <v-layout row justify-center>
          <h1 class="headline">
            新規登録
          </h1>
        </v-layout>
        <v-text-field
          v-model="formData.name"
          type="text"
          label="名前"
          style="margin-top: 20px;"
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
        <image-uploader @imageRecieve="imageRecieve" />
        <v-textarea
          v-model="formData.description"
          placeholder="自由記入欄"
        />
        <v-layout row justify-center>
          <v-btn round dark @click="handleClickSubmit">
            新規登録
          </v-btn>
          <v-btn round dark color="info" to="/auth/login">
            ログインページへ
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import ImageUploader from '~/components/registers/ImageUploader'
export default {
  layout: 'landingpage',
  components: {
    ImageUploader
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        image: '',
        description: '',
        password: ''
      }
    }
  },
  methods: {
    async handleClickSubmit() {
      await this.signUp({ ...this.formData })
      this.formData.name = ''
      this.formData.email = ''
      this.formData.password = ''
      this.formData.image = ''
      this.formData.description = ''
    },
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    ...mapActions('auth', ['signUp'])
  }
}
</script>
