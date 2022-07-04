const replaceParams = (path, key, value) => {
    return path.replace(key, value)
}

const replaceMultiParams = (path, keys, values) => {
    keys.map((item, index) => {
        path = path.replace(item, values[index])
    })
    return path
}

export {
    replaceParams,
    replaceMultiParams
}
