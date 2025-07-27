export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  content?: string;
  children?: FileNode[];
}

export function buildFileTree(data: Record<string, string>): FileNode {
  const root: FileNode = {
    name: "root",
    type: "folder",
    path: "",
    children: [],
  };

  Object.entries(data).forEach(([filePath, content]) => {
    const parts = filePath.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current.children) current.children = [];
      let existing = current.children.find(child => child.name === part);

      if (!existing) {
        existing = {
          name: part,
          type: index === parts.length - 1 ? "file" : "folder",
          path: parts.slice(0, index + 1).join("/"),
          content: index === parts.length - 1 ? content : "",
          children: [],
        };

        current.children.push(existing);
      }
      current = existing;
    });
  });
  function sortChildren(node: FileNode) {
    if (node.children && node.children.length > 0) {
      // Sort folders first, then files, both alphabetically
      node.children.sort((a, b) => {
        // If types are different, folders come first
        if (a.type !== b.type) {
          return a.type === "folder" ? -1 : 1;
        }
        // If types are the same, sort alphabetically
        return a.name.localeCompare(b.name);
      });

      // Recursively sort children of each node
      node.children.forEach(sortChildren);
    }
  }
  sortChildren(root);
  return root;
}
