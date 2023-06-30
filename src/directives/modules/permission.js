import { createLocalStorage } from '@/utils/cache'
import { isNullOrUnDef } from '@/utils/is'
const ls = createLocalStorage()

const permission = {
    mounted(el, binding) {
        const { value } = binding
        global.ButtonPermissions = ls.get('btnPermissionList')
        if (global.ButtonPermissions && !isNullOrUnDef(value) && value !== '' && global.ButtonPermissions.indexOf(value) < 0) {
            el.style.display = 'none'
        }
    }
}

export default permission
