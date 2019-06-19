<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1>
        {{ group }}
        <hr>
        <v-layout row justify-right>
          <member-card
          v-for="member in members"
          :key="member.id"
          :val=member
          class="member_card"/>
        </v-layout>
        <member-register />
        <hr>
        <v-layout row justify-right>
          <job-card
          v-for="job in jobs"
          :key=job.id
          :val=job
          class="job_card"/>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JobCard from '~/components/cards/JobCard.vue'
import MemberCard from '~/components/cards/MemberCard.vue'
import MemberRegister from '~/components/registers/MemberRegister.vue'
export default {
  components: {
    JobCard,
    MemberCard,
    MemberRegister
  },
  computed: {
    ...mapGetters('groups', ['group']),
    ...mapGetters('groups/jobs', ['jobs']),
    ...mapGetters('groups/members', ['members'])
  },
  async asyncData({ store }) {
    const groupId = store.$router.history.current.params.id || store.$router.history.pending.params.id
    await store.dispatch('groups/showGroup', { groupId: groupId })
    await store.dispatch('groups/jobs/indexJobs', { groupId: groupId })
    await store.dispatch('groups/members/indexMembers', { groupId: groupId })
  },
  methods: {
    ...mapActions('groups', ['showGroup']),
    ...mapActions('groups/jobs', ['indexJobs']),
    ...mapActions('groups/members', ['indexMember'])
  }
}
</script>
<style>
  .job_card{
    margin-top: 10%;
  }
  .member_card{
    margin: 5%;
  }
</style>
