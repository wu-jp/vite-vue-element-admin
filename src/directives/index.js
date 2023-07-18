import debounce from '@/directives/modules/debounce.js'
import permission from '@/directives/modules/permission'
import copy from './modules/copy'
import throttle from './modules/throttle'
import longpress from './modules/longpress.js'

const directivesList = {
    debounce,
    permission,
    copy,
    throttle,
    longpress
}

const directives = {
    install: function(Vue) {
        Object.keys(directivesList).forEach(key => {
            Vue.directive(key, directivesList[key])
        })
    }
}

export default directives
