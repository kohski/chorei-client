<template>
  <v-layout row justify-center class="space">
    <v-flex xs10>
      <image-uploader @imageRecieve="imageRecieve" />
      <v-textarea
        v-model="formData.memo"
        label="memo"
        counter
        maxlength="400"
      />
      <!-- <v-layout row justify-center>
        <v-select
          label="order"
          :items="oreder_items"
        />
      </v-layout> -->
      <v-layout row justify-center>
        <v-btn round dark small @click="postStepWithParams">
          SUBMIT
        </v-btn>
      </v-layout>
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
      }
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
      }
    },
    validator() {
      let flag = true
      if (this.formData.memo === '') {
        this.$toast.error('memo is not valid')
        flag = false
      }
      return flag
    },
    ...mapActions('groups/jobs/steps', ['postStep', 'indexSteps'])
  }
}
</script>
<style>
  .space {
    padding: 5%;
    background-color: #dddddd;
  }
</style>
