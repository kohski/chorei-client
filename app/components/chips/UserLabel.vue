<template>
  <div class="text-xs-center">
    <v-chip>
      <v-avatar>
        <img v-if="val.image" :src="val.image">
      </v-avatar>
      {{ val.name }}
    </v-chip>
  </div>
</template>
<script>
export default {
  name: 'MemberLabel',
  props: ['val']
}
</script>
