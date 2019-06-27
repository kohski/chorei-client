<template>
  <v-layout row justify-center>
    <v-flex xs10>
      <v-card class="spacer" @click.self="toDetailPage">
        <image-uploader
          v-if="!updatable"
          @imageRecieve="imageRecieve"
        />
        <v-img v-if="updatable" :src="formData.image" @click="toDetailPage" height="180px" contain/>
        <v-text-field
          v-model="formData.name"
          label="グループ名"
          :disabled="updatable"
        />
        <v-layout row justify-center>
          <v-btn
            v-if="updatable"
            round
            flat
            small
            color="info"
            @click.stop="makeUpdatable"
          >
            編集
          </v-btn>
          <v-btn
            v-if="updatable"
            round
            small
            flat
            color="error"
            @click.stop="deleteGroupWithId"
          >
            削除
          </v-btn>
          <v-btn
            v-if="!updatable"
            round
            small
            color="warning"
            @click.stop="putGroupWithParams"
          >
            update
          </v-btn>
          <v-btn
            v-if="!updatable"
            flat
            round
            small
            color="error"
            @click.stop="makeUpdatable"
          >
            cancel
          </v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import ImageUploader from '~/components/registers/ImageUploader'
import { mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  components: {
    ImageUploader
  },
  props: ['val'],
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
</style>
