<template>
    <div class="rating_page">
           <head-top head-title="账户信息" go-back='true'></head-top>
           <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else><!--默认头像-->
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom"> <!--箭头svg-->
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
           </section>           
    </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
import headTop from '@/commonCon/head'
export default {
       data(){
           return{
            avatar:'',
            imgBaseUrl:'//elm.cangdu.org/img/'
           }
         }, //用户头像
       components:{
        headTop       
       },
        computed:{
            ...mapState([
                'userInfo', 'imgPath'
            ]),
        },
       methods:{
           async uploadAvatar(){
                if (this.userInfo) {
                    let input = document.querySelector('.profileinfopanel-upload')
                    let formData = new FormData();
                    formData.append('file', input.files[0]);
                    try{
                        let response = await  Axios.post('/eus/v1/users/' + this.userInfo.user_id + '/avatar',data);      
                        //credentials,include不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
                        let res = await response.json();
                        if (res.status == 1) {
                            this.userInfo.avatar = res.image_path;
                        }
                    }catch (error) {
                        this.showAlert = true;
                        this.alertText = '上传失败';
                        throw new Error(error);
                    }
                }
           }
       }

}
</script>
<style lang="scss" scoped>
$fenmu: 1.6;  
@import '../../../common/mixin';
.rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem/$fenmu;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .profile-info{
        @include wh(100%,3.1rem/$fenmu);
        .profileinfopanel-upload{
            display: block;
            position: absolute;
            opacity: 0;
            top: 2.35rem/$fenmu;
            left: 0;
            @include wh(100%,3.1rem/$fenmu);
        }
        .headportrait{
            margin-top:.4rem/$fenmu;
            padding:.5rem/$fenmu .4rem/$fenmu;
            @include fj(space-between);
            align-items:center;
            border-top:1px solid #ddd;
            background:#fff;

            h2{
                @include sc(.6rem/$fenmu,#333);
                font-weight:500;
                display:flex;
                align-items:center;
            }
            .headportrait-div{
                span{
                    display:inline-block;

                    svg{
                        @include wh(100%,100%);
                    }
                }
                .headportrait-div-top{
                    @include wh(2rem/$fenmu,2rem/$fenmu);
                    @include borderRadius(50%);
                    vertical-align:middle;
                }
                .headportrait-div-bottom{
                    @include wh(.66667rem/$fenmu,1.4rem/$fenmu);
                    position:relative;
                    top:0.44rem/$fenmu;
                }
            }
        }
        .headportraitwo{
            margin-top:0;
            padding:.3rem/$fenmu .4rem/$fenmu;
            .headportrait-div{
                @include fj(left);
                p{
                    text-align:left;
                    line-height:1.39rem/$fenmu;
                    @include sc(.7rem/$fenmu,#999);
                    margin-right:.2rem/$fenmu;
                    font-weight:100;
                    font-family:Arial;
                }
                .headportrait-div-bottom{
                    top:0;
                }
            }
        }
        .headportraithree{
            border-bottom:1px solid #ddd;
        }
        .bind-phone{
            padding:.4rem/$fenmu .4rem/$fenmu;
            @include sc(.5rem/$fenmu,#666);
        }
        .exitlogin{
            width:96%;
            margin:1.3rem/$fenmu auto 0;
            line-height:1.5rem/$fenmu;
            @include borderRadius(5px);
            text-align:center;
            background:#d8584a;
            @include sc(.6rem/$fenmu,#fff);

        }
        .exitlogin:active{
            opacity:.8;
            background:#C1C1C1;
        }
    }
    .info-router{
        display:block;
    }
    .coverpart{
        @include wh(100%,100%);
        @include allcover;
        .cover-background{
            @include wh(100%,100%);
            @include allcover;
            background:#000;
            z-index:100;
            opacity:.2;
        }
        .cover-content{
            width:94%;
            background:$fc;
            padding:17px;
            position:absolute;
            top:20%;
            left:3%;
            z-index:1000;
            @include borderRadius(5px);
            .sa-icon{
                @include wh(90px,90px);
                border:4px solid #f8bb86;
                @include borderRadius(50%);
                margin:20px auto;
                position:relative;
                .sa-body{
                    @include wh(5px,47px);
                    @include borderRadius(2px);
                    background:#f8bb86;
                    @include cl;
                    top:10px;
                }
                .sa-dot{
                    @include wh(7px,7px);
                    @include borderRadius(50%);
                    background:#f8bb86;
                    @include cl;
                    bottom:10px;
                }
            }
            h2{
                width:100%;
                text-align:center;
                @include sc(30px,#575757);
                font-weight:500;
                margin:25px 0;
            }
            .sa-botton{
                width:100%;
                text-align:center;

                button{
                    display:inline-block;
                    padding:.4rem/$fenmu 1rem/$fenmu;
                    @include borderRadius(5px);
                    @include sc(.6rem/$fenmu,$fc);
                    letter-spacing:1px;
                    margin-top:26px;
                }
                .waiting{
                    background:#C1C1C1;
                    margin-right:.4rem/$fenmu;
                }
                .quitlogin{
                    background:rgb(221, 107, 85);
                }
            }

        }
    }
    @-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
 0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}

@keyframes zoomOut {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  100% {
    opacity: 0;
  }
}
body .coverpart .cover-animate{
    transition:all 1s;
    animation:bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem/$fenmu, 0, 0);
    opacity: 0;
}
</style>
