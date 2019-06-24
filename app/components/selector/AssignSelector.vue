<template>
  <v-layout row justify-center>
    <v-flex xs10>
      <v-select
        v-model="assignNames"
        :items="members.map(elm => elm.name)"
        :value="assignIds"
        attach
        chips
        outline
        label="Assign"
        multiple
        @change="handleSelect"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'MemberRegister',
  data() {
    return {
      memberNames: [],
      assignNames: [],
      assignIds: []
    }
  },
  mounted() {
    this.members.forEach((elm) => {
      this.memberNames.push(elm.name)
    })
    this.assigns.forEach((elm) => {
      this.assignIds.push(elm.id)
      this.assignNames.push(elm.name)
    })
  },
  methods: {
    async handleSelect(e) {
      const ids = e.map((elm) => {
        return this.members.find((member) => {
          return member.name === elm
        }).id
      })
      const newIdSet = new Set(ids)
      const oldIdSet = new Set(this.assignIds)
      const addDiff = new Set([...newIdSet].filter(elm => (!oldIdSet.has(elm))))
      const deleteDiff = new Set([...oldIdSet].filter(elm => (!newIdSet.has(elm))))
      const jobId = this.$router.history.current.params.id
      if ([...addDiff][0]) {
        await this.postAssign({ jobId: jobId, userId: [...addDiff][0] })
      }
      if ([...deleteDiff][0]) {
        await this.deleteAssign({ jobId: jobId, userId: [...deleteDiff][0] })
      }
      this.assignIds = ids
    },
    ...mapActions('groups/jobs/assigns', ['postAssign', 'deleteAssign'])
  },
  props: ['members', 'assigns']
}
</script>
