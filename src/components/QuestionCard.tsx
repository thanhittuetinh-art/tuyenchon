/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShuffledQuestion } from '../types';
import { Flag, ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface QuestionCardProps {
  question: ShuffledQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  isFlagged: boolean;
  onSelectOption: (optionId: string) => void;
  onToggleFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJumpNextUnanswered?: () => void;
  hasUnansweredQuestions?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedOptionId,
  isFlagged,
  onSelectOption,
  onToggleFlag,
  onPrev,
  onNext,
  onJumpNextUnanswered,
  hasUnansweredQuestions = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col justify-between min-h-[500px]">
      <div>
        {/* Header of Question Card */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-xs">
              Câu {questionIndex + 1} / {totalQuestions}
            </span>
            {question.category && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {question.category}
              </span>
            )}
          </div>

          <button
            onClick={onToggleFlag}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              isFlagged
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Đánh dấu câu hỏi để xem lại sau"
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>{isFlagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
          </button>
        </div>

        {/* Question Text */}
        <h2 className="text-lg md:text-xl font-semibold text-slate-900 leading-relaxed mb-6">
          {question.question}
        </h2>

        {/* Shuffled Options */}
        <div className="space-y-3.5 mb-8">
          {question.shuffledOptions.map((opt) => {
            const isSelected = selectedOptionId === opt.originalId;

            return (
              <div
                key={opt.originalId}
                onClick={() => onSelectOption(opt.originalId)}
                className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 select-none ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-1 ring-indigo-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {opt.displayLabel}
                </div>

                {/* Option Content Text */}
                <span
                  className={`text-sm md:text-base leading-relaxed pt-0.5 flex-1 ${
                    isSelected ? 'text-indigo-950 font-medium' : 'text-slate-800'
                  }`}
                >
                  {opt.text}
                </span>

                {/* Radio selection check icon */}
                <div className="pt-1 shrink-0">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
            questionIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {hasUnansweredQuestions && onJumpNextUnanswered && (
          <button
            onClick={onJumpNextUnanswered}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 underline decoration-dotted cursor-pointer px-2 py-1"
          >
            Đến câu chưa làm
          </button>
        )}

        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <span>{questionIndex === totalQuestions - 1 ? 'Xem lại' : 'Câu tiếp theo'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
