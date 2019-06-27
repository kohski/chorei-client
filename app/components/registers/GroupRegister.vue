<template>
  <v-container>
    <v-layout row justify-center>
      <v-btn round dark small @click="toggleDisplay">
        新しいグループ
      </v-btn>
      <v-dialog v-model="dialog" width="40%">
        <v-flex xs12>
          <v-card class="group_register_space">
            <p class="title">グループの新規作成</p>
            <v-text-field
              v-model="formData.name"
              label="グループ名"
            />
            <image-uploader
              @imageRecieve="imageRecieve"
            />
            <v-layout row justify-center>
              <v-btn round dark small @click="postGroupWithPayload">
                登録
              </v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-dialog>
    </v-layout>
  </v-container>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions } from 'vuex'
export default {
  components: {
    ImageUploader
  },
  data() {
    return {
      formData: {
        name: '',
        image: ''
      },
      isSuccess: false,
      errors: {
        isError: false,
        full_messages: []
      },
      dialog: false
    }
  },
  methods: {
    async postGroupWithPayload() {
      await this.postGroup(this.formData)
      await this.$emit('updateGroupCards')
      this.toggleDisplay()
    },
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    toggleDisplay() {
      this.dialog = !this.dialog
    },
    ...mapActions('groups', ['postGroup'])
  }
}
</script>
<style>
  .group_register_space {
    padding: 5%;
  }
</style>
