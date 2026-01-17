export default function LandingPage() {
  return (
    <section
      className="
        min-h-screen  flex items-center justify-center
        bg-gradient-to-br from-[#050917] via-[#050a1c] to-[#040d19] py-12 px-4 
      "
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Hero Text */}
        <div className="md:w-2/5 text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Get Full Body&nbsp;
            <span className="text-indigo-400">Health Checkups</span>
            <br className="hidden md:block" />
            <span>at Your Doorstep</span>
          </h1>
          <p className="mb-8 text-gray-200 text-base md:text-lg leading-relaxed">
            Forget long hospital visits. Book tests like blood and urine
            analysis, or a complete health package from the comfort of your
            home.
            <br />
            Trusted professionals. Precise reports. Quick booking &ndash;
            Anytime, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}
