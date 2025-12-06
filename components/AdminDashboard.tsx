import React, { useState, useEffect } from 'react';
import { User, TestStatus, TestResult, DimensionScore } from '../types';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Download, Mail, Eye, UserPlus, LogOut, X, FileText, Activity, ShieldAlert, Lock, ArrowRight } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const { isAdminAuthenticated, loginAdmin, user } = useAuth();
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setVerifying(true);
    try {
      const success = await loginAdmin(passwordInput);
      if (!success) {
        setAuthError('Invalid admin password');
      }
    } catch {
      setAuthError('Error verifying password');
    } finally {
      setVerifying(false);
    }
  };


  useEffect(() => {
    if (!isAdminAuthenticated) return; // Don't fetch if not auth

    const fetchData = async () => {
      try {
        const { data: profiles, error: profilesError } = await supabase.from('profiles').select('*');
        if (profilesError) throw profilesError;

        const { data: attempts, error: attemptsError } = await supabase.from('attempts').select('*');
        if (attemptsError) throw attemptsError;

        const mappedUsers: User[] = profiles.map((p: any) => {
          const userAttempts = attempts.filter((a: any) => a.user_id === p.id)
            .sort((a: any, b: any) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime())
            .map((a: any) => ({
              id: a.id,
              number: a.attempt_number,
              completedAt: a.completed_at,
              answers: a.answers,
              result: a.result
            }));

          return {
            id: p.id,
            email: p.email,
            name: p.full_name || p.email,
            status: userAttempts.length > 0 ? TestStatus.COMPLETED : TestStatus.PENDING,
            token: 'admin-view',
            attempts: userAttempts
          };
        });
        setUsers(mappedUsers);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdminAuthenticated]);

  const stats = {
    total: users.length,
    completed: users.filter(u => u.status === TestStatus.COMPLETED).length,
    attempts: users.reduce((acc, u) => acc + (u.attempts?.length || 0), 0),
    pending: users.filter(u => u.status === TestStatus.PENDING).length,
  };

  const downloadCSV = (onlyOfficial: boolean, targetUser?: User) => {
    // Define headers
    const baseHeaders = ["Email", "Name", "Status", "Attempt_Num", "Completed_At", "Profile_Title", "Leadership_Potential", "Job_Fit", "Risk_Analysis"];

    // Collect all unique keys dynamically
    const allHpiKeys = new Set<string>();
    const allHdsKeys = new Set<string>();
    const allMvpiKeys = new Set<string>();

    // Determine which users to process
    const usersToProcess = targetUser ? [targetUser] : users;

    usersToProcess.forEach(user => {
      user.attempts.forEach(att => {
        if (att.result.hpi) Object.keys(att.result.hpi).forEach(k => allHpiKeys.add(k));
        if (att.result.hds) Object.keys(att.result.hds).forEach(k => allHdsKeys.add(k));
        if (att.result.mvpi) Object.keys(att.result.mvpi).forEach(k => allMvpiKeys.add(k));
      });
    });

    const hpiKeys = Array.from(allHpiKeys).sort();
    const hdsKeys = Array.from(allHdsKeys).sort();
    const mvpiKeys = Array.from(allMvpiKeys).sort();

    const traitHeaders: string[] = [];
    [...hpiKeys, ...hdsKeys, ...mvpiKeys].forEach(key => {
      traitHeaders.push(`${key}_Raw`, `${key}_Pct`, `${key}_Int`);
    });

    let csv = [...baseHeaders, ...traitHeaders].join(",") + "\n";

    usersToProcess.forEach(user => {
      if (user.email === 'admin@c4e.in') return; // Skip admin if needed

      const attemptsToExport = onlyOfficial ? user.attempts.slice(0, 1) : user.attempts;

      attemptsToExport.forEach(att => {
        const r = att.result;

        // Base Data
        const rowData = [
          user.email,
          user.name,
          user.status,
          att.number,
          att.completedAt,
          `"${r.profileTitle}"`,
          r.leadershipPotentialScore,
          `"${r.jobFit.join('; ')}"`,
          `"${r.riskAnalysis.join('; ')}"`
        ];

        // Trait Data
        [...hpiKeys, ...hdsKeys, ...mvpiKeys].forEach(key => {
          // Check HPI, HDS, MVPI
          const score = r.hpi[key] || r.hds[key] || r.mvpi[key];
          if (score) {
            rowData.push(score.raw, score.percentage, `"${score.interpretation || ''}"`);
          } else {
            rowData.push(0, 0, "");
          }
        });

        csv += rowData.join(",") + "\n";
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // Dynamic filename
    const filename = targetUser
      ? `hogan_export_${targetUser.name.replace(/\s+/g, '_')}.csv`
      : `hogan_export_${onlyOfficial ? 'official' : 'all'}.csv`;

    a.download = filename;
    a.click();
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-2xl border border-border animate-fade-in-up">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-red-500/10 p-4 rounded-full mb-4">
              <Lock className="text-red-600" size={32} />
            </div>
            <h1 className="text-2xl font-oswald font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground uppercase tracking-wide">Enter Admin Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
                <ShieldAlert size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={verifying}
              className="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {verifying ? 'Verifying...' : 'Access Dashboard'}
              {!verifying && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Return to Home</a>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated as admin but not logged in to app
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Session Expired</h2>
          <p className="mb-4 text-muted-foreground">You have verified admin access, but your user session has expired.</p>
          <a href="/auth" className="text-primary hover:underline font-bold">Log in to continue</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-card border-b border-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-oswald font-bold text-primary tracking-tight">CEREBRAL<span className="text-foreground">Q</span></span>
              <span className="ml-4 px-2 py-0.5 rounded-sm text-xs font-semibold bg-muted text-muted-foreground uppercase">Admin Console</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors">
                <Activity size={16} /> Take Assessment
              </a>
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
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-4 text-center">Loading data...</td></tr>
                ) : users.filter(u => u.email !== 'admin@c4e.in').map((user) => (
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
                        ? new Date(user.attempts[user.attempts.length - 1].completedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.attempts.length > 0 ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => downloadCSV(false, user)}
                            className="text-muted-foreground hover:text-primary p-1.5 rounded-md hover:bg-muted transition-colors"
                            title="Download CSV"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10"
                          >
                            <Eye size={16} /> Details
                          </button>
                        </div>
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
          <div className="bg-popover rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-border">
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
              <div className="space-y-8">
                {selectedUser.attempts.map((att) => (
                  <div key={att.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-muted/50 px-4 py-3 border-b border-border flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">Attempt #{att.number}</span>
                        {att.number === 1 && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-sm border border-primary/20">OFFICIAL</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(att.completedAt).toLocaleString()}</span>
                    </div>

                    <div className="p-6">
                      {/* High Level Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground uppercase">Profile Title</p>
                          <p className="font-bold text-foreground">{att.result.profileTitle}</p>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground uppercase">Leadership Potential</p>
                          <p className="font-bold text-foreground">{att.result.leadershipPotentialScore}%</p>
                        </div>
                        <div className="bg-muted/20 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground uppercase">Risk Factors</p>
                          <p className="font-bold text-foreground">{att.result.riskAnalysis.length > 0 ? att.result.riskAnalysis.length : 'None'}</p>
                        </div>
                      </div>

                      {/* Detailed Scores */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* HPI */}
                        <div>
                          <h5 className="text-xs font-bold text-blue-600 uppercase mb-3 border-b border-blue-100 pb-1">HPI (Personality)</h5>
                          <div className="space-y-3">
                            {Object.entries(att.result.hpi).map(([key, val]) => (
                              <div key={key} className="text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{key}</span>
                                  <span className="font-bold">{val.percentage}%</span>
                                </div>
                                <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500" style={{ width: `${val.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{val.interpretation}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* HDS */}
                        <div>
                          <h5 className="text-xs font-bold text-orange-600 uppercase mb-3 border-b border-orange-100 pb-1">HDS (Derailers)</h5>
                          <div className="space-y-3">
                            {Object.entries(att.result.hds).map(([key, val]) => (
                              <div key={key} className="text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{key}</span>
                                  <span className="font-bold">{val.percentage}%</span>
                                </div>
                                <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-orange-500" style={{ width: `${val.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{val.interpretation}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* MVPI */}
                        <div>
                          <h5 className="text-xs font-bold text-green-600 uppercase mb-3 border-b border-green-100 pb-1">MVPI (Values)</h5>
                          <div className="space-y-3">
                            {Object.entries(att.result.mvpi).map(([key, val]) => (
                              <div key={key} className="text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium">{key}</span>
                                  <span className="font-bold">{val.percentage}%</span>
                                </div>
                                <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500" style={{ width: `${val.percentage}%` }}></div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{val.interpretation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Raw Answers (Collapsible or Scrollable) */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <details className="group">
                          <summary className="flex items-center gap-2 text-sm font-bold text-muted-foreground cursor-pointer hover:text-foreground">
                            <FileText size={16} /> View Raw Answers
                          </summary>
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs max-h-40 overflow-y-auto p-2 bg-muted/30 rounded-md">
                            {Object.entries(att.answers).map(([qid, score]) => (
                              <div key={qid} className="flex justify-between p-1 border-b border-border/50">
                                <span className="text-muted-foreground">{qid}</span>
                                <span className="font-mono font-bold">{score}</span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end gap-2 bg-card">
              <button onClick={() => setSelectedUser(null)} className="px-4 py-2 text-muted-foreground font-medium hover:bg-muted rounded-md transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};