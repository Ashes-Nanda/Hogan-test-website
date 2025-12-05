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
    actionSteps: generateCareerActionSteps(resultData.jobFit || []),
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

      {/* Hero Section */}
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
        {/* Introduction Section with Quick Insights */}
        {resultData.hpiScores && (
          <div className="mbti-section-spacing print-break-inside-avoid">
            <HoganIntroductionSection
              hoganProfile={resultData.hoganProfile}
              hpiScores={Object.fromEntries(
                Object.entries(resultData.hpiScores).map(([key, value]) => [
                  key,
                  value.percentage
                ])
              )}
              hdsScores={resultData.hdsScores ? Object.fromEntries(
                Object.entries(resultData.hdsScores).map(([key, value]) => [
                  key,
                  value.percentage
                ])
              ) : undefined}
              mvpiScores={resultData.mvpiScores ? Object.fromEntries(
                Object.entries(resultData.mvpiScores).map(([key, value]) => [
                  key,
                  value.percentage
                ])
              ) : undefined}
              leadershipPotential={resultData.leadershipPotential}
              firstname={resultData?.firstname ?? undefined}
              isPaidUser={isPaidUser}
              userEmail={userEmail}
            />
          </div>
        )}

        {/* Confidence Score & Famous People - Unified Card */}
        <div className="mb-16 print-break-inside-avoid">
          {confidenceScore !== null && (
            <ConfidenceAndFamousSection
              confidenceScore={confidenceScore.score}
              reason={confidenceScore.reason}
              personalityType={resultData.hoganProfile}
            />
          )}
        </div>

        {/* Hogan Traits - Interactive Visualization */}
        <div className="mbti-section-spacing print-break-before">
          <HoganTraitsSection
            hpiScores={resultData.hpiScores}
            hdsScores={resultData.hdsScores}
            mvpiScores={resultData.mvpiScores}
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

        {/* Personal Examples - How Test Answers Led to Results */}
        {convertedScores && (
          <div className="print-break-inside-avoid print-break-before">
            <PersonalExamplesSection
              traitScores={convertedScores}
              personalityType={resultData.hoganProfile}
              firstname={resultData?.firstname ?? undefined}
            />
          </div>
        )}

        {/* Values & Motivators */}
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

        {/* Career Path - Lazy loaded */}
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



        {/* Relationship Insights - Lazy loaded */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <RelationshipSection
              firstname={resultData?.firstname || null}
              relationships={generateRelationshipInsights(resultData)}
              sectionNumber={5}
              id="relationships"
              isPaidUser={isPaidUser}
              testType="hogan"
            />
          </LazySection>
        </div>

        {/* Growth Journey - Lazy loaded */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <GrowthSection
              firstname={resultData?.firstname || null}
              growth={generateGrowthJourney(resultData)}
              sectionNumber={6}
              id="growth-journey"
              isPaidUser={isPaidUser}
              testType="hogan"
            />
          </LazySection>
        </div>





        {/* Action Plan - Lazy loaded */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <ActionPlanSection
              username={null}
              firstname={resultData?.firstname || null}
              resultData={resultData}
              hoganProfile={resultData.hoganProfile}
              sectionNumber={9}
              id="action-plan"
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
