<template>
  <v-layout>
    <v-flex xs10 offset-xs1>
      <v-card
        color="indigo lighten-3"
        dark
      >
        <v-img
          :src="val.image"
          contain
        >
        </v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0" v-text="val.title"></h3>
            <div> {{ val.description }} </div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'JobCard',
  props: ['val']
}
</script>
