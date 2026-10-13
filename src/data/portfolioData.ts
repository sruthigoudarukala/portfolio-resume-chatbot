import profileImg from '../assets/images/sruthi_profile_portrait_1791560093291.jpg';
import smsClassifierImg from '../assets/images/sms_spam_classifier_1791658054278.jpg';
import housePriceImg from '../assets/images/house_price_app_1791658065107.jpg';
import { SkillCategory, ExperienceItem, EducationItem, ProjectItem, CertificationItem } from '../types.ts';

export const PERSONAL_INFO = {
  name: "Sruthi Arukala",
  shortName: "Sruthi",
  title: "Data Science Learner | M.Tech Structural Engineering",
  location: "Hyderabad, Telangana",
  email: "sruthigoud.arkala@gmail.com",
  linkedIn: "https://www.linkedin.com/in/sruthi-arukala",
  linkedInHandle: "linkedin.com/in/sruthi-arukala",
  gitHub: "https://github.com/sruthigoudarukala",
  gitHubHandle: "github.com/sruthigoudarukala",
  summary: "Data science learner with an M.Tech in Structural Engineering and 18 months of teaching experience. Currently training in machine learning and deep learning at Innomatics Research Labs. Built and deployed machine learning projects using Python, Scikit-learn, Streamlit and Vercel. Seeking an entry-level Data Scientist or Data Analyst role.",
  targetRole: "Seeking an entry-level Data Scientist or Data Analyst role",
  profileImage: profileImg,
};

export const SKILL_GROUPS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python"],
    description: "Core programming language for data analysis, machine learning scripting, and backend API logic."
  },
  {
    category: "Libraries",
    items: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "TensorFlow/Keras"],
    description: "Data manipulation, exploratory data analysis, visualization, and building predictive machine learning and deep learning models."
  },
  {
    category: "Deployment",
    items: ["Streamlit", "Vercel"],
    description: "Deploying interactive data science web applications and production-ready machine learning REST APIs."
  },
  {
    category: "Tools",
    items: ["Git/GitHub", "Power BI", "Excel"],
    description: "Version control, code collaboration, business intelligence dashboards, and spreadsheet data analysis."
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "sms-spam-classifier-api",
    title: "SMS Spam Classifier API",
    shortDesc: "Machine learning model that classifies SMS messages as spam or ham, deployed as a live REST API on Vercel.",
    fullDesc: "Built an NLP-based machine learning model that accurately detects whether incoming SMS messages are legitimate (ham) or spam. Trained using Python and Scikit-learn with text preprocessing and vectorization pipelines, and deployed as a live, fast API on Vercel.",
    image: smsClassifierImg,
    techStack: ["Python", "Scikit-learn", "Vercel", "NLP Text Classification", "REST API"],
    deploymentPlatform: "Vercel",
    highlights: [
      "Trained machine learning classification pipeline with text preprocessing and tokenization",
      "Categorizes incoming SMS messages into spam or ham",
      "Deployed as a live API on Vercel for real-time inference"
    ]
  },
  {
    id: "house-price-prediction-app",
    title: "House Price Prediction App",
    shortDesc: "Linear Regression model that predicts house prices, deployed as an interactive web application where users enter house details and see a predicted price.",
    fullDesc: "Developed an end-to-end regression application that estimates residential real estate prices based on key property features. Features an intuitive Streamlit interface allowing users to input property specifications and instantly receive real-time house price predictions.",
    image: housePriceImg,
    techStack: ["Python", "Scikit-learn", "Linear Regression", "Streamlit", "Data Preprocessing"],
    deploymentPlatform: "Streamlit",
    highlights: [
      "Built and tuned a Linear Regression model in Python using Scikit-learn",
      "Interactive Streamlit web application where users enter house attributes and view predicted prices",
      "Clean UI for real-time model predictions and feature exploration"
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "innomatics-training",
    role: "Data Science Training",
    organization: "Innomatics Research Labs",
    location: "Hyderabad, Telangana",
    period: "Dec 2025 - Present",
    type: "Professional Training",
    description: "Comprehensive hands-on training in core data science, machine learning, and deep learning workflows.",
    highlights: [
      "Python programming for data manipulation and analysis",
      "Exploratory Data Analysis (EDA) and data visualization using Pandas, NumPy, and Matplotlib",
      "Inferential and descriptive statistics for data modeling",
      "Machine learning algorithms with Scikit-learn and deep learning with TensorFlow/Keras",
      "Model deployment on cloud platforms including Streamlit and Vercel"
    ]
  },
  {
    id: "assistant-professor",
    role: "Assistant Professor",
    organization: "Sree Dattha Institute of Engineering & Science (JNTUH affiliated)",
    location: "Hyderabad, Telangana",
    period: "2019 - 2021",
    type: "Academic & Teaching (18 Months)",
    description: "Undergraduate instruction and institutional leadership in the Department of Civil Engineering.",
    highlights: [
      "Taught Building Materials and Concrete Technology courses to undergraduate engineering students",
      "Served as Institutional Cultural Head, organizing collegiate events and student development initiatives",
      "Coordinated a comprehensive 2-day technical workshop on Total Station modern surveying instruments"
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "mtech",
    degree: "M.Tech",
    specialization: "Structural Engineering",
    institution: "Sree Dattha Institute of Engineering & Science",
    affiliation: "JNTUH",
    year: "2019",
    score: "GPA 8.64"
  },
  {
    id: "btech",
    degree: "B.Tech",
    specialization: "Civil Engineering",
    institution: "Sree Dattha Institute of Engineering & Science",
    affiliation: "JNTUH",
    year: "2016",
    score: "73.92%"
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "innomatics-ds-training",
    name: "Data Science Training (in progress)",
    issuer: "Innomatics Research Labs",
    period: "2025 to present"
  }
];

