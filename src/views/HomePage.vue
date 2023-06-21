<script>

import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';




//教育頁面的tab切換
export default {
    data() {
        return {
            tabs: [
                {
                    title: "高雄市壽山 動物保護教育園區",
                    isActive: true,
                    contents: [
                        "地址:(804005)高雄市鼓山區萬壽路350號",
                        "開放時間:星期二至星期日",
                        "上午09：30-12：00 下午13：30-17：00",
                        "休假:週一及國定假日休園",
                        "電話:(07)5519059",
                    ],
                },
                {
                    title: "高雄市燕巢 動物保護關愛園區",
                    isActive: false,
                    contents: [
                        "地址:(824004)高雄市燕巢區師大路98號",
                        "開放時間:星期二至星期六",
                        "上午09：30-12：00 下午13：30-17：00",
                        "休假:週一、週日及國定假日休園",
                        "電話:(07)6051002",
                    ],
                },
            ],
        };
    },
    methods: {
        activateTab(index) {
            for (let i = 0; i < this.tabs.length; i++) {
                this.tabs[i].isActive = false;
            }
            this.tabs[index].isActive = true;
        },
    },
    //swiper
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        let coverflowEffect = {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        };
        let coverflowEffect1 = {
            rotate: 0,
            stretch: 150,
            depth: 500,
            modifier: 1,
            slideShadows: false,
        };
        return {
            modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
            coverflowEffect,
            coverflowEffect1
        };
    },
};

</script>

<template>
    <br>
    <div class="banner">
        <div class="text">
            <h2 class="textTitle">等你給他們一個家</h2>
            <div class="pArea">
                <p class="pAreaText">「每一隻能回家的流浪動物背後，都有一個不肯放棄的中途」想幫助流浪動物的你，請彎下腰一起做，做自己作得到的事，合起來的力量才大！</p>
            </div>
            <div class="meetbtn">
                <button type="button">認識我們</button>
            </div>
        </div>
        <div class="pic"></div>
    </div>

    <br>

    <!-- 商品輪播牆 -->
    <div class="productWall">
        <div class="swiper mySwiper pruductBackGround">
            <div class="swiper-wrapper pruductGroup">
                <swiper :modules="modules" :slides-per-view="3" loop :space-between="0" navigation
                    :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange"
                    :autoplay="{ delay: 3000 }" :centeredSlides="true" :effect="'coverflow'"
                    :coverflow-effect="coverflowEffect">
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_1.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_2.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_3.jpg" alt="">
                    </swiper-slide>

                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_4.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_5.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_6.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_7.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_8.jpg" alt="">
                    </swiper-slide>
                    <swiper-slide class="pruductSlide">
                        <h2 class="saleWord">
                            限時特價中!!
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" beat style="color: #000000;" />
                        </h2>
                        <img src="../../public/img/productWall_img/pruductWall_9.jpg" alt="">
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>

    <hr class="hrStyle">

    <!-- 待領養動物輪播牆 -->
    <div class="animalWall">
        <div class="swiper mySwiper animalBackGround">
            <div class="swiper-wrapper animalGroup">
                <swiper :modules="modules" :slides-per-view="3" loop :space-between="0" navigation @swiper="onSwiper"
                    @slideChange="onSlideChange" :autoplay="{ delay: 3000 }" :centeredSlides="true" :effect="'coverflow'"
                    :coverflow-effect="coverflowEffect1">
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic1"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    小白狗勾
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic2"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    小胖貓
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic3"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    小吉喵喵
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic4"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    長頸鹿
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic5"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    吉娃娃
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic6"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    小普羅
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="animalSlide">
                        <div class="animalCard">
                            <div class="animalCardImg aniPic7"></div>
                            <div class="animalCardText">
                                <p class="aniP">
                                    <font-awesome-icon :icon="['fas', 'paw']" fade style="color: #995a25;" />
                                    喵喵
                                </p>
                                <button type="button" class="aniBtn">點我</button>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>

    <br>
    <hr class="hrStyle">

    <div class="teachInfo">
        <div class="teachInfoImgBot">
            <div class="infoImgBot1"></div>
            <div class="infoImgBot2"></div>
            <div class="drop-shadow">
                <div class="infoImgBot3"></div>
            </div>

        </div>
        <div class="teachInfoTextBot">
            <h2 class="infoTextTitle"> <a name="Jump1" id="Jump1"></a>教育與關愛EDUCATION & LOVE</h2>
            <div class="infoTextOutside">
                <ul class="infoTextUl">
                    <li v-for="(tab, index) in tabs" :key="index" class="infoTextHideLi" :class="{ active: tab.isActive }"
                        @mouseenter="activateTab(index)">
                        {{ tab.title }}
                    </li>
                </ul>

                <div class="infoTextInside">
                    <ul v-for="(tab, index) in tabs" :key="index" class="infoTextHideUl" :class="{ active: tab.isActive }">
                        <li v-for="(content, contentIndex) in tab.contents" :key="contentIndex">
                            {{ content }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <br>
    <h2 class="animalNews">最新消息</h2>

    <div class="newsBoxOutside">
        <div class="newsBox">
            <a href="https://livestock.kcg.gov.tw/ActivitiesDetailC003200.aspx?Cond=53c0f801-4502-4954-8c11-198e5aa7f596"
                target="_blank">
                <img class="newsPic" src="../../public/img/animalNews_Img/newsPic1.jpg" alt="狂犬病">
            </a>
            <p class="newsP">
                112年6月高雄市狂犬病高風險地區犬、貓狂犬病疫苗注射暨寵物植入晶片登記及絕育宣導巡迴活動
            </p>
            <a href="https://livestock.kcg.gov.tw/ActivitiesDetailC003200.aspx?Cond=53c0f801-4502-4954-8c11-198e5aa7f596"
                target="_blank">
                <button type="button" class="newsTextBtn">More</button>
            </a>
        </div>
        <div class="newsBox">
            <a href="https://livestock.kcg.gov.tw/ActivitiesDetailC003300.aspx?Cond=50f0666e-46a5-46f7-85d3-533911e874ad"
                target="_blank">
                <img class="newsPic" src="../../public/img/animalNews_Img/newsPic3.jpg" alt="浪浪試養">
            </a>
            <p class="newsP">
                想要毛小孩相伴? 高市動保處推浪浪試養30天 認養特定條件犬隻 加碼送寵物保險補助最高3000元
            </p>
            <a href="https://livestock.kcg.gov.tw/ActivitiesDetailC003300.aspx?Cond=50f0666e-46a5-46f7-85d3-533911e874ad"
                target="_blank">
                <button type="button" class="newsTextBtn">More</button>
            </a>
        </div>
        <div class="newsBox">
            <a href="https://www.thenewslens.com/article/174589" target="_blank">
                <img class="newsPic" src="../../public/img/animalNews_Img/newsPic2.jpg" alt="「狗」拉松">
            </a>

            <p class="newsP">
                西班牙「狗」拉松公益路跑，逾5000組毛孩和飼主呼籲以領養代替購買、不棄養寵物
            </p>
            <a href="https://www.thenewslens.com/article/174589" target="_blank">
                <button type="button" class="newsTextBtn">More</button>
            </a>
        </div>
    </div>
    <div class="animalNewsBtn">
        <a href="https://livestock.kcg.gov.tw/ActivitiesListC003200.aspx" target="_blank">
            <button type="button" class="newsBtn">
                看更多資訊
            </button>
        </a>
    </div>
</template>

<style lang="scss" scoped>
.banner {
    display: flex;
    justify-content: center;
    margin: 0;

    .text {
        width: 1000px;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .textTitle {
        font-size: 96px;
        color: black;
    }

    .pArea {
        width: 600px;
        height: 100px;
        margin-top: 50px;

        .pAreaText {
            font-size: 32px;
            margin-left: 50px;
        }
    }


    .meetbtn {
        display: flex;
        justify-content: center;
        margin-top: auto;
    }

    button {
        width: 300px;
        height: 100px;
        font-size: 48px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 3rem;
        box-shadow: 2px 2px 2px gray;
        margin: 0 5px;
        background-color: #edd76a;
        color: #995a25;
        scale: 0.8;

        &:hover {
            background-color: #edd76a;
            scale: 1;
        }
    }

    .pic {
        width: 400px;
        height: 500px;
        background-image: url('https://j.gifs.com/DqQrry.gif');
        background-size: cover;
        background-repeat: no-repeat;

    }
}

//分隔線樣式
hr.hrStyle {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 0));
}

//商品牆
.pruductWall {
    width: 100%;
    height: 500px;
    position: relative;
    margin: 50px 0;
    padding: 0 20px;
}

.pruductBackGround {
    //內部輪播圖片大小
    width: 100%;
    height: 500px;

}

.pruductSlide {
    background-position: center;
    background-size: cover;
    margin-right: 10px;
    position: relative;
    display: block;
    width: 100%;
    background-repeat: no-repeat;

}

.saleWord {
    width: 300px;
    height: 50px;
    position: absolute;
    bottom: 80px;
    right: 27%;
    padding-top: 10px;
    background-color: white;
    color: black;
    font-size: 36px;
    text-align: center;
    font-weight: bold;
    text-shadow: 2px 2px 3px gray;

}

.swiper-slide img {
    height: 300px;
    position: absolute;
    top: 12%;
    right: 27%;

}

//待養動物區
.animalCardWall {
    width: 100%;
    height: 500px;
    position: relative;
    margin: 50px 0;
    padding: 0 20px;
}

.animalCardBackGround {
    //內部輪播圖片大小
    width: 100%;
    height: 600px;
}

.animalCardSlide {
    background-position: center;
    background-size: cover;
    position: relative;
    display: block;
    width: 100%;
    background-repeat: no-repeat;

}

.animalCardImg {
    width: 400px;
    height: 400px;
    background-position: top;
    background-size: cover;
    border-radius: 3rem 0 0 0;
}

.aniPic1 {
    background-image: url("../../public/img/animal/19-1.png");
}

.aniPic2 {
    background-image: url("../../public/img/animal/1-4.png");
}

.aniPic3 {
    background-image: url("../../public/img/animal/18-1.png");
}

.aniPic4 {
    background-image: url("../../public/img/animal/100.jpg");
}

.aniPic5 {
    background-image: url("../../public/img/animal/9-1.png");

}

.aniPic6 {
    background-image: url("../../public/img/animal/101.jpeg");

}

.aniPic7 {
    background-image: url("../../public/img/animal/16-1.png");

}

.animalCardText {
    background-color: white;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 3rem 0;


    .aniP {
        margin: 10px;
        line-height: 1.5;
        font-size: 24px;
        font-weight: bold;
    }


    .aniBtn {
        width: 200px;
        font-size: 24px;
        text-align: center;
        margin: 20px 0;
        border: none;
        border-radius: 2rem;
        box-shadow: 2px 2px 2px gray;
        background-color: #edd76a;
        color: #995a25;
        scale: 0.8;
        font-weight: bold;

        &:hover {
            scale: 1;
        }
    }
}

//教育資訊區
.teachInfo {
    display: flex;
    justify-content: center;
}

.teachInfoImgBot {
    width: 400px;
    height: 400px;
    position: relative;
    margin: 0 20px;
    margin: 0 100px 50px 0;
}

.infoImgBot1 {
    width: 350px;
    height: 300px;
    border: 1rem double #995a25;
    position: absolute;
    bottom: -40px;
}

.infoImgBot2 {
    width: 350px;
    height: 400px;
    background-color: #edd76a;
    position: absolute;
    left: 80px;
}

.infoImgBot3 {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 30px;
    bottom: -410px;
    background-image: url("../../public/img/teachInfo_Img/teachPic.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}

.drop-shadow {
    -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.7));
    filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.7))
}

.infoTextTitle {
    font-size: 36px;
    text-align: center;
    font-weight: bold;
}

.infoTextOutside {
    display: flex;
    justify-content: center;
}

.teachInfoTextBot {
    width: 600px;
    height: 400px;
}

.infoTextUl {
    display: flex;
    justify-content: center;
}

.infoTextHideLi {
    font-weight: 600;
    width: 250px;
    margin: 50px;
    border-bottom: 0.2rem solid #995a25;
    position: relative;
    padding: 1rem 0.5rem;
    font-size: 1.125rem;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #edd76a;
    }

}

.infoTextInside {
    position: absolute;
}

.infoTextHideUl {
    width: 600px;
    height: 300px;
    margin-top: 20px;
    line-height: 3;
    text-align: left;
    font-weight: bold;
    padding-left: 30px;
    position: absolute;
    top: 85px;
    right: -315px;
    background-color: #ffffff;
    opacity: 0;
    transition: all 0.2s ease-out;

    li {
        margin: 10px 0;
    }
}

.active {
    opacity: 1;
}

.animalNews {
    font-size: 96px;
    margin: 50px;
}

.newsBoxOutside {
    display: flex;
    margin: 0 50px;
    justify-content: space-around;
}

.newsBox {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 400px;
    height: 600px;
    background-color: #995a25;
    border-radius: 0.5rem 2rem;

    img {
        width: 400px;
        height: 400px;
        border-radius: 0 2rem 0 0;
    }

    .newsP {
        margin: 20px;
        font-size: 24px;
        color: #ffffff;
    }

    .newsTextBtn {
        width: 80px;
        text-align: center;
        font-size: 24px;
        margin: 1.5rem;
        color: #995a25;
        border-radius: 5px;
        border: none;
        box-shadow: 2px 2px 2px gray;
        background-color: #edd76a;
        scale: 1;

        &:hover {
            scale: 1.2;
        }
    }
}

.animalNewsBtn {
    display: flex;
    justify-content: center;
}

.newsBtn {
    width: 250px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    margin: 1.5rem auto;
    padding: 1rem 2rem;
    color: #995a25;
    border-radius: 0.5rem 2rem;
    transition: ease 0.1s;
    border: none;
    box-shadow: 2px 2px 2px gray;
    background-color: #edd76a;
    scale: 0.8;

    &:hover {
        scale: 1;
    }
}
</style>

<style>
.swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: #995a25;
    opacity: 0.5;

}

.swiper-pagination-bullet-active {
    width: 14px;
    height: 6px;
    border-radius: 3px;
    opacity: 1;
    background-color: #995a25;
}

.swiper-button-prev,
.swiper-button-next {
    color: #995a25;
    font-size: large;
}
</style>