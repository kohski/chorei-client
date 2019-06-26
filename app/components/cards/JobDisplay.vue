<template>
  <v-layout row justify-center>
    <v-flex>
      <v-card class="spacer">
        <image-uploader
          v-if="!updatable"
          @imageRecieve="imageRecieve"
        />
        <v-img v-if="updatable" :src="formData.image" />
        <v-text-field
          v-model="formData.title"
          label="title"
          :disabled="updatable"
          auto-grow
        />
        <v-textarea
          v-model="formData.description"
          label="description"
          :disabled="updatable"
          auto-grow
        />
        <v-select
          v-model="formData.is_public"
          :items="is_publics"
          item-text="text"
          item-value= "value"
          label="公開設定"
          :disabled="updatable"
        />
        <v-btn
          v-if="updatable"
          round
          small
          color="info"
          @click="makeUpdatable"
        >
          EDIT
        </v-btn>
        <v-btn
          v-if="!updatable"
          round
          small
          color="warning"
          @click="putJobWithParams"
        >
          update
        </v-btn>
        <v-btn
          v-if="!updatable"
          flat
          round
          small
          color="error"
          @click="makeUpdatable"
        >
          cancel
        </v-btn>
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
