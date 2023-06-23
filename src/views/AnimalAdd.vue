<script>
import axios from 'axios';

export default {
  data() {
    return {
      newAnimalId: null,
      regDate: null,
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
      animalName: null,
      sex: null,
      species: null,
      type: null,
      regCity: null,
      photos: [],
      base64Body: []
    }
  },
  methods: {
    // 清空表單
    reset() {
      this.animalName = "";
      this.type = "";
      this.setDate();
      this.sex = 0;
      this.species = 0;
    },

    // 獲得最後一隻動物Id
    getLastAnimalId() {
      return axios.get("http://localhost:8080/findLastId").then((animalRes) => {
        this.newAnimalId = animalRes.data.animalId
      })
    },

    // 自動選擇當天日期
    setDate() {
      const today = new Date();
      this.regDate = today.toISOString().split('T')[0];
    },

    // 登錄寵物資訊
    submit() {
      const body = {
        "animalList": [
          {
            "animalName": this.animalName,
            "sex": +this.sex,
            "species": +this.species,
            "type": this.type,
            "regDate": this.regDate,
            "regCity": this.regCity,
          }
        ]
      };
      return axios.post("http://localhost:8080/animalAdd", body).then(async (res) => {
        await this.sendPhoto(this.base64Body);
        alert(res.data.message);
        if (res.data.message==="新增資訊成功"){
          this.$router.push("/animalAllFiles");
        }
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
    },

    // 保存上傳照片資料
    uploadPhoto(element) {
      const img = element.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      const vm = this;
      reader.onload = function (e) {
        const imgDataUrl = e.target.result;
        console.log(imgDataUrl);
        vm.photos.push(imgDataUrl);
        const base64 = {
          imgBase64: imgDataUrl.split(",")[1],
          sort: "a",
          id: vm.newAnimalId,
        };
        vm.base64Body.push(base64);
      };
    },

    // 送出照片資料至後端
    sendPhoto(photos) {
      let delay = 0; // 初始延迟时间
      for (const e of photos) {
        setTimeout(() => {
          axios.post("http://localhost:8080/upLordImg", e)
              .then(() => console.log("照片送出成功"));
        }, delay);
        delay += 3; // 增加延迟时间
      }
    }
  },
  mounted() {
    this.getLastAnimalId();
    this.setDate();
  }
}

</script>

<template>
  <div class="animalAdd">
    <div class="imgBlock" @click="moveImage">
      <div class="firstPic" v-if="photos.length > 0">
        <img :src="photos[0]" alt="pet">
      </div>
      <div class="modifyMinPic">
        <template v-for="(url, index) in photos" :key="index">
          <div class="otherPic" v-if="index > 0">
            <img :src="url" alt="">
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
            <input type="text" class="animalId" disabled="disabled" v-model="newAnimalId">
          </label>
        </li>

        <li>
          <label>
            名稱
            <input type="text" class="animalName" v-model="animalName">
          </label>
        </li>

        <li>
          <label>
            公
            <input type="radio" name="sex" value="0" checked="checked" class="male" v-model="sex">
          </label>
          <label>
            母
            <input type="radio" name="sex" value="1" class="female" v-model="sex">
          </label>
        </li>
        <li>
          <label>
            貓
            <input type="radio" name="species" value="0" checked="checked" class="cat" v-model="species">
          </label>
          <label>
            狗
            <input type="radio" name="species" value="1" class="dog" v-model="species">
          </label>
        </li>
        <li>
          <label>
            品種
            <input type="text" class="type" v-model="type">
          </label>
        </li>
        <li>
          <label>
            登記日期
            <input type="date" class="regDate" v-model="regDate" :min="regDate" disabled>
          </label>
        </li>
        <li>
          <label>
            登記城市
            <select name="regCity" id="regCity" v-model="regCity">
              <option v-for="city in taiwanCities" :value="city" :key="city">{{ city }}</option>
            </select>
          </label>
        </li>
      </ul>
      <div class="modifyBtn">
        <button type="button" class="reset" @click="reset">清除</button>
        <button type="button" class="submit" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.animalAdd {
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
      margin-left: 10px;
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

    .reset,
    .submit {

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
</style>
