import fs from 'fs';
import path from 'path';

// Define TS Interfaces for DB structures
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  websiteType: string;
  pageCount?: string;
  designStyle?: string;
  budgetRange?: string;
  deadline?: string;
  features: string[];
  description?: string;
  files: Array<{ name: string; size: number; url?: string }>;
  status: 'New' | 'In Discussion' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

const DB_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Initialize local JSON Database if it doesn't exist
function initDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      inquiries: [] as Inquiry[],
      users: [
        {
          id: 'admin-default',
          email: process.env.ADMIN_EMAIL || 'admin@aswalwebstudio.com',
          // Hashed version of 'admin123' using a mock or basic comparison
          // For simplicity in local fallback, we will support plain/hashed checks.
          passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$12$L7R2Qo56f/E8n/sNnZ7hOuhM0v5P27m0/t2Yc/2b7G3cWn56dG39S', // admin123
          name: 'AswalWebStudio Admin',
          role: 'admin',
        },
      ] as AdminUser[],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

// Read database
function readDb() {
  initDb();
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
}

// Write database
function writeDb(data: any) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // Inquiries
  getInquiries: async (): Promise<Inquiry[]> => {
    const data = readDb();
    // Sort by date descending
    return (data.inquiries || []).sort(
      (a: Inquiry, b: Inquiry) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getInquiryById: async (id: string): Promise<Inquiry | null> => {
    const data = readDb();
    return (data.inquiries || []).find((inq: Inquiry) => inq.id === id) || null;
  },

  createInquiry: async (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> => {
    const data = readDb();
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq_${Math.random().toString(36).substring(2, 11)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    data.inquiries.push(newInquiry);
    writeDb(data);
    return newInquiry;
  },

  updateInquiryStatus: async (id: string, status: Inquiry['status']): Promise<Inquiry | null> => {
    const data = readDb();
    const index = data.inquiries.findIndex((inq: Inquiry) => inq.id === id);
    if (index === -1) return null;
    data.inquiries[index].status = status;
    writeDb(data);
    return data.inquiries[index];
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    const data = readDb();
    const initialLength = data.inquiries.length;
    data.inquiries = data.inquiries.filter((inq: Inquiry) => inq.id !== id);
    writeDb(data);
    return data.inquiries.length < initialLength;
  },

  // Admin Users
  getAdminByEmail: async (email: string): Promise<AdminUser | null> => {
    const data = readDb();
    return data.users.find((user: AdminUser) => user.email.toLowerCase() === email.toLowerCase()) || null;
  },
};
