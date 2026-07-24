import { useEffect, useRef, useState, useCallback } from "react";
import { TIMEOUTS } from "../constants";

interface UseSessionTimeoutOptions {
  timeoutMs?: number;
  warningMs?: number;
  onTimeout: () => void;
  onWarning?: () => void;
}

export function useSessionTimeout({
  timeoutMs = TIMEOUTS.SESSION_IDLE_MS,
  warningMs = TIMEOUTS.SESSION_WARNING_MS,
  onTimeout,
  onWarning,
}: UseSessionTimeoutOptions) {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(Math.floor(warningMs / 1000));

  const timeoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback(() => {
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  }, []);

  const startCountdown = useCallback(() => {
    setSecondsRemaining(Math.floor(warningMs / 1000));
    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [warningMs]);

  const resetTimer = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);

    const warningDelay = timeoutMs - warningMs;

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      if (onWarning) onWarning();
      startCountdown();
    }, warningDelay);

    timeoutTimerRef.current = setTimeout(() => {
      clearAllTimers();
      setShowWarning(false);
      onTimeout();
    }, timeoutMs);
  }, [clearAllTimers, timeoutMs, warningMs, onWarning, onTimeout, startCountdown]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    const handleUserActivity = () => {
      if (!showWarning) {
        resetTimer();
      }
    };

    events.forEach((event) => window.addEventListener(event, handleUserActivity));
    resetTimer();

    return () => {
      clearAllTimers();
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
    };
  }, [resetTimer, showWarning, clearAllTimers]);

  return {
    showWarning,
    secondsRemaining,
    extendSession: resetTimer,
  };
}
