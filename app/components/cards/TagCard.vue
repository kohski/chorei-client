<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card class="tag_card_space">
          <tagging-selector />
          <tag-register />
          <tag-delete-selector />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
import TagRegister from '~/components/registers/TagRegister'
import TaggingSelector from '~/components/selector/TaggingSelector'
import TagDeleteSelector from '~/components/selector/TagDeleteSelector'
export default {
  components: {
    TagRegister,
    TaggingSelector,
    TagDeleteSelector
  }
}
</script>
<style>
  .dummy_user_image{
    background-color: #dddddd ;
    border-radius: 50%;
    margin: 5%;
  }
  .member_name {
    text-align: center;
  }
  .tag_card_space {
    padding: 5%;
  }
</style>
