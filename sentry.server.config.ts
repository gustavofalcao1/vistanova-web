// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://69e5be423a0927fb27906ebf5f4f0835@o4509454078050304.ingest.de.sentry.io/4509454081720400",

  integrations: [
    nodeProfilingIntegration(),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
  profileSessionSampleRate: 1.0,

  // Trace lifecycle automatically enables profiling during active traces
  profileLifecycle: "trace",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
