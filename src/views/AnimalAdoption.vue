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
      return axios.post("http://localhost:8080/findByAnimalId", {"animalId": filesPic})
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
      return axios.post("http://localhost:8080/countImg", {"sort": "a", "id": this.filesPic})
          .then((res) => {
            const numberOfPhotos = res.data.count;
            const photoUrls = [];

            for (let i = 1; i <= numberOfPhotos; i++) {
              const url = `img/animal/${this.filesPic}-${i}.png`;
              photoUrls.push({id: i, url: url});
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
        <button type="button" :class="{adoption:isSubmitted,beforeAdoption:!isSubmitted}"
                @click="applyAdoption" :disabled="!isSubmitted">
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

.adoptionImg {
  width: inherit;
  height: inherit;
}

.adoption {
  text-align: center;
  font-size: 18px;
  margin: 1.5rem auto;
  padding: 1rem 0.5rem;
  color: white;
  border-radius: 0.5rem;
  transition: ease 0.1s;
  border: none;
  box-shadow: 2px 2px 2px gray;
  background-color: #FF7E6B;

  &:hover {
    background-color: #FFA69E;
  }
}

.beforeAdoption {
  text-align: center;
  font-size: 18px;
  margin: 1.5rem auto;
  padding: 1rem 0.5rem;
  color: white;
  border-radius: 0.5rem;
  transition: ease 0.1s;
  border: none;
  background-color: #818181;
  cursor: not-allowed;
}

img{
  width: 100px;
  height: 100px;
}
</style>