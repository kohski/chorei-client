<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-layout row justify-center>
          <h1 class="headline">
            {{ group.name }} のグループページ
          </h1>
        </v-layout>
        <v-divider class="diveider_space" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs9>
        <h2 class="title group_page_title">
          登録ジョブ
        </h2>
        <v-layout row justify-start wrap>
          <v-flex xs12>
            <job-index
              :jobs="jobs"
              :tags="tags"
              :members="members"
              :taggings="taggingsByGroup"
              :key="jobs.length"
              class="group_page_title"
            />
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <job-register />
        </v-layout>
      </v-flex>
      <v-flex xs3>
        <h2 class="title group_page_title">
          参加メンバー
        </h2>
        <v-card flat class="group_page_space">
          <v-layout row justify-start wrap>
            <v-flex
              v-for="member in members"
              :key="member.id"
              xs12
              lg6
            >
              <member-card
                :val="member"
                :current-user="showInfo"
                :owner="owner"
                class="member_card"
              />
            </v-flex>
          </v-layout>
          <member-register />
        </v-card>
        <v-divider class="diveider_space" />
        <h2 class="title group_page_title">
          登録タグ
        </h2>
        <tag-card class="group_page_space" />
      </v-flex>
    </v-layout>
    <v-divider class="diveider_space" />
    <h2 class="title group_page_title">
      ジョブカレンダー
    </h2>
    <v-flex xs12>
      <schedule-selector :vals="groupSchedules" :jobs="jobs" />
    </v-flex>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import JobIndex from '~/components/cards/JobIndexCard.vue'
import JobRegister from '~/components/registers/JobRegister'
import MemberCard from '~/components/cards/MemberCard.vue'
import MemberRegister from '~/components/registers/MemberRegister.vue'
import ScheduleSelector from '~/components/selector/ScheduleSelectorForGroup.vue'
import TagCard from '~/components/cards/TagCardForGroup'
export default {
  layout: 'default',
  components: {
    MemberCard,
    MemberRegister,
    JobRegister,
    TagCard,
    ScheduleSelector,
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
    ...mapGetters('groups/tags', ['tags']),
    ...mapGetters('groups/taggings', ['taggingsByGroup']),
    ...mapGetters('groups/jobs/schedules', ['groupSchedules'])
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
    await store.dispatch('groups/taggings/indexTaggingsByGroup', { groupId: groupId })
    await store.dispatch('groups/members/indexMembers', { groupId: groupId })
    await store.dispatch('groups/jobs/schedules/indexGroupSchedules', { groupId: groupId })
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
  .group_page_title {
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .group_page_space {
    margin: 5%;
  }
</style>
