<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-layout row justify-center>
        <v-btn round color="#756c83" @click="toggleModal" icon>
          <v-icon color="#fbfbfb">add</v-icon>
        </v-btn>
      </v-layout>
      <v-dialog v-model="dialog" width="30%">
        <v-card class="step_space">
          <image-uploader @imageRecieve="imageRecieve" />
          <v-textarea
            v-model="formData.memo"
            label="メモ"
            counter
            maxlength="400"
          />
          <v-layout row justify-center>
            <v-btn
              round
              dark
              small
              color="#756c83"
              @click="postStepWithParams"
              icon>
              <v-icon>update</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions } from 'vuex'
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
        memo: '',
        order: 0
      },
      dialog: false
    }
  },
  computed: {
    oreder_items() {
      const arr = new Array(this.val).fill(null).map((elm, index) => index + 1)
      arr.push(this.val + 1)
      return arr
    }
  },
  methods: {
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    async postStepWithParams() {
      const jobId = this.$store.$router.currentRoute.params.id
      const formData = this.formData
      if (this.validator()) {
        await this.postStep({ jobId, formData })
        await this.indexSteps({ jobId: jobId })
        this.formData.image = ''
        this.formData.memo = ''
        this.formData.order = ''
        this.$children[0].$data.imageUrl = ''
        this.dialog = false
      }
    },
    validator() {
      let flag = true
      if (this.formData.memo === '') {
        this.$toast.error('メモが不正です')
        flag = false
      }
      return flag
    },
    toggleModal() {
      this.dialog = !this.dialog
    },
    ...mapActions('groups/jobs/steps', ['postStep', 'indexSteps'])
  }
}
</script>
<style>
  .step_space {
    padding: 5%;
  }
</style>
