import {
  HiSparkles,
  HiAcademicCap,
  HiLightningBolt,
  HiChatAlt2,
  HiTrendingUp,
  HiGlobe,
} from "react-icons/hi";
import { RiRobot2Fill } from "react-icons/ri";

const Home = () => {
  const marqueeImages = [
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-base-100 overflow-x-hidden">
      {/* Self-contained marquee animation (no external CSS) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-base-100 to-base-100" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <RiRobot2Fill className="w-4 h-4" />
            Powered by Advanced AI
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            The Future of
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Learning is Here
            </span>
          </h1>

          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience personalized AI tutoring that adapts to you in real-time.
            Ask anything, practice smarter, and master skills faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg px-10 rounded-full shadow-xl shadow-primary/20">
              Start Free Today
            </button>
            <button className="btn btn-ghost btn-lg px-8 rounded-full border border-base-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* ========== IMAGE MARQUEE ========== */}
      <section className="py-12 relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Scroll Left */}
        <div className="flex gap-6 animate-marquee py-4">
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <img
              key={`r1-${i}`}
              src={src}
              alt="Learning showcase"
              className="w-64 h-44 flex-shrink-0 object-cover rounded-2xl shadow-lg border border-base-300/50 hover:scale-105 transition-transform duration-500"
            />
          ))}
        </div>

        {/* Row 2 - Scroll Right */}
        <div className="flex gap-6 animate-marquee-reverse py-4 mt-2">
          {[...marqueeImages, ...marqueeImages].reverse().map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt="Learning showcase"
              className="w-64 h-44 flex-shrink-0 object-cover rounded-2xl shadow-lg border border-base-300/50 hover:scale-105 transition-transform duration-500"
            />
          ))}
        </div>
      </section>

      {/* ========== WHY AI LEARNER ========== */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why students love <span className="text-primary">AI Learner</span>
            </h2>
            <p className="text-base-content/60 text-lg max-w-xl mx-auto">
              Built differently. Designed for real understanding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <HiLightningBolt className="w-7 h-7" />,
                title: "Lightning Fast Answers",
                desc: "Get clear, accurate explanations in seconds — no waiting, no fluff.",
                color: "bg-amber-500/10 text-amber-500",
              },
              {
                icon: <HiChatAlt2 className="w-7 h-7" />,
                title: "Conversational Learning",
                desc: "Talk to your AI tutor like a real teacher. Ask follow-ups anytime.",
                color: "bg-blue-500/10 text-blue-500",
              },
              {
                icon: <HiTrendingUp className="w-7 h-7" />,
                title: "Adaptive Difficulty",
                desc: "The system automatically adjusts to your skill level as you grow.",
                color: "bg-emerald-500/10 text-emerald-500",
              },
              {
                icon: <HiAcademicCap className="w-7 h-7" />,
                title: "Deep Understanding",
                desc: "Focus on concepts, not just answers. Learn the 'why' behind everything.",
                color: "bg-purple-500/10 text-purple-500",
              },
              {
                icon: <HiSparkles className="w-7 h-7" />,
                title: "Personalized Paths",
                desc: "Every learner gets a unique journey based on their goals and pace.",
                color: "bg-pink-500/10 text-pink-500",
              },
              {
                icon: <HiGlobe className="w-7 h-7" />,
                title: "Learn Anywhere",
                desc: "Desktop, tablet, or phone — your AI tutor is always with you.",
                color: "bg-cyan-500/10 text-cyan-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-base-200/40 border border-base-300 hover:border-primary/30 hover:bg-base-200/70 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.color}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-base-content/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BIG CTA ========== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 md:p-16 text-center text-primary-content shadow-2xl">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to transform the way you learn?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Join thousands of learners who are already studying smarter with
                AI. Start free — no credit card required.
              </p>
              <button className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none px-12 rounded-full shadow-xl font-semibold">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
