import {
  CheckIcon,
  ChevronDown,
  CopyIcon,
  File,
  FileSearch,
  Folder,
} from "lucide-react";
import { useState, useCallback, Fragment, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { CodeView } from "@/components/code-view";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Fragment as TFragment } from "@/generated/prisma";
import { buildFileTree, FileNode } from "@/modules/projects/util/buildFileTree";
import { cn, getLanguageFromExtension } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  data: TFragment;
}
export const FileExplorer = ({ data }: Props) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set([""])
  );
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const onScroll = () => {
      setScrolled(el.scrollTop > 10);
    };

    // Remove any event Listner first
    el.removeEventListener("scroll", onScroll);

    // Add a new event Listner
    el.addEventListener("scroll", onScroll);

    return () => el.removeEventListener("scroll", onScroll);
  }, [selectedFile]);

  const fileTree = buildFileTree(data.files as Record<string, string>);

  const toggleFolder = (path: string) => {
    const newExpandedFolders = new Set(expandedFolders);

    if (newExpandedFolders.has(path)) {
      newExpandedFolders.delete(path);
    } else {
      newExpandedFolders.add(path);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const renderTreeNode = (node: FileNode) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile?.path === node.path;

    return (
      <div key={node.path}>
        <li className="mb-0.5">
          <Button
            variant="ghost"
            data-active={isSelected}
            className={cn("w-full justify-start px-1!", {
              "bg-accent/50": isSelected,
            })}
            size="sm"
            onClick={() => {
              if (node.type === "folder") {
                toggleFolder(node.path);
              }
              if (node.type === "file") {
                setSelectedFile(node);
              }
            }}
          >
            {node.type === "folder" && (
              <ChevronDown
                className={cn("-rotate-90", { "rotate-0": isExpanded })}
              />
            )}
            {node.type === "folder" ? <Folder /> : <File />}
            <span className="truncate">{node.name}</span>
          </Button>
        </li>
        {node.type === "folder" && isExpanded && node.children && (
          <div className="ml-[11px] pl-2.5 border-l border-transparent group-hover:border-border transition">
            {node.children?.map(child => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(selectedFile.content as string);
      setCopied(true);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [selectedFile]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={35} minSize={25}>
        <div className="h-full w-full group overflow-auto">
          <div className="p-1">
            <ul className="flex flex-col gap-3">
              {fileTree.children?.map(child => renderTreeNode(child))}
            </ul>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={65} minSize={50}>
        <div className="bg-zinc-100 dark:bg-zinc-900 h-full">
          {!selectedFile && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground">
              <FileSearch className="h-10 w-10 text-gray-400" />
              <p className="text-sm">Select a file to open</p>
            </div>
          )}
          {selectedFile?.content && (
            <div className="h-full flex flex-col gap-1">
              <div
                className={cn("p-2 pr-4 flex justify-between items-center", {
                  "border-b shadow-sm": scrolled,
                })}
              >
                <Breadcrumb>
                  <BreadcrumbList className="text-xs font-medium sm:gap-1">
                    {selectedFile.path.split("/").map((p, i, arr) => (
                      <Fragment key={`p-${i}`}>
                        <BreadcrumbItem>
                          {selectedFile.name === p ? (
                            <BreadcrumbPage>{p}</BreadcrumbPage>
                          ) : (
                            <span>{p}</span>
                          )}
                        </BreadcrumbItem>
                        {i < arr.length - 1 && <BreadcrumbSeparator />}
                      </Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
                <div>
                  <Hint text="Copy" side="bottom" align="end">
                    <Button
                      variant="ghost"
                      className="p-1! h-6 rounded-sm hover:bg-zinc-200 hover:dark:bg-zinc-800"
                      onClick={handleCopy}
                    >
                      {copied ? <CheckIcon /> : <CopyIcon />}
                    </Button>
                  </Hint>
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-auto">
                <CodeView
                  lang={getLanguageFromExtension(selectedFile.name)}
                  code={selectedFile.content}
                />
              </div>
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
