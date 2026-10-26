/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { 
  ShuffledQuestion, 
  ExamStatus, 
  ExamSubmission 
} from './types';
import { DEFAULT_QUESTIONS } from './data/defaultQuestions';
import { generateDeviceExam } from './utils/shuffle';
import { Timer } from './components/Timer';
import { QuestionNavigator } from './components/QuestionNavigator';
import { QuestionCard } from './components/QuestionCard';
import { ConfirmModal } from './components/ConfirmModal';
import { ResultView } from './components/ResultView';
import { CandidateIntro } from './components/CandidateIntro';
import { Award, ShieldCheck, Wifi } from 'lucide-react';

const EXAM_DURATION_SECONDS = 240; // 4 minutes = 240 seconds

export default function App() {
  // Exam flow states
  const [examStatus, setExamStatus] = useState<ExamStatus>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<Set<number>>(new Set());
  const [startedAt, setStartedAt] = useState<number>(0);
  const [submission, setSubmission] = useState<ExamSubmission | null>(null);

  // Submit confirmation modal
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  // Start exam: picks 10 random questions from PDF question set, randomizes order and options
  const handleStartExam = () => {
    const randomized = generateDeviceExam(DEFAULT_QUESTIONS, 10);
    setShuffledQuestions(randomized);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestionIds(new Set());
    setStartedAt(Date.now());
    setSubmission(null);
    setIsConfirmOpen(false);
    setExamStatus('in_progress');
  };

  // Select an option for current question
  const handleSelectOption = (optionOriginalId: string) => {
    if (examStatus !== 'in_progress') return;
    const currentQ = shuffledQuestions[currentQuestionIndex];
    if (!currentQ) return;

    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionOriginalId
    }));
  };

  // Toggle flag on current question
  const handleToggleFlag = () => {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    if (!currentQ) return;

    setFlaggedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  // Jump to next unanswered question
  const handleJumpNextUnanswered = () => {
    const unansweredIndex = shuffledQuestions.findIndex(q => !answers[q.id]);
    if (unansweredIndex !== -1) {
      setCurrentQuestionIndex(unansweredIndex);
    }
  };

  // Calculate score and finish exam
  const handleFinishExam = useCallback((isTimeOut: boolean = false) => {
    setIsConfirmOpen(false);

    let correctCount = 0;
    shuffledQuestions.forEach(q => {
      const userChoiceId = answers[q.id];
      const correctOpt = q.shuffledOptions.find(o => o.isCorrect);
      if (userChoiceId && correctOpt && userChoiceId === correctOpt.originalId) {
        correctCount += 1;
      }
    });

    const total = shuffledQuestions.length;
    // Score out of 10 points
    const finalScore = Math.round((correctCount / (total || 1)) * 10 * 10) / 10;
    const timeSpent = Math.max(1, Math.min(EXAM_DURATION_SECONDS, Math.round((Date.now() - startedAt) / 1000)));

    const resultSubmission: ExamSubmission = {
      candidate: { name: '', candidateCode: '', roomOrClass: '' },
      startedAt,
      submittedAt: Date.now(),
      timeSpentSeconds: timeSpent,
      score: finalScore,
      correctCount,
      totalQuestions: total,
      answers,
      isTimeOut,
      passed: finalScore >= 7 // >= 7 points required to be selected
    };

    setSubmission(resultSubmission);
    setExamStatus('completed');
  }, [shuffledQuestions, answers, startedAt]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const hasUnanswered = answeredCount < shuffledQuestions.length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm md:text-base text-slate-900 leading-tight block uppercase">
                VÒNG TUYỂN CHỌN ỨNG VIÊN THAM GIA THỬ THÁCH
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                10 Câu Hỏi &bull; Thời gian 4 phút (240 giây)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Countdown Timer in Seconds */}
            {examStatus === 'in_progress' && (
              <Timer
                totalSeconds={EXAM_DURATION_SECONDS}
                onTimeUp={() => handleFinishExam(true)}
              />
            )}

            {/* Quick status indicator */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 font-medium px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sẵn sàng 100-200 thiết bị</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col justify-center">
        {/* State 1: Ultra-clean Landing with Title & Big Start Button (no question management) */}
        {examStatus === 'intro' && (
          <CandidateIntro
            onStartExam={handleStartExam}
          />
        )}

        {/* State 2: Active Exam Screen */}
        {examStatus === 'in_progress' && currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Question Area (8 cols) */}
            <div className="lg:col-span-8">
              <QuestionCard
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                totalQuestions={shuffledQuestions.length}
                selectedOptionId={answers[currentQuestion.id]}
                isFlagged={flaggedQuestionIds.has(currentQuestion.id)}
                onSelectOption={handleSelectOption}
                onToggleFlag={handleToggleFlag}
                onPrev={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                onNext={() => {
                  if (currentQuestionIndex < shuffledQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    setIsConfirmOpen(true);
                  }
                }}
                onJumpNextUnanswered={handleJumpNextUnanswered}
                hasUnansweredQuestions={hasUnanswered}
              />
            </div>

            {/* Question Navigator Sidebar (4 cols) */}
            <div className="lg:col-span-4 sticky top-24">
              <QuestionNavigator
                questions={shuffledQuestions}
                currentIndex={currentQuestionIndex}
                answers={answers}
                flaggedQuestionIds={flaggedQuestionIds}
                onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
                onRequestSubmit={() => setIsConfirmOpen(true)}
              />
            </div>
          </div>
        )}

        {/* State 3: Result & Detailed Review Screen */}
        {examStatus === 'completed' && submission && (
          <ResultView
            submission={submission}
            questions={shuffledQuestions}
          />
        )}
      </main>

      {/* Submit Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        totalQuestions={shuffledQuestions.length}
        answeredCount={answeredCount}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => handleFinishExam(false)}
      />

      {/* Footer */}
      <footer className="mt-auto py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; VÒNG TUYỂN CHỌN ỨNG VIÊN THAM GIA THỬ THÁCH</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mỗi thiết bị tự động đảo ngẫu nhiên câu hỏi & đáp án</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
