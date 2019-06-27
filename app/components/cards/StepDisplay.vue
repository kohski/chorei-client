<template>
  <v-layout row justify-center class="step_card_wrapper">
    <v-flex xs10>
      <p>{{ index + 1 }}</p>
      <v-img :src="val.image" height="120" contain />
      <v-textarea
        v-model="val.memo"
        label="memo"
        disabled
      />
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'StepDisplay',
  props: ['val', 'index']
}
</script>
<style>
  .step_card_wrapper {
    border: 1px solid #dddddd;
    padding: 5%;
    margin: 5%;
  }
</style>
