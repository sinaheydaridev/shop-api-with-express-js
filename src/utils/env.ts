export const env = (key: string, defaultValue: unknown = undefined) => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    return undefined;
  } else if (!value && defaultValue) {
    return defaultValue;
  }
  return value;
};
