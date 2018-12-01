const moment = require ('momentjs')

function getDuration(startTime,endTime) {
    return endTime.getTime() - startTime.getTime()
}

module.exports = getDuration