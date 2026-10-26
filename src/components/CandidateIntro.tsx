/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play } from 'lucide-react';

interface CandidateIntroProps {
  onStartExam: () => void;
}

export const CandidateIntro: React.FC<CandidateIntroProps> = ({
  onStartExam
}) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl w-full mx-auto space-y-10 py-12">
        {/* Title exactly as requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase drop-shadow-xs">
          VÒNG TUYỂN CHỌN ỨNG VIÊN THAM GIA THỬ THÁCH
        </h1>

        {/* Big Start Button */}
        <div className="pt-4">
          <button
            onClick={onStartExam}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 sm:px-14 sm:py-6 text-xl sm:text-2xl font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 rounded-3xl shadow-xl shadow-indigo-300 hover:shadow-2xl hover:shadow-indigo-400 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Bắt đầu</span>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
