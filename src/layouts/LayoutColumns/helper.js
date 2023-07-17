export const currentRouteTopActivity = (path, menus) => {
    for(let i = 0; i<menus.length; i++) {
        const item = menus[i]

        if(item.path == path) return item
        if(item.children && item.children.length > 0) {
            const find = currentRouteTopActivity(path, item.children)
            console.log('find', find)
            if(find) return item
        }
    }
    return false
}
