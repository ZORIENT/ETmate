<template>
  <div class="AdminMainPage">
    <div class="pie">
      <PieChart></PieChart>
    </div>

    <div class="bar">
      <BarChart></BarChart>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Admin/PieChart.vue";
import BarChart from "@/components/Admin/BarChart.vue";

export default {
  name: "AdminMainPage",

  components: { PieChart, BarChart },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.AdminMainPage {
  display: flex;
  /* width: 700px; */
  display: flex;
  flex-direction: column;
  border: 1px solid red;
}

.AdminMainPage .pie{
    width: 600px;
    height: 300px;
}


.AdminMainPage .bar{
    width: 600px;
    height: 300px;
}

</style>