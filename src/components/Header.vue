<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      userName: sessionStorage.getItem("member_id"),
      administrator: sessionStorage.getItem("administrator"),
      isAdministrator: false,
      isMember: false,
    }
  },
  mounted() {
    this.isMemberLogin();
    this.isAdministratorLogin();
  },
  methods: {
    isAdministratorLogin() {
      if (sessionStorage.getItem("administrator") === "true") {
        this.isAdministrator = true,
          console.log(this.isAdministrator)
      }
    },
    isMemberLogin() {
      if (sessionStorage.getItem("member_id")) {
        this.isMember = true,
          console.log(this.isMember)
      }
    },
    logOut() {
      sessionStorage.removeItem("member_id");
      sessionStorage.removeItem("administrator");
      this.isMember = false;
      this.isAdministrator = false;
      alert("您已登出");
    }
  }
}

</script>

<template>
  <body>
    <header>
      <div class="title">
        <div class="logo">
          <a href="/">
            <img
              src="https://png.pngtree.com/png-clipart/20221014/ourmid/pngtree-cartoon-cute-pet-animal-logo-png-image_6150426.png"
              alt="LOGO">
          </a>
        </div>
        <ul class="drop_down_menu">
          <li class="hideLi">
            <RouterLink to="/" class="hideLi_a">首頁</RouterLink>
            <ul class="hideUl unMember">
              <li><a href="#" target="_blank">動物認養</a>
              </li>
              <li><a href="https://livestock.kcg.gov.tw/ActivitiesListC003200.aspx" target="_blank">最新消息</a>
              </li>
              <li>
                <RouterLink to="/shop" class="link">線上商城</RouterLink>
              </li>
              <li><a href="#Jump1">教育課程</a>
              </li>
            </ul>
          </li>
          <li class="hideLi"><a class="hideLi_a" href="#">關於</a>
            <ul class="hideUl unMember">
              <li><a href="#">園區資訊</a>
              </li>
              <li><a href="#">聯絡我們</a>
              </li>
              <li><a href="#">常見問答</a>
              </li>
            </ul>
          </li>
          <li class="hideLi"><a class="hideLi_a" href="#">服務</a>
            <ul class="hideUl unMember">
              <li><a href="#">動物防疫</a>
              </li>
              <li><a href="#">拾獲救援</a>
              </li>
              <li><a href="#">登記絕育</a>
              </li>
              <li><a href="#">失蹤協尋</a>
              </li>
            </ul>
          </li>
          <li class="hideLi">
            <RouterLink to="/animalAllFiles" class="hideLi_a">動物</RouterLink>
            <ul class="hideUl" id="animalDrop"
              :class="{ memberIn: administrator === 'true', unMember: administrator === 'true' }">
              <li>
                <RouterLink to="/animalAdoptionReview">審查</RouterLink>
              </li>
              <li>
                <RouterLink to="/animalAdd">增加</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
        <div class="btn">
          <RouterLink v-if="isAdministrator" to="/product">
            <button type="button">商品總覽</button>
          </RouterLink>
          <RouterLink v-if="!isMember" to="/loginSignup/signup">
            <button type="button">註冊</button>
          </RouterLink>
          <RouterLink v-if="isMember && !isAdministrator" to="/memberInfo">
            <button type="button">會員中心</button>
          </RouterLink>
          <RouterLink v-if="!isMember" to="/loginSignup/login">
            <button type="button">登入</button>
          </RouterLink>
          <RouterLink v-if="isMember" @click="logOut()" to="/">
            <button type="button">登出</button>
          </RouterLink>
        </div>
        <p class="welcomeUser" v-if="userName && userName.length > 0 && isMember">您好, {{ userName }}</p>
      </div>
    </header>
  </body>
</template>


<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;


  img {
    margin: 10px 20px;
    width: 100px;
    height: 100px;
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #995a25;
    position: relative;


    .drop_down_menu {
      display: flex;
      justify-content: center;
      margin-left: auto;
    }

    .hideLi {
      margin: 0 50px;
      position: relative;

      &:hover .unMember {
        display: block;
        z-index: 1;
      }

      &:hover .hideLi_a {
        color: #edd76a;
        transition: all 0.5s ease 0s;
      }

      a {
        text-decoration: none;
        font-size: 36px;
        font-weight: bold;
        color: white;
      }
    }

    .hideUl {
      padding: 0 20px;
      width: 150px;
      text-align: center;
      border-radius: 1rem;
      line-height: 1.5;
      position: absolute;
      background-color: #edd76a;
      display: none;
      transition: all 0.2s ease-out;

      li {
        margin: 10px 0;

        a {
          color: #995a25;
        }
      }
    }

    .memberIn {
      display: none;
    }


  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;

  }

  button {
    width: 150px;
    height: 60px;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 2rem;
    box-shadow: 2px 2px 5px grey;
    margin: 0 15px 0 0;
    background-color: #edd76a;
    color: #995a25;
    scale: 0.8;

    &:hover {
      scale: 1;
    }
  }
}

.welcomeUser {
  position: absolute;
  color: white;
  top: 100px;
  right: 10px;
}
</style>
