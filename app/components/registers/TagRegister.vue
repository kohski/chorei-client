<template>
  <v-layout row justify-center>
    <v-flex xs5>
      <v-text-field
        v-model="email"
        label="dummy"
        tabindex="1"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
