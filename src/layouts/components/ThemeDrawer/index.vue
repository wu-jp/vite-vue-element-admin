<script setup>
import {ref} from "vue";
import mittBus from "@/utils/mittBus.js";
import { useTheme } from '@/hooks/useTheme';
import { useConfigStore } from '@/store/modules/config';

const configStore = useConfigStore();
const { switchDark } = useTheme();

const drawerVisible = ref(false)
const handleClose = () => {
  drawerVisible.value = false
}

mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));

</script>
<template>
  <el-drawer
    v-model="drawerVisible"
    title="设置主题"
    direction="rtl"
    :before-close="handleClose"
    size="300px"
  >
    <div>
      <p>切换布局</p>
    </div>

    <div>
      <!--<p>全局主题</p>-->
      <div class="theme-box">
        <span>暗黑模式</span>
        <el-switch
          v-model="configStore.isDark"
          @change="switchDark"
        />
      </div>
    </div>

    <div>
      <p>界面设置</p>
    </div>
  </el-drawer>
</template>

<style scoped lang="scss">
.theme-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
