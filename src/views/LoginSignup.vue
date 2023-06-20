<script>
// import { RouterLink, RouterView } from "vue-router";
import store from "../stores/store.js"

export default {
    components: {
    },
    data() {
        return {
            currentRoute: this.$route.path
        }
    },
    mounted() {
        store().hideHeaderFooter()
    },
    beforeUnmount() {
        store().showHeaderFooter()
    }
}
</script>

<template>
<div class="member-body">
    <!-- <p>現在的路由: {{ this.$route.path }}</p> -->
    <div class="member-page">
        <div class="member-wrap">
            <div class="title-wrap">
                <div class="title-box" :class="{'login-box': currentRoute === '/loginSignup/login'}">
                    <p><RouterLink to="/loginSignup/login" class="router-link">登入</RouterLink></p>
                </div>
                <div class="title-box" :class="{'signup-box': currentRoute === '/loginSignup/signup'}">
                    <p><RouterLink to="/loginSignup/signup" class="router-link">註冊</RouterLink></p>
                </div>
            </div>
            <RouterView />
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.member-body {
    .member-page {
        .member-wrap {
            width: 480px;
            margin: 40px auto 0;
            border-radius: .5rem;
            overflow: hidden;
            box-shadow: 1px 1px 3px #665e54;
            .title-wrap {
                display: flex;
                justify-content: center;
                padding-top: 20px;
                background-color: #995a25;
                .title-box {
                    margin: 0 10px;
                    border-radius: .5rem .5rem 0 0;
                    text-align: center;
                    font-weight: 700;
                    cursor: pointer;
                    transition: .3s;

                    p {
                        a {
                            display: block;
                            padding: 20px 30px 15px;
                            color: #fff;
                        }
                    }
                }
                .login-box,
                .signup-box {
                background-color: #fff;
                    p {
                        a {
                            color: #665e54;
                        }
                    }
                }
            }            
        }
    }
}
</style>