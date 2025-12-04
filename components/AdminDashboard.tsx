import React, { useState } from 'react';
import { User, TestStatus, TestResult, DimensionScore } from '../types';
import { MOCK_USERS } from '../constants';
import { Download, Mail, Eye, UserPlus, LogOut, X, FileText, Activity } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const stats = {
    total: MOCK_USERS.length - 1, // Exclude admin
    completed: MOCK_USERS.filter(u => u.status === TestStatus.COMPLETED && u.email !== 'admin@acme.inc').length,
    attempts: MOCK_USERS.reduce((acc, u) => acc + (u.attempts?.length || 0), 0),
    pending: MOCK_USERS.filter(u => u.status === TestStatus.PENDING).length,
  };

  const downloadCSV = (onlyOfficial: boolean) => {
    let csv = "Email,Name,Status,Attempt_Num,Completed_At,HPI_Adj_Raw,HPI_Adj_Pct,Interpretation\n";
    
    MOCK_USERS.forEach(user => {
      if (user.email === 'admin@acme.inc') return;
      
      const attemptsToExport = onlyOfficial ? user.attempts.slice(0, 1) : user.attempts;
      
      attemptsToExport.forEach(att => {
        // Simplified CSV row construction for demo
        const adjScore = att.result.hpi['Adjustment'];
        const row = [
          user.email,
          user.name,
          user.status,
          att.number,
          att.completedAt,
          adjScore?.raw || 0,
          adjScore?.percentage || 0,
          `"${adjScore?.interpretation || ''}"`
        ].join(",");
        csv += row + "\n";
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hogan_export_${onlyOfficial ? 'official' : 'all'}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-oswald font-bold text-primary tracking-tight">CEREBRAL<span className="text-foreground">Q</span></span>
              <span className="ml-4 px-2 py-0.5 rounded-sm text-xs font-semibold bg-muted text-muted-foreground uppercase">Admin Console</span>
            </div>
            <div className="flex items-center">
              <button onClick={onLogout} className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground uppercase">Total Employees</p>
            <p className="mt-2 text-3xl font-oswald font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground uppercase">Completed Tests</p>
            <p className="mt-2 text-3xl font-oswald font-bold text-emerald-600">{stats.completed}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground uppercase">Total Attempts</p>
            <p className="mt-2 text-3xl font-oswald font-bold text-primary">{stats.attempts}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground uppercase">Pending</p>
            <p className="mt-2 text-3xl font-oswald font-bold text-muted-foreground/50">{stats.pending}</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-oswald font-semibold text-foreground">Participants</h2>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-card border border-input rounded-md text-sm font-medium text-foreground hover:bg-muted shadow-sm transition-colors">
              <UserPlus size={16} /> Invite
            </button>
            <div className="flex rounded-md shadow-sm">
                <button 
                  onClick={() => downloadCSV(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-l-md text-sm font-medium hover:opacity-90 transition-colors border-r border-primary-foreground/20"
                >
                  Export Official
                </button>
                <button 
                  onClick={() => downloadCSV(false)}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-r-md text-sm font-medium hover:opacity-90 transition-colors"
                  title="Export All Attempts"
                >
                  <Download size={16} />
                </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attempts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Activity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {MOCK_USERS.filter(u => u.email !== 'admin@acme.inc').map((user) => (
                  <tr key={user.email} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                          user.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-muted text-muted-foreground'}`}>
                        {user.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-bold">
                       {user.attempts.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {user.attempts.length > 0 
                        ? new Date(user.attempts[user.attempts.length-1].completedAt).toLocaleDateString() 
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.attempts.length > 0 ? (
                        <button 
                            onClick={() => setSelectedUser(user)}
                            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10"
                        >
                          <Eye size={16} /> Details
                        </button>
                      ) : (
                        <button className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                          <Mail size={16} /> Resend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div className="bg-popover rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
                <div className="flex justify-between items-center p-6 border-b border-border bg-muted/30">
                    <div>
                        <h3 className="text-xl font-oswald font-bold text-foreground">{selectedUser.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    </div>
                    <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto bg-muted/10">
                    <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Attempt History</h4>
                    <div className="space-y-6">
                        {selectedUser.attempts.map((att) => (
                            <div key={att.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                                <div className="bg-muted/50 px-4 py-3 border-b border-border flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-foreground">Attempt #{att.number}</span>
                                        {att.number === 1 && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-sm border border-primary/20">OFFICIAL</span>}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{new Date(att.completedAt).toLocaleString()}</span>
                                </div>
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* HPI Summary for this attempt */}
                                    <div className="col-span-2">
                                        <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Top Dimensions Analysis</p>
                                        <div className="space-y-2">
                                            {Object.entries(att.result.hpi).slice(0, 3).map(([key, val]) => {
                                                const score = val as DimensionScore;
                                                return (
                                                  <div key={key} className="text-sm border-l-2 border-primary pl-3 py-1">
                                                      <div className="flex justify-between">
                                                          <span className="font-bold text-foreground">{key}</span>
                                                          <span className="font-mono font-bold text-primary">{score.percentage}%</span>
                                                      </div>
                                                      <p className="text-muted-foreground text-xs mt-1 italic">{score.interpretation}</p>
                                                  </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-border flex justify-end gap-2 bg-card">
                    <button onClick={() => setSelectedUser(null)} className="px-4 py-2 text-muted-foreground font-medium hover:bg-muted rounded-md transition-colors">Close</button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-md hover:opacity-90 shadow-sm flex items-center gap-2 transition-colors">
                        <Download size={16}/> Download Report
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};