import Image from "next/image";
import { useState, useEffect } from "react";

const messages = [
  "Analyzing prompt...",
  "Selecting optimal layout...",
  "Designing layout structure...",
  "Writing JSX structure...",
  "Styling with Tailwind CSS...",
  "Applying responsive styles...",
  "Injecting utility classes...",
  "Generating color palette...",
  "Adding icons and illustrations...",
  "Creating props and interfaces...",
  "Formatting code...",
  "Running lint checks...",
  "Running Prettier...",
  "Inlining Tailwind config overrides...",
  "Cleaning up unused code...",
  "Finalizing structure...",
];

const ShimmerMessages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="Bloop"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Bloop</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
