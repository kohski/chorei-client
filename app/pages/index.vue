<template>
  <v-app>
    <v-layout row justify-center>
      <v-flex xs12>
        <h1 class="display-3 top_logo_title">
          家事管理アプリ Chorei
        </h1>
        <v-layout row justify-center wrap>
          <h2 class="display-2 top_logo_title">
            Choreiでできること
          </h2>
          <v-flex class="top_points" xs12>
            <v-layout row wrap justify-start>
              <v-flex xs2>
                <v-img :src="CalenderImage" />
              </v-flex>
              <v-spacer />
              <v-flex xs9>
                <p class="display-1">
                  スケジュール管理機能
                </p>
                <p class="title">
                  家事を、個人単位ではなくグループ単位で登録することで、モレを防ぐことができます。完了・未完了をカレンダー形式で管理することができます。
                </p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="top_points" xs12>
            <v-layout row wrap justify-start>
              <v-flex xs2>
                <v-img :src="FileImage" />
              </v-flex>
              <v-spacer />
              <v-flex xs9>
                <p class="display-1">
                  家事の細かい手順を記録
                </p>
                <p class="title">
                  家事をステップごとに詳細に記録することで、家事の方法を記録しておくことができます。
                </p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="top_points" xs12>
            <v-layout row wrap justify-start>
              <v-flex xs2>
                <v-img :src="KeyImage" />
              </v-flex>
              <v-spacer />
              <v-flex xs9>
                <p class="display-1">
                  公開されている家事の手順を参考に
                </p>
                <p class="title">
                  よくできた家事記録は公開設定をすることができます。方法がわからない家事は公開されているものから検索することができます。
                </p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
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
  </v-app>
</template>

<script>
// import mainImage from '~/assets/images/top_image_logo.png'
// import mainLogo from '~/assets/images/Logo.png'
import CalenderImage from '~/assets/images/calender.png'
import FileImage from '~/assets/images/file.png'
import KeyImage from '~/assets/images/public_key.png'
export default {
  layout: 'landingpage',
  data() {
    return {
      CalenderImage: CalenderImage,
      FileImage: FileImage,
      KeyImage: KeyImage
    }
  }
}
</script>
<style>
  .top_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-center;
  }
  .top_main_img {
    max-width: 100%;
  }
  .top_main_logo {
    max-width: 50%;
  }
  .top_logo_title {
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .top_points {
    padding: 3%;
    background-color: #efefef;
    border-radius: 8px;
    margin-bottom: 5%;
  }
  .points_image {
    max-height: 100px;
  }
</style>
