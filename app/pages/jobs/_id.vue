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
      <v-flex xs5 />
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import JobDisplay from '~/components/cards/JobDisplay'
export default {
  components: {
    JobDisplay
  },
  async asyncData({ store }) {
    const jobId = store.$router.history.pending.params.id
    await store.dispatch('groups/jobs/showJob', { jobId })
  },
  computed: {
    ...mapGetters('groups/jobs', ['job', 'jobs'])
  }
}
</script>
