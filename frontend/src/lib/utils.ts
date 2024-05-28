export function formatDateTime(dateTimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateTime = new Date(dateTimeString);
  const formattedDateTime = new Intl.DateTimeFormat("zh-CN", options).format(dateTime);

  return formattedDateTime;
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}