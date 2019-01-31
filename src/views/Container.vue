<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="6"><div style="background-color: #545c64; height: 60px; line-height: 60px; color: white; font-size: 24px" >伦之游戏</div></el-col>
                <el-col :span="18"><el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1"><router-link tag='a' style="text-decoration: none" :to="'/'" >首页</router-link></el-menu-item>
                    <el-menu-item index="2" disabled>游戏</el-menu-item>
                    <el-menu-item index="3" disabled>我们</el-menu-item>
                    <el-menu-item index="4" disabled>招聘</el-menu-item>
                </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <p>上海伦之信息科技有限公司 浦东新区（县）泥城镇云汉路979号2楼</p>
            <p>本公司游戏产品适合18岁以上成年人使用（<router-link tag='a' style="color: red" :to="'/parents'" >家长监护</router-link>）</p>
            <p><a href="http://www.miitbeian.gov.cn">沪ICP备18044920号</a> | 客服电话：(+86) 16602160709</p>
            <p><a href="businessLicence.html">营业执照</a> | <a href="domainLicence.html">域名证书</a></p>
            <!--<a href="parent" style="color: red">家长监护</a>-->
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                // eslint-disable-next-line
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>
    .el-header {
        height: auto !important;
        float:left !important;
    }

    .el-menu {
        height: 60px;
    }

    .el-footer {
        background-color: #eee;
        color: #333;
        text-align: center;
        font-size: 10px;
        height: auto !important;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        /*line-height: 660px;*/
    }
</style>
