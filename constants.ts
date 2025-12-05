import { Question, User, TestStatus } from './types';

// Visual to Logical Mapping
// Visual to Logical Mapping
// 4-point Likert Scale (SD to SA)
// Visual 1 (SD) -> Logical 1
// Visual 2 (D)  -> Logical 2
// Visual 3 (A)  -> Logical 4
// Visual 4 (SA) -> Logical 5
export const VISUAL_TO_LOGICAL_MAP: Record<number, number> = {
  1: 1, // SD
  2: 2, // D
  3: 4, // A
  4: 5  // SA
};

export const TOTAL_QUESTIONS = 76;
export const QUESTIONS_PER_PAGE = 10;
export const COMPANY_DOMAIN = "c4e.in"; // Updated domain

// Questions from hoganSample.ts
export const MOCK_QUESTIONS: Question[] = [
  // HPI Questions - Adjustment
  {
    id: "hpi_adj_1",
    text: "I remain calm under pressure.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_2",
    text: "I worry about things that might go wrong.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_3",
    text: "I feel confident in most situations.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_4",
    text: "I get stressed easily.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_5",
    text: "I handle criticism well.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_6",
    text: "I am emotionally stable.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_7",
    text: "I bounce back quickly from setbacks.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },
  {
    id: "hpi_adj_8",
    text: "I am easily overwhelmed by problems.",
    dimensionType: "HPI",
    dimensionName: "Adjustment"
  },

  // HPI Questions - Ambition
  {
    id: "hpi_amb_1",
    text: "I enjoy being in charge of projects.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_2",
    text: "I am competitive by nature.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_3",
    text: "I strive to be the best at what I do.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_4",
    text: "I prefer to work behind the scenes.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_5",
    text: "I want to advance in my career.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_6",
    text: "I enjoy taking on leadership roles.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_7",
    text: "I am comfortable with responsibility.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },
  {
    id: "hpi_amb_8",
    text: "I prefer to follow rather than lead.",
    dimensionType: "HPI",
    dimensionName: "Ambition"
  },

  // HPI Questions - Sociability
  {
    id: "hpi_soc_1",
    text: "I enjoy meeting new people.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_2",
    text: "I am energized by social interactions.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_3",
    text: "I prefer working in groups.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_4",
    text: "I am comfortable speaking in public.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_5",
    text: "I enjoy being the center of attention.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_6",
    text: "I prefer quiet, solitary activities.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_7",
    text: "I make friends easily.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },
  {
    id: "hpi_soc_8",
    text: "I need time alone to recharge.",
    dimensionType: "HPI",
    dimensionName: "Sociability"
  },

  // HPI Questions - Interpersonal Sensitivity
  {
    id: "hpi_int_1",
    text: "I am good at reading people's emotions.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_2",
    text: "I care about others' feelings.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_3",
    text: "I am empathetic towards others.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_4",
    text: "I notice when someone is upset.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_5",
    text: "I am tactful in my communication.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_6",
    text: "I am diplomatic in difficult situations.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_7",
    text: "I am sensitive to criticism.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },
  {
    id: "hpi_int_8",
    text: "I am good at resolving conflicts.",
    dimensionType: "HPI",
    dimensionName: "Interpersonal Sensitivity"
  },

  // HPI Questions - Prudence
  {
    id: "hpi_pru_1",
    text: "I always follow through on my commitments.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_2",
    text: "I am very organized.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_3",
    text: "I plan things carefully.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_4",
    text: "I am reliable and dependable.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_5",
    text: "I think before I act.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_6",
    text: "I am detail-oriented.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_7",
    text: "I am self-disciplined.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },
  {
    id: "hpi_pru_8",
    text: "I am careful and cautious.",
    dimensionType: "HPI",
    dimensionName: "Prudence"
  },

  // HPI Questions - Inquisitiveness
  {
    id: "hpi_inq_1",
    text: "I enjoy learning new things.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_2",
    text: "I am curious about the world around me.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_3",
    text: "I enjoy intellectual discussions.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_4",
    text: "I like to explore new ideas.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_5",
    text: "I enjoy solving complex problems.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_6",
    text: "I am interested in abstract concepts.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_7",
    text: "I enjoy reading about various topics.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },
  {
    id: "hpi_inq_8",
    text: "I prefer practical over theoretical knowledge.",
    dimensionType: "HPI",
    dimensionName: "Inquisitiveness"
  },

  // HPI Questions - Learning Approach
  {
    id: "hpi_learn_1",
    text: "I learn best by doing.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_2",
    text: "I prefer hands-on learning experiences.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_3",
    text: "I learn best through observation.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_4",
    text: "I prefer structured learning environments.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_5",
    text: "I learn best through discussion.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_6",
    text: "I prefer learning from books.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_7",
    text: "I learn best through trial and error.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },
  {
    id: "hpi_learn_8",
    text: "I prefer learning from others' experiences.",
    dimensionType: "HPI",
    dimensionName: "Learning Approach"
  },

  // HDS Questions - Excitable
  {
    id: "hds_exc_1",
    text: "I get upset when things don't go my way.",
    dimensionType: "HDS",
    dimensionName: "Excitable"
  },
  {
    id: "hds_exc_2",
    text: "I have mood swings.",
    dimensionType: "HDS",
    dimensionName: "Excitable"
  },
  {
    id: "hds_exc_3",
    text: "I react emotionally to criticism.",
    dimensionType: "HDS",
    dimensionName: "Excitable"
  },
  {
    id: "hds_exc_4",
    text: "I am unpredictable in my reactions.",
    dimensionType: "HDS",
    dimensionName: "Excitable"
  },

  // HDS Questions - Skeptical
  {
    id: "hds_skep_1",
    text: "I am suspicious of others' motives.",
    dimensionType: "HDS",
    dimensionName: "Skeptical"
  },
  {
    id: "hds_skep_2",
    text: "I find it hard to trust people.",
    dimensionType: "HDS",
    dimensionName: "Skeptical"
  },
  {
    id: "hds_skep_3",
    text: "I am cynical about people's intentions.",
    dimensionType: "HDS",
    dimensionName: "Skeptical"
  },
  {
    id: "hds_skep_4",
    text: "I question others' honesty.",
    dimensionType: "HDS",
    dimensionName: "Skeptical"
  },

  // MVPI Questions - Aesthetic
  {
    id: "mvpi_aes_1",
    text: "I appreciate beauty in art and nature.",
    dimensionType: "MVPI",
    dimensionName: "Aesthetic"
  },
  {
    id: "mvpi_aes_2",
    text: "I enjoy creative activities.",
    dimensionType: "MVPI",
    dimensionName: "Aesthetic"
  },
  {
    id: "mvpi_aes_3",
    text: "I value artistic expression.",
    dimensionType: "MVPI",
    dimensionName: "Aesthetic"
  },
  {
    id: "mvpi_aes_4",
    text: "I am drawn to beautiful things.",
    dimensionType: "MVPI",
    dimensionName: "Aesthetic"
  },

  // MVPI Questions - Commercial
  {
    id: "mvpi_com_1",
    text: "I am interested in making money.",
    dimensionType: "MVPI",
    dimensionName: "Commercial"
  },
  {
    id: "mvpi_com_2",
    text: "I enjoy business activities.",
    dimensionType: "MVPI",
    dimensionName: "Commercial"
  },
  {
    id: "mvpi_com_3",
    text: "I am motivated by financial success.",
    dimensionType: "MVPI",
    dimensionName: "Commercial"
  },
  {
    id: "mvpi_com_4",
    text: "I enjoy competitive business environments.",
    dimensionType: "MVPI",
    dimensionName: "Commercial"
  },

  // MVPI Questions - Power
  {
    id: "mvpi_pow_1",
    text: "I enjoy being in control.",
    dimensionType: "MVPI",
    dimensionName: "Power"
  },
  {
    id: "mvpi_pow_2",
    text: "I want to influence others.",
    dimensionType: "MVPI",
    dimensionName: "Power"
  },
  {
    id: "mvpi_pow_3",
    text: "I like to be the leader.",
    dimensionType: "MVPI",
    dimensionName: "Power"
  },
  {
    id: "mvpi_pow_4",
    text: "I enjoy having authority.",
    dimensionType: "MVPI",
    dimensionName: "Power"
  }
];

// Mock Users removed - using Supabase
export const MOCK_USERS: User[] = [];