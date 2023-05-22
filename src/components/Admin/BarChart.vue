<template>
  <div class="BarChart"
       id="BarChart"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  name: "BarChart",

  data () {
    return {
      chartData: {
        title: "系统统计数据电影、游戏、书籍",
        max: 3500,
        interval: 500,
        seriesData: [
          //每个模块的名字和值
          { name: "英语", value: 3183 },
          { name: "日语", value: 1151 },
          { name: "粤语", value: 711 },
          { name: "法语", value: 483 },
          { name: "汉语普通话", value: 461 },
          { name: "韩语", value: 340 },
          { name: "意大利语", value: 129 },
          { name: "英语 / 西班牙语", value: 128 },
          { name: "英语 / 法语", value: 109 },
          { name: "德语", value: 901 },
        ],
      },
    };
  },

  mounted: function () {
    this.$nextTick(this.getPie());
  },

  computed: {
    xData () {
      let xData = [];
      this.chartData.seriesData.forEach((item) => {
        xData.push(item.value);
      });

      return xData;
    },
    yData () {
      let yData = [];
      this.chartData.seriesData.forEach((item) => {
        yData.push(item.name);
      });

      return yData;
    },
  },

  methods: {
    getPie () {
      // 绘制图表
      var myChart = echarts.init(document.getElementById("BarChart"));

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
          max: this.chartData.max, //Math.ceil(max / 4) * 5 || 10,
          interval: this.chartData.interval,
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
              color: "#52A8FF",
              normal: {
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
  },
};
</script>
  
  <style scoped>
.BarChart {
  border: 1px solid green;
  height: 100%;
  width: 100%;
}
</style>