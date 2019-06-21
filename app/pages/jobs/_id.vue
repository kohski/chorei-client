<template>
  <div>
    <!-- job section -->
    <v-layout row justify-start>
      <v-flex xs5>
        <job-display :val="job" />
      </v-flex>
    </v-layout>

    <!-- assign section -->
    <v-layout row justify-center>
      <v-flex xs5>
        <assign-register
          :members="members"
          :assigns="assigns"
        />
      </v-flex>
    </v-layout>

    <!-- tag -->
    <v-layout row justify-center>
      <v-flex xs5 />
    </v-layout>

    <!-- step -->
    <v-layout row justify-start wrap>
      <v-flex
        v-for="(step,index) in steps"
        :key="step.id"
        xs4
      >
        <v-layout column align-space-between>
          <step-card
            :val="step"
            :index="index"
          />
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs5>
        <step-register
          :val="steps.length"
        />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import JobDisplay from '~/components/cards/JobDisplay'
import StepRegister from '~/components/registers/StepRegister'
import StepCard from '~/components/cards/StepCard'
import AssignRegister from '~/components/registers/AssignRegister'
export default {
  components: {
    JobDisplay,
    StepRegister,
    StepCard,
    AssignRegister
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
    await store.dispatch('groups/jobs/getGroupId', { jobId })
    const groupId = store.state.groups.jobs.groupId
    await store.dispatch('groups/members/indexMembers', { groupId })
    await store.dispatch('groups/jobs/assigns/indexAssigns', { jobId })
  },
  computed: {
    ...mapGetters('groups/jobs', ['job', 'jobs', 'groupId']),
    ...mapGetters('groups/jobs/steps', ['step', 'steps']),
    ...mapGetters('groups/members', ['members']),
    ...mapGetters('groups/jobs/assigns', ['assigns'])
  }
}
</script>
