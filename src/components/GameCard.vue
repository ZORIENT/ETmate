<template>
    <div class="card" @click="toGameDetail()">
      <img :src="item.cover"/>

      <div class="line1">
        <span class="name">{{ item.gameName }}</span>
        <span class="score">{{ item.genres }}</span>
      </div>

      <div class="line2">
        <span class="intro">{{ item.tags }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FilmCard",
    props: ["item"],
    methods:{
        toGameDetail(){
            this.$router.push({
                name:"GameDetail",
                params:{
                    id:this.item.id
                }
            })
        }
    }
  };
  </script>
  
  <style scoped>
  .card {
    width: 160px;
    /* border: 1px solid green; */
    cursor: pointer;
  }
  
  .card img {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .name,
  .score,
  .line2{
    /* 限制文字显示行数 */
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  
  .line1 {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    font-size: 13px;
    color:var(--primaryColor);
    font-weight: bold;
  }
  
  .line1 .name{
    width: 120px;
  }
  
  .line1 .score {
    color: #ff722c;
  }
  
  .line2 {
    /* border: 1px solid blue; */
    font-size: 12px;
    line-height: 22px;
    color: #717171;
  }
  
  
  </style>