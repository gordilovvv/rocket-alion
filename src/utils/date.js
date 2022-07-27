import moment from "moment";

export function timestampToDate(ts) {
    return moment(ts).format('MMMM Do YYYY, h:mm a');
}

export function timestampToTime(ts) {
    return moment().from(ts);
}