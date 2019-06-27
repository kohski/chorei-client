<template>
  <form>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-layout row justify-center="">
          <v-btn small dark round @click="toggleDialog">
            メンバーを招待
          </v-btn>
        </v-layout>
        <v-dialog v-model="dialog" width="30%">
          <v-card class="member_register_space">
            <p class="title">
              メールアドレスを入力してメンバーを招待
            </p>
            <v-text-field
              v-model="email"
              label="Email"
              tabindex="1"
              @change="emailValidate"
            />
            <v-layout row justify-center>
              <v-btn
                small
                dark
                round
                @click="createMember"
              >
                招待
              </v-btn>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </form>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      cannotRegister: true,
      email: '',
      dialog: false
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
    toggleDialog() {
      this.dialog = !this.dialog
    },
    ...mapActions('groups/members', ['postMember', 'indexMembers'])
  },
  computed: {

  }
}
</script>
<style>
  .member_register_space{
    padding: 5%;
  }
</style>
