const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="hero min-h-screen relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10"></div>

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="hero-content text-center relative z-10 px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="badge badge-primary badge-outline mb-6 gap-2 py-3 px-4 text-sm">
              <span className="loading loading-ring loading-xs"></span>
              Your Personal AI Tutor
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Master Anything with
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                AI Learning
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              An intelligent learning agent that adapts to your pace, explains
              concepts clearly, and helps you truly understand — not just
              memorize.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg px-8">
                Start Learning
              </button>
              <button className="btn btn-outline btn-lg px-8">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
