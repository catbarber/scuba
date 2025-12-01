const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Load environment variables for local development
if (process.env.FUNCTIONS_EMULATOR === 'true' || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
  console.log('Running in development mode with .env file');
}

admin.initializeApp();

// Get the Firebase project ID safely
const getProjectId = () => {
  // In Firebase environment, it's automatically available
  if (process.env.GCLOUD_PROJECT) {
    return process.env.GCLOUD_PROJECT;
  }
  
  // For local development/emulator, use from .env with custom variable name
  if (process.env.FUNCTIONS_EMULATOR === 'true' || process.env.NODE_ENV === 'development') {
    return process.env.PROJECT_ID || process.env.APP_PROJECT_ID || 'scuba-web-app';
  }
  
  // Fallback
  return 'scuba-web-app';
};

// Get configuration from environment or Firebase config
const getConfig = () => {
  // For local development/emulator, use .env file
  if (process.env.FUNCTIONS_EMULATOR === 'true' || process.env.NODE_ENV === 'development') {
    return {
      // Email Configuration
      email: process.env.GMAIL_EMAIL || 'feveck.chris@gmail.com',
      password: process.env.GMAIL_PASSWORD || 'hnnqjvebsgcsxvlq',
      
      // Company Information
      companyName: process.env.COMPANY_NAME || 'AquaDeep Tobago Tours',
      companyPhone: process.env.COMPANY_PHONE || '+1 (587) 598-3639',
      companyEmail: process.env.COMPANY_EMAIL || 'info@aquadeeptobago.com',
      
      // Admin Emails (can be comma-separated)
      adminEmails: process.env.ADMIN_EMAIL ? 
        process.env.ADMIN_EMAIL.split(',').map(email => email.trim()) : 
        ['christopher.feveck@gmail.com', 'feveck.chris@gmail.com'],
      
      // Application Configuration
      siteUrl: process.env.SITE_URL || 'https://aquadeep.tt',
      allowedOrigins: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        [
          'https://aquadeeptt.com',
          'http://localhost:3000',
          'https://aquadeep.tt',
          'https://scuba-web-app.web.app',
          'https://scuba-web-app.firebaseapp.com'
        ]
    };
  }
  
  // For production, use Firebase config with fallback to environment
  try {
    const firebaseConfig = functions.config();
    return {
      email: firebaseConfig.gmail?.email || process.env.GMAIL_EMAIL || 'feveck.chris@gmail.com',
      password: firebaseConfig.gmail?.password || process.env.GMAIL_PASSWORD || 'hnnqjvebsgcsxvlq',
      companyName: process.env.COMPANY_NAME || 'AquaDeep Tobago Tours',
      companyPhone: process.env.COMPANY_PHONE || '+1 (587) 598-3639',
      companyEmail: process.env.COMPANY_EMAIL || 'info@aquadeeptobago.com',
      adminEmails: process.env.ADMIN_EMAIL ? 
        process.env.ADMIN_EMAIL.split(',').map(email => email.trim()) : 
        ['christopher.feveck@gmail.com', 'feveck.chris@gmail.com'],
      siteUrl: process.env.SITE_URL || 'https://aquadeep.tt',
      allowedOrigins: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        [
          'https://aquadeeptt.com',
          'http://localhost:3000',
          'https://aquadeep.tt',
          'https://scuba-web-app.web.app',
          'https://scuba-web-app.firebaseapp.com'
        ]
    };
  } catch (error) {
    console.warn('Firebase config not available, using environment variables');
    return {
      email: process.env.GMAIL_EMAIL || 'feveck.chris@gmail.com',
      password: process.env.GMAIL_PASSWORD || 'hnnqjvebsgcsxvlq',
      companyName: process.env.COMPANY_NAME || 'AquaDeep Tobago Tours',
      companyPhone: process.env.COMPANY_PHONE || '+1 (587) 598-3639',
      companyEmail: process.env.COMPANY_EMAIL || 'info@aquadeeptobago.com',
      adminEmails: process.env.ADMIN_EMAIL ? 
        process.env.ADMIN_EMAIL.split(',').map(email => email.trim()) : 
        ['christopher.feveck@gmail.com', 'feveck.chris@gmail.com'],
      siteUrl: process.env.SITE_URL || 'https://aquadeep.tt',
      allowedOrigins: process.env.ALLOWED_ORIGINS ? 
        process.env.ALLOWED_ORIGINS.split(',') : 
        [
          'https://aquadeeptt.com',
          'http://localhost:3000',
          'https://aquadeep.tt',
          'https://scuba-web-app.web.app',
          'https://scuba-web-app.firebaseapp.com'
        ]
    };
  }
};

// Configure nodemailer with your email service
const createTransporter = () => {
  const config = getConfig();
  
  console.log('Creating email transporter with config:', {
    email: config.email,
    companyName: config.companyName,
    adminEmails: config.adminEmails,
    isDevelopment: process.env.NODE_ENV === 'development'
  });
  
  // For development/testing, use ethereal.email (fake SMTP)
  if (process.env.NODE_ENV === 'development' && config.email.includes('example.com')) {
    console.log('Using Ethereal test email service for development');
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'test@ethereal.email',
        pass: 'test-password'
      }
    });
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password,
    },
    // Additional SMTP options for better reliability
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  });
};

// Initialize transporter
const transporter = createTransporter();

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// CORS middleware function
const corsMiddleware = (req, res, next) => {
  const config = getConfig();
  const allowedOrigins = config.allowedOrigins;
  
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
  } else {
    next();
  }
};

// Helper function to get add-on details
const getAddOnName = (id) => {
  const addOns = {
    1: 'Underwater Photography',
    2: 'Full Gear Rental',
    3: 'Gourmet Lunch Package',
    4: 'Private Transportation',
    5: 'Video Recording'
  };
  return addOns[id] || 'Add-On';
};

const getAddOnPrice = (id) => {
  const prices = {
    1: 45,
    2: 30,
    3: 25,
    4: 40,
    5: 60
  };
  return prices[id] || 0;
};

// Email templates (same as before, just using updated config)
const clientEmailTemplate = (bookingData, config) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - ${config.companyName}</title>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white;
    }
    .header { 
      background: linear-gradient(135deg, #0077B6 0%, #00A8E8 100%); 
      color: white; 
      padding: 40px 30px; 
      text-align: center; 
      border-radius: 0 0 20px 20px;
    }
    .logo {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .subtitle {
      opacity: 0.9;
      font-size: 16px;
    }
    .content { 
      padding: 40px 30px; 
    }
    .booking-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 15px rgba(0, 168, 232, 0.1);
    }
    .detail-row { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #f0f0f0;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
      font-weight: 500;
    }
    .detail-value {
      font-weight: 600;
      color: #0077B6;
      text-align: right;
    }
    .section-title {
      color: #0077B6;
      font-size: 18px;
      font-weight: 700;
      margin: 25px 0 15px 0;
    }
    .highlight-box {
      background: linear-gradient(135deg, rgba(0, 168, 232, 0.08) 0%, rgba(0, 119, 182, 0.08) 100%);
      border-left: 4px solid #00A8E8;
      padding: 20px;
      margin: 25px 0;
      border-radius: 0 8px 8px 0;
    }
    .total-row {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
      border: 2px solid #00A8E8;
    }
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      background: linear-gradient(135deg, #c9f73e, #9bca3e);
      color: #333;
      border-radius: 20px;
      font-weight: 700;
      font-size: 14px;
      margin: 10px 0;
    }
    .footer { 
      text-align: center; 
      margin-top: 40px; 
      color: #666; 
      font-size: 14px; 
      border-top: 1px solid #e2e8f0;
      padding-top: 25px;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0;
      flex-wrap: wrap;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    @media (max-width: 600px) {
      .header, .content {
        padding: 25px 20px;
      }
      .detail-row {
        flex-direction: column;
        gap: 5px;
      }
      .contact-info {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">${config.companyName}</div>
      <div class="subtitle">Tobago's Premier Adventure Experience</div>
    </div>
    
    <div class="content">
      <h2 style="color: #0077B6; margin-bottom: 10px;">Hello ${bookingData.customerInfo.fullName},</h2>
      <p style="color: #555; margin-bottom: 25px; font-size: 16px;">
        Thank you for booking with ${config.companyName}! Your adventure request has been received and our team is preparing for your experience.
      </p>
      
      <div class="status-badge">
        ✅ BOOKING CONFIRMED - ${bookingData.bookingDetails.bookingId}
      </div>
      
      <div class="booking-card">
        <h3 style="color: #0077B6; margin: 0 0 20px 0; font-size: 22px;">
          ${bookingData.tour.name}
        </h3>
        
        <div class="section-title">Booking Details</div>
        <div class="detail-row">
          <span class="detail-label">Booking Reference:</span>
          <span class="detail-value">${bookingData.bookingDetails.bookingId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tour Date:</span>
          <span class="detail-value">${new Date(bookingData.bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Participants:</span>
          <span class="detail-value">${bookingData.bookingDetails.participants} person(s)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tour Location:</span>
          <span class="detail-value">${bookingData.tour.location}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">${bookingData.tour.duration}</span>
        </div>
        
        ${bookingData.bookingDetails.addOns && bookingData.bookingDetails.addOns.length > 0 ? `
        <div class="section-title">Add-On Services</div>
        ${bookingData.bookingDetails.addOns.map(addOnId => `
          <div class="detail-row">
            <span class="detail-label">${getAddOnName(addOnId)}:</span>
            <span class="detail-value">+$${getAddOnPrice(addOnId)}</span>
          </div>
        `).join('')}
        ` : ''}
        
        <div class="total-row">
          <div class="detail-row" style="border-bottom: none; padding-bottom: 0;">
            <span class="detail-label" style="font-size: 18px;">Total Amount:</span>
            <span class="detail-value" style="font-size: 24px; color: #0077B6; font-weight: 800;">
              $${bookingData.bookingDetails.totalWithAddOns || bookingData.bookingDetails.totalAmount}
            </span>
          </div>
          <p style="color: #666; font-size: 14px; margin: 10px 0 0 0; font-style: italic;">
            *No payment required now. We'll contact you for payment details.
          </p>
        </div>
      </div>
      
      <div class="highlight-box">
        <h4 style="color: #0077B6; margin-top: 0;">📋 Important Next Steps</h4>
        <ul style="color: #555; padding-left: 20px;">
          <li>Our team will contact you at <strong>${bookingData.customerInfo.phone}</strong> within 24 hours</li>
          <li>Please arrive <strong>15 minutes before</strong> your scheduled time</li>
          <li>Bring valid ID and any required medical certificates</li>
          ${bookingData.tour.category === 'marine' ? `<li>Swimwear and towel are recommended</li>` : `<li>Comfortable walking shoes and water bottle are recommended</li>`}
        </ul>
      </div>
      
      ${bookingData.customerInfo.specialRequests ? `
      <div class="booking-card">
        <h4 style="color: #0077B6; margin-top: 0;">Your Special Requests</h4>
        <p style="color: #555; background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 3px solid #00A8E8;">
          ${bookingData.customerInfo.specialRequests}
        </p>
      </div>
      ` : ''}
      
      <div class="footer">
        <div class="contact-info">
          <div class="contact-item">
            <span>📞</span>
            <span>${config.companyPhone}</span>
          </div>
          <div class="contact-item">
            <span>✉️</span>
            <span>${config.companyEmail}</span>
          </div>
          <div class="contact-item">
            <span>🌐</span>
            <span>${config.siteUrl}</span>
          </div>
        </div>
        <p style="color: #999; font-size: 13px; margin-top: 20px;">
          © ${new Date().getFullYear()} ${config.companyName}. All rights reserved.<br>
          This email was sent to ${bookingData.customerInfo.email}. 
          <a href="%unsubscribe_url%" style="color: #00A8E8;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const adminEmailTemplate = (bookingData, config, projectId) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Alert - ${config.companyName}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 700px; margin: 0 auto; background: white; }
    .alert-header { 
      background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%); 
      color: white; 
      padding: 30px; 
      text-align: center;
      border-radius: 0 0 20px 20px;
    }
    .content { padding: 30px; }
    .info-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      margin: 20px 0;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 15px rgba(255, 107, 107, 0.1);
    }
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 20px 0;
    }
    .detail-item {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #00A8E8;
    }
    .label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .value {
      font-weight: 700;
      color: #0077B6;
      margin-top: 5px;
      font-size: 16px;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
      flex-wrap: wrap;
    }
    .action-btn {
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }
    .primary { background: #00A8E8; color: white; }
    .success { background: #4CAF50; color: white; }
    .warning { background: #FF9800; color: white; }
    .danger { background: #f44336; color: white; }
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 25px 0;
    }
    .stat-box {
      background: #f8fafc;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      border: 2px solid #e2e8f0;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 800;
      color: #0077B6;
      margin: 10px 0;
    }
    .stat-label {
      color: #666;
      font-size: 14px;
    }
    @media (max-width: 600px) {
      .actions {
        flex-direction: column;
      }
      .action-btn {
        text-align: center;
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="alert-header">
      <h1 style="margin: 0; font-size: 28px;">🚨 NEW BOOKING ALERT</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
        ${config.companyName} - ${bookingData.tour.category === 'marine' ? '🌊 Marine Tour' : '🏔️ Land Tour'}
      </p>
    </div>
    
    <div class="content">
      <div class="info-card">
        <h2 style="color: #ff6b6b; margin-top: 0;">Customer Information</h2>
        
        <div class="detail-grid">
          <div class="detail-item">
            <div class="label">Full Name</div>
            <div class="value">${bookingData.customerInfo.fullName}</div>
          </div>
          <div class="detail-item">
            <div class="label">Email</div>
            <div class="value">${bookingData.customerInfo.email}</div>
          </div>
          <div class="detail-item">
            <div class="label">Phone</div>
            <div class="value">${bookingData.customerInfo.phone}</div>
          </div>
          ${bookingData.customerInfo.experienceLevel ? `
          <div class="detail-item">
            <div class="label">Experience Level</div>
            <div class="value">${bookingData.customerInfo.experienceLevel}</div>
          </div>
          ` : ''}
          <div class="detail-item">
            <div class="label">Referral Source</div>
            <div class="value">${bookingData.customerInfo.hearAboutUs || 'Not specified'}</div>
          </div>
          <div class="detail-item">
            <div class="label">Booking Date</div>
            <div class="value">${new Date(bookingData.metadata.createdAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div class="info-card">
        <h2 style="color: #0077B6; margin-top: 0;">Tour Details</h2>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-label">Tour</div>
            <div class="stat-value">${bookingData.tour.name}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Date</div>
            <div class="stat-value">${new Date(bookingData.bookingDetails.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Participants</div>
            <div class="stat-value">${bookingData.bookingDetails.participants}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Total Amount</div>
            <div class="stat-value">$${bookingData.bookingDetails.totalWithAddOns || bookingData.bookingDetails.totalAmount}</div>
          </div>
        </div>
        
        <div class="detail-grid">
          <div class="detail-item">
            <div class="label">Booking ID</div>
            <div class="value" style="font-family: monospace;">${bookingData.bookingDetails.bookingId}</div>
          </div>
          <div class="detail-item">
            <div class="label">Status</div>
            <div class="value" style="color: #ff9800;">${bookingData.bookingDetails.status.toUpperCase()}</div>
          </div>
          <div class="detail-item">
            <div class="label">Location</div>
            <div class="value">${bookingData.tour.location}</div>
          </div>
          <div class="detail-item">
            <div class="label">Category</div>
            <div class="value">${bookingData.tour.category === 'marine' ? 'Marine' : 'Land'}</div>
          </div>
        </div>
        
        ${bookingData.customerInfo.specialRequests ? `
        <div style="margin-top: 20px; padding: 20px; background: #fff8e1; border-radius: 8px; border-left: 4px solid #ffb300;">
          <h3 style="color: #ff8f00; margin-top: 0;">📝 Special Requests</h3>
          <p style="color: #666; margin: 10px 0 0 0;">${bookingData.customerInfo.specialRequests}</p>
        </div>
        ` : ''}
      </div>
      
      ${bookingData.bookingDetails.addOns && bookingData.bookingDetails.addOns.length > 0 ? `
      <div class="info-card">
        <h3 style="color: #0077B6; margin-top: 0;">🛠️ Add-On Services</h3>
        <div style="display: grid; gap: 10px; margin-top: 15px;">
          ${bookingData.bookingDetails.addOns.map(addOnId => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f0f9ff; border-radius: 6px;">
              <span style="font-weight: 600;">${getAddOnName(addOnId)}</span>
              <span style="color: #0077B6; font-weight: 700;">+$${getAddOnPrice(addOnId)}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}
      
      <div class="actions">
        <a href="https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fbookings~2F${bookingData.id}" 
           class="action-btn primary" 
           target="_blank">
          📊 View in Firestore
        </a>
        <a href="mailto:${bookingData.customerInfo.email}" 
           class="action-btn success">
          ✉️ Email Customer
        </a>
        <a href="tel:${bookingData.customerInfo.phone}" 
           class="action-btn warning">
          📞 Call Customer (${config.companyPhone})
        </a>
        <a href="${config.siteUrl}/admin/bookings/${bookingData.id}" 
           class="action-btn danger" 
           target="_blank">
          ⚙️ Manage Booking
        </a>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 10px; border: 1px dashed #00A8E8;">
        <h4 style="color: #0077B6; margin-top: 0;">📋 Quick Actions</h4>
        <p style="color: #666; margin-bottom: 15px;">Time-sensitive actions for this booking:</p>
        <ol style="color: #555; padding-left: 20px;">
          <li>Contact customer at <strong>${bookingData.customerInfo.phone}</strong> within <strong>24 hours</strong></li>
          <li>Verify availability for ${new Date(bookingData.bookingDetails.date).toLocaleDateString()}</li>
          <li>Assign a tour guide based on experience level</li>
          <li>Prepare equipment for ${bookingData.bookingDetails.participants} participants</li>
          <li>Update booking status in the system</li>
        </ol>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2e7d32; font-weight: 600;">
          📞 Company Contact: ${config.companyPhone} | ✉️ ${config.companyEmail}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Main function to send emails when a booking is created
exports.sendBookingEmails = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snapshot, context) => {
    const bookingData = snapshot.data();
    const bookingId = context.params.bookingId;

    // Generate a readable booking ID
    const readableBookingId = `AQUA-${bookingId.substring(0, 8).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    
    // Update the booking with the generated ID
    await snapshot.ref.update({
      'bookingDetails.bookingId': readableBookingId,
      'bookingDetails.status': 'confirmed',
      'metadata.lastUpdated': new Date().toISOString()
    });

    // Add the booking ID to the data for email templates
    const emailData = {
      ...bookingData,
      bookingDetails: {
        ...bookingData.bookingDetails,
        bookingId: readableBookingId
      },
      id: bookingId
    };

    try {
      const config = getConfig();
      const projectId = getProjectId();
      
      // Send email to customer
      const clientMailOptions = {
        from: `"${config.companyName}" <${config.email}>`,
        to: emailData.customerInfo.email,
        subject: `✅ Booking Confirmation: ${emailData.tour.name} - ${readableBookingId}`,
        html: clientEmailTemplate(emailData, config),
        text: `
${config.companyName} - Booking Confirmation
Booking ID: ${readableBookingId}

Hello ${emailData.customerInfo.fullName},

Thank you for booking with ${config.companyName}!

Tour Details:
- Tour: ${emailData.tour.name}
- Date: ${new Date(emailData.bookingDetails.date).toLocaleDateString()}
- Participants: ${emailData.bookingDetails.participants}
- Location: ${emailData.tour.location}
- Total Amount: $${emailData.bookingDetails.totalWithAddOns || emailData.bookingDetails.totalAmount}

Our team will contact you at ${emailData.customerInfo.phone} within 24 hours to confirm details.

For any questions, contact us:
📞 ${config.companyPhone}
✉️ ${config.companyEmail}

Best regards,
${config.companyName} Team
        `
      };

      // Send email to all admin emails
      const adminMailPromises = config.adminEmails.map(adminEmail => {
        const adminMailOptions = {
          from: `"${config.companyName} Booking System" <${config.email}>`,
          to: adminEmail,
          subject: `🚨 New Booking: ${emailData.customerInfo.fullName} - ${emailData.tour.name}`,
          html: adminEmailTemplate(emailData, config, projectId),
          text: `NEW BOOKING ALERT - ${config.companyName}

Customer: ${emailData.customerInfo.fullName}
Tour: ${emailData.tour.name}
Date: ${new Date(emailData.bookingDetails.date).toLocaleDateString()}
Participants: ${emailData.bookingDetails.participants}
Total: $${emailData.bookingDetails.totalWithAddOns || emailData.bookingDetails.totalAmount}
Booking ID: ${readableBookingId}

Contact: ${emailData.customerInfo.phone} | ${emailData.customerInfo.email}

View in Firestore: https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fbookings~2F${bookingId}`
        };
        
        return transporter.sendMail(adminMailOptions);
      });

      // Send all emails
      const [clientResult, ...adminResults] = await Promise.all([
        transporter.sendMail(clientMailOptions),
        ...adminMailPromises
      ]);

      console.log('Emails sent successfully:', {
        bookingId: readableBookingId,
        customerEmail: emailData.customerInfo.email,
        adminEmails: config.adminEmails,
        clientMessageId: clientResult.messageId,
        adminMessageIds: adminResults.map(r => r.messageId)
      });
      
      // Update booking status to indicate emails were sent
      await snapshot.ref.update({
        'metadata.emailsSent': true,
        'metadata.emailsSentAt': new Date().toISOString(),
        'metadata.clientMessageId': clientResult.messageId,
        'metadata.adminMessageIds': adminResults.map(r => r.messageId),
        'metadata.adminEmails': config.adminEmails
      });

      return { success: true, bookingId: readableBookingId };

    } catch (error) {
      console.error('Error sending emails:', error);
      
      // Update booking with error information
      await snapshot.ref.update({
        'metadata.emailError': error.message,
        'metadata.emailRetryCount': admin.firestore.FieldValue.increment(1),
        'metadata.lastError': new Date().toISOString()
      });

      // Log error to Firebase Console
      functions.logger.error('Email sending failed:', {
        bookingId: readableBookingId,
        error: error.message,
        stack: error.stack
      });

      throw new functions.https.HttpsError('internal', 'Failed to send confirmation emails');
    }
  });

// HTTP Function to manually trigger email sending with CORS
exports.resendBookingEmails = functions.https.onRequest(async (req, res) => {
  // Apply CORS middleware
  corsMiddleware(req, res, async () => {
    try {
      // Check authentication via Bearer token or API key
      const authHeader = req.headers.authorization;
      const apiKey = req.headers['x-api-key'];
      
      // In development, allow unauthenticated requests
      if (process.env.NODE_ENV !== 'development' && !authHeader && !apiKey) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { bookingId } = req.body;
      
      if (!bookingId) {
        return res.status(400).json({
          success: false,
          error: 'Booking ID is required'
        });
      }

      const snapshot = await admin.firestore()
        .collection('bookings')
        .doc(bookingId)
        .get();

      if (!snapshot.exists) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found'
        });
      }

      const bookingData = snapshot.data();
      const config = getConfig();
      const projectId = getProjectId();
      
      // Send email to customer again
      const clientMailOptions = {
        from: `"${config.companyName}" <${config.email}>`,
        to: bookingData.customerInfo.email,
        subject: `📧 Resent: Booking Confirmation - ${bookingData.tour.name}`,
        html: clientEmailTemplate({
          ...bookingData,
          id: bookingId
        }, config),
        text: `Your booking confirmation for ${bookingData.tour.name} has been resent. Booking ID: ${bookingData.bookingDetails.bookingId}`
      };

      // Send email to all admin emails again
      const adminMailPromises = config.adminEmails.map(adminEmail => {
        const adminMailOptions = {
          from: `"${config.companyName} Booking System" <${config.email}>`,
          to: adminEmail,
          subject: `📤 Booking Resent: ${bookingData.customerInfo.fullName}`,
          html: adminEmailTemplate({
            ...bookingData,
            id: bookingId
          }, config, projectId)
        };
        
        return transporter.sendMail(adminMailOptions);
      });

      const [clientResult, ...adminResults] = await Promise.all([
        transporter.sendMail(clientMailOptions),
        ...adminMailPromises
      ]);

      // Update booking record
      await snapshot.ref.update({
        'metadata.emailsResentAt': new Date().toISOString(),
        'metadata.emailsResentBy': req.headers['x-user-id'] || 'system',
        'metadata.lastResendMessageId': clientResult.messageId
      });

      return res.status(200).json({
        success: true,
        message: 'Emails resent successfully',
        bookingId: bookingData.bookingDetails.bookingId,
        clientMessageId: clientResult.messageId,
        adminMessageIds: adminResults.map(r => r.messageId)
      });

    } catch (error) {
      console.error('Error resending emails:', error);
      
      return res.status(500).json({
        success: false,
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
});

// HTTP Function to check booking status with CORS
exports.checkBookingStatus = functions.https.onRequest(async (req, res) => {
  // Apply CORS middleware
  corsMiddleware(req, res, async () => {
    try {
      const { bookingId, email, phone } = req.query;
      
      if (!bookingId && !email && !phone) {
        return res.status(400).json({
          success: false,
          error: 'Booking ID, email, or phone is required'
        });
      }

      let query = admin.firestore().collection('bookings');
      
      if (bookingId) {
        // Search by booking ID
        query = query.where('bookingDetails.bookingId', '==', bookingId);
      } else if (email) {
        // Search by customer email
        query = query.where('customerInfo.email', '==', email);
      } else if (phone) {
        // Search by customer phone
        query = query.where('customerInfo.phone', '==', phone);
      }

      const snapshot = await query.orderBy('metadata.createdAt', 'desc').limit(10).get();
      
      if (snapshot.empty) {
        return res.status(404).json({
          success: false,
          error: 'No bookings found'
        });
      }

      const bookings = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          bookingId: data.bookingDetails.bookingId,
          tour: {
            name: data.tour.name,
            category: data.tour.category,
            location: data.tour.location
          },
          date: data.bookingDetails.date,
          participants: data.bookingDetails.participants,
          status: data.bookingDetails.status,
          customer: {
            name: data.customerInfo.fullName,
            email: data.customerInfo.email,
            phone: data.customerInfo.phone
          },
          total: data.bookingDetails.totalWithAddOns || data.bookingDetails.totalAmount,
          createdAt: data.metadata.createdAt,
          emailsSent: data.metadata.emailsSent || false
        };
      });

      return res.status(200).json({
        success: true,
        count: bookings.length,
        bookings: bookings
      });

    } catch (error) {
      console.error('Error checking booking status:', error);
      
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// Function to send booking status updates
exports.sendStatusUpdate = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    const bookingId = context.params.bookingId;

    // Check if status changed
    if (newData.bookingDetails.status !== previousData.bookingDetails.status) {
      try {
        const config = getConfig();
        
        const statusColors = {
          'confirmed': { bg: '#d4edda', border: '#c3e6cb', icon: '✅' },
          'cancelled': { bg: '#f8d7da', border: '#f5c6cb', icon: '❌' },
          'completed': { bg: '#d1ecf1', border: '#bee5eb', icon: '🏁' },
          'pending': { bg: '#fff3cd', border: '#ffeaa7', icon: '⏳' }
        };

        const statusInfo = statusColors[newData.bookingDetails.status] || statusColors.pending;

        const statusEmailTemplate = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
              .status-card { 
                background: ${statusInfo.bg}; 
                border: 2px solid ${statusInfo.border}; 
                border-radius: 10px; 
                padding: 25px; 
                margin: 20px 0;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="status-card">
              <h2>${statusInfo.icon} Booking Status Updated</h2>
              <p>Your booking for <strong>${newData.tour.name}</strong> is now:</p>
              <h3 style="font-size: 28px; color: #0077B6;">${newData.bookingDetails.status.toUpperCase()}</h3>
              <p>Booking ID: ${newData.bookingDetails.bookingId}</p>
              <p>If you have any questions, contact us:</p>
              <p>📞 ${config.companyPhone} | ✉️ ${config.companyEmail}</p>
            </div>
          </body>
          </html>
        `;

        const mailOptions = {
          from: `"${config.companyName}" <${config.email}>`,
          to: newData.customerInfo.email,
          subject: `${statusInfo.icon} Booking Status Update: ${newData.tour.name}`,
          html: statusEmailTemplate,
          text: `Booking Status Update - ${config.companyName}

Your booking status for "${newData.tour.name}" has been updated to: ${newData.bookingDetails.status}.

Booking ID: ${newData.bookingDetails.bookingId}

If you have any questions, contact us:
📞 ${config.companyPhone}
✉️ ${config.companyEmail}

Best regards,
${config.companyName} Team`
        };

        await transporter.sendMail(mailOptions);
        
        console.log(`Status update email sent for booking ${bookingId}`);
        
        // Log the status change
        await change.after.ref.update({
          'metadata.lastStatusChange': new Date().toISOString(),
          'metadata.previousStatus': previousData.bookingDetails.status,
          'metadata.statusUpdateEmailSent': true
        });

      } catch (error) {
        console.error('Error sending status update email:', error);
        
        // Log the error
        functions.logger.error('Status update email failed:', {
          bookingId: bookingId,
          error: error.message
        });
      }
    }

    return null;
  });

// Health check endpoint
exports.healthCheck = functions.https.onRequest(async (req, res) => {
  // Apply CORS middleware
  corsMiddleware(req, res, async () => {
    try {
      const config = getConfig();
      const projectId = getProjectId();
      
      // Check Firebase connection
      const firestoreCheck = await admin.firestore().collection('health').doc('check').set({
        timestamp: new Date().toISOString(),
        status: 'healthy',
        projectId: projectId
      });
      
      // Check email transporter
      const emailCheck = await transporter.verify();
      
      return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        company: config.companyName,
        services: {
          firestore: 'connected',
          email: 'ready',
          projectId: projectId,
          adminEmails: config.adminEmails
        },
        endpoints: {
          sendBookingEmails: 'active',
          resendBookingEmails: 'active',
          checkBookingStatus: 'active',
          healthCheck: 'active'
        },
        version: '2.0.0'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });
});

// Test email endpoint
exports.testEmail = functions.https.onRequest(async (req, res) => {
  // Apply CORS middleware
  corsMiddleware(req, res, async () => {
    try {
      const config = getConfig();
      const projectId = getProjectId();
      
      const testMailOptions = {
        from: `"${config.companyName}" <${config.email}>`,
        to: config.adminEmails[0], // Send to first admin
        subject: `Test Email - ${config.companyName} Booking System`,
        text: `This is a test email from ${config.companyName} booking system.

Project ID: ${projectId}
Environment: ${process.env.NODE_ENV || 'production'}
Time: ${new Date().toLocaleString()}

If you receive this email, the system is working correctly.

Contact: ${config.companyPhone}
Email: ${config.companyEmail}`,
        html: `
          <h1>Test Email - ${config.companyName}</h1>
          <p>This is a test email from the booking system.</p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Project ID:</strong> ${projectId}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'production'}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>If you receive this email, the system is working correctly.</p>
          <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Contact Information:</strong></p>
            <p>📞 ${config.companyPhone}</p>
            <p>✉️ ${config.companyEmail}</p>
          </div>
        `
      };

      const result = await transporter.sendMail(testMailOptions);
      
      return res.status(200).json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        to: config.adminEmails[0],
        company: config.companyName,
        projectId: projectId
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
});

// Function to send daily booking summary to admins
exports.sendDailySummary = functions.pubsub.schedule('every day 08:00').onRun(async (context) => {
  try {
    const config = getConfig();
    const projectId = getProjectId();
    
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStart = new Date(yesterday.setHours(0, 0, 0, 0));
    const yesterdayEnd = new Date(yesterday.setHours(23, 59, 59, 999));
    
    // Get bookings from yesterday
    const snapshot = await admin.firestore()
      .collection('bookings')
      .where('metadata.createdAt', '>=', yesterdayStart.toISOString())
      .where('metadata.createdAt', '<=', yesterdayEnd.toISOString())
      .get();
    
    const bookings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        bookingId: data.bookingDetails.bookingId,
        tour: data.tour.name,
        customer: data.customerInfo.fullName,
        date: data.bookingDetails.date,
        participants: data.bookingDetails.participants,
        total: data.bookingDetails.totalWithAddOns || data.bookingDetails.totalAmount,
        status: data.bookingDetails.status
      };
    });
    
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total || 0), 0);
    const totalParticipants = bookings.reduce((sum, booking) => sum + (booking.participants || 0), 0);
    
    const summaryHtml = `
      <h1>📊 Daily Booking Summary - ${config.companyName}</h1>
      <p>Date: ${yesterdayStart.toLocaleDateString()}</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
        <div style="background: #e3f2fd; padding: 20px; border-radius: 10px; text-align: center;">
          <h3 style="margin: 0; color: #1976d2;">Total Bookings</h3>
          <p style="font-size: 36px; font-weight: bold; margin: 10px 0; color: #1976d2;">${totalBookings}</p>
        </div>
        <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; text-align: center;">
          <h3 style="margin: 0; color: #2e7d32;">Total Revenue</h3>
          <p style="font-size: 36px; font-weight: bold; margin: 10px 0; color: #2e7d32;">$${totalRevenue.toFixed(2)}</p>
        </div>
        <div style="background: #fff3e0; padding: 20px; border-radius: 10px; text-align: center;">
          <h3 style="margin: 0; color: #f57c00;">Total Participants</h3>
          <p style="font-size: 36px; font-weight: bold; margin: 10px 0; color: #f57c00;">${totalParticipants}</p>
        </div>
      </div>
      
      ${bookings.length > 0 ? `
      <h3>📋 Recent Bookings</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Booking ID</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Customer</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Tour</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Date</th>
            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${bookings.map(booking => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.bookingId}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.customer}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${booking.tour}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date(booking.date).toLocaleDateString()}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">$${booking.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      ` : '<p>No bookings yesterday.</p>'}
      
      <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 10px;">
        <p><strong>View all bookings in Firestore:</strong></p>
        <p><a href="https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fbookings" target="_blank">
          https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fbookings
        </a></p>
      </div>
    `;
    
    // Send to all admin emails
    const emailPromises = config.adminEmails.map(adminEmail => {
      const mailOptions = {
        from: `"${config.companyName} Daily Summary" <${config.email}>`,
        to: adminEmail,
        subject: `📊 Daily Summary: ${totalBookings} Bookings - ${yesterdayStart.toLocaleDateString()}`,
        html: summaryHtml,
        text: `Daily Booking Summary - ${config.companyName}
Date: ${yesterdayStart.toLocaleDateString()}

Total Bookings: ${totalBookings}
Total Revenue: $${totalRevenue.toFixed(2)}
Total Participants: ${totalParticipants}

View details: https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fbookings`
      };
      
      return transporter.sendMail(mailOptions);
    });
    
    await Promise.all(emailPromises);
    
    console.log(`Daily summary sent to ${config.adminEmails.length} admin(s)`);
    
    return null;
  } catch (error) {
    console.error('Error sending daily summary:', error);
    return null;
  }
});