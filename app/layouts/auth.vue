<template>
  <v-app class="main">
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      class="footer"
      color="#b9e1dc"
    >
      <v-layout row justify-center>
        <span>&copy; 2019 chorei.site All Right Reserved</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import logoImage from '~/assets/images/Logo2.png'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'chorei',
      logoImage: logoImage
    }
  }
}
</script>
<style lang="stylus" scoped>
  .header
    background-color #B9E1DC
  .footer
    background-color #B9E1DC
</style>
