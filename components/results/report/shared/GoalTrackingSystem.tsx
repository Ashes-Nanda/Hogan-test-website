import React, { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle, Trash2, Loader2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { supabase } from '@/services/supabaseClient';

interface Goal {
    id: string;
    content: string;
    is_completed: boolean;
}

interface GoalTrackingSystemProps {
    personalityType?: string;
    userId?: string;
}

export const GoalTrackingSystem: React.FC<GoalTrackingSystemProps> = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchGoals = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const { data } = await supabase
                    .from('goals')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: true });

                if (data) {
                    setGoals(data);
                }
            }
            setLoading(false);
        };
        fetchGoals();
    }, []);

    const addGoal = async () => {
        if (newGoal.trim() && userId) {
            const { data, error } = await supabase
                .from('goals')
                .insert({ user_id: userId, content: newGoal })
                .select()
                .single();

            if (data && !error) {
                setGoals([...goals, data]);
                setNewGoal('');
            }
        }
    };

    const removeGoal = async (id: string) => {
        const { error } = await supabase.from('goals').delete().eq('id', id);
        if (!error) {
            setGoals(goals.filter(g => g.id !== id));
        }
    };

    const toggleGoal = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase.from('goals').update({ is_completed: !currentStatus }).eq('id', id);
        if (!error) {
            setGoals(goals.map(g => g.id === id ? { ...g, is_completed: !currentStatus } : g));
        }
    }

    return (
        <section className="container py-16 bg-slate-50 border-y border-border">
            <SectionHeader title="Goal Tracking System" subtitle="Turn your insights into actionable professional goals." icon={Target} />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-border p-6">
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a new professional goal..."
                        className="flex-grow px-4 py-3 rounded-lg border border-input focus:ring-2 focus:ring-primary outline-none"
                        onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                    />
                    <button
                        onClick={addGoal}
                        disabled={!userId}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:opacity-90 flex items-center gap-2 disabled:opacity-50"
                    >
                        <Plus size={20} /> Add
                    </button>
                </div>

                <div className="space-y-3">
                    {loading && <div className="text-center py-4"><Loader2 className="animate-spin mx-auto" /></div>}
                    {!loading && goals.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground italic">
                            No goals added yet. Start by adding one above!
                        </div>
                    )}
                    {goals.map((goal) => (
                        <div key={goal.id} className={`flex items-center justify-between p-4 rounded-lg group transition-colors ${goal.is_completed ? 'bg-green-50' : 'bg-muted/30 hover:bg-muted/50'}`}>
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleGoal(goal.id, goal.is_completed)}>
                                <CheckCircle className={`${goal.is_completed ? 'text-green-500 fill-green-100' : 'text-muted-foreground'}`} size={20} />
                                <span className={`font-medium text-foreground ${goal.is_completed ? 'line-through text-muted-foreground' : ''}`}>{goal.content}</span>
                            </div>
                            <button
                                onClick={() => removeGoal(goal.id)}
                                className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
