CitizenCare Portal

CitizenCare Portal is a multi-step social support application form built using React + TypeScript + Vite.
It allows users to fill personal, family, and financial information, supports English/Arabic translation, and includes an AI-assisted writing helper powered by OpenAI.

**Getting Started**

**1. Install Dependencies**

npm install

**2. Environment Setup**

Create a .env file at the project root and add the following key:

VITE_OPENAI_API_KEY="your_api_key_here"

Note: The placeholder value for `VITE_OPENAI_API_KEY` provided in this codebase is for demonstration and interview purposes only. 
If you need to test the OpenAI integration, please let me know — I can share the valid API key privately.  
In a real production environment, API keys must be securely stored on the backend or managed through environment variables — they should never be hardcoded or exposed in frontend code.

**3. Start the development server**

npm run dev

Runs at http://localhost:3000

**4. Tech Stack used**

| Category             | Technology                               |
| -------------------- | ---------------------------------------- |
| UI Framework         | **React 19 + Vite + TypeScript**         |
| Styling              | **Tailwind CSS + Material UI**           |
| Forms                | **React Hook Form + Yup Validation**     |
| State Management     | **Redux Toolkit (RTK)**                  |
| Internationalization | **react-i18next**                        |
| AI Integration       | **OpenAI GPT API**                       |
| Utilities            | **Axios, React Router, React Hot Toast** |

**5. Architecture Overview**

Please visit architecture_and_improvements.txt file for details.

The application demonstrates:
- A step-based multi-form flow with validation and global progress tracking
- React Hook Form + Yup validation integrated with TypeScript
- Localization (English / Arabic) with dynamic field-level revalidation
- Responsive and accessible UI using Tailwind + MUI
- AI helper integration to assist users in writing better descriptions
