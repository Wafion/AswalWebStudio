import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone, 
      companyName, 
      websiteType, 
      pageCount, 
      designStyle, 
      budgetRange, 
      deadline, 
      features, 
      description,
      brandColors,
      logoStatus,
      designPreferences,
      designNotes,
      files 
    } = body;

    // Validation
    if (!name || !email || !websiteType) {
      return NextResponse.json(
        { error: 'Name, Email, and Website Type are required fields.' },
        { status: 400 }
      );
    }

    // Save inquiry to database (falls back to local JSON db file)
    const newInquiry = await db.createInquiry({
      name,
      email,
      phone: phone || '',
      companyName: companyName || '',
      websiteType,
      pageCount: pageCount || '',
      designStyle: designStyle || '',
      budgetRange: budgetRange || '',
      deadline: deadline || '',
      features: features || [],
      description: description || '',
      brandColors: brandColors || '',
      logoStatus: logoStatus || '',
      designPreferences: designPreferences || '',
      designNotes: designNotes || '',
      files: files || [],
    });

    // Simulate sending Confirmation Email to Customer
    console.log(`[EMAIL SENDING] Sending confirmation to customer: ${email}...`);
    console.log(`
      Subject: Aswal Web Studio - Proposal Request Confirmed
      Body: Hi ${name},
      Thank you for contacting Aswal Web Studio. We have successfully registered your request for "${websiteType}".
      Our project strategist will review your requirements and contact you shortly.
      Best regards,
      The Aswal Web Studio Team
    `);

    // Simulate sending Lead Notification to Admin Email (aman9lion@gmail.com)
    console.log(`[EMAIL SENDING] Sending lead details to admin: aman9lion@gmail.com...`);
    console.log(`
      Subject: [NEW LEAD ALERT] Aswal Web Studio - Lead from ${name}
      Body: A new proposal request has been submitted.
      Details:
      - Client Name: ${name}
      - Client Email: ${email}
      - Client Phone: ${phone || 'N/A'}
      - Company: ${companyName || 'N/A'}
      - Project/Service Type: ${websiteType}
      - Target Pages: ${pageCount || 'N/A'}
      - Style Preference: ${designStyle || 'N/A'}
      - Budget: ${budgetRange || 'Open'}
      - Deadline: ${deadline || 'Standard'}
      - Features Requested: ${(features || []).join(', ') || 'None'}
      - Brand Colors: ${brandColors || 'N/A'}
      - Logo Option: ${logoStatus || 'N/A'}
      - Design Preferences: ${designPreferences || 'N/A'}
      - Design Notes: ${designNotes || 'N/A'}
      - Brief Description: ${description || 'No description provided'}
      - Attachments: ${(files || []).map((f: any) => f.name).join(', ') || 'None'}
    `);

    // Simulate Admin Notification
    console.log(`[ADMIN NOTIFICATION] New Lead Captured: "${name}" requested "${websiteType}"`);

    return NextResponse.json(
      { message: 'Inquiry saved successfully', inquiry: newInquiry },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API Error in /api/inquiries:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err?.message },
      { status: 500 }
    );
  }
}
