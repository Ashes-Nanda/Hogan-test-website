import React from 'react';
import HoganReportFull from './results/report/HoganReportFull';
import { mockResultData, mockAiContent } from '@/data/mockReportData';

export const MockReportPage: React.FC = () => {
    return (
        <HoganReportFull
            resultData={mockResultData}
            isPaidUser={true}
            userEmail="mock.user@example.com"
            userId="mock-user-id"
            initialAiContent={mockAiContent}
        />
    );
};
