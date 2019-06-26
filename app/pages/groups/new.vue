<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-text-field
          id="name_field"
          v-model="formData.name"
          type="text"
          label="Group Name"
        />
        <image-uploader
          @imageRecieve="imageRecieve"
        ></image-uploader>
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
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions } from 'vuex'
export default {
  layout: 'default',
  components: {
    ImageUploader
  },
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
      this.$router.push('/mypage')
    },
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    ...mapActions('groups', ['postGroup'])
  }
}
</script>
