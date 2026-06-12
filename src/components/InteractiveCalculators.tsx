import React, { useState } from 'react';
import { Calculator, CheckCircle2, ChevronRight, Play, RefreshCw, BarChart2 } from 'lucide-react';
import { ThemeConfig } from '../types';

// Polynomial approximation of cumulative normal distribution function (CDF)
function normalCDF(z: number): number {
  const t = 1.0 / (1.0 + 0.2316419 * Math.abs(z));
  const d = 0.39894228 * Math.exp(-0.5 * z * z);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + 1.330274429 * t))));
  return z >= 0 ? 1.0 - p : p;
}

interface ComponentProps {
  theme: ThemeConfig;
}

export const InteractiveCalculators: React.FC<ComponentProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'zscore' | 'sd' | 'sigmoid'>('zscore');

  // Calculator 1: Z-score & Probability Mapping
  const [xVal, setXVal] = useState<number>(82);
  const [muVal, setMuVal] = useState<number>(110);
  const [sigmaVal, setSigmaVal] = useState<number>(29.7);
  const [zResult, setZResult] = useState<{ z: number; prob: number; formula: string } | null>(null);

  const calculateZ = () => {
    if (sigmaVal <= 0) return;
    const z = (xVal - muVal) / sigmaVal;
    const prob = normalCDF(z);
    setZResult({
      z: Number(z.toFixed(4)),
      prob: Number((prob * 100).toFixed(2)),
      formula: `z = (${xVal} - ${muVal}) / ${sigmaVal} = ${z.toFixed(4)}`
    });
  };

  // Calculator 2: Step-by-Step Sample Standard Deviation Calculator
  const [numbersString, setNumbersString] = useState<string>("7, 9, 5, 13, 3, 11, 15, 9");
  const [sdResult, setSdResult] = useState<{
    calcSteps: { num: number; diff: number; diffSq: number }[];
    mean: number;
    ss: number;
    variance: number;
    sd: number;
    n: number;
  } | null>(null);

  const calculateSD = () => {
    const arr = numbersString.split(',')
      .map(item => parseFloat(item.trim()))
      .filter(item => !isNaN(item));
    
    if (arr.length <= 1) return;
    const n = arr.length;
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / n;
    
    const calcSteps = arr.map(num => {
      const diff = num - mean;
      const diffSq = diff * diff;
      return { num, diff, diffSq };
    });
    
    const ss = calcSteps.reduce((acc, curr) => acc + curr.diffSq, 0);
    const variance = ss / (n - 1);
    const sd = Math.sqrt(variance);

    setSdResult({
      calcSteps,
      mean: Number(mean.toFixed(4)),
      ss: Number(ss.toFixed(4)),
      variance: Number(variance.toFixed(4)),
      sd: Number(sd.toFixed(4)),
      n
    });
  };

  // Calculator 3: Logistic Regression / Passing Probability Target forecast
  const [targetProb, setTargetProb] = useState<number>(95);
  const [hoursResult, setHoursResult] = useState<{ hours: number; derivation: string[] } | null>(null);

  const calculateTargetHours = () => {
    const p = targetProb / 100;
    if (p <= 0 || p >= 1) return;
    
    // Using Unit V: log(p / (1-p)) = -64 + 2 * (hours)
    // => z = log(p / (1-p))
    // => hours = (z + 64) / 2
    const logit = Math.log(p / (1 - p));
    const hours = (logit + 64) / 2;
    
    const derivation = [
      `Desired Target Probability P = ${p}`,
      `Odds Ratio P/(1-P) = ${p.toFixed(4)} / ${(1-p).toFixed(4)} = ${(p/(1-p)).toFixed(4)}`,
      `Logit value (z) = ln(${ (p/(1-p)).toFixed(4) }) = ${logit.toFixed(4)}`,
      `Equation: ${logit.toFixed(4)} = -64 + 2 * (Hours)`,
      `Transforming: 2 * (Hours) = 64 + (${logit.toFixed(4)}) = ${(logit + 64).toFixed(4)}`,
      `Optimal required parameter: Hours = ${(logit + 64).toFixed(4)} / 2Pairs = ${hours.toFixed(2)} hours`
    ];

    setHoursResult({
      hours: Number(hours.toFixed(2)),
      derivation
    });
  };

  return (
    <div id="calculators-container" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl" style={{ backgroundColor: theme.bgLight }}>
          <Calculator className="h-6 w-6" style={{ color: theme.primary }} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800">Stats & ML Interactive Lab</h2>
          <p className="text-xs text-slate-500">Practice actual calculations with step-by-step derivations for examinations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 mb-6">
        <button
          onClick={() => setActiveTab('zscore')}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'zscore'
              ? 'border-pink-500 text-pink-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          style={{ borderColor: activeTab === 'zscore' ? theme.primary : 'transparent', color: activeTab === 'zscore' ? theme.primary : undefined }}
        >
          <BarChart2 className="h-4 w-4" />
          <span>Z-Score CDF</span>
        </button>
        <button
          onClick={() => setActiveTab('sd')}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'sd'
              ? 'border-pink-500 text-pink-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          style={{ borderColor: activeTab === 'sd' ? theme.primary : 'transparent', color: activeTab === 'sd' ? theme.primary : undefined }}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Sample Variance & SD</span>
        </button>
        <button
          onClick={() => setActiveTab('sigmoid')}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-all flex items-center justify-center space-x-2 ${
            activeTab === 'sigmoid'
              ? 'border-pink-500 text-pink-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
          style={{ borderColor: activeTab === 'sigmoid' ? theme.primary : 'transparent', color: activeTab === 'sigmoid' ? theme.primary : undefined }}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Sigmoid Passing Target</span>
        </button>
      </div>

      {/* TAB CONTENT 1: ZSCORE */}
      {activeTab === 'zscore' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Observation Value (X)</label>
              <input
                type="number"
                step="any"
                value={xVal}
                onChange={(e) => setXVal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Population Mean (&mu;)</label>
              <input
                type="number"
                step="any"
                value={muVal}
                onChange={(e) => setMuVal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Standard Deviation (&sigma;)</label>
              <input
                type="number"
                step="any"
                value={sigmaVal}
                onChange={(e) => setSigmaVal(parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>

          <button
            onClick={calculateZ}
            className="w-full py-2.5 text-white font-semibold text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Map Normal Probability</span>
          </button>

          {zResult && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 animation-fade-in">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>FORMULATION TRANSFORMATION</span>
                <span className="font-mono bg-slate-200 text-slate-600 px-1 py-0.5 rounded">Z-Table Lookup</span>
              </div>
              <p className="text-sm font-mono text-slate-700 bg-white p-2 rounded border border-slate-200/60">{zResult.formula}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-3 rounded-lg border border-slate-200/40 text-center">
                  <div className="text-xs text-slate-400 mb-1">Resulting Z-score</div>
                  <div className="text-lg font-bold" style={{ color: theme.primary }}>{zResult.z}</div>
                  <div className="text-[10px] text-slate-400">deviations from mean</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/40 text-center">
                  <div className="text-xs text-slate-400 mb-1">P(X &lt; {xVal}) Probability</div>
                  <div className="text-lg font-bold" style={{ color: theme.primary }}>{zResult.prob}%</div>
                  <div className="text-[10px] text-slate-400">cumulative area (left)</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic mt-2">
                *Perfect for Unit II normal curve exam questions. Represents the probability of selecting an item smaller than {xVal} in a population with mean {muVal} and SD {sigmaVal}.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 2: STANDARD DEVIATION */}
      {activeTab === 'sd' && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Comma-Separated Data Points (e.g. Unit II list example)
            </label>
            <input
              type="text"
              value={numbersString}
              onChange={(e) => setNumbersString(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              placeholder="e.g. 7, 9, 5, 13, 3, 11, 15, 9"
            />
          </div>

          <button
            onClick={calculateSD}
            className="w-full py-2.5 text-white font-semibold text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Generate Unbiased Deviations Steps</span>
          </button>

          {sdResult && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4 animation-fade-in">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>INTERMEDIATE STANDARD DEVIATION WORKINGS</span>
                <span className="font-mono bg-slate-200 text-slate-600 px-1 py-0.5 rounded">df = {sdResult.n} - 1 = {sdResult.n - 1}</span>
              </div>

              {/* Table of steps */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left bg-white border border-slate-100 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-semibold">
                      <th className="p-2 border-slate-200" style={{ background: 'transparent', color: '#555' }}>Value (x_i)</th>
                      <th className="p-2 border-slate-200" style={{ background: 'transparent', color: '#555' }}>Deviation (x_i - &mu;)</th>
                      <th className="p-2 border-slate-200" style={{ background: 'transparent', color: '#555' }}>Squared Deviation (x_i - &mu;)²</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sdResult.calcSteps.map((row, idx) => (
                      <tr key={idx} className="border-t border-slate-150">
                        <td className="p-2 font-mono text-slate-700">{row.num}</td>
                        <td className="p-2 font-mono text-slate-500">{(row.diff >= 0 ? '+' : '') + row.diff.toFixed(2)}</td>
                        <td className="p-2 font-mono text-pink-600" style={{ color: theme.primary }}>{row.diffSq.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/50 border-t-2 border-slate-200 font-semibold">
                      <td className="p-2 text-slate-600">Mean (&mu;): {sdResult.mean}</td>
                      <td className="p-2 text-slate-600">Sum = 0.00</td>
                      <td className="p-2 text-pink-700" style={{ color: theme.primary }}>SS = {sdResult.ss}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border border-slate-200/40">
                  <div className="text-[10px] text-slate-400">Sample Variance (s²)</div>
                  <div className="text-sm font-mono font-bold text-slate-800">{sdResult.ss} / {sdResult.n - 1} = {sdResult.variance}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200/40">
                  <div className="text-[10px] text-slate-400">Standard Deviation (s)</div>
                  <div className="text-sm font-mono font-bold text-slate-800">sqrt({sdResult.variance}) = {sdResult.sd}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: SIGMOIDHours */}
      {activeTab === 'sigmoid' && (
        <div className="space-y-5">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Desired Pass Probability threshold (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={targetProb}
                  onChange={(e) => setTargetProb(parseInt(e.target.value) || 50)}
                  className="flex-1 accent-pink-500"
                  style={{ accentColor: theme.primary }}
                />
                <span className="text-base font-bold text-slate-700 w-12 text-right">{targetProb}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={calculateTargetHours}
            className="w-full py-2.5 text-white font-semibold text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center space-x-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Play className="h-4 w-4 fill-white" />
            <span>Derive Study-Hour Parameters</span>
          </button>

          {hoursResult && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3 animation-fade-in">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>STEP-BY-STEP SIGMOID DERIVATION (UNIT V)</span>
                <span className="font-mono bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: theme.bgLight, color: theme.primary }}>y_pred = Sigmoid(z)</span>
              </div>
              
              <div className="space-y-1.5 pt-1">
                {hoursResult.derivation.map((line, idx) => (
                  <div key={idx} className="flex items-start text-xs text-slate-600">
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="font-mono pl-1">{line}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/50 mt-3 text-center">
                <div className="text-xs text-slate-400 mb-1">Calculated Study Time Needed</div>
                <div className="text-xl font-extrabold" style={{ color: theme.primary }}>{hoursResult.hours} Hours</div>
                <div className="text-[10px] text-slate-400 pt-0.5">&ldquo;Steniha, you possess 100% innate training accuracy!&rdquo;</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
