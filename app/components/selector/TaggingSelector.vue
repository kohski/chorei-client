<template>
  <v-layout row justify-center>
    <v-flex xs10>
      <v-select
        v-model="taggingTagNames"
        :items="tags.map(elm => elm.name)"
        :value="taggingIds"
        attach
        chips
        label="Tags"
        multiple
        outline
        @change="handleSelect"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TagSelector',
  data() {
    return {
      tagNames: [],
      taggingTagNames: [],
      taggingIds: []
    }
  },
  async mounted() {
    const jobId = this.$route.params.id
    await this.$store.dispatch(`groups/tags/indexTags`, { jobId: jobId })
    this.tags.forEach((elm) => {
      this.tagNames.push(elm.name)
    })
    await this.$store.dispatch(`groups/taggings/indexTaggings`, { jobId: jobId })
    this.taggings.forEach((elm) => {
      this.taggingIds.push(elm.id)
    })
    const taggingTagIds = this.taggingIds.map((elm) => { return this.taggings.find((e) => { return e.id === elm }).tag_id })
    this.taggingTagNames = []
    this.taggingTagNames = taggingTagIds.map((elm) => { return this.tags.find((e) => { return e.id === elm }).name })
  },
  computed: {
    ...mapGetters('groups/tags', ['tags']),
    ...mapGetters('groups/taggings', ['taggings'])
  },
  methods: {
    async handleSelect(e) {
      // eventで取得した配列はTagNameなのでTagIdの配列に変換
      const tagNames = e
      const newTagIds = tagNames.map((tagName) => {
        return this.$store.getters['groups/tags/tags'].find((tags) => {
          return tags.name === tagName
        }).id
      })
      // 次にoldTaggingIdsをtagIdに変換
      const oldTagIds = this.taggings.map((tagging) => {
        return tagging.tag_id
      })
      // newとoldが揃ったので、新旧比較
      const jobId = this.$route.params.id
      if (newTagIds.length - oldTagIds.length === 1) {
        const tagId = newTagIds.filter(elm => oldTagIds.indexOf(elm) === -1)[0]
        await this.postTagging({ jobId: jobId, tagId: tagId })
        await this.indexTaggings({ jobId: jobId })
      } else if (oldTagIds.length - newTagIds.length === 1) {
        const tagId = oldTagIds.filter((elm) => { return newTagIds.indexOf(elm) === -1 })[0]
        const taggingId = this.taggings.find((tagging) => { return tagging.tag_id === tagId }).id
        await this.deleteTagging({ taggingId: taggingId })
        await this.indexTaggings({ jobId: jobId })
      }
    },
    ...mapActions('groups/taggings', ['postTagging', 'deleteTagging', 'indexTaggings']),
    ...mapActions('groups/tags', ['postTags', 'deleteTags', 'indexTags'])
  }
}
</script>
