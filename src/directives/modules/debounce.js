/**
 * 防抖1
 * @type {{bind(*, *): void, unbind(*): void}}
 */
const debounce = {
    mounted(el, binding) {
        // 只调用一次，指令第一次绑定到元素时调用
        if (typeof binding.value !== 'function') {
            throw new Error('callback must be a function')
        }
        let timer = null
        el.__handleClick__ = function() {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                binding.value()
            }, 500)
        }

        el.addEventListener('click', el.__handleClick__)
    },
    beforeUnmount(el) {
        // 只调用一次，指令与元素解绑时调用
        el.removeEventListener('click', el.__handleClick__)
    }
}

/**
 * 防抖2
 * @type {{bind(*): void, unbind(*): void}}
 */
/* const debounce = {
  mounted(el) {
    let timer = null
    el.__handleClick = function() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
        }, 500)
      } else {
        clearTimeout(timer)
        timer = setTimeout(() => {
          timer = null
        }, 500)
        event && event.stopImmediatePropagation()
      }
    }
    el.addEventListener('click', el.__handleClick__)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__handleClick__)
  }
} */

export default debounce
