<template>
  <v-container>
    <v-layout row justify-center="">
      <h1 class="title">{{ showInfo.name }}</h1>
    </v-layout>
    <v-divider class="divider_space"/>
    <v-layout row justify-center wrap>
      <p class="title">参加中のグループ</p>
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
    <v-divider class="divider_space"/>
    <v-layout row justify-center>
      <p class="title">担当になっているジョブ</p>
    </v-layout>
  </v-container>
</template>
<script>
import GroupRegister from '~/components/registers/GroupRegister'
import GroupCard from '~/components/cards/GroupCard'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'default',
  components: {
    GroupRegister,
    GroupCard
  },
  computed: {
    ...mapGetters('groups', ['groups']),
    ...mapGetters('auth', ['showInfo'])
  },
  async asyncData({ store }) {
    await store.dispatch('groups/indexGroups')
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
</style>
