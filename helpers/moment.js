const moment = require('moment');

module.exports = (date) => {
  return moment(date).format("dddd, YYYY MM DD HH:mm:ss");
}
