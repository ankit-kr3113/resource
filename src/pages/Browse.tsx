import { useState } from "react";
import { ArrowLeft, BookOpen, GraduationCap, ChevronRight, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SubjectResourceView, { getSubjects } from "@/components/SubjectResourceView";

const Browse = () => {
  const [currentStep, setCurrentStep] = useState<'branch' | 'semester' | 'subjects'>('branch');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  const branches = [
    { id: 'cse', name: 'Computer Science & Engineering', description: 'Programming, Software Development, Data Structures, Algorithms' },
    { id: 'ece', name: 'Electronics & Communication', description: 'Circuit Analysis, Digital Electronics, Communication Systems' },
    { id: 'ee', name: 'Electrical Engineering', description: 'Circuit Theory, Electrical Machines, Power Systems, Control Systems' },
    { id: 'me', name: 'Mechanical Engineering', description: 'Thermodynamics, Mechanics, Manufacturing, Heat Transfer' },
    { id: 'ce', name: 'Civil Engineering', description: 'Structural Analysis, Fluid Mechanics, Construction Management' },
    { id: 'arch', name: 'Architecture', description: 'Design, Planning, Construction Technology, Building Materials' }
  ];

  const semestersByBranch = {
    cse: [
      { id: 'sem1', name: 'Semester 1', description: 'Mathematics-I, Physics, Chemistry, Programming Fundamentals' },
      { id: 'sem2', name: 'Semester 2', description: 'Mathematics-II, Data Structures, Digital Logic, Object Oriented Programming' },
      { id: 'sem3', name: 'Semester 3', description: 'Algorithms, Database Systems, Computer Networks, Software Engineering' },
      { id: 'sem4', name: 'Semester 4', description: 'Operating Systems, Compiler Design, Web Technologies, System Design' },
      { id: 'sem5', name: 'Semester 5', description: 'Machine Learning, Computer Graphics, Mobile Computing, Project Management' },
      { id: 'sem6', name: 'Semester 6', description: 'Advanced Topics, Capstone Project, Industry Training, Electives' }
    ],
    ece: [
      { id: 'sem1', name: 'Semester 1', description: 'Mathematics-I, Physics, Chemistry, Basic Electronics' },
      { id: 'sem2', name: 'Semester 2', description: 'Mathematics-II, Circuit Analysis, Digital Electronics, Signals & Systems' },
      { id: 'sem3', name: 'Semester 3', description: 'Analog Electronics, Microprocessors, Communication Theory, Control Systems' },
      { id: 'sem4', name: 'Semester 4', description: 'VLSI Design, Embedded Systems, Wireless Communication, Signal Processing' },
      { id: 'sem5', name: 'Semester 5', description: 'Advanced Communication, IoT, RF Engineering, Project Work' },
      { id: 'sem6', name: 'Semester 6', description: 'Capstone Project, Industry Training, Advanced Electives' }
    ],
    ee: [
      { id: 'sem1', name: 'Semester 1', description: 'Mathematics-I, Physics, Chemistry, Basic Electrical Engineering' },
      { id: 'sem2', name: 'Semester 2', description: 'Mathematics-II, Circuit Theory, Electrical Machines, Power Systems' },
      { id: 'sem3', name: 'Semester 3', description: 'Power Electronics, Control Systems, Electrical Drives, Measurements' },
      { id: 'sem4', name: 'Semester 4', description: 'Power Systems Protection, Renewable Energy, Smart Grid, High Voltage' },
      { id: 'sem5', name: 'Semester 5', description: 'Advanced Power Systems, Energy Management, Project Work' },
      { id: 'sem6', name: 'Semester 6', description: 'Capstone Project, Industry Training, Specialization Electives' }
    ],
    me: [
      { id: 'sem1', name: 'Semester 1', description: 'Mathematics-I, Physics, Chemistry, Engineering Drawing' },
      { id: 'sem2', name: 'Semester 2', description: 'Mathematics-II, Thermodynamics, Mechanics, Material Science' },
      { id: 'sem3', name: 'Semester 3', description: 'Heat Transfer, Machine Design, Manufacturing Processes, Fluid Mechanics' },
      { id: 'sem4', name: 'Semester 4', description: 'Automotive Engineering, Robotics, CAD/CAM, Quality Control' },
      { id: 'sem5', name: 'Semester 5', description: 'Advanced Manufacturing, Project Management, Industrial Engineering' },
      { id: 'sem6', name: 'Semester 6', description: 'Capstone Project, Industry Training, Specialization Electives' }
    ],
    ce: [
      { id: 'sem1', name: 'Semester 1', description: 'Mathematics-I, Physics, Chemistry, Engineering Drawing' },
      { id: 'sem2', name: 'Semester 2', description: 'Mathematics-II, Structural Analysis, Fluid Mechanics, Surveying' },
      { id: 'sem3', name: 'Semester 3', description: 'Concrete Technology, Geotechnical Engineering, Transportation, Environmental' },
      { id: 'sem4', name: 'Semester 4', description: 'Construction Management, Advanced Structures, Water Resources' },
      { id: 'sem5', name: 'Semester 5', description: 'Infrastructure Planning, Project Management, Advanced Electives' },
      { id: 'sem6', name: 'Semester 6', description: 'Capstone Project, Industry Training, Specialization' }
    ],
    arch: [
      { id: 'sem1', name: 'Semester 1', description: 'Architectural Drawing, History of Architecture, Basic Design' },
      { id: 'sem2', name: 'Semester 2', description: 'Building Construction, Materials, Structural Systems, Design Studio' },
      { id: 'sem3', name: 'Semester 3', description: 'Urban Planning, Environmental Design, Construction Technology' },
      { id: 'sem4', name: 'Semester 4', description: 'Advanced Design Studio, Project Management, Sustainable Architecture' },
      { id: 'sem5', name: 'Semester 5', description: 'Professional Practice, Advanced Construction, Thesis Preparation' },
      { id: 'sem6', name: 'Semester 6', description: 'Thesis Project, Industry Training, Portfolio Development' }
    ]
  };

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
    setSelectedSemester('');
    setCurrentStep('semester');
  };

  const handleSemesterSelect = (semester: string) => {
    setSelectedSemester(semester);
    setCurrentStep('subjects');
  };

  const handleBack = () => {
    if (currentStep === 'subjects') {
      setCurrentStep('semester');
    } else if (currentStep === 'semester') {
      setSelectedSemester('');
      setCurrentStep('branch');
    }
  };

  const resetSelection = () => {
    setCurrentStep('branch');
    setSelectedBranch('');
    setSelectedSemester('');
  };

  const steps: { key: typeof currentStep; label: string; icon: JSX.Element }[] = [
    { key: 'branch', label: 'Branch', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'semester', label: 'Semester', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'subjects', label: 'Subjects', icon: <FolderTree className="w-4 h-4" /> },
  ];

  // Derived labels and counts for header
  const branchName = branches.find(b => b.id === selectedBranch)?.name || '';
  const semesterName = (semestersByBranch as any)[selectedBranch]?.find((s: any) => s.id === selectedSemester)?.name || '';
  const subjectsMap = currentStep === 'subjects' ? getSubjects(selectedBranch, selectedSemester) : {} as any;
  const allResourcesHeader = currentStep === 'subjects' ? Object.values(subjectsMap).flatMap((s: any) => s.resources || []) : [];
  const totalHeader = allResourcesHeader.length;
  const notesHeader = allResourcesHeader.filter((r: any) => r.type === 'Notes').length;
  const pyqHeader = allResourcesHeader.filter((r: any) => r.type === 'PYQ').length;
  const linksHeader = allResourcesHeader.filter((r: any) => r.type === 'External Link').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">Browse Resources</h1>
              <p className="text-primary-foreground/85">
                {currentStep === 'branch' && 'Select your branch'}
                {currentStep === 'semester' && `Choose semester for ${branchName}`}
                {currentStep === 'subjects' && `${semesterName} • ${Object.keys(subjectsMap).length} Subjects • ${totalHeader} Resources`}
              </p>

              {/* Breadcrumb Chips (clickable) */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge onClick={resetSelection} className="bg-primary-foreground/10 text-primary-foreground cursor-pointer hover:bg-primary-foreground/15">Browse</Badge>
                {currentStep !== 'branch' && (
                  <>
                    <ChevronRight className="w-4 h-4 text-primary-foreground/70" />
                    <Badge onClick={() => { setSelectedSemester(''); setCurrentStep('semester'); }} className="bg-primary-foreground/10 text-primary-foreground cursor-pointer hover:bg-primary-foreground/15">
                      {branchName}
                    </Badge>
                  </>
                )}
                {currentStep === 'subjects' && (
                  <>
                    <ChevronRight className="w-4 h-4 text-primary-foreground/70" />
                    <Badge onClick={() => setCurrentStep('subjects')} className="bg-primary-foreground/10 text-primary-foreground cursor-pointer hover:bg-primary-foreground/15">
                      {semesterName}
                    </Badge>
                  </>
                )}
              </div>

              {currentStep === 'subjects' && (
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200">Notes: {notesHeader}</Badge>
                  <Badge className="bg-green-100 text-green-800 border border-green-200">PYQ: {pyqHeader}</Badge>
                  <Badge className="bg-purple-100 text-purple-800 border border-purple-200">Other Resources: {linksHeader}</Badge>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2">
              {currentStep !== 'branch' && (
                <Button 
                  variant="ghost" 
                  onClick={handleBack}
                  className="text-primary-foreground/90 hover:bg-primary-foreground/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}
              <Button 
                variant="secondary" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={resetSelection}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sticky Stepper */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {steps.map((s, i) => {
                    const done = (currentStep === 'semester' && s.key === 'branch') || (currentStep === 'subjects' && (s.key === 'branch' || s.key === 'semester'));
                    const active = currentStep === s.key;
                    return (
                      <li key={s.key} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${active ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${done ? 'bg-green-500 text-white' : active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70'}`}>{i + 1}</div>
                        <div className="flex items-center gap-2 text-sm">
                          {s.icon}
                          <span className={active ? 'font-medium text-foreground' : 'text-muted-foreground'}>{s.label}</span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
            </Card>
            </div>
          </aside>

          {/* Main stage */}
          <main className="lg:col-span-9 min-w-0">
            {/* Back for mobile */}
            {currentStep !== 'branch' && (
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="mb-6 lg:hidden hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            )}

            {/* Branch Selection */}
            {currentStep === 'branch' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Select Your Branch</h2>
                  <span className="text-sm text-muted-foreground">{branches.length} options</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {branches.map((branch) => (
                    <Card 
                      key={branch.id}
                      className="group cursor-pointer border-2 border-transparent hover:border-primary/40 transition-all duration-200 hover:shadow-medium"
                      onClick={() => handleBranchSelect(branch.id)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          {branch.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{branch.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">6 Semesters</Badge>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Semester Selection */}
            {currentStep === 'semester' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Select Semester</h2>
                  <span className="text-sm text-muted-foreground">
                    {semestersByBranch[selectedBranch as keyof typeof semestersByBranch]?.length || 0} options
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {semestersByBranch[selectedBranch as keyof typeof semestersByBranch]?.map((semester) => (
                    <Card 
                      key={semester.id}
                      className="group cursor-pointer border-2 border-transparent hover:border-primary/40 transition-all duration-200 hover:shadow-medium"
                      onClick={() => handleSemesterSelect(semester.id)}
                    >
                      <CardHeader className="text-center pb-3">
                        <CardTitle className="text-xl text-primary">{semester.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-muted-foreground line-clamp-2">{semester.description}</p>
                        <div className="mt-4">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">Select</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Subject Resources */}
            {currentStep === 'subjects' && (
              <SubjectResourceView
                branch={selectedBranch}
                semester={selectedSemester}
                branchName={branches.find(b => b.id === selectedBranch)?.name || ''}
                semesterName={semestersByBranch[selectedBranch as keyof typeof semestersByBranch]?.find(s => s.id === selectedSemester)?.name || ''}
                hideHeader
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Browse;
