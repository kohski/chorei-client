<template>
  <v-layout wrap>
    <v-flex>
      <v-sheet height="500">
        <p class="title">
          {{ target.slice(0,target.lastIndexOf('-')) }}
        </p>
        <v-calendar :now="today" :value="target" color="primary">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.title"
                v-model="event.open"
                full-width
                offset-x
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    :class="event.isDone?'my-event finished':'my-event'"
                    v-on="on"
                  >
                    <!-- <v-avatar size="30px">
                      <img v-if="event.groupImage" :src="event.groupImage">
                    </v-avatar> -->
                    {{ event.title }}
                  </div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <!-- クリック後のdialog -->
                  <v-toolbar
                    color="#f38181"
                    dark
                  >
                    <v-btn icon :to="`/jobs/${event.jobId}`">
                      <v-icon>add_to_queue</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title" />
                    <v-spacer />
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details" />
                    <v-divider />
                    <v-switch
                      v-model="event.isDone"
                      :label="event.isDone? '完了':'未了'"
                      @change.self="updateSchedule(event)"
                    />
                  </v-card-title>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
      <v-layout row justify-space-between>
        <v-flex sm4 xs12 class="text-sm-left text-xs-center">
          <v-btn fab small color="#756c83" @click="prevMonth">
            <v-icon color="#fbfbfb">
              chevron_left
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex sm4 xs12 class="text-sm-right text-xs-center">
          <v-btn fab small color="#756c83" @click="nextMonth">
            <v-icon color="#fbfbfb">
              chevron_right
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['vals', 'groups', 'jobs'],
  data: () => ({
    today: '2019-06-01',
    target: '2019-06-01',
    events: [],
    groupImages: []
  }),
  computed: {
    eventsMap() {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  created() {
    // this.groupImages = this.groups.map((elm) => {
    //   const eachGroup = {
    //     id: elm.id,
    //     image: elm.image
    //   }
    //   return eachGroup
    // })
    this.events = this.vals.map((elm) => {
      const date = this.$moment(new Date(elm.start_at)).format('L').split('/').join('-')
      const targetJob = this.jobs.find((job) => { return parseInt(job.id) === elm.job_id })
      // const groupImage = this.groups.find((group) => {
      //   return group.id === elm.job_entity.group_id
      // }).image
      const eachSchedule = {
        id: elm.id,
        jobId: elm.job_id,
        title: targetJob.attributes.title,
        details: targetJob.attributes.description,
        date: date,
        // groupImage: groupImage,
        isDone: elm.is_done,
        open: false
      }
      return eachSchedule
    })
  },
  mounted() {
    this.today = this.$moment(new Date()).format('L').split('/').join('-')
    this.target = this.$moment(new Date()).format('L').split('/').join('-')
  },
  methods: {
    open(event) {
      alert(event.title)
    },
    nextMonth() {
      this.target = this.$moment(this.target).add(1, 'month').format('L').split('/').join('-')
    },
    prevMonth() {
      this.target = this.$moment(this.target).subtract(1, 'month').format('L').split('/').join('-')
    },
    async updateSchedule(event, second) {
      await this.$store.dispatch(`groups/jobs/schedules/putSchedule`, { scheduleId: event.id, isDone: event.isDone })
    }
    // ...mapActions('groups/jobs/schedules', ['indexAssignedSchedules'])
  }
}
</script>
<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #f38181;
    color: #ffffff;
    border: 1px solid #f38181;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    display: flex;
    align-items: center;
  }
  .finished {
    background-color: #FFCDD2;
    border: 1px solid #FFCDD2;
  }

</style>
