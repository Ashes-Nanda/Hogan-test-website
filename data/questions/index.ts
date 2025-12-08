import { Question } from '../../types';
import { HPI_QUESTIONS } from './hpi';
import { HDS_QUESTIONS } from './hds';
import { MVPI_QUESTIONS } from './mvpi';
import { HBRI_QUESTIONS } from './hbri';

export const MOCK_QUESTIONS: Question[] = [
    ...HPI_QUESTIONS,
    ...HDS_QUESTIONS,
    ...MVPI_QUESTIONS,
    ...HBRI_QUESTIONS
];
