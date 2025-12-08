import React, { useState } from 'react';
import { User, TestStatus } from '../../types';
import { Download, Eye, Mail, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, MoreHorizontal, FileText } from 'lucide-react';

interface ParticipantsTableProps {
    users: User[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onViewDetails: (user: User) => void;
    onExportUser: (user: User) => void;
    onSelectionChange: (selectedIds: string[]) => void;
    selectedIds: string[];
    onBulkDelete: () => void;
    onBulkInvite: () => void;
    onDownloadPDF: (user: User) => void;
}

export const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
    users, loading, page, totalPages, onPageChange, onViewDetails, onExportUser, onSelectionChange, selectedIds, onBulkDelete, onBulkInvite, onDownloadPDF
}) => {
    const [sortField, setSortField] = useState<keyof User>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: keyof User) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === users.length) {
            onSelectionChange([]);
        } else {
            onSelectionChange(users.map(u => u.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter(sid => sid !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    // Client-side sorting for current page (or server side if passed up)
    // For now, let's just render. Server side sorting typically requires a fetch callback.
    // We'll assume the parent handles sorting or we do simplistic client sort here.
    const sortedUsers = [...users].sort((a, b) => {
        const factor = sortDirection === 'asc' ? 1 : -1;
        if (a[sortField]! < b[sortField]!) return -1 * factor;
        if (a[sortField]! > b[sortField]!) return 1 * factor;
        return 0;
    });

    return (
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden flex flex-col h-full relative">

            {/* Bulk Actions Bar */}
            {selectedIds.length > 0 && (
                <div className="absolute top-0 left-0 right-0 z-10 bg-primary text-primary-foreground p-2 flex items-center justify-between animate-fade-in-down shadow-md">
                    <div className="flex items-center gap-4 px-4">
                        <span className="font-bold text-sm">{selectedIds.length} Selected</span>
                        <div className="h-4 w-px bg-primary-foreground/30"></div>
                        <button onClick={onBulkDelete} className="flex items-center gap-1 text-sm hover:bg-white/10 px-2 py-1 rounded transition-colors">
                            <span className="font-bold">Delete</span>
                        </button>
                        <button onClick={onBulkInvite} className="flex items-center gap-1 text-sm hover:bg-white/10 px-2 py-1 rounded transition-colors">
                            <span className="font-medium">Resend Invite</span>
                        </button>
                    </div>
                    <button onClick={() => onSelectionChange([])} className="px-4 text-xs opacity-80 hover:opacity-100">Cancel</button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border table-fixed">
                    <thead className="bg-muted/40">
                        <tr>
                            <th className="px-6 py-4 w-12 text-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-input text-primary focus:ring-primary cursor-pointer w-4 h-4"
                                    checked={users.length > 0 && selectedIds.length === users.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th onClick={() => handleSort('name')} className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors group">
                                <div className="flex items-center gap-1">Employee {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}</div>
                            </th>
                            <th onClick={() => handleSort('status')} className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors">
                                <div className="flex items-center gap-1">Status {sortField === 'status' && (sortDirection === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}</div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider">
                                Attempts
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider">
                                Last Activity
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-montserrat font-semibold text-muted-foreground uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">Loading participants...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No participants found.</td></tr>
                        ) : sortedUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-input text-primary focus:ring-primary cursor-pointer w-4 h-4"
                                        checked={selectedIds.includes(user.id)}
                                        onChange={() => toggleSelect(user.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-semibold text-foreground">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-0.5 inline-flex text-[10px] leading-5 font-bold uppercase tracking-wide rounded-full border 
                                        ${user.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            user.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-slate-50 text-slate-600 border-slate-200'}`}>
                                        {user.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                                    {user.attempts.length || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                                    {user.attempts.length > 0
                                        ? new Date(user.attempts[user.attempts.length - 1].completedAt).toLocaleDateString()
                                        : 'Never'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {user.attempts.length > 0 ? (
                                        <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onExportUser(user)}
                                                className="text-muted-foreground hover:text-primary p-1.5 rounded-md hover:bg-muted transition-colors"
                                                title="Download CSV"
                                            >
                                                <Download size={16} />
                                            </button>
                                            {user.status === 'COMPLETED' && (
                                                <button
                                                    onClick={() => onDownloadPDF(user)}
                                                    className="text-muted-foreground hover:text-red-600 p-1.5 rounded-md hover:bg-muted transition-colors"
                                                    title="Download PDF Report"
                                                >
                                                    <FileText size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onViewDetails(user)}
                                                className="text-primary hover:text-primary/80 inline-flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10 hover:bg-primary/10 transition-colors text-xs font-bold"
                                            >
                                                <Eye size={14} /> View
                                            </button>
                                        </div>
                                    ) : (
                                        <button className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md hover:bg-muted border border-transparent hover:border-border transition-all">
                                            <Mail size={14} /> Remind
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Info */}
            <div className="bg-card px-6 py-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Showing page <span className="font-medium text-foreground">{page}</span> of <span className="font-medium text-foreground">{totalPages || 1}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        className="p-2 border border-input rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="p-2 border border-input rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
