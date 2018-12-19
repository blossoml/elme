<template>
    <div class="restContainer">
        <head-top head-title="重置密码" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="phoneNumber" >
            </section>
              <section class="input_container">
                <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6"  v-model="mobileCode">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg"  :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <div class="login_container" @click="resetButton">确认修改</div>
        <alert-tip v-if="showAlert"  @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
    import alertTip from '@/commonCon/alertTip'
    import headTop from '@/commonCon/head'
    import {mobileCode, checkExsis, sendMobile, getcaptchas, changePassword} from  '@/service/getData'
    export default {
        data(){
            return {
                phoneNumber: null, //电话号码
                oldPassWord: null,
                newPassWord: null, //新密码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                confirmPassWord: null, //确认密码
                captchaCodeImg: null, //验证码地址
                mobileCode: null, //短信验证码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile',//注册方式
                captchaCodeImg: null,
            }
        },
        components: {
            headTop,
            alertTip,
        },
        methods:{
            async getCaptchaCode(){
                let res=await getcaptchas();
                this.captchaCodeImg=res.code;
            },
            //重置密码
            async resetButton(){
                if (!this.phoneNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入正确的账号';
                    return
                }else if(!this.oldPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入旧密码';
                    return
                }else if(!this.newPassWord){
                    this.showAlert = true;
                    this.alertText = '请输入新密码';
                    return
                }else if(!this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '请输确认密码';
                    return
                }else if(this.newPassWord !== this.confirmPassWord){
                    this.showAlert = true;
                    this.alertText = '两次输入的密码不一致';
                    return
                }else if(!this.mobileCode){
                    this.showAlert = true;
                    this.alertText = '请输验证码';
                    return
                }
                 let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
                 if (res.message) 
                 {
                        this.showAlert = true;
                        this.alertText = res.message;
                        this.getCaptchaCode()
                        return
                 }else
                 {
                                    this.showAlert = true;
                                    this.alertText = '密码修改成功';
                 }  
            },    
             closeTip(){
                this.showAlert = false;
              }                
        }
    }
</script>
<style lang="scss" scoped>
   $fensu: 1.6;  
   @import '../../common/mixin';
    .restContainer{
        padding-top: 1.95rem/$fensu;
    }
    .restForm{
        background-color: #fff;
        margin-top: .6rem/$fensu;
        .input_container{
            display: flex;
            justify-content: space-between;
            padding: .6rem/$fensu .8rem/$fensu;
            border-bottom: 1px solid #f1f1f1;
            input{
                @include sc(.7rem/$fensu, #666);
            }
            button{
                @include sc(.65rem/$fensu, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem/$fensu .4rem/$fensu;
                border: 1px;
                border-radius: 0.15rem/$fensu;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
        }
        .phone_number{
            padding: .3rem/$fensu .8rem/$fensu;
        }
        .captcha_code_container{
            height: 2.2rem/$fensu;
            .img_change_img{
                display: flex;
                align-items: center;
                img{
                    @include wh(3.5rem/$fensu, 1.5rem/$fensu);
                    margin-right: .2rem/$fensu;
                }
                .change_img{
                    display: flex;
                    flex-direction: 'column';
                    flex-wrap: wrap;
                    width: 2rem/$fensu;
                    justify-content: center;
                    p{
                        @include sc(.55rem/$fensu, #666);
                    }
                    p:nth-of-type(2){
                        color: #3b95e9;
                        margin-top: .2rem/$fensu;
                    }
                }
            }
        }
    }
    .captcha_code_container{
        height: 2.2rem/$fensu;
        .img_change_img{
            display: flex;
            align-items: center;
            img{
                @include wh(3.5rem/$fensu, 1.5rem/$fensu);
                margin-right: .2rem/$fensu;
            }
            .change_img{
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem/$fensu;
                justify-content: center;
                p{
                    @include sc(.55rem/$fensu, #666);
                }
                p:nth-of-type(2){
                    color: #3b95e9;
                    margin-top: .2rem/$fensu;
                }
            }
        }
    }
    .login_container{
        margin: 1rem/$fensu .5rem/$fensu;
        @include sc(.7rem/$fensu, #fff);
        background-color: #4cd964;
        padding: .5rem/$fensu 0;
        border: 1px;
        border-radius: 0.15rem/$fensu;
        text-align: center;
    }
</style>
