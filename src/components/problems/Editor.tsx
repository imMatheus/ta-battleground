import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import TestCases from "./TestCases";
import { generateStarterCode } from "@/utils/generateStarterCode";
import BouncingBalls from "@/components/loaders/BouncingBalls";

interface EditorProps {
  problemName: string;
  problemArgs: string[];
}

const Editor: React.FC<EditorProps> = ({ problemName, problemArgs }) => {
  const [code, setCode] = useState(() =>
    generateStarterCode(problemName, problemArgs)
  );
  return (
    <>
      <div className="flex flex-shrink-0 bg-bg-dark pt-4 pb-2 text-sm text-text-dimmed">
        <span>{`{ ${code.length} }`}</span>
      </div>

      <div className="flex h-full flex-col overflow-y-scroll">
        <div className="h-[calc(100%_-_0px)]">
          <MonacoEditor
            loading={<BouncingBalls />}
            wrapperProps={{
              style: {
                position: "relative",
                display: "flex",
                textAlign: "initial",
                width: "100%",
                height: "100%",
              },
              // style: 'padding:10px;position:absolute;'
              // className: '!p-1 !background-red-500 !block'
            }}
            className={""}
            height={"100%"}
            language={"javascript"}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme={"vs-dark"}
            options={{
              scrollBeyondLastLine: false,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              fontSize: 16,
              cursorStyle: "block",
              wordWrap: "on",
              lineNumbers: "on",
              // wordWrap: 'wordWrapColumn',
              // wordWrapColumn: 90,
              // wordWrapBreakAfterCharacters: 'continue',

              // try "same", "indent" or "none"
              wrappingIndent: "same",
            }}
          />
        </div>
        <TestCases code={code} />
      </div>
    </>
  );
};

export default Editor;
