<template>
  <v-layout row justify-center>
    <v-flex>
      <v-card class="spacer">
        <image-uploader
          v-if="!updatable"
          @imageRecieve="imageRecieve"
        />
        <v-img :src="formData.image" v-if="updatable"/>
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
        <v-btn
          round
          small
          color="info"
          v-if="updatable"
          @click="makeUpdatable"
        >EDIT</v-btn>
        <v-btn
          round
          small
          color="warning"
          v-if="!updatable"
          @click="putJobWithParams"
        >update</v-btn>
        <v-btn
          flat
          round
          small
          color="error"
          v-if="!updatable"
          @click="makeUpdatable"
        >cancel</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StepRegister',
  data() {
    return {
      formData: {
        image: '',
        title: '',
        description: ''
      },
      updatable: true
    }
  },
  components: {
    ImageUploader
  },
  props: ['val'],
  mounted() {
    this.formData.image = this.val.image
    this.formData.title = this.val.title
    this.formData.description = this.val.description
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
