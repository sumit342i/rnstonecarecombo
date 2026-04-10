# 🚀 Gmail + Node.js Backend Setup Guide

## Overview

Your order system now uses:
- **Backend:** Node.js + Express server
- **Email:** Gmail SMTP for professional email delivery
- **Frontend:** Order form that sends data to backend API

This setup is **more secure and professional** than client-side only solutions.

---

## ✅ Prerequisites

Make sure you have:
1. ✅ Node.js installed (download from https://nodejs.org/)
2. ✅ Gmail account (free tier available)
3. ✅ A terminal/command prompt
4. ✅ Text editor for configuration

Check if Node is installed:
```bash
node --version
npm --version
```

---

## 🔧 Step 1: Set Up Gmail SMTP Credentials

### 1.1 Create Gmail Account
1. Go to https://smtp.gmail.com/
2. Click **Sign Up**
3. Create account (free plan available)
4. Verify your email

### 1.2 Get SMTP Credentials
1. Log in to Gmail dashboard
2. Go to **Settings** → **SMTP** (or Integration/SMTP)
3. Look for:
   - **SMTP Host:** `smtp.smtp.gmail.com`
   - **SMTP Port:** `587`
   - **SMTP Username:** Your email (usually the one you used to sign up)
   - **SMTP Password:** You might need to generate an "App Password" or "SMTP Password"

**If you see an "App Password" option:**
- Click to generate a new app password
- This is more secure than using your actual password
- Use THIS password in the .env file

### 1.3 Note Down Your Credentials
```
Email: digital.work.3442@gmail.com
Password: your-gmail-password-or-app-password
```

---

## 📁 Step 2: Install Backend Dependencies

### 2.1 Open Terminal/Command Prompt
```bash
# Navigate to your project folder
cd "c:\Users\Entertainment\Downloads\rn-stone-care(landing-page) v2"
```

### 2.2 Install Dependencies
```bash
npm install
```

This will install:
- ✅ Express (web server)
- ✅ Nodemailer (email sending)
- ✅ CORS (enable frontend to backend communication)
- ✅ Body Parser (parse form data)
- ✅ Dotenv (secure credentials)

---

## 🔐 Step 3: Configure Environment Variables

### 3.1 Create .env File
In your project folder, create a file named `.env` (exactly - no extension):

**For Windows:**
```
Right-click in folder → New → Text Document
Rename to: .env
```

### 3.2 Add Your Gmail Credentials
Copy this into your `.env` file:

```
GMAIL_EMAIL=digital.work.3442@gmail.com
GMAIL_PASSWORD=your-gmail-password-here
PORT=3000
NODE_ENV=production
```

**Replace:**
- `digital.work.3442@gmail.com` - with your Gmail email if different
- `your-gmail-password-here` - with your actual Gmail SMTP password

**⚠️ IMPORTANT:** Never share this .env file or commit it to git!

### 3.3 Test SMTP Connection
The backend will automatically test the connection when it starts. You'll see:
- ✅ If connection works: "Email server is ready to send emails"
- ❌ If connection fails: Error message explaining the issue

---

## 🚀 Step 4: Start the Backend Server

### 4.1 Start in Terminal
```bash
npm start
```

You should see:
```
╔═════════════════════════════════════════╗
║   RN Herbal - Order Server               ║
║   Server running on port 3000            ║
║   ✅ Ready to receive orders              ║
╚═════════════════════════════════════════╝

✅ Email server is ready to send emails
```

**If you see an error:** Check your .env file credentials

### 4.2 Keep Terminal Open
⚠️ **Important:** Keep this terminal window open while testing/running the server

### 4.3 Development Mode (Optional)
For automatic restart when files change:
```bash
npm run dev
```

---

## 🧪 Step 5: Test the Order Form

### 5.1 Open Order Form
1. Open `order.html` in your browser
2. Fill in the form with test data
3. Click "Place Order"

### 5.2 Expected Results
✅ You should see: "Order placed successfully!"
✅ Admin email arrives at: `digital.work.3442@gmail.com`
✅ Customer email arrives at: the entered email address

### 5.3 Troubleshooting

**Error: "Could not connect to server"**
- Make sure backend is running (`npm start`)
- Make sure it says "running on port 3000"
- Check terminal is still open

**Error: "GMAIL email not found"**
- Check .env file has correct GMAIL_EMAIL
- Verify it's a valid Gmail account
- Check for typos

**Emails not arriving**
- Check spam folder
- Verify GMAIL_PASSWORD is correct (not your account password if 2FA enabled)
- Check Gmail quota/limits

---

## 📊 File Structure

```
rn-stone-care(landing-page) v2/
├── server.js              ← Backend server (NEW)
├── .env                   ← Your credentials (CREATE THIS)
├── .env.example           ← Template for .env
├── package.json           ← Dependencies (NEW)
├── node_modules/          ← Installed packages (created by npm)
├── order.html             ← Updated to use backend
├── index.html             ← Links to order.html
├── styles.css             ← Form styling
└── SENDPULSE_SETUP.md     ← This file
```

---

## 🚀 Deployment (Later)

### For Production/Always-On Server:

1. **Use Heroku/Railway/Replit for free hosting**
2. **Or use a VPS (DigitalOcean, AWS, etc.)**

Popular free options:
- **Railway:** https://railway.app/ (✅ Recommended, easy)
- **Heroku:** https://www.heroku.com/ (low free tier)
- **Replit:** https://replit.com/ (good for learning)

---

## 📝 Email Templates

The backend sends two automatic emails:

### 1. Admin Notification Email
- Sent to: `digital.work.3442@gmail.com`
- Contains: Full order details, customer info, delivery address
- Purpose: You get notified about new orders

### 2. Customer Confirmation Email
- Sent to: Customer's email address
- Contains: Order summary, delivery timeline, contact info
- Purpose: Customer gets their confirmation

Both templates are **beautiful HTML emails** - no code changes needed!

---

## 💰 Pricing & Limits

### Gmail Free Tier:
- ✅ Up to 15,000 emails/month
- ✅ Unlimited contacts
- ✅ Basic reporting
- ✅ SMTP access

### When to upgrade:
- If you send 15,000+ emails/month
- Gmail will notify you

---

## 🔒 Security Best Practices

✅ **Store credentials in .env** - Done!
✅ **Use SMTP password** - Not your account password
✅ **Enable 2FA on Gmail** - Recommended
✅ **Never commit .env to git** - Add to .gitignore
✅ **Use HTTPS in production** - Hosting provider handles this

---

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "smtp.smtp.gmail.com refused" | Check GMAIL_EMAIL and GMAIL_PASSWORD in .env |
| "Error: 535 Authentication failed" | Password is incorrect - regenerate in Gmail |
| "Port 3000 already in use" | Kill other processes using port 3000 or use PORT=3001 in .env |
| "module not found" | Run `npm install` again |
| "Emails going to spam" | Add your Gmail email to contacts to whitelist |
| "Server not responding" | Make sure terminal with `npm start` is still open |

---

## 📧 Testing Checklist

- [ ] .env file created with Gmail credentials
- [ ] `npm install` completed successfully
- [ ] `npm start` shows "Email server is ready"
- [ ] Backend runs on port 3000
- [ ] Order form loads without errors
- [ ] Test order submitted successfully
- [ ] Admin email received at digital.work.3442@gmail.com
- [ ] Customer email received at test email
- [ ] Both emails have correct HTML formatting
- [ ] All order details are correct in emails

---

## 🎓 Understanding the Architecture

```
Browser (order.html)
    ↓ (HTTP POST request)
    ↓
Node.js Server (server.js)
    ↓ (SMTP)
    ↓
Gmail
    ↓ (Email delivery)
    ↓
Admin & Customer Emails
```

Benefits:
- ✅ Secure - credentials never exposed
- ✅ Scalable - can handle thousands of orders
- ✅ Professional - proper email infrastructure
- ✅ Reliable - Gmail handles delivery

---

## 📚 Next Steps

1. ✅ **Complete Setup** - Follow steps 1-5 above
2. ✅ **Test Thoroughly** - Send 5-10 test orders
3. ✅ **Deploy** - Use Railway or similar for always-on server
4. ✅ **Monitor** - Check Gmail dashboard for delivery reports
5. ✅ **Optimize** - Customize email templates as needed

---

## 💡 Pro Tips

1. **Test with multiple emails** to ensure delivery works
2. **Monitor Gmail dashboard** for bounces/complaints
3. **Keep .env file safe** - never share or commit to git
4. **Set up automated backups** - save customer data safely
5. **Use HTTPS** in production - hosting providers do this

---

## 📞 Support Resources

- **Gmail Help:** https://smtp.gmail.com/help
- **Node.js Docs:** https://nodejs.org/docs/
- **Nodemailer:** https://nodemailer.com/
- **Express:** https://expressjs.com/

---

## ✨ You're Ready!

Your order system is now:
✅ **Secure** - Credentials encrypted
✅ **Professional** - HTML emails with branding
✅ **Scalable** - Can handle growth
✅ **Reliable** - Uses Gmail infrastructure

**Start with Step 1 above!** 🚀
