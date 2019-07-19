<template>
  <div class="text-xs-center">
    <v-chip>
      <v-badge overlap>
        <template v-if="is_owner" v-slot:badge>
          <v-icon dark>
            done
          </v-icon>
        </template>
        <v-avatar>
          <img v-if="val.image" :src="val.image">
        </v-avatar>
        {{ val.name }}
      </v-badge>
    </v-chip>
  </div>
</template>
<script>
export default {
  name: 'MemberLabel',
  props: ['val', 'group'],
  computed: {
    is_owner() {
      return this.val.uid === this.group.owner.uid
    }
  }
}
</script>
