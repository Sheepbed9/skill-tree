// Recursive skill library — each skill can contain children to any depth.
// Icons cascade: if a skill doesn't set its own, it inherits from its ancestor.

export type LibrarySkill = {
  name: string;
  icon?: string;
  children?: LibrarySkill[];
};

export type LibraryDomain = {
  name: string;
  icon?: string;
  skills: LibrarySkill[];
};

export const skillLibrary: LibraryDomain[] = [
  {
    name: 'Physical Fitness',
    icon: '💪',
    skills: [
      {
        name: 'Running',
        icon: '🏃',
        children: [
          {
            name: 'Road Running',
            children: [
              { name: '5KM', children: [{ name: 'Sub-25 min' }, { name: 'Sub-20 min' }] },
              { name: '10KM', children: [{ name: 'Sub-50 min' }, { name: 'Sub-40 min' }] },
              { name: 'Half Marathon', children: [{ name: 'Sub-2:00' }, { name: 'Sub-1:30' }] },
              {
                name: 'Marathon',
                children: [{ name: 'Sub-5:00' }, { name: 'Sub-4:00' }, { name: 'Sub-3:00' }],
              },
              {
                name: 'Ultra Marathon',
                children: [{ name: '50KM' }, { name: '100KM' }, { name: '100 miles' }],
              },
            ],
          },
          {
            name: 'Track & Field',
            children: [
              { name: 'Sprints', children: [{ name: '100m' }, { name: '200m' }, { name: '400m' }] },
              {
                name: 'Middle Distance',
                children: [{ name: '800m' }, { name: '1500m' }, { name: '5000m' }],
              },
              { name: 'Hurdles' },
            ],
          },
          {
            name: 'Trail Running',
            children: [
              { name: 'Technical Descents' },
              { name: 'Elevation Endurance' },
              { name: 'Trail Navigation' },
            ],
          },
          {
            name: 'Training Methods',
            children: [
              { name: 'Zone 2 Base' },
              { name: 'Tempo Runs' },
              { name: 'Interval Training' },
              { name: 'Fartlek' },
              { name: 'Hill Repeats' },
            ],
          },
          {
            name: 'Running Form',
            children: [
              { name: 'Cadence (180 spm)' },
              { name: 'Foot Strike' },
              { name: 'Breathing Rhythm' },
            ],
          },
        ],
      },
      {
        name: 'Strength Training',
        icon: '🏋️',
        children: [
          {
            name: 'Barbell Lifts',
            children: [
              {
                name: 'Squat',
                children: [
                  { name: 'Back Squat' },
                  { name: 'Front Squat' },
                  { name: 'Overhead Squat' },
                  { name: 'Box Squat' },
                ],
              },
              {
                name: 'Deadlift',
                children: [
                  { name: 'Conventional' },
                  { name: 'Sumo' },
                  { name: 'Romanian' },
                  { name: 'Stiff-leg' },
                  { name: 'Trap Bar' },
                ],
              },
              {
                name: 'Bench Press',
                children: [
                  { name: 'Flat' },
                  { name: 'Incline' },
                  { name: 'Decline' },
                  { name: 'Close-grip' },
                ],
              },
              {
                name: 'Overhead Press',
                children: [
                  { name: 'Strict Press' },
                  { name: 'Push Press' },
                  { name: 'Push Jerk' },
                ],
              },
              { name: 'Bent-Over Row' },
            ],
          },
          {
            name: 'Olympic Lifting',
            children: [
              {
                name: 'Clean',
                children: [
                  { name: 'Power Clean' },
                  { name: 'Squat Clean' },
                  { name: 'Hang Clean' },
                ],
              },
              { name: 'Jerk', children: [{ name: 'Split Jerk' }, { name: 'Push Jerk' }] },
              {
                name: 'Snatch',
                children: [
                  { name: 'Power Snatch' },
                  { name: 'Squat Snatch' },
                  { name: 'Hang Snatch' },
                ],
              },
            ],
          },
          {
            name: 'Accessory Lifts',
            children: [
              { name: 'Pull-ups / Chin-ups' },
              {
                name: 'Dumbbell Work',
                children: [{ name: 'Rows' }, { name: 'Presses' }, { name: 'Curls' }],
              },
              {
                name: 'Kettlebell',
                children: [
                  { name: 'Swings' },
                  { name: 'Turkish Get-up' },
                  { name: 'Clean & Press' },
                ],
              },
              { name: 'Cable Work' },
            ],
          },
          {
            name: 'Training Styles',
            children: [
              { name: 'Powerlifting' },
              { name: 'Bodybuilding' },
              { name: 'Strongman' },
              { name: 'CrossFit' },
              { name: 'Westside Method' },
            ],
          },
          {
            name: 'Programming Concepts',
            children: [
              { name: 'Linear Progression' },
              { name: 'Periodization' },
              { name: 'Deload Weeks' },
              { name: 'Volume vs Intensity' },
              { name: 'RPE / RIR' },
            ],
          },
        ],
      },
      {
        name: 'Calisthenics',
        icon: '🤸',
        children: [
          {
            name: 'Push Skills',
            children: [
              {
                name: 'Push-up Variations',
                children: [
                  { name: 'Standard' },
                  { name: 'Diamond' },
                  { name: 'Archer' },
                  { name: 'Pseudo Planche' },
                  { name: 'One-arm Push-up' },
                ],
              },
              {
                name: 'Dips',
                children: [
                  { name: 'Bench Dips' },
                  { name: 'Parallel Bar Dips' },
                  { name: 'Ring Dips' },
                ],
              },
              {
                name: 'Handstand',
                children: [
                  { name: 'Wall Handstand' },
                  { name: 'Freestanding' },
                  { name: 'Handstand Push-up' },
                  { name: 'One-arm Handstand' },
                ],
              },
              {
                name: 'Planche',
                children: [
                  { name: 'Tuck Planche' },
                  { name: 'Advanced Tuck' },
                  { name: 'Straddle Planche' },
                  { name: 'Full Planche' },
                ],
              },
            ],
          },
          {
            name: 'Pull Skills',
            children: [
              {
                name: 'Pull-up Variations',
                children: [
                  { name: 'Dead Hang' },
                  { name: 'Chin-up' },
                  { name: 'Wide-grip' },
                  { name: 'L-sit Pull-up' },
                  { name: 'Archer Pull-up' },
                  { name: 'One-arm Pull-up' },
                ],
              },
              {
                name: 'Muscle-up',
                children: [
                  { name: 'Bar Muscle-up' },
                  { name: 'Ring Muscle-up' },
                  { name: 'Strict Muscle-up' },
                ],
              },
              {
                name: 'Front Lever',
                children: [
                  { name: 'Tuck Front Lever' },
                  { name: 'Advanced Tuck' },
                  { name: 'Straddle Front Lever' },
                  { name: 'Full Front Lever' },
                ],
              },
              { name: 'Back Lever' },
            ],
          },
          {
            name: 'Core Skills',
            children: [
              { name: 'L-sit' },
              { name: 'V-sit' },
              { name: 'Dragon Flag' },
              { name: 'Human Flag' },
              { name: 'Hollow Body Hold' },
            ],
          },
          {
            name: 'Leg Skills',
            children: [
              { name: 'Pistol Squat' },
              { name: 'Shrimp Squat' },
              { name: 'Nordic Curl' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Nutrition & Cooking',
    icon: '🥗',
    skills: [
      {
        name: 'Cooking Techniques',
        icon: '👨‍🍳',
        children: [
          {
            name: 'Knife Skills',
            children: [
              { name: 'Julienne' },
              { name: 'Brunoise' },
              { name: 'Chiffonade' },
              { name: 'Mincing' },
              { name: 'Honing & Sharpening' },
            ],
          },
          {
            name: 'Heat Methods',
            children: [
              { name: 'Sauté' },
              { name: 'Roast' },
              { name: 'Braise' },
              { name: 'Grill' },
              { name: 'Sous Vide' },
              { name: 'Deep Fry' },
            ],
          },
          {
            name: 'Sauces',
            children: [
              {
                name: 'Mother Sauces',
                children: [
                  { name: 'Béchamel' },
                  { name: 'Velouté' },
                  { name: 'Espagnole' },
                  { name: 'Hollandaise' },
                  { name: 'Tomate' },
                ],
              },
              { name: 'Pan Sauces' },
              {
                name: 'Emulsions',
                children: [
                  { name: 'Mayonnaise' },
                  { name: 'Vinaigrette' },
                  { name: 'Beurre Blanc' },
                ],
              },
            ],
          },
          {
            name: 'Baking',
            children: [
              {
                name: 'Breads',
                children: [
                  { name: 'Sourdough' },
                  { name: 'Yeast Breads' },
                  { name: 'Quick Breads' },
                  { name: 'Focaccia' },
                ],
              },
              {
                name: 'Pastries',
                children: [
                  { name: 'Pie Dough' },
                  { name: 'Laminated Dough' },
                  { name: 'Choux' },
                ],
              },
              { name: 'Cakes' },
              { name: 'Cookies' },
            ],
          },
        ],
      },
      {
        name: 'Cuisines',
        icon: '🌍',
        children: [
          {
            name: 'Italian',
            children: [
              { name: 'Pasta from Scratch' },
              { name: 'Risotto' },
              { name: 'Pizza Napolitana' },
              { name: 'Osso Buco' },
            ],
          },
          {
            name: 'Japanese',
            children: [
              { name: 'Sushi & Sashimi' },
              { name: 'Ramen' },
              { name: 'Tempura' },
              { name: 'Dashi' },
            ],
          },
          {
            name: 'French',
            children: [
              { name: 'Stocks' },
              { name: 'Confit' },
              { name: 'Soufflé' },
            ],
          },
          {
            name: 'Chinese',
            children: [
              { name: 'Wok Technique' },
              { name: 'Dim Sum' },
              { name: 'Stir-Fry' },
            ],
          },
          {
            name: 'Mexican',
            children: [
              { name: 'Salsas' },
              { name: 'Tortillas' },
              { name: 'Mole' },
            ],
          },
          {
            name: 'Indian',
            children: [
              { name: 'Spice Tempering' },
              { name: 'Curries' },
              { name: 'Flatbreads' },
            ],
          },
        ],
      },
      {
        name: 'Nutrition Science',
        icon: '🧬',
        children: [
          {
            name: 'Macronutrients',
            children: [
              { name: 'Protein' },
              { name: 'Carbohydrates' },
              { name: 'Fats' },
              { name: 'Fiber' },
            ],
          },
          {
            name: 'Micronutrients',
            children: [
              { name: 'Vitamins' },
              { name: 'Minerals' },
              { name: 'Electrolytes' },
            ],
          },
          {
            name: 'Dietary Patterns',
            children: [
              { name: 'Mediterranean' },
              { name: 'Low-Carb / Keto' },
              { name: 'Plant-Based' },
              { name: 'Intermittent Fasting' },
              { name: 'High-Protein' },
            ],
          },
          { name: 'Calorie Tracking' },
          { name: 'Hydration' },
        ],
      },
      {
        name: 'Meal Planning',
        icon: '📋',
        children: [
          { name: 'Weekly Prep' },
          { name: 'Batch Cooking' },
          { name: 'Macro Tracking' },
          { name: 'Budget Shopping' },
          { name: 'Leftovers Strategy' },
        ],
      },
      {
        name: 'Ingredients',
        icon: '🌽',
        children: [
          {
            name: 'Proteins',
            children: [
              { name: 'Meat Cuts' },
              { name: 'Fish & Seafood' },
              { name: 'Eggs' },
              { name: 'Legumes' },
              { name: 'Tofu & Tempeh' },
            ],
          },
          {
            name: 'Produce',
            children: [
              { name: 'Seasonal Vegetables' },
              { name: 'Fruits' },
              { name: 'Alliums' },
            ],
          },
          {
            name: 'Grains',
            children: [
              { name: 'Rice Varieties' },
              { name: 'Whole Grains' },
              { name: 'Flours' },
            ],
          },
          { name: 'Dairy' },
          {
            name: 'Herbs & Spices',
            children: [
              { name: 'Fresh Herbs' },
              { name: 'Dried Spices' },
              { name: 'Spice Blends' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Health & Recovery',
    icon: '🩺',
    skills: [
      {
        name: 'Sleep',
        icon: '😴',
        children: [
          {
            name: 'Sleep Hygiene',
            children: [
              { name: 'Consistent Schedule' },
              { name: 'Screen Curfew' },
              { name: 'Room Temperature' },
              { name: 'Light Management' },
            ],
          },
          {
            name: 'Sleep Tracking',
            children: [
              { name: 'Wearable Data' },
              { name: 'Sleep Staging' },
              { name: 'HRV Monitoring' },
            ],
          },
          {
            name: 'Sleep Disorders',
            children: [
              { name: 'Insomnia Management' },
              { name: 'Sleep Apnea Awareness' },
              { name: 'Circadian Rhythm Fixes' },
            ],
          },
        ],
      },
      {
        name: 'Stretching & Mobility',
        icon: '🧘',
        children: [
          {
            name: 'Static Stretching',
            children: [
              { name: 'Hamstrings' },
              { name: 'Hip Flexors' },
              { name: 'Shoulders' },
              { name: 'Thoracic Spine' },
            ],
          },
          {
            name: 'Dynamic Mobility',
            children: [
              { name: 'Joint Circles' },
              { name: 'Leg Swings' },
              { name: 'Arm Circles' },
              { name: 'World\'s Greatest Stretch' },
            ],
          },
          {
            name: 'Foam Rolling',
            children: [
              { name: 'IT Band' },
              { name: 'Quads & Glutes' },
              { name: 'Upper Back' },
            ],
          },
          {
            name: 'Yoga',
            children: [
              { name: 'Sun Salutations' },
              { name: 'Warrior Poses' },
              { name: 'Balance Poses' },
              { name: 'Restorative Yoga' },
            ],
          },
        ],
      },
      {
        name: 'Injury Prevention',
        icon: '🛡️',
        children: [
          {
            name: 'Warm-up Protocols',
            children: [
              { name: 'General Warm-up' },
              { name: 'Sport-Specific Warm-up' },
              { name: 'Activation Drills' },
            ],
          },
          {
            name: 'Common Injuries',
            children: [
              { name: 'Sprains & Strains' },
              { name: 'Tendinitis' },
              { name: 'Stress Fractures' },
              { name: 'Back Pain Management' },
            ],
          },
          {
            name: 'Rehab Basics',
            children: [
              { name: 'RICE Protocol' },
              { name: 'Progressive Loading' },
              { name: 'Return-to-Activity Criteria' },
            ],
          },
        ],
      },
      {
        name: 'Mental Health',
        icon: '💚',
        children: [
          {
            name: 'Anxiety Management',
            children: [
              { name: 'Breathing Exercises' },
              { name: 'Grounding Techniques' },
              { name: 'CBT Basics' },
            ],
          },
          {
            name: 'Depression Awareness',
            children: [
              { name: 'Recognizing Symptoms' },
              { name: 'Behavioral Activation' },
              { name: 'When to Seek Help' },
            ],
          },
          {
            name: 'Burnout Prevention',
            children: [
              { name: 'Boundary Setting' },
              { name: 'Rest & Recovery Cycles' },
              { name: 'Energy Management' },
            ],
          },
        ],
      },
      {
        name: 'Medical Literacy',
        icon: '📖',
        children: [
          {
            name: 'Reading Lab Results',
            children: [
              { name: 'Blood Panels' },
              { name: 'Lipid Profiles' },
              { name: 'Hormone Levels' },
            ],
          },
          {
            name: 'First Aid',
            children: [
              { name: 'CPR & AED' },
              { name: 'Wound Care' },
              { name: 'Choking Response' },
              { name: 'Splinting' },
            ],
          },
          {
            name: 'Preventive Screening',
            children: [
              { name: 'Annual Check-ups' },
              { name: 'Dental Health' },
              { name: 'Vision Screening' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Grooming & Style',
    icon: '✂️',
    skills: [
      {
        name: 'Skincare',
        icon: '🧴',
        children: [
          {
            name: 'Daily Routine',
            children: [
              { name: 'Cleanser' },
              { name: 'Moisturizer' },
              { name: 'Sunscreen (SPF)' },
            ],
          },
          {
            name: 'Treatments',
            children: [
              { name: 'Retinoids' },
              { name: 'Vitamin C Serum' },
              { name: 'Exfoliation (AHA/BHA)' },
              { name: 'Niacinamide' },
            ],
          },
          {
            name: 'Skin Types',
            children: [
              { name: 'Oily Skin Care' },
              { name: 'Dry Skin Care' },
              { name: 'Combination Skin' },
              { name: 'Sensitive Skin' },
            ],
          },
        ],
      },
      {
        name: 'Haircare',
        icon: '💇',
        children: [
          {
            name: 'Hair Washing',
            children: [
              { name: 'Shampoo Selection' },
              { name: 'Conditioner Technique' },
              { name: 'Wash Frequency' },
            ],
          },
          {
            name: 'Styling',
            children: [
              { name: 'Blow Drying' },
              { name: 'Product Selection' },
              { name: 'Heat Protectant' },
              { name: 'Hairstyle Selection' },
            ],
          },
          {
            name: 'Hair Health',
            children: [
              { name: 'Scalp Care' },
              { name: 'Damage Prevention' },
              { name: 'Trimming Schedule' },
            ],
          },
        ],
      },
      {
        name: 'Fashion',
        icon: '👔',
        children: [
          {
            name: 'Wardrobe Basics',
            children: [
              { name: 'Capsule Wardrobe' },
              { name: 'Color Coordination' },
              { name: 'Fit & Tailoring' },
              { name: 'Seasonal Rotation' },
            ],
          },
          {
            name: 'Dress Codes',
            children: [
              { name: 'Business Professional' },
              { name: 'Smart Casual' },
              { name: 'Casual' },
              { name: 'Black Tie' },
            ],
          },
          {
            name: 'Accessories',
            children: [
              { name: 'Watches' },
              { name: 'Belts & Shoes' },
              { name: 'Bags' },
              { name: 'Jewelry' },
            ],
          },
        ],
      },
      {
        name: 'Personal Hygiene',
        icon: '🚿',
        children: [
          { name: 'Oral Care', children: [{ name: 'Brushing' }, { name: 'Flossing' }, { name: 'Mouthwash' }] },
          { name: 'Nail Care', children: [{ name: 'Trimming' }, { name: 'Cuticle Care' }, { name: 'Nail Health' }] },
          { name: 'Deodorant & Antiperspirant' },
          { name: 'Shaving & Grooming', children: [{ name: 'Razor Selection' }, { name: 'Pre-Shave Prep' }, { name: 'Post-Shave Care' }] },
        ],
      },
      {
        name: 'Fragrance',
        icon: '🌸',
        children: [
          {
            name: 'Fragrance Families',
            children: [
              { name: 'Woody' },
              { name: 'Fresh / Citrus' },
              { name: 'Oriental' },
              { name: 'Floral' },
            ],
          },
          {
            name: 'Application',
            children: [
              { name: 'Pulse Points' },
              { name: 'Layering' },
              { name: 'Concentration Types (EDT/EDP)' },
            ],
          },
          { name: 'Seasonal Selection' },
        ],
      },
    ],
  },
  {
    name: 'Mental & Emotional',
    icon: '🧠',
    skills: [
      {
        name: 'Mindfulness',
        icon: '🧘',
        children: [
          {
            name: 'Meditation',
            children: [
              { name: 'Breath Awareness' },
              { name: 'Body Scan' },
              { name: 'Loving-Kindness' },
              { name: 'Guided Meditation' },
            ],
          },
          {
            name: 'Present-Moment Awareness',
            children: [
              { name: 'Mindful Eating' },
              { name: 'Mindful Walking' },
              { name: 'Sensory Grounding' },
            ],
          },
          { name: 'Daily Practice Habit' },
        ],
      },
      {
        name: 'Emotional Intelligence',
        icon: '❤️',
        children: [
          {
            name: 'Self-Awareness',
            children: [
              { name: 'Emotion Labeling' },
              { name: 'Trigger Identification' },
              { name: 'Values Clarification' },
            ],
          },
          {
            name: 'Self-Regulation',
            children: [
              { name: 'Impulse Control' },
              { name: 'Emotional Reframing' },
              { name: 'Distress Tolerance' },
            ],
          },
          {
            name: 'Empathy',
            children: [
              { name: 'Perspective Taking' },
              { name: 'Compassionate Listening' },
              { name: 'Reading Emotions in Others' },
            ],
          },
          {
            name: 'Social Skills',
            children: [
              { name: 'Rapport Building' },
              { name: 'Influence & Persuasion' },
              { name: 'Team Collaboration' },
            ],
          },
        ],
      },
      {
        name: 'Stress Management',
        icon: '🌊',
        children: [
          {
            name: 'Acute Stress Techniques',
            children: [
              { name: 'Box Breathing' },
              { name: 'Progressive Muscle Relaxation' },
              { name: '5-4-3-2-1 Grounding' },
            ],
          },
          {
            name: 'Chronic Stress Strategies',
            children: [
              { name: 'Lifestyle Redesign' },
              { name: 'Delegation & Saying No' },
              { name: 'Hobby & Play Time' },
            ],
          },
          { name: 'Nervous System Regulation' },
        ],
      },
      {
        name: 'Therapy Skills',
        icon: '🛋️',
        children: [
          {
            name: 'CBT Techniques',
            children: [
              { name: 'Thought Records' },
              { name: 'Cognitive Distortions' },
              { name: 'Behavioral Experiments' },
            ],
          },
          {
            name: 'DBT Skills',
            children: [
              { name: 'Mindfulness Module' },
              { name: 'Interpersonal Effectiveness' },
              { name: 'Emotion Regulation' },
              { name: 'Distress Tolerance' },
            ],
          },
          {
            name: 'ACT Principles',
            children: [
              { name: 'Acceptance' },
              { name: 'Defusion' },
              { name: 'Values-Based Action' },
            ],
          },
        ],
      },
      {
        name: 'Journaling',
        icon: '📓',
        children: [
          {
            name: 'Journaling Methods',
            children: [
              { name: 'Free Writing' },
              { name: 'Prompted Journaling' },
              { name: 'Gratitude Journaling' },
              { name: 'Bullet Journaling' },
            ],
          },
          {
            name: 'Reflection Practices',
            children: [
              { name: 'Daily Review' },
              { name: 'Weekly Retrospective' },
              { name: 'Goal Tracking' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Relationships & Social',
    icon: '🤝',
    skills: [
      {
        name: 'Dating',
        icon: '💕',
        children: [
          {
            name: 'Self-Presentation',
            children: [
              { name: 'Profile Building' },
              { name: 'Conversation Starters' },
              { name: 'Authenticity & Vulnerability' },
            ],
          },
          {
            name: 'Dating Skills',
            children: [
              { name: 'Planning Dates' },
              { name: 'Reading Interest Signals' },
              { name: 'Setting Boundaries' },
            ],
          },
          {
            name: 'Long-Term Relationship',
            children: [
              { name: 'Love Languages' },
              { name: 'Maintaining Attraction' },
              { name: 'Partnership Communication' },
              { name: 'Shared Goals & Values' },
            ],
          },
        ],
      },
      {
        name: 'Friendships',
        icon: '👯',
        children: [
          {
            name: 'Making Friends',
            children: [
              { name: 'Approaching New People' },
              { name: 'Finding Communities' },
              { name: 'Shared Activities' },
            ],
          },
          {
            name: 'Maintaining Friendships',
            children: [
              { name: 'Regular Check-ins' },
              { name: 'Being Reliable' },
              { name: 'Reciprocity' },
            ],
          },
          { name: 'Deep vs Casual Friendships' },
        ],
      },
      {
        name: 'Networking',
        icon: '🌐',
        children: [
          {
            name: 'In-Person Networking',
            children: [
              { name: 'Elevator Pitch' },
              { name: 'Events & Meetups' },
              { name: 'Follow-up Strategy' },
            ],
          },
          {
            name: 'Online Networking',
            children: [
              { name: 'LinkedIn Strategy' },
              { name: 'Social Media Presence' },
              { name: 'Cold Outreach' },
            ],
          },
          {
            name: 'Relationship Nurturing',
            children: [
              { name: 'CRM for People' },
              { name: 'Giving Before Asking' },
              { name: 'Introductions & Connectors' },
            ],
          },
        ],
      },
      {
        name: 'Conflict Resolution',
        icon: '⚖️',
        children: [
          {
            name: 'Communication Frameworks',
            children: [
              { name: 'Nonviolent Communication (NVC)' },
              { name: 'I-Statements' },
              { name: 'Active Listening in Conflict' },
            ],
          },
          {
            name: 'De-escalation',
            children: [
              { name: 'Cooling Off Period' },
              { name: 'Empathy First' },
              { name: 'Finding Common Ground' },
            ],
          },
          {
            name: 'Mediation',
            children: [
              { name: 'Third-Party Facilitation' },
              { name: 'Win-Win Solutions' },
              { name: 'Restorative Conversations' },
            ],
          },
        ],
      },
      {
        name: 'Family Dynamics',
        icon: '👨‍👩‍👧‍👦',
        children: [
          {
            name: 'Parent-Child Relations',
            children: [
              { name: 'Setting Expectations' },
              { name: 'Active Parenting' },
              { name: 'Independence Building' },
            ],
          },
          {
            name: 'Sibling Relationships',
            children: [
              { name: 'Boundary Respect' },
              { name: 'Shared Responsibilities' },
            ],
          },
          {
            name: 'Extended Family',
            children: [
              { name: 'Cultural Traditions' },
              { name: 'Managing Expectations' },
              { name: 'Healthy Distance' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Communication',
    icon: '🗣️',
    skills: [
      {
        name: 'Public Speaking',
        icon: '🎤',
        children: [
          {
            name: 'Speech Structure',
            children: [
              { name: 'Opening Hooks' },
              { name: 'Storytelling' },
              { name: 'Clear Thesis' },
              { name: 'Call to Action' },
            ],
          },
          {
            name: 'Delivery',
            children: [
              { name: 'Voice Projection' },
              { name: 'Pacing & Pauses' },
              { name: 'Eye Contact' },
              { name: 'Stage Movement' },
            ],
          },
          {
            name: 'Presentation Tools',
            children: [
              { name: 'Slide Design' },
              { name: 'Visual Aids' },
              { name: 'Live Demos' },
            ],
          },
          { name: 'Overcoming Stage Fright' },
        ],
      },
      {
        name: 'Writing',
        icon: '✍️',
        children: [
          {
            name: 'Business Writing',
            children: [
              { name: 'Email Etiquette' },
              { name: 'Reports & Memos' },
              { name: 'Proposals' },
              { name: 'Executive Summaries' },
            ],
          },
          {
            name: 'Clarity & Style',
            children: [
              { name: 'Conciseness' },
              { name: 'Active Voice' },
              { name: 'Audience Awareness' },
              { name: 'Editing & Proofreading' },
            ],
          },
          {
            name: 'Technical Writing',
            children: [
              { name: 'Documentation' },
              { name: 'API References' },
              { name: 'How-to Guides' },
            ],
          },
        ],
      },
      {
        name: 'Active Listening',
        icon: '👂',
        children: [
          {
            name: 'Listening Techniques',
            children: [
              { name: 'Paraphrasing' },
              { name: 'Reflective Listening' },
              { name: 'Asking Clarifying Questions' },
            ],
          },
          {
            name: 'Barriers to Listening',
            children: [
              { name: 'Distractions' },
              { name: 'Prejudging' },
              { name: 'Formulating Response Too Early' },
            ],
          },
          { name: 'Empathetic Listening' },
        ],
      },
      {
        name: 'Negotiation',
        icon: '🤝',
        children: [
          {
            name: 'Preparation',
            children: [
              { name: 'BATNA Analysis' },
              { name: 'Research & Leverage' },
              { name: 'Goal Setting' },
            ],
          },
          {
            name: 'Tactics',
            children: [
              { name: 'Anchoring' },
              { name: 'Mirroring' },
              { name: 'Silence as a Tool' },
              { name: 'Splitting the Difference' },
            ],
          },
          {
            name: 'Salary Negotiation',
            children: [
              { name: 'Market Research' },
              { name: 'Counter-Offer Strategy' },
              { name: 'Total Compensation' },
            ],
          },
        ],
      },
      {
        name: 'Body Language',
        icon: '🕺',
        children: [
          {
            name: 'Reading Body Language',
            children: [
              { name: 'Facial Expressions' },
              { name: 'Posture Cues' },
              { name: 'Hand Gestures' },
              { name: 'Micro-Expressions' },
            ],
          },
          {
            name: 'Projecting Confidence',
            children: [
              { name: 'Open Posture' },
              { name: 'Power Poses' },
              { name: 'Firm Handshake' },
            ],
          },
          { name: 'Cultural Differences' },
        ],
      },
    ],
  },
  {
    name: 'Career & Work',
    icon: '💼',
    skills: [
      {
        name: 'Resume & Interview',
        icon: '📄',
        children: [
          {
            name: 'Resume Building',
            children: [
              { name: 'Action Verbs & Metrics' },
              { name: 'Tailoring per Role' },
              { name: 'ATS Optimization' },
              { name: 'Portfolio & GitHub' },
            ],
          },
          {
            name: 'Interview Skills',
            children: [
              { name: 'STAR Method' },
              { name: 'Behavioral Questions' },
              { name: 'Technical Interviews' },
              { name: 'Whiteboard Coding' },
            ],
          },
          {
            name: 'Job Search Strategy',
            children: [
              { name: 'Target Companies' },
              { name: 'Networking for Referrals' },
              { name: 'Recruiter Relations' },
            ],
          },
        ],
      },
      {
        name: 'Project Management',
        icon: '📊',
        children: [
          {
            name: 'Methodologies',
            children: [
              { name: 'Agile / Scrum' },
              { name: 'Kanban' },
              { name: 'Waterfall' },
              { name: 'Lean' },
            ],
          },
          {
            name: 'Tools',
            children: [
              { name: 'Jira' },
              { name: 'Trello / Asana' },
              { name: 'Gantt Charts' },
              { name: 'Confluence / Notion' },
            ],
          },
          {
            name: 'Execution',
            children: [
              { name: 'Sprint Planning' },
              { name: 'Retrospectives' },
              { name: 'Stakeholder Updates' },
              { name: 'Risk Management' },
            ],
          },
        ],
      },
      {
        name: 'Leadership',
        icon: '👑',
        children: [
          {
            name: 'People Management',
            children: [
              { name: '1-on-1 Meetings' },
              { name: 'Feedback & Coaching' },
              { name: 'Hiring & Onboarding' },
              { name: 'Performance Reviews' },
            ],
          },
          {
            name: 'Leadership Styles',
            children: [
              { name: 'Servant Leadership' },
              { name: 'Transformational' },
              { name: 'Situational Leadership' },
            ],
          },
          {
            name: 'Strategic Thinking',
            children: [
              { name: 'Vision Setting' },
              { name: 'OKRs & KPIs' },
              { name: 'Decision Frameworks' },
            ],
          },
        ],
      },
      {
        name: 'Time Management',
        icon: '⏰',
        children: [
          {
            name: 'Prioritization',
            children: [
              { name: 'Eisenhower Matrix' },
              { name: 'MoSCoW Method' },
              { name: 'Eat the Frog' },
            ],
          },
          {
            name: 'Productivity Systems',
            children: [
              { name: 'Pomodoro Technique' },
              { name: 'Time Blocking' },
              { name: 'GTD (Getting Things Done)' },
              { name: 'Deep Work' },
            ],
          },
          {
            name: 'Calendar Management',
            children: [
              { name: 'Meeting Hygiene' },
              { name: 'Buffer Time' },
              { name: 'Weekly Planning' },
            ],
          },
        ],
      },
      {
        name: 'Remote Work',
        icon: '🏠',
        children: [
          {
            name: 'Home Office Setup',
            children: [
              { name: 'Ergonomic Desk & Chair' },
              { name: 'Monitor & Lighting' },
              { name: 'Audio/Video Equipment' },
            ],
          },
          {
            name: 'Remote Communication',
            children: [
              { name: 'Async Communication' },
              { name: 'Video Call Presence' },
              { name: 'Written Updates' },
            ],
          },
          {
            name: 'Work-Life Balance',
            children: [
              { name: 'Dedicated Workspace' },
              { name: 'Shutdown Ritual' },
              { name: 'Social Connection' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Technical / Engineering',
    icon: '💻',
    skills: [
      {
        name: 'Programming',
        icon: '⌨️',
        children: [
          {
            name: 'Languages',
            children: [
              { name: 'JavaScript / TypeScript', children: [{ name: 'ES6+ Features' }, { name: 'Node.js' }, { name: 'React' }, { name: 'Next.js' }] },
              { name: 'Python', children: [{ name: 'Core Python' }, { name: 'FastAPI / Flask' }, { name: 'Data Science Stack' }] },
              { name: 'Go' },
              { name: 'Rust' },
              { name: 'SQL' },
            ],
          },
          {
            name: 'Fundamentals',
            children: [
              { name: 'Data Structures', children: [{ name: 'Arrays & Lists' }, { name: 'Trees & Graphs' }, { name: 'Hash Maps' }, { name: 'Stacks & Queues' }] },
              { name: 'Algorithms', children: [{ name: 'Sorting' }, { name: 'Searching' }, { name: 'Dynamic Programming' }, { name: 'Recursion' }] },
              { name: 'Big-O Analysis' },
            ],
          },
          {
            name: 'Software Engineering',
            children: [
              { name: 'Version Control (Git)', children: [{ name: 'Branching Strategies' }, { name: 'Pull Requests' }, { name: 'Rebasing vs Merging' }] },
              { name: 'Testing', children: [{ name: 'Unit Tests' }, { name: 'Integration Tests' }, { name: 'E2E Tests' }, { name: 'TDD' }] },
              { name: 'Code Review' },
              { name: 'Design Patterns' },
            ],
          },
        ],
      },
      {
        name: 'Cloud & DevOps',
        icon: '☁️',
        children: [
          {
            name: 'Cloud Providers',
            children: [
              { name: 'AWS', children: [{ name: 'EC2 & Lambda' }, { name: 'S3' }, { name: 'RDS & DynamoDB' }, { name: 'IAM' }, { name: 'CloudFormation' }] },
              { name: 'Azure', children: [{ name: 'App Service' }, { name: 'Functions' }, { name: 'Blob Storage' }] },
              { name: 'GCP', children: [{ name: 'Cloud Run' }, { name: 'BigQuery' }, { name: 'GKE' }] },
            ],
          },
          {
            name: 'Infrastructure as Code',
            children: [
              { name: 'Terraform', children: [{ name: 'HCL Syntax' }, { name: 'State Management' }, { name: 'Modules' }] },
              { name: 'Pulumi' },
              { name: 'AWS CDK' },
            ],
          },
          {
            name: 'CI/CD',
            children: [
              { name: 'GitHub Actions' },
              { name: 'Jenkins' },
              { name: 'GitLab CI' },
              { name: 'ArgoCD' },
            ],
          },
          {
            name: 'Containers & Orchestration',
            children: [
              { name: 'Docker', children: [{ name: 'Dockerfile' }, { name: 'Docker Compose' }, { name: 'Multi-stage Builds' }] },
              { name: 'Kubernetes', children: [{ name: 'Pods & Deployments' }, { name: 'Services & Ingress' }, { name: 'Helm Charts' }, { name: 'Namespaces' }] },
            ],
          },
        ],
      },
      {
        name: 'Databases',
        icon: '🗄️',
        children: [
          {
            name: 'Relational',
            children: [
              { name: 'PostgreSQL', children: [{ name: 'Schema Design' }, { name: 'Indexing' }, { name: 'Query Optimization' }] },
              { name: 'MySQL' },
              { name: 'SQL Fundamentals', children: [{ name: 'Joins' }, { name: 'Aggregations' }, { name: 'Subqueries' }, { name: 'CTEs' }] },
            ],
          },
          {
            name: 'NoSQL',
            children: [
              { name: 'MongoDB' },
              { name: 'Redis', children: [{ name: 'Caching Patterns' }, { name: 'Pub/Sub' }, { name: 'Data Structures' }] },
              { name: 'DynamoDB' },
            ],
          },
          {
            name: 'Data Modeling',
            children: [
              { name: 'Normalization' },
              { name: 'Denormalization' },
              { name: 'ER Diagrams' },
              { name: 'Migration Strategies' },
            ],
          },
        ],
      },
      {
        name: 'Networking',
        icon: '🌐',
        children: [
          {
            name: 'Fundamentals',
            children: [
              { name: 'TCP/IP Model' },
              { name: 'DNS' },
              { name: 'HTTP/HTTPS' },
              { name: 'Load Balancing' },
            ],
          },
          {
            name: 'APIs',
            children: [
              { name: 'REST', children: [{ name: 'Status Codes' }, { name: 'CRUD Operations' }, { name: 'Authentication' }] },
              { name: 'GraphQL' },
              { name: 'gRPC' },
              { name: 'WebSockets' },
            ],
          },
          {
            name: 'CDN & Edge',
            children: [
              { name: 'CloudFront' },
              { name: 'Cloudflare' },
              { name: 'Edge Functions' },
            ],
          },
        ],
      },
      {
        name: 'Security',
        icon: '🔒',
        children: [
          {
            name: 'Application Security',
            children: [
              { name: 'OWASP Top 10' },
              { name: 'Input Validation' },
              { name: 'SQL Injection Prevention' },
              { name: 'XSS Prevention' },
            ],
          },
          {
            name: 'Authentication & Authorization',
            children: [
              { name: 'OAuth 2.0 / OIDC' },
              { name: 'JWT' },
              { name: 'RBAC / ABAC' },
              { name: 'MFA' },
            ],
          },
          {
            name: 'Infrastructure Security',
            children: [
              { name: 'Firewalls & VPCs' },
              { name: 'Secret Management' },
              { name: 'SSL/TLS' },
              { name: 'Penetration Testing' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Finance & Trading',
    icon: '📈',
    skills: [
      {
        name: 'Budgeting',
        icon: '💰',
        children: [
          {
            name: 'Budgeting Methods',
            children: [
              { name: '50/30/20 Rule' },
              { name: 'Zero-Based Budgeting' },
              { name: 'Envelope System' },
              { name: 'Pay Yourself First' },
            ],
          },
          {
            name: 'Expense Tracking',
            children: [
              { name: 'Categorization' },
              { name: 'Subscription Audits' },
              { name: 'Tools (YNAB, Mint)' },
            ],
          },
          {
            name: 'Emergency Fund',
            children: [
              { name: '3-Month Fund' },
              { name: '6-Month Fund' },
              { name: 'High-Yield Savings' },
            ],
          },
        ],
      },
      {
        name: 'Investing',
        icon: '📊',
        children: [
          {
            name: 'Index Investing',
            children: [
              { name: 'S&P 500' },
              { name: 'Total Market Funds' },
              { name: 'International Diversification' },
              { name: 'Bond Allocation' },
            ],
          },
          {
            name: 'Stock Analysis',
            children: [
              { name: 'Fundamental Analysis', children: [{ name: 'P/E Ratio' }, { name: 'Revenue Growth' }, { name: 'Balance Sheets' }] },
              { name: 'Reading Financial Statements' },
              { name: 'Valuation Models' },
            ],
          },
          {
            name: 'Retirement Accounts',
            children: [
              { name: '401(k)' },
              { name: 'Roth IRA' },
              { name: 'Traditional IRA' },
              { name: 'HSA Investing' },
            ],
          },
          {
            name: 'Portfolio Management',
            children: [
              { name: 'Asset Allocation' },
              { name: 'Rebalancing' },
              { name: 'Dollar-Cost Averaging' },
              { name: 'Risk Tolerance Assessment' },
            ],
          },
        ],
      },
      {
        name: 'Trading',
        icon: '📉',
        children: [
          {
            name: 'Technical Analysis',
            children: [
              { name: 'Candlestick Patterns' },
              { name: 'Support & Resistance' },
              { name: 'Moving Averages' },
              { name: 'RSI & MACD' },
            ],
          },
          {
            name: 'Trading Strategies',
            children: [
              { name: 'Day Trading' },
              { name: 'Swing Trading' },
              { name: 'Position Trading' },
              { name: 'Scalping' },
            ],
          },
          {
            name: 'Risk Management',
            children: [
              { name: 'Position Sizing' },
              { name: 'Stop Losses' },
              { name: 'Risk/Reward Ratio' },
              { name: 'Journal & Review' },
            ],
          },
        ],
      },
      {
        name: 'Tax Planning',
        icon: '🧾',
        children: [
          {
            name: 'Tax Basics',
            children: [
              { name: 'Tax Brackets' },
              { name: 'Standard vs Itemized Deductions' },
              { name: 'Filing Status' },
            ],
          },
          {
            name: 'Tax Optimization',
            children: [
              { name: 'Tax-Loss Harvesting' },
              { name: 'Capital Gains Strategy' },
              { name: 'Charitable Giving' },
              { name: 'Tax-Advantaged Accounts' },
            ],
          },
          { name: 'Self-Employment Taxes' },
        ],
      },
      {
        name: 'Real Estate',
        icon: '🏘️',
        children: [
          {
            name: 'Home Buying',
            children: [
              { name: 'Mortgage Types' },
              { name: 'Down Payment Strategy' },
              { name: 'Home Inspection' },
              { name: 'Closing Process' },
            ],
          },
          {
            name: 'Real Estate Investing',
            children: [
              { name: 'Rental Properties' },
              { name: 'REITs' },
              { name: 'House Hacking' },
              { name: 'Cash Flow Analysis' },
            ],
          },
        ],
      },
      {
        name: 'Crypto',
        icon: '🪙',
        children: [
          {
            name: 'Blockchain Basics',
            children: [
              { name: 'How Blockchain Works' },
              { name: 'Consensus Mechanisms' },
              { name: 'Smart Contracts' },
            ],
          },
          {
            name: 'Crypto Investing',
            children: [
              { name: 'Bitcoin' },
              { name: 'Ethereum' },
              { name: 'DeFi Protocols' },
              { name: 'Stablecoins' },
            ],
          },
          {
            name: 'Security & Storage',
            children: [
              { name: 'Hardware Wallets' },
              { name: 'Seed Phrase Management' },
              { name: 'Exchange Safety' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Learning & Knowledge',
    icon: '📚',
    skills: [
      {
        name: 'Speed Reading',
        icon: '⚡',
        children: [
          {
            name: 'Techniques',
            children: [
              { name: 'Chunking' },
              { name: 'Reducing Subvocalization' },
              { name: 'Meta Guiding' },
              { name: 'Skimming & Scanning' },
            ],
          },
          {
            name: 'Comprehension',
            children: [
              { name: 'Speed vs Understanding Balance' },
              { name: 'Pre-Reading Strategies' },
              { name: 'Post-Reading Review' },
            ],
          },
        ],
      },
      {
        name: 'Note-Taking',
        icon: '📝',
        children: [
          {
            name: 'Methods',
            children: [
              { name: 'Cornell Method' },
              { name: 'Zettelkasten' },
              { name: 'Mind Mapping' },
              { name: 'Outline Method' },
            ],
          },
          {
            name: 'Digital Tools',
            children: [
              { name: 'Obsidian' },
              { name: 'Notion' },
              { name: 'Roam Research' },
              { name: 'Logseq' },
            ],
          },
          {
            name: 'Knowledge Management',
            children: [
              { name: 'Tagging & Linking' },
              { name: 'Progressive Summarization' },
              { name: 'Building a Second Brain' },
            ],
          },
        ],
      },
      {
        name: 'Memory Techniques',
        icon: '🧩',
        children: [
          {
            name: 'Mnemonics',
            children: [
              { name: 'Memory Palace' },
              { name: 'Peg System' },
              { name: 'Acronyms & Acrostics' },
            ],
          },
          {
            name: 'Spaced Repetition',
            children: [
              { name: 'Anki' },
              { name: 'Leitner System' },
              { name: 'Optimal Intervals' },
            ],
          },
          {
            name: 'Active Recall',
            children: [
              { name: 'Self-Testing' },
              { name: 'Feynman Technique' },
              { name: 'Elaborative Interrogation' },
            ],
          },
        ],
      },
      {
        name: 'Research Skills',
        icon: '🔍',
        children: [
          {
            name: 'Source Evaluation',
            children: [
              { name: 'Primary vs Secondary Sources' },
              { name: 'Peer Review' },
              { name: 'Bias Detection' },
            ],
          },
          {
            name: 'Search Strategies',
            children: [
              { name: 'Boolean Search' },
              { name: 'Academic Databases' },
              { name: 'Citation Chaining' },
            ],
          },
          {
            name: 'Synthesis',
            children: [
              { name: 'Literature Reviews' },
              { name: 'Cross-Referencing' },
              { name: 'Drawing Conclusions' },
            ],
          },
        ],
      },
      {
        name: 'Critical Thinking',
        icon: '🎯',
        children: [
          {
            name: 'Logical Reasoning',
            children: [
              { name: 'Deductive Reasoning' },
              { name: 'Inductive Reasoning' },
              { name: 'Abductive Reasoning' },
            ],
          },
          {
            name: 'Cognitive Biases',
            children: [
              { name: 'Confirmation Bias' },
              { name: 'Anchoring Bias' },
              { name: 'Survivorship Bias' },
              { name: 'Dunning-Kruger Effect' },
            ],
          },
          {
            name: 'Argumentation',
            children: [
              { name: 'Identifying Fallacies' },
              { name: 'Steel-Manning' },
              { name: 'Evidence-Based Reasoning' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Creative & Artistic',
    icon: '🎨',
    skills: [
      {
        name: 'Drawing',
        icon: '✏️',
        children: [
          {
            name: 'Fundamentals',
            children: [
              { name: 'Line Work' },
              { name: 'Shapes & Forms' },
              { name: 'Shading & Value' },
              { name: 'Perspective', children: [{ name: '1-Point Perspective' }, { name: '2-Point Perspective' }, { name: '3-Point Perspective' }] },
            ],
          },
          {
            name: 'Figure Drawing',
            children: [
              { name: 'Gesture Drawing' },
              { name: 'Proportions' },
              { name: 'Anatomy Basics' },
              { name: 'Faces & Expressions' },
            ],
          },
          {
            name: 'Mediums',
            children: [
              { name: 'Pencil / Graphite' },
              { name: 'Ink' },
              { name: 'Charcoal' },
              { name: 'Digital Drawing' },
            ],
          },
        ],
      },
      {
        name: 'Music',
        icon: '🎵',
        children: [
          {
            name: 'Music Theory',
            children: [
              { name: 'Scales & Modes' },
              { name: 'Chords & Harmony' },
              { name: 'Rhythm & Time Signatures' },
              { name: 'Song Structure' },
            ],
          },
          {
            name: 'Instruments',
            children: [
              { name: 'Guitar', children: [{ name: 'Open Chords' }, { name: 'Barre Chords' }, { name: 'Fingerpicking' }, { name: 'Soloing' }] },
              { name: 'Piano / Keyboard', children: [{ name: 'Scales' }, { name: 'Chord Voicings' }, { name: 'Sight Reading' }] },
              { name: 'Drums' },
              { name: 'Vocals', children: [{ name: 'Pitch Control' }, { name: 'Breathing' }, { name: 'Range Extension' }] },
            ],
          },
          {
            name: 'Production',
            children: [
              { name: 'DAW Basics (Ableton/Logic)' },
              { name: 'Mixing' },
              { name: 'Mastering' },
              { name: 'Sound Design' },
            ],
          },
        ],
      },
      {
        name: 'Photography',
        icon: '📷',
        children: [
          {
            name: 'Camera Skills',
            children: [
              { name: 'Exposure Triangle', children: [{ name: 'Aperture' }, { name: 'Shutter Speed' }, { name: 'ISO' }] },
              { name: 'Manual Mode' },
              { name: 'Focus Techniques' },
            ],
          },
          {
            name: 'Composition',
            children: [
              { name: 'Rule of Thirds' },
              { name: 'Leading Lines' },
              { name: 'Framing' },
              { name: 'Golden Ratio' },
            ],
          },
          {
            name: 'Post-Processing',
            children: [
              { name: 'Lightroom Basics' },
              { name: 'Color Grading' },
              { name: 'Retouching' },
            ],
          },
          {
            name: 'Genres',
            children: [
              { name: 'Portrait' },
              { name: 'Landscape' },
              { name: 'Street Photography' },
              { name: 'Product Photography' },
            ],
          },
        ],
      },
      {
        name: 'Creative Writing',
        icon: '🖊️',
        children: [
          {
            name: 'Fiction',
            children: [
              { name: 'Plot Structure' },
              { name: 'Character Development' },
              { name: 'Dialogue' },
              { name: 'World Building' },
            ],
          },
          {
            name: 'Poetry',
            children: [
              { name: 'Free Verse' },
              { name: 'Sonnets' },
              { name: 'Haiku' },
              { name: 'Imagery & Metaphor' },
            ],
          },
          {
            name: 'Non-Fiction',
            children: [
              { name: 'Personal Essays' },
              { name: 'Memoir' },
              { name: 'Blogging' },
            ],
          },
        ],
      },
      {
        name: 'Design',
        icon: '🎨',
        children: [
          {
            name: 'Graphic Design',
            children: [
              { name: 'Typography' },
              { name: 'Color Theory' },
              { name: 'Layout & Grid' },
              { name: 'Brand Identity' },
            ],
          },
          {
            name: 'UI/UX Design',
            children: [
              { name: 'Wireframing' },
              { name: 'Prototyping' },
              { name: 'User Research' },
              { name: 'Design Systems' },
            ],
          },
          {
            name: 'Tools',
            children: [
              { name: 'Figma' },
              { name: 'Adobe Photoshop' },
              { name: 'Adobe Illustrator' },
              { name: 'Canva' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Home & Practical',
    icon: '🏠',
    skills: [
      {
        name: 'Cleaning',
        icon: '🧹',
        children: [
          {
            name: 'Routine Cleaning',
            children: [
              { name: 'Daily Tidying' },
              { name: 'Weekly Deep Clean' },
              { name: 'Monthly Tasks' },
            ],
          },
          {
            name: 'Room-by-Room',
            children: [
              { name: 'Kitchen Cleaning' },
              { name: 'Bathroom Cleaning' },
              { name: 'Bedroom Maintenance' },
              { name: 'Laundry Mastery', children: [{ name: 'Sorting' }, { name: 'Stain Removal' }, { name: 'Folding & Ironing' }] },
            ],
          },
          {
            name: 'Products & Methods',
            children: [
              { name: 'Natural Cleaners' },
              { name: 'Disinfection' },
              { name: 'Decluttering' },
            ],
          },
        ],
      },
      {
        name: 'DIY Repairs',
        icon: '🔧',
        children: [
          {
            name: 'Plumbing',
            children: [
              { name: 'Fixing Leaky Faucets' },
              { name: 'Unclogging Drains' },
              { name: 'Toilet Repairs' },
              { name: 'Replacing Fixtures' },
            ],
          },
          {
            name: 'Electrical',
            children: [
              { name: 'Replacing Outlets' },
              { name: 'Light Fixture Installation' },
              { name: 'Circuit Breaker Basics' },
            ],
          },
          {
            name: 'Carpentry',
            children: [
              { name: 'Shelving' },
              { name: 'Patching Drywall' },
              { name: 'Painting', children: [{ name: 'Prep Work' }, { name: 'Brush vs Roller' }, { name: 'Trim & Edges' }] },
              { name: 'Furniture Assembly' },
            ],
          },
        ],
      },
      {
        name: 'Organization',
        icon: '📦',
        children: [
          {
            name: 'Decluttering Methods',
            children: [
              { name: 'KonMari Method' },
              { name: 'One-In-One-Out Rule' },
              { name: 'Seasonal Purge' },
            ],
          },
          {
            name: 'Storage Solutions',
            children: [
              { name: 'Closet Systems' },
              { name: 'Kitchen Organization' },
              { name: 'Garage & Workshop' },
              { name: 'Digital File Organization' },
            ],
          },
          { name: 'Labeling Systems' },
        ],
      },
      {
        name: 'Gardening',
        icon: '🌱',
        children: [
          {
            name: 'Indoor Gardening',
            children: [
              { name: 'Houseplant Care' },
              { name: 'Herbs on Windowsill' },
              { name: 'Propagation' },
            ],
          },
          {
            name: 'Outdoor Gardening',
            children: [
              { name: 'Soil Preparation' },
              { name: 'Vegetable Garden', children: [{ name: 'Tomatoes' }, { name: 'Leafy Greens' }, { name: 'Root Vegetables' }] },
              { name: 'Flower Beds' },
              { name: 'Composting' },
            ],
          },
          {
            name: 'Lawn Care',
            children: [
              { name: 'Mowing Technique' },
              { name: 'Fertilizing' },
              { name: 'Weed Control' },
            ],
          },
        ],
      },
      {
        name: 'Appliance Maintenance',
        icon: '🔌',
        children: [
          {
            name: 'Kitchen Appliances',
            children: [
              { name: 'Refrigerator Maintenance' },
              { name: 'Oven Cleaning' },
              { name: 'Dishwasher Care' },
            ],
          },
          {
            name: 'HVAC',
            children: [
              { name: 'Filter Replacement' },
              { name: 'Thermostat Programming' },
              { name: 'Seasonal Maintenance' },
            ],
          },
          {
            name: 'Washer & Dryer',
            children: [
              { name: 'Lint Trap Cleaning' },
              { name: 'Drum Cleaning' },
              { name: 'Hose Inspection' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Outdoors & Adventure',
    icon: '⛰️',
    skills: [
      {
        name: 'Hiking',
        icon: '🥾',
        children: [
          {
            name: 'Preparation',
            children: [
              { name: 'Trail Research' },
              { name: 'Gear Selection' },
              { name: 'Leave No Trace Principles' },
            ],
          },
          {
            name: 'Skills on Trail',
            children: [
              { name: 'Pacing & Energy Management' },
              { name: 'Water Crossings' },
              { name: 'Altitude Acclimatization' },
            ],
          },
          {
            name: 'Difficulty Levels',
            children: [
              { name: 'Day Hikes' },
              { name: 'Multi-Day Backpacking' },
              { name: 'Thru-Hiking' },
            ],
          },
        ],
      },
      {
        name: 'Camping',
        icon: '⛺',
        children: [
          {
            name: 'Shelter',
            children: [
              { name: 'Tent Setup' },
              { name: 'Hammock Camping' },
              { name: 'Tarp & Bivy' },
            ],
          },
          {
            name: 'Camp Cooking',
            children: [
              { name: 'Campfire Cooking' },
              { name: 'Camp Stove' },
              { name: 'Meal Planning (Backpacking)' },
              { name: 'Water Purification' },
            ],
          },
          {
            name: 'Fire Skills',
            children: [
              { name: 'Fire Starting' },
              { name: 'Fire Safety' },
              { name: 'Firewood Selection' },
            ],
          },
          {
            name: 'Survival Basics',
            children: [
              { name: 'Emergency Shelter' },
              { name: 'Signaling for Help' },
              { name: 'Basic Foraging' },
            ],
          },
        ],
      },
      {
        name: 'Rock Climbing',
        icon: '🧗',
        children: [
          {
            name: 'Climbing Types',
            children: [
              { name: 'Bouldering' },
              { name: 'Top Rope' },
              { name: 'Lead Climbing' },
              { name: 'Trad Climbing' },
            ],
          },
          {
            name: 'Technique',
            children: [
              { name: 'Footwork' },
              { name: 'Hand Holds' },
              { name: 'Body Positioning' },
              { name: 'Route Reading' },
            ],
          },
          {
            name: 'Safety',
            children: [
              { name: 'Belaying' },
              { name: 'Knots', children: [{ name: 'Figure Eight' }, { name: 'Clove Hitch' }, { name: 'Prusik' }] },
              { name: 'Gear Inspection' },
              { name: 'Fall Practice' },
            ],
          },
        ],
      },
      {
        name: 'Water Sports',
        icon: '🚣',
        children: [
          {
            name: 'Kayaking',
            children: [
              { name: 'Paddle Strokes' },
              { name: 'Wet Exit & Roll' },
              { name: 'River Reading' },
            ],
          },
          {
            name: 'Surfing',
            children: [
              { name: 'Paddling Out' },
              { name: 'Pop-Up' },
              { name: 'Wave Selection' },
              { name: 'Turning & Carving' },
            ],
          },
          {
            name: 'Swimming',
            children: [
              { name: 'Freestyle' },
              { name: 'Backstroke' },
              { name: 'Open Water Swimming' },
            ],
          },
          { name: 'Stand-Up Paddleboarding' },
        ],
      },
      {
        name: 'Navigation',
        icon: '🧭',
        children: [
          {
            name: 'Map Reading',
            children: [
              { name: 'Topographic Maps' },
              { name: 'Contour Lines' },
              { name: 'Scale & Distance' },
            ],
          },
          {
            name: 'Compass Use',
            children: [
              { name: 'Taking a Bearing' },
              { name: 'Declination' },
              { name: 'Triangulation' },
            ],
          },
          {
            name: 'GPS & Digital',
            children: [
              { name: 'GPS Device Operation' },
              { name: 'Trail Apps (AllTrails)' },
              { name: 'Waypoint Navigation' },
            ],
          },
          {
            name: 'Natural Navigation',
            children: [
              { name: 'Sun Position' },
              { name: 'Star Navigation' },
              { name: 'Terrain Association' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Hobbies & Play',
    icon: '🎮',
    skills: [
      {
        name: 'Gaming',
        icon: '🕹️',
        children: [
          {
            name: 'Genres',
            children: [
              { name: 'FPS', children: [{ name: 'Aim Training' }, { name: 'Map Knowledge' }, { name: 'Team Communication' }] },
              { name: 'Strategy / RTS' },
              { name: 'RPGs' },
              { name: 'Fighting Games', children: [{ name: 'Combos' }, { name: 'Frame Data' }, { name: 'Neutral Game' }] },
            ],
          },
          {
            name: 'Competitive Skills',
            children: [
              { name: 'Game Sense' },
              { name: 'Reaction Time' },
              { name: 'VOD Review' },
              { name: 'Mental Game' },
            ],
          },
          {
            name: 'Platform Knowledge',
            children: [
              { name: 'PC Gaming', children: [{ name: 'Hardware Basics' }, { name: 'Settings Optimization' }, { name: 'Peripherals' }] },
              { name: 'Console' },
              { name: 'Streaming Setup' },
            ],
          },
        ],
      },
      {
        name: 'Board Games',
        icon: '🎲',
        children: [
          {
            name: 'Strategy Games',
            children: [
              { name: 'Chess', children: [{ name: 'Openings' }, { name: 'Tactics' }, { name: 'Endgames' }, { name: 'Positional Play' }] },
              { name: 'Go' },
              { name: 'Euro Games (Catan, Ticket to Ride)' },
            ],
          },
          {
            name: 'Card Games',
            children: [
              { name: 'Poker', children: [{ name: 'Hand Rankings' }, { name: 'Pot Odds' }, { name: 'Bluffing' }, { name: 'Position Play' }] },
              { name: 'Bridge' },
              { name: 'Trading Card Games' },
            ],
          },
          {
            name: 'Social & Party Games',
            children: [
              { name: 'Werewolf / Mafia' },
              { name: 'Codenames' },
              { name: 'Trivia Games' },
            ],
          },
        ],
      },
      {
        name: 'Puzzles',
        icon: '🧩',
        children: [
          {
            name: 'Logic Puzzles',
            children: [
              { name: 'Sudoku' },
              { name: 'Crosswords' },
              { name: 'KenKen' },
              { name: 'Nonograms' },
            ],
          },
          {
            name: 'Physical Puzzles',
            children: [
              { name: 'Rubik\'s Cube', children: [{ name: 'Beginner Method' }, { name: 'CFOP' }, { name: 'One-Handed' }] },
              { name: 'Jigsaw Puzzles' },
              { name: 'Mechanical Puzzles' },
            ],
          },
          {
            name: 'Escape Rooms',
            children: [
              { name: 'Pattern Recognition' },
              { name: 'Team Coordination' },
              { name: 'Time Management' },
            ],
          },
        ],
      },
      {
        name: 'Collecting',
        icon: '🗃️',
        children: [
          {
            name: 'Collection Management',
            children: [
              { name: 'Cataloging & Inventory' },
              { name: 'Condition Grading' },
              { name: 'Display & Storage' },
            ],
          },
          {
            name: 'Popular Collectibles',
            children: [
              { name: 'Trading Cards' },
              { name: 'Coins & Stamps' },
              { name: 'Vinyl Records' },
              { name: 'Sneakers' },
            ],
          },
          {
            name: 'Valuation',
            children: [
              { name: 'Market Research' },
              { name: 'Authentication' },
              { name: 'Buy/Sell/Trade' },
            ],
          },
        ],
      },
      {
        name: 'Model Building',
        icon: '🛩️',
        children: [
          {
            name: 'Scale Models',
            children: [
              { name: 'Plastic Kits' },
              { name: 'Die-Cast Models' },
              { name: 'Paper Models' },
            ],
          },
          {
            name: 'Techniques',
            children: [
              { name: 'Assembly & Gluing' },
              { name: 'Painting & Airbrushing', children: [{ name: 'Priming' }, { name: 'Base Coating' }, { name: 'Weathering' }, { name: 'Detail Painting' }] },
              { name: 'Decal Application' },
            ],
          },
          {
            name: 'RC Models',
            children: [
              { name: 'RC Cars' },
              { name: 'RC Planes' },
              { name: 'Drones', children: [{ name: 'FPV Flying' }, { name: 'Aerial Photography' }, { name: 'Racing' }] },
            ],
          },
        ],
      },
    ],
  },
];

// Flatten the library into a list with path breadcrumbs, used for search.
export type FlatLibraryItem = {
  path: string[]; // e.g. ['Physical Fitness', 'Running', 'Road Running', '5KM']
  name: string;
  icon?: string;
  isDomain: boolean;
  hasChildren: boolean;
};

export function flattenLibrary(): FlatLibraryItem[] {
  const out: FlatLibraryItem[] = [];
  for (const domain of skillLibrary) {
    out.push({
      path: [domain.name],
      name: domain.name,
      icon: domain.icon,
      isDomain: true,
      hasChildren: domain.skills.length > 0,
    });
    const walk = (skill: LibrarySkill, ancestors: string[], inheritedIcon?: string) => {
      const icon = skill.icon ?? inheritedIcon;
      const path = [...ancestors, skill.name];
      out.push({
        path,
        name: skill.name,
        icon,
        isDomain: false,
        hasChildren: !!skill.children?.length,
      });
      if (skill.children) for (const c of skill.children) walk(c, path, icon);
    };
    for (const s of domain.skills) walk(s, [domain.name], domain.icon);
  }
  return out;
}
