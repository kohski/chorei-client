<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-img :src="logoImage" contain height="60%" position="left"></v-img>
      <v-spacer />
      <user-label :val="showInfo" @click="toProfile" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <v-layout row justify-center>
        <span>&copy; 2019 chorei.site All Right Reserved</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import UserLabel from '~/components/chips/UserLabel'
import logoImage from '~/assets/images/Logo2.png'
import { mapGetters } from 'vuex'
export default {
  components: {
    UserLabel
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'account_box',
          title: 'プロフィール',
          to: '/profile'
        },
        {
          icon: 'group_work',
          title: 'マイページ',
          to: '/mypage'
        },
        {
          icon: 'public',
          title: '公開ジョブ一覧',
          to: '/jobs/public'

        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'chorei',
      logoImage: logoImage
    }
  },
  computed: {
    ...mapGetters('auth', ['showInfo'])
  },
  methods: {
    toProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>
<style>
  .default_layout_image{
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
</style>
