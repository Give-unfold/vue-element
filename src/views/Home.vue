<template>
    <div>
        <el-button type="info" @click="logou">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        logou() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped>

</style>