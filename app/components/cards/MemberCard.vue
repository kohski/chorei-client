<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card @click="dialog = !dialog">
          <v-layout row justify-start class="member_spacer">
            <v-badge overlap color="#f38181">
              <template v-if="val.member.is_owner" v-slot:badge>
                <v-icon dark>
                  done
                </v-icon>
              </template>
              <v-avatar size="50px">
                <v-img :src="user_image" class="user_image" />
              </v-avatar>
            </v-badge>
            <v-card-title>{{ val.name }}</v-card-title>
          </v-layout>
          <v-layout row justify-space-around>
            <v-btn v-if="can_owner_change" flat fab color="#51b4b8" @click.stop="putMember(val)">
              <v-icon dark right class="member_btn">
                how_to_reg
              </v-icon>
            </v-btn>
            <v-btn v-if="can_delete" flat fab color="#f38181" @click.stop="destroyMember">
              <v-icon dark right class="member_btn">
                delete
              </v-icon>
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
  props: ['val', 'currentUser', 'owner'],
  data() {
    return {
      dialog: false
    }
  },
  async created() {
    const groupId = this.$store.$router.currentRoute.params.id
    await this.showGroup({ groupId: groupId })
  },
  computed: {
    user_image() {
      return this.val.image ? this.val.image : dummyUserImage
    },
    can_delete() {
      let isCurrentUserOwner = false
      if (this.owner && this.currentUser.id === this.owner.member.user_id) {
        isCurrentUserOwner = true
      }
      const isSelf = this.val.member.user_id === this.currentUser.id
      return isCurrentUserOwner || isSelf
    },
    can_owner_change() {
      let isCurrentUserOwner = false
      if (this.owner && this.currentUser.id === this.owner.member.user_id) {
        isCurrentUserOwner = true
      }
      const notOwnerNow = !this.val.member.is_owner
      return isCurrentUserOwner && notOwnerNow
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
