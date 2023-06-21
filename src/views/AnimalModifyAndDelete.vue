<script>
import axios from "axios";

export default {
  data() {
    return {
      photos: [],
      animalInfo: {},
      taiwanCities: [
        "基隆市",
        "臺北市",
        "新北市",
        "桃園市",
        "新竹市",
        "新竹縣",
        "苗栗縣",
        "臺中市",
        "彰化縣",
        "南投縣",
        "雲林縣",
        "嘉義市",
        "嘉義縣",
        "臺南市",
        "高雄市",
        "屏東縣",
        "臺東縣",
        "花蓮縣",
        "金門縣",
        "澎湖縣",
        "連江縣",
        "宜蘭縣"
      ],
      // TODO
      filesPic: +sessionStorage.getItem("filesPic"),
      base64Body: []
    };
  },
  mounted() {
    this.getAnimalInfo(this.filesPic);
    this.countImg();
  },
  methods: {
    // 獲取動物資料
    getAnimalInfo(filesPic) {
      return axios.post("http://localhost:8080/findByAnimalId", {animalId: filesPic})
          .then((res) => {
            this.animalInfo = res.data.animal;
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
          otherPicElement.remove("otherPic");
          otherPicElement.classList.add("firstPic");
          imgBlock.insertBefore(otherPicElement, imgBlock.firstChild);
        }
      }
    },

    // 回上一頁
    goBack() {
      this.$router.go(-1);
    },

    // 更新動物資料
    updateAnimal() {
      const {
        animalId,
        animalName,
        sex,
        species,
        type,
        regDate,
        regCity
      } = this.animalInfo;

      const body = {
        animalList: [
          {
            "animalId": animalId,
            "animalName": animalName,
            "sex": +sex,
            "species": +species,
            "type": type,
            "regDate": regDate,
            "regCity": regCity
          }
        ]
      };
      return axios.post("http://localhost:8080/animalModify", body).then(async () => {
        await this.sendPhoto(this.base64Body);
        alert("更新成功")
        location.reload()
      })
    },

    // 刪除動物
    deleteAnimal() {
      const body = {
        animalId: this.filesPic,
      };
      return axios.post("http://localhost:8080/deleteById", body).then(() => {
        alert("刪除成功")
        this.goBack();
      })

    },

    // 保存上傳照片資料
    uploadPhoto(element) {
      const img = element.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      const vm = this;
      reader.onload = function (e) {
        const imgDataUrl = e.target.result;
        const base64 = {
          imgBase64: imgDataUrl.split(",")[1],
          sort: "a",
          id: vm.filesPic,
        };
        vm.base64Body.push(base64);
      };
    },

    // 送出照片資料至後端
    sendPhoto(photos) {
      for (const e of photos) {
        axios.post("http://localhost:8080/upLordImg", e).then(() => console.log("照片送出成功"))
      }
    }
  }
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
      <input type="file" class="upload" @change="uploadPhoto">
    </div>

    <div class="modifyText">
      <ul class="modifyTextUl">
        <li>
          <label>
            編號
            <input type="text" class="animalId" disabled="disabled" v-model="animalInfo.animalId">
          </label>
        </li>
        <li>
          <label>
            動物名稱
            <input type="text" class="animalName" v-model="animalInfo.animalName">
          </label>
        </li>

        <li>
          <label>
            公
            <input type="radio" name="sex" value="0" class="male" v-model="animalInfo.sex" :checked="+animalInfo.sex === 0">
          </label>
          <label>
            母
            <input type="radio" name="sex" value="1" class="female" v-model="animalInfo.sex" :checked="+animalInfo.sex === 1">
          </label>
        </li>

        <li>
          <label>
            貓
            <input type="radio" name="species" value="0" class="cat" v-model="animalInfo.species" :checked="+animalInfo.species === 0">
          </label>
          <label>
            狗
            <input type="radio" name="species" value="1" class="dog" v-model="animalInfo.species" :checked="+animalInfo.species === 1">
          </label>
        </li>

        <li>
          <label>
            品種
            <input type="text" class="type" v-model="animalInfo.type">
          </label>
        </li>
        <li>
          <label>
            登記日期
            <input type="date" class="regDate" v-model="animalInfo.regDate">
          </label>
        </li>
        <li>
          <label>
            登記城市
            <select name="regCity" id="regCity" v-model="animalInfo.regCity">
              <option v-for="city in taiwanCities" :value="city" :key="city">{{ city }}</option>
            </select>
          </label>
        </li>
      </ul>
      <div class="modifyBtn">
        <button type="button" class="delete" @click="deleteAnimal">刪除</button>
        <a href="#">
          <button type="button" class="quit" @click="goBack">放棄更新</button>
        </a>
        <button type="button" class="update" @click="updateAnimal">更新</button>
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

    input[type="date"] {
      font-size: 20px;
    }


    li {
      text-align: center;
      font-weight: bold;
    }
  }

  label {
    font-size: 24px;
  }

  .modifyBtn {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    .delete,
    .quit,
   .update {

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

//radio樣式
.male,
.female,
.cat,
.dog {
  cursor: pointer;
  width: 16px;
  height: 16px;
  position: relative;
  border: none;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    position: absolute;
  }

  &:checked::after {
    content: '';
    background-color: #8C5E58;
    width: 16px;
    height: 16px;
    top: -2px;
    left: -2px;
    border: 4px double #fff;
    border-radius: 50%;
    position: absolute;
  }
}

option {
  font-size: 26px;
}

img {
  width: 100px;
  height: 100px;
}
</style>

