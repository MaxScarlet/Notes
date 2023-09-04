/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns Formatted date difference between
 * @date1  start date
 * @date2  end date
 */
function getDateDiff(date1, date2) {
    const milliseconds = date1 - date2;
    let value = timeConvert(milliseconds);
    return `${value.days % 30} days - ${value.hours % 24}:${padTo2Digits(
        value.minutes % 60
    )}:${padTo2Digits(value.seconds % 60)} are left to complete`;
}

/**
 *
 * @param {Date} time
 * @returns days, hours, minutes and seconds
 */
function timeConvert(time) {
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

/**
 * @param {number} num
 * @returns String padded with 0
 */
function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}

/**
 *
 * @param {String} dateString
 * @returns Formatted date as en-IL locale date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };

    return date.toLocaleDateString("en-IL", options).replace("at", "");
}

/**
*
* @param {Date} date
* @returns return date formatted as "YYYY-MM-DDTHH:MM:SS"
*/
function dateStr(date) {
    return date.toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
}