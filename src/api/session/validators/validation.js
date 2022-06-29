module.exports = {
  checkValidBeginAndEnd(beginStr, endStr) {
    const begin = new Date(beginStr);
    const res = { isValid: false };
    if (isNaN(begin)) {
      res.message = 'begin invalid';
      return res;
    }
    const end = new Date(endStr);
    if (isNaN(end)) {
      res.message = 'end invalid';
      return res;
    }
    if (begin >= end) {
      res.message = 'endDate must be great then startDate.';
      return res;
    }
    res.isValid = true;
    return res;
  },
};
