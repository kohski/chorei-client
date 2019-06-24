<template>
  <v-container fluid>
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <v-layout row justify-center>
        <img v-if="imageUrl" :src="imageUrl" height="150">
      </v-layout>
      <br>
      <v-btn small round dark prepend-icon="attach_file" @click="pickFile">
        image
      </v-btn>
      <input
        ref="image"
        type="file"
        style="display: none"
        accept="image/*"
        @change="onFilePicked"
      >
    </v-flex>
  </v-container>
</template>
<script>
export default {
  name: 'ImageUpaloader',
  data() {
    return {
      dialog: false,
      imageUrl: ''
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.$emit('imageRecieve', this.imageUrl)
        })
      } else {
        this.imageUrl = ''
      }
    }
  }
}
</script>
<style>
.container .fluid {
  padding: 0;
}
</style>
