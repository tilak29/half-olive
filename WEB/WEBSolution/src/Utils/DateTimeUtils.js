import config from "../Config.json";
import moment from "moment";

export const getDisplayDate = (d) => {
  // return moment(d, config.appConfig.dbDateFormat).format(
  //   config.appConfig.dateFormatForGrid
  // );
  return moment(d).format(config.appConfig.dateFormatForGrid);
};

export const getDBFormateDate = (d) => {
  return moment(d, config.appConfig.dateFormatForGrid).format(
    config.appConfig.dbDateFormat
  );
};

export const getDBFormateDateForInlineGrid = (d) => {
  return moment(d).format(config.appConfig.dbDateFormat);
};

export const getDBFormateDateTime = (d) => {
  return moment(d, config.appConfig.dateFormatForGrid).format(
    config.appConfig.dbDateTimeFormat
  );
};

export const getPrintStampDateTime = (d) => {
  return moment(d).format(config.appConfig.dateTimeFormatForPrintStamp);
};

export const getDateFormatForDatePicker = (d) => {
  return moment(d, config.appConfig.dateFormatForGrid).format(
    config.appConfig.dbDateFormat
  );
};

export const getDCRFormatDate = (d) => {
  return moment(d).format("YYYY-MM-DD");
};

export const getAttendanceFormatDate = (d) => {
  return moment(d).format("DDMMMYYYY");
};

export const getAttendanceFormatTime = (d) => {
  return moment(d).format('hh:mm A');
};
export const getFormatTime = (h) => {
  return moment(h).subtract(330,'minute').format('HH:mm')
};

export const getBrowserFormatDate = (d) => {
  return moment(d).toDate();
};
