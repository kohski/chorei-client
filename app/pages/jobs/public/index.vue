<template>
  <v-layout row jostify-center wrap>
    <v-flex
      v-for="job in publicJobs"
      :key="job.id"
      xs4
    >
      <publicjob-card :val="job" class="public_job_card_space"/>
    </v-flex>
  </v-layout>
</template>
<script>
import PublicjobCard from '~/components/cards/PublicjobCard'
import { mapGetters } from 'vuex'
export default {
  layout: 'default',
  components: {
    PublicjobCard
  },
  async asyncData({ store }) {
    await store.dispatch('groups/jobs/indexPublicJobs')
  },
  computed: {
    ...mapGetters('groups/jobs', ['publicJobs'])
  }
}
</script>
<style>
  .public_job_card_space {
    margin: 5%;
  }
</style>
