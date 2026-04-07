// Core functions needed across calculators
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

export function daysBetween(date1: Date, date2: Date): number {
  return Math.round(Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

export function getWeeksAndDays(totalDays: number) {
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };
}

// Due Date Calculator Core Logic
export function calculateEDD_LMP(lmpDate: Date, cycleLength: number = 28): Date {
  const adjustment = cycleLength - 28;
  return addDays(lmpDate, 280 + adjustment);
}

export function calculateEDD_IVF(transferDate: Date, embryoDay: 3 | 5): Date {
  const daysToAdd = embryoDay === 5 ? 261 : 263;
  return addDays(transferDate, daysToAdd);
}

export function calculateEDD_CRL(crlMm: number): Date {
  const gestAgedays = 8.052 * Math.sqrt(crlMm) + 23.73;
  return addDays(new Date(), Math.round(280 - gestAgedays));
}

// Ovulation Calculator Core Logic
export function calculateOvulation(lmpDate: Date, cycleLength: number = 28) {
  const ovulationDay = cycleLength - 14;
  const ovulationDate = addDays(lmpDate, ovulationDay);
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = ovulationDate;
  const nextPeriod = addDays(lmpDate, cycleLength);
  return { ovulationDate, fertileStart, fertileEnd, nextPeriod };
}

// BMI Formula
export function calculateBMI(weightKg: number, heightCm: number): string {
  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(1);
}

export function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { category: 'Underweight', weightGain: '28-40 lbs' };
  if (bmi < 25) return { category: 'Normal weight', weightGain: '25-35 lbs' };
  if (bmi < 30) return { category: 'Overweight', weightGain: '15-25 lbs' };
  return { category: 'Obese', weightGain: '11-20 lbs' };
}

// Validation Helpers
export function validateNumber(value: number, min: number, max: number, label: string): string | null {
  if (isNaN(value)) return `${label} must be a valid number.`;
  if (value < min) return `${label} must be at least ${min}.`;
  if (value > max) return `${label} cannot exceed ${max}.`;
  return null;
}

export function validateDate(dateStr: string, label: string): string | null {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return `${label} must be a valid date.`;
  return null;
}

// Schema Helpers
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
}

export function generateSoftwareAppSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0" },
    "description": description,
    "url": url
  };
}
