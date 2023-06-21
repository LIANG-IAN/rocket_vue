<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputAnimalId: null,
      inputMemberId: null,
      animalInfo: {},
      memberInfo: {}
    }
  },
  methods: {
    // 獲得動物資料
    getAnimalInfo() {
      return axios.post("http://localhost:8080/findByAnimalId", { "animalId": +this.inputAnimalId }).then(animalRes => {
        const animal = animalRes.data.animal;
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

    // 獲得會員資料
    getMemberInfo() {
      return axios.post("http://localhost:8080/get_member_info", { "member_id": this.inputMemberId }).then(memberRes => {
        this.memberInfo = memberRes.data.member;
      })
    },

    // 通過
    pass() {
      return axios.post("http://localhost:8080/eligibility_review", {
        "animal": this.animalInfo,
        "member": this.memberInfo
      }).then(res => { alert(res.data.message) })
    }
  }

}
</script>

<template>
  <div class="animalAdoptionReview">
    <div class="reviewBox">
      <div class="reviewAnimal">
        <div class="searchBlock">
          <label>動物ID
            <input type="text" class="reviewAnimalId" v-model="inputAnimalId">
          </label>
          <button class="reviewAnimalBtn" @click="getAnimalInfo">搜尋</button>
        </div>
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
            <span class="sex">{{ animalInfo.sex === 0 ? '公' : (animalInfo.sex === 1 ? '母' : '') }}</span>
          </li>
          <li>
            物種:
            <span class="species">{{ animalInfo.species === 0 ? '貓' : (animalInfo.species === 1 ? '狗' : '') }}</span>
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
      </div>
      <div class="reviewPerson">
        <div class="searchBlock">
          <label>會員ID
            <input type="text" class="reviewMemberId" v-model="inputMemberId">
          </label>
          <button class="reviewMemberBtn" @click="getMemberInfo">搜尋</button>
        </div>
        <ul class="personTextUl">
          <li>
            ID:
            <span class="memberId">{{ memberInfo.memberId }}</span>
          </li>
          <li>
            姓名:
            <span class="memberName">{{ memberInfo.memberName }}</span>
          </li>
          <li>
            電話:
            <span class="phone">{{ memberInfo.phone }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="reviewBtn">
      <button type="button" class="reject"><a href="mailto:?subject=審查結果&body=經過考慮決定忍痛拒絕您認養申請">不通過</a></button>
      <button type="button" class="reviewPass" @click="pass">通過</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.reviewBox,
.reviewBtn {
  display: flex;
  justify-content: center;
}

.reviewAnimal,
.reviewPerson {
  width: 500px;
  height: 500px;
  margin-top: 100px;

  .searchBlock {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      width: 80px;
      height: 50px;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 10px;
      box-shadow: 2px 2px 5px grey;
      margin: 0 15px 0 0;
      background-color: #edd76a;
      color: #995a25;
      scale: 0.8;

      &:hover {
        scale: 1;
      }

      &:active {
        transition: 0.3s;
        scale: 0.9;
      }
    }
  }

  .modifyTextUl,
  .personTextUl {
    text-align: start;
    line-height: 2.5;
    margin: 2.5rem 1rem;
    font-size: 20px;
    border: 2px solid #8C5E58;
    background-color: white;
    color: #8C5E58;
    border-radius: 2rem 0.5rem;

    li {
      text-align: center;
      font-weight: bold;
    }
  }
}

.reviewBtn {
  .reject,
  .reviewPass {
    width: 130px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin:0 20px 50px 20px;
    padding: 1rem 2rem;
    color: white;
    border-radius: 1.5rem;
    transition: ease 0.1s;
    border: none;
    box-shadow: 2px 2px 5px gray;
    background-color: #995a25;

    a {
      color: white;
    }

    &:hover {
      background-color: gray;
    }
  }
}
</style>