<!-- 主页 -->
<template>
    <div class="container">
        <!-- 头部header -->
        <AppHeader/>

        <!-- 内容区 -->
        <div class="section">
            <router-view></router-view>
        </div>
        

        <!-- 底部footer -->


    </div>
</template>

<script>
// 引入AppHeader
import AppHeader from '@/components/AppHeader.vue';

export default {
    name: 'MainPage',
    components:{AppHeader}
};
</script>

<style scoped>
.container{
    /* background: yellow; */
    height: 1000px;
    /* height: 100%; */
}

.section{
    margin-top: 60px;
}

</style>