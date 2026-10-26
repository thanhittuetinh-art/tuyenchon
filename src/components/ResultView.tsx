/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ExamSubmission, ShuffledQuestion } from '../types';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { 
  Trophy, 
  XCircle, 
  CheckCircle2, 
  Download, 
  Clock, 
  Award, 
  HelpCircle,
  AlertCircle,
  FileImage,
  Check
} from 'lucide-react';

interface ResultViewProps {
  submission: ExamSubmission;
  questions: ShuffledQuestion[];
}

export const ResultView: React.FC<ResultViewProps> = ({
  submission,
  questions
}) => {
  const isPassed = submission.passed; // score >= 7
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isPassed) {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#10b981', '#6366f1', '#f59e0b', '#3b82f6'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isPassed]);

  const minutesSpent = Math.floor(submission.timeSpentSeconds / 60);
  const secondsSpent = submission.timeSpentSeconds % 60;
  const timeFormatted = `${minutesSpent} phút ${secondsSpent} giây`;
  const formattedDateTime = new Date(submission.submittedAt).toLocaleString('vi-VN');

  // Generate and download high-resolution image of the result
  const handleDownloadImage = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      if (certificateRef.current) {
        // Use html2canvas for rich styled rendering
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2, // 2x high resolution
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true
        });

        const imageUri = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `Ket_Qua_Tuyen_Chon_${Date.now()}.png`;
        link.href = imageUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } else {
        // Canvas 2D fallback
        downloadDirectCanvas();
      }
    } catch (err) {
      console.error('Lỗi xuất ảnh với html2canvas, chuyển sang canvas trực tiếp:', err);
      downloadDirectCanvas();
    } finally {
      setIsExporting(false);
    }
  };

  const downloadDirectCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 800);

    // Top Header band
    ctx.fillStyle = isPassed ? '#059669' : '#475569';
    ctx.fillRect(0, 0, 1200, 24);

    // Title
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VÒNG TUYỂN CHỌN ỨNG VIÊN THAM GIA THỬ THÁCH', 600, 120);

    ctx.font = '22px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('KẾT QUẢ ĐÁNH GIÁ BÀI LÀM', 600, 165);

    // Score
    ctx.font = '900 120px sans-serif';
    ctx.fillStyle = isPassed ? '#059669' : '#334155';
    ctx.fillText(`${submission.score} / ${submission.totalQuestions}`, 600, 310);

    // Status message
    ctx.font = 'bold 38px sans-serif';
    ctx.fillStyle = isPassed ? '#047857' : '#334155';
    const statusText = isPassed 
      ? 'Chúc mừng bạn, bạn là người được chọn' 
      : 'Hãy cố gắng hơn vào lần sau';
    ctx.fillText(statusText, 600, 390);

    // Detailed metrics box
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(150, 440, 900, 180);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(150, 440, 900, 180);

    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.textAlign = 'left';
    ctx.fillText(`• Số câu đúng: ${submission.correctCount} / ${submission.totalQuestions} câu`, 200, 500);
    ctx.fillText(`• Thời gian hoàn thành: ${timeFormatted}`, 200, 550);
    ctx.fillText(`• Thời điểm nộp bài: ${formattedDateTime}`, 200, 600);

    // Footer
    ctx.textAlign = 'center';
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Hệ thống kiểm tra trực tuyến • Chứng nhận kết quả bài thi', 600, 720);

    const imageUri = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Ket_Qua_Tuyen_Chon_${Date.now()}.png`;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Auto-submission alert if finished by 4-minute timer */}
      {submission.isTimeOut && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-medium shadow-xs">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>
            <strong>Đã hết 4 phút làm bài!</strong> Hệ thống đã tự động khóa bài làm và nộp kết quả ngay lập tức để chấm điểm.
          </span>
        </div>
      )}

      {/* Main Score & Certificate Showcase (Captured as Image) */}
      <div 
        ref={certificateRef}
        className={`bg-white rounded-3xl border-2 p-8 md:p-12 text-center shadow-lg relative overflow-hidden ${
          isPassed ? 'border-emerald-300 shadow-emerald-50' : 'border-slate-200'
        }`}
      >
        {/* Top Decorative Color Bar */}
        <div className={`absolute top-0 left-0 right-0 h-3 ${
          isPassed ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500' : 'bg-gradient-to-r from-slate-400 to-slate-600'
        }`} />

        {/* Icon & Title */}
        <div className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          {isPassed ? (
            <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 ring-8 ring-emerald-50">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 ring-8 ring-slate-50">
              <Award className="w-10 h-10" />
            </div>
          )}
        </div>

        <p className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest mb-1.5">
          VÒNG TUYỂN CHỌN ỨNG VIÊN THAM GIA THỬ THÁCH
        </p>

        <h1 className="text-slate-600 text-sm md:text-base font-semibold uppercase tracking-wider mb-2">
          Kết Quả Đánh Giá Bài Làm
        </h1>

        {/* HUGE SCORE DISPLAY */}
        <div className="my-6">
          <div className="flex items-baseline justify-center gap-2">
            <span className={`text-8xl md:text-9xl font-black tracking-tight leading-none ${
              isPassed ? 'text-emerald-600' : 'text-slate-800'
            }`}>
              {submission.score}
            </span>
            <span className="text-3xl md:text-4xl font-bold text-slate-400">
              / {submission.totalQuestions}
            </span>
          </div>
          <span className="inline-block mt-2 text-sm font-semibold text-slate-500">
            (Đạt {submission.correctCount} trên tổng số {submission.totalQuestions} câu hỏi)
          </span>
        </div>

        {/* Exact Status Message as required */}
        <div className="max-w-xl mx-auto my-6">
          {isPassed ? (
            <div className="py-4 px-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 shadow-xs">
              <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-700 tracking-tight">
                Chúc mừng bạn, bạn là người được chọn
              </h2>
              <p className="text-xs sm:text-sm text-emerald-700/80 mt-1.5 font-medium">
                Bạn đã đạt từ 7 điểm trở lên và chính thức đủ điều kiện tham gia thử thách tiếp theo!
              </p>
            </div>
          ) : (
            <div className="py-4 px-6 rounded-2xl bg-slate-50 border-2 border-slate-300 text-slate-900 shadow-xs">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-700 tracking-tight">
                Hãy cố gắng hơn vào lần sau
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
                Điểm số yêu cầu để được chọn là từ 7 điểm trở lên. Hãy xem lại chi tiết đáp án bên dưới để trau dồi thêm.
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6 pt-6 border-t border-slate-100 text-left">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Số câu đúng</span>
            <span className="text-xl font-bold text-emerald-600">{submission.correctCount} câu</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Số câu sai</span>
            <span className="text-xl font-bold text-rose-600">
              {Object.keys(submission.answers).length - submission.correctCount} câu
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Chưa trả lời</span>
            <span className="text-xl font-bold text-slate-500">
              {submission.totalQuestions - Object.keys(submission.answers).length} câu
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Thời gian làm
            </span>
            <span className="text-xl font-bold text-slate-800">{timeFormatted}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 text-xs text-slate-400">
          Thời điểm hoàn thành: {formattedDateTime}
        </div>
      </div>

      {/* Prominent "TẢI FILE KẾT QUẢ" (FILE ẢNH) Feature Box */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
            <FileImage className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Lưu Giữ & Chứng Nhận Kết Quả
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Tải file ảnh (PNG) chụp đầy đủ điểm số, kết quả đạt chuẩn và thời gian làm bài về máy của bạn.
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadImage}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold text-base transition-all duration-200 cursor-pointer shadow-lg active:scale-95 shrink-0 ${
            downloadSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-300 hover:shadow-indigo-400'
          }`}
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Đang tạo file ảnh...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span>Đã tải file ảnh thành công!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Tải file kết quả (File ảnh)</span>
            </>
          )}
        </button>
      </div>

      {/* Detailed Question Review Section with Red Text for Correct Answers */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Chi Tiết Đáp Án Các Câu Hỏi</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Đáp án chính xác của từng câu được làm nổi bật với <strong className="text-red-600 font-bold">chữ màu đỏ</strong> theo quy định.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            10 / 10 Câu
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswerId = submission.answers[q.id];
            const userOption = q.shuffledOptions.find(o => o.originalId === userAnswerId);
            const isCorrect = userOption?.isCorrect === true;
            const isSkipped = !userAnswerId;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition-all ${
                  isSkipped
                    ? 'border-slate-200 bg-slate-50/50'
                    : isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm px-2.5 py-1 rounded-lg bg-slate-800 text-white">
                      Câu {idx + 1}
                    </span>
                    {q.category && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {q.category}
                      </span>
                    )}
                  </div>

                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đúng (+1.0 đ)
                      </span>
                    ) : isSkipped ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Chưa trả lời (0 đ)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Sai (0 đ)
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm md:text-base font-semibold text-slate-900 mb-4 leading-relaxed">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2 mb-3">
                  {q.shuffledOptions.map((opt) => {
                    const isSelected = userAnswerId === opt.originalId;
                    const isCorrectOpt = opt.isCorrect;

                    let optStyle = 'border-slate-200 bg-white text-slate-700';
                    let textStyle = 'text-slate-700';

                    if (isCorrectOpt) {
                      // Correct option with red text as instructed: "đáp án đúng được bôi chữ màu đỏ"
                      optStyle = 'border-red-400 bg-red-50/50 ring-1 ring-red-400';
                      textStyle = 'text-red-600 font-bold';
                    } else if (isSelected && !isCorrectOpt) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-800';
                      textStyle = 'text-rose-900 font-medium line-through';
                    }

                    return (
                      <div
                        key={opt.originalId}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs md:text-sm ${optStyle}`}
                      >
                        <span className={`w-6 h-6 rounded flex items-center justify-center font-bold shrink-0 ${
                          isCorrectOpt 
                            ? 'bg-red-600 text-white' 
                            : isSelected 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {opt.displayLabel}
                        </span>

                        <span className={`flex-1 pt-0.5 ${textStyle}`}>
                          {opt.text}
                        </span>

                        {isCorrectOpt && (
                          <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded shrink-0">
                            Đáp án đúng
                          </span>
                        )}
                        {isSelected && !isCorrectOpt && (
                          <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0">
                            Bạn đã chọn
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-800">Giải thích: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
