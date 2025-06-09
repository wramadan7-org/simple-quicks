import moment from "moment-timezone";

const localTimeZone = moment.tz.guess(); // Deteksi zona waktu lokal

export const formatDate = (
  dateParam: string | number,
  formatParam: string
): string => {
  if (!dateParam || dateParam === "-") return "-";

  const date =
    typeof dateParam === "number"
      ? moment.unix(dateParam)
      : moment.utc(dateParam);

  return date.tz(localTimeZone).format(formatParam) || "-";
};

export const convertDateTimeToEpoch = (dateParam: string | Date): string => {
  if (!dateParam) return "";

  let momentDate;

  if (dateParam instanceof Date) {
    momentDate = moment.tz(dateParam, localTimeZone);
  } else {
    // Anggap string dalam format YYYY-MM-DD, bisa kamu sesuaikan kalau perlu
    momentDate = moment.tz(dateParam, "YYYY-MM-DD", true, localTimeZone);
  }

  const isValid = momentDate.isValid();

  return isValid ? String(momentDate.unix()) : "";
};

export const convertDateTimeForFormatChat = (dateParam: number) => {
  return moment.unix(dateParam).tz(localTimeZone).calendar(null, {
    sameDay: "[Today], MMMM DD YYYY",
    lastDay: "[Yesterday], MMMM DD YYYY",
    lastWeek: "dddd, MMM DD YYYY",
    sameElse: "dddd, MMMM DD YYYY",
  });
};

export const convertEpochToDate = (epoch?: number | string): Date => {
  const date =
    typeof epoch === "number"
      ? moment.unix(epoch).tz(localTimeZone).toDate()
      : moment.utc(epoch).tz(localTimeZone).toDate();

  return date;
};

export const convertEpochToDeadlineDuration = (epoch: number): string => {
  if (!epoch) return "";

  const now = moment().tz(localTimeZone).startOf("day");
  const deadline = moment.unix(epoch).tz(localTimeZone).startOf("day");

  const dayDuration = deadline.diff(now, "days");

  if (dayDuration > 7) return "";
  if (dayDuration > 1 && dayDuration < 7) return `${dayDuration} Days Left`;
  if (dayDuration === 1) return `Tomorrow`;
  if (dayDuration === 0) return `Today`;
  if (dayDuration === -1) return `Yesterday`;

  const overdueDuration = Math.abs(dayDuration);

  return overdueDuration >= 7 ? "Overdue" : `${overdueDuration} Days Overdue`;
};
