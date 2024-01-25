const formatDateLabel = (dateString: string) => {
  const today = new Date();
  const messageDate = new Date(dateString);

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }
  if (
    messageDate.getDate() === today.getDate() - 1 &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return 'Yesterday';
  }
  // Customize the date format as needed
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(messageDate);
};

export default formatDateLabel;
