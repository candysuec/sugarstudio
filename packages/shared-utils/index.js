// simple logging helper
export function logInfo(service, message, meta = {}) {
  const payload = {
    ts: new Date().toISOString(),
    service,
    message,
    ...meta,
  };
  console.log("[INFO]", JSON.stringify(payload));
  return payload;
}

// tiny error wrapper
export function formatError(e) {
  if (!e) return "Unknown error";
  if (typeof e === "string") return e;
  if (e.message) return e.message;
  return JSON.stringify(e);
}
