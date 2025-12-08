"use client";

import React from "react";
import { HoganResultData } from "@/types/tests/hogan/results";
import { HoganHeroSection } from "./HoganHeroSection";
import { HoganIntroductionSection } from "./sections/HoganIntroductionSection";
import { ExecutiveSummary } from "@/components/results/report/shared/ExecutiveSummary";
import { ConfidenceAndFamousSection } from "@/components/results/report/shared/ConfidenceAndFamousSection";
import { PersonalExamplesSection } from "@/components/results/report/shared/sections/PersonalExamplesSection";
import { HoganTraitsSection } from "./sections/HoganTraitsSection";
import { CareerPathSection } from "@/components/results/report/shared/sections/CareerPathSection";
import { RelationshipSection } from "@/components/results/report/shared/sections/RelationshipSection";
import { GrowthSection } from "@/components/results/report/shared/sections/GrowthSection";

import ValuesMotivatorSection from "@/components/results/report/shared/sections/ValuesMotivatorsSection";
import ActionPlanSection from "./sections/ActionPlanSection";
import { ReflectionPrompt } from "@/components/results/report/shared/ReflectionPrompt";
import { LazySection } from "@/components/results/report/shared/LazySection";
import { MobileBottomNav } from "@/components/results/report/shared/MobileBottomNav";
import { VideoContentSection } from "@/components/results/report/mbti/VideoContentSection";
import { RelatedResourcesSection } from "@/components/results/report/mbti/RelatedResourcesSection";
import { TestimonialsCarousel } from "@/components/results/report/shared/SocialProof";
import { GoalTrackingSystem } from "@/components/results/report/shared/GoalTrackingSystem";

// NEW COMPONENTS
import { IdentitySummary } from "./sections/engaging/IdentitySummary";
import { WorkStyleAndEnvironment } from "./sections/engaging/WorkStyleAndEnvironment";
import { ReflectionsAndHabits } from "./sections/engaging/ReflectionsAndHabits";

import { generateExecutiveSummary } from "@/lib/generate-executive-summary";
import { calculateConfidenceScore } from "@/lib/calculate-confidence";
import { convertHoganScoresToMBTIFormat } from "@/lib/utils/hogan-score-converter";
import {
  generateRelationshipInsights,
  generateGrowthJourney,
  generateValuesActionItems,
  generateCareerActionSteps
} from "@/lib/utils/report-content-generator";

import { generateHoganPDF } from "@/lib/generate-hogan-pdf";

interface HoganReportFullProps {
  resultData: HoganResultData;
  isPaidUser?: boolean;
  userEmail?: string;
  userId?: string;
}

export default function HoganReportFull({ resultData, isPaidUser = false, userEmail, userId }: HoganReportFullProps) {
  // State for AI Content
  const [aiContent, setAiContent] = React.useState<any>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  // Trigger AI generation on mount
  React.useEffect(() => {
    async function fetchAI() {
      // Avoid re-fetching if already present (or check if cached)
      if (aiContent) return;

      setIsGenerating(true);
      // Dynamically import generator to avoid server-side issues if any
      const { generateHoganReportAI } = await import("@/lib/ai/hogan-generator");
      const content = await generateHoganReportAI(resultData);

      if (content) {
        setAiContent(content);
      }
      setIsGenerating(false);
    }

    fetchAI();
  }, [resultData]);

  // Convert Hogan scores to MBTI-like format for shared components
  const convertedScores = React.useMemo(() => {
    if (!resultData.hpiScores) return null;
    return convertHoganScoresToMBTIFormat(resultData.hpiScores);
  }, [resultData.hpiScores]);

  // Generate executive summary
  const executiveSummary = React.useMemo(() => {
    if (!convertedScores) return null;

    const jobFitSummary = resultData.jobFit && resultData.jobFit.length > 0
      ? `${resultData.jobFit.slice(0, 3).join(", ")} roles`
      : "various professional roles";

    return generateExecutiveSummary({
      personalityType: resultData.hoganProfile,
      traitScores: convertedScores,
      personalityData: {
        career: {
          summary: `Your Hogan profile indicates strong potential in ${jobFitSummary}.`,
          superpowers: []
        }
      },
    });
  }, [convertedScores, resultData.hoganProfile, resultData.jobFit]);

  // Calculate confidence score
  const confidenceScore = React.useMemo(() => {
    if (!convertedScores) return null;

    return calculateConfidenceScore({
      personalityType: resultData.hoganProfile,
      traitScores: convertedScores,
    });
  }, [convertedScores, resultData.hoganProfile]);

  // Prepare data for sections and PDF
  const valuesAndMotivators = React.useMemo(() => ({
    summary: "Your Hogan values profile reveals what truly motivates and drives you in professional settings.",
    coreValues: resultData.mvpiTopValues ? resultData.mvpiTopValues.slice(0, 3).map(value => ({
      title: value.split(' (')[0],
      description: `This value represents ${value.split(' (')[0].toLowerCase()} in your professional life.`
    })) : [],
    motivators: [
      {
        title: "Professional Growth",
        description: "You are motivated by opportunities to develop and advance in your career."
      },
      {
        title: "Leadership Impact",
        description: `With ${resultData.leadershipPotential}% leadership potential, you are driven to influence and lead others.`
      }
    ],
    actionItems: generateValuesActionItems(resultData.mvpiTopValues || [])
  }), [resultData]);

  const careerData = React.useMemo(() => ({
    summary: `Based on your Hogan Personality Inventory results, you show strong potential in ${resultData.jobFit ? resultData.jobFit.slice(0, 3).join(", ") : "various"} roles.`,
    superpowers: [
      {
        title: "Professional Strengths",
        description: "Your Hogan profile reveals key professional strengths that make you valuable in the workplace."
      },
      {
        title: "Leadership Potential",
        description: `With a leadership potential of ${resultData.leadershipPotential}%, you have strong capabilities for guiding teams.`
      }
    ],
    growthAreas: [
      {
        title: "Development Areas",
        description: "Focus on areas identified in your Hogan assessment for continued professional growth."
      }
    ],
    actionSteps: generateCareerActionSteps(resultData.jobFit || [], resultData.hbriScores),
    suggestions: resultData.jobFit ? resultData.jobFit.slice(0, 5).map((role, index) => ({
      title: role,
      description: `This role aligns well with your Hogan personality profile and professional strengths.`,
      matchPercentage: Math.max(70, 100 - (index * 5)),
      qualityMatches: [
        {
          title: "Personality Alignment",
          description: "Your Hogan assessment results show strong compatibility with this role's requirements."
        },
        {
          title: "Professional Strengths",
          description: "Your identified strengths align well with the key competencies needed for this position."
        }
      ]
    })) : []
  }), [resultData]);

  const handleDownload = () => {
    generateHoganPDF({
      resultData,
      executiveSummary,
      confidenceScore: confidenceScore?.score || 0,
      convertedScores,
      valuesAndMotivators,
      career: careerData
    });
  };

  return (
    <main className="flex-1 mx-auto transition-all duration-300 print:w-full print:max-w-none print:mx-0 print:p-0">
      <style type="text/css" media="print">
        {`
          @page { size: auto; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
          .print-break-before { break-before: page; page-break-before: always; }
          .no-print { display: none !important; }
        `}
      </style>

      {/* 0. COVER / HEADER SECTION */}
      {resultData.hpiScores && (
        <div className="print-break-inside-avoid">
          <HoganHeroSection
            hpiScores={resultData.hpiScores}
            hoganProfile={resultData.hoganProfile}
            leadershipPotential={resultData.leadershipPotential}
            firstname={resultData?.firstname ?? undefined}
            completionDate={resultData.takenAt}
            onDownload={handleDownload}
          />
        </div>
      )}

      <div className="p-4 mt-8 mbti-content-container-full print:p-0 print:mt-4">

        {/* 1. TRAIT SUMMARY TABLES */}
        {resultData.hpiScores && (
          <div className="mbti-section-spacing print-break-inside-avoid">
            <HoganIntroductionSection
              hoganProfile={resultData.hoganProfile}
              hpiScores={Object.fromEntries(
                Object.entries(resultData.hpiScores).map(([key, value]) => [key, value.percentage])
              )}
              hdsScores={resultData.hdsScores ? Object.fromEntries(
                Object.entries(resultData.hdsScores).map(([key, value]) => [key, value.percentage])
              ) : undefined}
              mvpiScores={resultData.mvpiScores ? Object.fromEntries(
                Object.entries(resultData.mvpiScores).map(([key, value]) => [key, value.percentage])
              ) : undefined}
              leadershipPotential={resultData.leadershipPotential}
              firstname={resultData?.firstname ?? undefined}
              isPaidUser={isPaidUser}
              userEmail={userEmail}
            />
          </div>
        )}

        {/* Confidence Data */}
        <div className="mb-16 print-break-inside-avoid">
          {confidenceScore !== null && (
            <ConfidenceAndFamousSection
              confidenceScore={confidenceScore.score}
              reason={confidenceScore.reason}
              personalityType={resultData.hoganProfile}
            />
          )}
        </div>

        {/* 2. DETAILED TRAIT ANALYSIS (2A-2D) */}
        <div className="mbti-section-spacing print-break-before">
          <HoganTraitsSection
            hpiScores={resultData.hpiScores}
            hdsScores={resultData.hdsScores}
            mvpiScores={resultData.mvpiScores}
            hbriScores={resultData.hbriScores}
            hpiAnalysis={aiContent?.hpiAnalysis}
            hdsAnalysis={aiContent?.hdsAnalysis}
            mvpiAnalysis={aiContent?.mvpiAnalysis}
            hpiProfile={resultData.hpiProfile}
            hdsRiskAreas={resultData.hdsRiskAreas}
            mvpiTopValues={resultData.mvpiTopValues}
            sectionNumber={1}
            firstname={resultData?.firstname ?? undefined}
            id="explore-traits"
            isPaidUser={isPaidUser}
            testType="hogan"
          />
        </div>

        {/* 3. PERSONAL EXAMPLES (Superpowers & Blind Spots) */}
        {convertedScores && (
          <div className="print-break-inside-avoid print-break-before">
            <PersonalExamplesSection
              traitScores={convertedScores}
              personalityType={resultData.hoganProfile}
              firstname={resultData?.firstname ?? undefined}
            />
          </div>
        )}

        {/* 4. CORE VALUES & MOTIVATORS */}
        <div className="mbti-section-spacing print-break-before">
          <ValuesMotivatorSection
            firstname={resultData?.firstname || null}
            valuesAndMotivators={valuesAndMotivators}
            personalityType={resultData.hoganProfile}
            sectionNumber={3}
            id="values-motivators"
            isPaidUser={isPaidUser}
            testType="hogan"
          />
        </div>

        {/* 5. CAREER & RELATIONSHIPS */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <CareerPathSection
              firstname={resultData?.firstname || null}
              career={careerData}
              personalityType={resultData.hoganProfile}
              testType="hogan"
              sectionNumber={4}
              id="career-path"
              isPaidUser={isPaidUser}
            />
          </LazySection>
        </div>

        {/* 6. Relationship Insights (Part of Section 5) */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <RelationshipSection
              firstname={resultData?.firstname || null}
              relationships={aiContent?.relationships || generateRelationshipInsights(resultData)}
              sectionNumber={5}
              id="relationships"
              isPaidUser={isPaidUser}
              testType="hogan"
            />
          </LazySection>
        </div>

        {/* 6. YOUR GROWTH JOURNEY */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <GrowthSection
              firstname={resultData?.firstname || null}
              growth={generateGrowthJourney(resultData)}
              sectionNumber={6}
              id="growth-journey"
              isPaidUser={isPaidUser}
              testType="hogan"
              personalityType={resultData.hoganProfile}
            />
          </LazySection>
        </div>

        {/* 7. ACTION PLAN */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <ActionPlanSection
              username={null}
              firstname={resultData?.firstname || null}
              resultData={resultData}
              hoganProfile={resultData.hoganProfile}
              actionSteps={aiContent?.strategicActions}
              sectionNumber={7}
              id="action-plan"
            />
          </LazySection>
        </div>

        {/* --- ENGAGING MODULES (Sections 8-14) --- */}

        {/* 8, 9, 11: Identity Summary, 5 Words, Social Experience */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <IdentitySummary
              id="identity-summary"
              sectionNumber={8}
              topTakeaways={aiContent?.topTakeaways}
              personalityWords={aiContent?.personalityWords}
              socialExperience={aiContent?.socialExperience}
            />
          </LazySection>
        </div>

        {/* 10, 12: Work Style & Energy */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <WorkStyleAndEnvironment
              id="work-style"
              sectionNumber={10}
              workStyle={aiContent?.workStyle}
              energy={aiContent?.energyFlow}
            />
          </LazySection>
        </div>

        {/* 13, 14: Habits & Reflections */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <ReflectionsAndHabits
              id="reflections-habits"
              sectionNumber={13}
              microHabits={aiContent?.microHabits}
              coachQuestions={aiContent?.coachQuestions}
            />
          </LazySection>
        </div>

      </div>

      {/* Mobile navigation */}
      <div className="no-print">
        <MobileBottomNav />
      </div>
    </main>
  );
}
