<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs8>
        <v-layout row justify-center>
          <h1 class="headline">Sign Up</h1>
        </v-layout>
        <v-text-field
          v-model="formData.name"
          type="text"
          label="Name"
          style="margin-top: 20px;"
        />
        <v-text-field
          v-model="formData.email"
          type="text"
          label="Email"
        />
        <v-text-field
          v-model="formData.password"
          type="password"
          label="Password"
        />
        <image-uploader @imageRecieve="imageRecieve" />
        <v-textarea
          v-model="formData.description"
          placeholder="add your description"
        />
        <v-layout row justify-center>
          <v-btn round dark @click="handleClickSubmit">
            submit
          </v-btn>
          <v-btn round dark color="info" to="/auth/login">
            Log In Page
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
  asyncData({ redirect, store }) {
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
      this.$data.formData.name = ''
      this.$data.formData.email = ''
      this.$data.formData.password = ''
      this.$data.fomrData.image = ''
      this.$data.fomrData.description = ''
    },
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    ...mapActions('auth', ['signUp'])
  }
}
</script>
