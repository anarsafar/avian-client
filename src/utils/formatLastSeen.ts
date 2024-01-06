function formatLastSeen(lastSeenDate: string): string {
  const currentDate = new Date();
  const lastSeen = new Date(lastSeenDate);

  const timeDifference = currentDate.getTime() - lastSeen.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // Use 24-hour format
  };

  if (hoursDifference < 24) {
    if (hoursDifference < 1) {
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      return `last active ${minutesDifference} minute${
        minutesDifference === 1 ? '' : 's'
      } ago`;
    }
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active ${formattedTime}`;
  }
  if (hoursDifference < 48) {
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active yesterday at ${formattedTime}`;
  }
  if (hoursDifference < 168) {
    const daysDifference = Math.floor(hoursDifference / 24);
    return rtf.format(-daysDifference, 'day');
  }
  if (hoursDifference < 672) {
    const weeksDifference = Math.floor(hoursDifference / (24 * 7));
    return rtf.format(-weeksDifference, 'week');
  }
  if (hoursDifference < 8760) {
    const monthsDifference = Math.floor(hoursDifference / (24 * 30));
    return rtf.format(-monthsDifference, 'month');
  }
  const yearsDifference = Math.floor(hoursDifference / (24 * 365));
  return rtf.format(-yearsDifference, 'year');
}

export default formatLastSeen;
