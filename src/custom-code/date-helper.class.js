class DateHelper {
  static getStartOfDayStrByStrDate(strDate) {
    const date = new Date(strDate);
    return DateHelper.setTimeToNullForDate(date).toJSON();
  }

  static getEndOfDayStrByStrDate(strDate) {
    const date = new Date(strDate);
    return DateHelper.setTimeToMaxForDate(date).toJSON();
  }

  static addMinutesToDate(dateStr, minutes) {
    const date = new Date(dateStr);
    const result = new Date(date.getTime() + minutes * 1000 * 60);
    return result.toJSON();
  }

  static setTimeToNullForDate(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
  static setTimeToMaxForDate(date) {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(59);
    return date;
  }
}

module.exports = DateHelper;
