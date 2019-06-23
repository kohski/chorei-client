<template>
  <v-layout row justify-center>
    <v-flex xs10>
      <v-text-field
        v-model="name"
        label="Create Tag"
        tabindex="1"
      />
      <v-layout row justify-center>
        <v-btn small dark round @click="postTageWithParmas">
          submit
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'TagRegister',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async postTageWithParmas() {
      const name = this.name
      const jobId = this.$route.params.id
      await this.postTag({ name: name, jobId: jobId })
      await this.indexTags({ jobId: jobId })
      this.name = ''
    },
    ...mapActions('groups/tags', ['postTag', 'indexTags'])
  }
}
</script>
