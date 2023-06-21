<script>
import axios from 'axios';

export default {
  data() {
    return {
      animalInfo: {},
      photos: [],
      // TODO
      memberId: sessionStorage.getItem("member_id"),
      isSubmitted: true,
      // TODO
      filesPic : +sessionStorage.getItem("filesPic")
    };
  },
  methods: {
    // 領養申請
    applyAdoption() {
      const body = {
        member_id: this.memberId,
        animal: this.animalInfo
      };
      this.isSubmitted = false;
      axios.post("http://localhost:8080/adoption", body)
        .then((response) => {
          alert(response.data.message);
        })
    },

    // 獲取動物資料
    getAnimalInfo(filesPic) {
      return axios.post("http://localhost:8080/findByAnimalId", { "animalId": filesPic })
        .then((res) => {
          const animal = res.data.animal;
          this.animalInfo = {
            animalId: animal.animalId,
            animalName: animal.animalName,
            sex: +animal.sex,
            species: +animal.species,
            type: animal.type,
            regDate: animal.regDate,
            regCity: animal.regCity
          };
        })
    },

    // 計算照片數量，以決定v-for次數並渲染照片
    countImg() {
      return axios.post("http://localhost:8080/countImg", { "sort": "a", "id": this.filesPic })
        .then((res) => {
          const numberOfPhotos = res.data.count;
          const photoUrls = [];

          for (let i = 1; i <= numberOfPhotos; i++) {
            const url = `img/animal/${this.filesPic}-${i}.png`;
            photoUrls.push({ id: i, url: url });
          }

          this.photos = photoUrls;
        })
    },

    // 圖片輪播
    moveImage(element) {
      if (element.target.tagName === 'IMG') {
        if (!element.target.parentNode.classList.contains('firstPic')) {
          const imgBlock = document.querySelector('.imgBlock');
          const firstPicElement = imgBlock.querySelector('.firstPic');
          const modifyMinPic = imgBlock.querySelector('.modifyMinPic');

          firstPicElement.classList.remove("firstPic");
          firstPicElement.classList.add("otherPic");
          modifyMinPic.appendChild(firstPicElement);

          const otherPicElement = element.target.parentNode;
          otherPicElement.classList.remove("otherPic");
          otherPicElement.classList.add("firstPic");
          imgBlock.insertBefore(otherPicElement, imgBlock.firstChild);
        }
      }
    }
  },
  mounted() {
    this.getAnimalInfo(this.filesPic);
    this.countImg();

  },

};
</script>

<template>
  <div class="animal_adoption">
    <div class="imgBlock" @click="moveImage">
      <div class="firstPic" v-if="photos.length > 0">
        <img :src="photos[0].url" alt="pet">
      </div>
      <div class="modifyMinPic">
        <template v-for="(photo, index) in photos" :key="photo">
          <div class="otherPic" v-if="index > 0">
            <img :src="photo.url" alt="">
          </div>
        </template>
      </div>
    </div>


    <div class="modifyText">
      <ul class="modifyTextUl">
        <li>
          編號:
          <span class="animalId">{{ animalInfo.animalId }}</span>
        </li>
        <li>
          動物名稱:
          <span class="animalName">{{ animalInfo.animalName }}</span>
        </li>
        <li>
          性別:
          <span class="sex">{{ animalInfo.sex === 0 ? '公' : '母' }}</span>
        </li>
        <li>
          物種:
          <span class="species">{{ animalInfo.species === 0 ? '貓' : '狗' }}</span>
        </li>
        <li>
          品種:
          <span class="type">{{ animalInfo.type }}</span>
        </li>
        <li>
          登記日期:
          <span class="regDate">{{ animalInfo.regDate }}</span>
        </li>
        <li>
          登記城市:
          <span class="regCity">{{ animalInfo.regCity }}</span>
        </li>
      </ul>
      <div class="modifyBtn">
        <button type="button" :class="{ adoption: isSubmitted, beforeAdoption: !isSubmitted }" @click="applyAdoption"
          :disabled="!isSubmitted">
          {{ isSubmitted ? "申請領養" : "已送出" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animal_adoption {
  display: flex;
  justify-content: center;
  margin: 50px 0;
}

.imgBlock {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1rem double #8C5E58;
  margin-right: 50px;
  padding: 50px;

  .upload {
    position: absolute;
    left: 150px;
    top: 20px;

  }

  .modifyMinPic {
    display: flex;

  }

  .firstPic {
    img {
      width: 350px;
      height: 350px;
    }
  }

  .otherPic {
    img {
      width: 50px;
      height: 50px;
    }
  }
}

.modifyText {
  width: 500px;
  height: 500px;

  .modifyTextUl {
    text-align: start;
    line-height: 2.5;
    margin: 2rem 1.5rem;
    font-size: 20px;
    border: 2px solid black;
    background-color: white;

    li {
      text-align: center;
      font-weight: bold;
    }
  }

  .modifyBtn {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    .adoption {
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
      margin: 0 15px;
      background-color: #edd76a;
      color: #995a25;
      scale: 0.8;

      &:hover {
        scale: 1;
      }
    }


  }
}


.adoptionImg {
  width: inherit;
  height: inherit;
}

.beforeAdoption {
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
  margin: 0 15px;
  // transition: ease 0.1s;
  background-color: #818181;
  cursor: not-allowed;
}

img {
  width: 100px;
  height: 100px;
}
</style>