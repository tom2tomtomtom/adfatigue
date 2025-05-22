import { useState } from 'react';

export type FatigueResult = {
  index: number;
  level: 'Low' | 'Moderate' | 'High' | 'Critical';
  recommendation: string;
};

type FormKeys = 'frequency' | 'ctr' | 'conversionRateDrop' | 'duration';

type FormState = { [K in FormKeys]: string } & { [key: string]: string };

const initialState: FormState = {
  frequency: '',
  ctr: '',
  conversionRateDrop: '',
  duration: '',
};

export function AdFatigueForm({ onResult }: { onResult: (result: FatigueResult) => void }) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<FormKeys, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function validate() {
    const errs: { [k: string]: string } = {};
    ["frequency","ctr","conversionRateDrop","duration"].forEach((k) => {
      if (!values[k]) errs[k] = 'Required';
      else if (isNaN(Number(values[k]))) errs[k] = 'Must be a number';
    });
    return errs;
  }

  function calculateFatigue(values: typeof initialState): FatigueResult {
    const freq = Number(values.frequency);
    const ctr = Number(values.ctr);
    const convDrop = Number(values.conversionRateDrop);
    const duration = Number(values.duration);
    const index = Math.round(
      freq * 2 + convDrop + duration * 0.5 - ctr * 1.2
    );
    let level: FatigueResult['level'] = 'Low';
    let recommendation = 'Your ad fatigue is low. Keep monitoring.';
    if (index > 40) { level = 'Critical'; recommendation = 'Contact Cuttable.'; }
    else if (index > 30) { level = 'High'; recommendation = 'High fatigue. Consider new ads and audiences.'; }
    else if (index > 20) { level = 'Moderate'; recommendation = 'Moderate fatigue. Monitor closely and plan updates.'; }
    return { index, level, recommendation };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setTimeout(() => {
      onResult(calculateFatigue(values));
      setSubmitting(false);
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="form-grid">
        <Input label="Frequency" name="frequency" type="number" value={values.frequency} onChange={handleChange} error={errors.frequency} min={0} step={0.1} required placeholder="2.5 (typical)" />
        <Input label="CTR (%)" name="ctr" type="number" value={values.ctr} onChange={handleChange} error={errors.ctr} min={0} step={0.01} required placeholder="1.8 (typical)" />
        <Input label="Conversion Rate Drop (%)" name="conversionRateDrop" type="number" value={values.conversionRateDrop} onChange={handleChange} error={errors.conversionRateDrop} min={0} step={0.01} required placeholder="8 (typical)" />
        <Input label="Campaign Duration (days)" name="duration" type="number" value={values.duration} onChange={handleChange} error={errors.duration} min={0} step={1} required placeholder="14 (typical)" />
      </div>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Calculating...' : 'Calculate Fatigue'}
      </button>
    </form>
  );
}

function Input({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string, error?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
      <label>{label}</label>
      <input {...props} />
      {error && <span style={{ color: '#ef4444', fontSize: '0.85em' }}>{error}</span>}
    </div>
  );
}
