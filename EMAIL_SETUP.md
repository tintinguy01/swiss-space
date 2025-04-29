# Contact Form Email Setup

This document outlines how to set up the email functionality for your portfolio contact form.

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the frontend. Here's how to set it up:

### Step 1: Create an EmailJS Account

1. Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Verify your email address

### Step 2: Add an Email Service

1. Go to the "Email Services" tab
2. Click "Add New Service"
3. Select your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note the Service ID (you'll need this later)

### Step 3: Create an Email Template

1. Go to the "Email Templates" tab
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{user_name}}` - will be replaced with the sender's name
   - `{{user_email}}` - will be replaced with the sender's email
   - `{{message}}` - will be replaced with the message content
4. Save the template
5. Note the Template ID (you'll need this later)

### Step 4: Get Your Public Key

1. Go to the "Account" section
2. Navigate to the "API Keys" tab
3. Copy your Public Key

### Step 5: Update Your Code

Open the file `app/components/sections/ContactCard.tsx` and find the `handleSubmit` function. 
Replace the placeholders in the `emailjs.sendForm` function with your actual values:

```javascript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  e.currentTarget,       // This should stay as is
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
);
```

## Testing

After setting up EmailJS, test your contact form to make sure it's working correctly:

1. Fill out the form with valid information
2. Submit the form
3. Check your email to see if you received the message

## Troubleshooting

If you encounter issues with the email functionality:

1. Check the browser console for any errors
2. Verify that your EmailJS credentials are correct
3. Make sure your email service account is properly connected
4. Check if you've reached the free tier limits of EmailJS (200 emails/month on the free plan)
5. Test the form in an incognito/private browser window to rule out browser extensions causing issues

## Need More Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS React Guide: [https://www.emailjs.com/docs/examples/reactjs/](https://www.emailjs.com/docs/examples/reactjs/) 