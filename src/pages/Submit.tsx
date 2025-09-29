import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { CheckCircle2, FileText, Link as LinkIcon, Upload, X } from "lucide-react";

const MAX_FILE_MB = 50;
const ACCEPTED_EXT = [".pdf", ".docx", ".pptx"];

const formSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "Provide a short description").max(300, "Keep it concise"),
    branch: z.enum(["Civil", "Mechanical", "Electrical", "ECE", "CSE", "Other"], { required_error: "Please select a Branch" }),
    year: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year"], { required_error: "Please select an Academic Year" }),
    category: z.enum(["PYQ", "Notes", "Other"], { required_error: "Please choose a category" }),
    tags: z.array(z.string()).optional().default([]),
    resourceType: z.enum(["file", "link"], { required_error: "Choose Upload File or External Link" }),
    file: z
      .any()
      .optional()
      .refine((v) => v === undefined || v instanceof File || (v && v[0] instanceof File) || v === null, "Invalid file"),
    link: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\//i.test(val), "Provide a valid URL starting with http(s)"),
  })
  .superRefine((data, ctx) => {
    if (data.resourceType === "file") {
      const file = (data.file as FileList | File | undefined) instanceof File ? (data.file as File) : (data.file as FileList)?.[0];
      if (!file) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please select a file", path: ["file"] });
      if (file) {
        const extOk = ACCEPTED_EXT.some((ext) => file.name.toLowerCase().endsWith(ext));
        if (!extOk) ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Accepted types: ${ACCEPTED_EXT.join(", ")}` , path: ["file"]});
        const tooBig = file.size > MAX_FILE_MB * 1024 * 1024;
        if (tooBig) ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Max size ${MAX_FILE_MB}MB`, path: ["file"] });
      }
      if (data.link) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Remove link or switch to External Link", path: ["link"] });
    }
    if (data.resourceType === "link") {
      if (!data.link) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please provide a URL", path: ["link"] });
      if (data.file) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Remove file or switch to Upload File", path: ["file"] });
    }
  });

type FormValues = z.infer<typeof formSchema>;

const Submit = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      branch: undefined as unknown as FormValues["branch"],
      year: undefined as unknown as FormValues["year"],
      category: undefined as unknown as FormValues["category"],
      tags: [],
      resourceType: undefined as unknown as FormValues["resourceType"],
      link: "",
    },
  });

  const resourceType = watch("resourceType");
  const fileWatch = watch("file");

  useEffect(() => {
    setValue("tags", tags, { shouldValidate: true });
  }, [tags, setValue]);

  useEffect(() => {
    if (resourceType === "file" && fileWatch && (fileWatch as FileList)?.[0]) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((p) => {
          const next = Math.min(100, p + Math.round(10 + Math.random() * 25));
          if (next >= 100) clearInterval(interval);
          return next;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [resourceType, fileWatch]);

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Submission received. Pending admin approval.");
    reset();
    setTags([]);
    setUploadProgress(0);
  };

  const addTag = (value: string) => {
    const clean = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    if (!clean.length) return;
    const next = Array.from(new Set([...tags, ...clean])).slice(0, 12);
    setTags(next);
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const tagInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      addTag(target.value);
      target.value = "";
    }
  };

  const tagHelp = useMemo(() => "Press Enter or comma to add", []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="gradient-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">📥 Submit Resource Form (Contributor Only)</h1>
              <p className="opacity-90">Fill the required details. Either upload a file or provide an external link.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Required Details</CardTitle>
              <CardDescription>All fields marked with * are mandatory</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" placeholder="Thermodynamics – Lecture 5 Notes" {...register("title")} />
                  {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" placeholder="1–3 sentences about what the resource covers" className="min-h-[110px]" {...register("description")} />
                  {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                </div>

                {/* Branch / Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Branch *</Label>
                    <Select onValueChange={(v) => setValue("branch", v as FormValues["branch"], { shouldValidate: true })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Academic Year *</Label>
                    <Select onValueChange={(v) => setValue("year", v as FormValues["year"], { shouldValidate: true })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <RadioGroup className="grid grid-cols-2 md:grid-cols-4 gap-3" onValueChange={(v) => setValue("category", v as FormValues["category"], { shouldValidate: true })}>
                    {(["PYQ", "Notes", "Other"] as const).map((c) => (
                      <Label key={c} className="flex items-center gap-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value={c} />
                        <span>{c}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input onKeyDown={tagInputKeyDown} placeholder="Thermodynamics, Unit 2, Heat Transfer" aria-describedby="tag-help" />
                  <p id="tag-help" className="text-xs text-muted-foreground">{tagHelp}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {tags.map((t) => (
                        <Badge key={t} variant="secondary" className="gap-1">
                          {t}
                          <button type="button" aria-label={`remove ${t}`} className="ml-1 text-foreground/70 hover:text-destructive" onClick={() => removeTag(t)}>
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Resource Type */}
                <div className="space-y-3">
                  <Label>File / Link Upload *</Label>
                  <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4" onValueChange={(v) => setValue("resourceType", v as FormValues["resourceType"], { shouldValidate: true })}>
                    <Label className={`border-2 rounded-lg p-5 cursor-pointer hover:border-primary/60 ${resourceType === "file" ? "border-primary" : "border-border"}`}>
                      <div className="flex items-start gap-3">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Option A: Upload File *</div>
                          <p className="text-sm text-muted-foreground">PDF, DOCX, PPTX • Max {MAX_FILE_MB}MB</p>
                        </div>
                      </div>
                      {resourceType === "file" && (
                        <div className="mt-4 space-y-2">
                          <Input type="file" accept={ACCEPTED_EXT.join(",")} {...register("file")} />
                          {uploadProgress > 0 && (
                            <Progress value={uploadProgress} />
                          )}
                          {errors.file && <p className="text-sm text-destructive">{errors.file.message as string}</p>}
                        </div>
                      )}
                      <RadioGroupItem value="file" className="sr-only" />
                    </Label>

                    <Label className={`border-2 rounded-lg p-5 cursor-pointer hover:border-primary/60 ${resourceType === "link" ? "border-primary" : "border-border"}`}>
                      <div className="flex items-start gap-3">
                        <LinkIcon className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Option B: External Link *</div>
                          <p className="text-sm text-muted-foreground">Paste a public URL (Google Drive, YouTube, etc.)</p>
                        </div>
                      </div>
                      {resourceType === "link" && (
                        <div className="mt-4 space-y-2">
                          <Input type="url" placeholder="https://..." {...register("link")} />
                          {errors.link && <p className="text-sm text-destructive">{errors.link.message as string}</p>}
                        </div>
                      )}
                      <RadioGroupItem value="link" className="sr-only" />
                    </Label>
                  </RadioGroup>
                  {errors.resourceType && <p className="text-sm text-destructive">{errors.resourceType.message}</p>}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button type="submit" disabled={isSubmitting} className="flex-1 md:flex-none">
                    <FileText className="w-4 h-4 mr-2" /> Submit Resource
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { reset(); setTags([]); setUploadProgress(0); }}>
                    Reset
                  </Button>
                </div>

                {/* Small note */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  Submissions are reviewed by admins before publishing.
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Submit;
