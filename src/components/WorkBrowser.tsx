"use client";

import { useState } from "react";
import { SegmentedFilter } from "./SegmentedFilter";
import { WorkCard, type WorkCardData } from "./WorkCard";

type Filter = "all" | WorkCardData["type"];

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
] as const;

interface Props {
  apps: readonly WorkCardData[];
  readCaseStudyLabel: string;
}

export function WorkBrowser({ apps, readCaseStudyLabel }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? apps : apps.filter((app) => app.type === filter);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SegmentedFilter
          label="Filter by platform"
          options={OPTIONS}
          value={filter}
          onChange={setFilter}
        />
        <p className="text-subtle font-mono text-xs" role="status">
          {visible.length} of {apps.length}
        </p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((app) => (
          <li key={app.name} className="flex">
            <WorkCard app={app} readCaseStudyLabel={readCaseStudyLabel} />
          </li>
        ))}
      </ul>
    </div>
  );
}
