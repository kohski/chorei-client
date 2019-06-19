<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-alert
          :value="isSuccess"
          color="success"
          icon="check_circle"
          transition="scale-transition"
          outline
        >
          This is a success alert.
        </v-alert>
        <v-alert
          v-for="msg in errors.full_messages"
          :key="msg"
          :value="errors.isError"
          color="error"
          icon="warning"
          transition="scale-transition"
          outline
        >
          {{ msg }}
        </v-alert>
        <v-text-field
          v-model="formData.email"
          type="text"
          label="Email"
        />
        <v-text-field
          v-model="formData.password"
          type="password"
          label="Password"
        />
        <v-layout row justify-center>
          <v-btn round dark @click="handleClickSubmit">
            submit
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  asyncData({ redirect, store }) {
    return {
      formData: {
        name: '',
        email: 'nuxt@test.com',
        password: 'password'
      },
      isSuccess: false,
      errors: {
        isError: false,
        full_messages: []
      }
    }
  },
  methods: {
    async handleClickSubmit() {
      await this.logIn({ ...this.formData })
      this.$router.push('/groups')
    },
    ...mapActions('auth', ['logIn'])
  }
}
</script>
