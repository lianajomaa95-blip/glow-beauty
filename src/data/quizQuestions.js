// src/data/quizQuestions.js
//
// Smart skin quiz with dermatologist-inspired questions.
// Each answer assigns weighted scores to skin types and concerns.

export const QUIZ_QUESTIONS = [
  {
    id: "q1_age",
    question: "What's your age range?",
    subtitle: "This helps us tailor anti-aging vs. preventive recommendations",
    type: "single",
    options: [
      { label: "Under 25", value: "under_25", scores: { concerns: { acne: 2, prevention: 3 } } },
      { label: "25–35", value: "25_35", scores: { concerns: { prevention: 3, hydration: 2 } } },
      { label: "35–45", value: "35_45", scores: { concerns: { aging: 3, hydration: 2, brightening: 2 } } },
      { label: "45+", value: "over_45", scores: { concerns: { aging: 4, brightening: 3, firmness: 3 } } },
    ],
  },
  {
    id: "q2_skin_feel",
    question: "How does your skin feel a few hours after washing it (without applying any products)?",
    subtitle: "This reveals your true skin type",
    type: "single",
    options: [
      {
        label: "Tight, dry, or flaky 🌵",
        value: "dry",
        scores: { skinType: { dry: 4, normal: 1 }, concerns: { hydration: 4 } },
      },
      {
        label: "Oily and shiny all over ✨",
        value: "oily",
        scores: { skinType: { oily: 4 }, concerns: { acne: 2, pores: 3 } },
      },
      {
        label: "Oily T-zone (forehead, nose, chin) but dry cheeks 🔄",
        value: "combination",
        scores: { skinType: { combination: 4 }, concerns: { pores: 2, hydration: 2 } },
      },
      {
        label: "Balanced — not too oily, not too dry 💧",
        value: "normal",
        scores: { skinType: { normal: 4 }, concerns: { prevention: 2 } },
      },
      {
        label: "Sensitive, red, or stinging 🌹",
        value: "sensitive",
        scores: { skinType: { sensitive: 4 }, concerns: { redness: 3, sensitivity: 4 } },
      },
    ],
  },
  {
    id: "q3_concerns",
    question: "What are your top skin concerns right now?",
    subtitle: "Select up to 3 — we'll prioritize products for these",
    type: "multi",
    maxSelect: 3,
    options: [
      { label: "Acne or breakouts 🔴", value: "acne", scores: { concerns: { acne: 5 } } },
      { label: "Dark spots or hyperpigmentation 🌑", value: "darkSpots", scores: { concerns: { brightening: 5 } } },
      { label: "Fine lines or wrinkles 〰️", value: "wrinkles", scores: { concerns: { aging: 5 } } },
      { label: "Dryness or dehydration 💦", value: "dryness", scores: { concerns: { hydration: 5 } } },
      { label: "Redness or sensitivity 🌹", value: "redness", scores: { concerns: { redness: 5, sensitivity: 3 } } },
      { label: "Large pores 🕳️", value: "pores", scores: { concerns: { pores: 5 } } },
      { label: "Dullness or uneven tone 🌫️", value: "dullness", scores: { concerns: { brightening: 4, hydration: 2 } } },
      { label: "Loss of firmness 📉", value: "firmness", scores: { concerns: { firmness: 5, aging: 3 } } },
    ],
  },
  {
    id: "q4_sun_exposure",
    question: "How often do you wear sunscreen?",
    subtitle: "Sun protection is the #1 anti-aging step",
    type: "single",
    options: [
      { label: "Every single day, rain or shine ☀️", value: "always", scores: { concerns: { prevention: 3 } } },
      { label: "Most days", value: "most_days", scores: { concerns: { brightening: 2, prevention: 2 } } },
      { label: "Only when I go to the beach", value: "rarely", scores: { concerns: { brightening: 4, aging: 3, prevention: 4 } } },
      { label: "Almost never", value: "never", scores: { concerns: { brightening: 5, aging: 4, prevention: 5 } } },
    ],
  },
  {
    id: "q5_current_routine",
    question: "What does your current skincare routine look like?",
    subtitle: "We'll build from where you are",
    type: "single",
    options: [
      { label: "I don't have one — I'm starting fresh 🌱", value: "none", scores: { routine: { beginner: 5 } } },
      { label: "Just the basics (cleanser + moisturizer) 💧", value: "basic", scores: { routine: { intermediate: 4 } } },
      { label: "A few products including a serum or treatment 🧪", value: "intermediate", scores: { routine: { intermediate: 5 } } },
      { label: "Full routine with multiple actives ⚗️", value: "advanced", scores: { routine: { advanced: 5 } } },
    ],
  },
  {
    id: "q6_lifestyle",
    question: "Which best describes your lifestyle?",
    subtitle: "Lifestyle affects your skin more than you'd think",
    type: "multi",
    maxSelect: 3,
    options: [
      { label: "I work long hours / stressed often 😰", value: "stressed", scores: { concerns: { hydration: 2, redness: 2 } } },
      { label: "I rarely sleep 8 hours 😴", value: "low_sleep", scores: { concerns: { brightening: 3, aging: 2 } } },
      { label: "I'm outdoors a lot ☀️", value: "outdoors", scores: { concerns: { prevention: 3, brightening: 2, aging: 2 } } },
      { label: "I wear makeup daily 💄", value: "makeup", scores: { concerns: { pores: 2, acne: 1 } } },
      { label: "I exercise regularly 🏃", value: "exercise", scores: { concerns: { hydration: 2 } } },
      { label: "I live in a polluted city 🌆", value: "polluted", scores: { concerns: { brightening: 2, prevention: 2 } } },
    ],
  },
  {
    id: "q7_goal",
    question: "If you had to pick ONE thing to improve about your skin, what would it be?",
    subtitle: "We'll make this the focus of your routine",
    type: "single",
    options: [
      { label: "Clearer, fewer breakouts 🎯", value: "clearer", scores: { concerns: { acne: 5 } } },
      { label: "Brighter, more even tone ✨", value: "brighter", scores: { concerns: { brightening: 5 } } },
      { label: "Plumper, more hydrated 💦", value: "hydrated", scores: { concerns: { hydration: 5 } } },
      { label: "Firmer, fewer lines 💪", value: "firmer", scores: { concerns: { aging: 4, firmness: 4 } } },
      { label: "Calmer, less reactive 🌸", value: "calmer", scores: { concerns: { redness: 5, sensitivity: 4 } } },
      { label: "Glowing, healthy-looking 💎", value: "glow", scores: { concerns: { hydration: 3, brightening: 3 } } },
    ],
  },
];

/* ============================================================
   🧮 SCORING ENGINE
   ============================================================ */

/**
 * Compute final scores from user answers.
 * Returns { skinType, topConcerns, routineLevel }
 */
export function computeScores(answers) {
  const scores = {
    skinType: { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 0 },
    concerns: {
      acne: 0,
      brightening: 0,
      aging: 0,
      hydration: 0,
      redness: 0,
      sensitivity: 0,
      pores: 0,
      firmness: 0,
      prevention: 0,
    },
    routine: { beginner: 0, intermediate: 0, advanced: 0 },
  };

  // Iterate through each answer
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    // Handle multi-select (answerValue is array) and single (string)
    const selectedValues = Array.isArray(answerValue) ? answerValue : [answerValue];

    selectedValues.forEach((val) => {
      const option = question.options.find((o) => o.value === val);
      if (!option || !option.scores) return;

      // Add scores from this option
      Object.entries(option.scores).forEach(([category, values]) => {
        Object.entries(values).forEach(([key, score]) => {
          if (scores[category] && scores[category][key] !== undefined) {
            scores[category][key] += score;
          }
        });
      });
    });
  });

  // Determine dominant skin type
  const skinTypeEntries = Object.entries(scores.skinType);
  skinTypeEntries.sort((a, b) => b[1] - a[1]);
  const primarySkinType = skinTypeEntries[0][0];

  // Check if also sensitive (sensitivity is special — can co-exist with other types)
  const isSensitive =
    scores.skinType.sensitive >= 3 || scores.concerns.sensitivity >= 3;

  // Format skin type label
  let skinTypeLabel = capitalize(primarySkinType);
  if (isSensitive && primarySkinType !== "sensitive") {
    skinTypeLabel = `${capitalize(primarySkinType)}, sensitive`;
  }

  // Get top 3 concerns (sorted by score)
  const topConcerns = Object.entries(scores.concerns)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([concern, _]) => concern);

  // Determine routine level
  const routineEntries = Object.entries(scores.routine);
  routineEntries.sort((a, b) => b[1] - a[1]);
  const routineLevel = routineEntries[0][0];

  return {
    skinType: skinTypeLabel,
    primarySkinType,
    isSensitive,
    topConcerns,
    routineLevel,
    rawScores: scores,
  };
}

/* ============================================================
   🛍️ PRODUCT TYPE MAPPING
   ============================================================ */

/**
 * Map skin profile to recommended product types for a routine.
 * Returns ordered array of product types to look for.
 */
export function getRecommendedProductTypes(profile) {
  const types = [];

  // Always include: Cleanser, Moisturizer, Sunscreen
  types.push("Cleanser");

  // Add concern-specific products
  profile.topConcerns.forEach((concern) => {
    switch (concern) {
      case "acne":
        types.push("Treatment");
        break;
      case "brightening":
      case "darkSpots":
      case "dullness":
        types.push("Serum");
        break;
      case "aging":
      case "wrinkles":
      case "firmness":
        types.push("Serum", "Eye Care");
        break;
      case "hydration":
      case "dryness":
        types.push("Serum");
        break;
      case "redness":
      case "sensitivity":
        types.push("Treatment");
        break;
      case "pores":
        types.push("Toner", "Treatment");
        break;
      default:
        break;
    }
  });

  // Always end with moisturizer + sunscreen
  types.push("Moisturizer");
  types.push("Sunscreen");

  // Dedupe while preserving order
  return [...new Set(types)];
}

/* ============================================================
   📝 ROUTINE GENERATOR
   ============================================================ */

export function generateRoutine(profile, products) {
  const morningSteps = [];
  const eveningSteps = [];

  // Find a cleanser
  const cleanser = products.find((p) => p.type === "Cleanser");
  if (cleanser) {
    morningSteps.push({ step: 1, name: "Gentle Cleanse", product: cleanser });
    eveningSteps.push({ step: 1, name: "Cleanse", product: cleanser });
  }

  // Find a toner (for oily/pores)
  if (profile.topConcerns.includes("pores") || profile.primarySkinType === "oily") {
    const toner = products.find((p) => p.type === "Toner");
    if (toner) {
      eveningSteps.push({ step: 2, name: "Tone", product: toner });
    }
  }

  // Find serums (morning vs evening)
  const serums = products.filter((p) => p.type === "Serum");
  if (serums.length > 0) {
    morningSteps.push({
      step: morningSteps.length + 1,
      name: "Treat (Serum)",
      product: serums[0],
    });
    if (serums.length > 1) {
      eveningSteps.push({
        step: eveningSteps.length + 1,
        name: "Treat (Serum)",
        product: serums[1] || serums[0],
      });
    } else {
      eveningSteps.push({
        step: eveningSteps.length + 1,
        name: "Treat (Serum)",
        product: serums[0],
      });
    }
  }

  // Treatment for evening
  const treatment = products.find((p) => p.type === "Treatment");
  if (treatment) {
    eveningSteps.push({
      step: eveningSteps.length + 1,
      name: "Targeted Treatment",
      product: treatment,
    });
  }

  // Eye cream
  const eye = products.find((p) => p.type === "Eye Care");
  if (eye) {
    morningSteps.push({
      step: morningSteps.length + 1,
      name: "Eye Care",
      product: eye,
    });
    eveningSteps.push({
      step: eveningSteps.length + 1,
      name: "Eye Care",
      product: eye,
    });
  }

  // Moisturizer
  const moisturizer = products.find((p) => p.type === "Moisturizer");
  if (moisturizer) {
    morningSteps.push({
      step: morningSteps.length + 1,
      name: "Moisturize",
      product: moisturizer,
    });
    eveningSteps.push({
      step: eveningSteps.length + 1,
      name: "Moisturize",
      product: moisturizer,
    });
  }

  // Sunscreen (morning only)
  const sunscreen = products.find((p) => p.type === "Sunscreen");
  if (sunscreen) {
    morningSteps.push({
      step: morningSteps.length + 1,
      name: "Sun Protection",
      product: sunscreen,
    });
  }

  return { morning: morningSteps, evening: eveningSteps };
}

/* ============================================================
   💬 PROFILE COPY (human-friendly text)
   ============================================================ */

export function getSkinTypeDescription(skinType) {
  const descriptions = {
    dry: "Your skin lacks natural oils and can feel tight or flaky. Focus on hydration and barrier repair.",
    oily: "Your skin produces excess oil throughout the day. Focus on gentle cleansing and lightweight hydration.",
    combination: "Your T-zone is oilier while cheeks are drier. Balance is your goal — gentle products that don't over-strip.",
    normal: "Lucky you! Balanced skin that's neither too dry nor too oily. Focus on prevention and maintaining your glow.",
    sensitive: "Your skin reacts easily to products and environment. Focus on gentle, fragrance-free formulas with calming ingredients.",
  };
  return descriptions[skinType] || "Your skin profile is unique — let's build a routine that works for you.";
}

export function getConcernDescription(concern) {
  const map = {
    acne: "Acne & Breakouts",
    brightening: "Brightening & Even Tone",
    aging: "Anti-Aging & Wrinkles",
    hydration: "Hydration & Plumpness",
    redness: "Redness & Calming",
    sensitivity: "Sensitivity Soothing",
    pores: "Pore Refinement",
    firmness: "Firmness & Elasticity",
    prevention: "Prevention & Protection",
  };
  return map[concern] || capitalize(concern);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}