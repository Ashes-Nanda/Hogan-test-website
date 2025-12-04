import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { HoganResultData } from "@/types/tests/hogan/results";

interface GeneratePDFProps {
    resultData: HoganResultData;
    executiveSummary: string | null;
    confidenceScore: number | null;
    convertedScores?: Record<string, any>;
    valuesAndMotivators?: {
        coreValues: { title: string; description: string }[];
        motivators: { title: string; description: string }[];
    };
    career?: {
        summary: string;
        suggestions: { title: string; matchPercentage: number }[];
    };
    dailyHabits?: {
        habits: {
            morning: { title: string; description: string };
            afternoon: { title: string; description: string };
            evening: { title: string; description: string };
        };
    };
    communityConnection?: {
        summary: string;
        suggestions: string[];
    };
}

export const generateHoganPDF = ({
    resultData,
    executiveSummary,
    confidenceScore,
    convertedScores,
    valuesAndMotivators,
    career,
    dailyHabits,
    communityConnection
}: GeneratePDFProps) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Helper for centering text
    const centerText = (text: string, y: number, size: number = 12, isBold: boolean = false) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        const textWidth = doc.getTextWidth(text);
        doc.text(text, (pageWidth - textWidth) / 2, y);
    };

    // --- Page 1: Overview ---

    // Header
    centerText('HOGAN ASSESSMENT REPORT', 22, 22, true);
    centerText(`Prepared for: ${resultData.firstname || 'User'}`, 32, 14);
    centerText(`Date: ${new Date(resultData.takenAt).toLocaleDateString()}`, 40, 10);

    // Profile Summary
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Profile Overview', 14, 60);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Hogan Profile: ${resultData.hoganProfile}`, 14, 70);
    doc.text(`Leadership Potential: ${resultData.leadershipPotential}%`, 14, 78);
    if (confidenceScore) {
        doc.text(`Confidence Score: ${confidenceScore}%`, 14, 86);
    }

    // Executive Summary
    let currentY = 100;
    if (executiveSummary) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Executive Summary', 14, currentY);
        currentY += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const splitSummary = doc.splitTextToSize(executiveSummary, pageWidth - 28);
        doc.text(splitSummary, 14, currentY);
        currentY += (splitSummary.length * 5) + 15;
    }

    // Job Fit
    if (resultData.jobFit && resultData.jobFit.length > 0) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Recommended Roles', 14, currentY);
        currentY += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        resultData.jobFit.slice(0, 5).forEach((role, i) => {
            doc.text(`• ${role}`, 14, currentY + (i * 6));
        });
    }

    // --- Page 2: HPI Scores ---
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Hogan Personality Inventory (HPI)', 14, 20);

    const hpiData = Object.entries(resultData.hpiScores).map(([key, value]) => [
        key,
        `${value.percentage}%`,
        value.interpretation || '-'
    ]);

    autoTable(doc, {
        startY: 30,
        head: [['Dimension', 'Score', 'Interpretation']],
        body: hpiData,
        theme: 'grid',
        headStyles: { fillColor: [66, 135, 245] },
        styles: { fontSize: 10, cellPadding: 3 }
    });

    // --- HDS Scores ---
    if (resultData.hdsScores) {
        const finalY = (doc as any).lastAutoTable.finalY || 30;

        // Check if we need a new page
        if (finalY > 200) {
            doc.addPage();
            doc.setFontSize(16);
            doc.text('Hogan Development Survey (HDS)', 14, 20);

            const hdsData = Object.entries(resultData.hdsScores).map(([key, value]) => [
                key,
                `${value.percentage}%`,
                value.interpretation || '-'
            ]);

            autoTable(doc, {
                startY: 30,
                head: [['Risk Factor', 'Score', 'Interpretation']],
                body: hdsData,
                theme: 'grid',
                headStyles: { fillColor: [245, 108, 66] },
                styles: { fontSize: 10, cellPadding: 3 }
            });
        } else {
            doc.setFontSize(16);
            doc.text('Hogan Development Survey (HDS)', 14, finalY + 20);

            const hdsData = Object.entries(resultData.hdsScores).map(([key, value]) => [
                key,
                `${value.percentage}%`,
                value.interpretation || '-'
            ]);

            autoTable(doc, {
                startY: finalY + 30,
                head: [['Risk Factor', 'Score', 'Interpretation']],
                body: hdsData,
                theme: 'grid',
                headStyles: { fillColor: [245, 108, 66] },
                styles: { fontSize: 10, cellPadding: 3 }
            });
        }
    }

    // --- Page 3: MVPI Scores ---
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Motives, Values, Preferences Inventory (MVPI)', 14, 20);

    if (resultData.mvpiScores) {
        const mvpiData = Object.entries(resultData.mvpiScores).map(([key, value]) => [
            key,
            `${value.percentage}%`,
            value.interpretation || '-'
        ]);

        autoTable(doc, {
            startY: 30,
            head: [['Value', 'Score', 'Interpretation']],
            body: mvpiData,
            theme: 'grid',
            headStyles: { fillColor: [66, 245, 135] },
            styles: { fontSize: 10, cellPadding: 3 }
        });
    }

    // --- Personal Examples ---
    if (convertedScores) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Personal Examples', 14, 20);

        const entries = Object.entries(convertedScores as Record<string, any>);
        const topTraits = entries.sort(([, a], [, b]) => b.percentage - a.percentage).slice(0, 2);
        const bottomTraits = entries.sort(([, a], [, b]) => a.percentage - b.percentage).slice(0, 2);

        let yPos = 35;

        doc.setFontSize(14);
        doc.setTextColor(0, 100, 0); // Dark Green
        doc.text('Superpowers (High Traits)', 14, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');

        topTraits.forEach(([trait, score]) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`High ${trait}`, 14, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            const text = `Because you scored high in ${trait}, you likely ${score.interpretation?.toLowerCase() || 'exhibit strong traits'}.`;
            const splitText = doc.splitTextToSize(text, pageWidth - 28);
            doc.text(splitText, 14, yPos);
            yPos += (splitText.length * 5) + 8;
        });

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(200, 100, 0); // Orange
        doc.text('Blind Spots (Low Traits)', 14, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');

        bottomTraits.forEach(([trait, score]) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`Low ${trait}`, 14, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            const text = `A lower score in ${trait} suggests you might ${score.interpretation?.toLowerCase() || 'struggle with this area'}.`;
            const splitText = doc.splitTextToSize(text, pageWidth - 28);
            doc.text(splitText, 14, yPos);
            yPos += (splitText.length * 5) + 8;
        });
    }

    // --- Values & Motivators ---
    if (valuesAndMotivators) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Values & Motivators', 14, 20);

        let yPos = 35;

        doc.setFontSize(14);
        doc.text('Core Values', 14, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        valuesAndMotivators.coreValues.forEach((val: any, i: number) => {
            doc.setFont('helvetica', 'bold');
            doc.text(`${i + 1}. ${val.title}`, 14, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            const splitText = doc.splitTextToSize(val.description, pageWidth - 28);
            doc.text(splitText, 14, yPos);
            yPos += (splitText.length * 5) + 6;
        });

        yPos += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Key Motivators', 14, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        valuesAndMotivators.motivators.forEach((mot: any) => {
            doc.text(`• ${mot.title}: ${mot.description}`, 14, yPos);
            yPos += 8;
        });
    }

    // --- Career Path ---
    if (career) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Career Path & Work Environment', 14, 20);

        let yPos = 35;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');

        const summary = doc.splitTextToSize(career.summary, pageWidth - 28);
        doc.text(summary, 14, yPos);
        yPos += (summary.length * 5) + 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Recommended Roles', 14, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        career.suggestions.forEach((job: any) => {
            doc.text(`• ${job.title} (${job.matchPercentage}% Match)`, 14, yPos);
            yPos += 6;
        });
    }

    // --- Relationship Insights ---
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Relationship Insights', 14, 20);

    let yPos = 35;

    // Professional
    doc.setFontSize(14);
    doc.text('Professional Relationships', 14, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('• Clear communication style', 14, yPos); yPos += 6;
    doc.text('• Reliability in delivery', 14, yPos); yPos += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Growth Areas:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('• May appear too detached', 14, yPos); yPos += 6;
    doc.text('• Patience with ambiguity', 14, yPos); yPos += 15;

    // Personal
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Dynamics', 14, yPos);
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Strengths:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('• Loyal and supportive', 14, yPos); yPos += 6;
    doc.text('• Excellent listener', 14, yPos); yPos += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Growth Areas:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text('• Expressing needs openly', 14, yPos); yPos += 6;
    doc.text('• Avoiding confrontation', 14, yPos); yPos += 10;

    // --- Growth Journey ---
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Growth Journey', 14, 20);
    yPos = 35;

    const phases = [
        { title: 'Phase 1: Immediate (Awareness & Quick Wins)', items: ['Review "Risk Factors" report', 'Identify top 2 strengths to leverage', 'Share profile with a mentor'] },
        { title: 'Phase 2: Short Term (Skill Development)', items: ['Practice the "10-second pause"', 'Seek feedback on communication', 'Optimize daily habits'] },
        { title: 'Phase 3: Long Term (Mastery & Leadership)', items: ['Mentor others with similar profiles', 'Lead high-stakes projects', 'Re-assess profile annually'] }
    ];

    phases.forEach(phase => {
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(phase.title, 14, yPos);
        yPos += 8;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        phase.items.forEach(item => {
            doc.text(`• ${item}`, 14, yPos);
            yPos += 6;
        });
        yPos += 10;
    });

    // --- Daily Habits ---
    if (dailyHabits) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Daily Habits', 14, 20);
        yPos = 35;

        const habits = [
            { time: 'Morning', title: dailyHabits.habits.morning.title, desc: dailyHabits.habits.morning.description },
            { time: 'Afternoon', title: dailyHabits.habits.afternoon.title, desc: dailyHabits.habits.afternoon.description },
            { time: 'Evening', title: dailyHabits.habits.evening.title, desc: dailyHabits.habits.evening.description }
        ];

        habits.forEach(habit => {
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.text(`${habit.time}: ${habit.title}`, 14, yPos);
            yPos += 8;
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const splitDesc = doc.splitTextToSize(habit.desc, pageWidth - 28);
            doc.text(splitDesc, 14, yPos);
            yPos += (splitDesc.length * 5) + 10;
        });
    }

    // --- Community ---
    if (communityConnection) {
        doc.addPage();
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Community Connection', 14, 20);
        yPos = 35;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const summary = doc.splitTextToSize(communityConnection.summary, pageWidth - 28);
        doc.text(summary, 14, yPos);
        yPos += (summary.length * 5) + 5;

        communityConnection.suggestions.forEach((sugg: string) => {
            doc.text(`• ${sugg}`, 14, yPos);
            yPos += 6;
        });
    }

    // Top Values & Risk Areas (Summary at the end)
    let finalY = yPos + 20;
    if (finalY > doc.internal.pageSize.height - 50) {
        doc.addPage();
        finalY = 20;
    }

    if (resultData.mvpiTopValues && resultData.mvpiTopValues.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Core Values Summary', 14, finalY);
        finalY += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        resultData.mvpiTopValues.forEach((val, i) => {
            doc.text(`• ${val}`, 14, finalY);
            finalY += 6;
        });
        finalY += 10;
    }

    if (resultData.hdsRiskAreas && resultData.hdsRiskAreas.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Potential Risk Areas Summary', 14, finalY);
        finalY += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        resultData.hdsRiskAreas.forEach((area, i) => {
            doc.text(`• ${area}`, 14, finalY);
            finalY += 6;
        });
    }

    // --- Action Plan ---
    doc.addPage();
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Action Plan', 14, 20);

    const actions = [
        "Leverage your high Ambition by taking on a new leadership project.",
        "Mitigate risk of being 'Excitable' by practicing a 10-second pause before reacting.",
        "Utilize your Interpersonal Sensitivity to mentor a junior team member."
    ];

    let actionY = 35;
    doc.setFontSize(11);

    actions.forEach((action, i) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`Step ${i + 1}`, 14, actionY);
        actionY += 6;
        doc.setFont('helvetica', 'normal');
        doc.text(action, 14, actionY);
        actionY += 12;
    });

    doc.save(`Hogan_Report_${resultData.firstname || 'User'}.pdf`);
};
