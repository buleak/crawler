

const init1 = (str) => {
    return +str
}

const init2 = (str) => {
    parseInt(str)
}

const init3 = (str) => {
    Number(str)
}

module.exports = {
    init1,
    init2,
    init3
}



