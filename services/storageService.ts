import { AnswerMap, Attempt } from '../types';
import { supabase } from './supabaseClient';

const STORAGE_KEY_ANSWERS = 'standalone_hogan_test_progress';
const STORAGE_KEY_USER = 'standalone_hogan_user_session';

export const saveProgress = (answers: AnswerMap) => {
  try {
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const loadProgress = (): AnswerMap => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ANSWERS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

export const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY_ANSWERS);
};



export const saveAttempt = async (userId: string, attempt: Attempt) => {
  const { error } = await supabase.from('attempts').insert({
    user_id: userId,
    attempt_number: attempt.number,
    answers: attempt.answers,
    result: attempt.result,
    completed_at: attempt.completedAt
  });

  if (error) {
    console.error('Error saving attempt:', error);
    throw error;
  }
};