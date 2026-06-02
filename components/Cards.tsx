
const cards = [
  {
    title: "AnnoMath",
    description: `In Dr. Xia's Dream Lab and under Kiyrah Mowry, a PhD researcher, I collaborated with fellow undergraduate 
      researchers to develop an AI-powered, multimodial college math tutorial system that displays 
      annotations to teach students. Kiryah and I analyzed 30 Khan Academy videos and performed annotation coding 
      to derive the mathematical annotations. Additionally, I used tldraw and React to render relevant annotations onto LaTeX and 
      handwritten student work.`, // TODO: write something about the paper 
    type: "video",
    media: "annomath-paper-video.mp4",
    links: []
  },
  {
    title: "Boba POS System",
    description: `As a <strong>full-stack developer</strong> on a collaborative Agile Scrum team, 
      I helped build a multi-interface boba shop POS platform. I led deployment and authentication 
      security implementation, integrated a text-to-speech API and a weather-based kiosk drink 
      recommendation system. I also contributed to dynamic database-driven menu rendering, the drink 
      customization popup, and checkout and tipping functionality to create an accessible and streamlined 
      customer kiosk experience.`,
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
    ]
  },
  {
    logo: "aggies-create-logo.jpg",
    title: "Aggies Create",
    description: `Serving as a <strong>team lead</strong> for Aggies Create and a <strong>consultant</strong> 
      for a small skincare company, I created a personalized product recommendation quiz for their website and a Random Forest 
      model that generates email recommendations using mock sales data, achieving 98% prediction accuracy. Additionally, 
      I led the team in the design and rebranding process, coordinating workflows to boost sales for the client.`,
    type: "video",
    media: "aggies-create-quiz-demo.mov",
    links: [] // TODO: add https://www.aggiescreate.com/portfolio/consulting-projects-current/aksa-oils?? 
  },
  {
    logo: "signify-health-logo.png",
    title: "Signify Health",
    // description: `Through Aggies Create, I worked as a <strong>software engineering consultant</strong>
    //   for Signify Health, building an internal data visualization tool connecting patients to healthcare 
    //   providers for at home care.`, // TODO: add technologies? or just more
    description: `Through Aggies Create, I worked as a <strong>software engineering consultant</strong> for Signify 
      Health and developed Signify Hex, an internal data visualization tool to connect patients with a network of medical 
      providers for at-home care. Specifically, I optimized performance using Redis-based change tracking to reduce 
      unnecessary front-end refreshes, improved user experience with hover-based interactions and UI enhancements, 
      and implemented real-time data fetching via gRPC contracts. I also built a geospatial hex overlay to 
      show provider reachability based on location and travel radius. The project was presented to Signify Health 
      leadership, including the VP of Software Engineering, and received 1st place in consultancy at the Aggies Create Innovation Expo.`,
    type: "video",
    media: "signify-hex-demo.mp4",
    links: []
  },
  {
    title: "Weak Supervision for Clinical Note Classification",
    description: `In collaboration with a partner, I developed a machine learning system classifying clinical notes as ICD-codeable or not using 
      the MIMIC-III dataset. Led the weak supervision and evaluation pipeline, 
      including developing and iterating on a weak labeling strategy, validating labels against 
      a gold-standard dataset, and implementing class balancing and dataset splits. Supported debugging of 
      the prediction pipeline to ensure reliable inference during evaluation and performed error analysis to 
      evaluate the system.`,
    type: "image",
    media: "clinical-notes-technical-pipeline.png",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/yclairew/CSCE421-Final-Project"
      }
    ]
  },
  {
    logo: "tao-logo.png",
    title: "Engineering TA Organization",
    description: `Working as a <strong>Web Officer</strong> and <strong>Software Engineering (SWE) Intern</strong> for TAO, 
      I developed the TAO website with fellow SWE interns, applying React, Next.js, Node.js, Tailwind CSS, etc. Additionally, 
      I helped manage a Discord community of over 5,000 engineering students and supported first-year students by 
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
    ]
  },
  {
    title: "Bingo Board Generator",
    description: `As a personal project, I built an automated bingo board generator using Python and Selenium that created shift-based, customized bingo 
      boards for ice cream store employees based on time-of-day logic. The system 
      dynamically parses shift-specific text datasets, automates browser interactions with an online bingo board generator, 
      and creates randomized shareable game links for use during shifts to maintain employee engagement during low-traffic 
      periods.`,    
    type: "image",
    media: "bingo-board-img.png",
    links: []
  },
];




export default function Cards() {
  return (
    <div className="cards">
      {cards.map(card => (
        <div key={card.title} className="card">
          <div className="card-header">
            {card.logo && <img className="card-logo" src={card.logo} alt={`${card.title} logo`} />}
            <h3 className="card-title text-4xl [font-family:var(--font-body)]">{card.title}</h3>
          </div>

          <div className="card-body">
            <div className="card-text [font-family:var(--font-body)]">
              <p className="card-description" dangerouslySetInnerHTML={{ __html: card.description }}/>
              
              {card.links.length > 0 && (
                <div className="card-links">
                  {card.links.map(link => (
                    <a
                      key={link.label}
                      className="card__link"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card-media">
            {card.type === "video" ? <video controls className="card-video"> <source src={card.media} type="video/mp4"/> </video> : <img className="card-image" src={card.media} alt={`${card.title} image`}/>}
          </div>
        </div>
      ))}
    </div>
  )
}