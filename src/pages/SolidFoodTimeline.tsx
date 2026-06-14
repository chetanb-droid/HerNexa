import { useState } from 'react';
import { Link } from 'react-router-dom';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { motion } from 'motion/react';
import { Info, Utensils, AlertCircle, CheckCircle2, Activity, ShieldAlert, Baby } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';

export default function SolidFoodTimeline() {
  const [age, setAge] = useState<number>(6); // Months
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    const ageError = validateNumber(age, 4, 24, "Baby's age");
    if (ageError) {
      setError(ageError);
      return;
    }

    let stage = "";
    let textures = [];
    let foods = [];
    let skills = [];
    let allergens = "Introduce highly allergenic foods (peanut, egg, dairy, soy, wheat, tree nuts, fish, shellfish) early and often, unless otherwise directed by your pediatrician.";

    if (age < 6) {
      stage = "Pre-Solids / Taste Introduction";
      textures = ["Thin purees (if pediatrician approved)"];
      foods = ["Breastmilk or Formula remains the primary source of nutrition.", "Single-grain iron-fortified cereals (mixed very thin).", "Single-ingredient vegetable or fruit purees."];
      skills = ["Losing the tongue-thrust reflex.", "Holding head up independently.", "Showing interest in food."];
    } else if (age >= 6 && age < 8) {
      stage = "Stage 1: Introduction to Solids";
      textures = ["Smooth purees", "Mashed foods", "Very soft, large finger foods (Baby-Led Weaning style)"];
      foods = ["Iron-rich foods: Pureed meats, fortified cereals.", "Vegetables: Sweet potato, squash, avocado, peas.", "Fruits: Banana, applesauce, pear.", "Allergens: Thinned peanut butter, scrambled egg."];
      skills = ["Sitting with minimal support.", "Opening mouth when food approaches.", "Palmar grasp (grabbing with the whole hand)."];
    } else if (age >= 8 && age < 10) {
      stage = "Stage 2: Exploring Textures";
      textures = ["Thicker purees", "Lumpy mashed foods", "Soft, bite-sized finger foods"];
      foods = ["Proteins: Shredded soft chicken, flaked fish, lentils.", "Dairy: Plain whole milk yogurt, mild cheese.", "Grains: Soft pasta, toast strips.", "Fruits/Veg: Steamed broccoli florets, ripe berries (halved)."];
      skills = ["Developing the pincer grasp (thumb and forefinger).", "Chewing motions (even without teeth).", "Moving food from side to side in the mouth."];
    } else if (age >= 10 && age < 12) {
      stage = "Stage 3: Table Foods";
      textures = ["Chopped table foods", "Soft chunks", "Mixed textures"];
      foods = ["Most family meals (modified for sodium and spice).", "Proteins: Meatballs, beans, tofu.", "Grains: Rice, quinoa, crackers.", "Fruits/Veg: Diced soft fruits, cooked vegetables."];
      skills = ["Self-feeding with fingers efficiently.", "Attempting to use a spoon.", "Biting through soft foods."];
    } else {
      stage = "Toddler Nutrition";
      textures = ["Regular table foods (cut appropriately to prevent choking)"];
      foods = ["Family meals.", "Cow's milk can now be introduced as a beverage.", "Honey can now be introduced."];
      skills = ["Using utensils with more accuracy.", "Drinking from an open cup or straw cup.", "Chewing a variety of textures."];
    }

    setResults({ stage, textures, foods, skills, allergens });
  };

  const faqs = [
    { q: "When is the clinical recommendation to start solids?", a: "The World Health Organization (WHO) and the American Academy of Pediatrics (AAP) recommend exclusive breastfeeding or formula feeding for the first 6 months, followed by the introduction of complementary foods around 6 months when developmental signs of readiness are present." },
    { q: "What are the physiological signs of readiness?", a: "Clinical signs include: independent sitting with good head and neck control, loss of the extrusion (tongue-thrust) reflex, and the ability to bring objects to the mouth." },
    { q: "When should highly allergenic foods be introduced?", a: "Current clinical guidelines recommend introducing highly allergenic foods (like peanuts and eggs) early, around 6 months of age, to help prevent food allergies, rather than delaying them." },
    { q: "What foods are strictly contraindicated for infants under 1 year?", a: "Honey (due to infant botulism risk), cow's milk as a primary beverage (can cause intestinal bleeding and lacks sufficient iron), and choking hazards (whole grapes, hot dogs, nuts, popcorn)." }
  ];

  return (
    <CalculatorLayout
      title="Clinical Infant Feeding & Solid Food Guide"
      description="Evidence-based timeline for introducing complementary foods. Understand developmental readiness, appropriate textures, and allergen introduction."
      intro="The transition to complementary foods (solids) is a critical period for nutritional intake, oral-motor development, and the establishment of lifelong dietary habits. This clinical guide provides age-appropriate recommendations for food textures, developmental milestones, and safe allergen introduction based on current pediatric guidelines."
      schema={[
        generateSoftwareAppSchema("Clinical Solid Food Timeline", "Guide for starting solids and complementary feeding", "https://hernexa.com/solid-food-timeline"),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Solid Food Timeline", item: "https://hernexa.com/solid-food-timeline" }
        ])
      ]}
      faqs={faqs}
      howItWorks={
        <div className="space-y-4">
          <p>This timeline is structured around the physiological and neurological development of the infant, ensuring that food textures and types match their oral-motor capabilities:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Iron as a Priority:</strong> Around 6 months, an infant's endogenous iron stores (accumulated in utero) begin to deplete. Iron-rich foods (meats, fortified cereals) are critical first foods.</li>
            <li><strong>Texture Progression:</strong> Advancing textures from purees to lumpy to chopped foods is essential for developing the jaw muscles and coordination required for speech and safe swallowing.</li>
            <li><strong>Allergen Introduction:</strong> Early and sustained exposure to common allergens is now the standard of care for allergy prevention.</li>
          </ul>
        </div>
      }
      relatedTools={[
        { name: "Baby Growth Percentile", path: "/baby-growth-percentile" },
        { name: "Baby Formula Calculator", path: "/baby-formula-calculator" },
        { name: "Baby Sleep Schedule", path: "/baby-sleep-schedule" }
      ]}
      medicalReferences={[
        {
          title: "Starting Solid Foods",
          url: "https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx",
          source: "AAP"
        },
        {
          title: "Infant and Young Child Feeding",
          url: "https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding",
          source: "WHO"
        },
        {
          title: "Your Baby's First Solid Foods",
          url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/",
          source: "NHS"
        },
        {
          title: "Complementary feeding",
          url: "https://en.wikipedia.org/wiki/Complementary_feeding",
          source: "Wikipedia"
        }
      ]}
      results={results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <div className="flex justify-center mb-6 text-white">
              <Utensils className="w-16 h-16" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Developmental Stage</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white relative z-10 mb-4">
              {results.stage}
            </h2>
            <p className="text-white/90 font-medium flex items-center justify-center gap-2 relative z-10">
              <Baby className="w-4 h-4" />
              For a {age}-month-old infant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-text-dark flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                Appropriate Textures
              </h3>
              <ul className="space-y-3">
                {results.textures.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h3 className="text-lg font-bold text-text-dark flex items-center gap-2 mb-4">
                <Baby className="w-5 h-5 text-accent" />
                Oral-Motor Skills
              </h3>
              <ul className="space-y-3">
                {results.skills.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text-dark mb-4">Recommended Foods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.foods.map((food: string, i: number) => (
                <div key={i} className="p-4 bg-bg-light rounded-xl border border-neutral-100 text-sm text-text-dark font-medium">
                  {food}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-200 flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shadow-sm shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900">Clinical Note on Allergens</h3>
              <p className="text-sm text-amber-800 mt-2 leading-relaxed">
                {results.allergens} Introduce one new highly allergenic food at a time, and wait 3-5 days before introducing another, to monitor for potential adverse reactions.
              </p>
            </div>
          </div>

        
          {/* Next Step CTA */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-text-dark mb-1">What's Next?</h4>
              <p className="text-sm text-text-medium">Continue your health journey with our Baby Growth Percentile.</p>
            </div>
            <Link to="/baby-growth-percentile" className="btn-primary whitespace-nowrap px-6 py-2 text-sm">
              Baby Growth Percentile &rarr;
            </Link>
          </div>
        </motion.div>
      )}
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">The Physiology of Starting Solids</h2>
            <p>
              The introduction of complementary foods is not merely about nutrition; it is a complex developmental milestone involving the gastrointestinal tract, the immune system, and the central nervous system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Gut Maturation</h4>
                <p className="text-sm text-text-medium leading-relaxed">Around 6 months, the infant's gastrointestinal tract matures, producing the necessary enzymes to digest complex carbohydrates and proteins found in solid foods.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Oral-Motor Development</h4>
                <p className="text-sm text-text-medium leading-relaxed">The transition from a suckling reflex to active chewing and swallowing requires significant neurological coordination, which is stimulated by varying food textures.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">Iron Depletion</h4>
                <p className="text-sm text-text-medium leading-relaxed">Infants are born with iron stores that typically deplete by 6 months. Breastmilk is low in iron, making iron-rich complementary foods a clinical necessity.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Methods of Introduction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-primary" />
                  Traditional Spoon-Feeding
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  This method involves starting with thin purees and gradually increasing the thickness and lumpiness over several months. It allows parents to closely monitor intake but requires active progression of textures to prevent oral aversion later.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-text-dark flex items-center gap-2">
                  <Baby className="w-5 h-5 text-accent" />
                  Baby-Led Weaning (BLW)
                </h4>
                <p className="text-sm text-text-medium leading-relaxed">
                  BLW bypasses purees entirely, offering the infant soft, appropriately sized pieces of table food to self-feed from the start. This promotes autonomy and fine motor skills, though it requires careful attention to choking hazards and ensuring adequate iron intake.
                </p>
              </div>
            </div>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Tooltip content="Enter your baby's age in full months (4-24)." showIcon>
            <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Infant's Age (Months)</label>
          </Tooltip>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(parseInt(e.target.value))} 
            className="input-field" 
            placeholder="e.g., 6"
          />
        </div>

        <button 
          onClick={calculate} 
          className="btn-primary w-full py-5 text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Utensils className="w-5 h-5" />
          Generate Feeding Guide
        </button>
      </div>
    </CalculatorLayout>
  );
}
