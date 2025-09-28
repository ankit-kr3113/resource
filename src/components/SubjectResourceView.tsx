import { useState, useEffect } from "react";
import { BookOpen, FileText, ExternalLink, Download, Eye, Users, Calendar, Filter, Search, Grid, List as ListIcon, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "./ResourceCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Resource {
  id: string;
  title: string;
  type: string;
  uploader: string;
  views: number;
  downloads: number;
  uploadedAt: string;
}

interface Subject {
  name: string;
  icon: string;
  description: string;
  resources: Resource[];
}

interface SubjectResourceViewProps {
  branch: string;
  semester: string;
  branchName: string;
  semesterName: string;
}

// Comprehensive hardcoded sample data for all branches and semesters
const subjectData: Record<string, Record<string, Subject>> = {
  // Computer Science & Engineering
  'cse-sem1': {
    'Mathematics-I': {
      name: 'Mathematics-I',
      icon: '📐',
      description: 'Calculus, Differential Equations, Linear Algebra',
      resources: [
        { id: '1', title: 'Calculus Complete Notes', type: 'Notes', uploader: 'Dr. Sharma', views: 1245, downloads: 456, uploadedAt: '2024-03-15' },
        { id: '2', title: 'Mathematics-I PYQ 2019-2024', type: 'PYQ', uploader: 'Student Council', views: 856, downloads: 321, uploadedAt: '2024-03-12' },
        { id: '3', title: 'Khan Academy Calculus', type: 'External Link', uploader: 'Study Group', views: 623, downloads: 234, uploadedAt: '2024-03-10' },
        { id: '4', title: 'Linear Algebra Solved Examples', type: 'Notes', uploader: 'Priya Sharma', views: 445, downloads: 189, uploadedAt: '2024-03-08' }
      ]
    },
    'Physics': {
      name: 'Physics',
      icon: '⚡',
      description: 'Mechanics, Waves, Thermodynamics, Optics',
      resources: [
        { id: '5', title: 'Physics Mechanics Complete', type: 'Notes', uploader: 'Prof. Gupta', views: 967, downloads: 398, uploadedAt: '2024-03-14' },
        { id: '6', title: 'Physics Lab Manual with Solutions', type: 'Notes', uploader: 'Lab Assistant', views: 723, downloads: 287, uploadedAt: '2024-03-11' },
        { id: '7', title: 'Physics PYQ with Solutions', type: 'PYQ', uploader: 'Alumni Network', views: 634, downloads: 245, uploadedAt: '2024-03-09' }
      ]
    },
    'Chemistry': {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Organic, Inorganic, Physical Chemistry',
      resources: [
        { id: '8', title: 'Organic Chemistry Reactions', type: 'Notes', uploader: 'Dr. Patel', views: 534, downloads: 198, uploadedAt: '2024-03-13' },
        { id: '9', title: 'Chemistry Lab Experiments', type: 'Notes', uploader: 'Lab Instructor', views: 423, downloads: 156, uploadedAt: '2024-03-07' },
        { id: '10', title: 'Chemistry Previous Years', type: 'PYQ', uploader: 'Student Helper', views: 378, downloads: 134, uploadedAt: '2024-03-06' }
      ]
    },
    'Programming Fundamentals': {
      name: 'Programming Fundamentals',
      icon: '💻',
      description: 'C Programming, Problem Solving, Algorithms',
      resources: [
        { id: '11', title: 'C Programming Complete Course', type: 'Notes', uploader: 'Prof. Kumar', views: 1156, downloads: 523, uploadedAt: '2024-03-16' },
        { id: '12', title: 'Programming Lab Solutions', type: 'Notes', uploader: 'Rahul Singh', views: 889, downloads: 412, uploadedAt: '2024-03-14' },
        { id: '13', title: 'HackerRank C Problems', type: 'External Link', uploader: 'Code Club', views: 667, downloads: 298, uploadedAt: '2024-03-12' }
      ]
    }
  },
  'cse-sem2': {
    'Mathematics-II': {
      name: 'Mathematics-II',
      icon: '📊',
      description: 'Discrete Math, Statistics, Probability',
      resources: [
        { id: '14', title: 'Discrete Mathematics Notes', type: 'Notes', uploader: 'Dr. Singh', views: 745, downloads: 287, uploadedAt: '2024-03-15' },
        { id: '15', title: 'Statistics and Probability', type: 'Notes', uploader: 'Prof. Mehta', views: 623, downloads: 234, uploadedAt: '2024-03-13' },
        { id: '16', title: 'Math-II PYQ Collection', type: 'PYQ', uploader: 'Math Society', views: 567, downloads: 213, uploadedAt: '2024-03-11' }
      ]
    },
    'Data Structures': {
      name: 'Data Structures',
      icon: '🌳',
      description: 'Arrays, Linked Lists, Trees, Graphs, Hashing',
      resources: [
        { id: '17', title: 'DSA Complete Notes', type: 'Notes', uploader: 'Arjun Kumar', views: 1534, downloads: 678, uploadedAt: '2024-03-16' },
        { id: '18', title: 'Tree Algorithms Explained', type: 'Notes', uploader: 'Coding Expert', views: 1234, downloads: 567, uploadedAt: '2024-03-14' },
        { id: '19', title: 'DSA PYQ 2019-2024', type: 'PYQ', uploader: 'Alumni Group', views: 1089, downloads: 489, uploadedAt: '2024-03-12' },
        { id: '20', title: 'GeeksforGeeks DSA Course', type: 'External Link', uploader: 'Study Circle', views: 945, downloads: 423, uploadedAt: '2024-03-10' }
      ]
    },
    'Digital Logic': {
      name: 'Digital Logic',
      icon: '🔌',
      description: 'Boolean Algebra, Logic Gates, Flip-Flops',
      resources: [
        { id: '21', title: 'Digital Logic Design Complete', type: 'Notes', uploader: 'Prof. Verma', views: 678, downloads: 298, uploadedAt: '2024-03-15' },
        { id: '22', title: 'Logic Gates Lab Manual', type: 'Notes', uploader: 'Hardware Lab', views: 534, downloads: 223, uploadedAt: '2024-03-13' },
        { id: '23', title: 'Digital Logic PYQ', type: 'PYQ', uploader: 'Electronics Club', views: 456, downloads: 189, uploadedAt: '2024-03-11' }
      ]
    },
    'Object Oriented Programming': {
      name: 'Object Oriented Programming',
      icon: '☕',
      description: 'Java/C++ OOP, Inheritance, Polymorphism',
      resources: [
        { id: '24', title: 'Java OOP Complete Guide', type: 'Notes', uploader: 'Prof. Agarwal', views: 1123, downloads: 498, uploadedAt: '2024-03-16' },
        { id: '25', title: 'OOP Lab Programs Solutions', type: 'Notes', uploader: 'Code Helper', views: 867, downloads: 378, uploadedAt: '2024-03-14' },
        { id: '26', title: 'Java Oracle Documentation', type: 'External Link', uploader: 'Programming Club', views: 645, downloads: 287, uploadedAt: '2024-03-12' }
      ]
    }
  },
  'cse-sem3': {
    'Algorithms': {
      name: 'Algorithms',
      icon: '🔄',
      description: 'Sorting, Searching, Dynamic Programming, Greedy',
      resources: [
        { id: '27', title: 'Algorithms Design Complete', type: 'Notes', uploader: 'Dr. Algorithm', views: 1456, downloads: 623, uploadedAt: '2024-03-16' },
        { id: '28', title: 'Dynamic Programming Guide', type: 'Notes', uploader: 'Competitive Coder', views: 1234, downloads: 534, uploadedAt: '2024-03-14' },
        { id: '29', title: 'Algorithms PYQ Solutions', type: 'PYQ', uploader: 'CS Society', views: 1089, downloads: 467, uploadedAt: '2024-03-12' }
      ]
    },
    'Database Systems': {
      name: 'Database Systems',
      icon: '💾',
      description: 'SQL, Normalization, Transactions, NoSQL',
      resources: [
        { id: '30', title: 'DBMS Complete Notes', type: 'Notes', uploader: 'Prof. Database', views: 978, downloads: 423, uploadedAt: '2024-03-15' },
        { id: '31', title: 'SQL Query Practice', type: 'Notes', uploader: 'DB Expert', views: 756, downloads: 334, uploadedAt: '2024-03-13' },
        { id: '32', title: 'MongoDB Tutorial', type: 'External Link', uploader: 'Web Dev Club', views: 634, downloads: 278, uploadedAt: '2024-03-11' }
      ]
    },
    'Computer Networks': {
      name: 'Computer Networks',
      icon: '🌐',
      description: 'OSI Model, TCP/IP, Routing, Security',
      resources: [
        { id: '33', title: 'Computer Networks Complete', type: 'Notes', uploader: 'Network Pro', views: 867, downloads: 389, uploadedAt: '2024-03-15' },
        { id: '34', title: 'Network Security Notes', type: 'Notes', uploader: 'Cyber Expert', views: 645, downloads: 287, uploadedAt: '2024-03-13' },
        { id: '35', title: 'Networking PYQ Collection', type: 'PYQ', uploader: 'IT Society', views: 534, downloads: 234, uploadedAt: '2024-03-11' }
      ]
    },
    'Software Engineering': {
      name: 'Software Engineering',
      icon: '🏗️',
      description: 'SDLC, Design Patterns, Testing, Project Management',
      resources: [
        { id: '36', title: 'Software Engineering Principles', type: 'Notes', uploader: 'Prof. SE', views: 723, downloads: 312, uploadedAt: '2024-03-14' },
        { id: '37', title: 'Design Patterns Guide', type: 'Notes', uploader: 'Design Expert', views: 612, downloads: 267, uploadedAt: '2024-03-12' },
        { id: '38', title: 'Agile Development Tutorial', type: 'External Link', uploader: 'Dev Community', views: 498, downloads: 223, uploadedAt: '2024-03-10' }
      ]
    }
  },
  // Mechanical Engineering
  'me-sem1': {
    'Mathematics-I': {
      name: 'Mathematics-I',
      icon: '📐',
      description: 'Engineering Mathematics, Calculus, Algebra',
      resources: [
        { id: '39', title: 'Engineering Math Complete', type: 'Notes', uploader: 'Dr. Math', views: 1089, downloads: 467, uploadedAt: '2024-03-15' },
        { id: '40', title: 'Calculus for Engineers', type: 'Notes', uploader: 'Prof. Calc', views: 823, downloads: 356, uploadedAt: '2024-03-13' },
        { id: '41', title: 'Math-I Previous Years', type: 'PYQ', uploader: 'ME Society', views: 698, downloads: 298, uploadedAt: '2024-03-11' }
      ]
    },
    'Physics': {
      name: 'Physics',
      icon: '⚡',
      description: 'Mechanics, Thermodynamics, Properties of Matter',
      resources: [
        { id: '42', title: 'Engineering Physics Notes', type: 'Notes', uploader: 'Physics Prof', views: 756, downloads: 334, uploadedAt: '2024-03-14' },
        { id: '43', title: 'Physics Lab Experiments', type: 'Notes', uploader: 'Lab Team', views: 634, downloads: 278, uploadedAt: '2024-03-12' },
        { id: '44', title: 'Physics Theory & Practice', type: 'External Link', uploader: 'Science Club', views: 512, downloads: 223, uploadedAt: '2024-03-10' }
      ]
    },
    'Chemistry': {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Physical Chemistry, Materials Science',
      resources: [
        { id: '45', title: 'Engineering Chemistry', type: 'Notes', uploader: 'Chem Expert', views: 567, downloads: 245, uploadedAt: '2024-03-13' },
        { id: '46', title: 'Materials Chemistry Guide', type: 'Notes', uploader: 'Material Scientist', views: 445, downloads: 198, uploadedAt: '2024-03-11' },
        { id: '47', title: 'Chemistry Lab Manual', type: 'Notes', uploader: 'Lab Assistant', views: 389, downloads: 167, uploadedAt: '2024-03-09' }
      ]
    },
    'Engineering Drawing': {
      name: 'Engineering Drawing',
      icon: '📏',
      description: 'Technical Drawing, Projections, CAD',
      resources: [
        { id: '48', title: 'Engineering Drawing Complete', type: 'Notes', uploader: 'Drawing Prof', views: 634, downloads: 278, uploadedAt: '2024-03-14' },
        { id: '49', title: 'AutoCAD Tutorial Series', type: 'External Link', uploader: 'CAD Club', views: 512, downloads: 234, uploadedAt: '2024-03-12' },
        { id: '50', title: 'Technical Drawing Standards', type: 'Notes', uploader: 'Design Team', views: 423, downloads: 189, uploadedAt: '2024-03-10' }
      ]
    }
  },
  'me-sem2': {
    'Mathematics-II': {
      name: 'Mathematics-II',
      icon: '📊',
      description: 'Differential Equations, Vector Calculus',
      resources: [
        { id: '51', title: 'Advanced Engineering Math', type: 'Notes', uploader: 'Math Expert', views: 789, downloads: 345, uploadedAt: '2024-03-15' },
        { id: '52', title: 'Differential Equations Solved', type: 'Notes', uploader: 'Equation Master', views: 656, downloads: 287, uploadedAt: '2024-03-13' },
        { id: '53', title: 'Vector Calculus Applications', type: 'Notes', uploader: 'Vector Pro', views: 534, downloads: 234, uploadedAt: '2024-03-11' }
      ]
    },
    'Thermodynamics': {
      name: 'Thermodynamics',
      icon: '🔥',
      description: 'Laws of Thermodynamics, Heat Transfer, Cycles',
      resources: [
        { id: '54', title: 'Thermodynamics Complete Course', type: 'Notes', uploader: 'Thermo Expert', views: 1234, downloads: 534, uploadedAt: '2024-03-16' },
        { id: '55', title: 'Heat Transfer Problems', type: 'Notes', uploader: 'Heat Master', views: 967, downloads: 423, uploadedAt: '2024-03-14' },
        { id: '56', title: 'Thermodynamics PYQ 2019-2024', type: 'PYQ', uploader: 'ME Alumni', views: 823, downloads: 367, uploadedAt: '2024-03-12' },
        { id: '57', title: 'Thermal Cycles Explained', type: 'External Link', uploader: 'Energy Club', views: 698, downloads: 298, uploadedAt: '2024-03-10' }
      ]
    },
    'Mechanics': {
      name: 'Mechanics',
      icon: '⚙️',
      description: 'Statics, Dynamics, Strength of Materials',
      resources: [
        { id: '58', title: 'Engineering Mechanics Complete', type: 'Notes', uploader: 'Mechanics Pro', views: 1089, downloads: 467, uploadedAt: '2024-03-15' },
        { id: '59', title: 'Statics Problem Solutions', type: 'Notes', uploader: 'Static Expert', views: 856, downloads: 378, uploadedAt: '2024-03-13' },
        { id: '60', title: 'Dynamics Applications', type: 'Notes', uploader: 'Dynamic Master', views: 723, downloads: 312, uploadedAt: '2024-03-11' }
      ]
    },
    'Material Science': {
      name: 'Material Science',
      icon: '🔬',
      description: 'Properties, Crystal Structure, Phase Diagrams',
      resources: [
        { id: '61', title: 'Materials Science Complete', type: 'Notes', uploader: 'Material Expert', views: 645, downloads: 287, uploadedAt: '2024-03-14' },
        { id: '62', title: 'Crystal Structure Guide', type: 'Notes', uploader: 'Crystal Pro', views: 534, downloads: 234, uploadedAt: '2024-03-12' },
        { id: '63', title: 'Phase Diagrams Explained', type: 'Notes', uploader: 'Phase Master', views: 456, downloads: 198, uploadedAt: '2024-03-10' }
      ]
    }
  },
  // Electronics & Communication Engineering
  'ece-sem1': {
    'Mathematics-I': {
      name: 'Mathematics-I',
      icon: '📐',
      description: 'Engineering Mathematics, Complex Numbers',
      resources: [
        { id: '64', title: 'Engineering Math for ECE', type: 'Notes', uploader: 'Math ECE Prof', views: 923, downloads: 412, uploadedAt: '2024-03-15' },
        { id: '65', title: 'Complex Analysis Notes', type: 'Notes', uploader: 'Complex Expert', views: 756, downloads: 334, uploadedAt: '2024-03-13' },
        { id: '66', title: 'Math-I ECE PYQ', type: 'PYQ', uploader: 'ECE Society', views: 634, downloads: 278, uploadedAt: '2024-03-11' }
      ]
    },
    'Physics': {
      name: 'Physics',
      icon: '⚡',
      description: 'Electromagnetic Theory, Optics, Modern Physics',
      resources: [
        { id: '67', title: 'Physics for Electronics', type: 'Notes', uploader: 'Physics ECE', views: 845, downloads: 367, uploadedAt: '2024-03-14' },
        { id: '68', title: 'Electromagnetic Waves', type: 'Notes', uploader: 'EM Expert', views: 698, downloads: 298, uploadedAt: '2024-03-12' },
        { id: '69', title: 'Modern Physics Applications', type: 'External Link', uploader: 'Physics Club', views: 567, downloads: 245, uploadedAt: '2024-03-10' }
      ]
    },
    'Chemistry': {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Electronic Materials, Semiconductor Chemistry',
      resources: [
        { id: '70', title: 'Electronic Materials Chemistry', type: 'Notes', uploader: 'Chem Electronics', views: 512, downloads: 223, uploadedAt: '2024-03-13' },
        { id: '71', title: 'Semiconductor Properties', type: 'Notes', uploader: 'Semi Expert', views: 445, downloads: 198, uploadedAt: '2024-03-11' },
        { id: '72', title: 'Materials for Electronics', type: 'Notes', uploader: 'Material ECE', views: 389, downloads: 167, uploadedAt: '2024-03-09' }
      ]
    },
    'Basic Electronics': {
      name: 'Basic Electronics',
      icon: '🔋',
      description: 'Circuit Elements, Ohms Law, Basic Components',
      resources: [
        { id: '73', title: 'Basic Electronics Complete', type: 'Notes', uploader: 'Electronics Prof', views: 1156, downloads: 512, uploadedAt: '2024-03-16' },
        { id: '74', title: 'Circuit Analysis Fundamentals', type: 'Notes', uploader: 'Circuit Master', views: 934, downloads: 423, uploadedAt: '2024-03-14' },
        { id: '75', title: 'Electronics Lab Manual', type: 'Notes', uploader: 'Lab ECE', views: 767, downloads: 334, uploadedAt: '2024-03-12' }
      ]
    }
  },
  'ece-sem2': {
    'Mathematics-II': {
      name: 'Mathematics-II',
      icon: '📊',
      description: 'Fourier Series, Laplace Transforms, Statistics',
      resources: [
        { id: '76', title: 'Advanced Math for ECE', type: 'Notes', uploader: 'Advanced Math Prof', views: 823, downloads: 356, uploadedAt: '2024-03-15' },
        { id: '77', title: 'Fourier Analysis Complete', type: 'Notes', uploader: 'Fourier Expert', views: 698, downloads: 298, uploadedAt: '2024-03-13' },
        { id: '78', title: 'Laplace Transform Applications', type: 'Notes', uploader: 'Transform Master', views: 567, downloads: 245, uploadedAt: '2024-03-11' }
      ]
    },
    'Circuit Analysis': {
      name: 'Circuit Analysis',
      icon: '🔌',
      description: 'Network Theorems, AC/DC Analysis, Filters',
      resources: [
        { id: '79', title: 'Circuit Analysis Complete', type: 'Notes', uploader: 'Circuit Expert', views: 1089, downloads: 478, uploadedAt: '2024-03-16' },
        { id: '80', title: 'Network Theorems Guide', type: 'Notes', uploader: 'Network Pro', views: 867, downloads: 389, uploadedAt: '2024-03-14' },
        { id: '81', title: 'AC Circuit Analysis', type: 'Notes', uploader: 'AC Expert', views: 723, downloads: 312, uploadedAt: '2024-03-12' },
        { id: '82', title: 'Circuit PYQ Solutions', type: 'PYQ', uploader: 'ECE Alumni', views: 634, downloads: 278, uploadedAt: '2024-03-10' }
      ]
    },
    'Digital Electronics': {
      name: 'Digital Electronics',
      icon: '💾',
      description: 'Logic Gates, Boolean Algebra, Combinational Circuits',
      resources: [
        { id: '83', title: 'Digital Electronics Complete', type: 'Notes', uploader: 'Digital Prof', views: 1234, downloads: 534, uploadedAt: '2024-03-16' },
        { id: '84', title: 'Logic Design Problems', type: 'Notes', uploader: 'Logic Master', views: 967, downloads: 423, uploadedAt: '2024-03-14' },
        { id: '85', title: 'Boolean Algebra Simplified', type: 'Notes', uploader: 'Boolean Expert', views: 823, downloads: 367, uploadedAt: '2024-03-12' }
      ]
    },
    'Signals & Systems': {
      name: 'Signals & Systems',
      icon: '📡',
      description: 'Signal Processing, System Analysis, Transforms',
      resources: [
        { id: '86', title: 'Signals & Systems Complete', type: 'Notes', uploader: 'Signal Expert', views: 945, downloads: 412, uploadedAt: '2024-03-15' },
        { id: '87', title: 'Signal Processing Basics', type: 'Notes', uploader: 'DSP Master', views: 756, downloads: 334, uploadedAt: '2024-03-13' },
        { id: '88', title: 'System Analysis Methods', type: 'External Link', uploader: 'Signal Club', views: 634, downloads: 278, uploadedAt: '2024-03-11' }
      ]
    }
  },
  // Electrical Engineering
  'ee-sem1': {
    'Mathematics-I': {
      name: 'Mathematics-I',
      icon: '📐',
      description: 'Engineering Mathematics, Vector Analysis',
      resources: [
        { id: '89', title: 'Engineering Math for EE', type: 'Notes', uploader: 'EE Math Prof', views: 867, downloads: 378, uploadedAt: '2024-03-15' },
        { id: '90', title: 'Vector Analysis Applications', type: 'Notes', uploader: 'Vector EE Expert', views: 723, downloads: 312, uploadedAt: '2024-03-13' },
        { id: '91', title: 'Math-I EE PYQ Collection', type: 'PYQ', uploader: 'EE Society', views: 612, downloads: 267, uploadedAt: '2024-03-11' }
      ]
    },
    'Physics': {
      name: 'Physics',
      icon: '⚡',
      description: 'Electromagnetism, Electric Fields, Magnetic Fields',
      resources: [
        { id: '92', title: 'Physics for Electrical', type: 'Notes', uploader: 'Physics EE', views: 789, downloads: 345, uploadedAt: '2024-03-14' },
        { id: '93', title: 'Electromagnetic Theory', type: 'Notes', uploader: 'EM Theory Expert', views: 656, downloads: 287, uploadedAt: '2024-03-12' },
        { id: '94', title: 'Electric Field Applications', type: 'Notes', uploader: 'Field Master', views: 534, downloads: 234, uploadedAt: '2024-03-10' }
      ]
    },
    'Chemistry': {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Electrochemistry, Battery Technology, Corrosion',
      resources: [
        { id: '95', title: 'Electrochemistry for EE', type: 'Notes', uploader: 'Electrochem Expert', views: 498, downloads: 213, uploadedAt: '2024-03-13' },
        { id: '96', title: 'Battery Technology Guide', type: 'Notes', uploader: 'Battery Pro', views: 423, downloads: 189, uploadedAt: '2024-03-11' },
        { id: '97', title: 'Corrosion Prevention Methods', type: 'External Link', uploader: 'Material EE', views: 356, downloads: 156, uploadedAt: '2024-03-09' }
      ]
    },
    'Basic Electrical Engineering': {
      name: 'Basic Electrical Engineering',
      icon: '⚡',
      description: 'DC/AC Circuits, Electrical Machines Basics',
      resources: [
        { id: '98', title: 'Basic Electrical Complete', type: 'Notes', uploader: 'Basic EE Prof', views: 1345, downloads: 589, uploadedAt: '2024-03-16' },
        { id: '99', title: 'DC Circuit Analysis', type: 'Notes', uploader: 'DC Expert', views: 1123, downloads: 498, uploadedAt: '2024-03-14' },
        { id: '100', title: 'AC Fundamentals', type: 'Notes', uploader: 'AC Master', views: 934, downloads: 412, uploadedAt: '2024-03-12' }
      ]
    }
  },
  // Civil Engineering
  'ce-sem1': {
    'Mathematics-I': {
      name: 'Mathematics-I',
      icon: '📐',
      description: 'Engineering Mathematics, Surveying Math',
      resources: [
        { id: '101', title: 'Engineering Math for Civil', type: 'Notes', uploader: 'Civil Math Prof', views: 756, downloads: 334, uploadedAt: '2024-03-15' },
        { id: '102', title: 'Surveying Mathematics', type: 'Notes', uploader: 'Survey Expert', views: 634, downloads: 278, uploadedAt: '2024-03-13' },
        { id: '103', title: 'Math-I Civil PYQ', type: 'PYQ', uploader: 'CE Society', views: 534, downloads: 234, uploadedAt: '2024-03-11' }
      ]
    },
    'Physics': {
      name: 'Physics',
      icon: '⚡',
      description: 'Mechanics, Properties of Matter, Waves',
      resources: [
        { id: '104', title: 'Physics for Civil Engineers', type: 'Notes', uploader: 'Physics Civil', views: 698, downloads: 298, uploadedAt: '2024-03-14' },
        { id: '105', title: 'Material Properties Physics', type: 'Notes', uploader: 'Material Physics', views: 567, downloads: 245, uploadedAt: '2024-03-12' },
        { id: '106', title: 'Wave Mechanics Applications', type: 'Notes', uploader: 'Wave Expert', views: 456, downloads: 198, uploadedAt: '2024-03-10' }
      ]
    },
    'Chemistry': {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Cement Chemistry, Construction Materials',
      resources: [
        { id: '107', title: 'Construction Chemistry', type: 'Notes', uploader: 'Construction Chem', views: 445, downloads: 198, uploadedAt: '2024-03-13' },
        { id: '108', title: 'Cement & Concrete Chemistry', type: 'Notes', uploader: 'Concrete Expert', views: 389, downloads: 167, uploadedAt: '2024-03-11' },
        { id: '109', title: 'Building Materials Chemistry', type: 'Notes', uploader: 'Material Chem', views: 334, downloads: 145, uploadedAt: '2024-03-09' }
      ]
    },
    'Engineering Drawing': {
      name: 'Engineering Drawing',
      icon: '📏',
      description: 'Civil Drawing, Plans, Elevations, Sections',
      resources: [
        { id: '110', title: 'Civil Engineering Drawing', type: 'Notes', uploader: 'Drawing Civil', views: 612, downloads: 267, uploadedAt: '2024-03-14' },
        { id: '111', title: 'Building Plans & Sections', type: 'Notes', uploader: 'Plan Expert', views: 523, downloads: 228, uploadedAt: '2024-03-12' },
        { id: '112', title: 'AutoCAD for Civil', type: 'External Link', uploader: 'CAD Civil', views: 456, downloads: 198, uploadedAt: '2024-03-10' }
      ]
    }
  },
  // Architecture
  'arch-sem1': {
    'Architectural Drawing': {
      name: 'Architectural Drawing',
      icon: '🏛️',
      description: 'Basic Drawing, Sketching, Drafting Techniques',
      resources: [
        { id: '113', title: 'Architectural Drawing Basics', type: 'Notes', uploader: 'Arch Drawing Prof', views: 567, downloads: 245, uploadedAt: '2024-03-15' },
        { id: '114', title: 'Sketching Techniques Guide', type: 'Notes', uploader: 'Sketch Master', views: 456, downloads: 198, uploadedAt: '2024-03-13' },
        { id: '115', title: 'Technical Drawing Standards', type: 'Notes', uploader: 'Tech Draw Expert', views: 389, downloads: 167, uploadedAt: '2024-03-11' }
      ]
    },
    'History of Architecture': {
      name: 'History of Architecture',
      icon: '🏺',
      description: 'Ancient, Medieval, Modern Architecture',
      resources: [
        { id: '116', title: 'Ancient Architecture Study', type: 'Notes', uploader: 'History Prof', views: 423, downloads: 189, uploadedAt: '2024-03-14' },
        { id: '117', title: 'Medieval Architecture Guide', type: 'Notes', uploader: 'Medieval Expert', views: 356, downloads: 156, uploadedAt: '2024-03-12' },
        { id: '118', title: 'Modern Architecture Movements', type: 'External Link', uploader: 'Modern Arch', views: 298, downloads: 134, uploadedAt: '2024-03-10' }
      ]
    },
    'Basic Design': {
      name: 'Basic Design',
      icon: '🎨',
      description: 'Design Principles, Color Theory, Composition',
      resources: [
        { id: '119', title: 'Design Principles Complete', type: 'Notes', uploader: 'Design Prof', views: 634, downloads: 278, uploadedAt: '2024-03-15' },
        { id: '120', title: 'Color Theory for Architects', type: 'Notes', uploader: 'Color Expert', views: 512, downloads: 223, uploadedAt: '2024-03-13' },
        { id: '121', title: 'Composition Techniques', type: 'Notes', uploader: 'Composition Master', views: 445, downloads: 198, uploadedAt: '2024-03-11' }
      ]
    }
  },
  'cse-sem4': {
    'Operating Systems': {
      name: 'Operating Systems',
      icon: '🧠',
      description: 'Processes, Threads, Scheduling, Memory, File Systems',
      resources: [
        { id: '122', title: 'Operating Systems Notes', type: 'Notes', uploader: 'Prof. OS', views: 1123, downloads: 498, uploadedAt: '2024-03-17' },
        { id: '123', title: 'OS Scheduling Algorithms', type: 'Notes', uploader: 'Kernel Dev', views: 845, downloads: 367, uploadedAt: '2024-03-15' },
        { id: '124', title: 'OS PYQ 2019-2024', type: 'PYQ', uploader: 'CS Society', views: 678, downloads: 298, uploadedAt: '2024-03-13' }
      ]
    },
    'Compiler Design': {
      name: 'Compiler Design',
      icon: '🛠️',
      description: 'Lexing, Parsing, Semantic Analysis, Code Gen, Optimization',
      resources: [
        { id: '125', title: 'Compiler Design Complete', type: 'Notes', uploader: 'Prof. Compilers', views: 934, downloads: 412, uploadedAt: '2024-03-16' },
        { id: '126', title: 'LL(1) and LR Parsing', type: 'Notes', uploader: 'Parse Master', views: 789, downloads: 345, uploadedAt: '2024-03-14' },
        { id: '127', title: 'Dragon Book Resources', type: 'External Link', uploader: 'Reading Group', views: 567, downloads: 245, uploadedAt: '2024-03-12' }
      ]
    },
    'Web Technologies': {
      name: 'Web Technologies',
      icon: '🌐',
      description: 'HTML, CSS, JavaScript, HTTP, Backend Basics',
      resources: [
        { id: '128', title: 'Full-Stack Web Notes', type: 'Notes', uploader: 'Web Dev Club', views: 1023, downloads: 456, uploadedAt: '2024-03-17' },
        { id: '129', title: 'REST and HTTP Guide', type: 'Notes', uploader: 'API Expert', views: 678, downloads: 289, uploadedAt: '2024-03-15' },
        { id: '130', title: 'MDN Web Docs', type: 'External Link', uploader: 'Mozilla', views: 845, downloads: 367, uploadedAt: '2024-03-13' }
      ]
    },
    'Computer Organization': {
      name: 'Computer Organization',
      icon: '🧩',
      description: 'CPU, Memory Hierarchy, Pipelining, ISA',
      resources: [
        { id: '131', title: 'COA Complete Notes', type: 'Notes', uploader: 'Prof. Arch', views: 889, downloads: 372, uploadedAt: '2024-03-16' },
        { id: '132', title: 'MIPS and Pipelining', type: 'Notes', uploader: 'Arch Enthusiast', views: 634, downloads: 268, uploadedAt: '2024-03-14' },
        { id: '133', title: 'COA PYQ Collection', type: 'PYQ', uploader: 'CSE Alumni', views: 578, downloads: 241, uploadedAt: '2024-03-12' }
      ]
    }
  },
  'cse-sem5': {
    'Machine Learning': {
      name: 'Machine Learning',
      icon: '🤖',
      description: 'Supervised/Unsupervised, Regression, Classification, NN',
      resources: [
        { id: '134', title: 'ML Algorithms Notes', type: 'Notes', uploader: 'Dr. ML', views: 1534, downloads: 678, uploadedAt: '2024-03-18' },
        { id: '135', title: 'Hands-on ML Notebooks', type: 'External Link', uploader: 'Data Club', views: 1123, downloads: 498, uploadedAt: '2024-03-16' },
        { id: '136', title: 'ML PYQ with Solutions', type: 'PYQ', uploader: 'ML Society', views: 845, downloads: 367, uploadedAt: '2024-03-15' }
      ]
    },
    'Computer Graphics': {
      name: 'Computer Graphics',
      icon: '🎮',
      description: 'Rendering, Transformations, Shaders, OpenGL',
      resources: [
        { id: '137', title: 'CG Fundamentals', type: 'Notes', uploader: 'Graphics Prof', views: 978, downloads: 423, uploadedAt: '2024-03-17' },
        { id: '138', title: 'OpenGL Tutorial', type: 'External Link', uploader: 'Graphics Club', views: 756, downloads: 334, uploadedAt: '2024-03-15' },
        { id: '139', title: 'Graphics PYQ', type: 'PYQ', uploader: 'CG Alumni', views: 612, downloads: 267, uploadedAt: '2024-03-13' }
      ]
    },
    'Mobile Computing': {
      name: 'Mobile Computing',
      icon: '📱',
      description: 'Android/iOS Basics, Wireless, Mobile Networks',
      resources: [
        { id: '140', title: 'Mobile Systems Notes', type: 'Notes', uploader: 'Mobile Prof', views: 834, downloads: 356, uploadedAt: '2024-03-16' },
        { id: '141', title: 'Android Dev Guide', type: 'External Link', uploader: 'Dev Community', views: 723, downloads: 312, uploadedAt: '2024-03-14' },
        { id: '142', title: 'Mobile Computing PYQ', type: 'PYQ', uploader: 'CSE Council', views: 589, downloads: 245, uploadedAt: '2024-03-12' }
      ]
    },
    'Distributed Systems': {
      name: 'Distributed Systems',
      icon: '🕸️',
      description: 'Consensus, Replication, Fault Tolerance, Microservices',
      resources: [
        { id: '143', title: 'Distributed Systems Notes', type: 'Notes', uploader: 'Systems Prof', views: 945, downloads: 412, uploadedAt: '2024-03-18' },
        { id: '144', title: 'Raft and Paxos Overview', type: 'Notes', uploader: 'Consensus Lab', views: 789, downloads: 345, uploadedAt: '2024-03-16' },
        { id: '145', title: 'MIT 6.824 Resources', type: 'External Link', uploader: 'Open Courseware', views: 1234, downloads: 534, uploadedAt: '2024-03-15' }
      ]
    }
  },
  'cse-sem6': {
    'Artificial Intelligence': {
      name: 'Artificial Intelligence',
      icon: '��',
      description: 'Search, Knowledge Representation, Planning, NLP',
      resources: [
        { id: '146', title: 'AI Fundamentals Notes', type: 'Notes', uploader: 'AI Prof', views: 978, downloads: 423, uploadedAt: '2024-03-19' },
        { id: '147', title: 'AIMA Exercises', type: 'Notes', uploader: 'Study Group', views: 789, downloads: 345, uploadedAt: '2024-03-17' },
        { id: '148', title: 'AI PYQ', type: 'PYQ', uploader: 'AI Society', views: 634, downloads: 278, uploadedAt: '2024-03-15' }
      ]
    },
    'Cloud Computing': {
      name: 'Cloud Computing',
      icon: '☁️',
      description: 'IaaS, PaaS, SaaS, Containers, Orchestration',
      resources: [
        { id: '149', title: 'Cloud Concepts Notes', type: 'Notes', uploader: 'Cloud Prof', views: 845, downloads: 367, uploadedAt: '2024-03-18' },
        { id: '150', title: 'Kubernetes Basics', type: 'External Link', uploader: 'CNCF', views: 1123, downloads: 498, uploadedAt: '2024-03-16' },
        { id: '151', title: 'Cloud Computing PYQ', type: 'PYQ', uploader: 'Cloud Alumni', views: 678, downloads: 298, uploadedAt: '2024-03-14' }
      ]
    },
    'Information Security': {
      name: 'Information Security',
      icon: '🔐',
      description: 'Cryptography, Network Security, Access Control',
      resources: [
        { id: '152', title: 'Infosec Complete Notes', type: 'Notes', uploader: 'Security Prof', views: 923, downloads: 412, uploadedAt: '2024-03-19' },
        { id: '153', title: 'Applied Cryptography Guide', type: 'Notes', uploader: 'Crypto Lab', views: 756, downloads: 334, uploadedAt: '2024-03-17' },
        { id: '154', title: 'OWASP Top 10', type: 'External Link', uploader: 'OWASP', views: 1345, downloads: 589, uploadedAt: '2024-03-15' }
      ]
    },
    'Big Data Analytics': {
      name: 'Big Data Analytics',
      icon: '🗃️',
      description: 'Hadoop, Spark, Data Lakes, Stream Processing',
      resources: [
        { id: '155', title: 'Big Data Notes', type: 'Notes', uploader: 'Data Prof', views: 834, downloads: 356, uploadedAt: '2024-03-18' },
        { id: '156', title: 'Spark Programming Guide', type: 'External Link', uploader: 'Apache', views: 1123, downloads: 498, uploadedAt: '2024-03-16' },
        { id: '157', title: 'Big Data PYQ', type: 'PYQ', uploader: 'Data Alumni', views: 678, downloads: 298, uploadedAt: '2024-03-14' }
      ]
    }
  }
};

const SubjectResourceView = ({ branch, semester, branchName, semesterName }: SubjectResourceViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openId, setOpenId] = useState<string | null>(null);

  const subjectKey = `${branch}-${semester}` as keyof typeof subjectData;
  const subjects = subjectData[subjectKey] || {};

  useEffect(() => {
    setOpenId(null);
  }, [subjectKey]);

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const allResourcesList: Resource[] = Object.values(subjects).flatMap((s) => s.resources || []);
  const totalResources = allResourcesList.length;
  const notesCount = allResourcesList.filter((r) => r.type === 'Notes').length;
  const pyqCount = allResourcesList.filter((r) => r.type === 'PYQ').length;
  const linkCount = allResourcesList.filter((r) => r.type === 'External Link').length;

  const sortResources = (arr: Resource[]) => {
    const copy = arr.slice();
    switch (sortBy) {
      case 'popular':
        copy.sort((a, b) => b.views - a.views);
        break;
      case 'downloads':
        copy.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
      default:
        copy.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
    }
    return copy;
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Notes': return <FileText className="w-4 h-4" />;
      case 'PYQ': return <BookOpen className="w-4 h-4" />;
      case 'External Link': return <ExternalLink className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getResourceBadgeColor = (type: string) => {
    switch (type) {
      case 'Notes': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PYQ': return 'bg-green-100 text-green-800 border-green-200';
      case 'External Link': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredSubjects = Object.entries(subjects).filter(([_, subject]) => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handlePreview = (resourceId: string) => {
    console.log('Preview resource:', resourceId);
  };

  const handleDownload = (resourceId: string) => {
    console.log('Download resource:', resourceId);
  };

  const mapToResourceCardData = (r: Resource, subjectName: string) => ({
    id: r.id,
    title: r.title,
    description: `${subjectName} • ${r.type}`,
    branch: branchName,
    year: semesterName,
    category: r.type === 'PYQ' ? 'Previous Year Questions' : (r.type === 'External Link' ? 'External Links' : 'Notes'),
    tags: [subjectName, r.type],
    uploader: r.uploader,
    uploadedAt: r.uploadedAt,
    type: r.type === 'External Link' ? 'link' as const : 'file' as const,
    views: r.views,
    downloads: r.downloads,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{branchName}</h2>
        <p className="text-muted-foreground">
          {semesterName} • {Object.keys(subjects).length} Subjects • {totalResources} Resources
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border border-blue-200">Notes: {notesCount}</Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-200">PYQ: {pyqCount}</Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border border-purple-200">Links: {linkCount}</Badge>
        </div>
      </div>

      {/* Quick Subject Nav */}
      {Object.keys(subjects).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.keys(subjects).map((key) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(`subject-${slugify(key)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {key}
            </Button>
          ))}
        </div>
      )}

      {/* Search and Filters */}
      <Card className="border-2 sticky top-4 z-10 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search subjects or resources"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-44">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Notes">Notes</SelectItem>
                    <SelectItem value="PYQ">Previous Papers</SelectItem>
                    <SelectItem value="External Link">External Links</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Newest First" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Showing {totalResources} total resources</span>
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <ListIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects */}
      <div className="grid gap-8">
        {filteredSubjects.map(([subjectId, subject]) => (
          <Collapsible key={subjectId} open={openId === subjectId} onOpenChange={(v) => setOpenId(v ? subjectId : null)}>
            <Card id={`subject-${slugify(subjectId)}`} className="border-2 hover:shadow-medium transition-shadow">
            <CardHeader className="py-4">
              <CollapsibleTrigger asChild>
                <button className="w-full">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{subject.icon}</div>
                    <div className="flex-1 text-left">
                      <CardTitle className="text-xl text-primary">{subject.name}</CardTitle>
                      <p className="text-muted-foreground text-sm mt-1">{subject.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {subject.resources.length} Resources
                    </Badge>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openId === subjectId ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
              <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All ({subject.resources.length})</TabsTrigger>
                  <TabsTrigger value="Notes">Notes ({subject.resources.filter(r => r.type === 'Notes').length})</TabsTrigger>
                  <TabsTrigger value="PYQ">PYQs ({subject.resources.filter(r => r.type === 'PYQ').length})</TabsTrigger>
                  <TabsTrigger value="External Link">Links ({subject.resources.filter(r => r.type === 'External Link').length})</TabsTrigger>
                </TabsList>

                {['all', 'Notes', 'PYQ', 'External Link'].map((tabType) => (
                  <TabsContent key={tabType} value={tabType} className="mt-6">
                    <div className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-4'
                    }>
                      {sortResources(
                        subject.resources
                          .filter(resource => (tabType === 'all' || resource.type === tabType))
                          .filter(resource => (filterType === 'all' || resource.type === filterType))
                          .filter(resource => (
                            searchTerm.trim() === '' ||
                            resource.title.toLowerCase().includes(searchTerm.toLowerCase())
                          ))
                      ).map((resource) => (
                        <ResourceCard
                          key={resource.id}
                          resource={mapToResourceCardData(resource, subject.name)}
                          onPreview={handlePreview}
                          onDownload={handleDownload}
                          viewMode={viewMode}
                        />
                      ))}
                    </div>

                    {/* In list view with no items, still show empty state spacing */}
                    {sortResources(
                      subject.resources
                        .filter(resource => (tabType === 'all' || resource.type === tabType))
                        .filter(resource => (filterType === 'all' || resource.type === filterType))
                        .filter(resource => (
                          searchTerm.trim() === '' ||
                          resource.title.toLowerCase().includes(searchTerm.toLowerCase())
                        ))
                    ).length === 0 && (
                      <div className="text-center text-sm text-muted-foreground py-6">No resources match the current filters.</div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
          </Collapsible>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No subjects found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Resources for this combination are being added soon'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectResourceView;
