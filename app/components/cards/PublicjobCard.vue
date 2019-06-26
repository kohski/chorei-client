<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-card @click="dialog = !dialog">
          <v-img :src="val.image" height="120px" />
          <div class="spacer">
            <v-text-field
              v-model="val.title"
              label="title"
              disabled
              d-flex
              child-flex
            />
            <v-textarea
              v-model="val.description"
              label="description"
              disabled
            />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" width="40%">
        <v-card class="modal_wrapper">
          <v-img :src="val.image" />
          <v-text-field
            v-model="val.title"
            label="title"
            disabled
            auto-grow
          />
          <v-textarea
            v-model="val.description"
            label="description"
            auto-grow
            disabled
          />
          <v-layout row justify-center="">
            <v-btn round dark :to="`/jobs/${val.id}`">
              Detail
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  props: ['val'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters('/groups/jobs', ['job'])
  },
  methods: {
    ...mapActions('groups/jobs', ['showJob'])
  }
}
</script>
<style>
  .spacer {
    padding-left:5%;
    padding-right:5%;
  }
  .modal_wrapper {
    padding: 5%;
  }
</style>
