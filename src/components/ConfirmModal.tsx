/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  onCancel,
  onConfirm
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;
  const isFullyAnswered = unansweredCount === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all scale-100">
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-600">
            {isFullyAnswered ? (
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            ) : (
              <HelpCircle className="w-8 h-8 text-amber-600" />
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Bạn chắc chắn gửi đáp án ?
          </h3>

          <p className="text-sm text-slate-600 mb-5">
            Khi xác nhận nộp bài, hệ thống sẽ kết thúc lượt thi và tính điểm bài làm của bạn ngay lập tức.
          </p>

          {/* Answer Status Box */}
          <div className={`p-4 rounded-xl border text-left mb-6 ${
            isFullyAnswered
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center justify-between text-sm font-semibold mb-1">
              <span>Tiến độ hoàn thành:</span>
              <span className="font-bold text-base">{answeredCount} / {totalQuestions} câu</span>
            </div>

            {!isFullyAnswered ? (
              <div className="flex items-start gap-2 mt-2 pt-2 border-t border-amber-200 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  Bạn còn <strong>{unansweredCount} câu chưa chọn đáp án</strong>. Các câu chưa làm sẽ không có điểm.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-emerald-200 text-xs text-emerald-700">
                <CheckCircle className="w-4 h-4" />
                <span>Bạn đã hoàn thành toàn bộ 10 câu hỏi!</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Tiếp tục làm bài
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all cursor-pointer active:scale-95"
            >
              Xác nhận nộp bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
