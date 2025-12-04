import { TestQuestionsData } from "@/types/tests/testQuestions";
import { HOGAN_TEST_ID } from "@/lib/constants";

export const hoganTestQuestionsData: TestQuestionsData = {
  id: HOGAN_TEST_ID,
  test_name: "Hogan Personality Inventory",
  totalQuestions: 60, // Reduced for sample - full version would have 600+ questions
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
  ],
};
