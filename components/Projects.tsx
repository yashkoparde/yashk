

const projects = [
  {
    title: "Voice-Based Assistant",
    description:
      "A real-world voice system resolving user queries using dynamic NLP integration.",
    tags: ["React", "APIs", "Node.js"],
  },
  {
    title: "Healthcare Interface",
    description:
      "An API-driven application allowing seamless scheduling and health record access.",
    tags: ["TypeScript", "Next.js", "OAuth"],
  },
  {
    title: "Freelance Operations Portal",
    description:
      "A production-level solution managing client workflows and six-figure revenues.",
    tags: ["System Design", "C++", "REST APIs"],
  },
  {
    title: "Community Management Bot",
    description:
      "A large-scale WhatsApp bot managing a university-wide network securely.",
    tags: ["JavaScript", "Webhooks", "Bot API"],
  },
];

export function Projects() {
  return (
    <section className="relative min-h-screen bg-[#080808] px-8 py-24 text-white">
      {/* Subtle glowing radial background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-white/5 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">Featured Work</h2>
          <p className="mt-4 text-white/50 md:text-lg">
            A selection of projects built for impact and scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
              style={{
                backdropFilter: "blur(12px)",
              }}
            >
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-4 text-white/60">{project.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Glow Effect inside card */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl border border-white/0 transition-colors duration-500 group-hover:border-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
