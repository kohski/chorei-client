<template>
  <v-layout row justify-center class="step_card_wrapper">
    <v-flex xs10>
      <p>{{ index + 1 }}</p>
      <v-img v-if="val.image" :src="val.image" height="120" contain />
      <v-textarea
        v-model="val.memo"
        label="メモ"
        disabled
      />
      <v-layout row justify-space-between>
        <v-btn icon flat @click="toLeft">
          <v-icon>chevron_left</v-icon>
        </v-btn>
        <v-btn flat small color="#f38181" icon @click.stop="deleteStepWithId">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon flat @click="toRight">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  props: ['val', 'index'],
  methods: {
    async deleteStepWithId() {
      const jobId = this.$store.$router.currentRoute.params.id
      await this.deleteStep({ stepId: this.val.id })
      await this.indexSteps({ jobId: jobId })
      await this.$emit('updateStepCards')
    },
    async toLeft() {
      if (this.val.order === 0) { return }
      const jobId = this.$store.$router.currentRoute.params.id
      const stepId = this.val.id
      const formData = {
        order: (this.val.order - 1)
      }
      await this.putStep({ stepId, formData })
      await this.indexSteps({ jobId: jobId })
      await this.$emit('updateStepCards')
    },
    async toRight() {
      // if (this.val.order === 0) { return }
      const jobId = this.$store.$router.currentRoute.params.id
      const stepId = this.val.id
      const formData = {
        order: (this.val.order + 2)
      }
      await this.putStep({ stepId, formData })
      await this.indexSteps({ jobId: jobId })
      await this.$emit('updateStepCards', { jobId: jobId })
    },
    ...mapActions('groups/jobs/steps', ['deleteStep', 'indexSteps', 'putStep'])
  }
}
</script>
<style>
  .step_card_wrapper {
    border: 1px solid #dddddd;
    padding: 5%;
    margin: 5%;
  }
</style>
