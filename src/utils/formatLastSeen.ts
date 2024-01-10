function formatLastSeen(lastSeenDate: string): string {
  const currentDate = new Date();
  const lastSeen = new Date(lastSeenDate);

  const timeDifference = currentDate.getTime() - lastSeen.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(hoursDifference / 24);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  if (currentDate.getDate() === lastSeen.getDate()) {
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active today at ${formattedTime}`;
  }
  if (currentDate.getDate() - lastSeen.getDate() === 1) {
    const formattedTime = lastSeen.toLocaleTimeString('en-US', timeOptions);
    return `last active yesterday at ${formattedTime}`;
  }

  if (daysDifference < 30) {
    const formattedDate = lastSeen.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    return `last active on ${formattedDate}`;
  }
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (daysDifference < 365) {
    return `last active ${rtf.format(-monthsDifference, 'month')}`;
  }
  return `last active ${rtf.format(-yearsDifference, 'year')}`;
}

export default formatLastSeen;
