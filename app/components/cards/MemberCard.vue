<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card @click="dialog = !dialog">
          <v-layout row justify-start class="member_spacer">
            <v-badge overlap>
              <template v-slot:badge v-if="val.member.is_owner">
                <v-icon dark>done</v-icon>
              </template>
                <v-avatar size="50px">
                  <v-img :src="user_image" class="user_image"/>
                </v-avatar>
            </v-badge>
            <v-card-title>{{val.name}}</v-card-title>
          </v-layout>
          <v-layout row justify-space-around>
            <v-btn flat fab color="primary" @click.stop="putMember(val)" v-if="!val.member.is_owner">
              <v-icon dark right class="member_btn">how_to_reg</v-icon>
            </v-btn>
            <v-btn flat fab color="error" @click.stop="destroyMember" v-if="can_delete">
              <v-icon dark right class="member_btn">delete</v-icon>
            </v-btn>
          </v-layout>
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
  props: ['val', 'current_user'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    user_image() {
      return this.val.image ? this.val.image : dummyUserImage
    },
    can_delete() {
      const isOwner = this.val.member.is_owner
      const isSelf = this.val.member.user_id === this.current_user.id
      return !isOwner || isSelf
    },
    ...mapGetters('groups/members', ['members'])
  },
  methods: {
    async destroyMember() {
      const groupId = this.$store.$router.currentRoute.params.id
      await this.deleteMember({ userId: this.val.id, groupId: groupId })
      await this.indexMembers({ groupId: groupId })
    },
    async putMember(val) {
      const groupId = this.$store.$router.currentRoute.params.id
      const memberId = val.member.id
      await this.updateMember({ memberId: memberId })
      await this.indexMembers({ groupId: groupId })
    },
    ...mapActions('groups/members', ['deleteMember', 'indexMembers', 'updateMember']),
    ...mapActions('groups', ['showGroup'])
  }
}
</script>
<style>
  .member_spacer {
    padding: 5%;
  }
  .member_btn {
    margin: 0;
  }
</style>
