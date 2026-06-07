"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';


const cards: Card[] = [
  {
    title: "AnnoMath",
    role: "Undergraduate Researcher",
    description: `Built in Dr. Xia's Dream Lab, AnnoMath is an AI powered multimodal college math 
    tutoring system applying pedagogically grounded annotation types to handwritten student 
    work. Co-coded and analyzed 30 Khan Academy videos with a PhD researcher to derive annotation 
    framework. Implemented annotation rendering, covering 22% of all annotations 
    identified from frequency analysis of 30 instructional videos. Built frontend logic to render 
    AI generated outputs from the OpenAI API.
    `, // TODO: write something about the paper 
    type: "video",
    media: "annomath-paper-video.mp4",
    links: [],
    skills: ["TypeScript", "React", "tldraw", "Prompt Engineering", "Research Skills", "Teamwork", "Annotation Coding"]
  },
  {
    title: "Boba POS System",
    role: "Full-Stack Developer",
    description: `Built a multi-interface boba shop POS platform on an Agile Scrum team. Led deployment 
      and authentification security, integrated a TTS API and weather based drink recommendations, 
      and contributed to dynamic database driven menu rendering, drink customization, and checkout flows.`,
    type: "image",
    media: "boba-pos-img.png",
    links: [
      {
        label: "POS System",
        url: "https://new-project3-gang71.onrender.com/"
      },
      {
        label: "GitHub",
        url: "https://github.com/yclairew/project3-gang71"
      }
    ],
    skills: ["Javascript", "PostgreSQL", "AWS", "Java", "Rest APIs", "Jira", "Render", "HTML/CSS", "Agile", "Teamwork", "Debugging"]
  },
  {
    logo: "aggies-create-logo.png",
    title: "Aggies Create",
    role: "Team Lead and Consultant",
    description: `Led a consulting team for a small skincare company. Built a frontend product recommendation quiz, 
      designed to integrate with the client's existing Shopify storefront. Trained a Random Forest model generating 
      email recommendations from mock sales data with 98% prediction accuracy. Also coordinated the team through a 
      full design and rebranding process. Presented at Fall 2025 Aggies Create Innovation Expo.`,
    type: "video",
    media: "aggies-create-quiz-demo.mov",
    links: [
      {
        label: "Aggies Create",
        url: "https://www.aggiescreate.com/portfolio/consulting-projects-current/aksa-oils"
      }
    ],
    skills: ["Javascript", "HTML/CSS", "scikit-learn", "ML Model Training", "Leadership", "Public Speaking"]
  },
  {
    logo: "signify-health-logo.png",
    title: "Signify Health",
    role: "Software Engineering Consultant",
    description: `Through Aggies Create, built Signify Hex, an internal data visualization tool connecting patients 
      with medical providers for at home services. Created a geospatial hex overlay for provider reachability, implemented 
      real time gRPC data fetching, and reduced unnecessary frontend refreshes with Redis-based change tracking. 
      Regularly met with Signify Health leadership. Awarded 1st place at the Aggies Create Innovation Expo.
      `,
    type: "video",
    media: "signify-hex-demo.mp4",
    links: [
      {
        label: "About Signify Health",
        url: "https://www.signifyhealth.com/"
      }
    ],
    skills: ["React", "TypeScript", "Go", "UberH3", "PostgreSQL", "Docker", "Redis", "Mapbox", "Public Speaking", "Teamwork"]
  },
  // {
  //   title: "Machine Learning Pipeline",
  //   description: `Built a machine learning pipeline to classify clinical notes as ICD-codeable using the MIMIC-III dataset with a partner. 
  //     Led the weak supervision strategy, label validation against a gold standard dataset, class balancing, and error analysis.`,
  //   type: "image",
  //   media: "clinical-notes-technical-pipeline.png",
  //   links: [], 
  //   skills: ["Weak Labeling", "Paper Writing", "Debugging", "Presentation Skills", "Teamwork"]
  // },
  {
    logo: "tao-logo.png",
    title: "Engineering TA Organization",
    role: "Web Officer & Software Engineering Intern",
    description: `Developed the TAO website with fellow SWE interns for 10,000+ viewers. Practiced Git workflows 
      including pull requests 
      and code reviews. Helped manage a Discord community of 5,000+ engineering students and supported freshmen by 
      brainstorming ideas for events, such as review sessions.`,
    type: "image",
    media: "tao-img.png",
    links: [
      {
        label: "Website",
        url: "https://engrtao.tech/"
      },
      {
        label: "GitHub",
        url: "https://github.com/TAO-ENGR/club-website"
      }
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Responsive Design", "Teamwork"]
  },
  {
    title: "Bingo Board Generator",
    description: `Built an automated bingo board generator that creates randomized 
      bingo boards for ice cream store employees based 
      on time-of-day logic and shift type to keep engagement up during slow periods.
      `,    
    type: "image",
    media: "bingo-board-img.png",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/yclairew/automated-bingo-generator"
      }
    ], 
    skills: ["Python", "Selenium", "Automation"]
  },
];

interface Card {
  title: string;
  role?: string;
  logo?: string;
  description: string;
  type: "image" | "video";
  media: string;
  links: { label: string; url: string }[];
  skills: string[];
}


function ProjectCard({ card }: { card: Card }) {
  const [showAll, setShowAll] = useState(false);
  const ref = useAnimateOnScroll();  

  return (
    <div ref={ref} className="opacity-0 mb-15 ml-15 mr-15 bg-accent-light p-5 rounded-xl">
      <div key={card.title} className="card p-6 animate-fade-up">
        <div className="card-header grid grid-cols-2"> 
          <div className="card-title-div flex col-1">
            {card.logo && <img className="card-logo h-9 w-auto object-cover pr-3" src={card.logo} alt={`${card.title} logo`} />}

            <div>
              <h3 className="card-title text-4xl [font-family:var(--font-body)] pb-1.5 text-text">{card.title}</h3>
              {card.role && <p className="text-md [font-family:var(--font-body)] text-subheading">{card.role}</p>}
            </div>
          </div>

          <div className="links-div text-right col-2">
            {card.links.length > 0 && (
              <div className="card-links flex gap-5 justify-end">
                {card.links.map((link: { label: string; url: string }) => (
                  <a
                    key={link.label}
                    className="card__link"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card-body flex gap-8 pt-3">
          <div className="card-text [font-family:var(--font-body)] text-xl flex-1">
            <p className="card-description w-xl text-text" dangerouslySetInnerHTML={{ __html: card.description }}/>
          </div>

          <div className="card-media flex flex-1 justify-end">
            {card.type === "video" ? <video controls className="card-video w-xl h-auto"> <source src={card.media} type="video/mp4"/> </video> : <img className="card-image w-xl h-auto" src={card.media} alt={`${card.title} image`}/>}
          </div>
        </div>

        <div className="card-skills">
          {card.skills && (
            <div className="flex flex-wrap gap-2"
              onMouseEnter={() => setShowAll(true)}
              onMouseLeave={() => setShowAll(false)}
            >
              {card.skills.slice(0, showAll ? card.skills.length : 3).map((skill: string) => (
                <span key={skill} className="text-sm [font-family:var(--font-body)] mt-5 px-2 py-1 rounded-xl border-2 border-accent bg-background text-subheading">
                  {skill}
                </span>
              ))}
              {!showAll && card.skills.length > 3 && (
                <span className="text-sm [font-family:var(--font-body)] mt-5 px-2 py-1 rounded-xl border-2 border-accent bg-background text-subheading">
                  +{card.skills.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}


export default function Cards() {
  return (
    <div className="card">
      {cards.map(card => (
        <ProjectCard key={card.title} card={card} />
      ))}
    </div>
  );
}