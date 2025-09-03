# Podio OAuth App Registration Guide

## **Step-by-Step Instructions**

### **1. Access Podio Developer Dashboard**

- Go to [Podio Developer Dashboard](https://developers.podio.com/)
- Log in with your Podio account
- Navigate to the "Apps" or "Applications" section

### **2. Create New OAuth Application**

- Click "Create New App" or "Register Application"
- Fill in the application details:
  - **App Name**: "Podio AI Chat Assistant"
  - **Description**: "AI-powered chat interface for Podio data analysis"
  - **App Type**: Web Application
  - **Redirect URI**: `http://localhost:3000/api/auth/callback/podio` (for development)
  - **Scopes**: Select the required permissions (typically read access to items, comments, files)

### **3. Obtain Credentials**

After registration, you'll receive:

- **Client ID**: Your unique application identifier
- **Client Secret**: Your application secret (keep this secure)

### **4. OAuth Endpoints**

- **Authorization Endpoint**: Podio will provide this during registration
- **Token Endpoint**: `https://api.podio.com/oauth/token/v2`
- **User Info Endpoint**: `https://api.podio.com/user/status`

### **5. Environment Variables**

Add these to your `.env.local` file:

```env
PODIO_CLIENT_ID=your_client_id_here
PODIO_CLIENT_SECRET=your_client_secret_here
PODIO_REDIRECT_URI=http://localhost:3000/api/auth/callback/podio
```

## **Important Notes**

- Keep your Client Secret secure and never commit it to version control
- The redirect URI must exactly match what you register in Podio
- For production, update the redirect URI to your production domain
- Test the OAuth flow in development before deploying

## **Next Steps**

After registration, proceed to configure NextAuth.js with these credentials.
