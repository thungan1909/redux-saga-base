export const ACTION_TYPES = (action) => ({
  ORIGIN: action,
  HANDLER: `${action}_HANDLER`,
  SUCCESS: `${action}_SUCCESS`,
  FAIL: `${action}_FAIL`,
});
