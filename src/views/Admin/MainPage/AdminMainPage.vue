<template>
    <div class="AdminMainPage">
        <EChart></EChart>
    </div>
</template>

<script>
import EChart from '@/components/Admin/EChart.vue';

export default {
    name: 'AdminMainPage',

    components:{EChart},

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
.AdminMainPage{
    display: flex;
    width: 500px;
    border: 1px solid red;

}

</style>