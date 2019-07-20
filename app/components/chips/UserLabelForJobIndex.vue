<template>
  <div class="text-xs-center">
    <v-chip color="transparent">
      <v-avatar v-if="val.image">
        <img :src="val.image">
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
