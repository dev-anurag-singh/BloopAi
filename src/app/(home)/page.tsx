import { Header } from "@/components/header";
import { PromptForm } from "@/modules/home/components/prompt-form";

function HomePage() {
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white}`}
    >
      <Header />
      <div className="relative z-10 flex-1 grid place-items-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground`}
            >
              Build apps with
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                AI
              </span>
            </h1>
            <p className={`text-xl text-muted-foreground`}>
              Create stunning apps & websites by chatting with AI.
            </p>
          </div>
          <PromptForm />
        </div>
      </div>

      {/* Subtle Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -inset-10 opacity-10 dark:opacity-20`}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
