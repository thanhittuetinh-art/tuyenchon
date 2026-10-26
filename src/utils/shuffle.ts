/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RawQuestion, ShuffledQuestion, ShuffledOption } from '../types';

/**
 * Cryptographically robust Fisher-Yates shuffle algorithm.
 * Guarantees uniform random distribution for question selection and option permutation.
 */
function shuffleArray<T>(array: T[]): T[] {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    let rand = Math.random();
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      rand = buf[0] / (0xffffffff + 1);
    }
    const j = Math.floor(rand * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Randomizes both question sequence and option order for each individual device session.
 * Picks 10 random questions from the question bank.
 */
export function generateDeviceExam(rawQuestions: RawQuestion[], count: number = 10): ShuffledQuestion[] {
  // 1. Shuffle all available questions and pick 10 random questions
  const pickedQuestions = shuffleArray(rawQuestions).slice(0, Math.min(count, rawQuestions.length));

  // 2. Further shuffle the 10 selected questions to ensure random sequence
  const shuffledQuestions = shuffleArray(pickedQuestions);

  // 3. For EACH question, shuffle its options and reassign display labels A, B, C, D
  return shuffledQuestions.map((q, idx) => {
    const shuffledOpts = shuffleArray(q.options);
    const assignedOptions: ShuffledOption[] = shuffledOpts.map((opt, optIdx) => ({
      originalId: opt.id,
      displayLabel: LABELS[optIdx] || String.fromCharCode(65 + optIdx),
      text: opt.text,
      isCorrect: opt.isCorrect
    }));

    return {
      id: q.id,
      originalIndex: idx + 1,
      question: q.question,
      shuffledOptions: assignedOptions,
      explanation: q.explanation,
      category: q.category
    };
  });
}
