<template>
  <v-chip color="transparent" @click="transferProfile">
    <v-avatar v-if="val.image" size="40px">
      <img :src="val.image">
    </v-avatar>
    {{ val.name }}
  </v-chip>
</template>
<script>
export default {
  name: 'MemberLabel',
  props: ['val'],
  methods: {
    transferProfile() {
      this.$router.push(`/profile`)
    }
  }
}
</script>
