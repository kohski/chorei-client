<template>
  <div>
    <v-card class="date_time_selector_space" flat>
      <v-layout column align-center wrap>
        <v-flex xs10>
          <v-layout row justify-center>
            <p class="title">
              日付関連
            </p>
          </v-layout>
          <v-btn icon flat small @click="startDateToggle = !startDateToggle">
            <v-icon color="#756c83">
              date_range
            </v-icon>
          </v-btn>
          <v-btn icon flat small @click="startTimeToggle = !startTimeToggle">
            <v-icon color="#756c83">
              access_time
            </v-icon>
          </v-btn>
          <v-text-field readonly :value="startDateTime" outline label="開始" color="#756c83" />
        </v-flex>
      </v-layout>
      <v-layout column align-center wrap>
        <v-flex xs10>
          <v-btn icon flat small color="#756c83" @click="endDateToggle = !endDateToggle">
            <v-icon>date_range</v-icon>
          </v-btn>
          <v-btn icon flat small color="#756c83" @click="endTimeToggle = !endTimeToggle">
            <v-icon>access_time</v-icon>
          </v-btn>
          <v-text-field
            readonly
            :value="endDateTime"
            outline
            label="終了"
            :error-messages="errorMessage"
            color="#756c83"
          />
        </v-flex>
      </v-layout>
      <v-layout column align-center wrap>
        <v-flex xs8>
          <v-select
            v-model="frequency"
            :items="frequencies"
            item-text="text"
            item-value="value"
            label="頻度"
            outline
          />
          <v-select
            v-model="repeatTimes"
            :items="times"
            label="回数"
            :disabled="repeatTimeChecker"
            outline
          />
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-btn
          small
          dark
          round
          :disabled="dateChecker"
          color="#756c83"
          icon
          @click="putJobWithParams"
        >
          <v-icon>update</v-icon>
        </v-btn>
      </v-layout>
    </v-card>

    <!-- modal windows -->
    <v-dialog v-model="startDateToggle" width="30%">
      <v-date-picker v-model="startDate" full-width @change="pastDateCheck" />
    </v-dialog>
    <v-dialog v-model="startTimeToggle" width="30%">
      <v-time-picker v-model="startTime" full-width @change="pastDateCheck" />
    </v-dialog>
    <v-dialog v-model="endDateToggle" width="30%">
      <v-date-picker v-model="endDate" full-width @change="pastDateCheck" />
    </v-dialog>
    <v-dialog v-model="endTimeToggle" width="30%">
      <v-time-picker v-model="endTime" full-width @change="pastDateCheck" />
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 10),
      startTime: '9:00',
      endDate: new Date().toISOString().substr(0, 10),
      endTime: '10:00',
      startDateToggle: false,
      startTimeToggle: false,
      endDateToggle: false,
      endTimeToggle: false,
      frequencies: [
        { value: 'once', text: '一度だけ' },
        { value: 'daily', text: '毎日' },
        { value: 'weekly', text: '毎週' },
        { value: 'monthly', text: '毎月' },
        { value: 'yearly', text: '毎年' }
      ],
      frequency: '',
      repeatTimes: 0
    }
  },
  mounted() {
    const startDateTime = this.job.base_start_at || this.$moment(new Date()).format()
    this.startDate = startDateTime.substr(0, 10)
    this.startTime = this.$moment(startDateTime).format('LT') || '9:00'
    const endDateTime = this.job.base_end_at || this.$moment(new Date()).add(1, 'hours').format()
    this.endDate = endDateTime.substr(0, 10)
    this.endTime = this.$moment(endDateTime).format('LT')
    this.frequency = this.job.frequency
    this.repeatTimes = this.job.repeat_times
  },
  computed: {
    startDateTime() {
      return this.startDate + ' ' + this.startTime
    },
    endDateTime() {
      return this.endDate + ' ' + this.endTime
    },
    repeatTimeChecker() {
      if (this.frequency === '' || this.frequency === 'once') {
        return true
      }
      return false
    },
    dateChecker() {
      const checkStart = new Date(this.startDate + ' ' + this.startTime)
      const checkEnd = new Date(this.endDate + ' ' + this.endTime)
      if (checkStart <= checkEnd) {
        return false
      }
      return true
    },
    errorMessage() {
      if (this.dateChecker) {
        return '終了日付は開始日付以降を指定'
      }
      return ''
    },
    times() {
      return [...Array(60).keys()].map(i => ++i)
    },
    ...mapGetters('groups/jobs', ['job'])
  },
  methods: {
    pastDateCheck() {
      const checkStart = new Date(this.startDate + ' ' + this.startTime)
      const checkEnd = new Date(this.endDate + ' ' + this.endTime)
      if (checkStart > checkEnd) {
        this.$toast.error('')
      }
    },
    putJobWithParams() {
      const jobId = this.$route.params.id
      const formData = {
        base_start_at: this.startDate + ' ' + this.startTime,
        base_end_at: this.endDate + ' ' + this.endTime,
        frequency: this.frequency,
        'repeat_times': this.repeatTimes
      }
      this.putJob({ jobId, formData })
    },
    ...mapActions('groups/jobs', ['putJob'])
  }
}
</script>
<style>
  .date_time_selector_space {
    padding: 5%;
  }
</style>
