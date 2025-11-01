"use client";

import Editor, { type EditorProps } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const DEFAULT_SNIPPET = `#include <iostream>

int main() {
  std::cout << "Hello, สวัสดี C++!" << std::endl;
  return 0;
}`;

type CppEditorProps = {
  initialValue?: string;
  height?: EditorProps["height"];
};

export function CppEditor({ initialValue, height = 360 }: CppEditorProps) {
  const [value, setValue] = useState(initialValue ?? DEFAULT_SNIPPET);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

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
        value={value}
        onChange={(next) => setValue(next ?? DEFAULT_SNIPPET)}
      />
    </div>
  );
}
