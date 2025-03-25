export const useDateTimeFormat = () => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return { hours: "", minutes: "" };
    const [hours, minutes] = timeString.split(":");
    return {
      hours,
      minutes,
    };
  };

  return {
    formatDate,
    formatTime,
  };
};
