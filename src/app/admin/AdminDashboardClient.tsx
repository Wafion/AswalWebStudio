'use client';

import React, { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { 
  LogOut, 
  Search, 
  Download, 
  RefreshCw, 
  Filter, 
  FileSpreadsheet, 
  Clock, 
  MessageSquare, 
  FolderGit, 
  Sparkles,
  Info,
  Calendar,
  Layers,
  X,
  CheckCircle
} from 'lucide-react';
import { Inquiry } from '@/lib/db';

export default function AdminDashboardClient({ session }: { session: any }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  
  // Active inquiry detail state
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Fetch inquiries
  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      } else {
        setError('Failed to retrieve inquiries. Please sign in again.');
      }
    } catch (err) {
      setError('A network error occurred while fetching inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update status handler
  const handleStatusUpdate = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        // Update local state
        setInquiries(prev => 
          prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq)
        );
        // Update currently selected detail view
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      alert('Error updating status.');
    }
  };

  // Filter logic
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.companyName || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.description || '').toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const matchesBudget = budgetFilter === 'All' || inq.budgetRange === budgetFilter;

    return matchesSearch && matchesStatus && matchesBudget;
  });

  // Stats calculation
  const totalLeads = inquiries.length;
  const newLeads = inquiries.filter(i => i.status === 'New').length;
  const inProgressLeads = inquiries.filter(i => i.status === 'In Progress' || i.status === 'In Discussion').length;
  const completedLeads = inquiries.filter(i => i.status === 'Completed').length;

  // Export to CSV helper
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) return;

    // Headers
    const headers = [
      'ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 
      'Website Type', 'Pages', 'Style', 'Budget', 'Deadline', 'Status', 'Features', 'Description'
    ];

    const rows = filteredInquiries.map(inq => [
      inq.id,
      new Date(inq.createdAt).toLocaleDateString(),
      `"${inq.name.replace(/"/g, '""')}"`,
      inq.email,
      inq.phone || '',
      `"${(inq.companyName || '').replace(/"/g, '""')}"`,
      inq.websiteType,
      inq.pageCount || '',
      inq.designStyle || '',
      inq.budgetRange || '',
      inq.deadline || '',
      inq.status,
      `"${(inq.features || []).join(', ')}"`,
      `"${(inq.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `aswal_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-foreground tracking-tight">
              AswalWebStudio <span className="text-primary">Admin</span>
            </span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md">
              Lead Center
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-xs text-foreground/60 hidden md:block">
              Logged in: <strong className="text-foreground">{session?.user?.name || 'Admin'}</strong>
            </span>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/admin' })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border hover:border-red-500/30 hover:bg-red-500/5 text-foreground/80 hover:text-red-500 rounded-xl transition-all text-xs font-semibold cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl border border-card-border bg-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-foreground/50">
              <span className="text-xs font-bold uppercase tracking-wider">Total Inquiries</span>
              <FolderGit className="h-4 w-4" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{totalLeads}</p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl border border-card-border bg-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-primary">
              <span className="text-xs font-bold uppercase tracking-wider">New Proposals</span>
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{newLeads}</p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl border border-card-border bg-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-yellow-500">
              <span className="text-xs font-bold uppercase tracking-wider">In Discussion</span>
              <Clock className="h-4 w-4" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{inProgressLeads}</p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl border border-card-border bg-card shadow-sm space-y-2">
            <div className="flex items-center justify-between text-foreground/40">
              <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
              <CheckCircle className="h-4 w-4" />
            </div>
            <p className="text-3xl font-extrabold text-foreground">{completedLeads}</p>
          </div>

        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/30 p-4 border border-border rounded-2xl">
          
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search leads name, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-sm text-foreground"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-background border border-border px-3 py-1.5 rounded-xl text-xs">
              <Filter className="h-3 w-3 text-foreground/50" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent focus:outline-none text-foreground font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="In Discussion">In Discussion</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Reload button */}
            <button
              onClick={fetchInquiries}
              className="p-2 border border-border bg-background rounded-xl hover:bg-card text-foreground/70 hover:text-foreground cursor-pointer"
              title="Refresh leads list"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>

            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              disabled={filteredInquiries.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md shadow-primary/10 cursor-pointer disabled:opacity-50"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" /> Export CSV
            </button>

          </div>
        </div>

        {/* Lead Listing Workspace */}
        {loading ? (
          <div className="p-16 border border-border bg-card/10 text-center rounded-3xl font-medium text-sm text-foreground/60 animate-pulse">
            Loading leads list workspace...
          </div>
        ) : error ? (
          <div className="p-10 border border-red-500/20 bg-red-500/5 text-center text-red-500 rounded-3xl font-medium text-sm">
            {error}
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-16 border border-dashed border-border text-center rounded-3xl text-sm font-semibold text-foreground/50">
            No inquiries match your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Table/List Panel */}
            <div className="xl:col-span-2 border border-border rounded-3xl overflow-hidden bg-card/45 shadow-sm overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-border bg-card/60">
                    <th className="p-4 font-bold text-foreground">Lead Profile</th>
                    <th className="p-4 font-bold text-foreground">Project specifications</th>
                    <th className="p-4 font-bold text-foreground text-center">Status</th>
                    <th className="p-4 font-bold text-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredInquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <tr 
                        key={inq.id} 
                        onClick={() => setSelectedInquiry(inq)}
                        className={`hover:bg-card/30 transition-colors cursor-pointer ${
                          isSelected ? 'bg-primary/5 hover:bg-primary/5 border-l-2 border-l-primary' : ''
                        }`}
                      >
                        {/* Name & Contact */}
                        <td className="p-4 space-y-1">
                          <p className="font-bold text-foreground leading-snug">{inq.name}</p>
                          <p className="text-xs text-foreground/60 leading-none">{inq.email}</p>
                          {inq.companyName && (
                            <span className="inline-block text-[10px] bg-navy-500/5 dark:bg-navy-500/10 border border-border px-1.5 py-0.5 rounded font-semibold text-foreground/75">
                              {inq.companyName}
                            </span>
                          )}
                        </td>

                        {/* Project Type & Budget */}
                        <td className="p-4 space-y-1">
                          <p className="font-semibold text-foreground text-xs">{inq.websiteType}</p>
                          <p className="text-[10px] text-foreground/50">
                            Budget: <strong className="text-foreground/80">{inq.budgetRange || 'Open'}</strong>
                          </p>
                        </td>

                        {/* Status Label */}
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inq.status === 'New' ? 'bg-success/10 text-success border border-success/20' :
                            inq.status === 'In Discussion' ? 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20' :
                            inq.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            'bg-foreground/10 text-foreground/70'
                          }`}>
                            {inq.status}
                          </span>
                        </td>

                        {/* Inline updates dropdown */}
                        <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusUpdate(inq.id, e.target.value as Inquiry['status'])}
                            className="text-xs font-semibold px-2 py-1 bg-background border border-border rounded-lg focus:outline-none text-foreground focus:border-primary cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="In Discussion">In Discussion</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Inquiry Details Drawer Panel */}
            <div className="xl:col-span-1">
              {selectedInquiry ? (
                <div className="border border-border bg-card p-6 rounded-3xl shadow-sm space-y-6 relative sticky top-24">
                  
                  {/* Header info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-xl text-foreground">{selectedInquiry.name}</h3>
                      <p className="text-xs text-foreground/50 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Inquiry date: {new Date(selectedInquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedInquiry(null)}
                      className="p-1 hover:bg-card-border rounded-lg text-foreground/40 hover:text-foreground/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/60" />

                  {/* Core Attributes details */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Email Address</span>
                      <p className="text-foreground truncate select-all">{selectedInquiry.email}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Phone Number</span>
                      <p className="text-foreground select-all">{selectedInquiry.phone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Website Type</span>
                      <p className="text-foreground">{selectedInquiry.websiteType}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Pages requested</span>
                      <p className="text-foreground">{selectedInquiry.pageCount || 'Unspecified'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Style preference</span>
                      <p className="text-foreground truncate">{selectedInquiry.designStyle || 'Unspecified'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-foreground/45 uppercase">Budget Range</span>
                      <p className="text-foreground truncate text-primary font-bold">{selectedInquiry.budgetRange || 'Open'}</p>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <span className="text-[10px] text-foreground/45 uppercase">Target deadline</span>
                      <p className="text-foreground truncate">{selectedInquiry.deadline || 'Standard'}</p>
                    </div>
                  </div>

                  {/* Integrated Features */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-foreground/45 uppercase font-bold flex items-center">
                      <Layers className="h-3 w-3 mr-1" /> Features Requested
                    </span>
                    {selectedInquiry.features && selectedInquiry.features.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedInquiry.features.map(f => (
                          <span 
                            key={f} 
                            className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/15 rounded text-[10px] font-bold"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-foreground/50">No special features selected.</p>
                    )}
                  </div>

                  {/* Requirements Text */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-foreground/45 uppercase font-bold flex items-center">
                      <Info className="h-3.5 w-3.5 mr-1" /> Project Brief & Description
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed bg-background/50 border border-border p-3.5 rounded-xl max-h-40 overflow-y-auto whitespace-pre-wrap select-all">
                      {selectedInquiry.description || 'No detailed description provided.'}
                    </p>
                  </div>

                  {/* Files Attachment */}
                  {selectedInquiry.files && selectedInquiry.files.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] text-foreground/45 uppercase font-bold">Attachments ({selectedInquiry.files.length})</span>
                      <div className="space-y-1">
                        {selectedInquiry.files.map((file, i) => (
                          <div 
                            key={i} 
                            className="p-2 border border-border rounded-lg bg-background flex items-center justify-between text-[11px] font-semibold text-foreground/90"
                          >
                            <span className="truncate">{file.name}</span>
                            <span className="text-foreground/45 flex-shrink-0">({file.size} KB)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status update selector in drawer */}
                  <div className="space-y-2 pt-4 border-t border-border/60">
                    <span className="text-[10px] text-foreground/45 uppercase font-bold block mb-1">Update Lead Status</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value as Inquiry['status'])}
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-xl focus:outline-none focus:border-primary text-foreground cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                </div>
              ) : (
                <div className="border border-dashed border-border p-12 text-center rounded-3xl text-sm font-semibold text-foreground/40 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <Info className="h-8 w-8 mb-2 text-foreground/20" />
                  Select a lead from the list to view its complete requirements brief and attachments.
                </div>
              )}
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
