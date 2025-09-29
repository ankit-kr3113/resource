import { toast } from "@/components/ui/sonner";

export type roleKey = 'viewer' | 'contributor' | 'admin' | 'superAdmin';
export type Role = 'viewer' | 'contributor' | 'admin' | 'super-admin';

const HARD_USERS = {
  viewer: {
    user: { name: "Aarav Singh", email: "aarav.singh@example.com", photoUrl: "https://i.pravatar.cc/100?img=12", role: "viewer" as Role },
    preferences: { branch: "CSE", year: "1st Year" },
    stats: { visits: 8, downloads: 3, contributions: 0 },
  },
  contributor: {
    user: { name: "Priya Sharma", email: "priya.sharma@college.edu", photoUrl: "https://i.pravatar.cc/100?img=32", role: "contributor" as Role },
    preferences: { branch: "ECE", year: "2nd Year" },
    stats: { visits: 21, downloads: 9, contributions: 3 },
    submissions: [
      { id: "sub_101", title: "Signals & Systems Notes (Unit 2)", branch: "ECE", year: "2nd Year", category: "Notes", status: "Approved", date: "2025-01-12", uploaderEmail: "priya.sharma@college.edu" },
      { id: "sub_102", title: "Digital Electronics PYQ 2021-24", branch: "ECE", year: "2nd Year", category: "PYQ", status: "Pending", date: "2025-02-03", uploaderEmail: "priya.sharma@college.edu" },
      { id: "sub_103", title: "Great VLSI Lecture Series", branch: "ECE", year: "2nd Year", category: "Other", status: "Rejected", date: "2025-01-28", uploaderEmail: "priya.sharma@college.edu" },
    ],
  },
  admin: {
    user: { name: "Rohan Gupta", email: "rohan.gupta@college.edu", photoUrl: "https://i.pravatar.cc/100?img=57", role: "admin" as Role },
    preferences: { branch: "Mechanical", year: "3rd Year" },
    stats: { visits: 47, downloads: 12, contributions: 1 },
    moderation: {
      pendingCount: 4,
      recentApproved: [
        { id: "sub_201", title: "Thermodynamics Cheat Sheet", date: "2025-02-01" },
        { id: "sub_202", title: "Fluid Mechanics PYQ", date: "2025-01-30" },
        { id: "sub_203", title: "Heat Transfer Notes", date: "2025-01-29" },
      ],
      moderatedResources: [
        { id: "res_501", title: "Machine Design Notes", action: "Approved", date: "2025-01-25" },
        { id: "res_502", title: "Materials Lab Manual", action: "Rejected", date: "2025-01-24" },
      ],
    },
  },
  superAdmin: {
    user: { name: "Admin Root", email: "root.admin@college.edu", photoUrl: "https://i.pravatar.cc/100?img=5", role: "super-admin" as Role },
    preferences: { branch: "CSE", year: "4th Year" },
    stats: { visits: 102, downloads: 5, contributions: 0 },
    systemOverview: { totalAdmins: 3, totalContributors: 42 },
    roleAssignments: [
      { email: "rohan.gupta@college.edu", role: "admin", assignedAt: "2024-12-20" },
      { email: "priya.sharma@college.edu", role: "contributor", assignedAt: "2024-11-05" },
    ],
  },
} as const;

export const getCurrentUser = () => {
  try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); } catch { return null; }
};

const mergeSubmissions = (subs: any[]) => {
  const raw = localStorage.getItem('submissions');
  const arr: any[] = raw ? JSON.parse(raw) : [];
  const byId = new Map<string, any>(arr.map((s) => [s.id, s]));
  subs.forEach((s) => byId.set(s.id, s));
  localStorage.setItem('submissions', JSON.stringify(Array.from(byId.values())));
};

const seedForRole = (key: roleKey) => {
  const d = HARD_USERS[key] as any;
  const email: string = d.user.email || 'anon';
  localStorage.setItem('currentUser', JSON.stringify(d.user));
  localStorage.setItem(`profile:prefs:${email}`, JSON.stringify(d.preferences || {}));
  localStorage.setItem(`profile:stats:${email}`, JSON.stringify(d.stats || { visits: 0, downloads: 0, contributions: 0 }));

  if (key === 'contributor' && d.submissions) {
    mergeSubmissions(d.submissions);
  }
  if (key === 'admin') {
    const seed: any[] = [
      ...(d.moderation?.recentApproved || []).map((r: any) => ({ id: r.id, title: r.title, branch: 'Mechanical', year: '3rd Year', category: 'Notes', status: 'Approved', date: r.date, uploaderEmail: 'unknown@college.edu' })),
      ...Array.from({ length: d.moderation?.pendingCount || 0 }).map((_, i) => ({ id: `seed_pending_${i+1}`, title: `Pending Submission #${i+1}`, branch: 'Mechanical', year: '3rd Year', category: 'PYQ', status: 'Pending', date: new Date().toISOString(), uploaderEmail: 'someone@college.edu' })),
    ];
    mergeSubmissions(seed);
  }
};

export const signIn = (key: roleKey) => {
  seedForRole(key);
  window.dispatchEvent(new Event('auth:changed'));
  const u = HARD_USERS[key].user;
  toast.success(`Signed in as ${u.name} (${u.role})`);
};

export const signOut = () => {
  localStorage.removeItem('currentUser');
  window.dispatchEvent(new Event('auth:changed'));
  toast.success('Signed out');
};

export const hardcodedUsers = HARD_USERS;
