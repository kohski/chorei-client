<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <h1 class="display-1">家事管理アプリ Chorei</h1>
      <hr>
      <h2>作成した目的</h2>
      <p>家事の共有を支援することで効率的な分担を促す</p>
      <h2>使用方法</h2>
        <h3>1. ジョブ登録</h3>
        <ol>
          <li>まずはユーザー登録</li>
          <li>つづいてグループの作成</li>
          <li>グループを作成したらメールアドレスでメンバーを招待</li>
          <li>グループで共有すべきジョブを作成（まずは名称と概要）。</li>
          <li>詳細画面へ</li>
            <ol>
              <li>開始日程・終了日程・頻度・繰返回数を指定</li>
              <li>担当者を設定（グループ内のメンバーから選択</li>
              <li>必要に応じてタグを作成・設定（作成したタグはグループ内で共有される）</li>
              <li>細かい手順はステップに追加していく（ステップは順番の変更も可能）</li>
            </ol>
          <li>ジョブが登録できて汎用性がありそうなものは公開設定が可能</li>
        </ol>
      <h3>2.公開ジョブ</h3>
        <ol>
          <li>公開ジョブは「公開ジョブ一覧」より確認できる</li>
          <li>気に入った公開ジョブを選択して自分のグループに対してジョブの複製登録が可能</li>
          <li>日程、担当者、タグはコピーされないので自分のグループ用にカスタマイズする</li>
        </ol>
      <h3>3.マイページ</h3>
        <ol>
          <li>自分が所属しているグループの一覧が出る</li>
          <li>また、自分が担当になっているジョブをカレンダー形式で確認ができる</li>
          <li>カレンダーから各ジョブのページへ飛ぶことができる</li>
        </ol>
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
