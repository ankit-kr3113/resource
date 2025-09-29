import { toast } from "@/components/ui/sonner";

export type roleKey = 'viewer' | 'contributor' | 'admin' | 'superAdmin';
export type Role = 'viewer' | 'contributor' | 'admin' | 'super-admin';

type BasicUser = { name: string; email: string; photoUrl: string; role: Role };

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

  if (key === 'contributor' && (d as any).submissions) {
    mergeSubmissions((d as any).submissions);
  }
  if (key === 'admin') {
    const seed: any[] = [
      ...((d as any).moderation?.recentApproved || []).map((r: any) => ({ id: r.id, title: r.title, branch: 'Mechanical', year: '3rd Year', category: 'Notes', status: 'Approved', date: r.date, uploaderEmail: 'unknown@college.edu' })),
      ...Array.from({ length: (d as any).moderation?.pendingCount || 0 }).map((_, i) => ({ id: `seed_pending_${i+1}`, title: `Pending Submission #${i+1}`, branch: 'Mechanical', year: '3rd Year', category: 'PYQ', status: 'Pending', date: new Date().toISOString(), uploaderEmail: 'someone@college.edu' })),
    ];
    mergeSubmissions(seed);
  }
};

const customUsersKey = 'users:custom';
const getCustomUsers = (): BasicUser[] => {
  const raw = localStorage.getItem(customUsersKey);
  return raw ? JSON.parse(raw) : [];
};
const saveCustomUsers = (users: BasicUser[]) => {
  localStorage.setItem(customUsersKey, JSON.stringify(users));
};

const findHardUserByEmail = (email: string): { key: roleKey; user: BasicUser } | null => {
  const entries = Object.entries(HARD_USERS) as [roleKey, any][];
  for (const [key, data] of entries) {
    if (data.user.email.toLowerCase() === email.toLowerCase()) return { key, user: data.user };
  }
  return null;
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

export const signInWithGoogleDefault = () => {
  // Test account for demo "Continue with Google"
  signIn('viewer');
};

export const signInWithGoogleEmail = (email: string): { ok: true } | { ok: false; reason: 'not_found' } => {
  const hard = findHardUserByEmail(email);
  if (hard) {
    signIn(hard.key);
    return { ok: true };
  }
  const custom = getCustomUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  if (custom) {
    localStorage.setItem('currentUser', JSON.stringify(custom));
    window.dispatchEvent(new Event('auth:changed'));
    toast.success(`Signed in as ${custom.name} (${custom.role})`);
    return { ok: true };
  }
  return { ok: false, reason: 'not_found' };
};

export const createAccountWithGoogle = (name: string, email: string) => {
  const existsHard = findHardUserByEmail(email);
  const customUsers = getCustomUsers();
  const existsCustom = customUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existsHard || existsCustom) {
    return signInWithGoogleEmail(email);
  }
  const imgId = Math.max(1, Math.min(70, Math.abs(hashCode(email)) % 70));
  const newUser: BasicUser = {
    name,
    email,
    photoUrl: `https://i.pravatar.cc/100?img=${imgId}`,
    role: 'viewer',
  };
  const next = [...customUsers, newUser];
  saveCustomUsers(next);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  window.dispatchEvent(new Event('auth:changed'));
  toast.success(`Account created for ${name}`);
  return { ok: true as const };
};

const hashCode = (str: string) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
};

export const hardcodedUsers = HARD_USERS;
