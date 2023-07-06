import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store/modules/config';
import { ElMessage } from 'element-plus';
import { getDarkColor, getLightColor } from '@/utils/color';
import { asideTheme } from '@/styles/theme/aside';

export const useTheme = () => {
  const configStore = useConfigStore();
  const { primary, isDark } = storeToRefs(configStore);

  const switchDark = () => {
    const html = document.documentElement;
    if (isDark.value) html.setAttribute('class', 'dark');
    else html.setAttribute('class', '');
    changePrimary(primary.value);
    setAsideTheme();
  };

  // 修改主题色
  const changePrimary = (val) => {
    if (!val) {
      val = '#30336b';
      ElMessage({
        type: 'success',
        message: '主题色已重置为 #30336b',
      });
    }

    document.documentElement.style.setProperty('--el-color-primary', val);
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`,
    );

    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    configStore.setConfigState('primary', val);
  };

  // 设置侧边栏样式
  const setAsideTheme = () => {
    // 默认所有侧边栏为 light 模式
    let type = 'light';

    // 侧边栏 dark 模式
    if (isDark.value) type = 'dark';
    const theme = asideTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  const initTheme = () => {
    switchDark();
  };
  return {
    initTheme,
    switchDark,
    changePrimary,
    setAsideTheme,
  };
};
