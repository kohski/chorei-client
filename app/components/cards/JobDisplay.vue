<template>
  <v-layout row justify-center>
    <v-flex>
      <v-card class="spacer">
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
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'StepRegister',
  props: ['val']
}
</script>
<style>
  .spacer {
    padding: 5%;
  }
</style>
