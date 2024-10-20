const setStartTimeSlot = (date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const setEndTimeSlot = (date) => {
  date.setHours(23);
  date.setMinutes(30);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const setCurrentTimeSlot = (date) => {
  let currentTime = new Date();
  let cuurentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  currentMinutes = currentMinutes > 30 ? 30 : 0;
  date.setHours(cuurentHours);
  date.setMinutes(currentMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const getDateOnlyString = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let dayOfMonth = date.getDate();
  let dateString = `${year}-${month}-${dayOfMonth}`;

  return dateString;
};

const geShortDayName = (date) => {
  let dayStr = date.toLocaleString('en-us', { weekday: 'long' });
  return dayStr.substring(0, 3);
};

const getLongDayName = (date) => {
  let dayStr = date.toLocaleString('en-us', { weekday: 'long' });
  return dayStr;
};

const getLongMonthName = (n = 0) => {
  const today = new Date();
  const dateString = new Date();
  dateString.setDate(1);
  dateString.setMonth(today.getMonth() - n);
  let monthStr = dateString.toLocaleString('en-us', { month: 'long' });
  return monthStr;
};

const getPastDate = (date, dayCount) => {
  return new Date(new Date().setDate(date.getDate() - dayCount));
};

const getPastMonth = (date, dayCount) => {
  return new Date(new Date().setDate(date.getMonth - dayCount));
};

function findDate(n = 0) {
  const today = new Date();
  const dateString = new Date();
  dateString.setDate(today.getDate() - n);
  const date = dateString.toISOString().slice(0, 10);
  return date;
}
function findDayOfMonth() {
  const today = new Date();
  const dateString = new Date();
  const day = dateString.toISOString().slice(8, 10);
  return day;
}

function findMonth(n = 0) {
  const today = new Date();
  const dateString = new Date();
  dateString.setDate(1);
  dateString.setMonth(today.getMonth() - n);
  const month = dateString.toISOString().slice(0, 7);
  return month;
}

function findMonthDayCount(monthString) {
  const monthComponents = monthString.split('-');
  const givenYear = Number(monthComponents[0]);
  const givenMonth = Number(monthComponents[1]);
  const nextMonthFirstDay = new Date(givenYear, givenMonth, 1);
  const givenMonthLastDayString = new Date(nextMonthFirstDay - 1);
  const givenMonthDayCount = givenMonthLastDayString.getDate();
  return givenMonthDayCount;
}

function getLastMonthLastDay() {
  const lastMonth = findMonth(1);
  const lastMonthDays = findMonthDayCount(lastMonth);
  const lastMonthLastDay = `${lastMonth}-${lastMonthDays}`;
  return lastMonthLastDay;
}

const formattedDate = (n = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let dayOfMonth = date.getDate();
  let dateString = `${dayOfMonth}-${month}-${year}`;
  return dateString;
};

const formattedMonth = (n = 0) => {
  const today = new Date();
  const dateString = new Date();
  dateString.setDate(1);
  dateString.setMonth(today.getMonth() - n);
  let year = dateString.getFullYear();
  let month = dateString.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let monthString = `01-${month}-${year}`; //month first day
  return monthString;
};

module.exports = {
  getDateOnlyString: getDateOnlyString,
  getPastDate: getPastDate,
  setStartTimeSlot: setStartTimeSlot,
  setEndTimeSlot: setEndTimeSlot,
  setCurrentTimeSlot: setCurrentTimeSlot,
  geShortDayName: geShortDayName,
  getLongDayName: getLongDayName,
  findDate: findDate,
  findMonth: findMonth,
  findDayOfMonth: findDayOfMonth,
  formattedDate: formattedDate,
  formattedMonth: formattedMonth,
  findMonthDayCount: findMonthDayCount,
  getLongMonthName: getLongMonthName,
  getLastMonthLastDay: getLastMonthLastDay,
};
