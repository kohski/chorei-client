<template>
  <form>
    <v-layout row justify-center>
      <v-flex xs5>
        <v-text-field
          v-model="email"
          label="Email"
          tabindex="1"
          @change="emailValidate"
        />
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn
        tabindex="2"
        @click="createMember"
      >
        Register
      </v-btn>
    </v-layout>
  </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      cannotRegister: true,
      email: ''
    }
  },
  methods: {
    emailValidate() {
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      if (regexp.test(this.email)) {
        this.cannotRegister = false
      } else {
        this.cannotRegister = true
      }
    },
    async createMember() {
      const groupId = this.$store.$router.currentRoute.params.id
      if (!this.cannotRegister) {
        await this.postMember({ email: this.email, groupId: groupId })
      }
      this.email = ''
      await this.indexMembers({ groupId: groupId })
    },
    ...mapActions('groups/members', ['postMember', 'indexMembers'])
  },
  computed: {

  }
}
</script>
