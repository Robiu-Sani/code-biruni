/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Company information database
const COMPANY_INFO = {
  name: "CodeBiruni",
  tagline: "Building Digital Excellence - Your Hybrid Software Solution Partner",
  description: "CodeBiruni is a premier hybrid software company providing end-to-end digital solutions including web development, mobile applications, enterprise software, and innovative educational platforms. We combine cutting-edge technology with creative design to deliver exceptional digital experiences.",
  
  services: {
    web: [
      "Full-Stack Web Development",
      "MERN Stack Solutions (MongoDB, Express.js, React, Node.js)",
      "Frontend & Backend Development",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions",
      "CMS Development",
      "API Development & Integration"
    ],
    mobile: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Solutions (React Native, Flutter)",
      "Hybrid Mobile Apps",
      "Mobile UI/UX Design"
    ],
    enterprise: [
      "Custom Enterprise Software",
      "Business Process Automation",
      "CRM & ERP Solutions",
      "Cloud Solutions & Migration",
      "Database Design & Management"
    ],
    education: [
      "Learning Management Systems (LMS)",
      "E-learning Platforms",
      "Educational Mobile Apps",
      "Virtual Classroom Solutions",
      "Student Management Systems"
    ],
    design: [
      "UI/UX Design & Prototyping",
      "Brand Identity Design",
      "User Experience Research",
      "Interactive Design",
      "Design System Creation"
    ]
  },

  expertise: [
    "JavaScript/TypeScript", "React/Next.js", "Node.js/Express", "Python/Django",
    "MongoDB/PostgreSQL", "AWS/Google Cloud", "Docker/Kubernetes", "React Native/Flutter",
    "GraphQL/REST APIs", "Machine Learning Integration", "Blockchain Solutions"
  ],

  contact: {
    email: "codebiruny@gmail.com",
    phones: ["+8801617688805", "+880176407140"],
    location: "Dhaka, Bangladesh",
    linkedin: "https://www.linkedin.com/company/107740161/",
    hours: {
      weekdays: "Saturday - Thursday: 9:00 AM – 6:00 PM",
      friday: "Friday: Closed"
    }
  },

  pricing: {
    models: [
      "Project-based Pricing",
      "Hourly Rates",
      "Monthly Retainers",
      "Dedicated Team Hiring"
    ],
    factors: [
      "Project Complexity",
      "Timeline",
      "Technology Stack",
      "Maintenance Requirements"
    ]
  },

  team: {
    size: "10+",
    expertise: "Senior developers, designers, project managers, and QA specialists",
    approach: "Agile methodology with transparent communication"
  },

  values: [
    "Quality & Excellence",
    "Innovation & Creativity",
    "Client-Centric Approach",
    "Timely Delivery",
    "Continuous Learning",
    "Technical Excellence"
  ],

  achievements: [
    "50+ Successful Projects",
    "95% Client Satisfaction Rate",
    "30+ Happy Customers",
    "5+ Years Industry Experience",
    "Award-Winning Designs"
  ]
};

// Response templates for different query types
const RESPONSE_TEMPLATES = {
  greeting: `Welcome to ${COMPANY_INFO.name}! 🚀

${COMPANY_INFO.tagline}

I'm your AI assistant here to help you learn about our services and how we can transform your digital presence. How can I assist you today?`,

  services: `At ${COMPANY_INFO.name}, we offer comprehensive digital solutions:

🌐 **WEB DEVELOPMENT**
${COMPANY_INFO.services.web.map(service => `• ${service}`).join('\n')}

📱 **MOBILE APPS**
${COMPANY_INFO.services.mobile.map(service => `• ${service}`).join('\n')}

🏢 **ENTERPRISE SOLUTIONS**
${COMPANY_INFO.services.enterprise.map(service => `• ${service}`).join('\n')}

🎓 **EDUCATION PLATFORMS**
${COMPANY_INFO.services.education.map(service => `• ${service}`).join('\n')}

🎨 **DESIGN SERVICES**
${COMPANY_INFO.services.design.map(service => `• ${service}`).join('\n')}

Which service interests you the most?`,

  contact: `📞 **Contact ${COMPANY_INFO.name}**

📧 Email: ${COMPANY_INFO.contact.email}
📱 Phone: ${COMPANY_INFO.contact.phones.join(' / ')}
📍 Location: ${COMPANY_INFO.contact.location}
💼 LinkedIn: ${COMPANY_INFO.contact.linkedin}

**Business Hours:**
${COMPANY_INFO.contact.hours.weekdays}
${COMPANY_INFO.contact.hours.friday}

Ready to start your project? Let's schedule a consultation!`,

  expertise: `💻 **Our Technical Expertise**

${COMPANY_INFO.expertise.map(skill => `• ${skill}`).join('\n')}

We stay ahead of technology trends to deliver future-proof solutions.`,

  pricing: `💰 **Pricing & Engagement Models**

${COMPANY_INFO.pricing.models.map(model => `• ${model}`).join('\n')}

**Factors affecting pricing:**
${COMPANY_INFO.pricing.factors.map(factor => `• ${factor}`).join('\n')}

💡 *Contact us for a personalized quote based on your specific requirements.*`,

  portfolio: `🎯 **Our Achievements**

${COMPANY_INFO.achievements.map(achievement => `• ${achievement}`).join('\n')}

We've delivered exceptional results across various industries including e-commerce, education, healthcare, and enterprise solutions.`,

  process: `🔄 **Our Development Process**

1. **Discovery & Planning** - Understanding your vision and requirements
2. **Design & Prototyping** - Creating intuitive user experiences
3. **Development & Testing** - Agile development with quality assurance
4. **Deployment & Launch** - Smooth deployment and go-live support
5. **Maintenance & Support** - Ongoing optimization and updates

We ensure transparency at every stage!`,

  education: `🎓 **Education Platform Expertise**

We build innovative educational solutions including:
${COMPANY_INFO.services.education.map(service => `• ${service}`).join('\n')}

Our ed-tech solutions feature:
• Interactive learning interfaces
• Progress tracking & analytics
• Mobile learning capabilities
• Virtual classroom integration
• Assessment and grading systems

Perfect for schools, universities, and online course providers!`,

  ecommerce: `🛒 **E-commerce Solutions**

We create powerful online stores with:
• Custom e-commerce development
• Payment gateway integration
• Inventory management
• Order processing systems
• Customer relationship management
• Mobile shopping apps
• Analytics and reporting

Boost your online sales with our cutting-edge e-commerce solutions!`,

  emergency: `I apologize, but I'm having trouble understanding your query. 

I'm specialized in helping with information about:
• Our services and expertise
• Contact information
• Project inquiries
• Pricing models
• Technical capabilities

Could you please rephrase your question, or would you like me to connect you with our human support team?`
};

// Function to classify user intent
function classifyIntent(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) return 'greeting';
  if (message.includes('service') || message.includes('what do you do') || message.includes('offer')) return 'services';
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('call')) return 'contact';
  if (message.includes('price') || message.includes('cost') || message.includes('how much')) return 'pricing';
  if (message.includes('expert') || message.includes('skill') || message.includes('technology')) return 'expertise';
  if (message.includes('portfolio') || message.includes('project') || message.includes('work')) return 'portfolio';
  if (message.includes('process') || message.includes('how you work') || message.includes('methodology')) return 'process';
  if (message.includes('education') || message.includes('learning') || message.includes('lms')) return 'education';
  if (message.includes('ecommerce') || message.includes('e-commerce') || message.includes('shop') || message.includes('store')) return 'ecommerce';
  if (message.includes('about') || message.includes('who are you') || message.includes('company')) return 'about';
  
  return 'general';
}

// Function to generate context-aware response
function generateResponse(intent: string, userMessage: string): string {
  switch (intent) {
    case 'greeting':
      return RESPONSE_TEMPLATES.greeting;
    
    case 'services':
      return RESPONSE_TEMPLATES.services;
    
    case 'contact':
      return RESPONSE_TEMPLATES.contact;
    
    case 'pricing':
      return RESPONSE_TEMPLATES.pricing;
    
    case 'expertise':
      return RESPONSE_TEMPLATES.expertise;
    
    case 'portfolio':
      return RESPONSE_TEMPLATES.portfolio;
    
    case 'process':
      return RESPONSE_TEMPLATES.process;
    
    case 'education':
      return RESPONSE_TEMPLATES.education;
    
    case 'ecommerce':
      return RESPONSE_TEMPLATES.ecommerce;
    
    case 'about':
      return `🏢 **About ${COMPANY_INFO.name}**

${COMPANY_INFO.description}

**Our Values:**
${COMPANY_INFO.values.map(value => `• ${value}`).join('\n')}

**Team:**
${COMPANY_INFO.team.size} professionals with ${COMPANY_INFO.team.expertise}

We follow ${COMPANY_INFO.team.approach}`;
    
    default:
      // Use AI for general queries while maintaining context
      return `I understand you're asking about: "${userMessage}"

As ${COMPANY_INFO.name}, we specialize in:

${COMPANY_INFO.services.web.slice(0, 3).map(s => `• ${s}`).join('\n')}
${COMPANY_INFO.services.mobile.slice(0, 2).map(s => `• ${s}`).join('\n')}
${COMPANY_INFO.services.education.slice(0, 2).map(s => `• ${s}`).join('\n')}

Could you specify which aspect you'd like to know more about? Or feel free to ask about:
• Specific services
• Project consultation
• Pricing information
• Technical capabilities`;
  }
}

async function Chatbot(userMessage: string) {
  try {
    // Classify user intent
    const intent = classifyIntent(userMessage);
    
    // Generate base response
    let response = generateResponse(intent, userMessage);
    
    // For complex or general queries, enhance with AI while maintaining company context
    if (intent === 'general' || userMessage.length > 50) {
      const enhancedPrompt = `
You are an AI assistant for CodeBiruni - a hybrid software company specializing in web development, mobile apps, enterprise solutions, and educational platforms.

Company Context:
- Services: ${COMPANY_INFO.services.web.join(', ')}
- Expertise: ${COMPANY_INFO.expertise.slice(0, 5).join(', ')}
- Contact: ${COMPANY_INFO.contact.email}, ${COMPANY_INFO.contact.phones[0]}
- Location: ${COMPANY_INFO.contact.location}

User Question: "${userMessage}"

Please provide a helpful, professional response that:
1. Directly addresses the user's question
2. Highlights relevant CodeBiruni services
3. Maintains a professional and helpful tone
4. Encourages further engagement
5. Keeps response concise and actionable

Response Guidelines:
- Use emojis sparingly for emphasis
- Focus on how CodeBiruni can help
- Include specific service mentions when relevant
- End with a call-to-action

Current base response: "${response}"

Enhanced Response:`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: enhancedPrompt,
        });
        
        if (aiResponse.text) {
          response = aiResponse.text;
        }
      } catch (aiError) {
        console.error('AI enhancement failed, using base response:', aiError);
        // Fall back to base response
      }
    }

    // Ensure response includes company branding
    if (!response.includes('CodeBiruni') && intent !== 'greeting') {
      response += `\n\n---\n*Learn how CodeBiruni can transform your digital presence!*`;
    }

    console.log(`User: ${userMessage}`);
    console.log(`Intent: ${intent}`);
    console.log(`Response: ${response}`);
    
    return response;

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback responses
    return `I apologize for the technical difficulty. As CodeBiruni, we're here to help with:

🌐 Web Development & Mobile Apps
🎓 Education Platforms & E-commerce
🏢 Enterprise Solutions & Consulting

Please contact us directly at ${COMPANY_INFO.contact.email} or call ${COMPANY_INFO.contact.phones[0]} for immediate assistance.

We specialize in creating digital solutions that drive business growth and innovation!`;
  }
}

// Additional utility function for conversation history
export async function ChatbotWithHistory(userMessage: string, conversationHistory: Array<{role: string, content: string}>) {
  const context = conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n');
  
  const contextualPrompt = `
Conversation History:
${context}

Current User Message: "${userMessage}"

You are CodeBiruni AI assistant. Provide a helpful response focusing on our services:
- Web & Mobile Development
- Education Platforms
- E-commerce Solutions
- Enterprise Software
- UI/UX Design

Keep responses professional, concise, and encourage project discussions.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextualPrompt,
    });
    
    return response.text || "Thank you for your message! How can CodeBiruni help with your project today?";
  } catch (error:any) {
    console.log(error)
    return Chatbot(userMessage);
  }
}

export default Chatbot;