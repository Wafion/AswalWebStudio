import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminDashboardClient from './AdminDashboardClient';
import AdminLoginClient from './AdminLoginClient';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AdminLoginClient />;
  }

  return <AdminDashboardClient session={session} />;
}
