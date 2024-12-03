/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import { startCronJob } from "./src/cron.js";

async function loadEnv() {
  await import("./src/env.js");
}

loadEnv();

startCronJob();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
