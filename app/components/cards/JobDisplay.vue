<template>
  <v-layout row justify-center>
    <v-flex>
      <v-card class="spacer" flat>
        <image-uploader
          v-if="!updatable"
          @imageRecieve="imageRecieve"
        />
        <v-img v-if="updatable" :src="formData.image" />
        <v-text-field
          v-model="formData.title"
          label="名称"
          :disabled="updatable"
          auto-grow
        />
        <v-textarea
          v-model="formData.description"
          label="概要"
          :disabled="updatable"
          auto-grow
        />
        <v-select
          v-model="formData.is_public"
          :items="is_publics"
          item-text="text"
          item-value="value"
          label="公開設定"
          :disabled="updatable"
        />
        <v-layout row justify-space-around>
          <v-btn
            v-if="updatable"
            round
            small
            color="#756c83"
            fab
            icon
            @click="makeUpdatable"
          >
            <v-icon color="#fbfbfb">edit</v-icon>
          </v-btn>
          <v-btn
            v-if="!updatable"
            round
            small
            color="#51b4b8"
            icon
            @click="putJobWithParams"
          >
            <v-icon color="#fbfbfb">update</v-icon>
          </v-btn>
          <v-btn
            v-if="!updatable"
            round
            small
            icon
            color="#f38181"
            @click="makeUpdatable"
          >
            <v-icon color="#fbfbfb">clear</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StepRegister',
  components: {
    ImageUploader
  },
  props: ['val'],
  data() {
    return {
      formData: {
        image: '',
        title: '',
        description: '',
        is_public: false
      },
      updatable: true,
      is_publics: [
        { text: '公開', value: true },
        { text: '非公開', value: false }
      ]
    }
  },
  mounted() {
    this.formData.image = this.val.image
    this.formData.title = this.val.title
    this.formData.description = this.val.description
    this.formData.is_public = this.val.is_public
  },
  computed: {
    ...mapGetters('groups', ['groupId'])
  },
  methods: {
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    makeUpdatable() {
      this.updatable = !this.updatable
    },
    async putJobWithParams() {
      const jobId = this.val.id
      await this.putJob({ jobId: jobId, formData: this.formData })
      this.updatable = true
    },
    async restoreJob() {
    },
    ...mapActions('groups/jobs', ['putJob'])
  }
}
</script>
<style>
  .spacer {
    padding: 5%;
  }
</style>
