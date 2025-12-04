import { AnswerMap } from '../types';

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

export const saveUserSession = (email: string, token: string) => {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify({ email, token }));
};

export const loadUserSession = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const clearUserSession = () => {
  localStorage.removeItem(STORAGE_KEY_USER);
  clearProgress();
};