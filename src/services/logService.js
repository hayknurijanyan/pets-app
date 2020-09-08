import Raven from "raven-js";

function init() {
  Raven.config(
    "https://0c372283dba344a5973bc6a9fecaea2c@o444599.ingest.sentry.io/5419706",
    {
      release: "charo@1.3.0",
    }
  ).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log,
};
