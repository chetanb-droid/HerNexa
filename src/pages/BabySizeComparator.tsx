import { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { generateFAQSchema, generateBreadcrumbSchema, generateSoftwareAppSchema, validateNumber } from '../lib/calculators';
import { Baby, Ruler, Scale, Sparkles, Info, Activity, Heart, ArrowRight } from 'lucide-react';
import Tooltip from '../components/ui/Tooltip';
import { motion } from 'motion/react';

const babyData: Record<number, any> = {
  4: { fruit: "Poppy Seed", animal: "Tiny Ant", object: "Ball Bearing", length: "0.04 in", weight: "Less than 0.04 oz", desc: "Your baby is a tiny ball of cells (blastocyst) settling into the uterine lining. The neural tube is starting to form." },
  5: { fruit: "Sesame Seed", animal: "Ladybug", object: "Pencil Tip", length: "0.1 in", weight: "Less than 0.04 oz", desc: "The neural tube, heart, and blood vessels are beginning to form. The heart starts beating this week!" },
  6: { fruit: "Sweet Pea", animal: "Tadpole", object: "Chocolate Chip", length: "0.25 in", weight: "0.04 oz", desc: "Your baby's heart is beating and can often be seen on an early ultrasound. Basic facial features are appearing." },
  7: { fruit: "Blueberry", animal: "Small Snail", object: "Push Pin", length: "0.5 in", weight: "0.04 oz", desc: "Arm and leg buds are growing, and the brain is developing rapidly. The kidneys are also starting to form." },
  8: { fruit: "Raspberry", animal: "Honeybee", object: "Penny", length: "0.6 in", weight: "0.04 oz", desc: "Fingers and toes are starting to form, though they are still webbed. The baby is moving, but it's too early to feel." },
  9: { fruit: "Green Olive", animal: "Hummingbird Egg", object: "Bottle Cap", length: "0.9 in", weight: "0.07 oz", desc: "Essential organs have begun to grow, and the embryonic tail has disappeared. The baby's heart is now fully divided into four chambers." },
  10: { fruit: "Prune", animal: "Caterpillar", object: "Lego Brick", length: "1.2 in", weight: "0.14 oz", desc: "Your baby is now officially a fetus! Bones and cartilage are forming, and the baby can now swallow." },
  11: { fruit: "Lime", animal: "Goldfish", object: "Golf Tee", length: "1.6 in", weight: "0.25 oz", desc: "Tooth buds, hair follicles, and nail beds are forming. The baby is very active, stretching and somersaulting." },
  12: { fruit: "Plum", animal: "Small Frog", object: "Large Marshmallow", length: "2.1 in", weight: "0.49 oz", desc: "Your baby's reflexes are kicking in. They can open and close their fingers and curl their toes." },
  13: { fruit: "Peach", animal: "Chameleon", object: "Lemon Slice", length: "2.9 in", weight: "0.81 oz", desc: "Vocal cords are forming, and intestines are moving into the abdomen. The baby's fingerprints are also developing." },
  14: { fruit: "Lemon", animal: "Hamster", object: "Computer Mouse", length: "3.4 in", weight: "1.5 oz", desc: "Your baby can squint, frown, and grimace. Kidneys are producing urine, which is released into the amniotic fluid." },
  15: { fruit: "Apple", animal: "Canary", object: "iPhone", length: "4.0 in", weight: "2.5 oz", desc: "Your baby is looking more like a little person, with ears and eyes in their final positions. The skeleton is starting to harden." },
  16: { fruit: "Avocado", animal: "Small Squirrel", object: "Standard Envelope", length: "4.6 in", weight: "3.5 oz", desc: "The heart is pumping about 25 quarts of blood a day. The baby's legs are becoming more developed." },
  17: { fruit: "Turnip", animal: "Chinchilla", object: "CD Case", length: "5.1 in", weight: "4.9 oz", desc: "Your baby's skeleton is changing from soft cartilage to bone. Sweat glands are also starting to develop." },
  18: { fruit: "Bell Pepper", animal: "Guinea Pig", object: "Sweet Potato", length: "5.6 in", weight: "6.7 oz", desc: "You might start feeling your baby move (quickening) around this time. The baby's ears are fully formed and they can hear." },
  19: { fruit: "Heirloom Tomato", animal: "Hedgehog", object: "Game Boy", length: "6.0 in", weight: "8.5 oz", desc: "A protective coating called vernix caseosa is forming on your baby's skin to protect it from the amniotic fluid." },
  20: { fruit: "Banana", animal: "Kitten", object: "Paperback Book", length: "10.1 in", weight: "10.6 oz", desc: "You are halfway there! Your baby is swallowing more and producing meconium, their first bowel movement." },
  21: { fruit: "Carrot", animal: "Small Rabbit", object: "Tablet", length: "10.5 in", weight: "12.7 oz", desc: "Your baby's eyebrows and eyelids are fully formed. They are starting to develop a sense of touch." },
  22: { fruit: "Spaghetti Squash", animal: "Ferret", object: "Water Bottle", length: "10.9 in", weight: "15.2 oz", desc: "Your baby's lips, eyelids, and eyebrows are becoming more distinct. The inner ear is fully developed." },
  23: { fruit: "Large Mango", animal: "Grapefruit", object: "Barbie Doll", length: "11.4 in", weight: "1.1 lbs", desc: "Your baby's hearing is developing; they can hear your heartbeat, your voice, and loud noises from outside." },
  24: { fruit: "Ear of Corn", animal: "Prairie Dog", object: "Loaf of Bread", length: "11.8 in", weight: "1.3 lbs", desc: "Your baby's brain is growing rapidly, and taste buds are forming. Their lungs are starting to produce surfactant." },
  25: { fruit: "Rutabaga", animal: "Small Puppy", object: "Soccer Ball", length: "13.6 in", weight: "1.5 lbs", desc: "Your baby is adding baby fat and growing more hair. They are starting to have regular sleep and wake cycles." },
  26: { fruit: "Scallion", animal: "Meerkat", object: "Bowling Pin", length: "14.0 in", weight: "1.7 lbs", desc: "Your baby's eyes are beginning to open. They can now blink and have eyelashes." },
  27: { fruit: "Cauliflower", animal: "Platypus", object: "Head of Lettuce", length: "14.4 in", weight: "1.9 lbs", desc: "Your baby is practicing breathing by inhaling and exhaling amniotic fluid. Their brain activity is increasing." },
  28: { fruit: "Large Eggplant", animal: "Duck", object: "Rolling Pin", length: "14.8 in", weight: "2.2 lbs", desc: "Your baby can blink, and their eyesight is developing. They are starting to dream during sleep." },
  29: { fruit: "Butternut Squash", animal: "Bunny", object: "Toaster", length: "15.2 in", weight: "2.5 lbs", desc: "Your baby's muscles and lungs are continuing to mature. Their head is growing to accommodate their developing brain." },
  30: { fruit: "Large Cabbage", animal: "Koala", object: "Bicycle Helmet", length: "15.7 in", weight: "2.9 lbs", desc: "A pint and a half of amniotic fluid surrounds your baby. Their bone marrow is now producing red blood cells." },
  31: { fruit: "Coconut", animal: "Small Cat", object: "Dumbbell", length: "16.2 in", weight: "3.3 lbs", desc: "Your baby can turn their head from side to side. They are gaining weight quickly now." },
  32: { fruit: "Jicama", animal: "Skunk", object: "Laptop", length: "16.7 in", weight: "3.8 lbs", desc: "Your baby is taking up more space in your uterus, so movements might feel like rolls rather than sharp kicks." },
  33: { fruit: "Pineapple", animal: "Badger", object: "Skateboard", length: "17.2 in", weight: "4.2 lbs", desc: "Your baby's bones are hardening, though the skull remains soft for birth. Their immune system is getting a boost." },
  34: { fruit: "Cantaloupe", animal: "Fawn", object: "Bowling Ball", length: "17.7 in", weight: "4.7 lbs", desc: "Your baby's central nervous system and lungs are continuing to mature. They are starting to move into a head-down position." },
  35: { fruit: "Honeydew Melon", animal: "Small Piglet", object: "Picnic Basket", length: "18.2 in", weight: "5.3 lbs", desc: "Your baby's kidneys are fully developed, and the liver can process some waste. They are very snug in the womb now." },
  36: { fruit: "Romaine Lettuce", animal: "Small Dog", object: "Papaya", length: "18.7 in", weight: "5.8 lbs", desc: "Your baby is shedding the downy hair (lanugo) that covered their body. They are gaining about an ounce a day." },
  37: { fruit: "Swiss Chard", animal: "Raccoon", object: "Watermelon", length: "19.1 in", weight: "6.3 lbs", desc: "Your baby is considered 'early term' and is practicing breathing, sucking, and swallowing. Their brain is still developing rapidly." },
  38: { fruit: "Leek", animal: "Otter", object: "Standard Pillow", length: "19.6 in", weight: "6.8 lbs", desc: "Your baby has a firm grasp and their organs are ready for life outside the womb. They are adding more fat for warmth." },
  39: { fruit: "Mini Watermelon", animal: "Small Lamb", object: "Beach Ball", length: "19.9 in", weight: "7.3 lbs", desc: "Your baby is considered 'full term' and is waiting to greet the world! Their lungs are fully prepared for the first breath." },
  40: { fruit: "Small Pumpkin", animal: "Newborn Baby", object: "Basketball", length: "20.2 in", weight: "7.6 lbs", desc: "Your baby is fully developed and ready for birth. Due dates are just estimates—only 5% of babies arrive on their actual due date!" }
};

export default function BabySizeComparator() {
  const [week, setWeek] = useState<number>(12);
  const [comparisonType, setComparisonType] = useState<'fruit' | 'animal' | 'object'>('fruit');
  const data = babyData[week as keyof typeof babyData];

  const faqs = [
    { q: "Are these fetal measurements exact?", a: "No, these represent statistical averages (typically the 50th percentile). Fetal growth is influenced by genetics, placental function, and maternal health. Ultrasound biometry provides the most accurate assessment for your specific pregnancy." },
    { q: "Why do we compare fetal size to objects?", a: "While clinical measurements (Crown-Rump Length, Estimated Fetal Weight) are precise, visual analogies help parents conceptualize the rapid physical changes occurring in utero." },
    { q: "When do fetuses start growing at different rates?", a: "During the first trimester, embryonic growth is highly uniform. By the late second and third trimesters, genetic potential and environmental factors cause significant variation in fetal weight and length." },
    { q: "What is the difference between CRL and CHL?", a: "Up to 20 weeks, fetuses are measured via Crown-Rump Length (CRL) because their legs are curled in the fetal position. After 20 weeks, Crown-Heel Length (CHL) is used to estimate total length." }
  ];

  return (
    <CalculatorLayout
      title="Clinical Fetal Development & Size Tracker | Baby Size Comparator"
      description="Track baby size by week using our pregnancy baby size comparator. Compare fetal size to everyday objects and predict baby gender based on heart rate myth."
      intro="Understanding fetal development week-by-week provides valuable insight into the physiological changes occurring during pregnancy. This tool acts as a <strong>baby size comparator</strong>, translating clinical biometry (average length and weight) into relatable visual comparisons while highlighting critical milestones in organogenesis and neurodevelopment. Note that while fun, things like trying to <strong>predict baby gender based on heart rate myth</strong> are not scientifically accurate compared to clinical measurements."
      schema={[
        generateSoftwareAppSchema(
          "Clinical Fetal Development Tracker",
          "Compare fetal size to fruits and vegetables week by week.",
          "https://hernexa.com/baby-size-comparator"
        ),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", item: "https://hernexa.com" },
          { name: "Tools", item: "https://hernexa.com/tools" },
          { name: "Baby Size Comparator", item: "https://hernexa.com/baby-size-comparator" }
        ])
      ]}
      howItWorks={
        <>
          <p>This tool utilizes standard fetal growth curves based on data from the World Health Organization (WHO) and the American College of Obstetricians and Gynecologists (ACOG):</p>
          <ul>
            <li><strong>Length (CRL/CHL):</strong> Up to 20 weeks, measurements reflect Crown-Rump Length (CRL). Post-20 weeks, measurements reflect Crown-Heel Length (CHL).</li>
            <li><strong>Estimated Fetal Weight (EFW):</strong> Averages represent the 50th percentile based on normative population data.</li>
            <li><strong>Developmental Milestones:</strong> Highlights key phases of embryogenesis and fetal maturation for each gestational week.</li>
          </ul>
        </>
      }
      faqs={faqs}
      relatedTools={[
        { name: "Due Date Calculator", path: "/due-date-calculator" },
        { name: "Pregnancy Week Calculator", path: "/pregnancy-week-calculator" },
        { name: "Pregnancy Weight Gain", path: "/pregnancy-weight-gain-calculator" }
      ]}
      medicalReferences={[
        {
          title: "Fetal Development: The First Trimester",
          url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302",
          source: "Mayo Clinic"
        },
        {
          title: "Fetal Development Milestones",
          url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy",
          source: "ACOG"
        },
        {
          title: "Your Pregnancy Week by Week",
          url: "https://www.nhs.uk/start-for-life/pregnancy/week-by-week/",
          source: "NHS"
        },
        {
          title: "Fetal development",
          url: "https://en.wikipedia.org/wiki/Prenatal_development",
          source: "Wikipedia"
        }
      ]}
      results={
        <motion.div 
          key={`${week}-${comparisonType}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-primary text-white p-10 rounded-[3rem] text-center shadow-lg shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-2 relative z-10">Week {week} Size Comparison</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white relative z-10 mb-8">
              {comparisonType === 'fruit' && data.fruit}
              {comparisonType === 'animal' && data.animal}
              {comparisonType === 'object' && data.object}
            </h2>
            
            <div className="flex justify-center gap-3 mb-6 relative z-10">
              <button 
                onClick={() => setComparisonType('fruit')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${comparisonType === 'fruit' ? 'bg-white text-primary scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Fruit
              </button>
              <button 
                onClick={() => setComparisonType('animal')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${comparisonType === 'animal' ? 'bg-white text-primary scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Animal
              </button>
              <button 
                onClick={() => setComparisonType('object')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${comparisonType === 'object' ? 'bg-white text-primary scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                Object
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 relative z-10">
              <p className="text-white/80 text-sm font-medium flex items-center justify-center gap-2">
                Fetal Growth Tracking
              </p>
            </div>
          </div>
        </motion.div>
      }
      richContent={
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Visualizing Fetal Growth</h2>
            <p>
              While clinical biometry (measurements taken via ultrasound) provides the most accurate assessment of fetal well-being, translating these numbers into relatable analogies helps parents conceptualize the rapid physiological changes occurring in utero.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The First Trimester</h4>
                <p className="text-sm text-text-medium leading-relaxed">Characterized by rapid organogenesis. The embryo transforms from a microscopic cluster of cells into a fully formed fetus with all major organ systems present.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Second Trimester</h4>
                <p className="text-sm text-text-medium leading-relaxed">A period of significant linear growth (length). Organ systems mature, and the fetus begins to exhibit coordinated movements and reflexes.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h4 className="font-bold text-text-dark mb-2">The Third Trimester</h4>
                <p className="text-sm text-text-medium leading-relaxed">Growth shifts primarily to weight gain and the accumulation of brown fat, which is essential for thermoregulation post-delivery.</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-text-dark">Clinical Variables in Fetal Size</h2>
            <p>
              It is critical to understand that the measurements provided are statistical averages (the 50th percentile). Significant biological variation is normal, influenced by several factors:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-text-medium">
              <li><strong>Genetic Potential:</strong> Parental height and weight are strong determinants of fetal size, particularly in the third trimester.</li>
              <li><strong>Placental Function:</strong> The efficiency of the placenta in delivering oxygen and nutrients directly impacts fetal growth velocity.</li>
              <li><strong>Maternal Health:</strong> Conditions such as gestational diabetes can lead to macrosomia (larger than average size), while hypertension can cause growth restriction.</li>
              <li><strong>Parity:</strong> Subsequent pregnancies often result in slightly larger birth weights compared to a first pregnancy.</li>
            </ul>
          </section>

          <section className="bg-primary-light/30 p-10 rounded-[2rem] border border-primary/10">
            <h3 className="text-xl font-serif font-bold text-text-dark mb-4 text-center">Expert Insight: The Growth Curve</h3>
            <p className="text-sm text-center max-w-2xl mx-auto leading-relaxed italic text-text-medium">
              "What matters most isn't whether your baby is exactly the size of a 'banana' on week 20, but that they are following their own consistent growth curve. During your prenatal visits, we use fundal height measurements and ultrasounds to ensure your baby is growing steadily, which is the best indicator of fetal well-being."
            </p>
          </section>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Tooltip content="Drag the slider to select your current week of pregnancy." showIcon>
                <label className="text-xs font-bold text-text-medium uppercase tracking-[0.15em]">Select Pregnancy Week</label>
              </Tooltip>
              <div className="flex items-center gap-2">
                <Baby className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold text-xl">Week {week}</span>
              </div>
            </div>
            <input 
              type="range" 
              min="4" 
              max="40" 
              value={week} 
              onChange={(e) => setWeek(Number(e.target.value))} 
              className="w-full h-3 bg-primary-light rounded-full appearance-none cursor-pointer accent-primary" 
            />
            <div className="flex justify-between text-[10px] text-text-medium font-bold uppercase tracking-widest">
              <span>First Trimester</span>
              <span>Halfway</span>
              <span>Full Term</span>
            </div>
          </div>
        </div>

        <motion.div
          key={`details-${week}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-bg-light p-8 rounded-[2rem] border border-border flex items-start gap-6 shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shadow-sm">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-dark">Developmental Milestone</h3>
              <p className="text-sm text-text-medium mt-2 leading-relaxed">
                {data.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-border flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner"><Ruler className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Average Length</p>
                <p className="text-2xl font-bold text-text-dark">{data.length}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-border flex items-center gap-6 shadow-sm">
              <div className="p-4 bg-accent/10 text-accent rounded-2xl shadow-inner"><Scale className="w-8 h-8" /></div>
              <div>
                <p className="text-xs text-text-medium uppercase font-bold tracking-wider">Average Weight</p>
                <p className="text-2xl font-bold text-text-dark">{data.weight}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </CalculatorLayout>
  );
}
