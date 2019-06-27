<template>
  <v-container>
    <v-layout row justify-center="">
      <h1 class="title">
        {{ showInfo.name }}
      </h1>
    </v-layout>
    <v-divider class="divider_space" />
    <v-layout row justify-center wrap>
      <p class="title">
        参加中のグループ
      </p>
      <v-flex xs12>
        <group-register @updateGroupCards="updateGroupCards" />
      </v-flex>
    </v-layout>
    <v-layout row justify-center wrap>
      <v-flex
        v-for="group in groups"
        :key="group.id"
        xs4
      >
        <group-card
          :val="group"
          @updateGroupCards="updateGroupCards"
        />
      </v-flex>
    </v-layout>
    <v-divider class="divider_space" />
    <v-layout row justify-center>
      <p class="title">
        担当になっているジョブ
      </p>
    </v-layout>
    <schedule-selector :vals="assignedSchedules"/>
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
    ...mapGetters('groups/jobs/schedules', ['assignedSchedules'])
  },
  async asyncData({ store }) {
    await store.dispatch('groups/indexGroups')
    await store.dispatch('groups/jobs/schedules/indexAssignedSchedules')
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
  .divider_space{
    margin: 5%;
  }
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }

</style>
