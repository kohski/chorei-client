<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card @click="dialog = !dialog">
          <v-layout row justify-center>
            <v-img :src="user_image" width="80px" height="80px" class="user_image" contain />
          </v-layout>
          <v-card-title primary-title class="member_name">
            {{ val.name }}
          </v-card-title>
          <v-btn flat small color="error" @click.stop="destroyMember">
            グループから除外
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" width="40%">
        <v-card>
          <v-img :src="user_image" />
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
  name: 'MemberCard',
  props: ['val'],
  data() {
    return {
      dialog: false
    }
  },
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
  .user_image{
    background-color: #dddddd ;
    border-radius: 50%;
    margin: 5%;
  }
  .member_name {
    text-align: center;
  }
</style>
