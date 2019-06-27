<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-layout row justify-center>
        <v-btn large round color="warning" to="/auth/login">
          ログイン
        </v-btn>
        <v-btn large round color="info" to="/auth/signup">
          新規登録
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'landingpage'
}
</script>
