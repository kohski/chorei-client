<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card>
        <!-- <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title> -->
        <v-data-table
          :headers="headers"
          :items="jobs"
        >
          <template v-slot:items="props" >
            <td @click="transferJob(props.item)">
              <v-img :src="props.item.image"></v-img>
            </td>
            <td @click="transferJob(props.item)">{{ props.item.title }}</td>
            <td class="text-xs-left" @click="transferJob(props.item)">
              {{ props.item.description }}
            </td>
            <td @click="transferJob(props.item)">
              <v-layout row justify-start wrap>
                <user-label v-for="user in props.item.assigns" :key="user.name" :val="user"></user-label>
              </v-layout>
            </td>
            <td @click="transferJob(props.item)">
              <v-chip v-for="tag in props.item.tags" :key="tag">{{ tag }}</v-chip>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import UserLabel from '~/components/chips/UserLabel'
export default {
  name: 'JobIndexCard',
  props: ['jobs', 'tags'],
  components: {
    UserLabel
  },
  data() {
    return {
      headers: [
        { text: '画像', value: '画像' },
        { text: '名称', value: '名称' },
        { text: '詳細', value: '詳細' },
        { text: '担当者', value: '担当者' },
        { text: 'タグ', value: 'タグ' }
      ]
    }
  },
  methods: {
    transferJob(job) {
      this.$router.push(`/jobs/${job.id}`)
    }
  }
}
</script>
<style>
  .spacer {
    padding-left:5%;
    padding-right:5%;
  }
  .modal_wrapper {
    padding: 5%;
  }
</style>
