<template>
  <div class="GameBarChart" id="GameBarChart"></div>
</template>

<script>
import * as echarts from "echarts";
import {getGameStats} from "@/api/stats"

export default {
  name: "GameBarChart",

  data () {
    return {
			chartData:{
          title: "游戏类型统计",
          seriesData: [],
			}
    };
  },

  mounted() {
    this.getGameStats();
  },

  computed: {
    xData () {
      let xData = [];
      this.chartData.seriesData.forEach((item) => {
        xData.push(item.count);
      });
      return xData;
    },

    yData () {
      let yData = [];
      this.chartData.seriesData.forEach((item) => {
        yData.push(item.categoryName);
      });
      return yData;
    },

    max(){
      let count=this.chartData.seriesData[0].count;

      return (parseInt(count/100)+(this.interval)/100)*100;
    },

    interval(){
      let count=this.chartData.seriesData[0].count;
      
      return (parseInt(count/700)+1)*100;
    }
  },

  methods: {
    getBar () {
      // 绘制图表
      var myChart = echarts.init(document.getElementById("GameBarChart"));

      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: this.chartData.title,
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
        tooltip: { show: true },
        grid: { left: 10, top: 40, bottom: 10, right: 40, containLabel: true },
        xAxis: {
          type: "value",
          boundaryGap: false,
          max: this.max, //Math.ceil(max / 4) * 5 || 10,
          interval: this.interval,
          axisLine: { show: true, lineStyle: { color: "#ccc" } },
          axisTick: { show: false },
          axisLabel: { color: "#0e5571" },
          splitLine: {
            lineStyle: { color: ["#CEEDFF"], type: [5, 8], dashOffset: 3 },
          },
        },
        yAxis: {
          type: "category",
          data: this.yData,
          axisLine: { show: true, lineStyle: { color: "#ccc" } },
          axisTick: { length: 8 },
          axisLabel: { color: "#0e5571", margin: 10 },
          inverse: true,
        },
        series: [
          {
            // name: "数量",
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              //   color: "rgba(82, 168, 255, 0.1)",
              borderRadius: [0, 8, 8, 0],
            },
            itemStyle: {
              // color: "#52A8FF",
              borderRadius: [0, 8, 8, 0],
              color: function (params) {
                // 定义一个颜色集合
                let colorList = [
                  "#52A8FF",
                  "#00B389",
                  "#FFA940",
                  "#FF5A57",
                  "#29EFC4",
                  "#F8AEA4",
                  "#FFC53D",
                  "#009982",
                  "#C099FC",
                  "#F5855F",
                ];
                // 对每个bar显示一种颜色
                return colorList[params.dataIndex];
              },
            },
            barMaxWidth: 16,
            label: {
              show: true,
              position: "outside",
              offset: [-2, 2],
              color: "#0e5571",
            },
            data: this.xData,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

		getGameStats(){
			getGameStats().then(res=>{
				if(res.code===1){
					this.chartData.seriesData=res.data;
					this.getBar();
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
.GameBarChart {
  /* border: 1px solid green; */
  height: 100%;
  width: 100%;
}
</style>