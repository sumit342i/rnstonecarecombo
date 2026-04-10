# 🚀 Quick Start: Order Form Setup

## What's Been Created For You

✅ **order.html** - Professional order form page with:
- Customer information fields (name, email, phone, address)
- Product selection & quantity
- Payment method options
- Special instructions field
- Beautiful responsive design matching your site

✅ **Email Integration** - Automatic emails sent to:
- Your admin email: digital.work.3442@gmail.com (new order notification)
- Customer email: Confirmation + order details

✅ **Updated Links** - All "Order Now" buttons on your site now point to order.html

---

## ⚡ 5-Minute Setup

### Step 1: Create EmailJS Account (2 min)
1. Go to https://www.emailjs.com/
2. Sign up (free)
3. Verify your email

### Step 2: Set Up Gmail (2 min)
1. In EmailJS, go to **Email Services**
2. Click **Add New Service** → Select **Gmail**
3. Click **Connect** and log in with: **digital.work.3442@gmail.com**
4. Grant permission

### Step 3: Create Email Templates (1 min)
1. Go to **Email Templates**
2. Create template named: `template_admin_order`
3. Create template named: `template_customer_confirmation`
4. Copy template content from **ORDER_SETUP_GUIDE.md** file

### Step 4: Get Your Keys
1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### Step 5: Update order.html
1. Open `order.html` in code editor
2. Find line with: `emailjs.init('YOUR_PUBLIC_KEY_HERE')`
3. Replace `YOUR_PUBLIC_KEY_HERE` with your actual public key

### Step 6: Test It!
1. Open http://localhost/rn-stone-care(landing-page)%20v2/order.html
2. Fill out the form
3. Submit and check your emails ✅

---

## 📋 Detailed Setup (Full Article in ORDER_SETUP_GUIDE.md)

For complete instructions with screenshots and troubleshooting, see:
**→ ORDER_SETUP_GUIDE.md**

---

## 🎯 What Information is Collected

The order form collects:
- 👤 Full Name
- 📧 Email Address  
- 📱 Phone Number
- 📍 Full Address
- 🏙️ City & State
- 📮 Postal Code
- 📦 Product Quantity (1-5 packs)
- 💳 Payment Method (COD / Online / Bank Transfer)
- 📝 Special Instructions (optional)

---

## 💰 Pricing (Easy to Update)

Current pricing in **order.html**:
- 1 Pack: ₹499
- 2 Packs: ₹899
- 3 Packs: ₹1,299
- 4 Packs: ₹1,599
- 5+ Packs: Custom pricing

**To update prices:**
1. Find `const priceMap` in order.html (around line 250)
2. Change the rupee amounts
3. Save and refresh

---

## 📧 Emails Sent Automatically

### Admin Notification Email
When customer orders, you get an email with:
- ✓ Customer details (name, phone, email, address)
- ✓ Products ordered & quantity
- ✓ Total amount
- ✓ Payment method
- ✓ Special instructions
- ✓ Order date & time

→ **You can then send:** WhatsApp message, shipping updates, etc.

### Customer Confirmation Email
Customer receives:
- ✓ Order confirmation
- ✓ What they ordered
- ✓ Expected delivery timeline
- ✓ Your contact details
- ✓ Money-back guarantee message

---

## ✅ Features Included

✅ Form validation (required fields, email format, etc.)
✅ Auto-formatted phone numbers
✅ Responsive design (works on mobile/tablet/desktop)
✅ Success/error messages
✅ Loading state on submit button
✅ Auto-redirect after successful order
✅ Professional styling matching your brand
✅ Accessibility compliant
✅ SSL/security ready

---

## 🚀 Next Steps (Optional)

After basic setup works:

1. **Customize Email Templates**
   - Add your logo
   - Change text to match your brand voice
   - Add discount codes or coupons

2. **Add More Fields** (if needed)
   - Medical history
   - Dietary preferences
   - Doctor's recommendation
   - Reference code

3. **Set Up WhatsApp Notifications** (paid service)
   - Use Twilio API to send WhatsApp messages
   - Send automatic order confirmations

4. **Create Receipt/Invoice**
   - Email PDF invoices with orders

5. **Admin Dashboard**
   - View all orders in a spreadsheet
   - Track order status
   - Export data for analytics

---

## 🔗 File Structure

```
rn-stone-care(landing-page) v2/
├── index.html              (updated with order.html links)
├── order.html              (NEW - Order form page)
├── ORDER_SETUP_GUIDE.md    (NEW - Detailed setup guide)
├── styles.css              (existing - order form uses these styles)
├── script.js               (existing)
└── scroll-test.html        (test file)
```

---

## 💡 Pro Tips

1. **Test with different emails** before going live
2. **Check spam folder** first few times (add EmailJS to contacts)
3. **Keep EmailJS public key secret** - but it's public-safe
4. **Monitor daily limits** - Free tier: 200 emails/day
5. **Save customer emails** for future marketing/support

---

## ❓ FAQ

**Q: Do I need a backend?**
A: No! EmailJS handles everything from the browser.

**Q: Is it secure?**
A: Yes - your actual email credentials aren't exposed. EmailJS handles the secure connection.

**Q: Can I customize the emails?**
A: Yes! Edit templates directly in EmailJS and order.html.

**Q: What if customer doesn't receive email?**
A: Check spam folder. Add digital.work.3442@gmail.com to contacts to prevent future spam filtering.

**Q: Can I add more fields?**
A: Yes, but you'll need to update both form and email templates.

**Q: What's the cost?**
A: EmailJS is free for 200 emails/day. Upgrade to paid if needed.

---

## 📞 Support

EmailJS Issues: https://www.emailjs.com/docs/
Form Issues: Check browser console (F12 → Console tab)
Email delivery: Check gmail spam folder

---

## 🎉 You're All Set!

Once you complete the 5 steps above, your order form will be **fully functional** with:
- ✓ Automatic admin notifications
- ✓ Automatic customer confirmations
- ✓ Professional form experience
- ✓ Mobile-optimized

**Ready to receive orders!** 🚀
