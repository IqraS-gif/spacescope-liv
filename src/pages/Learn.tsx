import { BookOpen, GraduationCap, Award, CheckCircle, ChevronRight, Lightbulb, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppNavLink from "@/components/AppNavLink";

const topics = [
  {
    id: "satellites",
    title: "How Satellites Work",
    description: "Learn about orbits, sensors, and data transmission",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/10",
    lessons: 4,
    duration: "15 min",
  },
  {
    id: "remote-sensing",
    title: "Remote Sensing Basics",
    description: "Understand electromagnetic spectrum and imaging",
    icon: Lightbulb,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    lessons: 5,
    duration: "20 min",
  },
  {
    id: "climate",
    title: "Satellites & Climate",
    description: "How we monitor Earth's changing climate",
    icon: Zap,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    lessons: 3,
    duration: "12 min",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of light do healthy plants reflect strongly?",
    options: [
      "Visible light",
      "Near-Infrared (NIR)",
      "X-rays",
      "Microwaves",
    ],
    correct: 1,
    explanation: "Healthy plants reflect NIR strongly because of their cellular structure. This is the basis of NDVI vegetation indices.",
  },
  {
    id: 2,
    question: "What is the main advantage of radar satellites?",
    options: [
      "Higher resolution images",
      "Can see through clouds and darkness",
      "Cheaper to launch",
      "Better color accuracy",
    ],
    correct: 1,
    explanation: "Radar satellites use their own energy source and can penetrate clouds, making them invaluable for disaster monitoring.",
  },
  {
    id: 3,
    question: "How often does Landsat photograph the entire Earth?",
    options: [
      "Every day",
      "Every 16 days",
      "Every month",
      "Every year",
    ],
    correct: 1,
    explanation: "Landsat revisits every point on Earth every 16 days, creating a consistent archive since 1972.",
  },
];

const infographicData = [
  { label: "Active satellites", value: "7,500+", color: "text-primary" },
  { label: "Years of Landsat data", value: "52", color: "text-amber-400" },
  { label: "Daily images collected", value: "1.5M+", color: "text-green-400" },
  { label: "Countries with space programs", value: "77", color: "text-purple-400" },
];

const Learn = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-400/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">Learning Zone</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Space Education</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <AppNavLink to="/" icon="satellite" label="Disaster Relief" />
            <AppNavLink to="/agriculture" icon="leaf" label="Crop Health" color="text-green-400" />
            <AppNavLink to="/climate" icon="clock" label="Climate" color="text-orange-400" />
            <AppNavLink to="/celestial" icon="calendar" label="Events" color="text-amber-400" />
            <AppNavLink to="/cosmic-weather" icon="sun" label="Weather" color="text-purple-400" />
            <AppNavLink to="/missions" icon="rocket" label="Missions" color="text-blue-400" />
            <AppNavLink to="/learn" icon="book" label="Learn" color="text-emerald-400" active />
            <AppNavLink to="/impact" icon="globe" label="Impact" color="text-rose-400" />
          </nav>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-muted-foreground">STUDENT MODE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Explore Space Science
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Interactive lessons, quizzes, and infographics to understand how satellites help us understand Earth.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Topics */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                <BookOpen className="w-5 h-5 inline mr-2 text-emerald-400" />
                Learning Topics
              </h3>
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-xl border border-border bg-card/50 hover:border-emerald-400/50 transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${topic.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${topic.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{topic.lessons} lessons</span>
                          <span>•</span>
                          <span>{topic.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </div>
                );
              })}

              {/* Infographic */}
              <div className="p-4 rounded-xl border border-border bg-card/50 mt-6">
                <h4 className="font-medium text-foreground mb-4">Quick Facts</h4>
                <div className="grid grid-cols-2 gap-3">
                  {infographicData.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 text-center">
                      <div className={`text-2xl font-display font-bold ${item.color}`}>
                        {item.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-border bg-emerald-400/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground">Knowledge Quiz</h3>
                        <p className="text-sm text-muted-foreground">Test your satellite science knowledge</p>
                      </div>
                    </div>
                    {!quizComplete && (
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {quizComplete ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 rounded-full bg-emerald-400/20 flex items-center justify-center mx-auto mb-4">
                        <Award className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h4 className="text-2xl font-display font-bold text-foreground mb-2">
                        Quiz Complete!
                      </h4>
                      <p className="text-4xl font-bold text-emerald-400 mb-4">
                        {score}/{quizQuestions.length}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {score === quizQuestions.length
                          ? "Perfect score! You're a satellite expert!"
                          : score >= quizQuestions.length / 2
                          ? "Great job! Keep learning!"
                          : "Keep exploring to improve your score!"}
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="px-6 py-3 rounded-lg bg-emerald-400 text-primary-foreground font-medium hover:bg-emerald-500 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Progress Bar */}
                      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                        />
                      </div>

                      {/* Question */}
                      <h4 className="text-xl font-medium text-foreground mb-6">
                        {quizQuestions[currentQuestion].question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => {
                          const isCorrect = index === quizQuestions[currentQuestion].correct;
                          const isSelected = selectedAnswer === index;
                          
                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              disabled={selectedAnswer !== null}
                              className={`w-full text-left p-4 rounded-xl border transition-all ${
                                selectedAnswer === null
                                  ? "border-border bg-card/50 hover:border-emerald-400/50"
                                  : isCorrect
                                  ? "border-green-400 bg-green-400/10"
                                  : isSelected
                                  ? "border-red-400 bg-red-400/10"
                                  : "border-border bg-card/50 opacity-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  selectedAnswer === null
                                    ? "bg-muted text-muted-foreground"
                                    : isCorrect
                                    ? "bg-green-400 text-primary-foreground"
                                    : isSelected
                                    ? "bg-red-400 text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {selectedAnswer !== null && isCorrect ? (
                                    <CheckCircle className="w-4 h-4" />
                                  ) : (
                                    String.fromCharCode(65 + index)
                                  )}
                                </div>
                                <span className={`${
                                  selectedAnswer !== null && isCorrect
                                    ? "text-green-400"
                                    : selectedAnswer !== null && isSelected
                                    ? "text-red-400"
                                    : "text-foreground"
                                }`}>
                                  {option}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {showExplanation && (
                        <div className="mt-6 p-4 rounded-xl bg-emerald-400/10 border border-emerald-400/30">
                          <h5 className="font-medium text-emerald-400 mb-2">Explanation</h5>
                          <p className="text-sm text-foreground/80">
                            {quizQuestions[currentQuestion].explanation}
                          </p>
                          <button
                            onClick={nextQuestion}
                            className="mt-4 px-4 py-2 rounded-lg bg-emerald-400 text-primary-foreground text-sm font-medium hover:bg-emerald-500 transition-colors"
                          >
                            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            SpaceScope • Interactive Learning Zone
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
