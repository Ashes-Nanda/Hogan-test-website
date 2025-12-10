import React, { useState, useEffect } from 'react';
import { MessageSquare, Save, Loader2 } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';

interface ReflectionPromptProps {
    question: string;
    promptId?: string;
    sectionId?: string;
    placeholder?: string;
}

export const ReflectionPrompt: React.FC<ReflectionPromptProps> = ({ question, placeholder, promptId = 'general' }) => {
    const [reflection, setReflection] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchReflection = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const { data } = await supabase
                    .from('reflections')
                    .select('content')
                    .eq('user_id', user.id)
                    .eq('prompt_id', promptId)
                    .single();

                if (data) {
                    setReflection(data.content);
                }
            }
        };
        fetchReflection();
    }, [promptId]);

    const handleSave = async () => {
        if (!userId) return;
        setIsSaving(true);

        // Check if exists
        const { data: existing } = await supabase
            .from('reflections')
            .select('id')
            .eq('user_id', userId)
            .eq('prompt_id', promptId)
            .single();

        let error;
        if (existing) {
            const { error: updateError } = await supabase
                .from('reflections')
                .update({ content: reflection, updated_at: new Date().toISOString() })
                .eq('id', existing.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('reflections')
                .insert({ user_id: userId, prompt_id: promptId, content: reflection });
            error = insertError;
        }

        setIsSaving(false);
        if (!error) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        } else {
            console.error('Error saving reflection:', error);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm my-8">
            <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-primary" size={24} />
                <h3 className="text-xl font-heading text-foreground">Reflection</h3>
            </div>
            <p className="text-muted-foreground mb-4">{question}</p>
            <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={placeholder}
                className="w-full h-32 p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none resize-none mb-4"
            />
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isSaved ? 'Saved!' : isSaving ? 'Saving...' : 'Save Reflection'}
                </button>
            </div>
        </div>
    );
};
