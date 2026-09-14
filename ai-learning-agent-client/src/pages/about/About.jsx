import video from "../../assets/home.mp4";
import {
  HiSparkles,
  HiLightBulb,
  HiAcademicCap,
  HiChartBar,
} from "react-icons/hi2";
import { RiRobot2Fill } from "react-icons/ri";
import { FaRocket } from "react-icons/fa6";
const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero / Introduction */}
      <section className="px-6 py-10 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">
            About AI Learner
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-white-800 mt-2 mb-6 leading-tight">
            Learn Smarter. <span className="text-blue-600">Grow Faster.</span>
          </h1>

          <p className="text-lg text-white-800 leading-relaxed max-w-2xl mx-auto">
            AI Learner is an interactive learning platform designed to make
            education simple, engaging, and effective. Users can learn new
            topics through questions, quizzes, practice activities, and instant
            feedback.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200/60">
          <video src={video} controls autoPlay loop className="w-full h-auto">
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-primary badge-outline mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to learn smarter
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Powerful tools designed to help you understand deeply and progress
              faster.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <RiRobot2Fill className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">AI Personal Tutor</h3>
                <p className="text-base-content/70">
                  Get clear explanations tailored to your level and learning
                  style.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-secondary/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-2">
                  <HiLightBulb className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">Smart Practice</h3>
                <p className="text-base-content/70">
                  Practice with adaptive questions that focus on your weak
                  areas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-accent/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                  <HiChartBar className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">Progress Tracking</h3>
                <p className="text-base-content/70">
                  Visual insights help you see how much you’ve improved over
                  time.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                  <HiAcademicCap className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">Interactive Quizzes</h3>
                <p className="text-base-content/70">
                  Test yourself with quizzes that reinforce real understanding.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-secondary/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-2">
                  <HiSparkles className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">Instant Feedback</h3>
                <p className="text-base-content/70">
                  Know immediately what you got right and where to improve.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card bg-base-200/50 border border-base-300 hover:border-accent/40 hover:shadow-xl transition-all duration-300">
              <div className="card-body">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-2">
                  <FaRocket className="w-6 h-6" />
                </div>
                <h3 className="card-title text-lg">Learn at Your Pace</h3>
                <p className="text-base-content/70">
                  No pressure. Study anytime, anywhere, and move as fast as you
                  want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 px-4 bg-base-200/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge badge-secondary badge-outline mb-4">
              How it works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple steps to start learning
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-primary/30">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Topic</h3>
              <p className="text-base-content/70">
                Pick what you want to learn and let AI guide the journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-content flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-secondary/30">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Practice & Quiz</h3>
              <p className="text-base-content/70">
                Answer questions, take quizzes, and get instant feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent text-accent-content flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-lg shadow-accent/30">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-base-content/70">
                Watch yourself improve and master new concepts every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 border border-base-300 shadow-xl">
            <div className="card-body items-center py-12 px-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to learn smarter?
              </h2>
              <p className="text-base-content/70 mb-8 max-w-xl">
                Join thousands of learners who are already using AI to study
                better and grow faster.
              </p>
              <button className="btn btn-primary btn-lg px-10 shadow-lg shadow-primary/25">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
