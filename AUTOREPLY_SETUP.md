# Setting Up Auto-Reply Email Template

This guide explains how to set up an auto-reply email template that will be sent to users who submit your contact form.

## Create an Auto-Reply Template in EmailJS

1. Log in to your [EmailJS account](https://www.emailjs.com/)
2. Go to the "Email Templates" tab
3. Click "Create New Template"
4. Set an appropriate name for your template (e.g., "Auto Reply Template")
5. Design your auto-reply email with the following variables:
   - `{{to_name}}` - will be replaced with the user's name
   - `{{to_email}}` - will be replaced with the user's email
   - `{{message}}` - (optional) will be replaced with the message they sent

### Sample Template Content

**Subject**: Thank you for your message

**Body**:
```html
<h2>Thank you for reaching out, {{to_name}}!</h2>

<p>I've received your message and will get back to you as soon as possible.</p>

<p>For your reference, here's a copy of the message you sent:</p>

<div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
  {{message}}
</div>

<p>Best regards,<br>
Your Name</p>
```

6. Save the template
7. Note the Template ID (you'll need this for your environment variables)

## Update Your Environment Variables

Add the following variable to your environment:

```
NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id
```

Where to add this:
- If you're using a local environment: add to `.env.local` file
- If using Vercel or similar: add to the environment variables in your project settings
- If using other deployment platforms: follow their documentation for setting environment variables

## Testing

After setting up the auto-reply template:

1. Fill out your contact form with valid information
2. Submit the form
3. Check the email you submitted in the form to see if you received the auto-reply
4. Also check that you (the site owner) still receive the original contact message

## Troubleshooting

If the auto-reply isn't working:

1. Check browser console for errors
2. Verify your EmailJS credentials and template ID are correct
3. Make sure your email service account is properly connected
 