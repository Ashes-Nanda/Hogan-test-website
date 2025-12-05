import { TestQuestionsData } from "@/types/tests/testQuestions";
import { HOGAN_TEST_ID } from "@/lib/constants";

export const hoganTestQuestionsData: TestQuestionsData = {
  id: HOGAN_TEST_ID,
  test_name: "Hogan Personality Inventory",
  totalQuestions: 100, // Updated to include HBRI questions
  sections: {
    // HPI (Hogan Personality Inventory) - 7 scales
    adjustment: {
      id: 1,
      title: "Adjustment",
      description: "Measures emotional stability and confidence under pressure.",
      dimension: "adjustment",
      icon: "Shield",
      totalQuestions: 8,
    },
    ambition: {
      id: 2,
      title: "Ambition",
      description: "Measures leadership drive and competitive nature.",
      dimension: "ambition",
      icon: "Target",
      totalQuestions: 8,
    },
    sociability: {
      id: 3,
      title: "Sociability",
      description: "Measures social confidence and extraversion.",
      dimension: "sociability",
      icon: "Users",
      totalQuestions: 8,
    },
    interpersonal_sensitivity: {
      id: 4,
      title: "Interpersonal Sensitivity",
      description: "Measures empathy and social awareness.",
      dimension: "interpersonal_sensitivity",
      icon: "Heart",
      totalQuestions: 8,
    },
    prudence: {
      id: 5,
      title: "Prudence",
      description: "Measures self-discipline and reliability.",
      dimension: "prudence",
      icon: "CheckCircle",
      totalQuestions: 8,
    },
    inquisitiveness: {
      id: 6,
      title: "Inquisitiveness",
      description: "Measures intellectual curiosity and openness.",
      dimension: "inquisitiveness",
      icon: "Search",
      totalQuestions: 8,
    },
    learning_approach: {
      id: 7,
      title: "Learning Approach",
      description: "Measures preference for learning styles.",
      dimension: "learning_approach",
      icon: "BookOpen",
      totalQuestions: 8,
    },
    // HDS (Hogan Development Survey) - Dark side traits
    excitable: {
      id: 8,
      title: "Excitable",
      description: "Measures moodiness and unpredictability under stress.",
      dimension: "excitable",
      icon: "Zap",
      totalQuestions: 4,
    },
    skeptical: {
      id: 9,
      title: "Skeptical",
      description: "Measures cynicism and distrust of others.",
      dimension: "skeptical",
      icon: "Eye",
      totalQuestions: 4,
    },
    // MVPI (Motives, Values, Preferences Inventory) - Values
    aesthetic: {
      id: 10,
      title: "Aesthetic",
      description: "Measures appreciation for beauty and creativity.",
      dimension: "aesthetic",
      icon: "Palette",
      totalQuestions: 4,
    },
    commercial: {
      id: 11,
      title: "Commercial",
      description: "Measures interest in business and financial success.",
      dimension: "commercial",
      icon: "DollarSign",
      totalQuestions: 4,
    },
    power: {
      id: 12,
      title: "Power",
      description: "Measures desire for influence and control.",
      dimension: "power",
      icon: "Crown",
      totalQuestions: 4,
    },
    // HBRI (Hogan Business Reasoning Inventory)
    hbri_tactical: {
      id: 13,
      title: "HBRI Tactical",
      description: "Measures ability to solve problems using data and logic.",
      dimension: "hbri_tactical",
      icon: "BarChart",
      totalQuestions: 11,
    },
    hbri_strategic: {
      id: 14,
      title: "HBRI Strategic",
      description: "Measures ability to detect patterns and think strategically.",
      dimension: "hbri_strategic",
      icon: "TrendingUp",
      totalQuestions: 13,
    },
  },
  questions: [
    // HPI Questions - Adjustment
    {
      id: "hpi_adj_1",
      text: "I remain calm under pressure.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_2",
      text: "I worry about things that might go wrong.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_3",
      text: "I feel confident in most situations.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_4",
      text: "I get stressed easily.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_5",
      text: "I handle criticism well.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_6",
      text: "I am emotionally stable.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_7",
      text: "I bounce back quickly from setbacks.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_adj_8",
      text: "I am easily overwhelmed by problems.",
      dimension: "adjustment",
      section: 1,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Ambition
    {
      id: "hpi_amb_1",
      text: "I enjoy being in charge of projects.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_2",
      text: "I am competitive by nature.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_3",
      text: "I strive to be the best at what I do.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_4",
      text: "I prefer to work behind the scenes.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_5",
      text: "I want to advance in my career.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_6",
      text: "I enjoy taking on leadership roles.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_7",
      text: "I am comfortable with responsibility.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_amb_8",
      text: "I prefer to follow rather than lead.",
      dimension: "ambition",
      section: 2,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Sociability
    {
      id: "hpi_soc_1",
      text: "I enjoy meeting new people.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_2",
      text: "I am energized by social interactions.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_3",
      text: "I prefer working in groups.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_4",
      text: "I am comfortable speaking in public.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_5",
      text: "I enjoy being the center of attention.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_6",
      text: "I prefer quiet, solitary activities.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_7",
      text: "I make friends easily.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_soc_8",
      text: "I need time alone to recharge.",
      dimension: "sociability",
      section: 3,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Interpersonal Sensitivity
    {
      id: "hpi_int_1",
      text: "I am good at reading people's emotions.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_2",
      text: "I care about others' feelings.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_3",
      text: "I am empathetic towards others.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_4",
      text: "I notice when someone is upset.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_5",
      text: "I am tactful in my communication.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_6",
      text: "I am diplomatic in difficult situations.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_7",
      text: "I am sensitive to criticism.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_int_8",
      text: "I am good at resolving conflicts.",
      dimension: "interpersonal_sensitivity",
      section: 4,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Prudence
    {
      id: "hpi_pru_1",
      text: "I always follow through on my commitments.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_2",
      text: "I am very organized.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_3",
      text: "I plan things carefully.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_4",
      text: "I am reliable and dependable.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_5",
      text: "I think before I act.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_6",
      text: "I am detail-oriented.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_7",
      text: "I am self-disciplined.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_pru_8",
      text: "I am careful and cautious.",
      dimension: "prudence",
      section: 5,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Inquisitiveness
    {
      id: "hpi_inq_1",
      text: "I enjoy learning new things.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_2",
      text: "I am curious about the world around me.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_3",
      text: "I enjoy intellectual discussions.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_4",
      text: "I like to explore new ideas.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_5",
      text: "I enjoy solving complex problems.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_6",
      text: "I am interested in abstract concepts.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_7",
      text: "I enjoy reading about various topics.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_inq_8",
      text: "I prefer practical over theoretical knowledge.",
      dimension: "inquisitiveness",
      section: 6,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HPI Questions - Learning Approach
    {
      id: "hpi_learn_1",
      text: "I learn best by doing.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_2",
      text: "I prefer hands-on learning experiences.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_3",
      text: "I learn best through observation.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_4",
      text: "I prefer structured learning environments.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_5",
      text: "I learn best through discussion.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_6",
      text: "I prefer learning from books.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_7",
      text: "I learn best through trial and error.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hpi_learn_8",
      text: "I prefer learning from others' experiences.",
      dimension: "learning_approach",
      section: 7,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HDS Questions - Excitable
    {
      id: "hds_exc_1",
      text: "I get upset when things don't go my way.",
      dimension: "excitable",
      section: 8,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_exc_2",
      text: "I have mood swings.",
      dimension: "excitable",
      section: 8,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_exc_3",
      text: "I react emotionally to criticism.",
      dimension: "excitable",
      section: 8,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_exc_4",
      text: "I am unpredictable in my reactions.",
      dimension: "excitable",
      section: 8,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // HDS Questions - Skeptical
    {
      id: "hds_skep_1",
      text: "I am suspicious of others' motives.",
      dimension: "skeptical",
      section: 9,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_skep_2",
      text: "I find it hard to trust people.",
      dimension: "skeptical",
      section: 9,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_skep_3",
      text: "I am cynical about people's intentions.",
      dimension: "skeptical",
      section: 9,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "hds_skep_4",
      text: "I question others' honesty.",
      dimension: "skeptical",
      section: 9,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // MVPI Questions - Aesthetic
    {
      id: "mvpi_aes_1",
      text: "I appreciate beauty in art and nature.",
      dimension: "aesthetic",
      section: 10,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_aes_2",
      text: "I enjoy creative activities.",
      dimension: "aesthetic",
      section: 10,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_aes_3",
      text: "I value artistic expression.",
      dimension: "aesthetic",
      section: 10,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_aes_4",
      text: "I am drawn to beautiful things.",
      dimension: "aesthetic",
      section: 10,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // MVPI Questions - Commercial
    {
      id: "mvpi_com_1",
      text: "I am interested in making money.",
      dimension: "commercial",
      section: 11,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_com_2",
      text: "I enjoy business activities.",
      dimension: "commercial",
      section: 11,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_com_3",
      text: "I am motivated by financial success.",
      dimension: "commercial",
      section: 11,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_com_4",
      text: "I enjoy competitive business environments.",
      dimension: "commercial",
      section: 11,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },

    // MVPI Questions - Power
    {
      id: "mvpi_pow_1",
      text: "I enjoy being in control.",
      dimension: "power",
      section: 12,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_pow_2",
      text: "I want to influence others.",
      dimension: "power",
      section: 12,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_pow_3",
      text: "I like to be the leader.",
      dimension: "power",
      section: 12,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      id: "mvpi_pow_4",
      text: "I enjoy having authority.",
      dimension: "power",
      section: 12,
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    // HBRI Questions - Tactical
    {
      id: "hbri_tac_1",
      text: "A company’s quarterly expenses (in thousands): Q1: 320, Q2: 340, Q3: 300, Q4: 360. Which quarter saw the largest increase compared to the previous quarter?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "Q4",
      options: [
        { value: "Q1", label: "Q1" },
        { value: "Q2", label: "Q2" },
        { value: "Q3", label: "Q3" },
        { value: "Q4", label: "Q4" }
      ]
    },
    {
      id: "hbri_tac_2",
      text: "A retailer buys a product for $40 and sells it for $64. If they sold 750 units, what is the total profit?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "$18,000",
      options: [
        { value: "$12,000", label: "$12,000" },
        { value: "$18,000", label: "$18,000" },
        { value: "$24,000", label: "$24,000" },
        { value: "$30,000", label: "$30,000" }
      ]
    },
    {
      id: "hbri_tac_3",
      text: "A team has Analysts:Developers = 3:7. If there are 140 team members, how many are Analysts?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "42",
      options: [
        { value: "30", label: "30" },
        { value: "40", label: "40" },
        { value: "42", label: "42" },
        { value: "98", label: "98" }
      ]
    },
    {
      id: "hbri_tac_4",
      text: "Sales growth rates: Product A: 8%, Product B: 12%, Product C: 5%, Product D: 12%. Which product(s) showed the highest growth?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "Product B and Product D",
      options: [
        { value: "Product B only", label: "Product B only" },
        { value: "Product D only", label: "Product D only" },
        { value: "Product B and Product D", label: "Product B and Product D" },
        { value: "Product A", label: "Product A" }
      ]
    },
    {
      id: "hbri_tac_5",
      text: "A machine produces 480 units per hour but loses 12.5% efficiency due to overheating. How many units does it produce in one hour under these conditions?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "420",
      options: [
        { value: "400", label: "400" },
        { value: "420", label: "420" },
        { value: "440", label: "440" },
        { value: "460", label: "460" }
      ]
    },
    {
      id: "hbri_tac_6",
      text: "A company earned $240,000 total profit. Department A contributed 35%. How much profit came from Department A?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "$84,000",
      options: [
        { value: "$75,000", label: "$75,000" },
        { value: "$80,000", label: "$80,000" },
        { value: "$84,000", label: "$84,000" },
        { value: "$90,000", label: "$90,000" }
      ]
    },
    {
      id: "hbri_tac_7",
      text: "A bar graph shows the following monthly website visits: Jan: 20k, Feb: 22k, Mar: 19k, Apr: 25k. Which month had the largest increase from the previous month?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "April",
      options: [
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" }
      ]
    },
    {
      id: "hbri_tac_8",
      text: "A product’s price increased from $80 to $92. What is the percentage increase?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "15%",
      options: [
        { value: "10%", label: "10%" },
        { value: "12%", label: "12%" },
        { value: "15%", label: "15%" },
        { value: "20%", label: "20%" }
      ]
    },
    {
      id: "hbri_tac_9",
      text: "Number Series: 7, 10, 16, 25, 37, ?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "52",
      options: [
        { value: "48", label: "48" },
        { value: "50", label: "50" },
        { value: "52", label: "52" },
        { value: "55", label: "55" }
      ]
    },
    {
      id: "hbri_tac_10",
      text: "If sales rose 12% this year to reach 224,000 units, what were last year’s sales?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "200,000 units",
      options: [
        { value: "190,000 units", label: "190,000 units" },
        { value: "200,000 units", label: "200,000 units" },
        { value: "210,000 units", label: "210,000 units" },
        { value: "215,000 units", label: "215,000 units" }
      ]
    },
    {
      id: "hbri_tac_11",
      text: "Revenue: $150,000, Cost: $112,500. What is the profit margin?",
      dimension: "hbri_tactical",
      section: 13,
      correctAnswer: "25%",
      options: [
        { value: "20%", label: "20%" },
        { value: "25%", label: "25%" },
        { value: "30%", label: "30%" },
        { value: "35%", label: "35%" }
      ]
    },

    // HBRI Questions - Strategic
    {
      id: "hbri_str_1",
      text: "“All sales associates who exceed targets qualify for incentives. No associate who receives customer complaints exceeds targets.” Which statement MUST be true?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Associates receiving complaints do not qualify for incentives.",
      options: [
        { value: "Associates receiving complaints do not qualify for incentives.", label: "Associates receiving complaints do not qualify for incentives." },
        { value: "Some associates who exceed targets receive complaints.", label: "Some associates who exceed targets receive complaints." },
        { value: "All associates qualify for incentives.", label: "All associates qualify for incentives." },
        { value: "No associate exceeds targets.", label: "No associate exceeds targets." }
      ]
    },
    {
      id: "hbri_str_2",
      text: "Sequence: 4, 6, 9, 13, 18, ?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "24",
      options: [
        { value: "22", label: "22" },
        { value: "23", label: "23" },
        { value: "24", label: "24" },
        { value: "25", label: "25" }
      ]
    },
    {
      id: "hbri_str_3",
      text: "Employee turnover rose 15%. Survey shows: 50%: poor manager communication, 25%: unclear job expectations, 15%: workload, 10%: compensation. Which intervention is MOST justified?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Improve managerial communication practices",
      options: [
        { value: "Improve managerial communication practices", label: "Improve managerial communication practices" },
        { value: "Clarify job expectations", label: "Clarify job expectations" },
        { value: "Reduce workload", label: "Reduce workload" },
        { value: "Increase compensation", label: "Increase compensation" }
      ]
    },
    {
      id: "hbri_str_4",
      text: "A report states, “Most regional branches experienced higher customer retention except the West division, which remained flat.” Which conclusion is valid?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Retention did not decline in the West division.",
      options: [
        { value: "Retention increased in the West division.", label: "Retention increased in the West division." },
        { value: "Retention decreased in the West division.", label: "Retention decreased in the West division." },
        { value: "Retention did not decline in the West division.", label: "Retention did not decline in the West division." },
        { value: "The West division had the highest retention.", label: "The West division had the highest retention." }
      ]
    },
    {
      id: "hbri_str_5",
      text: "“If an option is cost-effective, then it will be approved. This proposal is not approved.” What can be concluded?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "The proposal was not cost-effective.",
      options: [
        { value: "The proposal was not cost-effective.", label: "The proposal was not cost-effective." },
        { value: "The proposal was cost-effective.", label: "The proposal was cost-effective." },
        { value: "The proposal will be approved later.", label: "The proposal will be approved later." },
        { value: "None of the above.", label: "None of the above." }
      ]
    },
    {
      id: "hbri_str_6",
      text: "A triangular arrow is rotated 90° clockwise. Which orientation results?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "The arrow points to the right",
      options: [
        { value: "The arrow points to the left", label: "The arrow points to the left" },
        { value: "The arrow points to the right", label: "The arrow points to the right" },
        { value: "The arrow points up", label: "The arrow points up" },
        { value: "The arrow points down", label: "The arrow points down" }
      ]
    },
    {
      id: "hbri_str_7",
      text: "“Blueprint is to building as recipe is to ___”",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Meal",
      options: [
        { value: "Food", label: "Food" },
        { value: "Meal", label: "Meal" },
        { value: "Chef", label: "Chef" },
        { value: "Kitchen", label: "Kitchen" }
      ]
    },
    {
      id: "hbri_str_8",
      text: "A team faces: 40% delays due to unclear requirements, 35% due to slow approvals, 15% due to technical debt, 10% miscellaneous. What should be addressed first?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Improve requirement clarity",
      options: [
        { value: "Improve requirement clarity", label: "Improve requirement clarity" },
        { value: "Speed up approvals", label: "Speed up approvals" },
        { value: "Reduce technical debt", label: "Reduce technical debt" },
        { value: "Address miscellaneous issues", label: "Address miscellaneous issues" }
      ]
    },
    {
      id: "hbri_str_9",
      text: "All consultants are trained in analytics. Some analysts are consultants. Which must be true?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Some analysts are trained in analytics.",
      options: [
        { value: "Some analysts are trained in analytics.", label: "Some analysts are trained in analytics." },
        { value: "All analysts are trained in analytics.", label: "All analysts are trained in analytics." },
        { value: "No analysts are trained in analytics.", label: "No analysts are trained in analytics." },
        { value: "All consultants are analysts.", label: "All consultants are analysts." }
      ]
    },
    {
      id: "hbri_str_10",
      text: "Three vendor quotes for a project: Vendor A: $48,000, Vendor B: $42,500 + 10% maintenance, Vendor C: $45,000 flat. Which is the lowest total cost?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Vendor C",
      options: [
        { value: "Vendor A", label: "Vendor A" },
        { value: "Vendor B", label: "Vendor B" },
        { value: "Vendor C", label: "Vendor C" },
        { value: "Vendor A and C", label: "Vendor A and C" }
      ]
    },
    {
      id: "hbri_str_11",
      text: "“Employee satisfaction rose despite no increase in compensation.” What can be inferred?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Factors other than compensation improved satisfaction.",
      options: [
        { value: "Factors other than compensation improved satisfaction.", label: "Factors other than compensation improved satisfaction." },
        { value: "Compensation is not important.", label: "Compensation is not important." },
        { value: "Employees are unhappy.", label: "Employees are unhappy." },
        { value: "Productivity increased.", label: "Productivity increased." }
      ]
    },
    {
      id: "hbri_str_12",
      text: "Three employees—A, B, C—completed a task. If A finished before B, and C finished after B, who finished last?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "C",
      options: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "A and B", label: "A and B" }
      ]
    },
    {
      id: "hbri_str_13",
      text: "Customer complaints dropped 20% after introducing a self-service portal, but call volume stayed the same. What is the best interpretation?",
      dimension: "hbri_strategic",
      section: 14,
      correctAnswer: "Customers still need assistance but are reporting fewer issues.",
      options: [
        { value: "Customers still need assistance but are reporting fewer issues.", label: "Customers still need assistance but are reporting fewer issues." },
        { value: "The portal is not working.", label: "The portal is not working." },
        { value: "Customers are calling more.", label: "Customers are calling more." },
        { value: "Issues have increased.", label: "Issues have increased." }
      ]
    },
  ],
};
