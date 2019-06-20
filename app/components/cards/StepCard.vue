<template>
  <v-layout row justify-center class="space">
    <v-flex xs5>
      <v-img :src="val.image" />
      <v-textarea
        v-model="val.memo"
        label="memo"
        counter
        maxlength="400"
        disabled
      />
      <v-btn flat small color="error" @click.stop="deleteStepWithId">
        delete
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  props: ['val'],
  methods: {
    async deleteStepWithId() {
      const jobId = this.$store.$router.currentRoute.params.id
      await this.deleteStep({ stepId: this.val.id })
      await this.indexSteps({ jobId: jobId })
    },
    ...mapActions('groups/jobs/steps', ['deleteStep', 'indexSteps'])
  }
}
</script>
