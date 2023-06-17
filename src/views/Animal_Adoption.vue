<script>
import axios from 'axios';

export default {
  data() {
    return {
      animalInfo: {},
      photos: [],
      // TODO
      // memberId: sessionStorage.getItem("member_id")
      memberId: "A123467888",
      isSubmitted: true,
    };
  },
  mounted() {
    //TODO
    // const filesPic = +sessionStorage.getItem("filesPic");
    const filesPic = 1;

    // 獲取動物資料
    axios.post("http://localhost:8080/findByAnimalId", {"animalId": filesPic})
        .then((res) => {
          const animal = res.data.animal;
          this.animalInfo = {
            animalId: animal.animalId,
            animalName: animal.animalName,
            sex: animal.sex,
            species: +animal.species,
            type: animal.type,
            regDate: animal.regDate,
            regCity: animal.regCity
          };
        })

    // 計算照片數量，以決定v-for次數
    axios.post("http://localhost:8080/countImg", {"sort": "a", "id": filesPic})
        .then((res) => {
          const numberOfPhotos = res.data.count;
          const photoUrls = [];

          for (let i = 1; i <= numberOfPhotos; i++) {
            const url = `img/animal/${filesPic}-${i}.png`;
            photoUrls.push({id: i, url: url});
          }

          this.photos = photoUrls;
        })
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
    }
  }
};
</script>

<template>
  <div class="animal_adoption">
    <div class="imgBlock">
      <div class="modifyMinPic">
        <div v-for="photo in photos" :key="photo.id" class="firstPic">
          <img :src="photo.url" alt="pet"/>
        </div>
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
</style>