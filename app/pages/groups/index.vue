<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-card v-for="group in groups" :key="group.id" :href="'/groups/'+group.id" class="each_groups">
          <v-img
            :src="group.image"
          >
          </v-img>
          <v-card-title primary-title>
            <div>
              <div> {{ group.name }} </div>
            </div>
          </v-card-title>
        </v-card>
        <v-btn color="success" @click="groupIndex">
          click
        </v-btn>
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
  async fetch({ store }) {
    await store.dispatch('groups/groupIndex')
  },
  methods: {
    async indexGroup() {
      await this.index
    },
    ...mapActions('groups', ['groupIndex'])
  }
}
</script>
<style>
  .each_groups{
    margin-bottom: 10%;
  }
</style>
