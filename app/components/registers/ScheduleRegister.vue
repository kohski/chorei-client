<template>
  <v-layout row justify-center>
    <v-flex xs5>
      <v-select />
    </v-flex>
  </v-layout>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ScheduleRegister',
  computed: {
    ...mapGetters()
  },
  methods: {
    ...mapActions()
  }
}
</script>
