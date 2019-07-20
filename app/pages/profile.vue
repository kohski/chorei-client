<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout row justify-center>
          <h1 class="display-1 grey--text darken-3">
            登録情報
          </h1>
        </v-layout>
        <v-text-field
          v-model="name"
          type="text"
          label="名前"
          style="margin-top: 20px;"
          :disabled="toggleDisabled"
        />
        <v-text-field
          v-model="email"
          type="text"
          label="メールアドレス"
          :disabled="toggleDisabled"
        />
        <v-layout row justify-center>
          <v-img :src="image" max-width="120" />
        </v-layout>
        <v-textarea
          v-model="description"
          label="自己紹介"
          :disabled="toggleDisabled"
        />
        <v-layout row justify-center>
          <v-btn round dark to="/auth/edit" color="#756c83">
            編集
          </v-btn>
          <v-btn
            round
            color="#f38181"
            @click="logoutInShowPage"
            dark
          >
            ログアウト
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import dummyUserImage from '~/assets/images/dummy_user_image.png'
export default {
  layout: 'default',
  async asyncData({ redirect, store }) {
    await store.dispatch('auth/getUser')
  },
  computed: {
    name() {
      return this.showInfo.name || 'not-registered'
    },
    email() {
      return this.showInfo.email || 'not-registered'
    },
    description() {
      return this.showInfo.description || 'not-registered'
    },
    image() {
      return this.showInfo.image || dummyUserImage
    },
    toggleDisabled() {
      return true
    },
    ...mapGetters('auth', ['showInfo'])
  },
  methods: {
    async logoutInShowPage() {
      await this.logout()
    },
    ...mapActions('auth', ['logout'])
  }
}
</script>
