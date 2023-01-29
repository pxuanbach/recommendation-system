const processingRuntime = (runtime) => {
    let result = ""
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    if (hours > 0) {
        result = result + hours + "h "
    }
    if (minutes > 0) {
        result = result + minutes + "m "
    }
    return result
}

export {
    processingRuntime
}