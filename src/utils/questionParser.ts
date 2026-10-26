/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RawQuestion, OptionItem } from '../types';

/**
 * Parses raw text formatted as questions and choices into RawQuestion objects.
 * Supports markers like `*A.`, `[x]`, `(đúng)`, `(đáp án đúng)` or red highlight hints.
 */
export function parseQuestionsFromText(text: string): RawQuestion[] {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  const questions: RawQuestion[] = [];
  let currentQ: Partial<RawQuestion> | null = null;
  let currentOptions: OptionItem[] = [];
  let optionCounter = 1;

  for (const line of lines) {
    // Check if line starts with Câu X / Question X / Bài X or number followed by dot
    const qMatch = line.match(/^(?:câu|question|bài|\d+[\.:])\s*(\d+)?[\.:\s-]\s*(.+)/i) || 
                   line.match(/^(\d+)\.\s*(.+)/);

    if (qMatch && !line.match(/^[A-Da-d][\.\)]/)) {
      if (currentQ && currentOptions.length >= 2) {
        questions.push({
          id: questions.length + 1,
          question: currentQ.question || `Câu hỏi ${questions.length + 1}`,
          options: currentOptions,
          category: currentQ.category || 'Đề thi ứng viên'
        });
      }
      currentQ = {
        question: (qMatch[2] || line).trim(),
        category: 'Đề thi ứng viên'
      };
      currentOptions = [];
      optionCounter = 1;
      continue;
    }

    // Check if line is an option: A. B. C. D. or *A. or [x] A.
    const optMatch = line.match(/^(\*|\(đúng\)|\[x\])?\s*([A-F])[\.\)]\s*(.+)/i);
    if (optMatch && currentQ) {
      const isMarkedCorrect = Boolean(optMatch[1]) || line.toLowerCase().includes('(đúng)') || line.toLowerCase().includes('*');
      const optText = optMatch[3].replace(/\(đúng\)|\*|\[x\]/gi, '').trim();
      currentOptions.push({
        id: `opt_${questions.length + 1}_${optMatch[2].toLowerCase()}_${optionCounter++}`,
        text: optText,
        isCorrect: isMarkedCorrect
      });
      continue;
    }

    // If continuation of current question
    if (currentQ && currentOptions.length === 0) {
      currentQ.question += ' ' + line;
    }
  }

  // Push last question
  if (currentQ && currentOptions.length >= 2) {
    questions.push({
      id: questions.length + 1,
      question: currentQ.question || `Câu hỏi ${questions.length + 1}`,
      options: currentOptions,
      category: currentQ.category || 'Đề thi ứng viên'
    });
  }

  // Ensure every question has at least one correct option; if none marked, default to option A
  questions.forEach(q => {
    const hasCorrect = q.options.some(o => o.isCorrect);
    if (!hasCorrect && q.options.length > 0) {
      q.options[0].isCorrect = true;
    }
  });

  return questions;
}
