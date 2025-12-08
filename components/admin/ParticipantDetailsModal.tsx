import React from 'react';
import { User } from '../../types';
import { X, FileText, Download, Clock, ShieldCheck, User as UserIcon, Mail } from 'lucide-react';

interface ParticipantDetailsModalProps {
    user: User;
    onClose: () => void;
}

export const ParticipantDetailsModal: React.FC<ParticipantDetailsModalProps> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-border bg-muted/20">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-2xl font-oswald font-bold text-foreground">{user.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail size={14} /> {user.email}
                                <span className="text-border mx-1">|</span>
                                <span className="uppercase tracking-wide text-xs font-bold">{user.status.replace('_', ' ')}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-0 overflow-y-auto bg-muted/5 flex-1 relative">
                    <div className="max-w-4xl mx-auto py-8 px-6">

                        {/* Timeline / History */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={16} className="text-primary" />
                                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Attempt History</h4>
                            </div>

                            <div className="space-y-6">
                                {user.attempts.length === 0 ? (
                                    <div className="p-8 text-center border-2 border-dashed border-border rounded-lg bg-background/50">
                                        <p className="text-muted-foreground text-sm">No attempts recorded yet.</p>
                                    </div>
                                ) : user.attempts.map((att) => (
                                    <div key={att.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-all">
                                        <div className="bg-card px-6 py-4 border-b border-border flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="font-oswald font-bold text-lg text-foreground">Attempt #{att.number}</span>
                                                {att.number === 1 && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-sm border border-primary/20 uppercase tracking-wide">Official Record</span>}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-muted-foreground font-mono">{new Date(att.completedAt).toLocaleString()}</span>
                                                <button className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1 px-3 py-1.5 bg-primary/5 rounded-md hover:bg-primary/10 transition-colors">
                                                    <Download size={14} /> PDF Report
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {/* High Level Stats */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Archetype</p>
                                                    <p className="font-oswald font-bold text-lg text-foreground">{att.result.profileTitle}</p>
                                                </div>
                                                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Leadership Potential</p>
                                                    <div className="flex items-end gap-2">
                                                        <p className="font-oswald font-bold text-2xl text-foreground leading-none">{att.result.leadershipPotentialScore}</p>
                                                        <span className="text-xs text-muted-foreground mb-1">/ 100</span>
                                                    </div>
                                                </div>
                                                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                                                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Identified Risks</p>
                                                    <p className="font-oswald font-bold text-lg text-foreground">{att.result.riskAnalysis.length > 0 ? `${att.result.riskAnalysis.length} Factors` : 'None'}</p>
                                                </div>
                                            </div>

                                            {/* Detailed Scores Section */}
                                            <h5 className="text-xs font-bold text-muted-foreground uppercase mb-4 pl-1">Psychometric Profile</h5>
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                {/* HPI */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 border-b border-border pb-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                        <h5 className="text-xs font-bold text-foreground uppercase">HPI (Day-to-Day)</h5>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {Object.entries(att.result.hpi).map(([key, val]) => (
                                                            <div key={key} className="text-sm group/bar">
                                                                <div className="flex justify-between mb-1.5">
                                                                    <span className="font-medium text-xs text-muted-foreground group-hover/bar:text-foreground transition-colors">{key}</span>
                                                                    <span className="font-bold text-xs">{val.percentage}%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${val.percentage}%` }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* HDS */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 border-b border-border pb-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                        <h5 className="text-xs font-bold text-foreground uppercase">HDS (Under Pressure)</h5>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {Object.entries(att.result.hds).map(([key, val]) => (
                                                            <div key={key} className="text-sm group/bar">
                                                                <div className="flex justify-between mb-1.5">
                                                                    <span className="font-medium text-xs text-muted-foreground group-hover/bar:text-foreground transition-colors">{key}</span>
                                                                    <span className="font-bold text-xs">{val.percentage}%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${val.percentage}%` }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* MVPI */}
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 border-b border-border pb-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                        <h5 className="text-xs font-bold text-foreground uppercase">MVPI (Drivers)</h5>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {Object.entries(att.result.mvpi).map(([key, val]) => (
                                                            <div key={key} className="text-sm group/bar">
                                                                <div className="flex justify-between mb-1.5">
                                                                    <span className="font-medium text-xs text-muted-foreground group-hover/bar:text-foreground transition-colors">{key}</span>
                                                                    <span className="font-bold text-xs">{val.percentage}%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${val.percentage}%` }}></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Raw Answers Toggle */}
                                            <div className="mt-8 pt-4 border-t border-border">
                                                <details className="group/details">
                                                    <summary className="flex items-center gap-2 text-xs font-bold text-primary cursor-pointer hover:underline select-none">
                                                        <FileText size={14} /> View Raw Answer Data
                                                    </summary>
                                                    <div className="mt-4 p-4 bg-muted/30 rounded-md border border-border">
                                                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-[10px]">
                                                            {Object.entries(att.answers).map(([qid, score]) => (
                                                                <div key={qid} className="flex justify-between p-1.5 bg-background rounded border border-border/50">
                                                                    <span className="text-muted-foreground font-mono">{qid}</span>
                                                                    <span className="font-bold">{score}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </details>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-border flex justify-between items-center bg-card">
                    <p className="text-xs text-muted-foreground">User ID: <span className="font-mono">{user.id}</span></p>
                    <button onClick={onClose} className="px-6 py-2 bg-foreground text-background font-bold text-sm hover:opacity-90 rounded-md transition-colors shadow-lg">
                        Close Details
                    </button>
                </div>
            </div>
        </div>
    );
};
