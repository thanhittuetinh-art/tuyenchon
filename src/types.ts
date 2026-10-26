/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface RawQuestion {
  id: number;
  question: string;
  options: OptionItem[];
  explanation?: string;
  category?: string;
}

export interface ShuffledOption {
  originalId: string;
  displayLabel: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
}

export interface ShuffledQuestion {
  id: number;
  originalIndex: number;
  question: string;
  shuffledOptions: ShuffledOption[];
  explanation?: string;
  category?: string;
}

export interface CandidateInfo {
  name: string;
  candidateCode: string;
  roomOrClass: string;
}

export type ExamStatus = 'intro' | 'in_progress' | 'completed';

export interface ExamSubmission {
  candidate: CandidateInfo;
  startedAt: number;
  submittedAt: number;
  timeSpentSeconds: number;
  score: number; // 0 to 10
  correctCount: number;
  totalQuestions: number;
  answers: Record<number, string>; // questionId -> selected originalOptionId
  isTimeOut: boolean;
  passed: boolean; // score >= 7
}
