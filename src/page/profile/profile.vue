<template>
   <div class="profile_page">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
                <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
                 <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                 </span>
                 <div class="user-info">
                     <p>{{username}}</p>
                     <p>
                         <span class="user-icon">
                              <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                              </svg>
                         </span>
                         <span class="icon-mobile-number">{{mobile}}</span>
                     </p>
                 </div>
                <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                 </span>
                </router-link>
            </section>
            <section class="info-data">
            <ul class="clear">
                  <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{count}}</b>个</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{pointNumber}}</b>分</span>
                        <span class="info-data-bottom">我的积分</span>
                    </router-link>
            </ul>
            </section>
              <section class="profile-1reTe">
                    <!-- 我的订单 -->
                <router-link to='/order' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 积分商城 -->
                <a href='https://home.m.duiba.com.cn/#/chome/index' class="myorder">
                    <aside>
                        <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>积分商城</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </a>
                <!-- 饿了么会员卡 -->
                <router-link to='/vipcard' class="myorder">
                    <aside>
                        <svg fill="#ffc636">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>饿了么会员卡</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='/service' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 下载饿了么APP -->
                <router-link to='/download' class="myorder">
                    <aside>
                        <svg fill="#3cabff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>下载饿了么APP</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
              </section>    
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
   </div>  
</template>
<script>
import headTop from '@/commonCon/head'
import footGuide from '@/commonCon/footGuide'
import {mapMutations, mapState} from 'vuex'
import { getImgPath } from "@/common/mixin.js";
export default {
    data(){
        return{
         profiletitle: '我的',
         username:'登录/注册' ,//用户名字
         resetname: '',
         mobile: '暂无绑定手机号',             //电话号码
         balance: 0,            //我的余额
         count : 0,             //优惠券个数
         pointNumber : 0,       //积分数
         imgBaseUrl: "//elm.cangdu.org/img/",
         avatar: '',             //头像地址
        }
    },
    mounted(){
        //将编译好的html挂载到页面完成后执行的事件钩子
        //此钩子函数中一般会做一些ajax请求获取数据进行数据初始化
        this.initData();//初始化数据
    },
    mixins:[getImgPath],
    components:{
        headTop,
        footGuide
    },
    computed:{
        ...mapState([  //记录用户信息的地方
            'userInfo',
        ]),
        //后台会返回两种图片格式分别处理
        imgPath:function(){
            let path;
            if(this.avatar.indexOf('/') !==-1){
                path = imgBaseUrl +　this.avatar;
            }else{
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },
    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]), 
        initData(){
              if (this.userInfo && this.userInfo.user_id) {
               this.avatar = this.userInfo.avatar;
               this.username = this.userInfo.username;
               this.mobile = this.userInfo.mobile || '暂无绑定手机号';
               this.balance = this.userInfo.balance;
               this.count = this.userInfo.gift_amount;
               this.pointNumber = this.userInfo.point;
              }else{
                this.username = '登录/注册';
                this.mobile = '暂无绑定手机号';
              }
        }
    },
    watch: {
        userInfo: function (value){  //监听userInfo计算属性，并执行method中的函数
            this.initData()
        }
    }
}
</script>
<style lang="scss" scoped>
$fenmu: 1.6;  
@import '../../common/mixin';
    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
   .profile-number{
        padding-top:1.95rem/$fenmu;
        .profile-link{
            display:block;
            display:flex;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background:$blue;
            padding: .666667rem/$fenmu .6rem/$fenmu;
            .privateImage{
                display:inline-block;
                @include wh(2.5rem/$fenmu,2.5rem/$fenmu);
                border-radius:50%;
                vertical-align:middle;
                .privateImage-svg{
                    background:$fc;
                    border-radius:50%;
                    @include wh(2.5rem/$fenmu,2.5rem/$fenmu);
                }
            }
            .user-info{
                margin-left:.48rem/$fenmu;
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
                p{
                    font-weight:700;
                    @include sc(.8rem/$fenmu,$fc);
                    .user-icon{
                        @include wh(0.5rem/$fenmu,0.75rem/$fenmu);
                        display:inline-block;
                        vertical-align:middle;
                        line-height:0.75rem/$fenmu;
                        .icon-mobile{
                            @include wh(100%,100%);
                        }
                    }
                    .icon-mobile-number{
                        display:inline-block;
                        @include sc(.57333rem/$fenmu,$fc);

                    }
                }

            }
            .arrow{
                @include wh(.46667rem/$fenmu,.98rem/$fenmu);
                display:inline-block;
                svg{
                   @include wh(100%,100%);
                }
            }
        }
   }
   .info-data{
        width:100%;
        background:$fc;
        box-sizing: border-box;
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                border-right:1px solid #f1f1f1;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    @include sc(.55rem/$fenmu,#333);
                    padding: .853333rem/$fenmu 0 .453333rem/$fenmu;
                    b{
                        display:inline-block;
                        @include sc(1.2rem/$fenmu,#f90);
                        font-weight:700;
                        line-height:1rem/$fenmu;
                        font-family: Helvetica Neue,Tahoma;
                    }
                }
                .info-data-bottom{
                    @include sc(.57333rem/$fenmu,#666);
                    font-weight:400;
                    padding-bottom:.453333rem/$fenmu;

                }
            }
            .info-data-link:nth-of-type(2){
                .info-data-top{
                    b{
                        color:#ff5f3e;
                    }
                }

            }
            .info-data-link:nth-of-type(3){
                border:0;
                .info-data-top{
                    b{
                        color:#6ac20b;
                    }
                }
            }
        }
   }
   .profile-1reTe{
        margin-top:.4rem/$fenmu;
        background:$fc;
        .myorder{
            padding-left:1.6rem/$fenmu;
            display:flex;
            align-items: center;
            aside{
                @include wh(.7rem/$fenmu,.7rem/$fenmu);
                margin-left:-.866667rem/$fenmu;
                margin-right:.266667rem/$fenmu;
                display:flex;
                align-items: center;
                svg{
                    @include wh(100%,100%);
                }
            }
            .myorder-div{
                width:100%;
                border-bottom:1px solid #f1f1f1;
                padding:.433333rem/$fenmu .266667rem/$fenmu .433333rem/$fenmu 0;
                @include sc(.7rem/$fenmu,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                }
                .myorder-divsvg{
                    @include wh(.46667rem/$fenmu,.466667rem/$fenmu);
                    svg{
                        @include wh(100%,100%);
                    }
                }
            }
        }
        .myorder:nth-of-type(3) .myorder-div{
            border:0;
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(1.25rem, 0, 0);
        opacity: 0;
    }
</style>

