<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs10 offset-xs1>
        <v-card  @click="dialog = !dialog" width="200px">
          <v-layout row justify-center>
            <v-img :src="user_image" max-width="80px"  class="dummy_user_image"></v-img>
          </v-layout>
          <v-card-title primary-title class="member_name">
            {{ val.name }}
          </v-card-title>
          <v-btn flat small color="error" @click.stop="destroyMember">delete</v-btn>
        </v-card>
        {{ val }}
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" width="40%">
        <v-card>
          <v-img :src="user_image"></v-img>
          <v-card-title>
            <span class="headline">{{ val.name }}</span>
          </v-card-title>
          <v-card-text>{{ val.description }}</v-card-text>
          <v-card-text>{{ val.email }}</v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import dummyUserImage from '~/assets/images/dummy_user_image.png'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'JobCard',
  data() {
    return {
      dialog: false
    }
  },
  props: ['val'],
  computed: {
    user_image() {
      return this.val.image ? this.val.image : dummyUserImage
    },
    ...mapGetters('groups/members', ['members'])
  },
  methods: {
    async destroyMember() {
      const groupId = this.$store.$router.currentRoute.params.id
      await this.deleteMember({ userId: this.val.id, groupId: groupId })
      await this.indexMembers({ groupId: groupId })
    },
    ...mapActions('groups/members', ['deleteMember', 'indexMembers']),
    ...mapActions('groups', ['showGroup'])
  }
}
</script>
<style>
  .dummy_user_image{
    background-color: #dddddd ;
    border-radius: 50%;
    margin: 5%;
  }
  .member_name {
    text-align: center;
  }
</style>
