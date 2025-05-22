import './index.css';
import { useState } from 'react';
import { AdFatigueForm } from './components/AdFatigueForm';
import type { FatigueResult } from './components/AdFatigueForm';

export function AdFatigueCalculatorPanel() {
  const [result, setResult] = useState<FatigueResult | null>(null);

  return (
    <>
      <AdFatigueForm onResult={setResult} />
      {result && (
        <div className="result-box">
          <div className="fatigue-index">Fatigue Index: {result.index}</div>
          <div className={`fatigue-level ${result.level.toLowerCase()}`}>Fatigue Level: <span>{result.level}</span></div>
          <div className={`recommendation${result.level === 'Critical' ? ' flash-critical' : ''}`}>{result.level === 'Critical' ? 'CONTACT CUTTABLE' : result.recommendation}</div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <div>
      {/* Header */}
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>Meta Ad Fatigue</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={{ background: '#18181b', color: '#e4e4e7', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.9rem', border: '1px solid #27272a' }}>Org ▼</button>
          <div className="profile-circle">U</div>
        </div>
      </header>
      {/* Main Content */}
      <main>
        <section className="main-panel">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Ad Fatigue Calculator</h2>
          <AdFatigueCalculatorPanel />
        </section>
      </main>
    </div>
  );
}

export default App;
