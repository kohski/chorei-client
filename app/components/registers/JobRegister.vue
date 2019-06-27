<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-layout row justify-center>
        <v-btn small dark round @click="toggleDialog">
          新しいジョブ
        </v-btn>
      </v-layout>
      <v-dialog v-model="dialog" width="40%">
        <v-card class="job_register_space">
          <image-uploader @imageRecieve="imageRecieve" />
          <v-text-field
            v-model="formData.title"
            label="名称"
            tabindex="1"
            counter
            maxlength="100"
          />
          <v-textarea
            v-model="formData.description"
            label="概要"
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
              詳細設定へ
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
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
      ],
      dialog: false
    }
  },
  computed: {
    ...mapGetters('groups/jobs', ['job', 'jobs'])
  },
  methods: {
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    async postJobWithParams() {
      const groupId = this.$route.params.id
      const formData = this.formData
      if (this.validator()) {
        await this.postJob({ groupId, formData })
        const jobId = this.job.id
        this.$router.push(`/jobs/${jobId}`)
      }
    },
    validator() {
      let flag = true
      if (this.formData.title === '') {
        this.$toast.error('ジョブの名称が不正です')
        flag = false
      }
      if (this.formData.description === '') {
        this.$toast.error('ジョブの概要が不正です')
        flag = false
      }
      return flag
    },
    toggleDialog() {
      this.dialog = !this.dialog
    },
    ...mapActions('groups/jobs', ['postJob'])
  }
}
</script>
<style>
  .job_register_space {
    padding: 5%;
  }
</style>
