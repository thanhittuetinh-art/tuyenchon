/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShuffledQuestion } from '../types';
import { Check, Flag, Send } from 'lucide-react';

interface QuestionNavigatorProps {
  questions: ShuffledQuestion[];
  currentIndex: number;
  answers: Record<number, string>;
  flaggedQuestionIds: Set<number>;
  onSelectQuestion: (index: number) => void;
  onRequestSubmit: () => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  currentIndex,
  answers,
  flaggedQuestionIds,
  onSelectQuestion,
  onRequestSubmit
}) => {
  const answeredCount = Object.keys(answers).length;
  const total = questions.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Danh Sách Câu Hỏi</h3>
          <p className="text-xs text-slate-500 mt-0.5">Bấm vào số để chuyển câu tự do</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          {answeredCount}/{total} câu
        </span>
      </div>

      {/* Grid of question buttons 1 to 10 */}
      <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 mb-5">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = Boolean(answers[q.id]);
          const isFlagged = flaggedQuestionIds.has(q.id);

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-11 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-400 ring-offset-1'
                  : isAnswered
                  ? 'bg-emerald-50 text-emerald-800 border-2 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
              title={`Câu ${idx + 1}: ${isAnswered ? 'Đã trả lời' : 'Chưa trả lời'}${isFlagged ? ' (Đã đánh dấu)' : ''}`}
            >
              <span>{idx + 1}</span>

              {/* Status indicators */}
              {isAnswered && !isCurrent && (
                <Check className="w-3.5 h-3.5 text-emerald-600 absolute bottom-1 right-1" strokeWidth={3} />
              )}
              {isFlagged && (
                <Flag className="w-3 h-3 text-amber-500 fill-amber-500 absolute top-1 left-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600 mb-5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300 inline-block" />
          <span>Đã trả lời</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block" />
          <span>Đang chọn</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200 inline-block" />
          <span>Chưa trả lời</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flag className="w-3 h-3 text-amber-500 fill-amber-500 inline-block" />
          <span>Đã đánh dấu</span>
        </div>
      </div>

      {/* Submit button on sidebar */}
      <button
        onClick={onRequestSubmit}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm shadow-emerald-200 transition-all cursor-pointer active:scale-[0.98]"
      >
        <Send className="w-4 h-4" />
        <span>Nộp Bài Thi</span>
      </button>
    </div>
  );
};
