import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        text: "The insights from CerebralQ completely transformed how I approach leadership. I finally understand my blind spots.",
        author: "Sarah J.",
        role: "CTO, TechFlow"
    },
    {
        text: "Accurate and actionable. The career path section helped me pivot to a role that actually suits my personality.",
        author: "Michael R.",
        role: "Product Manager"
    },
    {
        text: "I've taken many assessments, but this one provided the most depth regarding my stress responses.",
        author: "Elena K.",
        role: "Director of Operations"
    }
];

export const TestimonialsCarousel: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <Quote size={48} className="mx-auto text-primary mb-8 opacity-50" />

                    <div className="min-h-[200px] flex flex-col justify-center">
                        <p className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
                            "{testimonials[current].text}"
                        </p>
                        <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-lg">{testimonials[current].author}</div>
                            <div className="text-sm text-white/50 uppercase tracking-wider">{testimonials[current].role}</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={prev} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                        <button onClick={next} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
