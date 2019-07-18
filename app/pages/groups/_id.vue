<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-layout row justify-center>
          <h1 class="headline">
            {{ group.name }} のページ
          </h1>
        </v-layout>
        <v-divider class="diveider_space" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs8>
        <h2 class="title">
          参加中のメンバー
        </h2>
        <v-card>
          <v-layout row justify-start wrap>
            <v-flex
              v-for="member in members"
              :key="member.id"
              xs4
            >
              <member-card
                :val="member"
                :current_user="showInfo"
                :owner="owner"
                class="member_card"
              />
            </v-flex>
          </v-layout>
          <member-register />
        </v-card>
      </v-flex>
      <v-flex xs4>
        <h2 class="title">
          登録されているタグ
        </h2>
        <tag-card />
      </v-flex>
    </v-layout>
      <v-flex xs12>
        <v-divider darl class="diveider_space" />
        <h2 class="title">
          登録されているジョブ
        </h2>
        <v-layout row justify-center>
          <job-register />
        </v-layout>
        <v-layout row justify-start wrap>
          <v-flex xs12>
            <job-index :jobs="jobs" :tags="tags" />
          </v-flex>
        </v-layout>
      </v-flex>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JobIndex from '~/components/cards/JobIndexCard.vue'
import JobRegister from '~/components/registers/JobRegister'
import MemberCard from '~/components/cards/MemberCard.vue'
import MemberRegister from '~/components/registers/MemberRegister.vue'
import TagCard from '~/components/cards/TagCardForGroup'
export default {
  layout: 'default',
  components: {
    MemberCard,
    MemberRegister,
    JobRegister,
    TagCard,
    JobIndex
  },
  computed: {
    owner() {
      return this.members.find((elm) => { return elm.member.is_owner })
    },
    ...mapGetters('groups', ['group']),
    ...mapGetters('groups/jobs', ['jobs']),
    ...mapGetters('groups/members', ['members']),
    ...mapGetters('auth', ['showInfo']),
    ...mapGetters('groups/tags', ['tags'])
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
    await store.dispatch('auth/getUser')
    await store.dispatch('groups/tags/indexTagsByGroup', { groupId: groupId })
    await store.dispatch('groups/members/indexMembers', { groupId: groupId })
  },
  methods: {
    async updateIndexPage() {
      const groupId = this.$route.params.id
      await this.indexJobs({ groupId: groupId })
    },
    ...mapActions('groups', ['showGroup']),
    ...mapActions('groups/jobs', ['indexJobs']),
    ...mapActions('groups/members', ['indexMember']),
    ...mapActions('groups/tags', ['indexTags'])
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
