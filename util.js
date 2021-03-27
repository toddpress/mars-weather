export const celsiusToFahrenheit = (celsius) => celsius * 1.8 + 32;
export const dateFormat = (date, dateStyle = 'long') =>
  new Intl.DateTimeFormat('en', { month:'short', day: 'numeric' }).format(
    new Date(date)
  );