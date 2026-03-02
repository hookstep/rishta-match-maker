

# Rishte Wale Sardarji - Matrimonial Profile Manager

## Overview
A matrimonial profile management app where the matchmaker and candidates can create, search, and share marriage profiles. Replaces the current WhatsApp text-based system with a proper searchable database.

---

## 1. Authentication & User Roles
- **Sign up / Login** page (email-based)
- Two roles: **Admin (Matchmaker)** and **Candidate**
- Admin can view, search, and manage all profiles
- Candidates can create/edit their own profile and view their own data

## 2. Profile Creation Form
A structured form capturing all the fields from the current WhatsApp format, plus gender:

**Personal Information:**
- Gender (Male/Female)
- Marital Status
- Surname, Name
- Date of Birth, Time of Birth, Place of Birth
- Height
- Manglik (Yes/No)
- Qualification
- Occupation
- Income
- Work Location

**Family Information:**
- Religion / Gotar / Caste
- Father's Occupation
- Mother's Occupation
- Siblings
- Family Class

**Additional Details:**
- Residence City
- Property Details
- Notes (free text)

**Photos:**
- Upload 3-4 photos with a gallery view on the profile

## 3. Profile Gallery & Search (Admin View)
- Dashboard showing all profiles as cards with photo, name, age, and city
- **Search bar** to search by name or any keyword
- **Filter options**: Gender, city, caste, marital status, age range
- Click a card to view the full profile detail page

## 4. Profile Detail Page
- Full profile displayed in a clean, formatted layout matching the WhatsApp text structure
- Photo gallery/carousel for candidate photos
- Action buttons: **Share via WhatsApp** and **Download as PDF**

## 5. WhatsApp Share
- One-click button that formats the profile into the familiar WhatsApp text format and opens WhatsApp with the pre-filled message

## 6. PDF Export
- Generate a nicely formatted PDF of the profile with photos, ready to download or print

## 7. Backend (Lovable Cloud)
- **Database** to store all profile data
- **Authentication** for login/signup
- **Storage** for candidate photo uploads
- **Row-level security** so candidates can only edit their own profiles, while admin can access all

