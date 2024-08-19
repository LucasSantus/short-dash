import { sleep } from "./sleep";

export async function requestDelay<T>(
  callback: () => Promise<T>,
  delay: number = 600,
): Promise<T> {
  const [data] = await Promise.all([callback(), sleep(delay)]);

  return data;
}
