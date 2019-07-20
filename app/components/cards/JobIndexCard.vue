<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card flat>
        <v-card-title>
          <v-layout row justify-end align-center>
            <v-flex xs4>
              <v-select
                :items="members"
                item-text="name"
                item-value="item"
                label="担当者で検索"
                chips
                multiple
                color="#51b4b8"
                @change="searchByMember"
              ></v-select>
            </v-flex>
            <v-flex xs4 offset-xs1>
              <v-select
                :items="tags"
                item-text="name"
                item-value="item"
                label="タグで検索"
                chips
                multiple
                color="#51b4b8"
                @change="searchByTag"
              ></v-select>
            </v-flex>
            <v-btn small fab flat @click="resetSort">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-layout>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="jobItems"
        >
          <template v-slot:items="props">
            <td @click="transferJob(props.item)">
              <v-img :src="props.item.image" />
            </td>
            <td @click="transferJob(props.item)">
              {{ props.item.title }}
            </td>
            <td class="text-xs-left" @click="transferJob(props.item)">
              {{ props.item.description }}
            </td>
            <td @click="transferJob(props.item)">
              <!-- <v-layout row justify-start wrap>
                <user-label v-for="user in props.item.assigns" :key="user.name" :val="user" />
              </v-layout> -->
              <span v-for="user in props.item.assigns" :key="user.name">{{user.name}}</span>
            </td>
            <td @click="transferJob(props.item)">
              <v-chip v-for="tag in props.item.tags" :key="tag">
                {{ tag }}
              </v-chip>
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
// import UserLabel from '~/components/chips/UserLabelForJobIndex'
export default {
  name: 'JobIndexCard',
  components: {
    // UserLabel
  },
  props: ['jobs', 'tags', 'members'],
  data() {
    return {
      search: '',
      headers: [
        { text: '画像', value: '画像' },
        { text: '名称', value: '名称' },
        { text: '詳細', value: '詳細' },
        { text: '担当者', value: '担当者' },
        { text: 'タグ', value: 'タグ' }
      ],
      jobItems: [],
      filter_assigns: [],
      filter_tags: []
    }
  },
  created() {
    if (this.jobs.length > 0) {
      this.jobs.forEach((elm) => {
        this.jobItems.push(elm)
      })
    }
  },
  methods: {
    transferJob(job) {
      this.$router.push(`/jobs/${job.id}`)
    },
    searchByMember(e) {
      this.filter_assigns = []
      e.forEach((elm) => {
        this.filter_assigns.push(elm)
      })
      this.filtering()
    },
    searchByTag(e) {
      this.filter_tags = []
      e.forEach((elm) => {
        this.filter_tags.push(elm)
      })
      this.filtering()
    },
    resetSort() {
      this.filter_assigns = []
      this.filter_tags = []
      this.filtering()
    },
    filtering() {
      // set initial items
      const initItems = this.jobs
      let filteredItems = []
      // filtered by assigns
      if (this.filter_assigns.length > 0) {
        filteredItems = initItems.filter(item => item.assigns.some(assign => this.filter_assigns.some(member => member === assign.name)))
      } else {
        filteredItems = initItems
      }
      // filtered by tags
      if (this.filter_tags.length > 0) {
        filteredItems = filteredItems.filter(item => item.tags.some(tag => this.filter_tags.some(t => t === tag)))
      }
      // insert jobItems
      this.jobItems = []
      filteredItems.forEach((elm) => {
        this.jobItems.push(elm)
      })
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
