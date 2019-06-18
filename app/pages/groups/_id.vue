<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        {{ group }}
        <hr>
        {{ jobs }}
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('groups', ['group']),
    ...mapGetters('groups/jobs', ['jobs'])
  },
  async asyncData({ store }) {
    const id = store.$router.history.current.params.id || store.$router.history.pending.params.id
    await store.dispatch('groups/showGroup', { id: id })
    await store.dispatch('groups/jobs/indexJobs', { jobId: id })
  },
  methods: {
    ...mapActions('groups', ['showGroup']),
    ...mapActions('groups/jobs', ['indexJobs'])
  }
}
</script>
