"use client";
import { useState, useEffect, useMemo } from "react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useLocale } from "@/lib/i18n/Locale_context";


const SOFT_SKILLS = new Set([
  "Research Skills",
  "Teamwork",
  "Annotation Coding",
  "Agile",
  "Debugging",
  "Leadership",
  "Public Speaking",
  "Machine Learning (Model Training)",
  "Responsive Design",
  "Automation",
  "Prompt Engineering",
  "Accessibility",
]);

const cardsData: (Omit<Card, "role" | "description" | "title" | "skills" | "links"> & {
  titleKey: string;
  skillKeys: string[];
  linkKeys: { key: string; url: string }[];
})[] = [
  {
    id: "signify-health",
    titleKey: "signify-health",
    logo: "/signify-health-logo.png",
    stackType: ["Full-Stack", "Data Visualization"],
    context: "Consulting",
    type: "video",
    media: {
      // url: "/signify-hex-demo.mp4",
      url: "/signify-hex-demo-optimized.mp4",
      alt_text: "Demo of Signify Hex",
      poster: "/signify-hex-demo-optimized-poster.mp4"
    },
    linkKeys: [
      { key: "about-signify-health", url: "https://www.signifyhealth.com/" }
    ],
    skillKeys: ["Go", "UberH3", "Redis", "Docker", "React", "TypeScript", "PostgreSQL", "Mapbox", "Public Speaking", "Teamwork"]
  },
  {
    id: "annomath",
    titleKey: "annomath",
    stackType: ["Frontend", "AI/ML"],
    context: "Research",
    type: "video",
    media: {
      // url: "/annomath-paper-video.mp4",
      url: "/annomath-paper-video-optimized.mp4",
      alt_text: "Annomath video for paper submission",
      poster: "/annomath-paper-video-optimized-poster.mp4"
    },
    linkKeys: [],
    skillKeys: ["TypeScript", "React", "Prompt Engineering", "tldraw", "Research Skills", "Teamwork", "Annotation Coding"]
  },
  {
    id: "pearl-tea",
    titleKey: "pearl-tea",
    stackType: ["Full-Stack"],
    context: "Coursework",
    type: "image",
    media: {
      url: "/boba-pos-img.png",
      alt_text: "Screenshot of the manager video of the boba POS system"
    },
    linkKeys: [
      { key: "pos-system", url: "https://new-project3-gang71.onrender.com/" },
      { key: "github", url: "https://github.com/yclairew/project3-gang71" }
    ],
    skillKeys: ["PostgreSQL", "JavaFX", "Rest APIs", "AWS", "Node.js/Express", "Javascript", "Render", "HTML/CSS", "Jira", "Agile", "Teamwork", "Debugging", "Accessibility"]
  },
  {
    id: "aggies-create",
    titleKey: "aggies-create",
    logo: "/aggies-create-logo.png",
    stackType: ["Frontend", "AI/ML"],
    context: "Consulting",
    type: "video",
    media: {
      // url: "/aggies-create-quiz-demo.mov",
      url: "/aggies-create-quiz-demo.mp4",
      alt_text: "Demo of Aggies Create personalized quiz",
      poster: "/aggies-create-quiz-demo-poster.mp4"
    },
    linkKeys: [
      { key: "aggies-create", url: "https://www.aggiescreate.com/portfolio/consulting-projects-current/aksa-oils" }
    ],
    skillKeys: ["scikit-learn", "Machine Learning (Model Training)", "JavaScript", "HTML/CSS", "Leadership", "Public Speaking"]
  },
  {
    id: "personal-website",
    titleKey: "personal-website",
    stackType: ["Frontend"],
    context: "Personal",
    type: "image",
    media: {
      url: "/personal-website-img.png",
      alt_text: "Screenshot of my personal website"
    }, 
    linkKeys: [
      { key: "github", url: "https://github.com/yclairew/personal-website" }
    ],
    skillKeys: ["React Three Fiber", "Azure Translator", "Static i18n", "REST APIs", "React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive Design", "Accessibility"]
  },
  {
    id: "tao",
    titleKey: "tao",
    logo: "/tao-logo.png",
    stackType: ["Frontend"],
    context: "Organization",
    type: "image",
    media: {
      url: "/tao-img.png",
      alt_text: "TAO Instagram post of Web Officer introductions"
    },
    linkKeys: [
      { key: "website", url: "https://engrtao.tech/" },
      { key: "github", url: "https://github.com/TAO-ENGR/club-website" }
    ],
    skillKeys: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Responsive Design", "Teamwork"]
  },
  {
    id: "bingo-board",
    titleKey: "bingo-board",
    stackType: ["Automation"],
    context: "Personal",
    type: "image",
    media: {
      url: "/bingo-board-img.png",
      alt_text: "Screenshot of bingo board generator in progress"
    },
    linkKeys: [
      { key: "github", url: "https://github.com/yclairew/automated-bingo-generator" }
    ],
    skillKeys: ["Python", "Selenium", "Automation"]
  },
];

interface Card {
  id: string;
  title: string;
  role?: string;
  logo?: string;
  description: string;
  stackType: string[];
  context: string;
  type: "image" | "video";
  media: { 
    url: string, 
    alt_text: string,
    poster?: string,
  };
  links: { label: string; url: string }[];
  skills: string[];
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function translateSkill(skill: string, t: Record<string, string>) {
  if (!SOFT_SKILLS.has(skill)) return skill; // keep tech/tool names untranslated
  return t[`skill_${slugify(skill)}`] || skill;
}

function getCards(t: Record<string, string>): Card[] {
  return cardsData.map((card) => ({
    ...card,
    title: t[`title_${card.titleKey}`] || card.titleKey,
    role: t[`card_${card.id}_role`] || undefined,
    description: t[`card_${card.id}_desc`],
    skills: card.skillKeys.map((skill) => translateSkill(skill, t)),
    links: card.linkKeys.map(({ key, url }) => ({
      label: t[`link_${key}`] || key,
      url,
    })),
  }));
}



function ProjectCard({ card, setSkillFilter, skillFilter }: { 
  card: Card, 
  setSkillFilter: (skill: string) => void,
  skillFilter: string 
}) {
  const [showAll, setShowAll] = useState(false);
  const ref = useAnimateOnScroll();

  const [notHoverable, setNotHoverable] = useState(false);

  const [smallScreen, setSmallScreen] = useState(false);

  const renderSkills = () => {
    if (!card.skills) return null;

    if (notHoverable) {
      return (
        <div className="flex flex-wrap gap-2">
          {card.skills.map((skill: string) => (
            <span key={skill} className={`text-sm [font-family:var(--font-body)] mt-2 lg:mt-5 px-2 py-1 rounded-xl border-2 border-link bg-background text-subheading 
              cursor-pointer hover:bg-link-hover hover:text-background transition-colors
              ${skillFilter === skill ? "bg-link text-background!" : "bg-background text-subheading"}`}
                onClick={() => setSkillFilter(skillFilter === skill ? "All" : skill)}
            >
              {skill}
            </span>
          ))}
        </div>
      );
    }

    else {
      return(
        <div className="flex flex-wrap gap-2"
          onMouseEnter={() => setShowAll(true)}
          onMouseLeave={() => setShowAll(false)}
        >
          {card.skills.slice(0, showAll ? card.skills.length : 3).map((skill: string) => (
            <span key={skill} className={`text-sm [font-family:var(--font-body)] mt-2 lg:mt-5 px-2 py-1 rounded-xl border-2 border-link bg-background text-subheading 
            cursor-pointer hover:bg-link-hover hover:text-background transition-colors
            ${skillFilter === skill ? "bg-link text-background!" : "bg-background text-subheading"}`}
              onClick={() => setSkillFilter(skillFilter === skill ? "All" : skill)}
            >
              {skill}
            </span>
          ))}
          {!showAll && card.skills.length > 3 && (
            <span className="text-sm [font-family:var(--font-body)] mt-2 lg:mt-5 px-2 py-1 rounded-xl border-2 border-link bg-background text-subheading">
              +{card.skills.length - 3}
            </span>
          )}
        </div>
      );
    }

  }

  const renderCards = () => {
    if (smallScreen) {
      return (
        <div key={card.id} className="card p-6 animate-fade-up">
          <div className="card-header grid grid-cols"> 
            <div className="card-title-div flex">
              {card.logo && 
                <img className="card-logo h-9 w-auto object-cover pr-3" 
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.logo}`} 
                  alt={`${card.title} logo`} 
                  loading="lazy"
                />
              }

              <h2 className="card-title text-xl [font-family:var(--font-body)] pb-0.5 text-text">{card.title}</h2>
            </div>

            <div className="col-1">
              {card.role && <p className="text-sm [font-family:var(--font-body)] text-subheading">{card.role}</p>}
            </div>
            

            <div className="links-div col-1">
              {card.links.length > 0 && (
                <div className="card-links flex gap-5 mt-4 mb-2">
                  {card.links.map((link: { label: string; url: string }) => (
                    <a
                      key={link.label}
                      className="card__link text-sm"
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

          <div className="card-body flex flex-col gap-5 mt-7">
            <div className="card-media flex flex-1 justify-center max-w-full mb-3">
              {card.type === "video" ? 
                <video controls 
                  className="card-video w-full h-auto object-contain" 
                  preload="none"
                  poster={card.media.poster}
                  aria-label={card.media.alt_text}
                > 
                  <source src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.media.url}`} 
                    type="video/mp4"
                  /> 
                </video> : 
                <img className="card-image w-full h-auto object-contain" 
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.media.url}`}  
                  alt={card.media.alt_text}
                  loading="lazy"
                />
              }
            </div>

            <div className="card-text [font-family:var(--font-body)] text-base flex-1 mb-7">
              <p className="card-description text-text" dangerouslySetInnerHTML={{ __html: card.description }}/>
            </div>
          </div>

          <div className="card-skills">
            {renderSkills()}
          </div>
          
        </div>
      );
    }

    else {
      return (
        <div key={card.id} className="card p-6 animate-fade-up">
          <div className="card-header grid grid-cols-2"> 
            <div className="card-title-div flex col-1">
              {card.logo && 
                <img className="card-logo h-9 w-auto object-cover pr-3" 
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.logo}`} 
                  alt={`${card.title} logo`}
                  loading="lazy"
                />
              }

              <div>
                <h2 className="card-title text-xl md:text-2xl lg:text-3xl [font-family:var(--font-body)] pb-1.5 text-text">{card.title}</h2>
                {card.role && <p className="text-sm lg:text-base [font-family:var(--font-body)] text-subheading">{card.role}</p>}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-3">
            <div className="card-text [font-family:var(--font-body)] text-base lg:text-xl">
              <p className="card-description text-text" dangerouslySetInnerHTML={{ __html: card.description }}/>
            </div>

            <div className="card-media w-full flex justify-center md:justify-end self-center">
              {card.type === "video" ? 
                <video controls 
                  className="card-video w-full h-auto object-contain" 
                  preload="metadata"
                  aria-label={card.media.alt_text}
                > 
                  <source src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.media.url}`} 
                    type="video/mp4"
                  /> 
                </video> : 
                <img className="card-image w-full h-auto object-contain" 
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}${card.media.url}`}  
                  alt={card.media.alt_text}
                  loading="lazy"
                />
              }

            </div>
          </div>

          <div className="card-skills">
            {renderSkills()}
          </div>
          
        </div>
      );
    }
  }

  useEffect(() => {
    setNotHoverable(window.matchMedia('(hover: none)').matches);
    setSmallScreen(window.matchMedia("(max-width: 640px)").matches);
  }, []);

  return (
    <div ref={ref} id={card.id}
      className="opacity-0 mb-10 ml-4 mr-4 lg:mb-15 lg:ml-15 lg:mr-15 bg-accent-light p-0.5 lg:p-5 rounded-xl"
    >
      {renderCards()}
    </div>
  );
}


export default function Cards() {
  const { t } = useLocale();
  const cards = useMemo(() => getCards(t), [t]);

  const [typeFilter, setTypeFilter] = useState("All");
  const [contextFilter, setContextFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");

  const types = useMemo(
    () => ["All", ...Array.from(new Set(cards.flatMap(card => card.stackType)))],
    [cards]
  );
  const contexts = useMemo(
    () => ["All", ...Array.from(new Set(cards.map(card => card.context)))],
    [cards]
  );

  const filteredCards = useMemo(
    () =>
      cards.filter(
        (card) =>
          (typeFilter === "All" || card.stackType.includes(typeFilter)) &&
          (contextFilter === "All" || card.context === contextFilter) &&
          (skillFilter === "All" || card.skills.includes(skillFilter))
      ),
    [cards, typeFilter, contextFilter, skillFilter]
  );

  const key = filteredCards.length === 1 ? "filter_found_one" : "filter_found_other";
  const found_text = t[key].replace("{count}", String(filteredCards.length));

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.classList.remove("opacity-0");
        el.classList.add("animate-fade-up");
        el.style.animation = "none";
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    }
  }, []);


  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center gap-3 mb-2 justify-center flex-wrap">
        <span className="text-sm [font-family:var(--font-body)] text-subheading">{t.filter_type_label}</span>
        {types.map(type => (
          <button key={type} onClick={() => setTypeFilter(type)}
            className={`text-sm [font-family:var(--font-body)] px-2 py-0.5 rounded-lg border border-link cursor-pointer 
              hover:bg-link-hover hover:text-background transition-colors
              ${typeFilter === type ? "bg-link text-background" : "bg-background text-subheading"}`}>
            {type === "All" ? t.filter_all : t[`stacktype_${slugify(type)}`] || type}
          </button>
        ))}
        <span className="text-sm [font-family:var(--font-body)] text-subheading hidden xl:inline">|</span>
        <div className="basis-full h-0 xl:hidden" /> {/* forces wrap to next line */}
        <span className="text-sm [font-family:var(--font-body)] text-subheading block">{t.filter_context_label}</span>
        {contexts.map(c => (
          <button key={c} onClick={() => setContextFilter(c)}
            className={`text-sm [font-family:var(--font-body)] px-2 py-0.5 rounded-lg border border-link cursor-pointer
              hover:bg-link-hover hover:text-background transition-colors
              ${contextFilter === c ? "bg-link text-background" : "bg-background text-subheading"}`}>
            {c === "All" ? t.filter_all : t[`context_${slugify(c)}`] || c}
          </button>
        ))}
        
      </div>

      
      <div className="flex flex-row gap-3 items-center justify-center mb-4">
        <p className="text-sm [font-family:var(--font-body)] text-subheading text-center">
          {found_text}
        </p>

        {(typeFilter !== "All" || contextFilter !== "All" || skillFilter !== "All") &&  
          (
          <>
            <span className="text-sm [font-family:var(--font-body)] text-subheading">|</span>

            <button onClick={() => { setTypeFilter("All"); setContextFilter("All"); setSkillFilter("All"); }}
              className="text-sm [font-family:var(--font-body)] text-subheading animated-link">
              {t.filter_reset}
            </button>
          </>
        )}
      </div>

      <div className="card">
        {filteredCards.map(card => (
          <ProjectCard key={card.id} card={card} setSkillFilter={setSkillFilter} skillFilter={skillFilter} />
        ))}
      </div>
    </div>
  );
}