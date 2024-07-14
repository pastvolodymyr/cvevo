// export const getFullScan = `You are an AI assistant tasked with analyzing an image of a CV or portfolio, writing a cover letter, and generating interview questions based on job requirements. Follow these instructions carefully:\\n\\n1. Analyze the provided image\\n\\nExamine the image carefully, looking for elements typically found in resumes or portfolios such as contact information, work experience, education, skills, or project descriptions.\\n\\n2. Determine if the image contains a professional portfolio or resume:\\n   a. If yes, respond with \\"Yes\\" and analyze the content to find 6 areas for improvement.\\n   b. If no, respond with \\"No\\".\\n\\n3. Format your response as JSON using the following structure:\\n\\nFor a \\"Yes\\" response:\\n[\\n  {\\n    \\"contains_resume\\": true,\\n    \\"improvements\\": [\\n      {\\n        \\"label\\": \\"Issue name\\",\\n        \\"text\\": \\"Issue solution with examples from this image\\"\\n      },\\n      ...\\n    ]\\n  }\\n]\\n\\nFor a \\"No\\" response:\\n[\\n  {\\n    \\"contains_resume\\": false\\n  }\\n]\\n\\nEnsure you provide exactly 6 improvement suggestions for a \\"Yes\\" response. Each suggestion should be specific and actionable, detailing exactly what and where changes are needed, referencing specific content from the image.\\n\\n4. Write a cover letter based on the CV image and the following job details:\\nJob name: Front-end Developer\\nJob requirements:\\n2-3 years of experience in game development with JavaScript, TypeScript, and Pixi.js library;\\nAt least 1 year of slot development experience;\\nExperience in game optimization;\\nKnowledge and experience with front-end technology stack: WebPack, OOP, HTTP, WebSocket;\\nAbility to write clean, efficient, and reliable code that follows coding best practices and standards;\\nUnderstanding of SOLID principles;\\nUnderstanding of GoF patterns;\\nUnderstanding asynchronous programming;\\nExperience with version control systems such as Git;\\nExperience in CI/CD;\\nExperience in Spine / NPM / TexturePacker;\\nExperience in Chrome debug tools for optimization game flow;\\nEnglish Intermediate.\\n\\n\\nAnalyze the text in the CV carefully and use the provided job details to craft a tailored cover letter. Format your response as JSON:\\n\\n{\\n  \\"cover_letter\\": \\"Your cover letter text here\\"\\n}\\n\\n5. Generate 5 interview questions based on the job requirements provided in the job details. These questions should be like small tasks, problem-solving exercises, or theory questions. Format your response as JSON:\\n\\n{\\n  \\"interview_questions\\": [\\n    {\\n      \\"question\\": \\"Interview question\\",\\n      \\"answer\\": \\"Answer\\",\\n      \\"recap_link\\": \\"Link to relevant resource for further reading\\"\\n    },\\n    ...\\n  ]\\n}\\n\\n6. Combine all the above responses into a single JSON object with the following structure:\\n\\n{\\n  \\"resume_analysis\\": [\\n    // Your resume analysis JSON here\\n  ],\\n  \\"cover_letter\\": {\\n    // Your cover letter JSON here\\n  },\\n  \\"interview_questions\\": {\\n    // Your interview questions JSON here\\n  }\\n}\\n\\nWrite your final answer as a single JSON object containing all three sections. Do not include any explanation or reasoning outside of the JSON structure.`

export const getCvImprovementsPromt = () => "You will be analyzing the image to determine if it contains a professional portfolio or resume\n\nYour task is determining whether the image contains a professional portfolio or resume. Analyze the text carefully, looking for elements typically found in resumes or portfolios such as contact information, work experience, education, skills, or project descriptions.\n\nIf you determine that the image does contain a professional portfolio or resume, respond with \"Yes\" and analyze the content to find 6 areas for improvement. If you determine that the image does not contain a professional portfolio or resume, respond with \"No\".\n\nFormat your response as JSON. Use the following structure:\n\nFor a \"Yes\" response:\n[\n  {\n    \"label\": \"Issue name\",\n    \"text\": \"Issue solution with examples from this image\"\n  },\n  ...\n]\n\nFor a \"No\" response:\n[\n  {\n    \"noCv\": true\n  }\n]\n\nEnsure you provide exactly 6 improvement suggestions for a \"Yes\" response. Each suggestion should be specific and actionable, detailing exactly what and where changes are needed, referencing specific content from the image.\n\nWrite your final answer. Do not include any explanation or reasoning outside of the JSON structure.\n\n[Your JSON response here]";
export const getCoverLetterPromt = (jobTitle: string, jobRequirements: string) => `You will be analyzing the image to determine if it contains a professional portfolio or resume. Your task is determining whether the image contains a professional portfolio or resume. Analyze the text in this CV carefully, looking for elements typically found in resumes or portfolios such as contact information, work experience, education, skills, or project descriptions.\n\nYour task is to write a cover letter based on this CV image and job details. \n\nUse these details about the new job:\nJob title - ${jobTitle}\nJob Requirements - ${jobRequirements}\n\nIf you determine that the image does contain a professional portfolio or resume, respond with \"Yes\". If you determine that the image does not contain a professional portfolio or resume, respond with \"No\".\n\nFormat your response as JSON. Use the following structure:\n\nFor a \"Yes\" response:\n[\n  {\n     \"coverLetter\": \"Cover letter\",\n  }\n]\n\nFor a \"No\" response:\n[\n  {\n     \"noCv\": true\n  }\n]\n\nWrite your final answer. Do not include any explanation or reasoning outside of the JSON structure.\n\n[Your JSON response here]`
export const getInterviewQuestionsPromt = (jobTitle: string, jobRequirements: string) => `You will be analyzing the image to determine if it contains a professional portfolio or resume. Your task is determining whether the image contains a professional portfolio or resume. Analyze the text in this CV carefully, looking for elements typically found in resumes or portfolios such as contact information, work experience, education, skills, or project descriptions.\n\nYour task is to write 5 interview questions (like little task, solve problems, or theory question, without questions about experience) for a candidate based on this CV image and job details.\n\nAnalyze these job Requirements:\nJob title - ${jobTitle}\nJob Requirements - ${jobRequirements}\n\nIf you determine that the image does contain a professional portfolio or resume, respond with \"Yes\". If you determine that the image does not contain a professional portfolio or resume, respond with \"No\".\n\nFormat your response as JSON. Use the following structure:\n\nFor a \"Yes\" response:\n[\n    {\n      \"question\": \"Interview question\",\n      \"answer\": \"Answer\",\n      \"recapLink\": \"https://www.google.com/search?q=what you need to learn or repeat\"\n    }\n  ]\n\nFor a \"No\" response:\n[\n  {\n     \"noCv\": true\n  }\n]\n\nWrite your final answer. Do not include any explanation or reasoning outside of the JSON structure.\n\n[Your JSON response here]`

export const fakeRes = {
    "data": {
        "cv": [
            {
                "label": "Include a clear professional summary",
                "text": "The image does not have a professional summary section that highlights the candidate's key strengths, expertise, and career goals. Adding a concise summary at the top would help provide an overview of the applicant's qualifications."
            },
            {
                "label": "Expand on work experience details",
                "text": "The employment history section only lists the job titles and dates, but lacks details on the candidate's specific responsibilities, achievements, and impact in each role. Providing more context around the candidate's work experience would give the reader a better understanding of their capabilities."
            },
            {
                "label": "Enhance the visual design",
                "text": "The overall design of the resume could be improved to make it more visually appealing and easier to read. Incorporating more white space, using consistent formatting, and experimenting with different typography and layout choices would help the resume stand out."
            },
            {
                "label": "Quantify achievements",
                "text": "The resume would benefit from including quantifiable achievements and metrics to demonstrate the candidate's impact in previous roles. For example, providing statistics on the size of projects managed or the number of users supported would make the resume more impactful."
            },
            {
                "label": "Highlight relevant skills",
                "text": "While the skills section covers the candidate's technical expertise, it could be improved by prioritizing the most relevant skills for the target roles and providing more context around the candidate's proficiency level for each skill."
            },
            {
                "label": "Include additional sections",
                "text": "Considering adding additional sections to the resume, such as volunteer experience, publications, certifications, or awards, to provide a more comprehensive overview of the candidate's background and qualifications."
            }
        ],
        "coverLetter": [
            {
                "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Front-end Developer position at your company. As an experienced frontend developer with 4 years of experience in web development, I believe I possess the skills and expertise to excel in this role.\n\nThroughout my career, I have had the opportunity to work on large-scale projects, often with over 500 users. I am well-versed in setting up and running basic servers using Node.js, as well as developing browser extensions for modern browsers. My strong technical skills, combined with my creative and fast-learning mindset, make me an ideal fit for your team.\n\nSpecifically, my experience with React, Next.js, JavaScript, and other frontend technologies aligns perfectly with the job requirements. I am confident in my ability to contribute to the development of cutting-edge web applications and bring innovative solutions to the table.\n\nI am excited about the opportunity to join your team and further develop my skills in a dynamic and challenging environment. I am confident that my background and passion for frontend development will make me a valuable asset to your organization.\n\nThank you for considering my application. I look forward to the opportunity to discuss my qualifications in more detail.\n\nSincerely,\n[Your Name]"
            }
        ],
        "interview": [
            {
                "question": "How would you approach building a complex, large-scale web application using React and Next.js?",
                "answer": "To build a complex, large-scale web application using React and Next.js, I would focus on setting up a robust architecture that scales well. This could include using a modular design, implementing state management with tools like Redux, and leveraging Next.js's server-side rendering capabilities to optimize performance. I would also pay close attention to code organization, testing, and deployment processes to ensure the application is maintainable and reliable.",
                "recapLink": "https://www.google.com/search?q=react+next.js+best+practices"
            },
            {
                "question": "Describe a time when you had to overcome a technical challenge while working as a front-end developer. How did you approach the problem and what was the outcome?",
                "answer": "The candidate's previous work experience in developing large-scale projects and setting up server infrastructure using Node.js suggests they have likely encountered various technical challenges. An appropriate follow-up question would be to have them describe a specific example of a challenge they faced and how they approached solving it. This would provide insight into their problem-solving skills, technical expertise, and ability to overcome obstacles.",
                "recapLink": "https://www.google.com/search?q=how+to+overcome+technical+challenges+as+a+developer"
            },
            {
                "question": "What strategies do you use to stay up-to-date with the latest front-end technologies and best practices?",
                "answer": "Given the candidate's role as a front-end developer, it's important to understand how they maintain their technical skills and knowledge. Asking about their strategies for staying current with the latest technologies, frameworks, and industry best practices would provide insight into their dedication to professional development and ability to adapt to a rapidly evolving field.",
                "recapLink": "https://www.google.com/search?q=how+to+stay+up+to+date+with+front+end+development"
            },
            {
                "question": "How would you approach the design and implementation of a reusable UI component library for a large-scale web application?",
                "answer": "The candidate's experience with developing browser extensions and working on large projects suggests they may have expertise in building modular, reusable UI components. Asking them to describe their approach to designing and implementing a UI component library would demonstrate their understanding of best practices in front-end architecture and their ability to create scalable, maintainable solutions.",
                "recapLink": "https://www.google.com/search?q=how+to+build+a+reusable+ui+component+library"
            },
            {
                "question": "How would you go about optimizing the performance of a Next.js-powered web application?",
                "answer": "The candidate's familiarity with Next.js indicates they should have knowledge of how to optimize the performance of a Next.js-powered application. Asking them to describe their approach to performance optimization, such as leveraging Server-Side Rendering (SSR), Code Splitting, and Image Optimization, would assess their understanding of Next.js best practices and their ability to deliver high-performing web applications.",
                "recapLink": "https://www.google.com/search?q=how+to+optimize+next.js+performance"
            }
        ]
    },
    "usage": {
        "cv": {
            "input_tokens": 1837,
            "output_tokens": 415
        },
        "coverLetter": {
            "input_tokens": 1811,
            "output_tokens": 284
        },
        "interview": {
            "input_tokens": 1865,
            "output_tokens": 777
        }
    }
}
