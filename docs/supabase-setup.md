# Supabase Setup Guide

## Prerequisites

- Supabase account (https://supabase.com)
- Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `podio-ai-chat` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for project initialization (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Configure Environment Variables

1. Create `.env.local` file in your project root
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Podio OAuth Configuration (will be configured in Task 3)
PODIO_CLIENT_ID=your_podio_client_id
PODIO_CLIENT_SECRET=your_podio_client_secret
PODIO_REDIRECT_URI=http://localhost:3001/auth/callback

# Google Gemini AI Configuration (will be configured in Task 8)
GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3001
```

## Step 4: Run Database Migrations

1. Go to **SQL Editor** in your Supabase dashboard
2. Run the migration scripts in order:

### Migration 1: Initial Schema

```sql
-- Copy and paste the content from supabase/migrations/001_initial_schema.sql
```

### Migration 2: RLS Policies

```sql
-- Copy and paste the content from supabase/migrations/002_rls_policies.sql
```

### Migration 3: Storage Policies

```sql
-- Copy and paste the content from supabase/migrations/003_storage_policies.sql
```

## Step 5: Create Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Create the following buckets:

### User Avatars Bucket

- **Name**: `user-avatars`
- **Public**: `false`
- **File size limit**: `5MB`
- **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`

### Chat Files Bucket

- **Name**: `chat-files`
- **Public**: `false`
- **File size limit**: `10MB`
- **Allowed MIME types**: `image/*, application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### Exports Bucket

- **Name**: `exports`
- **Public**: `false`
- **File size limit**: `50MB`
- **Allowed MIME types**: `application/json, text/csv, application/pdf`

### Temp Bucket

- **Name**: `temp`
- **Public**: `false`
- **File size limit**: `10MB`
- **Allowed MIME types**: `*/*`

## Step 6: Verify Setup

1. Go to **Table Editor** and verify all tables are created:

   - `users`
   - `chat_sessions`
   - `messages`
   - `podio_cache`
   - `files`
   - `system_settings`

2. Go to **Authentication** → **Policies** and verify RLS is enabled on all tables

3. Go to **Storage** and verify all buckets are created with correct policies

## Step 7: Test Database Connection

Run the development server:

```bash
npm run dev
```

The application should now connect to Supabase successfully.

## Troubleshooting

### Common Issues

1. **Environment variables not loading**

   - Ensure `.env.local` is in the project root
   - Restart the development server after adding variables

2. **Database connection errors**

   - Verify project URL and keys are correct
   - Check if project is active in Supabase dashboard

3. **RLS policy errors**

   - Ensure all migration scripts ran successfully
   - Check that policies are applied to correct tables

4. **Storage bucket errors**
   - Verify bucket names match exactly
   - Check that storage policies are applied

### Support

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create an issue in the project repository

## Next Steps

After completing this setup:

1. **Task 3**: Implement Supabase Auth with Podio OAuth Integration
2. **Task 4**: Design and Implement Modular Chat UI
3. **Task 5**: Set Up Supabase Realtime for Live Chat Updates

