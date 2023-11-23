<div align="center">
 <image src="src/assets/banjjak.png"/>
<h2>[2023] 싸피 관통 프로젝트 - 반짝🛩️</h2>
원하는 여행지를<br/>
반짝과 함께<br/>
여행을 반짝과 함께 떠나고
여행을 반짝으로 공유해보세요.🍀
</div>

## 프로젝트 개요 및 설명

| ![[image](https://user-images.githubusercontent.com/66003567/216818254-18683c3f-af80-4009-b2cc-35bdee865f23.png) ](<public/스크린샷 2023-11-23 오후 4.33.03.png>)

원하는 여행지를 반짝과 함께🍀<br>
혼자 여행을 가기보단 여럿이서 여행을 떠나고 싶으셨나요? 반짝을 통해 여행을 반짝과 함께 떠나고, 여행을 반짝으로 공유해보세요😆

- 반짝과 함께 떠나는 여행 🙋‍♀️🙋<br>
  반짝에서는 반짝 여행을 통해서 여행을 같이 즐길 반짝들을 모집할 수 있습니다. 원하는 여행지, 원하는 장소등을 선택한 후 날짜, 모집할 반짝들의 수를 반짝 여행에 업로드하여 같이 여행갈 인원을 모집해 보세요!!
- 반짝으로 여행을 공유 📱<br>
  자체의 숏폼인 반짝을 통해서 다녀왔던 여행 혹은 소소한 일상을 공유해 보세요! 각각의 반짝은 동영상과 썸네일을 업로드하여 영상을 공유할 수 있습니다. 또한 좋아요와 싫어요를 통해 다른 사람의 반응을 확인해 보세요!!
- 여행지 검색 💻<br>
  수많은 여행지와 관광지, 어떠한 정보가 있을지 궁금하지 않으신가요? 여행지 검색을 통해서 시/도 별로 구분된 각각의 관광지 정보를 확인해 보세요!!

## 팀원 구성

<div align="center">

|                                                              **이태호**                                                               |                                                                                      **차재환**                                                                                       |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/100212241?v=4" height=150 width=150> <br/> @leetaggg](https://github.com/leetaggg) | [<img src="https://avatars.githubusercontent.com/u/65287117?s=400&u=da3c5f3967057ff5d1bd906c7f03d683b887fde4&v=4" height=150 width=150> <br/> @barded](https://github.com/barded1998) |

</div>

## 1. 개발 환경

- Front : HTML, CSS, VUE
- 버전 및 이슈관리 : Github
- 협업 툴 : Discord, Notion, Github Wiki
- 디자인 : [Figma](https://www.figma.com/file/Q4154nKa6kZxkZz4h1COyQ/Untitled?type=design&node-id=52%3A2&mode=design&t=LvcWyNN3dJrgWkem-1)
  <br>

## 2. 채택한 개발 기술

- pinia : 상태 관리 라이브러리
- axios : http 요청 라이브러리
- vuetify : css 관련 라이브러리
- vue-router : 라우팅 관련 라이브러리

## 3. 프로젝트 구조

```
📦src
┣ 📂api
┃ ┣ 📜map.js
┃ ┣ 📜post.js
┃ ┣ 📜postuser.js
┃ ┣ 📜short.js
┃ ┗ 📜user.js
┣ 📂assets
┃ ┣ 📜banjjak.png
┃ ┣ 📜logo.png
┃ ┣ 📜logo.svg
┃ ┗ 📜ssafy.png
┣ 📂components
┃ ┣ 📂attraction
┃ ┃ ┗ 📜AttractionMap.vue
┃ ┣ 📂mypage
┃ ┃ ┣ 📂items
┃ ┃ ┃ ┣ 📜MyPagePost.vue
┃ ┃ ┃ ┗ 📜MyPageShort.vue
┃ ┃ ┗ 📜MyPage.vue
┃ ┣ 📂post
┃ ┃ ┣ 📂item
┃ ┃ ┃ ┣ 📜Button.vue
┃ ┃ ┃ ┗ 📜PostFormItem.vue
┃ ┃ ┣ 📂map
┃ ┃ ┃ ┣ 📜MapView.vue
┃ ┃ ┃ ┗ 📜MapWrite.vue
┃ ┃ ┣ 📜PostDetail.vue
┃ ┃ ┣ 📜PostList.vue
┃ ┃ ┣ 📜PostModify.vue
┃ ┃ ┣ 📜PostWrite.vue
┃ ┃ ┗ 📜TempPostList.vue
┃ ┣ 📂short
┃ ┃ ┣ 📜Short.vue
┃ ┃ ┣ 📜ShortCard.vue
┃ ┃ ┣ 📜ShortItem.vue
┃ ┃ ┗ 📜ShortRegist.vue
┃ ┣ 📂user
┃ ┃ ┣ 📜UserLogin.vue
┃ ┃ ┗ 📜UserSignup.vue
┃ ┗ 📜HelloWorld.vue
┣ 📂layouts
┃ ┗ 📜TheHeader.vue
┣ 📂plugins
┃ ┣ 📜index.js
┃ ┗ 📜vuetify.js
┣ 📂router
┃ ┗ 📜index.js
┣ 📂store
┃ ┣ 📜app.js
┃ ┣ 📜index.js
┃ ┣ 📜short.js
┃ ┗ 📜user.js
┣ 📂styles
┃ ┗ 📜settings.scss
┣ 📂util
┃ ┣ 📜http-commons.js
┃ ┗ 📜http-status.js
┣ 📂views
┃ ┣ 📜AttractionView.vue
┃ ┣ 📜HomeView.vue
┃ ┣ 📜MyPageView.vue
┃ ┣ 📜PostView.vue
┃ ┣ 📜ShortView.vue
┃ ┗ 📜UserView.vue
┣ 📜App.vue
┗ 📜main.js
```

## 4. 역할 분담

### 🍊이태호

- **UI**
  - 페이지 : 관광지 검색화면, 여행 모집화면
- **기능**
  - 여행 모집글 생성/삭제/수정/조회, 관광지 검색, 카카오 맵,

### 👻차재환

- **UI**
  - 페이지 : 홈 화면, 숏폼 화면, 마이페이지
- **기능**
  - 로그인/로그아웃, 숏폼 생성/조회, 회원정보 불러오기.

## 5. 개발 기간

- 전체 개발 기간 : 2023-11-13 ~ 2022-11-24
- UI 구현 : 2023-11-13 ~ 2022-11-24
- 기능 구현 : 2023-11-13 ~ 2022-11-24
  <br>

## 6. 페이지별 기능

![홈](public/%ED%99%88.png)
홈 화면입니다. 헤더를 통해 원하는 페이지로 이동할 수 있으며, 시작하기 버튼을 통해 로그인/회원가입을 할 수있다.

![로그인](public/%EB%A1%9C%EA%B7%B8%EC%9D%B8.png)
로그인 화면입니다. 아이디와 비밀번호를 입력하여 로그인 할 수 있습니다.

![회원가입](public/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.png)
회원가입 화면입니다. 아이디, 비밀번호, 닉네임, 이름, 지역을 선택하여 회원가입할 수 있습니다.

![반짝](public/%EB%B0%98%EC%A7%9D.png)
반짝 화면입니다. 사용자의 지역에 맞는 동영상들을 확인할 수 있습니다.

![마이페이지 -반짝](public/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B0%98%EC%A7%9D.png)
마이페이지-반짝 화면입니다. 사용자가 업로드한 반짝을 확인할 수 있습니다.
