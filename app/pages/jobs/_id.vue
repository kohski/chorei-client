<template>
  <div>
    <!-- job section -->
    <v-layout row justify-center>
      <v-flex xs5>
        <job-display :val="job"/>
      </v-flex>
    </v-layout>

    <!-- assign section -->
    <v-layout row justify-center>
      <v-flex xs5 />
    </v-layout>

    <!-- tag -->
    <v-layout row justify-center>
      <v-flex xs5 />
    </v-layout>

    <!-- step -->
    <v-layout row justify-center>
      <v-flex xs5>
        <step-card
          v-for="step in steps"
          :key="step.id"
          :val="step"
        />
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs5>
        <step-register />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import JobDisplay from '~/components/cards/JobDisplay'
import StepRegister from '~/components/registers/StepRegister'
import StepCard from '~/components/cards/StepCard'
export default {
  components: {
    JobDisplay,
    StepRegister,
    StepCard
  },
  async asyncData({ store }) {
    const idCategory = 'job'
    const routes = store.$router.history
    const currentUrl = routes.current ? routes.current.path : ''
    const pendingUrl = routes.pending ? routes.pending.path : ''
    const regexp = new RegExp(`${idCategory}s\\/(\\d*)`)
    const jobId = [
      currentUrl.match(regexp) ? currentUrl.match(regexp)[1] : null,
      pendingUrl.match(regexp) ? pendingUrl.match(regexp)[1] : null
    ].find(elm => elm)
    await store.dispatch('groups/jobs/showJob', { jobId })
    await store.dispatch('groups/jobs/steps/indexSteps', { jobId })
  },
  computed: {
    ...mapGetters('groups/jobs', ['job', 'jobs']),
    ...mapGetters('groups/jobs/steps', ['step', 'steps'])
  }
}
</script>
