'use client';

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  RotateCcw,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

/* -------------------------------- CONFIG -------------------------------- */

const CONTENT_TYPES = [
  { label: "Theory Notes", value: "notes", description: "Subject-wise simplified notes" },
  { label: "Question Papers", value: "papers", description: "Previous year papers" },
  { label: "E-Books", value: "books", description: "Reference textbooks" },
  { label: "Model Answers", value: "answers", description: "Solved paper keys" },
];

const FILTER_CONFIG: Record<string, any> = {
  school: {
    branchTitle: "Class",
    branches: Array.from({ length: 10 }, (_, i) => ({
      label: `Class ${i + 1}`,
      value: `class-${i + 1}`,
    })),
    semesterTitle: "Boards",
    semesters: [
      { label: "Bihar Board", value: "bihar" },
      { label: "Gujarat Board", value: "gujarat" },
      { label: "Maharashtra Board", value: "maharashtra" },
      { label: "CBSE", value: "cbse" },
    ],
    showSemester: true,
  },

  "higher-secondary": {
    branchTitle: "Class",
    branches: [
      { label: "Class 11th", value: "11" },
      { label: "Class 12th", value: "12" },
    ],
    semesterTitle: "Stream",
    semesters: [
      { label: "Science", value: "science" },
      { label: "Commerce", value: "commerce" },
      { label: "Arts", value: "arts" },
    ],
    showSemester: true,
  },

  ug: {
    branchTitle: "Stream",
    branches: [
      { label: "Science", value: "science" },
      { label: "Commerce", value: "commerce" },
      { label: "Arts", value: "arts" },
    ],
    showSemester: false,
  },

  entrance: {
    branchTitle: "Entrance Exam",
    branches: [
      { label: "NEET", value: "neet" },
      { label: "JEE", value: "jee" },
      { label: "MHT-CET", value: "mht-cet" },
      { label: "MCA-CET", value: "mca-cet" },
      { label: "MBA-CET", value: "mba-cet" },
    ],
    showSemester: false,
  },
};

const SCIENCE_GROUPS = [
  { label: "PCM", value: "pcm" },
  { label: "PCB", value: "pcb" },
  { label: "PCMB", value: "pcmb" },
];

const COURSES: Record<string, string[]> = {
  pcm: ["BTech", "BCA", "BSc IT", "BSc CS"],
  pcb: ["MBBS", "Pharmacy", "BSc Nursing", "BMLT"],
  pcmb: ["BSc Agriculture", "BSc Bio-Tech"],
  commerce: ["CA", "BCom", "DEd", "Call Center"],
  arts: ["LLB", "BBA", "DEd"],
};

/* ---------------------------- FILTER SECTION ----------------------------- */

const FilterSection = ({
  title,
  options,
  selectedValues,
  onToggle,
}: {
  title: string;
  options: any[];
  selectedValues: string[];
  onToggle: (val: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-2">
      {title}
    </h3>
    <div className="grid gap-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all hover:bg-accent",
            selectedValues.includes(opt.value)
              ? "bg-primary/5 text-primary"
              : "text-gray-600 dark:text-gray-400"
          )}
        >
          <Checkbox
            checked={selectedValues.includes(opt.value)}
            onCheckedChange={() => onToggle(opt.value)}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{opt.label}</span>
            {opt.description && (
              <span className="text-[11px] opacity-70">{opt.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
);

/* ------------------------------ PAGE ------------------------------------ */

export default function ResourceSelectionPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "school";
  const config = FILTER_CONFIG[mode];

  const [selections, setSelections] = React.useState({
    branch: [] as string[],
    semester: [] as string[],
    type: [] as string[],
  });

  const toggleSelection = (key: keyof typeof selections, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [value],
    }));
  };

  const resetFilters = () =>
    setSelections({ branch: [], semester: [], type: [] });

  const selectedBranch = selections.branch[0];
  const selectedSemester = selections.semester[0];
  const isAnyActive = Object.values(selections).some((v) => v.length > 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold">Resource Hub</h1>
            <p className="text-muted-foreground">
              Filter study material based on your requirement
            </p>
          </div>
          {isAnyActive && (
            <Button variant="ghost" onClick={resetFilters}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <aside className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 rounded-xl space-y-6">
            <FilterSection
              title={config.branchTitle}
              options={config.branches}
              selectedValues={selections.branch}
              onToggle={(v) => toggleSelection("branch", v)}
            />

            {mode === "ug" && selectedBranch === "science" && (
              <>
                <Separator />
                <FilterSection
                  title="Subject Group"
                  options={SCIENCE_GROUPS}
                  selectedValues={selections.semester}
                  onToggle={(v) => toggleSelection("semester", v)}
                />
              </>
            )}

            {mode === "ug" &&
              ((selectedBranch !== "science" && selectedBranch) ||
                selectedSemester) && (
                <>
                  <Separator />
                  <FilterSection
                    title="Courses"
                    options={
                      COURSES[selectedSemester || selectedBranch]?.map((c) => ({
                        label: c,
                        value: c.toLowerCase(),
                      })) || []
                    }
                    selectedValues={selections.type}
                    onToggle={(v) => toggleSelection("type", v)}
                  />
                </>
              )}

            {config.showSemester && (
              <>
                <Separator />
                <FilterSection
                  title={config.semesterTitle}
                  options={config.semesters}
                  selectedValues={selections.semester}
                  onToggle={(v) => toggleSelection("semester", v)}
                />
              </>
            )}

            <Separator />

            <FilterSection
              title="Content Type"
              options={CONTENT_TYPES}
              selectedValues={selections.type}
              onToggle={(v) => toggleSelection("type", v)}
            />
          </aside>

          {/* MAIN */}
          <main className="lg:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>Your Requirements</CardTitle>
                <CardDescription>
                  Selected filters will be applied
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isAnyActive ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="mx-auto mb-4 opacity-30" />
                    Select filters to continue
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Object.values(selections)
                      .flat()
                      .map((v) => (
                        <Badge key={v} variant="outline">
                          {v}
                        </Badge>
                      ))}
                  </div>
                )}

                <Button
                  disabled={!isAnyActive}
                  className="w-full h-12 font-bold"
                >
                  Retrieve Resources <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 flex gap-3 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              Resources are mapped to the latest syllabus.
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
