import React from 'react';
import { Unit, ThemeConfig } from '../types';
import { ROMANTIC_QUOTES } from '../data/syllabus';
import { Heart, Sparkles, Printer, Info, HelpCircle } from 'lucide-react';
import { StenihaAshwinLogo } from './StenihaAshwinLogo';

interface ComponentProps {
  units: Unit[];
  theme: ThemeConfig;
  activeThemeName: string;
}

export const A4PagePreview: React.FC<ComponentProps> = ({ units, theme, activeThemeName }) => {

  const triggerBrowserPrint = () => {
    window.print();
  };

  // Floral borders SVGs dynamically adjusted with theme primary color
  const renderFloralCorner = (position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    const color = theme.primary;
    const rotate = {
      'top-left': 'rotate-0',
      'top-right': 'rotate-90',
      'bottom-left': 'rotate-270 translate-y-[-10px]',
      'bottom-right': 'rotate-180'
    }[position];

    return (
      <svg
        className={`absolute h-16 w-16 opacity-35 pointer-events-none ${rotate} ${
          position.startsWith('top') ? 'top-2' : 'bottom-2'
        } ${position.endsWith('left') ? 'left-2' : 'right-2'}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 10 C 35 15, 15 35, 10 60 C 15 50, 35 50, 45 40 C 35 30, 25 35, 10 10 Z" fill={color} />
        <path d="M5 25 C 20 28, 25 20, 25 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="15" cy="45" r="3" fill={color} />
        <circle cx="45" cy="15" r="4" fill={color} />
        <circle cx="40" cy="40" r="2.5" fill={color} />
      </svg>
    );
  };

  const renderQuantumWave = (position: 'top-right' | 'bottom-left') => {
    const rotate = position === 'bottom-left' ? 'rotate-180 bottom-0 left-0' : 'top-0 right-0';
    return (
      <div className={`absolute ${rotate} opacity-15 pointer-events-none`}>
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M10 50 Q30 10 50 50 T90 50" fill="none" stroke={theme.primary} strokeWidth="2" />
          <circle cx="50" cy="50" r="5" fill={theme.primary} />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Info Panel for printing instruction */}
      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start space-x-3 text-xs text-slate-500">
        <Info className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">Exam Print Guide (Ctrl + P or Cmd + P):</p>
          <p>This layout is strictly optimized for A4 paper. To ensure perfect prints for Steniha:</p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1 font-mono text-[10px]">
            <li>1. Toggle target view to 'Print layout'</li>
            <li>2. In Chrome Print interface, set <b>Layout: Portrait</b></li>
            <li>3. Set <b>Margins: None</b> or Default</li>
            <li>4. Enable <b>Background graphics</b> in Options to display the romantic floral borders and colors.</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={triggerBrowserPrint}
          className="flex items-center space-x-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          style={{ backgroundColor: theme.primary }}
        >
          <Printer className="h-4 w-4" />
          <span>Save PDF / Print A4 Guide</span>
        </button>
      </div>

      {/* RENDER THE VIRTUAL PAGES SHEET BY SHEET */}
      <div className="space-y-8 flex flex-col items-center">
        {/* PAGE 1: COVER SHEET */}
        <div 
          className="a4-sheet relative bg-white border-[16px] shadow-2xl text-slate-800 p-12 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-300"
          style={{ width: '210mm', height: '297mm', pageBreakBefore: 'always', pageBreakAfter: 'always', borderColor: theme.bgLight }}
        >
          {renderFloralCorner('top-left')}
          {renderFloralCorner('top-right')}
          {renderFloralCorner('bottom-left')}
          {renderFloralCorner('bottom-right')}
          {renderQuantumWave('top-right')}
          {renderQuantumWave('bottom-left')}

          {/* Top banner */}
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-slate-400">Anna University &bull; Regulation 2021</span>
            <div className="text-[11px] tracking-wider uppercase font-semibold text-slate-500">AL3451 / AD3491 &bull; Fundamentals of Data Science & Machine Learning</div>
          </div>

          {/* Central title info */}
          <div className="my-auto space-y-6 flex flex-col items-center justify-center">
            <div className="transform hover:scale-105 transition-transform duration-500">
              <StenihaAshwinLogo size={140} withBacking={true} glow={activeThemeName === 'obsidian'} />
            </div>

            <div className="space-y-2">
              <h1 className="text-[32px] font-serif italic leading-tight pb-2" style={{ color: theme.primary }}>
                The Ultimate A4<br />Exam Masterpiece
              </h1>
              <p className="text-sm font-sans uppercase tracking-[0.2em] not-italic font-bold text-slate-400">
                The Ultimate Study Companion for My Favorite Person
              </p>
            </div>

            <div className="w-20 h-0.5 mx-auto rounded-full" style={{ backgroundColor: theme.primary }} />

            <div className="space-y-3 max-w-md mx-auto">
              <span className="px-4 py-1.5 font-bold text-xs uppercase tracking-widest rounded transition-colors duration-300" style={{ backgroundColor: theme.bgLight, color: theme.primary }}>
                &hearts; Specially Created For Steniha &hearts;
              </span>
              <p className="text-xs text-slate-500 leading-relaxed pt-2">
                Contains complete textbook explanations, step-by-step mathematical examples, formulas sheet, and exhaustive Q&As (Part A, B, and C) mapped across all 5 units.
              </p>
            </div>
          </div>

          {/* Author declaration on cover */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Writings Compiled & Designed By</div>
            <div className="text-sm font-extrabold text-slate-700 tracking-wider">ASHWIN (BALAVIGNESHWAR T G)</div>
            <div className="text-[10px] font-medium italic max-w-sm mx-auto" style={{ color: theme.primary }}>
              &ldquo;The correlation of your smile and my focus is statistically significant ($\alpha &lt; 0.0001$). Ace this exam, Steniha!&rdquo;
            </div>
          </div>
        </div>

        {/* PAGES 2+: INDIVIDUAL UNITS (Two sheets per unit structure: Sheet 1 = Part A, Sheet 2 = Part B/C) */}
        {units.map((unit, uIdx) => {
          // Select an appropriate romantic quote for this unit
          const quoteObj = ROMANTIC_QUOTES[uIdx % ROMANTIC_QUOTES.length];

          // Divide questions into Part A and Part B/C for pristine structuring
          const partAQuestions = unit.questions.filter((q) => q.type === 'A');
          const partBQuestions = unit.questions.filter((q) => q.type === 'B');
          const partCQuestions = unit.questions.filter((q) => q.type === 'C');

          return (
            <React.Fragment key={unit.id}>
              {/* SHEET 1: CONCEPT OVERVIEW & PART A */}
              <div 
                className="a4-sheet relative bg-white border-[16px] shadow-2xl text-slate-800 p-12 flex flex-col justify-between overflow-hidden text-left transition-all duration-300"
                style={{ width: '210mm', height: '297mm', pageBreakBefore: 'always', pageBreakAfter: 'always', borderColor: theme.bgLight }}
              >
                {renderFloralCorner('top-left')}
                {renderFloralCorner('top-right')}
                {renderFloralCorner('bottom-left')}
                {renderFloralCorner('bottom-right')}
                {renderQuantumWave('top-right')}
                {renderQuantumWave('bottom-left')}

                {/* Header */}
                <header className="mb-6">
                  <h1 className="text-[26px] font-serif italic leading-tight border-b-2 pb-2 transition-colors duration-300" style={{ color: theme.primary, borderColor: theme.border }}>
                    {unit.title}<br />
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] not-italic font-bold" style={{ color: theme.primary }}>
                      Unit {unit.id} Exam Guide &bull; {unit.subtitle}
                    </span>
                  </h1>
                </header>

                {/* Primary Content block (Unit Overview & Part A) */}
                <div className="my-auto space-y-6">
                  <div>
                    <span className="bg-black text-white px-3 py-1 text-[10px] font-black tracking-widest inline-block mb-3 uppercase" style={{ backgroundColor: theme.primary }}>
                      UNIT {unit.id}: FOUNDATIONS
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">{unit.summary}</p>
                  </div>

                  {/* Formula Box */}
                  <div className="p-4 rounded border-l-4 space-y-2.5 bg-slate-50/50" style={{ borderColor: theme.primary }}>
                    <div className="flex items-center space-x-2 text-xs font-bold" style={{ color: theme.primary }}>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span className="uppercase tracking-wider">CRITICAL UNIT FORMULAS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-[10px] leading-relaxed">
                      {unit.formulaSheet.map((item, fIdx) => (
                        <div key={fIdx} className="bg-white p-2.5 rounded border border-slate-100/80 transition-all duration-300">
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-0.5">{item.name}</div>
                          <div className="text-[12px] font-mono font-bold" style={{ color: theme.primary }}>{item.formula}</div>
                          <div className="text-[9.5px] text-slate-400 mt-0.5 leading-normal">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part A Questions container */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-450 flex items-center space-x-1">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span>PART A: 2-MARK DEFINITIVE QUESTIONS</span>
                    </h3>

                    <div className="space-y-4">
                      {partAQuestions.map((item, idx) => (
                        <div key={item.id} className="group">
                          <h4 className="text-[10px] uppercase font-black mb-1 tracking-wider font-mono text-slate-400">
                            Question {idx + 1} &bull; PART A (2 Marks)
                          </h4>
                          <div className="bg-slate-50/80 p-3 rounded-lg border-l-4" style={{ borderColor: theme.primary }}>
                            <p className="text-[12px] font-semibold text-slate-900 mb-1">{item.question}</p>
                            <p className="text-[11.5px] text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer and Quote */}
                <div className="space-y-4 mt-auto pt-4">
                  <div className="p-4 border border-dashed rounded bg-slate-50/50" style={{ borderColor: theme.border }}>
                    <p className="text-center font-serif text-[13px] leading-relaxed" style={{ color: theme.primary }}>
                      &ldquo;{quoteObj.quote}&rdquo;
                    </p>
                    <p className="text-center text-[9.5px] font-sans uppercase tracking-[0.1em] text-slate-450 mt-1 font-bold">
                      &mdash; {quoteObj.context}
                    </p>
                  </div>
                  
                  <footer className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider border-t pt-3" style={{ color: theme.primary, borderColor: theme.border }}>
                    <span>Sheet {unit.id * 2 - 1} of 11</span>
                    <span>Prepared with Love & Precision &bull; Steniha</span>
                  </footer>
                </div>
              </div>

              {/* SHEET 2: PART B & PART C LONG ANSWERS */}
              <div 
                className="a4-sheet relative bg-white border-[16px] shadow-2xl text-slate-800 p-12 flex flex-col justify-between overflow-hidden text-left transition-all duration-300"
                style={{ width: '210mm', height: '297mm', pageBreakBefore: 'always', pageBreakAfter: 'always', borderColor: theme.bgLight }}
              >
                {renderFloralCorner('top-left')}
                {renderFloralCorner('top-right')}
                {renderFloralCorner('bottom-left')}
                {renderFloralCorner('bottom-right')}
                {renderQuantumWave('top-right')}
                {renderQuantumWave('bottom-left')}

                {/* Header */}
                <header className="mb-6">
                  <h1 className="text-[26px] font-serif italic leading-tight border-b-2 pb-2 transition-colors duration-300" style={{ color: theme.primary, borderColor: theme.border }}>
                    {unit.title}<br />
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] not-italic font-bold" style={{ color: theme.primary }}>
                      Unit {unit.id} Exam Guide &bull; {unit.subtitle}
                    </span>
                  </h1>
                </header>

                {/* Primary Content block (Part B & C) */}
                <div className="my-auto space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-450">
                      PART B: 13-MARK EXHAUSTIVE QUESTIONS & DERIVATIONS
                    </h3>

                    {partBQuestions.map((item, idx) => (
                      <div key={item.id} className="space-y-2 group">
                        <div className="text-[11px] font-bold text-white px-3 py-1.5 rounded flex items-center justify-between" style={{ backgroundColor: theme.primary }}>
                          <span className="font-sans uppercase tracking-[0.05em]">{item.question}</span>
                          <span className="font-mono text-[9px] bg-white/20 px-1 py-0.5 rounded">13 Marks</span>
                        </div>
                        <div className="bg-slate-50/40 p-4 border rounded" style={{ borderColor: theme.border }}>
                          <p className="text-[11.5px] leading-relaxed text-left whitespace-pre-line text-slate-700">
                            {item.answer}
                          </p>
                        </div>

                        {/* Rendering sample layout diagram for questions */}
                        {item.diagramTitle && (
                          <div className="p-4 border border-dashed rounded text-center flex flex-col items-center justify-center space-y-1.5 bg-slate-50/20" style={{ borderColor: theme.border }}>
                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>Diagram / Workflow Architecture</span>
                            <span className="text-[10px] font-serif italic text-slate-800">{item.diagramTitle}</span>
                            <span className="text-[9.5px] text-slate-400">Be sure to sketch a clear structural visual model representing this flow in your exam book</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Part C Question (Incredibly valuable conceptual / scenario based) */}
                  {partCQuestions.length > 0 && (
                    <div className="space-y-2.5">
                      <h3 className="text-xs font-black uppercase tracking-widest text-slate-450">
                        PART C: 15-MARK PRACTICAL APPLICATION STUDY
                      </h3>

                      {partCQuestions.map((item) => (
                        <div key={item.id} className="space-y-2 p-3.5 rounded border bg-white/40" style={{ borderColor: theme.border }}>
                          <div className="text-[11px] font-bold flex items-center justify-between text-slate-800">
                            <span>{item.question}</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: theme.bgLight, color: theme.primary }}>15 Marks</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed text-justify whitespace-pre-line">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer and Quote */}
                <div className="space-y-4 mt-auto pt-4">
                  <div className="flex items-center justify-center gap-2 mb-2" style={{ color: theme.border }}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ color: theme.primary }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span className="h-[1px] w-20 bg-slate-100" />
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ color: theme.primary }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>

                  <footer className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider border-t pt-3" style={{ color: theme.primary, borderColor: theme.border }}>
                    <span>Sheet {unit.id * 2} of 11</span>
                    <span>Perfect Marks Incoming</span>
                  </footer>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
