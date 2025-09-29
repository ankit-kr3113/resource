import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link as RouterLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Crown, Download, LogOut, Pencil, Shield, ShieldCheck, ShieldQuestion, Star, Upload, User } from "lucide-react";

// Types
 type Role = "viewer" | "contributor" | "admin" | "super-admin";
 type SubmissionStatus = "Pending" | "Approved" | "Rejected";
 interface SubmissionItem {
  id: string;
  title: string;
  branch: string;
  year: string;
  category: string;
  status: SubmissionStatus;
  date: string; // ISO string
  uploaderEmail: string;
 }

 interface Preferences {
  branch: string | null;
  year: string | null;
 }

 const BRANCHES = ["Civil", "Mechanical", "Electrical", "ECE", "CSE", "Other"] as const;
 const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"] as const;
 const CATEGORIES = ["Notes", "PYQ", "Other"] as const;

 const roleBadgeStyle = (role: Role) => {
  switch (role) {
    case "viewer": return "bg-gray-100 text-gray-800 border-gray-200";
    case "contributor": return "bg-blue-100 text-blue-800 border-blue-200";
    case "admin": return "bg-green-100 text-green-800 border-green-200";
    case "super-admin": return "bg-purple-100 text-purple-800 border-purple-200";
    default: return "bg-muted text-foreground border-border";
  }
 };

 const roleIcon = (role: Role) => {
  switch (role) {
    case "viewer": return <User className="w-4 h-4" />;
    case "contributor": return <Upload className="w-4 h-4" />;
    case "admin": return <ShieldCheck className="w-4 h-4" />;
    case "super-admin": return <Crown className="w-4 h-4" />;
  }
 };

 const Profile = () => {
  const [params] = useSearchParams();
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [role, setRole] = useState<Role>("viewer");
  const [prefs, setPrefs] = useState<Preferences>({ branch: null, year: null });
  const [stats, setStats] = useState({ visits: 0, downloads: 0, contributions: 0 });

  // Editing state for a submission
  const [editId, setEditId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ title: string; branch: string; year: string; category: string } | null>(null);

  // Load user context from query string or localStorage
  useEffect(() => {
    const qsRole = (params.get("role") || "").toLowerCase() as Role;
    const qsName = params.get("name") || "";
    const qsEmail = params.get("email") || "";
    const qsPhoto = params.get("photo") || "";

    const stored = localStorage.getItem("currentUser");
    const parsed = stored ? JSON.parse(stored) : null;

    const user = {
      name: qsName || parsed?.name || "Guest User",
      email: qsEmail || parsed?.email || "",
      photoUrl: qsPhoto || parsed?.photoUrl || "",
      role: (qsRole && ["viewer", "contributor", "admin", "super-admin"].includes(qsRole)) ? qsRole : (parsed?.role as Role) || "viewer",
    } as { name: string; email: string; photoUrl: string; role: Role };

    setName(user.name);
    setEmail(user.email);
    setPhotoUrl(user.photoUrl);
    setRole(user.role);

    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [params]);

  // Load preferences and stats
  useEffect(() => {
    const prefKey = `profile:prefs:${email || "anon"}`;
    const storedPrefs = localStorage.getItem(prefKey);
    if (storedPrefs) setPrefs(JSON.parse(storedPrefs));

    const statKey = `profile:stats:${email || "anon"}`;
    const storedStats = localStorage.getItem(statKey);
    const nextStats = storedStats ? JSON.parse(storedStats) : { visits: 0, downloads: 0, contributions: 0 };
    nextStats.visits = (nextStats.visits || 0) + 1; // count visit
    setStats(nextStats);
    localStorage.setItem(statKey, JSON.stringify(nextStats));
  }, [email]);

  const savePrefs = () => {
    const prefKey = `profile:prefs:${email || "anon"}`;
    localStorage.setItem(prefKey, JSON.stringify(prefs));
  };

  const resetPrefs = () => {
    setPrefs({ branch: null, year: null });
    const prefKey = `profile:prefs:${email || "anon"}`;
    localStorage.removeItem(prefKey);
  };

  const submissionsAll: SubmissionItem[] = useMemo(() => {
    const raw = localStorage.getItem("submissions");
    const arr: SubmissionItem[] = raw ? JSON.parse(raw) : [];
    // Ensure sorting by date desc
    return arr.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, []);

  const mySubmissions = useMemo(() => submissionsAll.filter(s => !email || s.uploaderEmail === email), [submissionsAll, email]);

  const pendingCount = useMemo(() => submissionsAll.filter(s => s.status === "Pending").length, [submissionsAll]);
  const recentApproved = useMemo(() => submissionsAll.filter(s => s.status === "Approved").slice(0, 5), [submissionsAll]);

  const startEdit = (s: SubmissionItem) => {
    setEditId(s.id);
    setEditDraft({ title: s.title, branch: s.branch, year: s.year, category: s.category });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditDraft(null);
  };

  const saveEdit = () => {
    if (!editId || !editDraft) return;
    const raw = localStorage.getItem("submissions");
    const arr: SubmissionItem[] = raw ? JSON.parse(raw) : [];
    const idx = arr.findIndex(s => s.id === editId);
    if (idx >= 0 && arr[idx].status === "Pending") {
      arr[idx] = { ...arr[idx], ...editDraft };
      localStorage.setItem("submissions", JSON.stringify(arr));
    }
    setEditId(null);
    setEditDraft(null);
  };

  const signOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  const RoleBadge = ({ r }: { r: Role }) => (
    <Badge className={`${roleBadgeStyle(r)} border`}>{roleIcon(r)}<span className="ml-1 capitalize">{r.replace("-", " ")}</span></Badge>
  );

  const showContrib = role === "contributor" || role === "admin" || role === "super-admin";
  const showAdmin = role === "admin" || role === "super-admin";
  const showSuper = role === "super-admin";

  return (
    <div className="min-h-screen bg-background">
      <section className="gradient-primary py-10 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">User Profile</h1>
              <p className="opacity-90">Manage your account, preferences, and activity.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={signOut}><LogOut className="w-4 h-4 mr-2"/>Sign out</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    {photoUrl ? <AvatarImage src={photoUrl} alt={name} /> : null}
                    <AvatarFallback>{name.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-semibold truncate">{name}</h2>
                      <RoleBadge r={role} />
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{email || "No email"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Branch</Label>
                    <Select value={prefs.branch || undefined} onValueChange={(v)=> setPrefs(p => ({...p, branch: v}))} disabled={role === "admin" || role === "super-admin" ? false : false}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {BRANCHES.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Academic Year</Label>
                    <Select value={prefs.year || undefined} onValueChange={(v)=> setPrefs(p => ({...p, year: v}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map(y => (<SelectItem key={y} value={y}>{y}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={savePrefs}>Edit Preferences</Button>
                  <Button variant="outline" onClick={resetPrefs}>Reset</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Visits</div>
                    <div className="text-xl font-semibold">{stats.visits}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Downloads</div>
                    <div className="text-xl font-semibold">{stats.downloads}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Contributions</div>
                    <div className="text-xl font-semibold">{stats.contributions}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="secondary" asChild><RouterLink to="/browse"><Calendar className="w-4 h-4 mr-2"/>Browse Resources</RouterLink></Button>
                <Button variant="secondary" asChild><RouterLink to="/submit"><Upload className="w-4 h-4 mr-2"/>Submit Resource</RouterLink></Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-8 min-w-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {showContrib && <TabsTrigger value="contrib">Contributions</TabsTrigger>}
                {showAdmin && <TabsTrigger value="admin">Admin Tools</TabsTrigger>}
                {showSuper && <TabsTrigger value="super">Super-admin</TabsTrigger>}
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Basic info is pulled from your sign-in provider. Preferences help personalize browsing.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Upcoming Features</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg border p-3 flex items-center gap-2"><Star className="w-4 h-4"/>Bookmarks/Favorites</div>
                    <div className="rounded-lg border p-3 flex items-center gap-2"><Crown className="w-4 h-4"/>Contribution Leaderboard</div>
                    <div className="rounded-lg border p-3 flex items-center gap-2"><Download className="w-4 h-4"/>Download History</div>
                    <div className="rounded-lg border p-3 flex items-center gap-2"><ShieldQuestion className="w-4 h-4"/>More controls</div>
                  </CardContent>
                </Card>
              </TabsContent>

              {showContrib && (
                <TabsContent value="contrib" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">My Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {mySubmissions.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No submissions yet.</div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Branch</TableHead>
                              <TableHead>Year</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mySubmissions.map((s) => (
                              <TableRow key={s.id}>
                                <TableCell className="font-medium">{s.title}</TableCell>
                                <TableCell>{s.branch}</TableCell>
                                <TableCell>{s.year}</TableCell>
                                <TableCell>{s.category}</TableCell>
                                <TableCell>
                                  <Badge className={`${s.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' : s.status === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200'} border`}>{s.status}</Badge>
                                </TableCell>
                                <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button variant="outline" size="sm" asChild>
                                      <a href="#" aria-label={`View ${s.title}`}>View</a>
                                    </Button>
                                    {s.status === 'Pending' && (
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="secondary" size="sm" onClick={() => startEdit(s)}>
                                            <Pencil className="w-4 h-4 mr-1"/>Edit
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Edit Submission</DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-3 py-2">
                                            <div className="space-y-1.5">
                                              <Label>Title</Label>
                                              <Input value={editDraft?.title || ''} onChange={(e)=> setEditDraft(d => d ? { ...d, title: e.target.value } : d)} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                              <div className="space-y-1.5">
                                                <Label>Branch</Label>
                                                <Select value={editDraft?.branch} onValueChange={(v)=> setEditDraft(d => d ? { ...d, branch: v } : d)}>
                                                  <SelectTrigger><SelectValue placeholder="Select branch"/></SelectTrigger>
                                                  <SelectContent>
                                                    {BRANCHES.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                              <div className="space-y-1.5">
                                                <Label>Year</Label>
                                                <Select value={editDraft?.year} onValueChange={(v)=> setEditDraft(d => d ? { ...d, year: v } : d)}>
                                                  <SelectTrigger><SelectValue placeholder="Select year"/></SelectTrigger>
                                                  <SelectContent>
                                                    {YEARS.map(y => (<SelectItem key={y} value={y}>{y}</SelectItem>))}
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                              <div className="space-y-1.5">
                                                <Label>Category</Label>
                                                <Select value={editDraft?.category} onValueChange={(v)=> setEditDraft(d => d ? { ...d, category: v } : d)}>
                                                  <SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger>
                                                  <SelectContent>
                                                    {CATEGORIES.map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                                            <Button onClick={saveEdit}>Save Changes</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {showAdmin && (
                <TabsContent value="admin" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Admin Shortcuts</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button asChild><RouterLink to="/browse"><Shield className="w-4 h-4 mr-2"/>Pending Queue</RouterLink></Button>
                      <Button variant="secondary" asChild><RouterLink to="/browse"><ShieldCheck className="w-4 h-4 mr-2"/>Resource Management</RouterLink></Button>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Analytics Snapshot</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="rounded-lg border p-3 flex items-center justify-between"><span>Pending submissions</span><Badge variant="secondary">{pendingCount}</Badge></div>
                        <div>
                          <div className="text-sm font-medium mb-2">Top 5 recently approved</div>
                          {recentApproved.length === 0 ? (
                            <div className="text-sm text-muted-foreground">No approvals yet.</div>
                          ) : (
                            <ul className="text-sm space-y-1">
                              {recentApproved.map(r => (
                                <li key={r.id} className="flex items-center justify-between border rounded-md px-3 py-2">
                                  <span className="truncate pr-3">{r.title}</span>
                                  <Badge variant="outline" className="ml-2">{new Date(r.date).toLocaleDateString()}</Badge>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">My Moderation Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">No recent moderation activity.</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              )}

              {showSuper && (
                <TabsContent value="super" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Role Management</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button asChild><RouterLink to="/about"><Shield className="w-4 h-4 mr-2"/>Open Admin Tools</RouterLink></Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">System Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Total admins</div>
                        <div className="text-xl font-semibold">{1}</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-xs text-muted-foreground">Total contributors</div>
                        <div className="text-xl font-semibold">{0}</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
 };

 export default Profile;
