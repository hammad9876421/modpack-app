import {
  getPrimaryMirror,
  getNextMirror,
} from "./mirrorEngine";

const MAX_RETRIES = 3;

export function createRetryState() {
  return {
    retries: 0,
    mirror: getPrimaryMirror(),
    failed: false,
  };
}

export function nextRetry(state) {
  if (state.retries >= MAX_RETRIES) {
    return {
      ...state,
      failed: true,
    };
  }

  const nextMirror = getNextMirror(
    state.mirror.id
  );

  return {
    retries: state.retries + 1,
    mirror: nextMirror || state.mirror,
    failed: nextMirror === null,
  };
}

export function canRetry(state) {
  return !state.failed;
}
