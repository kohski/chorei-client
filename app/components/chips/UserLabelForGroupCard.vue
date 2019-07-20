<template>
  <div class="text-xs-center">
    <v-flex xs12>
      <v-badge overlap color="#f38181">
        <template v-if="is_owner" v-slot:badge>
          <v-icon dark>
            done
          </v-icon>
        </template>
        <v-avatar size="35px">
          <img :src="image">
        </v-avatar>
        <!-- {{ val.name }} -->
      </v-badge>
    </v-flex>
  </div>
</template>
<script>
import DummyUserImage from '~/assets/images/dummy_user_image.png'
export default {
  name: 'MemberLabel',
  props: ['val', 'group'],
  computed: {
    is_owner() {
      if (!this.group.owner) {
        return
      }
      return this.val.uid === this.group.owner.uid
    },
    image() {
      return this.val.image || DummyUserImage
    }
  }
}
</script>
