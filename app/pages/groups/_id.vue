<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1>
        <v-layout row justify-center>
          <h1 class="headline">
            {{ group.name }} のページ
          </h1>
        </v-layout>
        <v-divider class="diveider_space"/>
        <h2 class="title">
          参加中のメンバー
        </h2>
        <v-layout row justify-start wrap>
          <v-flex
            v-for="member in members"
            :key="member.id"
            xs4
          >
            <member-card
              :val="member"
              class="member_card"
            />
          </v-flex>
        </v-layout>
        <member-register />
        <v-divider darl class="diveider_space"/>
        <h2 class="title">
          登録されているジョブ
        </h2>
        <v-layout row justify-center>
          <job-register />
        </v-layout>
        <v-layout row justify-start wrap>
          <v-flex
            v-for="job in jobs"
            :key="job.id"
            xs4
          >
            <v-layout column align-space-between>
              <job-card
                :val="job"
                class="job_card"
                @updateIndexPage="updateIndexPage"
              />
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JobCard from '~/components/cards/JobCard.vue'
import JobRegister from '~/components/registers/JobRegister'
import MemberCard from '~/components/cards/MemberCard.vue'
import MemberRegister from '~/components/registers/MemberRegister.vue'
export default {
  layout: 'default',
  components: {
    JobCard,
    MemberCard,
    MemberRegister,
    JobRegister
  },
  computed: {
    ...mapGetters('groups', ['group']),
    ...mapGetters('groups/jobs', ['jobs']),
    ...mapGetters('groups/members', ['members'])
  },
  async asyncData({ store }) {
    const idCategory = 'group'
    const routes = store.$router.history
    const currentUrl = routes.current ? routes.current.path : ''
    const pendingUrl = routes.pending ? routes.pending.path : ''
    const regexp = new RegExp(`${idCategory}s\\/(\\d*)`)
    const groupId = [
      currentUrl.match(regexp) ? currentUrl.match(regexp)[1] : null,
      pendingUrl.match(regexp) ? pendingUrl.match(regexp)[1] : null
    ].find(elm => elm)
    await store.dispatch('groups/showGroup', { groupId: groupId })
    await store.dispatch('groups/jobs/indexJobs', { groupId: groupId })
    await store.dispatch('groups/members/indexMembers', { groupId: groupId })
  },
  methods: {
    async updateIndexPage() {
      const groupId = this.$route.params.id
      await this.indexJobs({ groupId: groupId })
    },
    ...mapActions('groups', ['showGroup']),
    ...mapActions('groups/jobs', ['indexJobs']),
    ...mapActions('groups/members', ['indexMember'])
  }
}
</script>
<style>
  .job_card{
    margin: 5%;
  }
  .member_card{
    margin: 5%;
  }
  .diveider_space{
    margin: 5%;
  }
</style>
