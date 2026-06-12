import { useState, useEffect } from 'react';
import { SYLLABUS_DATA, ROMANTIC_QUOTES } from './data/syllabus';
import { InteractiveCalculators } from './components/InteractiveCalculators';
import { FlashcardQuiz } from './components/FlashcardQuiz';
import { A4PagePreview } from './components/A4PagePreview';
import { StenihaAshwinLogo } from './components/StenihaAshwinLogo';
import { ThemeType, ThemeConfig } from './types';
import {
  Heart,
  BookOpen,
  Search,
  Sparkles,
  Printer,
  ChevronRight,
  ClipboardList,
  Flame,
  Award,
  BookMarked,
  Layers,
  HeartCrack,
  FileSpreadsheet
} from 'lucide-react';

const THEMES: Record<ThemeType, ThemeConfig> = {
  pink: {
    primary: '#db2777', // Deep pink
    secondary: '#fbcfe8', // Pale pink
    accent: '#f472b6',
    bgLight: '#fff1f2', // Delicate rose-white
    border: '#fecdd3',
    bgPattern: 'linear-gradient(135deg, #fbcfe8, #f472b6)',
    bgPage: '#fff5f7',
    heartColor: '#ec4899'
  },
  lavender: {
    primary: '#7c3aed', // Rich violet
    secondary: '#ddd6fe',
    accent: '#a78bfa',
    bgLight: '#faf5ff',
    border: '#e9d5ff',
    bgPattern: 'linear-gradient(135deg, #e9d5ff, #8b5cf6)',
    bgPage: '#fbfaff',
    heartColor: '#8b5cf6'
  },
  ocean: {
    primary: '#2563eb', // Serene ocean blue
    secondary: '#bfdbfe',
    accent: '#60a5fa',
    bgLight: '#f0f9ff',
    border: '#dbeafe',
    bgPattern: 'linear-gradient(135deg, #bfdbfe, #3b82f6)',
    bgPage: '#f8fafc',
    heartColor: '#3b82f6'
  },
  mint: {
    primary: '#0f766e', // Delicate deep teal
    secondary: '#ccfbf1',
    accent: '#2dd4bf',
    bgLight: '#f0fdfa',
    border: '#99f6e4',
    bgPattern: 'linear-gradient(135deg, #ccfbf1, #14b8a6)',
    bgPage: '#f9fbfb',
    heartColor: '#14b8a6'
  },
  obsidian: {
    primary: '#18181b', // Deep luxurious charcoal
    secondary: '#e4e4e7', // Brushed silver platinum
    accent: '#71717a', // Saturated silver slate
    bgLight: '#27272a', // Sleek leather dark grey
    border: '#3f3f46', // Matte charcoal boundary
    bgPattern: 'linear-gradient(135deg, #18181b, #3f3f46)', // Ornate dark backdrop
    bgPage: '#09090b', // Pitch-black textured leather hue
    heartColor: '#f4f4f5' // Pristine silver-white monogram heart
  }
};

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('pink');
  const [viewMode, setViewMode] = useState<'dashboard' | 'print'>('dashboard');
  const [activeUnit, setActiveUnit] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Custom user local storage sticky notes pad
  const [studyNotes, setStudyNotes] = useState<string>(() => {
    return localStorage.getItem('steniha_study_notes') ?? 
           "1. Remember: Standard Error is s/sqrt(n), whereas Pooled Variance handles weight splits.\n2. In Kaplan-Meier: S(t) decreases strictly on event times (death of cell counts).\n3. Standard Normal tables are cumulative from the left!\n4. Steniha, write neatly in the exams, especially the ANOVA sums of squares table!";
  });

  const [roseBloomed, setRoseBloomed] = useState<boolean>(false);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('steniha_study_notes', studyNotes);
  }, [studyNotes]);

  // Rotates romantic supportive phrases every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const activeTheme = THEMES[selectedTheme];

  // Filters search query across all Q&As
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : SYLLABUS_DATA.flatMap(u => 
        u.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(q => ({ ...q, unitTitle: u.title }))
      );

  return (
    <div 
      className="min-h-screen transition-colors duration-300 pb-12"
      style={{ backgroundColor: activeTheme.bgPage, color: selectedTheme === 'obsidian' ? '#e4e4e7' : '#334155' }}
    >
      {/* GLOBAL HEADER BAR */}
      <header className={`backdrop-blur-md sticky top-0 z-50 border-b shadow-xs transition-colors duration-300 ${
        selectedTheme === 'obsidian' 
          ? 'bg-[#0f0f12]/95 border-zinc-800/80 text-zinc-100' 
          : 'bg-white/80 border-slate-100 text-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo and admirer note */}
          <div className="flex items-center space-x-3.5">
            <div 
              className="flex items-center justify-center relative transform hover:rotate-6 transition-transform duration-300"
            >
              <StenihaAshwinLogo size={42} withBacking={selectedTheme === 'obsidian'} glow={selectedTheme === 'obsidian'} />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className={`text-base font-extrabold tracking-tight transition-colors duration-350 ${
                  selectedTheme === 'obsidian' ? 'text-zinc-100' : 'text-slate-800'
                }`}>
                  Steniha's Exam Prep &bull; ML & Stats
                </h1>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest transition-colors duration-300 ${
                  selectedTheme === 'obsidian' ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'
                }`}>AL3451 / AD3491</span>
              </div>
              <p className={`text-[10px] font-medium transition-colors duration-300 ${
                selectedTheme === 'obsidian' ? 'text-zinc-500' : 'text-slate-500'
              }`}>Bespoke study suite crafted with &hearts; by Ashwin (Balavigneshwar T G)</p>
            </div>
          </div>

          {/* Theme customizers and layout toggler */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Theme picker bubble dots */}
            <div className={`flex items-center p-1.5 rounded-xl space-x-2 border transition-colors duration-300 ${
              selectedTheme === 'obsidian' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-slate-100/80 border-slate-200/50'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 font-mono">Theme:</span>
              <button
                onClick={() => setSelectedTheme('pink')}
                className={`w-5.5 h-5.5 rounded-full bg-pink-500 border-2 transition-all ${selectedTheme === 'pink' ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent hover:scale-105'}`}
                title="Romantic Rose Pink"
              />
              <button
                onClick={() => setSelectedTheme('lavender')}
                className={`w-5.5 h-5.5 rounded-full bg-violet-500 border-2 transition-all ${selectedTheme === 'lavender' ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent hover:scale-105'}`}
                title="Floral Lavender Purple"
              />
              <button
                onClick={() => setSelectedTheme('ocean')}
                className={`w-5.5 h-5.5 rounded-full bg-blue-500 border-2 transition-all ${selectedTheme === 'ocean' ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent hover:scale-105'}`}
                title="Serene Ocean Blue"
              />
              <button
                onClick={() => setSelectedTheme('mint')}
                className={`w-5.5 h-5.5 rounded-full bg-teal-600 border-2 transition-all ${selectedTheme === 'mint' ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent hover:scale-105'}`}
                title="Fresh Mint Green"
              />
              <button
                onClick={() => setSelectedTheme('obsidian')}
                className={`w-5.5 h-5.5 rounded-full border-2 transition-all ${selectedTheme === 'obsidian' ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent hover:scale-105'}`}
                style={{ background: 'linear-gradient(135deg, #18181b, #a1a1aa)' }}
                title="Obsidian Leather & Silver"
              />
            </div>

            {/* Layout Toggler Buttons */}
            <div className={`flex p-1 rounded-xl border transition-colors duration-300 ${
              selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100/90 border-slate-200/40'
            }`}>
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  viewMode === 'dashboard'
                    ? selectedTheme === 'obsidian'
                      ? 'bg-zinc-800 shadow-sm text-zinc-100 font-bold'
                      : 'bg-white shadow-xs text-slate-800 font-bold'
                    : selectedTheme === 'obsidian'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Interactive Study</span>
              </button>
              <button
                onClick={() => setViewMode('print')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  viewMode === 'print'
                    ? selectedTheme === 'obsidian'
                      ? 'bg-zinc-800 shadow-sm text-zinc-100 font-bold'
                      : 'bg-white shadow-xs text-slate-800 font-bold'
                    : selectedTheme === 'obsidian'
                      ? 'text-zinc-500 hover:text-zinc-300'
                      : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Printer className="h-3.5 w-3.5" />
                <span>A4 Print Sheets</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* DYNAMIC TOP BANNER WITH SUPPORT SLIDER */}
      <div 
        className="w-full py-2.5 text-center text-xs font-semibold border-b relative hidden sm:block overflow-hidden transition-all duration-300"
        style={{ backgroundColor: activeTheme.bgLight, color: activeTheme.primary, borderColor: activeTheme.border }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-2">
          <Flame className="h-4 w-4 text-pink-500 shrink-0" style={{ color: activeTheme.primary }} />
          <span>&ldquo;{ROMANTIC_QUOTES[currentQuoteIdx].quote}&rdquo;</span>
          <span className="text-[10px] font-mono opacity-65" style={{ color: activeTheme.primary }}>&mdash; {ROMANTIC_QUOTES[currentQuoteIdx].context}</span>
        </div>
      </div>

      {/* VIEWPORT CONTROLLER */}
      {viewMode === 'print' ? (
        /* PRINT MODE SCREEN : RENDERS A4 PAGES ONLY */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <A4PagePreview units={SYLLABUS_DATA} theme={activeTheme} activeThemeName={selectedTheme} />
        </main>
      ) : (
        /* INTERACTIVE DESKTOP DASHBOARD MODE */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: THE CENTRAL LECTURE READER */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ACTIVE UNIT NAVIGATOR TABS */}
            <div className={`flex p-1.5 rounded-2xl border shadow-2xs overflow-x-auto space-x-1 transition-colors duration-300 ${
              selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800' : 'bg-white/60 border-slate-100'
            }`}>
              {SYLLABUS_DATA.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => {
                    setActiveUnit(unit.id);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    activeUnit === unit.id && searchQuery === ''
                      ? 'text-white shadow-sm'
                      : selectedTheme === 'obsidian'
                        ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                  style={{
                    backgroundColor: activeUnit === unit.id && searchQuery === '' 
                      ? selectedTheme === 'obsidian' ? '#3f3f46' : activeTheme.primary 
                      : 'transparent'
                  }}
                >
                  Unit {unit.id}
                </button>
              ))}
            </div>

            {/* SEARCH DIRECTORY */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, time-series, standard deviation, ANOVA, regression, Kaplan-Meier..."
                className={`w-full pl-10 pr-4 py-3 border text-sm rounded-2xl focus:outline-none focus:ring-1 transition-all duration-300 ${
                  selectedTheme === 'obsidian' 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-700' 
                    : 'bg-white border-slate-200/80 text-slate-800 placeholder-slate-400 focus:ring-slate-300'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* IF SEARCH IS ACTIVE, INSTRUCT DYNAMIC RESULTS */}
            {searchQuery !== '' ? (
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Search Results for &ldquo;{searchQuery}&rdquo; &bull; {searchResults.length} items found
                </div>
                {searchResults.length === 0 ? (
                  <div className={`p-8 rounded-2xl text-center border transition-colors duration-300 ${
                    selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-slate-100 text-slate-400'
                  }`}>
                    <HeartCrack className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold">No questions matched your search details.</p>
                    <p className="text-xs">Retry with terms like 'z-test', 'R2', 'survival', or 'unbiased'.</p>
                  </div>
                ) : (
                  searchResults.map((item, idx) => (
                    <div key={item.id} className={`rounded-2xl p-5 border shadow-2xs space-y-3 transition-colors duration-300 ${
                      selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-805/80 text-zinc-200' : 'bg-white border-slate-100 text-slate-800'
                    }`}>
                      <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-slate-400">
                        <span>{item.unitTitle} &bull; PART {item.type}</span>
                        <span className="font-mono text-pink-600" style={{ color: selectedTheme === 'obsidian' ? '#f4f4f5' : activeTheme.primary }}>
                          {item.type === 'A' ? '2 Marks' : item.type === 'B' ? '13 Marks' : '15 Marks'}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold ${selectedTheme === 'obsidian' ? 'text-zinc-100' : 'text-slate-800'}`}>{item.question}</h3>
                      <p className={`text-xs leading-relaxed text-left whitespace-pre-line p-3.5 rounded-xl border ${
                        selectedTheme === 'obsidian' ? 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300' : 'bg-slate-50/50 text-slate-500'
                      }`}>
                        {item.answer}
                      </p>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* REGULAR LECTURE BOOK PAGES */
              <div className="space-y-6">
                
                {/* UNIT COVER CARD */}
                <div 
                  className={`border-[12px] rounded-2xl p-6 relative overflow-hidden shadow-md transition-all duration-300 ${
                    selectedTheme === 'obsidian' ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-slate-800'
                  }`}
                  style={{ borderColor: selectedTheme === 'obsidian' ? '#18181b' : activeTheme.bgLight }}
                >
                  <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none">
                    <BookMarked className="h-32 w-32" style={{ color: selectedTheme === 'obsidian' ? '#f4f4f5' : activeTheme.primary }} />
                  </div>

                  <div className="space-y-3 max-w-lg relative z-10 text-left">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em]" style={{ color: selectedTheme === 'obsidian' ? '#cbd5e1' : activeTheme.primary }}>Regulation 2021 Syllabus Book</span>
                    <h2 className={`text-3xl font-serif italic leading-tight ${
                      selectedTheme === 'obsidian' ? 'text-zinc-100' : 'text-slate-900'
                    }`}>
                      {SYLLABUS_DATA[activeUnit - 1].title}
                    </h2>
                    <p className={`text-xs font-sans tracking-wide leading-relaxed font-medium ${
                      selectedTheme === 'obsidian' ? 'text-zinc-400' : 'text-slate-500'
                    }`}>
                      {SYLLABUS_DATA[activeUnit - 1].subtitle}
                    </p>
                    <div className={`pt-2 text-[11px] leading-relaxed font-medium p-4 border-l-4 rounded-r ${
                      selectedTheme === 'obsidian' ? 'bg-zinc-950/60 border-zinc-700/80 text-zinc-300' : 'bg-slate-50/70 text-slate-700'
                    }`} style={{ borderColor: selectedTheme === 'obsidian' ? '#ffffff' : activeTheme.primary }}>
                      {SYLLABUS_DATA[activeUnit - 1].summary}
                    </div>
                  </div>
                </div>

                {/* CRITICAL THEOREM SUMMARY CARDS */}
                <div className={`rounded-2xl p-5 border space-y-4 transition-colors duration-300 ${
                  selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800/80' : 'bg-white border-slate-150'
                }`}>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <ClipboardList className="h-4 w-4" style={{ color: selectedTheme === 'obsidian' ? '#cbd5e1' : activeTheme.primary }} />
                    <span>Unit Formula Reference Card</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {SYLLABUS_DATA[activeUnit - 1].formulaSheet.map((item, idx) => (
                      <div key={idx} className={`p-3.5 rounded border transition-all duration-300 ${
                        selectedTheme === 'obsidian' 
                          ? 'border-zinc-800 bg-zinc-950/30 hover:border-zinc-700' 
                          : 'border-slate-100 bg-slate-50/30 hover:border-slate-300/40'
                      } space-y-1`}>
                        <div className={`text-[10px] uppercase font-black tracking-widest ${
                          selectedTheme === 'obsidian' ? 'text-zinc-400' : 'text-slate-500'
                        }`}>{item.name}</div>
                        <div className="text-[13px] font-mono font-bold" style={{ color: selectedTheme === 'obsidian' ? '#f4f4f5' : activeTheme.primary }}>{item.formula}</div>
                        <div className={`text-[10px] leading-normal ${
                          selectedTheme === 'obsidian' ? 'text-zinc-500' : 'text-slate-400'
                        }`}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* THE QUESTIONS INDEX TAB INDIVIDUAL SHEETS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">UNITwise Exam ready Q&As</span>
                    <span className="text-[10px] font-mono text-slate-400">Regulation 2021 Format</span>
                  </div>

                  {SYLLABUS_DATA[activeUnit - 1].questions.map((item) => (
                    <div 
                      key={item.id} 
                      className={`rounded-2xl p-5 border shadow-2xs hover:shadow-xs transition-all duration-250 space-y-3 ${
                        selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800/80 text-zinc-200' : 'bg-white border-slate-150 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full transition-colors duration-300"
                          style={{ 
                            backgroundColor: selectedTheme === 'obsidian' ? '#18181b' : activeTheme.bgLight, 
                            color: selectedTheme === 'obsidian' ? '#f4f4f5' : activeTheme.primary 
                          }}
                        >
                          PART {item.type} &bull; {item.type === 'A' ? '2 Marks' : item.type === 'B' ? '13 Marks' : '15 Marks'}
                        </span>
                        
                        <div className="flex items-center space-x-1 text-slate-400 text-[10px] font-mono font-bold">
                          <span>Exam Point Value</span>
                        </div>
                      </div>

                      <h3 className={`text-sm font-extrabold leading-tight transition-colors duration-300 ${
                        selectedTheme === 'obsidian' ? 'text-zinc-100' : 'text-slate-800'
                      }`}>
                        {item.question}
                      </h3>

                      <p className={`text-xs leading-relaxed text-justify whitespace-pre-line transition-colors duration-300 ${
                        selectedTheme === 'obsidian' ? 'text-zinc-300/90' : 'text-slate-500'
                      }`}>
                        {item.answer}
                      </p>

                      {item.diagramTitle && (
                        <div className={`p-4 border border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-1 transition-colors duration-300 ${
                          selectedTheme === 'obsidian' ? 'bg-zinc-950/40 border-zinc-805/85' : 'bg-slate-50/40 border-slate-150'
                        }`} style={{ borderColor: selectedTheme === 'obsidian' ? undefined : activeTheme.border }}>
                          <FileSpreadsheet className="h-4 w-4" style={{ color: selectedTheme === 'obsidian' ? '#e4e4e7' : activeTheme.primary }} />
                          <span className={`text-[10px] font-bold ${selectedTheme === 'obsidian' ? 'text-zinc-300' : 'text-slate-700'}`}>{item.diagramTitle}</span>
                          <span className="text-[9px] text-slate-400">Be sure to sketch a comprehensive visual block representing this model in your paper</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

          {/* RIGHT COLUMN: INTERACTIVE TOOLS PANEL */}
          <div className="space-y-6">
            
            {/* FLOATING Blooming Rose Surprise widget */}
            <div className={`rounded-2xl p-5 border shadow-2xs text-center space-y-4 transition-colors duration-300 ${
              selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-slate-100 text-slate-800'
            }`}>
              <div className={`p-2 w-max mx-auto rounded-full border ${selectedTheme === 'obsidian' ? 'bg-zinc-950/40 border-zinc-800' : 'bg-rose-50 border-pink-100'}`}>
                <Heart className="h-6 w-6 fill-rose-500 stroke-rose-500 animate-pulse" />
              </div>
              <div>
                <h3 className={`text-sm font-extrabold ${selectedTheme === 'obsidian' ? 'text-zinc-100' : 'text-slate-800'}`}>Support Surprise for Steniha</h3>
                <p className="text-[10px] text-slate-400">Click below to bloom a gorgeous support message!</p>
              </div>

              <button
                onClick={() => setRoseBloomed(!roseBloomed)}
                className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 border ${
                  selectedTheme === 'obsidian' 
                    ? 'text-zinc-200 border-zinc-700 hover:bg-zinc-800 bg-zinc-950/45' 
                    : 'text-pink-600 border-pink-100 hover:bg-rose-50'
                }`}
              >
                <span>{roseBloomed ? "Close Flower Box" : "Bloom Rose!"}</span>
              </button>

              {/* Animated blooming rose design */}
              {roseBloomed && (
                <div className={`p-4 rounded-xl space-y-3 border animation-scale-up text-left ${
                  selectedTheme === 'obsidian' ? 'bg-zinc-950/30 border-zinc-800/50' : 'bg-pink-50/30 border-pink-100/50'
                }`}>
                  {/* Custom SVG Rose Draw */}
                  <div className="flex items-center justify-center">
                    <svg className="h-16 w-16 text-pink-500 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                      {/* Rose flower petals */}
                      <circle cx="50" cy="50" r="20" fill={selectedTheme === 'obsidian' ? '#f43f5e' : activeTheme.primary} className="opacity-90" />
                      <circle cx="42" cy="42" r="16" fill={selectedTheme === 'obsidian' ? '#fda4af' : activeTheme.accent} className="opacity-80" />
                      <circle cx="58" cy="42" r="16" fill={selectedTheme === 'obsidian' ? '#fda4af' : activeTheme.accent} className="opacity-80" />
                      <circle cx="50" cy="35" r="14" fill="#fda4af" className="opacity-75" />
                      {/* Stem */}
                      <path d="M50 70 C 52 80, 48 90, 50 95" stroke="#10b981" strokeWidth="3" fill="none" />
                      {/* Left Leaf */}
                      <path d="M50 80 C 40 80, 42 75, 50 70 Z" fill="#10b981" />
                      {/* Right Leaf */}
                      <path d="M50 75 C 60 75, 58 70, 50 65 Z" fill="#10b981" />
                    </svg>
                  </div>
                  
                  <div className="text-[11px] leading-relaxed font-medium space-y-2 text-justify">
                    <p className="font-extrabold text-center uppercase tracking-wider text-[10px]" style={{ color: selectedTheme === 'obsidian' ? '#cbd5e1' : activeTheme.primary }}>&hearts; A Letter from Ashwin (Balavigneshwar T G) &hearts;</p>
                    <p className={`font-serif italic ${selectedTheme === 'obsidian' ? 'text-zinc-300' : 'text-slate-600'}`}>
                      &ldquo;Dear Steniha, I know exams can sometimes feel like a high-entropy dataset, but you are the ultimate classifier that splits obstacles effortlessly. Study this, relax, and have complete faith in your potential. You are going to ace this high-dimensional test space with absolute ease.&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK STUDY SCRATCHPAD/MEMOPAD */}
            <div className={`border rounded-2xl p-5 space-y-3 transition-colors duration-300 ${
              selectedTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-150'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center space-x-1.5 uppercase tracking-wider font-mono">
                  <span>Your Memo Scratchpad</span>
                </span>
                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                  selectedTheme === 'obsidian' ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-200 text-slate-500'
                }`}>Saves locally</span>
              </div>
              <textarea
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
                className={`w-full h-36 p-3 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 leading-relaxed transition-colors duration-300 ${
                  selectedTheme === 'obsidian' 
                    ? 'bg-zinc-950/80 border-zinc-800 text-zinc-200 focus:ring-zinc-700 focus:border-zinc-700' 
                    : 'bg-amber-50/50 border-amber-200/60 focus:ring-amber-300 focus:border-amber-300 text-slate-700'
                }`}
                placeholder="Write any formulas, test questions or pointers here..."
              />
              <div className="text-[9px] text-slate-400 italic">
                *Steniha can jot down her formulas, revision shortcuts, or notes which will automatically sync and persist.
              </div>
            </div>

            {/* INTERACTIVE CALCULATOR STACK */}
            <InteractiveCalculators theme={activeTheme} />

            {/* INTERACTIVE FLASHCARD AND QUIZ BOARD */}
            <FlashcardQuiz theme={activeTheme} />

          </div>

        </main>
      )}

      {/* FOOTER credit and romantic signoff */}
      <footer className="mt-16 text-center space-y-2.5 px-4">
        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase">
          AL3451 &bull; ANNA UNIVERSITY &bull; MACHINE LEARNING CRAM COURSE
        </p>
        <p className="text-xs text-slate-400 flex items-center justify-center space-x-1">
          <span>Syllabus notes prepared with endless support for Steniha</span>
          <Heart className="h-3.5 w-3.5 fill-pink-500 stroke-pink-500" style={{ color: activeTheme.primary, fill: activeTheme.primary }} />
          <span>&middot; ashwin (balavigneshwar) @ 2026</span>
        </p>
      </footer>
    </div>
  );
}
