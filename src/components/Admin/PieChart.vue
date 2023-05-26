<template>
  <div class="PieChart" id="PieChart"></div>
</template>

<script>
import * as echarts from "echarts";
import { getStats } from "@/api/stats"

export default {
  name: "PieChart",

  data(){
      return {
        pieData: {
        title: "电影、游戏、书籍数据统计",
        color: ["#52A8FF", "#00B389", "#FFA940"],
        seriesData: [
          //每个模块的名字和值
          { name: "电影数量", value: 0 },
          { name: "游戏数量", value: 0 },
          { name: "书籍数量", value: 0 },
        ],
      },
      }
  },

  mounted: function () {
    this.getPieData();
  },


  methods: {
    getPie () {
      var bgColor = "#fff";

      // 绘制图表
      var myChart = echarts.init(document.getElementById("PieChart"));

      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: this.pieData.title,
          x: "center", //标题位置
          top: 10,
          textStyle: {
            //标题内容的样式
            color: "#0e5571",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 16, //主题文字字体大小，默认为18px
          },
        },
        // stillShowZeroSum: true,
        //鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: "item",
          // formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        //图例
        legend: {
          //图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, //控制图例出现的距离  默认左上角
          left: "center", //控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          // textStyle: {
          //   //图例中文字的样式
          //   // color: "#000",
          //   // fontSize: 13,
          // },
          // data: this.pieData.series,
          // data: ["未领取", "处理中", "已完成"], //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: this.pieData.color,
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: this.pieData.seriesData,
          label: {
            color: "#0e5571",
            // show: true, //饼图上是否出现标注文字 标注各模块代表什么  默认是true
            // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
          },
          labelLine: {
            show: true, //官网demo里外部标注上的小细线的显示隐藏    默认显示
          },
          itemStyle: {
            borderColor: bgColor,
            borderWidth: 2,
          },
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    getPieData(){
      getStats().then(res=>{
        if(res.code===1){
          this.pieData.seriesData[0].value=res.data.filmCount;
          this.pieData.seriesData[1].value=res.data.gameCount;
          this.pieData.seriesData[2].value=res.data.bookCount;
          this.getPie();
        }else{
          this.$message.error(res.msg);
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
};
</script>

<style scoped>
.PieChart {
  height: 100%;
  width: 100%;
}
</style>