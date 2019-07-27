<template>
  <v-container>
    <v-layout row justify-center>
      <h1 class="display-2 mypage_title">
        マイページ
      </h1>
    </v-layout>
    <v-divider class="mypage_divider_space" />
    <v-layout row justify-center wrap>
      <v-flex xs9>
        <v-layout row justify-center>
          <p class="title">
            ジョブ スケジュール
          </p>
        </v-layout>
        <schedule-selector :vals="assignedSchedules" :groups="groups" :jobs="assignedJobs" />
      </v-flex>
      <v-flex xs3>
        <p class="title">
          参加中グループ
        </p>
        <group-register @updateGroupCards="updateGroupCards" />
        <v-layout row justify-center wrap>
          <v-flex
            v-for="group in groups"
            :key="group.id"
            xs12
          >
            <group-card
              :val="group"
              :current-user="showInfo"
              @updateGroupCards="updateGroupCards"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import GroupRegister from '~/components/registers/GroupRegister'
import ScheduleSelector from '~/components/selector/ScheduleSelector'
import GroupCard from '~/components/cards/GroupCard'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'default',
  components: {
    GroupRegister,
    GroupCard,
    ScheduleSelector
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('auth', ['showInfo']),
    ...mapGetters('groups/jobs', ['assignedJobs']),
    ...mapGetters('groups/jobs/schedules', ['assignedSchedules'])
  },
  async asyncData({ store }) {
    await store.dispatch('auth/getUser')
    await store.dispatch('groups/indexGroups')
    await store.dispatch('groups/jobs/schedules/indexAssignedSchedules')
    await store.dispatch('groups/jobs/assignedJobs')
  },
  methods: {
    async deleteGroupWithId(id) {
      await this.deleteGroup({ id: id })
      await this.indexGroups()
    },
    async updateGroupCards() {
      await this.indexGroups()
    },
    ...mapActions('groups', ['indexGroups', 'deleteGroup']),
    ...mapActions('auth', ['getUser'])
  }
}
</script>
<style>
  .each_groups{
    margin-bottom: 10%;
  }
  .mypage_divider_space {
    margin: 3%;
  }
</style>
