<template>
  <v-container>
    <v-layout>
      <v-flex>
        <job-register />
        <!-- <step-register />
        <assign-register />
        <schedule-register />
        <tag-register /> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import JobRegister from '~/components/registers/JobRegister'
// import StepRegister from '~/components/registers/StepRegister'
// import AssignRegister from '~/components/registers/AssignRegister'
// import ScheduleRegister from '~/components/registers/ScheduleRegister'
// import TagRegister from '~/components/registers/TagRegister'
// import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    JobRegister
    // StepRegister
    // AssignRegister,
    // ScheduleRegister,
    // TagRegister
  }
}
</script>
