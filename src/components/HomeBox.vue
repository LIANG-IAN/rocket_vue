<script>
//回頂部小按鈕
// 捲軸偵測距離頂部超過 150 才顯示按鈕
export default {
    data() {
        return {
            showButton: false
        };
    },
    mounted() {
        window.addEventListener('scroll', this.scroll);
    },
    methods: {
        scroll() {
            if (window.scrollY > 150) {
                this.showButton = true;
            } else {
                this.showButton = false;
            }
        },
        scrollToTop() {
            document.documentElement.scrollTop=0
        }
    },
};
</script>

<template>
    <div class="homeBox" v-show="showButton" @click="scrollToTop">Top
    </div>
</template>

<style lang="scss" scoped>
.homeBox {
    width: 80px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    box-shadow: 2px 2px 2px gray;
    background-color: #edd76a;
    opacity: 0.5;
    cursor: pointer;
    z-index: 1;

    font-size: 36px;
    color: #995a25;
    

    &:hover {
        opacity: 1;
        font-weight: bold;
        border-radius: 50%;

    }
}
</style>