
export function extractLogEventAndArgs(logs: any) {
  const { event, args, address } = logs;
  return {
    event,
    address,
    args,
  };
}
