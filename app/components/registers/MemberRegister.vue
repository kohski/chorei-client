<template>
  <form>
    <v-layout row justify-center>
      <v-flex xs5>
        <v-text-field
          v-model="email"
          label="Email"
          @change="emailValidate"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn :disabled="canRegister" @click="createMember">Register</v-btn>
    </v-layout>
  </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      canRegister: true,
      email: ''
    }
  },
  methods: {
    emailValidate() {
      const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      if (regexp.test(this.email)) {
        this.canRegister = false
      } else {
        this.canRegister = true
      }
    },
    async createMember() {
      const groupId = this.$store.$router.currentRoute.params.id
      await this.postMember({ email: this.email, groupId: groupId })
      this.email = ''
      await this.indexMembers({ groupId: groupId })
    },
    ...mapActions('groups/members', ['postMember', 'indexMembers'])
  },
  computed: {

  }
}
</script>
