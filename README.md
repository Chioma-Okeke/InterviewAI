## Inspiration

Transitioning into the job market as a first-timer, especially without guidance, can be incredibly challenging. In Nigerian universities, while we are taught the skills needed to contribute to the workforce, we are rarely taught the skills necessary to secure the jobs where we can apply them. This creates a significant gap, leaving most graduates to navigate the job search process alone. Many turn to personal research, which can be overwhelming and confusing for someone without prior experience.

Although numerous guides and professional training programs exist for job seekers, they are often generalized and fail to cater to an individual’s unique situation. This leads to knowledge gaps that can hinder a job seeker's ability to succeed in the process. For instance, a candidate might excel at finding and applying for jobs but struggle with interview skills. These gaps significantly affect their chances of securing a job.

When first-time job seekers finally land their first interviews, they often find themselves lacking real-world interview experience. While they may know what to expect in theory, they are rarely prepared to put that theory into practice.

This is why we created **Jobrail** — to provide a personalized, practical solution that helps bridge these gaps and guides job seekers effectively through every stage of their journey.

## What it Does

**Jobrail** is designed to help users gain practical interview experience and address their knowledge gaps by breaking the job-seeking process into four stages:

1. **Core Stage**: This stage helps users identify and understand their key skills and how these can be used in the workforce.
2. **Preparation Stage**: In this stage, users focus on enhancing their skills, building their portfolios, and learning how to craft impressive resumes and cover letters.
3. **Application Stage**: Users learn how to navigate the job application process, from finding suitable roles to tailoring their applications for each one.
4. **Job Stage**: This final stage guides users through the interview process, helps them negotiate offers, and prepares them for their first day on the job.

At any point in their journey, users will find themselves in one of these stages, and each stage has tailored learning modules to address specific knowledge gaps. This flexibility allows users to select relevant modules at any time to effectively navigate their job search.

Additionally, **Jobrail** features a practice section that offers mock interviews with AI tailored to specific job roles. After completing a mock interview, users receive feedback and suggestions for improvement, which helps them become more confident and better prepared for real interviews.

## Use Case, User Story, and User Flow

### Use Case

**Jobrail** is targeted at job seekers who are new to the job market, particularly recent graduates or those who have little to no experience in navigating the job search process. The platform provides personalized learning modules, mock interviews, and real-time feedback to help users effectively transition from acquiring skills to successfully landing a job.

### User Story

- **As a job seeker**, I want to learn how to navigate each stage of the job search process so that I can secure employment confidently and effectively.
- **As a first-time interviewee**, I want to practice interviews with an AI, receive real-time feedback, and improve my performance.
- **As a learner**, I want a personalized learning experience that addresses my unique gaps, ensuring I am well-prepared for all aspects of job seeking.

### User Flow

- Users begin by signing up and completing a quick onboarding survey to understand their current job search stage and needs.
- Based on the survey results, **Jobrail** recommends specific learning modules that suit the user's stage.
- Users can access learning modules, participate in mock interviews, and receive feedback.
- After practicing, users can review their interview performance, see areas of improvement, and revisit modules to improve further.
- Once confident, users can apply for jobs, using **Jobrail** as a guide throughout the entire journey.

*Link to UI/UX Designs:*  
*Link to User Flow Diagram:*  

## How We Built It

**Jobrail** is a web-based platform accessible from any browser. We used the following tools and technologies to build it:

### UI/UX Design
- **Figma, Canva, Illustrator**: These tools were used to create user-friendly, visually appealing designs. Figma allowed us to build interactive prototypes for user testing, while Canva and Illustrator were used for graphic design and branding.

### Frontend
- **React, HTML, CSS, JavaScript**: The core technologies used to build the interactive user interface, ensuring a seamless and intuitive experience for users.
- **React.Domify**: Utilized to render HTML content dynamically within React, allowing for flexible and dynamic user interfaces.
- **Axios**: Used for making efficient API calls to the backend, simplifying data retrieval and submission.
- **Redux Toolkit**: Integrated to manage global state, making data handling more consistent across the application. This was my first experience with Redux, and I learned how to efficiently manage application states and improve the predictability of state changes.
- **React Router DOM**: Improved navigation throughout the app, and I got to explore its new loader functionality for streamlined data fetching.
- **Custom Hooks & Context API**: Custom hooks were used to modularize different logic, making the codebase cleaner and reusable, while the Context API helped manage global states effectively.

### Backend
- **Google Gemini**: Integrated as the AI model for conducting mock interviews, providing real-time interview scenarios for users.
- **Node.js & Express**: The backbone of the backend, used for creating RESTful APIs and managing server-side logic.
- **MongoDB**: Our primary database for storing user profiles, job modules, and feedback from interviews.
- **TypeScript**: Employed for improved type safety, making the backend codebase more maintainable and robust.
- **Redis**: Utilized for caching API requests and improving response times, particularly useful for repetitive interview data.
- **WebSockets**: Implemented for real-time features, such as chat-based interview practice, allowing for a more interactive user experience.

## Challenges We Ran Into

While testing the AI-based interviewer, we faced challenges with rate limits on the Google Gemini API, especially due to the high volume of API requests made during testing. This limitation was primarily because we were using a free account, which restricted our testing capacity.

## Accomplishments That We're Proud Of

- Successfully developing the prototype of **Jobrail** in just one month, transforming a conceptual idea into a functional product.
- Building a personalized and engaging interview practice system using Google Gemini to simulate real-world interview scenarios for job seekers.

## What We Learned

### Frontend Engineering
- I learned the importance of managing global state effectively, especially with Redux Toolkit, which helped ensure the predictability of data flow across the app.
- Mastered efficient data fetching using Axios, including handling loading states and error management.
- Gained a deeper understanding of React Router, particularly the new loader functionality, which simplified data management.
- Enhanced my skills in writing clean, reusable code by leveraging custom hooks and the Context API.

### Backend Engineering
- Understood how to build scalable RESTful APIs using Node.js and Express, focusing on modular code structure for better maintainability.
- Learned to implement real-time data handling using WebSockets, which added interactivity to the interview experience.
- Improved caching strategies with Redis, which optimized data retrieval times for frequently accessed information.

### UI/UX Design
- Developed an understanding of creating intuitive user interfaces that enhance the user experience, especially when guiding users through complex processes like job seeking.
- Conducted user testing sessions with Figma prototypes, using feedback to iterate and improve the design for better usability.
- Ensured that branding remained consistent across all user touchpoints, making the platform visually appealing and professional.

Certainly! I've updated the "What's Next for Jobrail" section with the additions you requested:

---

## What's Next for Jobrail

We are excited about taking **Jobrail** to the next level and bringing it to real-world job seekers. Our immediate next steps include:

- **Beta Testing**: Launching a beta version for initial users to gain feedback and refine the platform further.
- **AI Enhancement**: Improving the AI-based mock interview system by incorporating more nuanced behavioral feedback.
- **Video Interviewer**: Currently our application only handles text and audio interview sessions. In future sprints we will be introducing a video-based AI interviewer feature to provide users with a more wholesome and realistic interview experience, helping them practice body language and non-verbal cues.
- **Personalized Career Paths**: Expanding our offerings to include more personalized career areas, ensuring that users from a wider range of industries receive tailored guidance and interview practice specific to their field.
- **Mobile Version**: Developing a mobile-friendly version of **Jobrail** to make the platform accessible on the go.
- **Collaborations**: Partnering with universities and job training programs to help new graduates get job-ready in a more efficient and personalized way.


*Link to UI/UX Designs: https://www.figma.com/design/bic2obLgm5CW8t2GNHuebp/InterviewAI?node-id=795-6912&node-type=frame&t=4MCz9njxsR9QlcQN-0*  

*Link to User Flow Diagram: https://miro.com/app/board/uXjVKjUJ-bU=/*  

