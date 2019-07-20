<template>
  <div>
    <v-layout row justify-center wrap>
      <v-flex xs12>
        <v-chip v-for="tag in tags" :key="tag.id">
          {{ tag.name }}
          <v-icon color="grey" @click="destroyTag(tag)">
            highlight_off
          </v-icon>
        </v-chip>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('groups/tags', ['tags'])
  },
  methods: {
    async destroyTag(tag) {
      const groupId = this.$route.params.id
      await this.deleteTag({ tagId: tag.id })
      await this.indexTagsByGroup({ groupId: groupId })
      await this.indexJobs({ groupId: groupId })
    },
    ...mapActions('groups/tags', ['deleteTag', 'indexTagsByGroup']),
    ...mapActions('groups/jobs', ['indexJobs'])
  }
}
</script>
<style>
  .dummy_user_image{
    background-color: #dddddd ;
    border-radius: 50%;
    margin: 5%;
  }
  .member_name {
    text-align: center;
  }
  .tag_card_space {
    padding: 5%;
  }
</style>
