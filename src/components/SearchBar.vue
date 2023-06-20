<!-- 搜尋欄 -->
<script>
export default {
    props: {
        //下拉式選單
        dropdownOptions: {
            type: Array,
            default: () => []
        },
        dropdownOptions2: {
            type: Array,
            default: () => []
        },
        searchKeyword: "",
        searchCate1: "",
        searchCate2: "",

    }, data() {
        return {
            searchInput: "", // 搜尋關鍵字
            category1: "",
            category2: ""    // 初始化選擇的值
        }
    }, methods: {
        search() {
            // console.log(this.searchInput);
            // console.log(this.category1);
            // console.log(this.category2);
            const searchData = {
                searchInput: this.searchInput,
                searchCate1: this.category1,
                searchCate2: this.category2
            }
            this.$emit("pushResult", searchData);
        }
    }
}
</script>
<template>
    <div class="search_bar">
        <input type="text" id="search_input" placeholder="請輸入關鍵字" v-model.trim.lazy="searchInput">
        <select name=" selector" id="search_selector" v-model="category1">
            <option v-for=" option  in  dropdownOptions " :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <select name="selecto2" id="search_selector2" v-model="category2">
            <option v-for=" option  in  dropdownOptions2 " :value="option.value">
                {{ option.label }}
            </option>
        </select>
        <button id="search_btn" type="button" @click="search">搜尋 🔍</button>

    </div>
</template>

<style lang="scss" scoped>
.search_bar {
    width: 90%;
    display: flex;
    padding-top: 20px;
    margin: auto;

    #search_input {
        width: 75%;
        height: 24px;
        padding: 10px;
        margin: 10px;
        font-size: 18px;
        border-radius: 10px;
    }

    #search_selector,
    #search_selector2 {
        height: 48px;
        width: 100px;
        margin: 10px;
        font-size: 18px;
        border-radius: 10px;
        text-align: center;
    }

    #search_btn {
        height: 48px;
        width: 100px;
        margin: 10px;
        border-radius: 10px;
        font-size: 18px;
        border: none;
        background-color: #edd76a;

        &:hover {
            scale: 1.01;
            color: black;
            background-color: #ffe76c;
        }
    }
}
</style>