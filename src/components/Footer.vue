<script>
export default {

}
</script>

<template>
    <footer class="frontFooter">
        <div class="footerImg">
            <div class="logo">
                <a href="/">
                    <img src="https://png.pngtree.com/png-clipart/20221014/ourmid/pngtree-cartoon-cute-pet-animal-logo-png-image_6150426.png"
                        alt="LOGO">
                </a>
            </div>
            <p class="footerCoverP">
                2023 Made ◎ Zhen all rights reserved.
            </p>
            <div class="footerIcon">
                <a href="https://www.facebook.com/isu.edu.tw?fref=ts">
                    <font-awesome-icon :icon="['fab', 'facebook']" size="2xl" style="color: #edd76a;" />
                </a>
                <a href="https://www.instagram.com/isupublic/?utm_medium=copy_link">
                    <font-awesome-icon :icon="['fab', 'instagram']" size="2xl" style="color: #edd76a;" />
                </a>
                <a href="https://www.youtube.com/channel/UCJ7lbrEbG-SOp5a1jkbKYbg">
                    <font-awesome-icon :icon="['fab', 'youtube']" size="2xl" style="color: #edd76a;" />
                </a>
                <a href="https://twitter.com/?lang=zh-Hant">
                    <font-awesome-icon :icon="['fab', 'twitter']" size="2xl" style="color: #edd76a;" />
                </a>
                <a
                    href="https://www.google.com.tw/maps/place/%E7%BE%A9%E5%AE%88%E5%A4%A7%E5%AD%B8/@22.7263706,120.4048897,17.44z/data=!4m6!3m5!1s0x346e111c3b372669:0x48b39f7fb236fcdc!8m2!3d22.7271472!4d120.4058239!16s%2Fm%2F03gx909?entry=ttu">
                    <font-awesome-icon :icon="['fas', 'location-dot']" size="2xl" style="color: #edd76a;" />
                </a>

            </div>

        </div>
        <div class="footerText">
            <ul>
                <li>地址：(84001)高雄市大樹區學城路一段1號</li>
                <li>服務時間：星期一至星期五</li>
                <li>上午8:00~12:00 下午13:30~17:30</li>
                <li>建議瀏覽器：Edge、Firefox、Chrome</li>
                <li>(螢幕設定最佳顯示效果為1920*1080)</li>
            </ul>
        </div>
        <div class="footerMap">
            <h3 class="footerMapText">網站導覽</h3>
            <ul>
                <li class="footerMapLi">捐款專線:</li>
                <li class="footerMapLi">07-657-7711</li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.frontFooter {
    width: 100%;
    height: 450px;
    background-color: #995a25;
    display: flex;
    justify-content: space-around;

    .footerImg {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        img{
        max-width: 100%;
        height: auto;

        }
    }

    .footerCoverP {
        color: white;
        font-size: 16px;
        text-align: center;
    }

    .footerIcon {
        width: auto;
        line-height: 3;
        letter-spacing: 8px;
        margin: 10px;
        text-align: center;
        a{
            margin: 0 10px;
        }
    }

    .footerText {
        width: 50%;
        margin: 50px 20px;
        font-size: 24px;
        color: white;
        line-height: 3;
    }

    .footerMap {
        width: 20%;
        margin: 50px 20px;
    }

    .footerMapText {
        font-size: 30px;
        font-weight: bolder;
        margin: 20px;
        color: white;
        text-shadow: 1px 1px 1px gray;
    }

    .footerMapLi {
        font-size: 24px;
        line-height: 2;
        margin-left: 40px;
        color: white;
    }
}
</style>