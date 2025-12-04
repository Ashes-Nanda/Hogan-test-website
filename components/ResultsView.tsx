import React, { useState } from 'react';
import { TestResult, DimensionScore, User, Attempt } from '../types';
import { 
  Download, Share2, Briefcase, AlertTriangle, TrendingUp, 
  Star, Target, Zap, Heart, CheckCircle, ArrowRight, Activity, 
  Users, Loader2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { motion } from 'framer-motion';

interface Props {
  user: User;
  activeAttempt?: Attempt;
  onRetake: () => void;
}

// Declare html2pdf for TypeScript
declare const html2pdf: any;

// -- Shared UI Components --

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8 page-break-after-avoid">
    <h2 className="text-3xl font-oswald font-bold text-foreground uppercase tracking-tight">{title}</h2>
    {subtitle && <p className="text-muted-foreground mt-2 text-lg font-light">{subtitle}</p>}
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const DetailCard: React.FC<{ title: string; icon: any; theme: 'blue' | 'orange' | 'green' | 'purple'; children: React.ReactNode }> = ({ title, icon: Icon, theme, children }) => {
  const themeColors = {
    blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', bar: 'bg-blue-500' },
    orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', bar: 'bg-orange-500' },
    green: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', bar: 'bg-green-500' },
    purple: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', bar: 'bg-purple-500' },
  }[theme];

  return (
    <div className={`bg-card rounded-xl border ${themeColors.border} shadow-sm overflow-hidden h-full flex flex-col break-inside-avoid`}>
      <div className={`${themeColors.bg} p-4 border-b ${themeColors.border} flex items-center gap-3`}>
        <div className={`p-2 bg-white rounded-lg shadow-sm ${themeColors.text}`}>
          <Icon size={20} />
        </div>
        <h3 className={`font-oswald font-bold text-lg ${themeColors.text} uppercase`}>{title}</h3>
      </div>
      <div className="p-5 flex-grow">
        {children}
      </div>
    </div>
  );
};

const TraitRow: React.FC<{ name: string; score: number; theme: 'blue' | 'orange' | 'green' }> = ({ name, score, theme }) => {
  const color = theme === 'blue' ? 'bg-blue-600' : theme === 'orange' ? 'bg-orange-500' : 'bg-green-500';
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{score}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  );
};

export const ResultsView: React.FC<Props> = ({ user, activeAttempt, onRetake }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Select attempt
  const selectedAttempt = activeAttempt || user.attempts[user.attempts.length - 1] || user.attempts[0];
  const result = selectedAttempt?.result;

  if (!result) return <div className="p-12 text-center text-muted-foreground">No results found.</div>;

  // -- Data Preparation --
  const topHpi = (Object.entries(result.hpi) as [string, DimensionScore][])
    .sort(([, a], [, b]) => b.percentage - a.percentage).slice(0, 5);
  
  const bottomHpi = (Object.entries(result.hpi) as [string, DimensionScore][])
    .sort(([, a], [, b]) => a.percentage - b.percentage).slice(0, 4);

  const topMvpi = (Object.entries(result.mvpi) as [string, DimensionScore][])
    .sort(([, a], [, b]) => b.percentage - a.percentage).slice(0, 3);

  // Radar Data for Recharts
  const radarData = result.leadershipStyle || [];

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);
    const element = document.getElementById('report-content');
    
    // Configuration for optimal print layout
    const opt = {
      margin: [10, 0, 10, 0], // Top, Left, Bottom, Right
      filename: `${user.name.replace(/\s+/g, '_')}_Hogan_Profile.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // Higher scale for better quality
        useCORS: true, 
        scrollY: 0,
        windowWidth: 1200 // Force desktop width
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Add a temporary class to handle specific print styles if needed
    element?.classList.add('pdf-mode');

    html2pdf().set(opt).from(element).save().then(() => {
        element?.classList.remove('pdf-mode');
        setIsGeneratingPdf(false);
    }).catch((err: any) => {
        console.error("PDF Gen Error", err);
        element?.classList.remove('pdf-mode');
        setIsGeneratingPdf(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-foreground font-sans">
      
      {/* WRAPPER FOR PDF GENERATION */}
      <div id="report-content" className="bg-gradient-to-br from-purple-50 to-blue-50">
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-600 text-white overflow-hidden py-20 lg:py-28 pdf-no-break">
            {/* Animated Orbs - hidden during PDF gen if they cause issues, but we'll try keeping them for visuals */}
            <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl pointer-events-none"
            />
            
            <div className="container relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold uppercase tracking-widest text-white">
                    <Star size={14} className="text-yellow-300 fill-yellow-300" />
                    <span>Comprehensive Leadership Profile</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-oswald font-black mb-6 leading-none tracking-tight text-white drop-shadow-md">
                    {result.profileTitle}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light mb-12">
                    Prepared exclusively for <span className="font-semibold text-white">{user.name}</span>
                </p>

                {/* Trait Grid */}
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
                    {topHpi.map(([name, score]) => (
                        <div key={name} className="flex-1 min-w-[150px] max-w-[200px]">
                            <GlassCard className="p-4 flex flex-col items-center cursor-default h-full justify-center bg-white/10 border-white/20">
                                <div className="mb-2 p-2 rounded-full bg-white/10">
                                <Star size={16} className="text-white" />
                                </div>
                                <span className="text-4xl font-oswald font-bold mb-1 text-white">{score.percentage}%</span>
                                <span className="text-xs uppercase tracking-wider font-medium opacity-90 text-white/80">{name}</span>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* Buttons - Hide in PDF */}
                <div className="mt-12 flex gap-4" data-html2canvas-ignore="true">
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg flex items-center gap-2"
                    >
                        {isGeneratingPdf ? <Loader2 size={18} className="animate-spin"/> : <Download size={18}/>} 
                        {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                    <button className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors flex items-center gap-2">
                        <Share2 size={18}/> Share Results
                    </button>
                </div>
            </div>
        </section>

        {/* 2. INTRO DASHBOARD */}
        <section className="container py-16 -mt-8 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Card 1: Core Traits */}
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6 flex flex-col break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-md">
                        <Briefcase size={24} />
                    </div>
                    <h3 className="font-oswald font-bold text-lg text-foreground uppercase">Core Traits</h3>
                </div>
                <div className="space-y-4 flex-grow">
                    {topHpi.slice(0, 4).map(([name]) => (
                        <div key={name} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            <span className="text-sm font-medium text-foreground">{name}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                    <div className="flex justify-between text-xs font-bold text-purple-600 mb-1">
                        <span>PROFILE CLARITY</span>
                        <span>98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 w-[98%]" />
                    </div>
                </div>
                </div>

                {/* Card 2: Leadership Potential */}
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6 flex flex-col break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl text-white shadow-md">
                        <Star size={24} />
                    </div>
                    <h3 className="font-oswald font-bold text-lg text-foreground uppercase">Leadership</h3>
                </div>
                <div className="flex flex-col items-center justify-center flex-grow py-2">
                    <span className="text-6xl font-oswald font-black text-indigo-600 mb-2">{result.leadershipPotentialScore}%</span>
                    <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Potential Score</span>
                </div>
                <div className="mt-6">
                    <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: `${result.leadershipPotentialScore}%` }} 
                            transition={{ duration: 1.5 }}
                            className="h-full bg-indigo-600" 
                        />
                    </div>
                </div>
                </div>

                {/* Card 3: Development Areas */}
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6 flex flex-col break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl text-white shadow-md">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="font-oswald font-bold text-lg text-foreground uppercase">Growth Areas</h3>
                </div>
                <div className="space-y-3 flex-grow">
                    {bottomHpi.map(([name, score]) => (
                        <div key={name} className="flex items-center justify-between text-sm p-2 bg-orange-50/50 rounded-lg">
                            <span className="font-medium text-foreground">{name}</span>
                            <ArrowRight size={14} className="text-orange-500" />
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-orange-500' : 'bg-orange-100'}`} />)}
                </div>
                </div>

                {/* Card 4: Professional Fit */}
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6 flex flex-col break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white shadow-md">
                        <Heart size={24} />
                    </div>
                    <h3 className="font-oswald font-bold text-lg text-foreground uppercase">Role Fit</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 flex-grow items-center">
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Team</div>
                        <div className="text-lg font-bold text-pink-600">High</div>
                    </div>
                    <div className="text-center border-l border-r border-border px-2">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Lead</div>
                        <div className="text-lg font-bold text-pink-600">{result.leadershipPotentialScore > 70 ? 'High' : 'Med'}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Strat</div>
                        <div className="text-lg font-bold text-pink-600">Avg</div>
                    </div>
                </div>
                {/* Button is purely visual in report, but interactive in web. Hide in PDF or keep as visual element? Keep as visual. */}
                <div className="mt-6 w-full py-2.5 rounded-lg bg-pink-50 text-pink-700 text-xs font-bold uppercase text-center">
                    Role Fit Analysis
                </div>
                </div>
            </div>
        </section>

        {/* 3. DETAILED TRAIT ANALYSIS */}
        <section className="container py-12">
            <SectionHeader title="Detailed Trait Analysis" subtitle="Breakdown of your personality inventory across three dimensions." />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* HPI - Personality */}
                <DetailCard title="Personality (HPI)" icon={Briefcase} theme="blue">
                <div className="space-y-5">
                    {(Object.entries(result.hpi) as [string, DimensionScore][]).slice(0, 7).map(([name, score]) => (
                        <TraitRow key={name} name={name} score={score.percentage} theme="blue" />
                    ))}
                </div>
                </DetailCard>

                {/* HDS - Derailers */}
                <DetailCard title="Risk Factors (HDS)" icon={AlertTriangle} theme="orange">
                <div className="space-y-5">
                    {(Object.entries(result.hds) as [string, DimensionScore][]).map(([name, score]) => (
                        <TraitRow key={name} name={name} score={score.percentage} theme="orange" />
                    ))}
                    {result.riskAnalysis.length === 0 && (
                        <div className="text-center py-8 text-sm text-muted-foreground italic">
                            No significant high-risk factors detected.
                        </div>
                    )}
                </div>
                </DetailCard>

                {/* MVPI - Values */}
                <DetailCard title="Values (MVPI)" icon={Target} theme="green">
                <div className="space-y-5">
                    {(Object.entries(result.mvpi) as [string, DimensionScore][]).map(([name, score]) => (
                        <TraitRow key={name} name={name} score={score.percentage} theme="green" />
                    ))}
                </div>
                </DetailCard>
            </div>
        </section>

        {/* 4. VALUES & MOTIVATORS (Split Layout) */}
        <section className="bg-white py-16 border-y border-border break-inside-avoid">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Core Values */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-pink-50 rounded-full text-pink-600">
                            <Heart size={28} />
                        </div>
                        <h2 className="text-3xl font-oswald font-bold text-foreground">Core Values</h2>
                    </div>
                    <div className="space-y-6">
                        {topMvpi.map(([name, val], idx) => (
                            <div key={name} className="flex gap-4 items-start group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center font-bold shadow-md">
                                {idx + 1}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-foreground mb-1">{name}</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    {val.interpretation?.split('.')[0] || 'Driven by this core value in professional settings.'}.
                                </p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Motivators */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-border">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                            <TrendingUp size={28} />
                        </div>
                        <h2 className="text-3xl font-oswald font-bold text-foreground">Key Motivators</h2>
                    </div>
                    <div className="space-y-4">
                        {topMvpi.map(([name], idx) => (
                            <div key={name} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="font-medium text-foreground text-lg">Opportunities for {name}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border opacity-75">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">D</div>
                            <span className="font-medium text-foreground text-lg">High-Impact Leadership Roles</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        {/* 5. CAREER PATH */}
        <section className="container py-16 break-before-page">
            <SectionHeader title="Career Path" subtitle="Unlocked analysis of your professional trajectory." />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1: Work Environment Fit */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm break-inside-avoid">
                <h3 className="font-oswald font-bold text-lg mb-6 flex items-center gap-2">
                    <Briefcase className="text-primary" size={20}/> Work Environment
                </h3>
                <div className="space-y-6">
                    {result.workEnvironment && result.workEnvironment.map((env) => (
                        <div key={env.label}>
                            <div className="flex justify-between text-sm font-medium mb-1">
                            <span>{env.label}</span>
                            <span className="text-primary">{Math.round(env.score)}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${env.score}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                {/* Column 2: Leadership Radar */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center break-inside-avoid">
                <h3 className="font-oswald font-bold text-lg mb-2 flex items-center gap-2 w-full">
                    <Activity className="text-primary" size={20}/> Leadership Style
                </h3>
                <div className="flex-grow w-full h-[300px] -ml-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="You" dataKey="A" stroke="#6257e3" strokeWidth={2} fill="#6257e3" fillOpacity={0.3} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                </div>

                {/* Column 3: Job Matches (UNLOCKED) */}
                <div className="bg-gradient-to-b from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6 shadow-sm relative overflow-hidden break-inside-avoid">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle size={80} className="text-emerald-600" />
                </div>
                
                <h3 className="font-oswald font-bold text-lg mb-6 flex items-center gap-2 text-emerald-900">
                    <CheckCircle className="text-emerald-600" size={20}/> Recommended Roles
                </h3>

                <div className="space-y-3 relative z-10">
                    {result.jobFit.map((job, i) => (
                        <div key={job} className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex justify-between items-center">
                            <span className="font-medium text-emerald-900">{job}</span>
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                            {98 - (i * 3)}% Match
                            </span>
                        </div>
                    ))}
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex justify-between items-center opacity-80">
                        <span className="font-medium text-emerald-900">Chief Operating Officer</span>
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">89% Match</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-emerald-100 flex justify-between items-center opacity-80">
                        <span className="font-medium text-emerald-900">VP of Strategy</span>
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">85% Match</span>
                    </div>
                </div>
                </div>
            </div>
        </section>

        {/* 6. RELATIONSHIPS (New Section) */}
        <section className="bg-white py-16 border-y border-border break-inside-avoid">
            <div className="container">
                <SectionHeader title="Relationship Dynamics" subtitle="How your personality influences interactions." />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Professional */}
                    <div className="p-6 border border-border rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Users size={24} className="text-blue-600" />
                            <h3 className="text-xl font-bold font-oswald">Professional Relationships</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-bold text-blue-600 uppercase mb-3">Strengths</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-1"/> Clear communication style</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-1"/> Reliability in delivery</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-blue-500 shrink-0 mt-1"/> Objective conflict resolution</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1"/> May appear too detached</li>
                                    <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1"/> Patience with ambiguity</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Personal */}
                    <div className="p-6 border border-border rounded-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Heart size={24} className="text-pink-600" />
                            <h3 className="text-xl font-bold font-oswald">Personal Dynamics</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-sm font-bold text-pink-600 uppercase mb-3">Strengths</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-pink-500 shrink-0 mt-1"/> Loyal and supportive</li>
                                    <li className="flex gap-2"><CheckCircle size={14} className="text-pink-500 shrink-0 mt-1"/> Excellent listener</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-orange-600 uppercase mb-3">Growth Areas</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1"/> Expressing needs openly</li>
                                    <li className="flex gap-2"><AlertTriangle size={14} className="text-orange-500 shrink-0 mt-1"/> Avoiding confrontation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div> {/* END OF PDF CONTENT WRAPPER */}

      {/* FOOTER - Hidden in PDF */}
      <section className="bg-gray-900 text-white py-16 text-center" data-html2canvas-ignore="true">
         <div className="container max-w-2xl">
            <h2 className="text-3xl font-oswald font-bold mb-4">Your Journey Starts Here</h2>
            <p className="text-white/60 mb-8">This report provides a baseline. Use the insights to drive your professional development plan.</p>
            <div className="flex justify-center gap-4">
               <button onClick={handleDownloadPDF} disabled={isGeneratingPdf} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-500 transition-colors">
                  {isGeneratingPdf ? 'Generating...' : 'Download Full PDF'}
               </button>
               <button onClick={onRetake} className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                  Retake Assessment
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};