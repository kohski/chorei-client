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
              />
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
              />
            </v-flex>
            <v-btn small fab flat @click="resetSort">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-layout>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="jobItems"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td @click="transferJob(props.item)">
              <v-img v-if="props.item.image" :src="props.item.image" />
            </td>
            <td @click="transferJob(props.item)">
              {{ props.item.title }}
            </td>
            <td class="text-xs-left" @click="transferJob(props.item)">
              {{ props.item.description }}
            </td>
            <td @click="transferJob(props.item)">
              <span v-for="(user, index) in props.item.assigns" :key="user.name">{{ user.name }}<span v-if="(index + 1) !== props.item.assigns.length">, </span></span>
            </td>
            <td @click="transferJob(props.item)">
              <v-chip v-for="tag in attachTags(props.item)" :key="tag">
                {{ tag }}
              </v-chip>
            </td>
            <td>
              <v-btn icon @click="destroyJob(props.item)">
                <v-icon color="#f38181" >delete</v-icon>
              </v-btn>
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
import { mapActions } from 'vuex'
export default {
  name: 'JobIndexCard',
  components: {
    // UserLabel
  },
  props: ['jobs', 'tags', 'members', 'taggings'],
  data() {
    return {
      search: '',
      headers: [
        { text: '画像', value: '画像' },
        { text: '名称', value: '名称' },
        { text: '詳細', value: '詳細' },
        { text: '担当者', value: '担当者' },
        { text: 'タグ', value: 'タグ' },
        { text: '削除', value: '削除' }
      ],
      pagination: {
        rowsPerPage: 10
      },
      jobItems: [],
      filter_assigns: [],
      filter_tags: []
    }
  },
  created() {
    if (this.jobs.length > 0) {
      this.jobItems = this.jobs
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
    },
    attachTags(job) {
      const attachTaggings = this.taggings.filter((tagging) => { return tagging.job_id === job.id })
      const tagIds = attachTaggings.map((elm) => { return elm.tag_id })
      const tags = this.tags.filter((tag) => { return tagIds.indexOf(tag.id) > -1 })
      return tags.map((tag) => { return tag.name })
    },
    async destroyJob(job) {
      const groupId = this.$route.params.id
      await this.deleteJob(job.id)
      await this.indexJobs({ groupId: groupId })
      this.$forceUpdate()
    },
    ...mapActions('groups/jobs', ['deleteJob', 'indexJobs'])
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
