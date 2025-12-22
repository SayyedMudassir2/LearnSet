"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const academicBranches = [
  { value: "school-education", label: "School Education" },
  { value: "higher-secondary", label: "Higher Secondary" },
  { value: "entrance-exams", label: "Entrance Exams" },
  { value: "computer-engineering", label: "Computer Engineering" },
  { value: "electrical-engineering", label: "Electrical Engineering" },
  { value: "mechanical-engineering", label: "Mechanical Engineering" },
  { value: "civil-engineering", label: "Civil Engineering" },
  { value: "information-technology", label: "Information Technology" },
];

const resourceTypes = [
  { value: "notes", label: "Notes" },
  { value: "pyqs", label: "PYQs" },
  { value: "diagrams", label: "Diagrams" },
  { value: "solutions", label: "Solutions" },
];

// A placeholder for subjects, in a real app this would be more complex
const subjects: { [key: string]: { value: string; label: string }[] } = {
    "computer-engineering": [
        { value: "dsa", label: "Data Structures" },
        { value: "dbms", label: "Database Management" },
    ],
    "electrical-engineering": [
        { value: "circuits", label: "Circuit Theory" },
        { value: "machines", label: "Electrical Machines" },
    ],
    // Add other branches and their subjects
};


export default function SelectPage() {
  const [branch, setBranch] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [semester, setSemester] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();

  const handleBranchChange = (value: string) => {
    setBranch(value);
    setSubject(null);
    setSemester(null);
  };

  const handleRedirect = () => {
    if (branch && type) {
        let path = '';
        if (isSemesterDisabled) {
            path = `/${branch}/${subject || 'general'}/${type}`;
        } else if (subject && semester) {
            path = `/${branch}/semester-${semester}/${subject}/${type}`;
        }

        if (path) {
            router.push(path);
        }
    }
  };

  const isSemesterDisabled =
    branch === "school-education" ||
    branch === "higher-secondary" ||
    branch === "entrance-exams";

  const currentSubjects = branch ? subjects[branch] || [] : [];


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Your Resources</h1>
      <div className="space-y-4">
        <Select onValueChange={handleBranchChange} value={branch || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Academic Branch" />
          </SelectTrigger>
          <SelectContent>
            {academicBranches.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSubject} value={subject || ""} disabled={!branch || isSemesterDisabled}>
          <SelectTrigger>
            <SelectValue placeholder="Subject Name" />
          </SelectTrigger>
          <SelectContent>
             {currentSubjects.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSemester} value={semester || ""} disabled={isSemesterDisabled}>
          <SelectTrigger>
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(6)].map((_, i) => (
              <SelectItem key={i + 1} value={`${i + 1}`}>
                Semester {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setType} value={type || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {resourceTypes.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleRedirect} disabled={!branch || !type || (!isSemesterDisabled && (!subject || !semester))}>
          Go to page
        </Button>
      </div>
    </div>
  );
}