import React from 'react';
import { Search, Filter, Download, ChevronDown, Check } from 'lucide-react';

interface AdminToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onExport: (type: 'official' | 'all' | 'raw' | 'selected') => void;
    selectedCount: number;
    // Add filter props later
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ searchTerm, onSearchChange, onExport, selectedCount }) => {
    const [isExportOpen, setIsExportOpen] = React.useState(false);

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
            {/* Search */}
            <div className="relative w-full sm:w-96">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search employees by name, email..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full sm:w-auto">
                {/* Filter Placeholder - Can be expanded */}
                <button className="flex items-center gap-2 px-4 py-2.5 bg-background border border-input rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all">
                    <Filter size={16} /> Filters
                </button>

                {/* Export Dropdown */}
                <div className="relative relative-dropdown">
                    <button
                        onClick={() => setIsExportOpen(!isExportOpen)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
                    >
                        <Download size={16} /> Export <ChevronDown size={14} className={`transition-transform ${isExportOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isExportOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsExportOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-48 bg-popover rounded-md shadow-lg border border-border z-20 overflow-hidden animate-fade-in-up">
                                <div className="p-1">
                                    <button onClick={() => { onExport('all'); setIsExportOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                                        Export All Results
                                    </button>
                                    <button onClick={() => { onExport('official'); setIsExportOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors">
                                        Export Official Only
                                    </button>
                                    <button onClick={() => { onExport('raw'); setIsExportOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors border-t border-border/50">
                                        Export Raw Data (CSV)
                                    </button>
                                    {selectedCount > 0 && (
                                        <button onClick={() => { onExport('selected'); setIsExportOpen(false); }} className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-md transition-colors border-t border-border/50 mt-1">
                                            Export Selected ({selectedCount})
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
