<template>
  <v-layout row justify-center>
    <v-flex xs5>
      <image-uploader @imageRecieve="imageRecieve" />
      <v-text-field
        v-model="formData.title"
        label="title"
        tabindex="1"
        counter
        maxlength="100"
      />
      <v-textarea
        v-model="formData.description"
        label="description"
        tabindex="2"
        counter
        maxlength="1200"
      />
      <v-select
        v-model="formData.is_public"
        :items="is_publics"
        item-text="text"
        item-value="value"
        label="公開設定"
      />
      <v-layout row justify-center>
        <v-btn round dark @click="postJobWithParams">
          SUBMIT
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  components: {
    ImageUploader
  },
  data() {
    return {
      formData: {
        image: '',
        title: '',
        description: '',
        is_public: false
      },
      is_publics: [
        { text: '非公開', value: false },
        { text: '公開', value: true }
      ]
    }
  },
  computed: {
    ...mapGetters('/groups/jobs', ['job', 'jobs'])
  },
  methods: {
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    async postJobWithParams() {
      const groupId = this.$store.$router.currentRoute.params.group
      const formData = this.formData
      if (this.validator()) {
        await this.postJob({ groupId, formData })
      }
    },
    validator() {
      let flag = true
      if (this.formData.title === '') {
        this.$toast.error('title is not valid')
        flag = false
      }
      if (this.formData.description === '') {
        this.$toast.error('description is not valid')
        flag = false
      }
      return flag
    },
    ...mapActions('groups/jobs', ['postJob'])
  }
}
</script>
