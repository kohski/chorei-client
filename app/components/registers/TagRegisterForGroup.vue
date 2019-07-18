<template>
  <v-layout row justify-center align-center wrap>
    <v-flex xs8>
      <v-text-field
        v-model="name"
        label="タグ新規作成"
        tabindex="1"
      />
    </v-flex>
    <v-flex xs2>
      <v-btn small dark round @click="postTageWithParmas">
        登録
      </v-btn>
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
      const groupId = this.$route.params.id
      await this.postTagWithGroupId({ name: name, groupId: groupId })
      await this.indexTagsByGroup({ groupId: groupId })
      this.name = ''
    },
    ...mapActions('groups/tags', ['postTagWithGroupId', 'indexTagsByGroup'])
  }
}
</script>
