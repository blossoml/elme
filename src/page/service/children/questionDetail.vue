<template>
     <div v-if="question" class="detail_page">
        <head-top :head-title="question.title" go-back='true'></head-top>
        <section id="scroll_section" class="scroll_container">
            <section v-html="markdownText" class="markdown-body"></section>
        </section>
    </div>
</template>
<script>
import headTop from '@/commonCon/head'
import showdown from 'showdown'
import {mapMutations,mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },
    components:{
        headTop
    },
    mounted(){

    },
    computed:{
        ...mapState([
             'question', 
        ]),
        markdownText: function (){
                //转换markDown格式
                let converter = new showdown.Converter();  
                console.log( this.question&&this.question.detail)  
                return converter.makeHtml(this.question.detail);                                     
       }    
    }    
}
</script>
<style lang="scss" scoped>
   $fenmu: 1.6;  
@import '../../../common/mixin';
    .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
        padding: 45px;  
    }  
    @media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
    .detail_page{    
        position: fixed;
        top:0;
        left:0;    
        right: 0; 
        background-color: #fff;
        z-index: 200;
        height: 100%;
        padding-top: 1.95rem/$fenmu;
        overflow:auto;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{        
        padding-top: 1.95rem/$fenmu;    
    } 
  
</style>
