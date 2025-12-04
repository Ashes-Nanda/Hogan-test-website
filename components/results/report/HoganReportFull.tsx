"use client";

import React from "react";
import { HoganResultData } from "@/types/tests/hogan/results";
import { HoganHeroSection } from "./HoganHeroSection";
import { HoganIntroductionSection } from "./sections/HoganIntroductionSection";
import { ExecutiveSummary } from "@/components/results/report/shared/ExecutiveSummary";
import { ConfidenceScore } from "@/components/results/report/shared/ConfidenceScore";
import { PersonalExamplesSection } from "@/components/results/report/shared/sections/PersonalExamplesSection";
import { HoganTraitsSection } from "./sections/HoganTraitsSection";
import { CareerPathSection } from "@/components/results/report/shared/sections/CareerPathSection";
import { RelationshipSection } from "@/components/results/report/shared/sections/RelationshipSection";
import { GrowthSection } from "@/components/results/report/shared/sections/GrowthSection";
import { DailyHabitsSection } from "@/components/results/report/shared/sections/DailyHabitsSection";
import ValuesMotivatorSection from "@/components/results/report/shared/sections/ValuesMotivatorsSection";
import ActionPlanSection from "./sections/ActionPlanSection";
import { ReflectionPrompt } from "@/components/results/report/shared/ReflectionPrompt";
import { LazySection } from "@/components/results/report/shared/LazySection";
import { MobileBottomNav } from "@/components/results/report/shared/MobileBottomNav";
import { FamousPeopleSection } from "@/components/results/report/mbti/FamousPeopleSection";
import { VideoContentSection } from "@/components/results/report/mbti/VideoContentSection";
import { RelatedResourcesSection } from "@/components/results/report/mbti/RelatedResourcesSection";
import { TestimonialsCarousel } from "@/components/results/report/shared/SocialProof";
import { GoalTrackingSystem } from "@/components/results/report/shared/GoalTrackingSystem";
import CommunitySection from "@/components/results/report/shared/sections/CommunitySection";
import { generateExecutiveSummary } from "@/lib/generate-executive-summary";
import { calculateConfidenceScore } from "@/lib/calculate-confidence";
import { convertHoganScoresToMBTIFormat } from "@/lib/utils/hogan-score-converter";

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
    actionItems: [
      {
        number: 1,
        description: "Focus on roles that align with your top values and motivations."
      },
      {
        number: 2,
        description: "Develop strategies to manage any identified risk areas."
      }
    ]
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
    actionSteps: [
      {
        number: 1,
        description: "Review your Hogan profile insights regularly"
      },
      {
        number: 2,
        description: "Seek roles that align with your identified strengths"
      },
      {
        number: 3,
        description: "Work on areas for improvement identified in your assessment"
      }
    ],
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

  const dailyHabitsData = React.useMemo(() => ({
    summary: "Build daily habits that align with your Hogan profile strengths and support your professional goals.",
    habits: {
      morning: {
        title: "Morning Routine",
        description: "Start your day with activities that align with your Hogan profile strengths."
      },
      afternoon: {
        title: "Afternoon Focus",
        description: "Maintain energy and focus during the afternoon hours."
      },
      evening: {
        title: "Evening Reflection",
        description: "End your day with reflection and preparation for tomorrow."
      }
    },
    communication: {
      summary: "Your communication style is professional and results-oriented.",
      tips: []
    }
  }), []);

  const communityData = React.useMemo(() => ({
    summary: "Connect with professionals who share your Hogan profile and workplace behavioral patterns.",
    suggestions: [
      "Join professional development discussions",
      "Connect with others who share your behavioral profile",
      "Share workplace insights and strategies",
      "Learn from others' career experiences"
    ]
  }), []);

  const handleDownload = () => {
    generateHoganPDF({
      resultData,
      executiveSummary,
      confidenceScore,
      convertedScores,
      valuesAndMotivators,
      career: careerData,
      dailyHabits: dailyHabitsData,
      communityConnection: communityData
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

        {/* Executive Summary & Confidence Score */}
        <div className="mbti-section-spacing grid grid-cols-1 md:grid-cols-2 gap-6 print:block print:space-y-6 print-break-inside-avoid">
          {executiveSummary && (
            <div className="print:mb-6">
              <ExecutiveSummary
                summary={executiveSummary}
                personalityType={resultData.hoganProfile}
                firstname={resultData?.firstname ?? undefined}
                sectionNumber={1}
              />
            </div>
          )}

          {/* Confidence Score */}
          {confidenceScore && (
            <div className="h-full print:h-auto">
              <ConfidenceScore
                confidenceScore={confidenceScore}
                personalityType={resultData.hoganProfile}
              />
            </div>
          )}
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

        {/* Hogan Traits - Interactive Visualization */}
        <div className="mbti-section-spacing print-break-before">
          <HoganTraitsSection
            hpiScores={resultData.hpiScores}
            hdsScores={resultData.hdsScores}
            mvpiScores={resultData.mvpiScores}
            hpiProfile={resultData.hpiProfile}
            hdsRiskAreas={resultData.hdsRiskAreas}
            mvpiTopValues={resultData.mvpiTopValues}
            sectionNumber={2}
            firstname={resultData?.firstname ?? undefined}
            id="explore-traits"
            isPaidUser={isPaidUser}
            testType="hogan"
          />
        </div>

        {/* Reflection Prompt */}
        <div className="max-w-4xl mx-auto px-4 print-break-inside-avoid">
          <ReflectionPrompt
            question="How do you see your Hogan personality profile showing up in your professional life?"
            promptId="traits-reflection-hogan-full"
            sectionId="traits"
            placeholder="Share your thoughts on how these traits influence your work and leadership style..."
          />
        </div>

        {/* Values & Motivators */}
        <div className="mbti-section-spacing print-break-before">
          <ValuesMotivatorSection
            firstname={resultData?.firstname || null}
            valuesAndMotivators={valuesAndMotivators}
            personalityType={resultData.hoganProfile}
            sectionNumber={4}
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
              sectionNumber={5}
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
              relationships={[{
                title: "Relationships",
                subtitle: "Your Hogan profile influences how you interact",
                description: "Your Hogan profile influences how you interact and build relationships in professional settings.",
                compatibleTypes: [],
                superpowers: [],
                growthAreas: [],
                actionSteps: []
              }]}
              sectionNumber={6}
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
              growth={{
                summary: "Your Hogan assessment provides a roadmap for professional development and personal growth.",
                superpowers: [],
                growthAreas: [],
                actionSteps: []
              }}
              personalityType={resultData.hoganProfile}
              sectionNumber={8}
              id="growth-journey"
              isPaidUser={isPaidUser}
              testType="hogan"
            />
          </LazySection>
        </div>

        {/* Daily Habits - Lazy loaded */}
        <div className="mbti-section-spacing print-break-before">
          <LazySection>
            <DailyHabitsSection
              firstname={resultData?.firstname || null}
              dailyHabits={dailyHabitsData}
              personalityType={resultData.hoganProfile}
              sectionNumber={9}
              id="daily-habits"
              isPaidUser={isPaidUser}
              testType="hogan"
            />
          </LazySection>
        </div>

        {/* Community Connection - Lazy loaded */}
        <div className="mbti-section-spacing print-break-inside-avoid">
          <LazySection>
            <CommunitySection
              firstname={resultData?.firstname || null}
              communityConnection={communityData}
              sectionNumber={10}
              id="community"
              personalityType={resultData.hoganProfile || "Hogan Profile"}
              isPaidUser={isPaidUser}
              userEmail={userEmail}
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
              sectionNumber={11}
              id="action-plan"
            />
          </LazySection>
        </div>

        {/* Goal Tracking System - Apply your action plan */}
        <div className="print-break-inside-avoid">
          <GoalTrackingSystem
            personalityType={resultData.hoganProfile}
            userId={userId}
          />
        </div>

        {/* Famous People Section - You're in good company */}
        <div className="print-break-inside-avoid">
          <FamousPeopleSection personalityType={resultData.hoganProfile} />
        </div>

        {/* Video Content Section - Learn visually */}
        <div className="no-print">
          <VideoContentSection personalityType={resultData.hoganProfile} />
        </div>

        {/* Related Resources - Continue learning */}
        <div className="no-print">
          <RelatedResourcesSection personalityType={resultData.hoganProfile} />
        </div>

        {/* Testimonials - Social proof */}
        <div className="mbti-section-spacing no-print">
          <TestimonialsCarousel />
        </div>
      </div>


      {/* Mobile navigation */}
      <div className="no-print">
        <MobileBottomNav />
      </div>
    </main>
  );
}
