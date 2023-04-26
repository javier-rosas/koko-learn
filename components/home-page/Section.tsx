import React, { useState } from "react";
import Image from "next/image";
import Problems from "./Problems";

type SectionName = {
  section: {
    name: string;
    kebabCaseName: string;
    problems: string[];
  };
};

export default function Section({ section }: SectionName) {
  const [showProblems, setShowProblems] = useState(false);

  return (
    <div className="" onClick={() => setShowProblems(true)}>
      <div className="flex w-full items-center justify-between space-x-6 p-6 bg-white border border-gray-200 hover:bg-indigo-600 hover:text-white rounded-lg ">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm">{section?.name}</h3>
          </div>
        </div>
        <Image
          className="h-10 w-10 flex-shrink-0 bg-white"
          src={`/neetcode-sections/${section.kebabCaseName}.png`}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200"></div>
      </div>
      {showProblems && section?.problems && (
        <Problems problems={section?.problems} setShowProblems={setShowProblems} />
      )}
    </div>
  );
}
