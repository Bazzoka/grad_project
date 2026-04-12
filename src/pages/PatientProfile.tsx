import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  User, Calendar, FileText, 
  Clock, CheckCircle, XCircle, AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalAuth, Appointment, MedicalRecord } from "@/contexts/LocalAuthContext";
import Navbar from "@/components/Navbar";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { user, loading, getAppointments, getMedicalRecords } = useLocalAuth();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth');
        return;
      }

      setAppointments(getAppointments());
      setMedicalRecords(getMedicalRecords());
    }
  }, [user, loading, navigate]);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; label: string; labelAr: string }> = {
      pending: { color: 'bg-yellow-500/20 text-yellow-600', icon: AlertCircle, label: 'Pending', labelAr: 'قيد الانتظار' },
      confirmed: { color: 'bg-blue-500/20 text-blue-600', icon: Clock, label: 'Confirmed', labelAr: 'مؤكد' },
      completed: { color: 'bg-green-500/20 text-green-600', icon: CheckCircle, label: 'Completed', labelAr: 'مكتمل' },
      cancelled: { color: 'bg-red-500/20 text-red-600', icon: XCircle, label: 'Cancelled', labelAr: 'ملغي' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {isArabic ? config.labelAr : config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isArabic ? 'السجل الطبي' : 'Medical Profile'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isArabic ? `مرحباً، ${user?.fullName || 'مريض'}` : `Welcome, ${user?.fullName || 'Patient'}`}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isArabic ? 'إجمالي المواعيد' : 'Total Appointments'}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{appointments.length}</p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isArabic ? 'السجلات الطبية' : 'Medical Records'}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">{medicalRecords.length}</p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isArabic ? 'المواعيد المعلقة' : 'Pending Appointments'}</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                  {appointments.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Card className="p-4 md:p-6">
          <Tabs defaultValue="appointments">
            <TabsList className="w-full justify-start mb-6 overflow-x-auto">
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">{isArabic ? 'المواعيد' : 'Appointments'}</span>
              </TabsTrigger>
              <TabsTrigger value="records" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">{isArabic ? 'السجلات الطبية' : 'Medical Records'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              {appointments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{isArabic ? 'لا توجد مواعيد' : 'No appointments yet'}</p>
                  <Button className="mt-4" onClick={() => navigate('/doctors')}>
                    {isArabic ? 'احجز موعد' : 'Book Appointment'}
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-3"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{appointment.specialty}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {appointment.doctorName || 'Doctor'}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">
                              {formatDate(appointment.appointmentDate)}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="records">
              {medicalRecords.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{isArabic ? 'لا توجد سجلات طبية' : 'No medical records yet'}</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {medicalRecords.map((record) => (
                      <Card key={record.id} className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {record.diagnosis && (
                              <div className="mb-2">
                                <p className="text-xs text-muted-foreground">{isArabic ? 'التشخيص' : 'Diagnosis'}</p>
                                <p className="font-medium text-foreground">{record.diagnosis}</p>
                              </div>
                            )}
                            {record.prescription && (
                              <div className="mb-2">
                                <p className="text-xs text-muted-foreground">{isArabic ? 'الوصفة الطبية' : 'Prescription'}</p>
                                <p className="text-sm text-foreground">{record.prescription}</p>
                              </div>
                            )}
                            {record.notes && (
                              <div>
                                <p className="text-xs text-muted-foreground">{isArabic ? 'ملاحظات' : 'Notes'}</p>
                                <p className="text-sm text-muted-foreground">{record.notes}</p>
                              </div>
                            )}
                            {record.createdAt && (
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatDate(record.createdAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default PatientProfile;
