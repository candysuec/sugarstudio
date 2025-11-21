export function log(message, service = 'app') {
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      service,
      message,
    }),
  );
}
