import debounce from '@/directives/modules/debounce.js'
import permission from '@/directives/modules/permission'

const directivesList = {
    debounce,
    permission
}

const directives = {
    install: function(Vue) {
        Object.keys(directivesList).forEach(key => {
            Vue.directive(key, directivesList[key])
        })
    }
}

export default directives
