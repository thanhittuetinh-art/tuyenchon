/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface TimerProps {
  totalSeconds: number; // 240 seconds (4 minutes)
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeUp, isPaused = false }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const endTimeRef = useRef<number>(Date.now() + totalSeconds * 1000);
  const onTimeUpCalledRef = useRef<boolean>(false);

  useEffect(() => {
    endTimeRef.current = Date.now() + totalSeconds * 1000;
    onTimeUpCalledRef.current = false;
  }, [totalSeconds]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diffMs = endTimeRef.current - now;
      const left = Math.max(0, Math.ceil(diffMs / 1000));

      setRemainingSeconds(left);

      if (left <= 0 && !onTimeUpCalledRef.current) {
        onTimeUpCalledRef.current = true;
        clearInterval(interval);
        onTimeUp();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isPaused, onTimeUp]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const mmss = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // When 10 seconds or less left: show prominent red border
  const isLast10Seconds = remainingSeconds <= 10;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl font-mono transition-all duration-200 shadow-sm ${
          isLast10Seconds
            ? 'border-4 border-red-600 ring-4 ring-red-300 bg-red-50 text-red-600 animate-pulse'
            : remainingSeconds <= 60
            ? 'border-2 border-amber-400 bg-amber-50 text-amber-800'
            : 'border-2 border-indigo-200 bg-white text-slate-800'
        }`}
        aria-label={`Thời gian còn lại: ${remainingSeconds} giây (${mmss})`}
      >
        {isLast10Seconds ? (
          <AlertCircle className="w-5 h-5 text-red-600 animate-bounce" />
        ) : (
          <Clock className="w-5 h-5 text-indigo-600" />
        )}

        {/* Display in seconds as requested (đếm ngược từ 4 phút tính ra giây) */}
        <div className="flex items-baseline gap-1.5">
          <span className={`text-2xl sm:text-3xl font-black tracking-tight ${
            isLast10Seconds ? 'text-red-600' : 'text-slate-900'
          }`}>
            {remainingSeconds}
          </span>
          <span className={`text-xs font-bold font-sans uppercase ${
            isLast10Seconds ? 'text-red-600' : 'text-slate-500'
          }`}>
            giây
          </span>
          <span className="text-xs font-sans text-slate-400 font-medium pl-1 hidden sm:inline">
            ({mmss})
          </span>
        </div>

        {isLast10Seconds && (
          <span className="text-[11px] font-sans font-extrabold px-1.5 py-0.5 rounded bg-red-600 text-white animate-pulse">
            Sắp hết giờ!
          </span>
        )}
      </div>
    </div>
  );
};
