// src/pages/SkinQuiz.js
//
// Beautiful chat-style skincare quiz with animated transitions,
// progress bar, branching logic, and smart scoring.
// Aura Store branded.

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  computeScores,
} from "../data/quizQuestions";
import SEO from "../components/SEO";
import { trackEvent } from "../utils/analytics";
import { theme } from "../theme";

export default function SkinQuiz({ setRecommended }) {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelectBuffer, setMultiSelectBuffer] = useState([]);
  const chatEndRef = useRef(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep, started]);

  const handleStart = () => {
    setStarted(true);
    trackEvent("quiz_start", { quiz_type: "skin_consultation" });
  };

  const handleSingleAnswer = (option) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: option.value,
    };
    setAnswers(newAnswers);

    trackEvent("quiz_answer", {
      question_id: currentQuestion.id,
      answer: option.value,
    });

    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 600);
  };

  const handleMultiToggle = (option) => {
    const exists = multiSelectBuffer.find((v) => v === option.value);
    if (exists) {
      setMultiSelectBuffer(multiSelectBuffer.filter((v) => v !== option.value));
    } else {
      if (multiSelectBuffer.length >= (currentQuestion.maxSelect || 3)) {
        return;
      }
      setMultiSelectBuffer([...multiSelectBuffer, option.value]);
    }
  };

  const handleMultiConfirm = () => {
    if (multiSelectBuffer.length === 0) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: multiSelectBuffer,
    };
    setAnswers(newAnswers);

    trackEvent("quiz_answer", {
      question_id: currentQuestion.id,
      answer: multiSelectBuffer.join(","),
    });

    setMultiSelectBuffer([]);

    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        finishQuiz(newAnswers);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setMultiSelectBuffer([]);
    }
  };

  const finishQuiz = (finalAnswers) => {
    const profile = computeScores(finalAnswers);

    try {
      localStorage.setItem(
        "skinProfile",
        JSON.stringify({
          profile,
          answers: finalAnswers,
          completedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      console.error("Failed to save skin profile:", e);
    }

    trackEvent("quiz_complete", {
      skin_type: profile.skinType,
      concerns: profile.topConcerns.join(","),
      routine_level: profile.routineLevel,
    });

    navigate("/quiz-results");
  };

  /* ============================================================
     RENDER: Welcome Screen
     ============================================================ */
  if (!started) {
    return (
      <>
        <SEO
          title="Skin Quiz"
          description="Take our personalized skin quiz to discover your perfect skincare routine at Aura Store."
        />
        <div style={page}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={welcomeCard}
          >
            <div style={welcomeIcon}>✨</div>
            <span style={eyebrow}>PERSONALIZED CONSULTATION</span>
            <h1 style={welcomeTitle}>
              Discover Your <span style={italic}>Perfect</span> Routine
            </h1>
            <p style={brandTag}>Powered by the Aura Store consultation</p>
            <p style={welcomeSubtitle}>
              Answer 7 quick questions and we'll create a personalized skincare
              plan tailored to your skin type, concerns, and lifestyle.
            </p>

            <div style={statsRow}>
              <div style={stat}>
                <div style={statNumber}>2</div>
                <div style={statLabel}>Minutes</div>
              </div>
              <div style={statDivider} />
              <div style={stat}>
                <div style={statNumber}>7</div>
                <div style={statLabel}>Questions</div>
              </div>
              <div style={statDivider} />
              <div style={stat}>
                <div style={statNumber}>100%</div>
                <div style={statLabel}>Personalized</div>
              </div>
            </div>

            <button onClick={handleStart} style={startBtn}>
              Start Your Consultation →
            </button>

            <p style={privacyNote}>
              🔒 Your answers are saved only on your device
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  /* ============================================================
     RENDER: Chat / Quiz Interface
     ============================================================ */
  return (
    <>
      <SEO
        title="Skin Quiz"
        description="Personalized skincare consultation at Aura Store"
      />
      <div style={page}>
        {/* PROGRESS BAR */}
        <div style={progressContainer}>
          <div style={progressInfo}>
            <span style={progressText}>
              Question {currentStep + 1} of {totalQuestions}
            </span>
            <span style={progressPercent}>{Math.round(progress)}%</span>
          </div>
          <div style={progressBar}>
            <motion.div
              style={progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* CHAT AREA */}
        <div style={chatContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={questionCard}
            >
              {/* AVATAR + LABEL */}
              <div style={aiHeader}>
                <div style={aiAvatar}>✨</div>
                <span style={aiLabel}>Aura Consultant</span>
              </div>

              {/* QUESTION */}
              <h2 style={questionText}>{currentQuestion.question}</h2>
              {currentQuestion.subtitle && (
                <p style={questionSubtitle}>{currentQuestion.subtitle}</p>
              )}

              {/* OPTIONS */}
              <div style={optionsContainer}>
                {currentQuestion.options.map((option, i) => {
                  const isSelected =
                    currentQuestion.type === "multi"
                      ? multiSelectBuffer.includes(option.value)
                      : answers[currentQuestion.id] === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      onClick={() =>
                        currentQuestion.type === "multi"
                          ? handleMultiToggle(option)
                          : handleSingleAnswer(option)
                      }
                      style={{
                        ...optionBtn,
                        ...(isSelected ? optionBtnSelected : {}),
                      }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <span style={optionLabel}>{option.label}</span>
                      {isSelected && currentQuestion.type === "multi" && (
                        <span style={checkmark}>✓</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* MULTI-SELECT CONFIRM BUTTON */}
              {currentQuestion.type === "multi" && (
                <div style={multiActions}>
                  <p style={multiHint}>
                    {multiSelectBuffer.length} of {currentQuestion.maxSelect}{" "}
                    selected
                  </p>
                  <button
                    onClick={handleMultiConfirm}
                    disabled={multiSelectBuffer.length === 0}
                    style={{
                      ...continueBtn,
                      opacity: multiSelectBuffer.length === 0 ? 0.4 : 1,
                      cursor:
                        multiSelectBuffer.length === 0
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* BACK BUTTON */}
              {currentStep > 0 && (
                <button onClick={handleBack} style={backBtn}>
                  ← Back
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          <div ref={chatEndRef} />
        </div>
      </div>
    </>
  );
}

/* ============================================================
   STYLES
   ============================================================ */

const page = {
  background: `linear-gradient(135deg, ${theme.colors.bg} 0%, #fde6e9 100%)`,
  minHeight: "100vh",
  padding: "40px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

/* WELCOME */
const welcomeCard = {
  maxWidth: 540,
  width: "100%",
  background: theme.colors.card,
  borderRadius: 28,
  padding: "50px 36px",
  textAlign: "center",
  boxShadow: "0 30px 80px rgba(125,42,60,0.12)",
  marginTop: 40,
};

const welcomeIcon = {
  fontSize: 50,
  marginBottom: 20,
};

const eyebrow = {
  display: "inline-block",
  fontSize: 11,
  letterSpacing: "0.3em",
  fontWeight: 600,
  color: theme.colors.primary,
  marginBottom: 14,
  textTransform: "uppercase",
};

const welcomeTitle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(28px, 4vw, 38px)",
  fontWeight: 700,
  color: theme.colors.dark,
  margin: "0 0 8px",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
};

const italic = { fontStyle: "italic", fontWeight: 400 };

const brandTag = {
  fontSize: 11,
  letterSpacing: "0.25em",
  color: theme.colors.primary,
  textTransform: "uppercase",
  fontWeight: 600,
  margin: "0 0 18px",
};

const welcomeSubtitle = {
  fontSize: 15,
  color: theme.colors.muted,
  lineHeight: 1.7,
  marginBottom: 32,
};

const statsRow = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
  marginBottom: 36,
  padding: "20px",
  background: theme.colors.bg,
  borderRadius: 16,
};

const stat = {
  textAlign: "center",
};

const statNumber = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 30,
  fontWeight: 700,
  color: theme.colors.dark,
};

const statLabel = {
  fontSize: 11,
  color: theme.colors.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginTop: 4,
};

const statDivider = {
  width: 1,
  height: 40,
  background: theme.colors.border,
};

const startBtn = {
  width: "100%",
  padding: "18px 32px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 14,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
  marginBottom: 16,
};

const privacyNote = {
  fontSize: 11,
  color: theme.colors.muted,
  margin: 0,
};

/* PROGRESS */
const progressContainer = {
  width: "100%",
  maxWidth: 640,
  marginBottom: 30,
};

const progressInfo = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 8,
  fontSize: 12,
  fontWeight: 600,
};

const progressText = {
  color: theme.colors.dark,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const progressPercent = {
  color: theme.colors.primary,
};

const progressBar = {
  width: "100%",
  height: 4,
  background: "rgba(194,104,122,0.15)",
  borderRadius: 999,
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.dark})`,
  borderRadius: 999,
};

/* CHAT / QUESTION CARD */
const chatContainer = {
  width: "100%",
  maxWidth: 640,
};

const questionCard = {
  background: theme.colors.card,
  borderRadius: 24,
  padding: "32px 28px",
  boxShadow: "0 20px 60px rgba(125,42,60,0.08)",
};

const aiHeader = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
};

const aiAvatar = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.dark})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
  color: "#fff",
};

const aiLabel = {
  fontSize: 12,
  fontWeight: 700,
  color: theme.colors.muted,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
};

const questionText = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(20px, 3vw, 26px)",
  fontWeight: 600,
  color: theme.colors.dark,
  margin: "0 0 8px",
  lineHeight: 1.3,
  letterSpacing: "-0.01em",
};

const questionSubtitle = {
  fontSize: 13,
  color: theme.colors.muted,
  marginTop: 0,
  marginBottom: 24,
  lineHeight: 1.5,
};

const optionsContainer = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const optionBtn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "16px 20px",
  background: theme.colors.bg,
  border: `2px solid transparent`,
  borderRadius: 14,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  color: theme.colors.dark,
  textAlign: "left",
  transition: "all 0.2s ease",
  fontFamily: "inherit",
};

const optionBtnSelected = {
  background: "rgba(194,104,122,0.08)",
  border: `2px solid ${theme.colors.primary}`,
  color: theme.colors.dark,
  fontWeight: 600,
};

const optionLabel = {
  flex: 1,
};

const checkmark = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  background: theme.colors.primary,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 700,
};

const multiActions = {
  marginTop: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
};

const multiHint = {
  fontSize: 12,
  color: theme.colors.muted,
  margin: 0,
  fontWeight: 500,
};

const continueBtn = {
  padding: "12px 28px",
  background: theme.colors.dark,
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  transition: "all 0.3s ease",
};

const backBtn = {
  marginTop: 16,
  padding: "8px 14px",
  background: "transparent",
  color: theme.colors.muted,
  border: "none",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: "inherit",
};