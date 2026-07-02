"use client";

import Image from "next/image";
import "./globals.css";
import Skills_scene from "@/components/Skills_scene";
import Bottom_overscroll_color from "@/components/Overscroll_color";


// export default function Home() {
//   Bottom_overscroll_color(); 

//   return (
//     <div className="bg-background">
//       <title>Claire Wu</title>
//       <Nav/>
//       <div>
//         <h1 className="heading-text text-text [text-box-trim:trim-end] mt-5 -mb-4">Claire Wu</h1>
//       </div>

//       <div className="flex justify-center"> {/* keeps text centered during typing animation */}
//         <p className="body-text typing-animation mb-14 text-text">
//           CS senior at Texas A&M, minoring in Statistics and{" "}
//           <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">AI in business</a>
//         </p>
//       </div>
      
//       <div className="grid grid-cols-2 items-stretch gap-12">
//         <div className="flex justify-center items-center object-cover h-full">
//           <img className="headshot" src="my-headshot.jpg" alt="Claire Wu headshot"/>
//         </div>


//         <div className="flex flex-col justify-center text-text">
//           <p className="body-text max-w-[clamp(36rem,39.9vw,90rem)] text-left">
//             I am passionate about software engineering, data science, 
//             AI/ML, and UX design. Currently, I am researching in Dr. Xia"s{" "}
//             <a href="https://www.xiameng.org/DreamLab/" target="_blank" rel="noopener noreferrer">Dream Lab</a>, 
//             working on <i>AnnoMath</i>, an AI-powered multimodial interactive math tutorial system.
//           </p>

//           <p className="body-text max-w-[clamp(36rem,39.9vw,90rem)] text-left mt-4">
//             When I"m not coding, 
//             you can usually find me at the gym, 
//             crocheting or doing other crafts, or exploring new 
//             coffee shops!  
          
//             <br/>
//             <br/>

//             Check out my <a href="portfolio">portfolio</a> or feel free to <a href="#footer">contact me!</a>
//           </p>
//         </div>
//       </div>

//       <div className="pt-35 pb-40">
//         <h2 className="subheadings mb-10 text-center">My Skills</h2>
//         <Skills_scene/>
//       </div>
      
//       <Footer/>
//     </div>
//   );
// }



import { useLocale } from "@/lib/i18n/Locale_context";

export default function Home() {
  Bottom_overscroll_color();
  const { t } = useLocale();

  return (
    <div className="bg-background">
      <title>{t.site_title}</title>
      <div>
        <h1 className="heading-text text-text [text-box-trim:trim-end] mt-5 -mb-4">{t.home_heading}</h1>
      </div>

      <div className="flex justify-center"> {/* keeps text centered during typing animation */}
        <p className="body-text typing-animation mb-14 text-text">
          {t.home_subtitle_prefix}{" "}
          <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">{t.home_subtitle_link}</a>
        </p>
      </div>

      <div className="grid grid-cols-2 items-stretch gap-12">
        <div className="flex justify-center items-center object-cover h-full">
          <img className="headshot" src="my-headshot.jpg" alt={t.home_headshot_alt}/>
        </div>

        <div className="flex flex-col justify-center text-text">
          <p className="body-text max-w-[clamp(36rem,39.9vw,90rem)] text-left">
            {t.home_intro_p1_prefix}{" "}
            <a href="https://www.xiameng.org/DreamLab/" target="_blank" rel="noopener noreferrer">{t.home_intro_p1_link}</a>,{" "}
            {t.home_intro_p1_suffix} <i>{t.home_intro_p1_project}</i>, {t.home_intro_p1_suffix2}
          </p>

          <p className="body-text max-w-[clamp(36rem,39.9vw,90rem)] text-left mt-4">
            {t.home_intro_p2_prefix}

            <br/>
            <br/>

            {t.home_intro_p2_middle} <a href="portfolio">{t.home_intro_p2_portfolio_link}</a> {t.home_intro_p2_or} <a href="#footer">{t.home_intro_p2_contact_link}</a>
          </p>
        </div>
      </div>

      <div className="pt-35 pb-40">
        <h2 className="subheadings mb-10 text-center">{t.home_skills_heading}</h2>
        <Skills_scene/>
      </div>
      
    </div>
  );
}


// "use client";

// import { useLocale } from "@/lib/Locale_context";

// export default function Home() {
//   const { t } = useLocale();

//   return (
//     <main>
//       <h1>{t.hero_title}</h1>
//       <p>{t.hero_subtitle}</p>
//     </main>
//   );
// }
