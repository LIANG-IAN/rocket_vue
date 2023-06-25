<script>
import axios from 'axios';

export default {
  data() {
    return {
      allAnimalResponse: null,
      //TODO
      member_id: sessionStorage.getItem("member_id"),
      page:1,
      pageTotal:1,
    }
  },
  methods: {
    // 獲得所有動物資訊
    getAllAnimalData() {
      return axios.get("http://localhost:8080/findAll")
        .then(res => {
          this.allAnimalResponse = res.data.animalList;
          
          // 計算頁數
          const dataTotal = this.allAnimalResponse.length;
          const perPage = 10;
          this.pageTotal = Math.ceil(dataTotal / perPage);
        });
    },

    // 收藏或解除收藏
    toggleFavoriteStatus(event) {
      const target = event.target;
      if (target.classList.contains("like")) {
        const clicks = parseInt(target.getAttribute("data-clicks"));
        const animalId = +target.getAttribute("data-item");
        const body = {
          "member_id": this.member_id,
          "animal_id": animalId
        };
        if (clicks === 0) {
          target.classList.add("liked");
          target.setAttribute("data-clicks", clicks + 1);
          return axios.post("http://localhost:8080/add_favorite", body)
            .then((res) => console.log(res.data.message))
        }
        else {
          target.classList.remove("liked");
          target.setAttribute("data-clicks", clicks - 1);
          return axios.post("http://localhost:8080/delete_favorite", body)
            .then((res) => console.log(res.data.message))
        }
      }
    },

    // 畫面載入時渲染已收藏動物♥
    renderFavoriteAnimals() {
      return axios.post("http://localhost:8080/get_member_info", { "member_id": this.member_id })
        .then((res) => {
          // .split(",") 依據逗號回傳陣列字串
          const fav = res.data.member.fav.split(",");
          // 獲得所有♥DOM
          const likeElements = document.querySelectorAll(".like");
          likeElements.forEach((element) => {
            const animalId = element.getAttribute("data-item");
            if (fav.includes(animalId)) {
              element.classList.add("liked");
              element.setAttribute("data-clicks", "1");
            }
          });
        });
    },

    // 獲取分類的動物資訊
    getAllAnimalDataSort(specie) {
      return axios.post("http://localhost:8080/findBySpecies", { "species": specie })
        .then((res) => {
          this.allAnimalResponse = res.data.animalList;
        });
    },

    // 判斷點擊全部、貓、狗
    judgeClickAnimalSort(element) {
      this.page =1;
      const target = element.target;
      if (target.classList.contains('filesBtnAll')) {
        this.getAllAnimalData();
      }
      if (target.classList.contains('filesBtnDog')) {
        this.getAllAnimalDataSort(true);
      }
      if (target.classList.contains('filesBtnCat')) {
        this.getAllAnimalDataSort(false);
      }
    },

    // 判斷點擊者身分，決定跳轉頁面
    determineIdentityDecideJumpPage(element) {
      let filesPic = element.target.getAttribute("data-filesPic");
      sessionStorage.setItem("filesPic", filesPic);
      if (element.target.classList.contains("filesPic")) {
        if (!element.target.classList.contains("like")) {
          if (sessionStorage.getItem("administrator") === "true") {
            this.$router.push("/AnimalModifyAndDelete");
          }

          else {
            this.$router.push("/AnimalAdoption");
          }
        }
      }
    },

    // 分頁功能
    paging(element) {
      this.page = element.target.innerText;
    }

  },
  mounted() {
    this.getAllAnimalData();
  },
  watch: {
    allAnimalResponse() {
      this.renderFavoriteAnimals();
      
      // 計算頁數
      const dataTotal = this.allAnimalResponse.length;
      const perPage = 10;
      this.pageTotal = Math.ceil(dataTotal / perPage);
    }
  }
}
</script>


<template>
  <div class="animalAllFiles">
    <div class="filesTitle">
      <h2 class="filesTitleH2">待認養犬貓照片檢索</h2>
      <div class="filesTitleBtn" @click="judgeClickAnimalSort">
        <button type="button" class="filesBtnAll">全部</button>
        <button type="button" class="filesBtnDog">犬</button>
        <button type="button" class="filesBtnCat">貓</button>
      </div>
      <!-- 頁數小按鈕 -->
      <div class="filesTitleMinBtn" @click="paging">
        <button type="button" class="MinPage" v-for="i in pageTotal">{{i}}</button>
      </div>
    </div>

    <div class="filesBanner" @click="determineIdentityDecideJumpPage">
      <div class="filesPic" v-for="(animal, index) in allAnimalResponse && allAnimalResponse.slice(page * 9 - 9, page * 9)"
        :key="index" :style="{ backgroundImage: `url('img/animal/${animal.animalId}-1.png')` }"
        :data-filesPic="animal.animalId">
        <div class="filesText">
          <ul>編號:</ul>
          <ul>{{ animal.animalId }}</ul>
          <p class="like" data-clicks="0" :data-item="animal.animalId" @click="toggleFavoriteStatus">♥</p>
        </div>
      </div>
    </div>

    <!-- 頁數小按鈕 -->
    <div class="filesTitleMinBtn" @click="paging">
      <button type="button" class="MinPage" v-for="i in pageTotal">{{i}}</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filesTitle {
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .filesTitleH2 {
    font-size: 24px;
    font-weight: bolder;
    margin: 20px;
    text-shadow: 1px 1px 1px #8C5E58;
  }

  .filesTitleBtn {
    display: flex;
    justify-content: space-around;

    button {
      width: 100px;
      height: 50px;
      font-size: 28px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 2rem;
      box-shadow: 2px 2px 5px grey;
      margin: 0 15px 0 0;
      background-color: white;
      
      scale: 0.8;

      &:hover {
        scale: 1;
      }
    }
  }
}

.filesTitleMinBtn {
  display: flex;
  margin: 20px 0;
  justify-content: center;

  .MinPage {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    background-color: rgb(0, 0, 0);
    border-radius: 50%;
    color: #ffffff;

    &:hover {
      background-color: #8C5E58;
    }
  }
}

.filesBanner {
  margin: 50px 100px;
  display: flex;
  max-width: 1920px;
  flex-wrap: wrap;
  cursor: pointer;

  .filesText {

    p {
      font-size: 25px;
      cursor: pointer;
    }
  }
}

.filesPic {
  width: 400px;
  height: 400px;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid gray;
  margin: 20px auto;
  scale: 1;

  &:hover {
    scale: 1.2;
  }
}

.filesText {
  width: 400px;
  height: 50px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 1px gray;

  ul {
    font-size: 24px;
    font-weight: bold;
  }
}

.like {
  font-size: 25px;
  -webkit-text-stroke: 1px black;
  text-stroke: 1px white;
  color: transparent;
}

.liked {
  color: red;
}
</style>