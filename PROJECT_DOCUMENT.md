# Project Folder Structure and File Tree

This document outlines the folder structure and important files within the Daily Expense Tracker App project.

## Root Directory

- **app.tsx**  
  Handles routing for the application.

- **firebase.ts**  
  Firebase configuration for authentication and data storage.

- **vite-env.d.ts**  
  Defines types for environment variables.

- **.env.development**  
  Environment variables for the development environment.

- **.env.production**  
  Environment variables for the production environment, containing secrets for deployment.

- **vercel.json**  
  Configuration for deploying the app to Vercel.

---

## src Folder Structure

### 1. **assets/**

Stores images and other public data required by the app.

### 2. **components/**

Reusable UI components used across different parts of the app.

Example:

- `Button.tsx`
- `InputField.tsx`

### 3. **pages/**

Contains the main pages of the app.

- **LoginPage.tsx**  
  The login page where users can authenticate with their credentials.

- **SignupPage.tsx**  
  The registration page for new users to sign up using Firebase authentication.

- **DashboardPage.tsx**  
  The main dashboard that shows income and expenses after logging in.

### 4. **sections/**

Contains specific sections of the pages, which are modular components for different features.

- **ExpenseTableSection.tsx**  
  Displays the table of income and expenses with sorting and filtering features.

- **GenerateAISummary.tsx**  
  Section that generates AI-powered summaries and suggestions for expense management.

### 5. **services/**

Contains files that handle API interactions and external services.

- **openai.ts**  
  File for handling interactions with the OpenAI API.

- **userServices.ts**  
  File that handles Firebase-related API calls like user authentication and database operations.

### 6. **store/**

Contains state management setup.

- **userStore.ts**  
  Manages the global state for user data using Zustand for client-side state management.

### 7. **utils/**

Contains utility functions for commonly used operations across the app.

Example:

- `formatDate.ts`  
  A utility function for formatting dates in a specific format.

### 8. **types/**

Stores all TypeScript definitions and interfaces used in the app.

- **types.ts**  
  Contains global types like user data, transaction objects, and more.

---

## Hosting and Deployment

- The app is hosted on **Vercel**, and deployment is handled via the **vercel.json** configuration file.

<!-- task completion  -->

I hope you're doing well. I’m pleased to inform you that I have successfully completed the Daily Expense Tracker App assignment. Below is a detailed breakdown of the tasks:

### User Authentication:

- Implemented user sign-up and login with Firebase using Google authentication.
- Collected full name, email ID, and profession during registration.
- Utilized React Hook Form and Zod for validation in the authentication form.
- **Status:** Completed

### Data Storage:

- Integrated Firebase to securely store user data for easy access when needed.
- **Status:** Completed

### Core Features:

- **Income and Expense Table:**

  - Displayed a sortable table with columns for date, name, income type, income amount, expense type, and expense amount.
  - Added filtering options for day, week, month, and extra income/expense categories.
  - **Status:** Completed

- **Add Income/Expense:**
  - Added a button to add new entries with a form using React Hook Form and Zod for validation.
  - New transactions are validated, submitted, and displayed in the table.
  - **Status:** Completed

### Predefined Types:

- Included predefined income types (Salary, Bonus, Investment, Rental Income, Other) and expense types (Rent, Food, Travel, Cosmetics, Bills, Other) in dropdowns.
- **Status:** Completed

### Table Instructions:

- Ensured the table layout is clear, easy to navigate, and can be sorted by date and name.
- **Status:** Completed

### AI Integration:

- Integrated AI using OpenAI ChatGPT-4 Mini to generate reports analyzing user income and expenses, with actionable recommendations.
- Rendered the AI response using React Markdown.
- **Status:** Completed

### State Management:

- Used Zustand for client-side state management and Tanstack Query for server-side state and API fetching.
- Utilized React Suspense (built into Tanstack Query) to handle loading and error states.
- **Status:** Completed

### Bonus (Optional):

- The entire project is built with TypeScript for enhanced type safety.
- **Status:** Completed

### UI and Styling:

- Used the ShadCN UI library throughout the project for a clean, consistent interface.
- Tailwind CSS was used for writing custom styles.
- **Status:** Completed

### Project Documentation:

- The project setup is detailed in the repository’s README.md file.
- The project folder structure and file tree are documented in the PROJECT_DOCUMENT.md file.
- **Status:** Completed

### Code Quality:

- Configured ESLint for linting and used Husky pre-commit hooks to automatically fix ESLint and Prettier errors.
- **Status:** Completed

### Deployment:

The app is deployed and accessible here: [https://daily-expense-tracker-app.vercel.app/](https://daily-expense-tracker-app.vercel.app/)

The codebase is available in the GitHub repository here: [https://github.com/lamimershed/daily-expense-tracker-app.git](https://github.com/lamimershed/daily-expense-tracker-app.git)

### Test Login:

You can test the login functionality with the following credentials:

- **Email:** testuser@gmail.com
- **Password:** test1234
