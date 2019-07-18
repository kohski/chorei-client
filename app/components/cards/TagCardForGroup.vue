<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs12>
        <v-card class="tag_card_space">
          <tag-index />
          <tag-register />
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex'
import TagIndex from '~/components/cards/TagIndexCard'
import TagRegister from '~/components/registers/TagRegisterForGroup'
export default {
  components: {
    TagRegister,
    TagIndex
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
