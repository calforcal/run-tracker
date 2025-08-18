export function calculateElapsedTime(timeInSeconds: number): string {
  const totalMinutes: number = Math.floor(timeInSeconds / 60);

  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  const partialMinutes: number = timeInSeconds / 60 - totalMinutes;
  const seconds: number = Math.round(60 * partialMinutes);

  const stringMinutes: string =
    minutes < 10 ? `0${minutes}` : minutes.toString();

  const stringSeconds: string =
    seconds < 10 ? `0${seconds}` : seconds.toString();

  if (hours > 0) {
    return `${hours}:${stringMinutes}:${stringSeconds}`;
  }

  return `${stringMinutes}:${stringSeconds}`;
}
