<!--抽奖历史记录-->
<template>
    <div class='history-container'>
        <el-drawer size="100%" v-model="isHistoryList" title="抽奖历史" direction="btt" :before-close="handleClose"
            :with-header="false">
            <!-- 抽奖历史标题 -->
            <h1 class="tit">抽奖历史</h1>
            <!-- 关闭按钮 -->
            <el-icon class="close-btn" @click="handleClose" size="40px" color="#f00">
                <Close />
            </el-icon>
            <!-- 删除数据按钮 -->
            <el-button class="det-btn" color="#b79900" @click="deleteLog">
                删除数据
            </el-button>
            <!-- 表格显示抽奖历史 -->
            <el-table :data="hisTab" style="width: 90vw;margin: 20px 2vw 0px 2vw;" height="80vh">
                <!-- 序号列 -->
                <el-table-column type="index" label="序号" width="auto" min-width="20%" align="center" />
                <!-- 奖项 -->
                <el-table-column prop="prize" label="奖项" width="auto" min-width="20%" align="center" />
                <!-- 姓名 -->
                <el-table-column prop="name" label="姓名" width="auto" min-width="20%" align="center" />
                <!-- 部门 -->
                <el-table-column prop="department" label="部门" width="auto" min-width="20%" align="center" />
                <!-- 时间 -->
                <el-table-column prop="time" label="时间" width="auto" min-width="20%" align="center" />
            </el-table>
        </el-drawer>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 定义 props
let props = defineProps({
    isHistoryList: Boolean, // 是否显示抽屉的父组件传递状态
}),
    isHistoryList = ref(false), // 控制抽屉显示的内部状态
    hisTab = ref([]), // 表格数据
    emits = defineEmits(["close", "getNameList"]); // 定义自定义事件，用于向父组件传递事件

// 生命周期：挂载完成时触发
onMounted(() => {
    const storedData = localStorage.getItem("luckDrawHis"); // 检测 localStorage 中是否有历史记录
    if (storedData) {
        hisTab.value = JSON.parse(storedData); // 如果有数据，解析并加载到表格数据中
    }
});

// 监听 props 中的 isHistoryList，动态更新组件内部状态
watch(
    () => props.isHistoryList,
    (val) => {
        isHistoryList.value = val; // 同步抽屉的状态
        if (val) {
            // 当抽屉显示时，从 localStorage 中加载历史记录
            hisTab.value = JSON.parse(localStorage.getItem("luckDrawHis"));
        }
    }
);

// 关闭对话框
const handleClose = () => {
    emits("close"); // 触发父组件的关闭事件
}

// 删除记录数据
const deleteLog = () => {
    ElMessageBox.confirm(
        '确认删除数据?',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            localStorage.removeItem("luckDrawHis"); // 删除本地存储的历史数据
            hisTab.value = []; // 清空表格数据
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}
</script>

<style lang="scss" scoped>
.history-container {
    height: 100%;
    width: 100%;
    text-align: center;

    .tit {
        position: absolute;
        left: 0;
        top: 0;
        margin: 10px;
    }


    .close-btn {
        cursor: pointer;
        position: absolute;
        margin: 10px;
        right: 0;
        top: 0;
    }

    .det-btn {
        color: #fff;
        margin: 10px 40px;
        padding: 20px;
        font-weight: 900;
        font-size: 20px;
        position: relative;
    }
}
</style>