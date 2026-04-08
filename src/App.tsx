import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const HealthTools = lazy(() => import('./pages/HealthTools'));
const Category = lazy(() => import('./pages/Category'));
const DueDateCalculator = lazy(() => import('./pages/DueDateCalculator'));
const ConceptionCalculator = lazy(() => import('./pages/ConceptionCalculator'));
const OvulationCalculator = lazy(() => import('./pages/OvulationCalculator'));
const PregnancyWeightGainCalculator = lazy(() => import('./pages/PregnancyWeightGainCalculator'));
const PeriodCalculator = lazy(() => import('./pages/PeriodCalculator'));
const PregnancyCalorieCalculator = lazy(() => import('./pages/PregnancyCalorieCalculator'));
const PCOSCalculator = lazy(() => import('./pages/PCOSCalculator'));
const MenopauseChecker = lazy(() => import('./pages/MenopauseChecker'));
const TimeToConceiveCalculator = lazy(() => import('./pages/TimeToConceiveCalculator'));
const EggFreezingCalculator = lazy(() => import('./pages/EggFreezingCalculator'));
const IVFSuccessRateCalculator = lazy(() => import('./pages/IVFSuccessRateCalculator'));
const EmbryoTransferDateCalculator = lazy(() => import('./pages/EmbryoTransferDateCalculator'));
const MiscarriageRiskCalculator = lazy(() => import('./pages/MiscarriageRiskCalculator'));
const BabySizeComparator = lazy(() => import('./pages/BabySizeComparator'));
const FertilityWindowCalculator = lazy(() => import('./pages/FertilityWindowCalculator'));
const DueDateByConceptionCalculator = lazy(() => import('./pages/DueDateByConceptionCalculator'));
const MenstrualCycleLengthCalculator = lazy(() => import('./pages/MenstrualCycleLengthCalculator'));
const OvulationPainCalculator = lazy(() => import('./pages/OvulationPainCalculator'));
const PeriodSymptomTracker = lazy(() => import('./pages/PeriodSymptomTracker'));
const WomensBMICalculator = lazy(() => import('./pages/WomensBMICalculator'));
const OvulationCalendar = lazy(() => import('./pages/OvulationCalendar'));
const WomensTDEECalculator = lazy(() => import('./pages/WomensTDEECalculator'));
const IdealBodyWeightCalculator = lazy(() => import('./pages/IdealBodyWeightCalculator'));
const WaterIntakeCalculator = lazy(() => import('./pages/WaterIntakeCalculator'));
const BreastCancerRiskCalculator = lazy(() => import('./pages/BreastCancerRiskCalculator'));
const MacrosCalculator = lazy(() => import('./pages/MacrosCalculator'));
const ThyroidRiskCalculator = lazy(() => import('./pages/ThyroidRiskCalculator'));
const OsteoporosisRiskCalculator = lazy(() => import('./pages/OsteoporosisRiskCalculator'));
const HeartDiseaseRiskCalculator = lazy(() => import('./pages/HeartDiseaseRiskCalculator'));
const EndometriosisRiskCalculator = lazy(() => import('./pages/EndometriosisRiskCalculator'));
const EPDSScreener = lazy(() => import('./pages/EPDSScreener'));
const BabyGrowthPercentile = lazy(() => import('./pages/BabyGrowthPercentile'));
const PregnancyWeekCalculator = lazy(() => import('./pages/PregnancyWeekCalculator'));
const Sitemap = lazy(() => import('./pages/Sitemap'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-light">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="due-date-calculator" element={<DueDateCalculator />} />
            <Route path="conception-calculator" element={<ConceptionCalculator />} />
            <Route path="ovulation-calculator" element={<OvulationCalculator />} />
            <Route path="pregnancy-weight-gain-calculator" element={<PregnancyWeightGainCalculator />} />
            <Route path="pregnancy-week-calculator" element={<PregnancyWeekCalculator />} />
            <Route path="period-calculator" element={<PeriodCalculator />} />
            <Route path="pregnancy-calorie-calculator" element={<PregnancyCalorieCalculator />} />
            <Route path="pcos-calculator" element={<PCOSCalculator />} />
            <Route path="menopause-checker" element={<MenopauseChecker />} />
            <Route path="time-to-conceive-calculator" element={<TimeToConceiveCalculator />} />
            <Route path="egg-freezing-calculator" element={<EggFreezingCalculator />} />
            <Route path="ivf-success-rate-calculator" element={<IVFSuccessRateCalculator />} />
            <Route path="embryo-transfer-date-calculator" element={<EmbryoTransferDateCalculator />} />
            <Route path="miscarriage-risk-calculator" element={<MiscarriageRiskCalculator />} />
            <Route path="baby-size-comparator" element={<BabySizeComparator />} />
            <Route path="fertility-window-calculator" element={<FertilityWindowCalculator />} />
            <Route path="due-date-by-conception" element={<DueDateByConceptionCalculator />} />
            <Route path="menstrual-cycle-length-calculator" element={<MenstrualCycleLengthCalculator />} />
            <Route path="ovulation-pain-calculator" element={<OvulationPainCalculator />} />
            <Route path="ovulation-calendar" element={<OvulationCalendar />} />
            <Route path="period-symptom-tracker" element={<PeriodSymptomTracker />} />
            <Route path="womens-bmi-calculator" element={<WomensBMICalculator />} />
            <Route path="womens-tdee-calculator" element={<WomensTDEECalculator />} />
            <Route path="ideal-body-weight-calculator" element={<IdealBodyWeightCalculator />} />
            <Route path="water-intake-calculator" element={<WaterIntakeCalculator />} />
            <Route path="breast-cancer-risk-calculator" element={<BreastCancerRiskCalculator />} />
            <Route path="macros-calculator" element={<MacrosCalculator />} />
            <Route path="thyroid-risk-calculator" element={<ThyroidRiskCalculator />} />
            <Route path="osteoporosis-risk-calculator" element={<OsteoporosisRiskCalculator />} />
            <Route path="heart-disease-risk-calculator" element={<HeartDiseaseRiskCalculator />} />
            <Route path="endometriosis-risk-calculator" element={<EndometriosisRiskCalculator />} />
            <Route path="epds-screener" element={<EPDSScreener />} />
            <Route path="baby-growth-percentile" element={<BabyGrowthPercentile />} />
            <Route path="category/:slug" element={<Category />} />
            <Route path="tools" element={<HealthTools />} />
            <Route path="sitemap" element={<Sitemap />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
