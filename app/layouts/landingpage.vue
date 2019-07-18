<template>
  <v-app class="main">
    <v-img :src="mainImage" class="main_image" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      class="footer"
    >
      <v-layout row justify-center>
        <span>&copy; 2019 chorei.site All Right Reserved</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import logoImage from '~/assets/images/Logo2.png'
import mainImage from '~/assets/images/top_image_logo.png'
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
      logoImage: logoImage,
      mainImage: mainImage
    }
  }
}
</script>
<style lang="stylus" scoped>
  .header
    background-color #B9E1DC
  .footer
    background-color #B9E1DC
  .main_image
    border: none;
</style>
