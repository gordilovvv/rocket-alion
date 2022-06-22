const dateFormatFull = new Intl.DateTimeFormat(
    'en',
    {
        minute: '2-digit',
        hour: '2-digit',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
);

const dateFormatTime = new Intl.DateTimeFormat(
    'ru',
    {
        minute: '2-digit',
        hour: '2-digit'
    }
);

const MS_IN_SECOND = 1000;

export function timestampToDate(ts) {
    const date = new Date(ts * MS_IN_SECOND);

    return dateFormatFull.format(date);
}

export function timestampToTime(ts) {
    const date = new Date(ts * MS_IN_SECOND);

    return dateFormatTime.format(date);
}