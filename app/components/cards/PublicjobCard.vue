<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs10>
        <v-card @click="dialog = !dialog">
          <v-img :src="val.image" height="120px" />
          <div class="spacer">
            <v-text-field
              v-model="val.title"
              label="名称"
              disabled
              d-flex
              child-flex
            />
            <v-textarea
              v-model="val.description"
              label="概要"
              disabled
            />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" width="60%">
        <v-card class="modal_wrapper">
          <v-img :src="val.image" />
          <v-text-field
            v-model="val.title"
            label="名称"
            disabled
            auto-grow
          />
          <v-textarea
            v-model="val.description"
            label="概要"
            auto-grow
            disabled
          />
          <v-layout row justify-start wrap>
            <v-flex
              v-for="(step,index) in val.steps"
              :key="step.id"
              xs6
            >
              <step-display :val="step" :index="index"></step-display>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-btn dark round small @click="selectGroup">複製</v-btn>
          </v-layout>
          <v-dialog v-model="groupSelectDialog" width="40%">
            <v-card class="group_select_space">
              <p class="title">複製する先のグループを選択してください</p>
              <v-select
                v-model="selectedGroupId"
                :items="groups"
                item-text="name"
                item-value="id"
              ></v-select>
              <v-layout row justify-center>
                <v-btn @click="cloneJob" small round dark>複製する</v-btn>
              </v-layout>
            </v-card>
          </v-dialog>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import StepDisplay from '~/components/cards/StepDisplay'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'StepRegister',
  components: {
    StepDisplay
  },
  mounted() {
    this.indexGroups()
  },
  props: ['val'],
  data() {
    return {
      dialog: false,
      groupSelectDialog: false,
      selectedGroupId: ''
    }
  },
  computed: {
    ...mapGetters('groups/jobs', ['job']),
    ...mapGetters('groups', ['groups'])
  },
  methods: {
    selectGroup() {
      this.groupSelectDialog = true
    },
    async cloneJob() {
      const groupId = this.selectedGroupId
      const jobFormData = {
        title: this.val.title,
        desctiprion: this.val.description,
        image: this.val.image,
        is_public: false
      }
      await this.postJob({ groupId: groupId, formData: jobFormData })
      const jobId = this.job.id
      const steps = this.val.steps
      for (let i = 0; i < steps.length; i++) {
        const stepFormData = {
          image: steps[i].image,
          memo: steps[i].memo,
          order: steps[i].order
        }
        this.postStep({ jobId: jobId, formData: stepFormData })
      }
      this.$router.push(`/jobs/${jobId}`)
    },
    ...mapActions('groups/jobs', ['showJob', 'postJob']),
    ...mapActions('groups', ['indexGroups']),
    ...mapActions('groups/jobs/steps', ['postStep'])
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
  .group_select_space {
    padding: 5%;
  }
</style>
