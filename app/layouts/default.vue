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
      <v-toolbar-title v-text="title" />
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
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import UserLabel from '~/components/chips/UserLabel'
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
          title: 'Profile',
          to: '/profile'
        },
        {
          icon: 'group_work',
          title: 'My Page',
          to: '/mypage'
        },
        {
          icon: 'public',
          title: 'public jobs',
          to: '/jobs/public'

        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Chorei'
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
