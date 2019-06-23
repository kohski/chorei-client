<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-card v-for="group in groups" :key="group.id" class="each_groups">
          <nuxt-link :to="'/groups/'+group.id">
            <v-img
              :src="group.image"
            />
          </nuxt-link>
          <v-card-title primary-title>
            <div>
              <div> {{ group.name }} </div>
            </div>
          </v-card-title>
          <v-btn
            color="indigo lighten-2"
            @click="deleteGroupWithId(group.id)"
          >
            delete
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
    ...mapActions('groups', ['indexGroups', 'deleteGroup'])
  }
}
</script>
<style>
  .each_groups{
    margin-bottom: 10%;
  }
</style>
