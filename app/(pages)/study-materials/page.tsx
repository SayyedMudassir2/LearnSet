// app/study-materials/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Bookmark,
  ThumbsUp,
  MoreVertical,
  LayoutGrid,
  List,
  UploadCloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// --- Types ---
type Material = {
  id: string;
  title: string;
  branch: string;
  semester: number;
  type: 'Note' | 'PYQ' | 'Lab Manual' | 'Assignment';
  author: string;
  date: string;
  downloads: number;
  likes: number;
  tags: string[];
  thumbnail?: string;
};

// --- Mock Data ---
const MATERIALS: Material[] = [
  {
    id: '1',
    title: 'Operating Systems - Process Management Notes',
    branch: 'Computer',
    semester: 4,
    type: 'Note',
    author: 'Admin',
    date: '2024-03-15',
    downloads: 1240,
    likes: 85,
    tags: ['K-Scheme', 'Important', 'Process'],
  },
  // ... more items
];

export default function StudyMaterialsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [activeBranch, setActiveBranch] = useState('all');

  const filteredMaterials = useMemo(() => {
    return MATERIALS.filter(m =>
      (activeBranch === 'all' || m.branch === activeBranch) &&
      (m.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, activeBranch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 font-sans">

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 pt-16 pb-12">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none px-4 py-1">
            MSBTE Resource Hub
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Everything you need for <span className="text-blue-600 dark:text-blue-400">Engineering Success.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Access thousands of curated notes, previous year questions, and lab manuals tailored for your diploma journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl px-8 shadow-lg shadow-blue-200/50 dark:shadow-none">
              <Download className="mr-2 h-5 w-5" /> Browse Materials
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-slate-200 dark:border-gray-700">
              <UploadCloud className="mr-2 h-5 w-5" /> Contribute Notes
            </Button>
          </div>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-4">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input
              placeholder="Search by topic, subject or code..."
              className="pl-10 h-11 bg-slate-100/50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <Select onValueChange={setActiveBranch} defaultValue="all">
              <SelectTrigger className="w-[140px] h-11 rounded-xl bg-white dark:bg-gray-800 dark:text-slate-200">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Computer">Computer</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-11 rounded-xl bg-white dark:bg-gray-800 dark:text-slate-200">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map(s => <SelectItem key={s} value={s.toString()}>Sem {s}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="ml-auto hidden md:flex items-center gap-1 bg-slate-100 dark:bg-gray-800 p-1 rounded-xl">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-9 w-9 rounded-lg"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-9 w-9 rounded-lg"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className={viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
        }>
          {filteredMaterials.map((item) => (
            <MaterialCard key={item.id} item={item} mode={viewMode} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Showing 12 of {filteredMaterials.length} results</p>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl" disabled>Previous</Button>
            <Button variant="outline" className="rounded-xl bg-blue-600 text-white border-blue-600">1</Button>
            <Button variant="outline" className="rounded-xl">2</Button>
            <Button variant="outline" className="rounded-xl">Next</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Material Card ---
function MaterialCard({ item, mode }: { item: Material, mode: 'grid' | 'list' }) {
  const isGrid = mode === 'grid';

  return (
    <Card className={cn(
      "group bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1 overflow-hidden",
      !isGrid && "flex flex-row items-center p-4 gap-6"
    )}>
      {isGrid && (
        <div className="aspect-[4/3] bg-slate-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
          <FileText className="h-16 w-16 text-slate-300 dark:text-gray-500" />
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 dark:bg-gray-700/70 text-slate-900 dark:text-white backdrop-blur shadow-sm border-none font-bold">
              {item.type}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
        </div>
      )}

      <div className="flex-grow p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            {item.title}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save for Later</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
          <span className="bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase">{item.branch}</span>
          <span>Sem {item.semester}</span>
          <span>•</span>
          <span>{item.date}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.map(tag => (
            <span key={tag} className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">#{tag}</span>
          ))}
        </div>
      </div>

      <CardFooter className={cn(
        "bg-slate-50/50 dark:bg-gray-800/30 border-t border-slate-100 dark:border-gray-800 p-4 flex items-center justify-between",
        !isGrid && "bg-transparent border-none py-0 w-64"
      )}>
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-300 text-xs">
          <span className="flex items-center gap-1"><Download size={14} /> {item.downloads}</span>
          <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors"><ThumbsUp size={14} /> {item.likes}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/30 dark:hover:bg-gray-700">
            <Eye size={18} className="text-slate-600 dark:text-slate-300" />
          </Button>
          <Button size="sm" className="bg-slate-900 dark:bg-blue-600 text-white rounded-lg px-4 font-bold">
            Get PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
