# 📧 Order Form + Email Setup Guide

## Overview
Your order form uses **EmailJS** - a free email service that sends emails directly from the browser without needing a backend server. This guide will walk you through the setup.

---

## ✅ Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click **Sign Up** (top right)
3. Create an account using your email (or sign in with Google)
4. Verify your email address

---

## ✅ Step 2: Connect Gmail Account

1. After signing up, go to **Email Services** section
2. Click **Add New Service**
3. Select **Gmail**
4. Click **Connect**
5. A popup will appear - sign in with your Gmail account (digital.work.3442@gmail.com)
6. Grant permission when asked
7. Copy the **Service ID** (you'll need it)

**Example Service ID:** `service_xxxxxxxxx`

---

## ✅ Step 3: Create Email Templates

### Template 1: Admin Notification Email
1. Go to **Email Templates** section
2. Click **Create New Template**
3. Name it: `template_admin_order`
4. In the **To Email** field, paste: `{{to_email}}`
5. Use this template content:

```
Subject: New Stone-Go Order from {{fullName}}

---

🎯 NEW ORDER RECEIVED

Order Details:
- Order Date: {{orderDate}} at {{orderTime}}
- Customer: {{fullName}}
- Email: {{email}}
- Phone: {{phone}}

📦 Product Details:
- Product: RN Stone Care Combo
- Quantity: {{quantity}} pack(s)
- Total Price: {{totalPrice}}
- Payment Method: {{paymentMethod}}

📍 Delivery Address:
{{address}}
{{city}}, {{state}} {{pincode}}

📝 Special Instructions:
{{notes}}

---

⚡ ACTION REQUIRED:
1. Confirm order to customer via WhatsApp/Email
2. Process payment if prepaid
3. Arrange delivery

---
```

### Template 2: Customer Confirmation Email
1. Click **Create New Template** again
2. Name it: `template_customer_confirmation`
3. In the **To Email** field, paste: `{{to_email}}`
4. Use this template content:

```
Subject: Your Stone-Go Order Confirmation #{{orderDate}}

---

🎉 Order Confirmed!

Hi {{fullName}},

Thank you for ordering RN Stone Care! Your order has been received and is being processed.

📦 ORDER DETAILS:
- Quantity: {{quantity}} pack(s)
- Total Amount: {{totalPrice}}
- Payment Method: {{paymentMethod}}
- Order Date: {{orderDate}}

✅ WHAT'S NEXT?
1. Our team will contact you via WhatsApp within 2 hours
2. We'll confirm your delivery address
3. Order will ship within 24 hours
4. You'll receive tracking details via SMS

🚚 DELIVERY:
- PAN-India Free Shipping
- Estimated delivery: 3-5 business days
- You can track your order anytime

💬 HAVE QUESTIONS?
Contact us on:
- WhatsApp: +91-XXXXXXXXXX
- Call: +91-XXXXXXXXXX
- Email: digital.work.3442@gmail.com

🔒 100% MONEY-BACK GUARANTEE
Not satisfied? Full refund within 30 days, no questions asked!

---

Best Regards,
RN Herbal Team
```

(Don't worry about the exact formatting - EmailJS will handle it)

---

## ✅ Step 4: Get Your Public Key

1. Go to **Account** settings (top right dropdown)
2. Click **API Keys**
3. Copy your **Public Key** (it looks like: `xxxxxxxxxxxxxxxxxxxxxxxx`)

---

## ✅ Step 5: Update order.html with Your Keys

Open `order.html` and find this line (it should be around line 250):

```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // We'll update this with actual public key
```

Replace it with:

```javascript
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace YOUR_PUBLIC_KEY_HERE with your actual public key
```

**Example:**
```javascript
emailjs.init('abc123def456ghi789jkl012');
```

---

## ✅ Step 6: Test the Order Form

1. Open `order.html` in your browser
2. Fill in the form with test data
3. Click **Place Order**
4. You should receive:
   - An email at `digital.work.3442@gmail.com` (admin notification)
   - A confirmation email at the customer's entered email

---

## 📝 Important Notes

### Gmail App Password (If Using 2FA)
If your Gmail has 2-factor authentication enabled:
1. Go to https://myaccount.google.com/security
2. Find **App passwords** (only shows if 2FA is enabled)
3. Generate an app password for EmailJS
4. Use that password in EmailJS Gmail connection

### Email Sending Limits
- **Free Tier:** 200 emails/day
- **Paid Plan:** Unlimited

### Update Pricing Anytime
In `order.html`, find the priceMap around line 250:

```javascript
const priceMap = {
  '1': '₹499',
  '2': '₹899',
  '3': '₹1,299',
  '4': '₹1,599',
  '5': 'Bulk pricing - will contact'
};
```

Change prices here and they'll auto-update on the form!

---

## 🔗 Link the Order Form to Your Site

In your `index.html`, update the order button to link to:
```html
<a href="order.html" class="nav-order-btn">Order Now 🛒</a>
```

You can also add a direct link in hero section, pricing section, etc.

---

## 🚀 Troubleshooting

### "Service not found" error
- Make sure you updated the Service ID in both templates
- Verify it matches the one from EmailJS account

### Emails not sending
- Check if Gmail account is properly connected in EmailJS
- Check spam/promotions folder
- Try with a different email address

### Form not validating
- Ensure all required fields are filled (marked with *)
- Email must be valid format
- Phone can only contain numbers and +

---

## 📧 Additional Email Features You Can Add Later

1. **Order Status Updates** - Send shipping tracking emails
2. **Follow-up Emails** - Ask for feedback after delivery
3. **WhatsApp Integration** - Use Twilio API (paid)
4. **SMS Notifications** - Use Twilio API (paid)
5. **Admin Dashboard** - View all orders in one place

---

## 💡 Pro Tips

1. **Personalize emails** - Update template text to match your brand voice
2. **Add branding** - Include your logo in email templates
3. **Track conversions** - Add UTM parameters to links in confirmation emails
4. **Schedule emails** - Set up follow-ups 3-7 days after order
5. **Test templates** - Always test with real email before going live

---

## Quick Setup Checklist

- [ ] Create EmailJS account
- [ ] Connect Gmail account
- [ ] Get Service ID
- [ ] Create admin notification template (`template_admin_order`)
- [ ] Create customer confirmation template (`template_customer_confirmation`)
- [ ] Get Public Key
- [ ] Update Public Key in order.html
- [ ] Test order form submission
- [ ] Verify emails received
- [ ] Update pricing if needed
- [ ] Add order page link to index.html

---

Questions? Check EmailJS docs: https://www.emailjs.com/docs/
