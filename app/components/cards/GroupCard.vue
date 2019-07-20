<template>
  <v-layout row justify-center>
    <v-flex xs10>
      <v-card  @click.self="toDetailPage" class="group_card_space">
        <image-uploader
          v-if="!updatable"
          @imageRecieve="imageRecieve"
        />
        <v-img v-if="updatable" :src="formData.image" contain @click="toDetailPage" />
        <v-text-field
          v-model="formData.name"
          :disabled="updatable"
        />
        <v-layout row justify-start wrap>
          <user-label
            v-for="member in val.members"
            :key="member.id"
            :val="member"
            :group="val"
          />
        </v-layout>
        <v-divider />
        <v-layout v-if="is_owner" row justify-space-around>
          <v-btn
            v-if="updatable"
            fab
            flat
            small
            color="#756c83"
            icon
            @click.stop="makeUpdatable"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            v-if="updatable"
            fab
            small
            flat
            icon
            color="#f38181"
            @click.stop="deleteGroupWithId"
          >
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn
            v-if="!updatable"
            fab
            flat
            small
            color="#756c83"
            icon
            @click.stop="putGroupWithParams"
          >
            <v-icon>update</v-icon>
          </v-btn>
          <v-btn
            v-if="!updatable"
            fab
            flat
            round
            small
            color="#f38181"
            icon
            @click.stop="makeUpdatable"
          >
            <v-icon>clear</v-icon>
          </v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import UserLabel from '~/components/chips/UserLabelForGroupCard'
import { mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  components: {
    ImageUploader,
    UserLabel
  },
  props: ['val', 'currentUser'],
  data() {
    return {
      formData: {
        image: '',
        name: '',
        description: '',
        is_public: false
      },
      updatable: true,
      is_publics: [
        { text: '公開', value: true },
        { text: '非公開', value: false }
      ]
    }
  },
  computed: {
    is_owner() {
      if (!this.val.owner) {
        return
      }
      return this.val.owner.uid === this.currentUser.email
    }
  },
  mounted() {
    this.formData.image = this.val.image
    this.formData.name = this.val.name
  },
  methods: {
    imageRecieve(imageUrl) {
      this.formData.image = imageUrl
    },
    makeUpdatable() {
      this.updatable = !this.updatable
    },
    toDetailPage() {
      this.$router.push(`/groups/${this.val.id}`)
    },
    async putGroupWithParams() {
      const groupId = this.val.id
      await this.putGroup({ groupId: groupId, formData: this.formData })
      this.updatable = true
    },
    async deleteGroupWithId() {
      const groupId = this.val.id
      await this.deleteGroup({ groupId: groupId })
      await this.$emit('updateGroupCards')
    },
    ...mapActions('groups', ['putGroup', 'deleteGroup'])
  }
}
</script>
<style>
  .spacer {
    padding: 5%;
  }
  .group_card_space {
    margin-top: 5%;
  }
</style>
