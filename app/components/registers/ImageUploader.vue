<template>
  <v-content>
    <v-container fluid>
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <img :src="imageUrl" height="150" v-if="imageUrl"/>
        <v-text-field label="Select Image" @click='pickFile' prepend-icon='attach_file'></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        >
      </v-flex>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Hello World!</v-card-title>
          <v-card-text>Image Upload Script in VUE JS
            <hr>Yubaraj Shrestha
            <br>http://yubarajshrestha.com.np/</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
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
