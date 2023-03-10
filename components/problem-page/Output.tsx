import React from "react";

function Output({ handleCompile, code, classnames, processing }: any) {
  return (
    <div className="mb-10 sm:mb-0">
      <div
        id="log"
        style={{
          maxWidth: "110vh",
          marginRight: 5,
        }}
        className="bg-gray-800 mt-1 rounded-md text-white font-mono 
                    text-sm overflow-y-auto overflow-x-auto p-3 max-h-24"
      />
      <button
        onClick={handleCompile}
        disabled={!code}
        className={classnames(
          `mt-2 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
           px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0`,
          !code ? "opacity-50" : ""
        )}
      >
        {processing ? "Processing..." : "Compile and Execute"}
      </button>
    </div>
  );
}

export default Output;
