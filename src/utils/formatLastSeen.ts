function formatLastSeen(lastSeenDate: string): string {
  const currentDate = new Date();
  const lastSeen = new Date(lastSeenDate);

  const timeDifference = currentDate.getTime() - lastSeen.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference === 0) {
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active today at ${formattedTime}`;
  }
  if (daysDifference === 1) {
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active yesterday at ${formattedTime}`;
  }
  if (daysDifference > 1 && daysDifference < 7) {
    return `last active ${rtf.format(-daysDifference, 'day')}`;
  }
  if (daysDifference >= 7 && daysDifference < 30) {
    const weeksDifference = Math.floor(daysDifference / 7);
    return `last active ${rtf.format(-weeksDifference, 'week')}`;
  }
  if (daysDifference >= 30 && daysDifference < 365) {
    const monthsDifference = Math.floor(daysDifference / 30);
    return `last seen ${rtf.format(-monthsDifference, 'month')}`;
  }
  const yearsDifference = Math.floor(daysDifference / 365);
  return `last seen ${rtf.format(-yearsDifference, 'year')}`;
}

export default formatLastSeen;
