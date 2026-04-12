import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LocalUser {
  id: string;
  email: string;
  fullName: string;
  role: 'patient' | 'doctor';
  specialty?: string;
  phone?: string;
  experience?: string;
  city?: string;
  bio?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  specialty: string;
  appointmentDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  patientName?: string;
  doctorName?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  createdAt: string;
}

interface LocalAuthContextType {
  user: LocalUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string, role?: 'patient' | 'doctor', extraData?: any) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  getAppointments: () => Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  getMedicalRecords: () => MedicalRecord[];
  addMedicalRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt'>) => void;
  getAllUsers: () => LocalUser[];
}

const LocalAuthContext = createContext<LocalAuthContextType | null>(null);

const USERS_KEY = 'medlink_users';
const CURRENT_USER_KEY = 'medlink_current_user';
const APPOINTMENTS_KEY = 'medlink_appointments';
const RECORDS_KEY = 'medlink_records';

// Initialize with demo data
const initDemoData = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const demoUsers: (LocalUser & { password: string })[] = [
      {
        id: 'demo-patient-1',
        email: 'patient@demo.com',
        password: 'demo123',
        fullName: 'John Patient',
        role: 'patient',
        phone: '+1234567890'
      },
      {
        id: 'demo-doctor-1',
        email: 'doctor@demo.com',
        password: 'demo123',
        fullName: 'Dr. Sarah Johnson',
        role: 'doctor',
        specialty: 'Cardiology',
        phone: '+1987654321',
        experience: '15',
        city: 'New York',
        bio: 'Board-certified cardiologist with 15 years of experience.'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }

  const appointments = localStorage.getItem(APPOINTMENTS_KEY);
  if (!appointments) {
    const demoAppointments: Appointment[] = [
      {
        id: 'apt-1',
        patientId: 'demo-patient-1',
        doctorId: 'demo-doctor-1',
        specialty: 'Cardiology',
        appointmentDate: new Date(Date.now() + 86400000).toISOString(),
        status: 'pending',
        notes: 'Regular checkup',
        patientName: 'John Patient',
        doctorName: 'Dr. Sarah Johnson'
      },
      {
        id: 'apt-2',
        patientId: 'demo-patient-1',
        doctorId: 'demo-doctor-1',
        specialty: 'Cardiology',
        appointmentDate: new Date(Date.now() - 86400000 * 7).toISOString(),
        status: 'completed',
        notes: 'Follow-up appointment',
        patientName: 'John Patient',
        doctorName: 'Dr. Sarah Johnson'
      }
    ];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(demoAppointments));
  }

  const records = localStorage.getItem(RECORDS_KEY);
  if (!records) {
    const demoRecords: MedicalRecord[] = [
      {
        id: 'rec-1',
        patientId: 'demo-patient-1',
        doctorId: 'demo-doctor-1',
        diagnosis: 'Mild hypertension',
        prescription: 'Lisinopril 10mg daily',
        notes: 'Monitor blood pressure regularly. Follow-up in 2 weeks.',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
      }
    ];
    localStorage.setItem(RECORDS_KEY, JSON.stringify(demoRecords));
  }
};

export const LocalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDemoData();
    
    // Check for existing session
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const getUsers = (): (LocalUser & { password: string })[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const getAllUsers = (): LocalUser[] => {
    return getUsers().map(({ password, ...user }) => user);
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return { success: true };
  };

  const signUp = async (
    email: string, 
    password: string, 
    name: string, 
    role: 'patient' | 'doctor' = 'patient',
    extraData?: any
  ): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already exists' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const newUser: LocalUser & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      password,
      fullName: name,
      role,
      ...extraData
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getAppointments = (): Appointment[] => {
    const appointments = localStorage.getItem(APPOINTMENTS_KEY);
    const allAppointments: Appointment[] = appointments ? JSON.parse(appointments) : [];
    
    if (!user) return [];
    
    if (user.role === 'doctor') {
      return allAppointments.filter(a => a.doctorId === user.id);
    }
    return allAppointments.filter(a => a.patientId === user.id);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const appointments = localStorage.getItem(APPOINTMENTS_KEY);
    const allAppointments: Appointment[] = appointments ? JSON.parse(appointments) : [];
    
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`
    };
    
    allAppointments.push(newAppointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(allAppointments));
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const appointments = localStorage.getItem(APPOINTMENTS_KEY);
    const allAppointments: Appointment[] = appointments ? JSON.parse(appointments) : [];
    
    const updatedAppointments = allAppointments.map(a => 
      a.id === id ? { ...a, status } : a
    );
    
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));
  };

  const getMedicalRecords = (): MedicalRecord[] => {
    const records = localStorage.getItem(RECORDS_KEY);
    const allRecords: MedicalRecord[] = records ? JSON.parse(records) : [];
    
    if (!user) return [];
    
    if (user.role === 'doctor') {
      return allRecords.filter(r => r.doctorId === user.id);
    }
    return allRecords.filter(r => r.patientId === user.id);
  };

  const addMedicalRecord = (record: Omit<MedicalRecord, 'id' | 'createdAt'>) => {
    const records = localStorage.getItem(RECORDS_KEY);
    const allRecords: MedicalRecord[] = records ? JSON.parse(records) : [];
    
    const newRecord: MedicalRecord = {
      ...record,
      id: `rec-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    allRecords.push(newRecord);
    localStorage.setItem(RECORDS_KEY, JSON.stringify(allRecords));
  };

  return (
    <LocalAuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      getAppointments,
      addAppointment,
      updateAppointmentStatus,
      getMedicalRecords,
      addMedicalRecord,
      getAllUsers
    }}>
      {children}
    </LocalAuthContext.Provider>
  );
};

export const useLocalAuth = () => {
  const context = useContext(LocalAuthContext);
  if (!context) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }
  return context;
};
