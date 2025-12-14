"use client";

import { useState, useCallback } from "react";
// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // Assuming a utility function for conditional classes
// Icons
import { Upload, FileText, BookOpen, AlertCircle, CheckCircle, Loader2, Code, X, Star } from "lucide-react";
// Zod for validation
import { z } from "zod";

// --- TypeScript Types ---
interface FormData {
  branch: string; // Strategic addition for granular SEO
  subject: string;
  semester: string;
  title: string;
  description: string;
  file: File | null;
}

interface FormState {
  formData: FormData;
  error: string;
  loading: boolean;
  success: string;
  filePreview?: string;
  isDragOver: boolean; // UX state for drag-and-drop
}

const initialFormData: FormData = { 
    branch: "", 
    subject: "", 
    semester: "", 
    title: "", 
    description: "", 
    file: null 
};


// --- Validation Schema (Refined) ---
const MAX_FILE_SIZE_MB = 50;
const uploadSchema = z.object({
  branch: z.string().min(1, "Please select your academic branch."),
  subject: z.string().min(1, "Please select the subject."),
  semester: z.string().min(1, "Please select the correct semester."),
  title: z.string().min(10, "A descriptive title (min 10 characters) is crucial for search."),
  description: z.string().max(300, "Description must be concise (under 300 characters).").optional().or(z.literal("")),
});

// --- Component ---
export default function UploadNotesPage() {
  const [state, setState] = useState<FormState>({
    formData: initialFormData,
    error: "",
    loading: false,
    success: "",
    filePreview: undefined,
    isDragOver: false,
  });

  const { formData, error, loading, success, filePreview, isDragOver } = state;

  // --- Handlers (Optimized for State Management) ---
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [id]: value },
      error: "",
    }));
  }, []);

  const handleSelectChange = useCallback((id: keyof FormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [id]: value },
      error: "",
    }));
  }, []);

  const processFile = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setState(prev => ({
        ...prev,
        error: `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`,
        formData: { ...prev.formData, file: null },
        filePreview: undefined,
      }));
      return;
    }

    // Performance/UX: Use URL.createObjectURL only for image previews
    const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : file.name;

    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, file },
      error: "",
      filePreview: preview,
      isDragOver: false,
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isDragOver: false }));
    const file = e.dataTransfer.files[0] || null;
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setState(prev => ({ ...prev, isDragOver: true }));
  };

  const handleDragLeave = () => {
    setState(prev => ({ ...prev, isDragOver: false }));
  };

  const clearFile = () => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, file: null },
      filePreview: undefined,
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, error: "", success: "" }));

    const validationResult = uploadSchema.safeParse(formData);
    if (!validationResult.success) {
      // UX: Show the first critical error from Zod
      setState(prev => ({ ...prev, error: validationResult.error.issues[0].message }));
      return;
    }

    if (!formData.file) {
      setState(prev => ({ ...prev, error: "Submission requires a file. Please select or drag your notes." }));
      return;
    }

    // Start loading state
    setState(prev => ({ ...prev, loading: true }));

    try {
      // PERFORMANCE: Simulate API latency (Target: 1-2 seconds for large upload)
      await new Promise(resolve => setTimeout(resolve, 1800));

      // Strategy: Clear data and provide success feedback
      setState(prev => ({
        ...prev,
        success: "Notes submitted successfully! Thank you for contributing. We will review your content shortly.",
        formData: initialFormData,
        filePreview: undefined,
      }));
    } catch {
      // SECURITY/RELIABILITY: Generic error message for client-side
      setState(prev => ({ ...prev, error: "Upload failed due to a network or server error. Please check your connection and try again." }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [formData]);

  // --- Render ---
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      {/* Header (SEO & Engagement Content) */}
      <header className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
          <Star className="mr-2 h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Community Contribution
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          Empower Students: Share Your Best Notes
        </h1>
        <p className="mx-auto mt-6 max-w-4xl text-xl text-muted-foreground">
          Your well-structured notes, solutions, or practicals can help thousands of MSBTE students succeed. Upload your content and earn permanent credit in our library.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-3">
        
        {/* Guidelines / Trust Column */}
        <div className="lg:col-span-1">
            <Card className="shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-primary/70">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                        <BookOpen className="h-6 w-6" />
                        Quality & Copyright
                    </CardTitle>
                    <CardDescription>Follow these crucial steps to ensure your notes are approved quickly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
                        <p>Must be **clear, legible**, and relevant to the official syllabus.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Code className="mt-1 h-5 w-5 text-blue-500 flex-shrink-0" />
                        <p>Supported Formats: **PDF** (preferred), DOCX, PNG, JPG/JPEG. Max size: **{MAX_FILE_SIZE_MB}MB**.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <AlertCircle className="mt-1 h-5 w-5 text-red-500 flex-shrink-0" />
                        <p className="font-semibold">**Zero Tolerance Policy** on copyrighted materials or content copied verbatim from textbooks.</p>
                    </div>
                    <Separator />
                    <p className="text-sm text-foreground italic">
                        All submissions are reviewed by our editorial team within 48 hours. High-quality contributors receive special recognition.
                    </p>
                </CardContent>
            </Card>
        </div>


        {/* Upload Form (Focal Point) */}
        <Card className="shadow-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Content Submission Form</CardTitle>
            <CardDescription>Provide accurate details to help students find your valuable resources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Metadata Section (SEO Focus) */}
              <div className="grid gap-6 sm:grid-cols-3">
                
                {/* Branch (New SEO Field) */}
                <div className="space-y-2">
                    <Label htmlFor="branch">Academic Branch</Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => handleSelectChange("branch", value)}
                      required
                      disabled={loading}
                    >
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compsci">Computer Engineering</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="mech">Mechanical Engineering</SelectItem>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="entc">Electronics & Telecomm.</SelectItem>
                        <SelectItem value="others">Other/General</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                
                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Name</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleSelectChange("subject", value)}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M1">Applied Mathematics-I</SelectItem>
                      <SelectItem value="ED">Engineering Drawing</SelectItem>
                      <SelectItem value="BEE">Basic Electrical Engg.</SelectItem>
                      <SelectItem value="P">Applied Physics</SelectItem>
                      <SelectItem value="C">Applied Chemistry</SelectItem>
                      <SelectItem value="DSA">Data Structures</SelectItem>
                      <SelectItem value="other">Other Subject</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Semester */}
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) => handleSelectChange("semester", value)}
                    required
                    disabled={loading}
                  >
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {['1', '2', '3', '4', '5', '6'].map(sem => (
                        <SelectItem key={sem} value={sem}>{sem}{sem === '1' ? 'st' : sem === '2' ? 'nd' : sem === '3' ? 'rd' : 'th'} Semester</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Content Title (High-Impact SEO)</Label>
                <Input
                  id="title"
                  placeholder="e.g., [M3] Unit-4 Solved Problems & Theory Notes for Computer Science"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description (Optional, Max 300 chars)</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., Covers Fourier series and Laplace transforms with 20+ solved university questions from 2021-2024."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  maxLength={300}
                  disabled={loading}
                />
                <p className="text-right text-sm text-muted-foreground">
                    {formData.description.length} / 300 characters
                </p>
              </div>

              {/* File Upload (Enhanced UX) */}
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File</Label>
                <div className="relative">
                  <label
                    htmlFor="file-upload"
                    className={cn(
                      "group relative block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition duration-300",
                      isDragOver ? "border-primary bg-primary/5 shadow-inner" : "border-gray-300 dark:border-gray-700 hover:border-primary/70",
                      formData.file ? "pb-12 border-solid border-primary/50" : ""
                    )}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {filePreview && formData.file?.type.startsWith("image/") ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="mx-auto mb-4 max-h-48 object-contain rounded-md border"
                      />
                    ) : (
                      <Upload className={cn("mx-auto mb-4 h-12 w-12 transition", formData.file ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                    )}
                    <p className="text-lg font-bold text-foreground">
                      {formData.file ? formData.file.name : "Drag your file here or Click to select"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formData.file ? `Size: ${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : `PDF, DOCX, PNG, JPG | Max ${MAX_FILE_SIZE_MB}MB`}
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.docx"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </label>

                  {/* Remove Button (Enhanced Placement) */}
                  {formData.file && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={clearFile}
                      className="absolute bottom-2 right-2 text-xs h-8"
                      disabled={loading}
                    >
                      <X className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>
              </div>

              {/* Error & Success Messages (Clear Feedback) */}
              {error && (
                <div className="flex items-center gap-3 rounded-lg bg-red-100 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 rounded-lg bg-green-100 dark:bg-green-900/20 p-4 text-sm text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              {/* Submit Button (Conversion Focus) */}
              <Button size="lg" className="w-full h-12 text-lg font-semibold group" type="submit" disabled={loading || !!success}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Submitting & Processing File...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-6 w-6 transition-transform group-hover:scale-105" />
                    Submit Notes for Review
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}