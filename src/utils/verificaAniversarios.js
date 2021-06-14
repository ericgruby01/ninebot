const birthdays = require('./birthdays.json');

const getAllIndexes = (arr, val) => {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indexes.push(i);
        }
    }
    return indexes;
}

const stringifyNames = names => {
    var result = ""
    if (names.length === 1) {
        result = names[0]
    } else {
        for (i = 0; i < names.length; i++) {
            result += i === names.length-1 ? `e ${names[i]}` : i === names.length-2 ? `${names[i]} ` : `${names[i]}, `
        }
    }
    return result
}

module.exports = (date) => {
    const birthdayNames = Object.keys(birthdays)
    const birthdayDates = Object.values(birthdays)

    const todayBirthDayIndexes = getAllIndexes(birthdayDates, date)

    if (todayBirthDayIndexes.length === 0) {
        return false
    }

    const todayBirthDayNames = todayBirthDayIndexes.reduce((names, index) => {
        names.push(birthdayNames[index])
        return names
    }, [])

    return `**FELIZ ANIVERSÁRIO, ${stringifyNames(todayBirthDayNames).toUpperCase()}!!! :confetti_ball::tada:**`
}