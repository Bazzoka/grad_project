import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users, DollarSign, Calendar, Clock,
  CheckCircle, XCircle, AlertCircle,
  LogOut, Home, Stethoscope, FileText, Settings, Menu, X,
  ChevronLeft, ChevronRight, TrendingUp, Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalAuth, Appointment } from "@/contexts/LocalAuthContext";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { icon: Home,     label: "Dashboard",       labelAr: "الرئيسية" },
  { icon: Calendar, label: "Appointments",    labelAr: "المواعيد" },
  { icon: Users,    label: "Patients",        labelAr: "المرضى" },
  { icon: FileText, label: "Medical Records", labelAr: "السجلات الطبية" },
  { icon: Settings, label: "Settings",        labelAr: "الإعدادات" },
];

const SIDEBAR_EXPANDED  = 260;
const SIDEBAR_COLLAPSED = 72;

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user, loading, signOut, getAppointments, updateAppointmentStatus } = useLocalAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [collapsed, setCollapsed]       = useState(false);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  useEffect(() => {
    if (!loading) {
      if (!user) { navigate("/auth"); return; }
      if (user.role !== "doctor") {
        toast({
          title: isArabic ? "غير مصرح" : "Unauthorized",
          description: isArabic ? "هذه الصفحة للأطباء فقط" : "This page is for doctors only",
          variant: "destructive",
        });
        navigate("/");
        return;
      }
      setAppointments(getAppointments());
    }
  }, [user, loading, navigate]);

  const handleUpdateStatus = (id: string, status: Appointment["status"]) => {
    updateAppointmentStatus(id, status);
    setAppointments(getAppointments());
    toast({
      title: isArabic ? "تم التحديث" : "Updated",
      description: isArabic ? "تم تحديث حالة الموعد" : "Appointment status updated",
    });
  };

  const handleSignOut = () => { signOut(); navigate("/"); };

  const uniquePatients        = new Set(appointments.map(a => a.patientId)).size;
  const completedAppointments = appointments.filter(a => a.status === "completed");
  const todayApts             = appointments.filter(a => a.appointmentDate.startsWith(new Date().toISOString().split("T")[0]));
  const pendingApts           = appointments.filter(a => a.status === "pending");

  const stats = {
    totalPatients:       uniquePatients,
    totalEarnings:       completedAppointments.length * 150,
    todayAppointments:   todayApts.length,
    pendingAppointments: pendingApts.length,
  };

  const getStatusBadge = (status: string) => {
    const cfg: Record<string, { color: string; bg: string; icon: any; label: string; labelAr: string }> = {
      pending:   { color: "#d97706", bg: "#fef3c7", icon: AlertCircle, label: "Pending",   labelAr: "قيد الانتظار" },
      confirmed: { color: "#2563eb", bg: "#dbeafe", icon: Clock,       label: "Confirmed", labelAr: "مؤكد" },
      completed: { color: "#16a34a", bg: "#dcfce7", icon: CheckCircle, label: "Completed", labelAr: "مكتمل" },
      cancelled: { color: "#dc2626", bg: "#fee2e2", icon: XCircle,     label: "Cancelled", labelAr: "ملغي" },
    };
    const c = cfg[status] || cfg.pending;
    const Icon = c.icon;
    return (
      <span style={{ background: c.bg, color: c.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
        <Icon size={12} />
        {isArabic ? c.labelAr : c.label}
      </span>
    );
  };

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(d));

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ width: 48, height: 48, border: "4px solid #e2e8f0", borderTopColor: "#0ea5e9", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const statCards = [
    { label: "Total Patients",      labelAr: "إجمالي المرضى",  value: stats.totalPatients,       icon: Users,      gradient: "linear-gradient(135deg,#667eea,#764ba2)", light: "#f0edff" },
    { label: "Total Earnings",       labelAr: "إجمالي الأرباح", value: `$${stats.totalEarnings}`, icon: DollarSign, gradient: "linear-gradient(135deg,#11998e,#38ef7d)", light: "#ecfdf5" },
    { label: "Today's Appointments", labelAr: "مواعيد اليوم",   value: stats.todayAppointments,   icon: Calendar,   gradient: "linear-gradient(135deg,#f093fb,#f5576c)", light: "#fff0f6" },
    { label: "Pending",              labelAr: "مواعيد معلقة",   value: stats.pendingAppointments, icon: Clock,      gradient: "linear-gradient(135deg,#fda085,#f6d365)", light: "#fffbeb" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', sans-serif" }} dir={isArabic ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .nav-btn { display:flex; align-items:center; gap:12px; padding:10px 14px; border-radius:10px; cursor:pointer; border:none; background:transparent; color:#94a3b8; font-size:14px; font-weight:500; width:100%; text-align:left; transition:all 0.2s; }
        .nav-btn:hover { background:rgba(255,255,255,0.08); color:#fff; }
        .nav-btn.active { background:rgba(255,255,255,0.15); color:#fff; }
        .nav-btn.collapsed { justify-content:center; padding:10px; }
        .stat-card { border-radius:16px; padding:24px; border:none; box-shadow:0 1px 3px rgba(0,0,0,0.06); transition:transform 0.2s,box-shadow 0.2s; cursor:default; }
        .stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.10); }
        .apt-row { display:flex; align-items:center; justify-content:space-between; padding:16px; border-radius:12px; background:#f8fafc; border:1px solid #f1f5f9; margin-bottom:10px; transition:all 0.2s; }
        .apt-row:hover { background:#fff; box-shadow:0 2px 12px rgba(0,0,0,0.07); border-color:#e2e8f0; }
        .action-btn { padding:6px 14px; border-radius:8px; border:none; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.15s; }
        .sidebar-transition { transition: width 280ms cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40 }} className="md:hidden" />
      )}

      {/* ── Desktop Sidebar ── */}
      <aside
        className="sidebar-transition hidden md:flex"
        style={{
          position: "fixed", top: 0, [isArabic?"right":"left"]: 0,
          width: sidebarWidth, height: "100vh", zIndex: 30,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          flexDirection: "column", padding: "0",
          boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Logo area with inline collapse button */}
        <div style={{ padding: collapsed ? "20px 0" : "20px 16px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid rgba(255,255,255,0.07)", justifyContent: collapsed?"center":"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#0ea5e9,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"0 4px 12px rgba(14,165,233,0.4)" }}>
              <Stethoscope size={22} color="#fff" />
            </div>
            {!collapsed && (
              <div style={{ overflow:"hidden" }}>
                <div style={{ color:"#fff", fontWeight:700, fontSize:18, letterSpacing:"-0.3px", whiteSpace:"nowrap" }}>MEDLINK</div>
                <div style={{ color:"#64748b", fontSize:11, whiteSpace:"nowrap", marginTop:1 }}>{isArabic ? "لوحة الطبيب" : "Doctor Portal"}</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ width:30, height:30, borderRadius:8, background:"rgba(255,255,255,0.1)", border:"none", color:"#94a3b8", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}
          >
            {isArabic
              ? (collapsed ? <ChevronLeft size={15}/> : <ChevronRight size={15}/>)
              : (collapsed ? <ChevronRight size={15}/> : <ChevronLeft size={15}/>)
            }
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
          {!collapsed && <div style={{ color:"#475569", fontSize:10, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"0 6px 10px" }}>MENU</div>}
          {navItems.map(({ icon: Icon, label, labelAr }, i) => (
            <button key={label} className={`nav-btn${i===0?" active":""}${collapsed?" collapsed":""}`} title={collapsed?(isArabic?labelAr:label):undefined}>
              <Icon size={18} style={{ flexShrink:0 }} />
              {!collapsed && <span style={{ whiteSpace:"nowrap" }}>{isArabic ? labelAr : label}</span>}
            </button>
          ))}
        </nav>

        {/* User + signout */}
        <div style={{ padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          {!collapsed && (
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, background:"rgba(255,255,255,0.05)", marginBottom:10 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14, fontWeight:700, color:"#fff" }}>
                {(user?.fullName || "D")[0].toUpperCase()}
              </div>
              <div style={{ overflow:"hidden" }}>
                <div style={{ color:"#f1f5f9", fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{user?.fullName || "Doctor"}</div>
                <div style={{ color:"#64748b", fontSize:11 }}>Physician</div>
              </div>
            </div>
          )}
          <button className={`nav-btn${collapsed?" collapsed":""}`} onClick={handleSignOut} title={collapsed?(isArabic?"تسجيل الخروج":"Sign Out"):undefined}
            style={{ color:"#f87171" }}>
            <LogOut size={18} style={{ flexShrink:0 }} />
            {!collapsed && <span style={{ whiteSpace:"nowrap" }}>{isArabic ? "تسجيل الخروج" : "Sign Out"}</span>}
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar ── */}
      <aside
        className="md:hidden"
        style={{
          position:"fixed", top:0, [isArabic?"right":"left"]:0,
          width:280, height:"100vh", zIndex:50,
          background:"linear-gradient(180deg,#0f172a,#1e293b)",
          flexDirection:"column", display:"flex",
          transform: mobileOpen ? "translateX(0)" : (isArabic?"translateX(100%)":"translateX(-100%)"),
          transition:"transform 300ms ease",
          boxShadow:"4px 0 24px rgba(0,0,0,0.2)",
        }}
      >
        <button onClick={() => setMobileOpen(false)} style={{ position:"absolute", top:16, [isArabic?"left":"right"]:16, background:"rgba(255,255,255,0.1)", border:"none", color:"#94a3b8", borderRadius:8, padding:6, cursor:"pointer" }}>
          <X size={18} />
        </button>
        <div style={{ padding:"28px 20px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#0ea5e9,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 12px rgba(14,165,233,0.4)" }}>
            <Stethoscope size={22} color="#fff" />
          </div>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:18 }}>MEDLINK</div>
            <div style={{ color:"#64748b", fontSize:11 }}>{isArabic?"لوحة الطبيب":"Doctor Portal"}</div>
          </div>
        </div>
        <nav style={{ flex:1, padding:"16px 12px" }}>
          {navItems.map(({ icon: Icon, label, labelAr }, i) => (
            <button key={label} className={`nav-btn${i===0?" active":""}`} onClick={() => setMobileOpen(false)}>
              <Icon size={18} />
              {isArabic ? labelAr : label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"16px 12px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <button className="nav-btn" onClick={handleSignOut} style={{ color:"#f87171" }}>
            <LogOut size={18} />
            {isArabic ? "تسجيل الخروج" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{
        marginLeft: isArabic ? 0 : sidebarWidth,
        marginRight: isArabic ? sidebarWidth : 0,
        transition: "margin 280ms cubic-bezier(0.4,0,0.2,1)",
        minHeight: "100vh",
        padding: "0",
      }}>

        {/* Top bar */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e2e8f0", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:20, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <button className="md:hidden" onClick={() => setMobileOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
              <Menu size={22} color="#475569" />
            </button>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:"#0f172a", lineHeight:1.2 }}>
                {isArabic ? `مرحباً، ${user?.fullName || "طبيب"} 👋` : `Good morning, ${user?.fullName || "Doctor"} 👋`}
              </div>
              <div style={{ fontSize:13, color:"#94a3b8", marginTop:2 }}>
                {isArabic ? "هذا ملخص لنشاطك اليوم" : "Here's what's happening today"}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ background:"#f1f5f9", borderRadius:10, padding:"6px 14px", fontSize:13, color:"#64748b", fontWeight:500 }}>
              {new Date().toLocaleDateString(isArabic?"ar-EG":"en-US", { weekday:"short", month:"short", day:"numeric" })}
            </div>
          </div>
        </div>

        {/* Page body */}
        <div style={{ padding:"28px 32px" }}>

          {/* Stat cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, marginBottom:28 }}>
            {statCards.map(({ label, labelAr, value, icon: Icon, gradient, light }) => (
              <div key={label} className="stat-card" style={{ background:"#fff" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:12, color:"#94a3b8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:8 }}>
                      {isArabic ? labelAr : label}
                    </div>
                    <div style={{ fontSize:32, fontWeight:700, color:"#0f172a", lineHeight:1 }}>{value}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:8 }}>
                      <TrendingUp size={12} color="#22c55e" />
                      <span style={{ fontSize:12, color:"#22c55e", fontWeight:500 }}>+0%</span>
                      <span style={{ fontSize:12, color:"#94a3b8" }}>{isArabic?"هذا الشهر":"this month"}</span>
                    </div>
                  </div>
                  <div style={{ width:52, height:52, borderRadius:14, background:gradient, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(0,0,0,0.12)", flexShrink:0 }}>
                    <Icon size={24} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Appointments card */}
          <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", overflow:"hidden" }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#0ea5e9,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Activity size={18} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, color:"#0f172a" }}>{isArabic?"المواعيد":"Appointments"}</div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>{appointments.length} {isArabic?"موعد إجمالاً":"total records"}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {["all","pending","completed"].map((tab, i) => (
                  <button key={tab} style={{ padding:"6px 16px", borderRadius:8, border:"1px solid #e2e8f0", background: i===0?"#0f172a":"#fff", color: i===0?"#fff":"#64748b", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                    {tab === "all" ? (isArabic?"الكل":"All") : tab === "pending" ? (isArabic?"معلق":"Pending") : (isArabic?"مكتمل":"Completed")}
                  </button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="all">
              <div style={{ display:"none" }}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all">
                <AppointmentsList appointments={appointments} formatDate={formatDate} getStatusBadge={getStatusBadge} updateAppointmentStatus={handleUpdateStatus} isArabic={isArabic} />
              </TabsContent>
              <TabsContent value="pending">
                <AppointmentsList appointments={appointments.filter(a=>a.status==="pending")} formatDate={formatDate} getStatusBadge={getStatusBadge} updateAppointmentStatus={handleUpdateStatus} isArabic={isArabic} />
              </TabsContent>
              <TabsContent value="completed">
                <AppointmentsList appointments={appointments.filter(a=>a.status==="completed")} formatDate={formatDate} getStatusBadge={getStatusBadge} updateAppointmentStatus={handleUpdateStatus} isArabic={isArabic} />
              </TabsContent>
            </Tabs>
          </div>

        </div>
      </main>
    </div>
  );
};

interface AppointmentsListProps {
  appointments: Appointment[];
  formatDate: (date: string) => string;
  getStatusBadge: (status: string) => JSX.Element;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  isArabic: boolean;
}

const AppointmentsList = ({ appointments, formatDate, getStatusBadge, updateAppointmentStatus, isArabic }: AppointmentsListProps) => {
  if (appointments.length === 0) {
    return (
      <div style={{ textAlign:"center", padding:"60px 20px", color:"#94a3b8" }}>
        <div style={{ width:64, height:64, borderRadius:16, background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <Calendar size={28} color="#cbd5e1" />
        </div>
        <div style={{ fontSize:15, fontWeight:600, color:"#64748b", marginBottom:4 }}>{isArabic?"لا توجد مواعيد":"No appointments yet"}</div>
        <div style={{ fontSize:13, color:"#94a3b8" }}>{isArabic?"ستظهر المواعيد هنا عند إضافتها":"Appointments will appear here once added"}</div>
      </div>
    );
  }

  return (
    <div style={{ padding:"16px 24px" }}>
      <ScrollArea style={{ height: 420 }}>
        {appointments.map((a) => (
          <div key={a.id} className="apt-row">
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#0ea5e9,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ color:"#fff", fontWeight:700, fontSize:16 }}>{(a.patientName||"P")[0].toUpperCase()}</span>
              </div>
              <div>
                <div style={{ fontWeight:600, color:"#0f172a", fontSize:14 }}>{a.patientName || "Patient"}</div>
                <div style={{ color:"#64748b", fontSize:13, marginTop:1 }}>{a.specialty}</div>
                <div style={{ color:"#94a3b8", fontSize:12, marginTop:3, display:"flex", alignItems:"center", gap:4 }}>
                  <Clock size={11} />
                  {formatDate(a.appointmentDate)}
                </div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {getStatusBadge(a.status)}
              {a.status === "pending" && (
                <div style={{ display:"flex", gap:6 }}>
                  <button className="action-btn" onClick={() => updateAppointmentStatus(a.id,"confirmed")} style={{ background:"#dcfce7", color:"#16a34a" }}>✓ {isArabic?"قبول":"Accept"}</button>
                  <button className="action-btn" onClick={() => updateAppointmentStatus(a.id,"cancelled")} style={{ background:"#fee2e2", color:"#dc2626" }}>✕ {isArabic?"رفض":"Reject"}</button>
                </div>
              )}
              {a.status === "confirmed" && (
                <button className="action-btn" onClick={() => updateAppointmentStatus(a.id,"completed")} style={{ background:"linear-gradient(135deg,#0ea5e9,#6366f1)", color:"#fff" }}>
                  {isArabic?"إكمال":"Complete"}
                </button>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default DoctorDashboard;
