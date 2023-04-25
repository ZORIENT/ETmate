<template>
    <div class="card">
        <img :src="item.cover" />
        <div class="line1">
          <span class="name">{{ item.name }}</span>
          <span class="score">{{ item.score }}</span>
        </div>
        <div class="line2">
          <span class="intro">{{ item.intro }}</span>
        </div>
      </div>
</template>

<script>
export default {
    name: 'CardPage',
    props:["item"]
};
</script>

<style scoped>

.card {
  width: 160px;
  /* border: 1px solid green; */
}

.card img {
  width: 160px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
}

.line1{
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    font-size: 13px;

}

.line1 .score{
    color:#ff722c;
}

.line2{
    /* border: 1px solid blue; */
    font-size: 12px;
    line-height: 22px;
    color: #717171;


    /* 限制文字显示行数 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>