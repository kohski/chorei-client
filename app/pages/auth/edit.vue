<template>
  <v-container>
    <v-layout>
      <v-flex xs10 offset-xs1 sm6 offset-sm3>
        <v-layout row justify-center>
          <h1 class="display-1 grey--text darken-3">
            Your Profile
          </h1>
        </v-layout>
        <v-text-field
          v-model="showInfo.name"
          type="text"
          label="Name"
          style="margin-top: 20px;"
        />
        <v-text-field
          v-model="showInfo.email"
          type="text"
          label="Email"
          disabled
        />
        <v-layout row justify-center>
          <v-img v-if="hasNotChange" :src="showInfo.image" max-width="120" />
        </v-layout>
        <image-uploader @imageRecieve="imageRecieve" />
        <v-textarea
          v-model="showInfo.description"
          label="description"
        />
        <v-layout row justify-center>
          <v-btn round dark @click="updateUserWithParams">
            Update
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ImageUploader from '~/components/registers/ImageUploader'
import dummyUserImage from '~/assets/images/dummy_user_image.png'
export default {
  components: {
    ImageUploader
  },
  async asyncData({ redirect, store }) {
    await store.dispatch('auth/getUser')
    return {
      hasNotChange: true
    }
  },
  computed: {
    toggleDummy() {
      return this.image === dummyUserImage
    },
    ...mapGetters('auth', ['showInfo'])
  },
  methods: {
    imageRecieve(imageUrl) {
      this.showInfo.image = imageUrl
      this.hasNotChange = false
    },
    updateUserWithParams() {
      this.updateUser({
        name: this.showInfo.name,
        image: this.showInfo.image,
        description: this.showInfo.description
      })
    },
    ...mapActions('auth', ['updateUser'])
  }
}
</script>
