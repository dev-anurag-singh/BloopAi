import Prism from "prismjs";
import { useEffect } from "react";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

import "./code-theme.css";

interface Props {
  code: string;
  lang: string;
}

export const CodeView = ({ code, lang }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, lang]);

  return (
    <div className="p-2 pr-4 text-xs h-fit min-h-full w-fit min-w-full">
      <code className={`language-${lang}`}>{code}</code>
    </div>
  );
};
