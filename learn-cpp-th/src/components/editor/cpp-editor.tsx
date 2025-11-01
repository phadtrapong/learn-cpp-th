"use client";

import Editor, { type EditorProps } from "@monaco-editor/react";

export const DEFAULT_SNIPPET = `#include <iostream>

int main() {
  std::cout << "Hello, สวัสดี C++!" << std::endl;
  return 0;
}`;

type CppEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  height?: EditorProps["height"];
};

export function CppEditor({
  value,
  onChange,
  height = 360,
}: CppEditorProps) {
  const handleChange = (next?: string) => {
    if (!onChange) return;
    onChange(next ?? DEFAULT_SNIPPET);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-200/70">
      <Editor
        height={height}
        defaultLanguage="cpp"
        language="cpp"
        theme="vs-light"
        options={{
          fontSize: 18,
          minimap: { enabled: false },
          automaticLayout: true,
          fontFamily: '"Fira Code", "JetBrains Mono", "Menlo", monospace',
          padding: { top: 18 },
          scrollBeyondLastLine: false,
        }}
        value={value ?? DEFAULT_SNIPPET}
        onChange={handleChange}
      />
    </div>
  );
}
