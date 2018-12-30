<template>
<div class="rating_page">
    <section v-if="!showLoading">
          <head-top head-title="订单备注" go-back='true'></head-top>
          <section class="quick_remark" v-if="remarkList.remarks.length">
          <header class="header_style">快速备注</header>
          <ul class="remark_arr_list_ul">
                <li class="remark_arr_list_li" v-for="(item,index) in remarkList.remarks" :key="index">               
                <span :class="{first: remarkIndex == 0, last: remarkIndex == item.length - 1, choosed: remarkText[index]&&(remarkText[index][0] == remarkIndex)}" class="remark_item_li" v-for="(remarkT, remarkIndex) in item" :key="remarkIndex" @click="chooseRemark(index, remarkIndex, remarkT)">{{remarkT}}</span>
                 </li>
          </ul>
          </section>
          <section class="input_remark quick_remark">
                <header class="header_style">其他备注</header>
                <textarea class="input_text" v-model="inputText" placeholder="请输入备注内容(可不填)"></textarea>
            </section>
            <div class="determine" @click="confirmRemark">确定</div>
    </section>
    <loading v-if="showLoading"></loading>
</div>
    
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import headTop from '@/commonCon/head'
import loading from '@/commonCon/loading'
import {getRemark} from '@/service/getData'
export default {
    data(){
         return{
                id: null,
                sig: null,
                remarkList: null,
                showLoading: true,
                remarkText: {},
                inputText: null,
            }
    },
    created(){
        this.id=this.$route.query.id; //id值
        this.sig=this.$route.query.sig;//sig值
    },
    mounted(){
        this.initData();
    },
    components:{
        headTop,
        loading
    },
    methods:{
        ...mapMutations([
            'CONFIRM_REMARK'
        ]),
        //初始化信息
        async initData(){
              this.remarkList = await getRemark(this.id, this.sig);             
              this.showLoading = false;
        },
        chooseRemark(index,remarkIndex,text){
            this.remarkText[index]=[remarkIndex,text];//[index外层循环index值。remarkIndex内层循环index值。text表示文字]        
            this.remarkText=Object.assign({},this.remarkText)//空对象合并
        },
        //确认选择
        confirmRemark(){
            this.CONFIRM_REMARK({remarkText: this.remarkText, inputText: this.inputText});
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
      $fenmu: 1.6;  
@import '../../../common/mixin';
.rating_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 204;
        padding-top: 1.95rem/$fenmu;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .header_style{
        @include sc(.65rem/$fenmu, #333);
        line-height: 2rem/$fenmu;
    }
    .quick_remark{
        background-color: #fff;
        margin-top: .4rem/$fenmu;
        padding: 0 .6rem/$fenmu 1rem/$fenmu;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: .6rem/$fenmu;
                margin-bottom: .6rem/$fenmu;
                span{
                    @include sc(.6rem/$fenmu, #333);
                    padding: .3rem/$fenmu .6rem/$fenmu;
                    border: 0.025rem/$fenmu solid #3190e8;
                    border-left: 0;
                }
                .first{
                    border-left: 0.025rem/$fenmu solid #3190e8;
                    border-top-left-radius: .2rem/$fenmu;
                    border-bottom-left-radius: .2rem/$fenmu;
                }
                .last{
                    border-top-right-radius: .2rem/$fenmu;
                    border-bottom-right-radius: .2rem/$fenmu;
                }
                .choosed{
                    color: #fff;
                    background-color: #3190e8;
                }
            }
        }
    }
    .input_remark{
        background-color: #fff;
        .input_text{
            width: 100%;
            background-color: #f9f9f9;
            border: 0.025rem/$fenmu solid #eee;
            resize: none;
            min-height: 4.5rem/$fenmu;
            border-radius: .2rem/$fenmu;
            @include sc(.6rem/$fenmu, #666);
            padding: .5rem/$fenmu;
        }
    }
    .determine{
        background-color: #4cd964;
        @include sc(.7rem/$fenmu, #fff);
        text-align: center;
        margin: 0 .7rem/$fenmu;
        line-height: 1.8rem/$fenmu;
        border-radius: 0.2rem/$fenmu;
    }
</style>
