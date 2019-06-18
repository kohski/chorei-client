<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-alert
          :value="isSuccess"
          color="success"
          icon="check_circle"
          transition="scale-transition"
          outline
        >
          groups is successfully created!
        </v-alert>
        <v-alert
          v-for="msg in errors.full_messages"
          :key="msg"
          :value="errors.isError"
          color="error"
          icon="warning"
          transition="scale-transition"
          outline
        >
          {{ msg }}
        </v-alert>
        <v-text-field
          v-model="formData.name"
          id="name_field"
          type="text"
          label="Group Name"
        />
        <v-text-field
          id="imagePicker"
          type="file"
          v-on:change="onFileChange"
        />
        <v-img
          v-model="formData.image"
          :src="formData.image"
        ></v-img>
        <div class="text-sm-center">
          <v-btn round dark @click="postGroupWithPayload">
            submit
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
// import { Base64 } from 'js-base64'
export default {
  asyncData({ redirect, store }) {
    return {
      formData: {
        name: '',
        image: ''
      },
      isSuccess: false,
      errors: {
        isError: false,
        full_messages: []
      }
    }
  },
  methods: {
    async onFileChange(e) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.formData.image = e.target.result
      }
      await reader.readAsDataURL(file)
    },
    invokeUpload() {
      const imagePicker = document.getElementById('imagePicker')
      imagePicker.click()
    },
    async postGroupWithPayload() {
      await this.postGroup(this.formData)
      this.$router.push('/groups')
    },
    ...mapActions('groups', ['postGroup'])
  }
}
</script>
