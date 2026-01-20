/**
 * Formats an ISO date string to dd/mm/yyyy format.
 * Accepts either a plain date (yyyy-mm-dd) or a full ISO timestamp.
 */
export const formatDate = (isoDate?: string | null): string => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.slice(0, 10).split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
};

/**
 * Gets today's date in ISO format (yyyy-mm-dd)
 */
export const getTodayISO = (): string => {
  return new Date().toISOString().slice(0, 10);
};
