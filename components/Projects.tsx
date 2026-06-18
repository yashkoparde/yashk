const projects = [
  {
    title: "Wheyo",
    description:
      "A managed cloud kitchen operating system and marketplace helping food entrepreneurs launch and operate digital kitchens without traditional restaurant overhead.",
    tags: ["Next.js", "React", "Node.js", "Database", "Admin Dashboard", "Vercel"],
  },
  {
    title: "Parakh",
    description:
      "An AI-powered academic integrity platform designed to automate assessment grading, detect plagiarism, and evaluate answer-sheets via OCR.",
    tags: ["Next.js", "AI APIs", "OCR", "Analytics Dashboard"],
  },
  {
    title: "Evidentia",
    description:
      "A digital evidence collection and verification system. It extracts structured information from raw files and automates audit trails.",
    tags: ["Next.js", "AI Processing", "Document Analysis", "Secure Storage"],
  },
  {
    title: "Pharmix",
    description:
      "A B2B digital supply network connecting pharmacies with verified pharmaceutical distributors. It simplifies medicine procurement through real-time stock levels and price comparison.",
    tags: ["Next.js", "Marketplace Architecture", "Inventory Systems", "Supplier Network"],
  },
  {
    title: "HeHo",
    description:
      "A no-code AI backend orchestration framework that connects AI agents securely to databases, enabling autonomous CRUD operations and instant REST APIs.",
    tags: ["AI Agents", "Supabase", "REST APIs", "LLM Integrations"],
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
