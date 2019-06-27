<template>
  <div>
    <!-- job section -->
    <v-layout row justify-center align-space-between wrap>
      <v-flex md6 lg3>
        <job-display :val="job" class="each_card_space"/>
      </v-flex>
      <!-- </v-layout> -->
      <!-- datetime picker -->
      <!-- <v-layout row justify-start> -->
      <v-flex md6 lg3>
        <datetime-selector :val="job" class="each_card_space"/>
      </v-flex>
      <!-- </v-layout> -->

      <!-- assign section -->
      <!-- <v-layout row justify-center> -->
      <v-flex md6 lg3>
        <assign-selector
          :members="members"
          :assigns="assigns"
          class="each_card_space"
        />
      </v-flex>
      <!-- </v-layout> -->

      <!-- tag -->
      <!-- <v-layout row justify-start> -->
      <v-flex md6 lg3>
        <tag-card />
      </v-flex>
    </v-layout>

    <!-- step -->
    <v-divider class="divider_space"></v-divider>
    <v-layout row justify-center>
      <v-flex xs12>
        <step-register
          :val="steps.length"
        />
      </v-flex>
    </v-layout>
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JobDisplay from '~/components/cards/JobDisplay'
import StepRegister from '~/components/registers/StepRegister'
import StepCard from '~/components/cards/StepCard'
import TagCard from '~/components/cards/TagCard'
import AssignSelector from '~/components/selector/AssignSelector'
import DatetimeSelector from '~/components/selector/DatetimeSelector'
export default {
  layout: 'default',
  components: {
    JobDisplay,
    StepRegister,
    StepCard,
    AssignSelector,
    TagCard,
    DatetimeSelector
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
  methods: {
    async updateStepCards({ jobId }) {
      await this.indexSteps({ jobId })
    },
    ...mapActions('groups/jobs/steps', ['indexSteps'])
  },
  computed: {
    ...mapGetters('groups/jobs', ['job', 'jobs', 'groupId']),
    ...mapGetters('groups/jobs/steps', ['step', 'steps']),
    ...mapGetters('groups/members', ['members']),
    ...mapGetters('groups/jobs/assigns', ['assigns'])
  }
}
</script>
<style>
  .each_card_space {
    margin: 2%;
  }
  .divider_space {
    margin: 5%;
  }
</style>
