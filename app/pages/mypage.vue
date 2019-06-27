<template>
  <v-container>
    <v-layout row justify-center wrap>
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
    ...mapGetters('groups', ['groups'])
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
    ...mapActions('groups', ['indexGroups', 'deleteGroup'])
  }
}
</script>
<style>
  .each_groups{
    margin-bottom: 10%;
  }
</style>
