<template>
    <div >
        <el-carousel :interval="4000" arrow="always" height="700px">
            <el-carousel-item v-for="item in imgs" :key="item">
                <div style="height: 100%; width: 100%"><img class="img-auto" :src="item"></div>

            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgs: [
                    require('../assets/0.png'),
                    require('../assets/1.png'),
                    require('../assets/2.jpg'),
                    require('../assets/3.jpeg')
                    ]
            }
        }
    }
</script>


<style>

    .img-auto {
        width:100%;
        height:100%;
        /*object-fit: scale-down;*/
        /*background-size: cover;*/
        /*max-width: 100%;*/
        /*!*width: auto;*!*/
        /*!*height: 600px;*!*/
        /*min-width: 100%;*/
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>