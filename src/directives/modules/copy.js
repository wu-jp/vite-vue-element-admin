import { ElMessage } from "element-plus";

const copy = {
  mounted(el, binding) {
    el.copyData = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el, binding) {
    el.copyData = binding.value
  },
  beforeUnmounted(el) {
    el.removeEventListener('click', el.__handleClick__)
  }
}

function handleClick() {
  const input = document.createElement("input");
  input.value = this.copyData.toLocaleString();
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  ElMessage({
    type: "success",
    message: "复制成功"
  });
}

export default copy;
