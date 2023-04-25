<template>
    <div class="container">
        <div class="category">
            <h1>{{ category }}</h1>
        </div>

        <div class="cardContainer">
            <div class="card" v-for="item in itemList" :key="item.id">
            <img :src="item.cover"/>
            <div>
                <span class="name">{{ item.name }}</span>
                <span class="score">{{ item.score }}</span>
                <span class="intro">{{ item.intro }}</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopularCard',

    data() {
        return {
            category:"热门电影",
            itemList:[
                {
                    id:0,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },
                {
                    id:1,
                    cover:"http://img3.doubanio.com/view/subject/s/public/s1242786.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },
                {
                    id:2,
                    cover:"http://img3.doubanio.com/view/subject/s/public/s1681146.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:3,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s29555070.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:4,
                    cover:"http://img3.doubanio.com/view/subject/s/public/s29219047.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:5,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:6,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:7,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                },{
                    id:8,
                    cover:"http://img1.doubanio.com/view/subject/s/public/s1070222.jpg",
                    name:"围城",
                    score:"9.7",
                    intro:"钱钟书/围城/中国文学/小说/经典/婚姻/现代文学/文学/"
                }
            ]
        };
    }
};
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    width: 100%;

    /* height: 200px; */
    /* border:1px solid red; */
}

.category{
    /* border:1px solid red; */
    margin:12px 0px;
}

.category h1{
    color: var(--primaryColor);
    font-weight: bold;
    font-size: 24px;
    /* line-height: 48px; */
    
}

.cardContainer{
    /* border: 1px solid red; */
    display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 10px;
  grid-template-rows: repeat(2, 280px);
  /* border: 1px solid blue; */
  /* min-width: 160px; */
  /* height: 100%; */

}

.card{
    /* width: 100px; */
    /* border: 1px solid green; */
    
}

.card img{
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
}

</style>