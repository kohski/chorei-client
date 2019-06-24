<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-select
          v-model="deleteTarget"
          :items="tags"
          item-text="name"
          item-value="id"
          label="Delete Tag"
        />
        <v-layout row justify-center>
          <v-btn small dark round @click="deleteTagWithId">
            submit
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TagDeleteSelctor',
  data() {
    return {
      deleteTarget: ''
    }
  },
  computed: {
    ...mapGetters('groups/tags', ['tags'])
  },
  methods: {
    deleteTagWithId() {
      if (this.deleteTarget !== '') {
        const jobId = this.$route.params.id
        this.deleteTag({ tagId: this.deleteTarget })
        this.indexTags({ jobId: jobId })
      }
    },
    ...mapActions('groups/tags', ['indexTags', 'deleteTag'])
  }
}
</script>
