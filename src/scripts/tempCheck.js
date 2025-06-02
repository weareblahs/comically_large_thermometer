import ky from "ky";

export const tempCheck = async () => {
  const date = new Date();
  const formatted = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const res = await ky.get("https://api.data.gov.my/weather/forecast/").json();
  const filtered = res.filter((r) => r.date == formatted);
  let total = 0;
  let count = 0;
  filtered.forEach((f) => {
    const avg = f.max_temp;
    total += avg;
    count++;
  });
  return [
    total / count + 7, // average according to google's weather data. adds 7 celsius to result for feels like weather
    count,
    total / count, // however this is the original info
  ];
};
