// Asset versioning: Update these environment variables when releasing new model versions
// Example: v1.0.1-models, v1.0.2-models, etc.
export const ENC_URL = import.meta.env.VITE_CHARACTER_MODEL_URL || '/models/character.enc';
export const HDR_URL = import.meta.env.VITE_ENVIRONMENT_MAP_URL || '/models/char_enviorment.hdr';

console.log('🎯 Asset URLs:', { ENC_URL, HDR_URL });
console.log('🎯 Environment variables:', {
  VITE_CHARACTER_MODEL_URL: import.meta.env.VITE_CHARACTER_MODEL_URL,
  VITE_ENVIRONMENT_MAP_URL: import.meta.env.VITE_ENVIRONMENT_MAP_URL
});

// Fallback loader to prevent UI breakage from network issues
export async function safeFetch(url: string): Promise<ArrayBuffer | null> {
  console.log(`🔄 Attempting to fetch: ${url}`);
  try {
    const res = await fetch(url);
    console.log(`📡 Fetch response for ${url}:`, res.status, res.statusText);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    console.log(`✅ Successfully loaded ${url}, size: ${buffer.byteLength} bytes`);
    return buffer;
  } catch (err) {
    console.error(`❌ Failed to load: ${url}`, err);
    return null;
  }
}

export const config = {
    developer: {
        name: "SURAJIT",
        fullName: "SURAJIT SAHOO",
        title: "AI & ML Engineer",
        description: "AI & ML Engineer based in Bhubaneswar, Odisha, India. Passionate about Training ML Models, Graphic Design, and Website Development."
    },
    social: {
        github: "https://github.com/Surajit00007",
        email: "surajit007inc@gmail.com",
        location: "Bhubaneswar, Odisha, India",
        linkedin: "https://www.linkedin.com/in/surajit-sahoo-084173335",
        instagram: "https://www.instagram.com/surajit._007",
        phone: "+91 9932442311"
    },
    about: {
        title: "About Me",
        description: "I am an AI & ML Engineer pursuing a Bachelor of Technology in Computer Science (AI & ML) at the Institute of Technical Education and Research, SOA University. I have a strong interest in Training ML Models, Graphic Design, Website Development, Film Making, and Content Creation."
    },
    experiences: [
        {
            position: "Bachelor of Technology",
            company: "Institute of Technical Education and Research, SOA University",
            period: "SEP 2023 - AUG 2027",
            location: "Bhubaneswar, Odisha",
            description: "Specialization: Computer Science (AI & ML). CGPA: 8.45/10 (up to 4th sem). Coursework: Data Structures & Algorithms (Java), Machine Learning, Deep Learning, Algorithm Analysis, Artificial Intelligence.",
            responsibilities: [],
            technologies: []
        }
    ],
    projects: [
        {
            id: 1,
            title: "Intelligent Chatbot (Cornell Movie Dialogs)",
            category: "AI/ML",
            description: "Transformer-based conversational AI model trained on Cornell Movie Dialogs with beam search and sampling.",
            date: "May 2025",
            technologies: "Transformer, Beam Search, Sampling",
            github: "https://github.com/Surajit00007/Intelligent_Chatbot_Development-project",
            image: "https://cdn.prod.website-files.com/6391b5b30283a58cafb3bb77/66cdf315ca3f21249b505811_chat-bot-innv.webp"
        },
        {
            id: 2,
            title: "Offline Customised LLM Chatbot",
            category: "AI / LLM",
            description: "A lightweight, fully offline chatbot built using Streamlit and Ollama that runs LLMs like phi3, mistral, or llama3 directly on your machine — completely private and secure. Supports chat memory, typing indicators, and customizable behavior (e.g., 'act like my teacher and rate my answers').",
            date: "Jan 2025",
            technologies: "Streamlit, Python, Ollama, LLMs (phi3, mistral, llama3)",
            github: "https://github.com/Surajit00007/Customised_GPT_project",
            image: "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2024/10/an-ai-chatbot-sitting-at-a-desk-at-home.jpg?w=1600&h=900&fit=crop"
        },
        {
            id: 3,
            title: "Automatic Room Light System (IoT)",
            category: "IoT",
            description: "Arduino Uno + IR sensors + relay-based automated light system with bidirectional counter and embedded C.",
            date: "Jun 2024",
            technologies: "Arduino Uno, IR Sensors, Relay, Embedded C",
            github: "https://github.com/Surajit00007/Automatic_Room_Light_System",
            image: "/images/project-3.webp"
        }
    ],
    contact: {
        email: "surajit007inc@gmail.com",
        phone: "+91 9932442311",
        github: "https://github.com/Surajit00007",
        linkedin: "https://www.linkedin.com/in/surajit-sahoo-084173335",
        whatsapp: "https://wa.me/9932442311",
        instagram: "https://www.instagram.com/surajit._007"
    },
    skills: {
        develop: {
            title: "DEVELOPMENT",
            description: "Software & AI/ML Development",
            details: "Experienced in Python, Java, and C. Experienced with Machine Learning libraries like scikit-learn, TensorFlow, OpenCV, NumPy, Pandas. Web development skills in HTML, CSS, JavaScript, Streamlit.",
            tools: ["Python", "Java", "C", "scikit-learn", "TensorFlow", "OpenCV", "NumPy", "Pandas", "HTML", "CSS", "JavaScript", "Streamlit", "Arduino IDE", "Embedded C", "MySQL", "Git", "GitHub", "Google Colab", "VS Code", "Jupyter Notebook"]
        },
        design: {
            title: "DESIGN",
            description: "Graphic & UI Design",
            details: "Experience with design tools for creating visual content.",
            tools: ["Canva", "Figma", "Kittle"]
        }
    },
    languages: {
        english: "Intermediate",
        hindi: "Fluent",
        bengali: "Fluent"
    },
    interests: [
        "Training ML Models",
        "Graphic Design",
        "Website Development",
        "Film Making",
        "Content Creation",
        "Singing"
    ]
};
