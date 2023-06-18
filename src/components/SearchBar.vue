<!-- 搜尋欄 -->
<script>
import Button from "./Button.Vue"
export default {
    data() {
        return {

        }
    },
    components: {
        Button
    }
}
</script>
<template>
    <div class="search_bar">
        <input type="text" id="search_input" placeholder="請輸入關鍵字">
        <Button />
    </div>
</template>

<style lang="scss" scoped>
.search_bar {
    width: 90%;
    height: 24px;

    #search_input {
        width: 85%;
        height: 24px;
        padding: 10px;
        margin: 10px;
        font-size: 18px;
        border-radius: 10px;
    }
}
</style>