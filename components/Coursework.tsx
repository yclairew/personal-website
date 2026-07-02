"use client";
import { useEffect, useState } from "react";
import { FolderIcon } from "@phosphor-icons/react";
import "../app/globals.css";
import Slideshow from "@/components/Slideshow";
import { useLocale } from "@/lib/i18n/Locale_context";


// const coursework: Coursework = {
//   "Required CS": [
//     {
//       name: "Program Design",
//       slides: []
//     },
//     {
//       name: "Discrete Structures",
//       slides: []
//     },
//     {
//       name: "Linear Algebra",
//       slides: []
//     },
//     {
//       name: "Computer Organization",
//       slides: [],
//       // readme: "# Computer Organization*\nNand2Tetris — Built a Computer from First Principles*\n\n## Overview\nA semester-long build of a full computer system from the ground up, starting at a single NAND gate and ending with a working CPU running custom assembly programs — based on the Nand2Tetris curriculum.\n\n## What I Did\nStarting from nothing but a NAND gate, I built up the entire hardware stack in HDL: logic gates, an ALU, registers, RAM, and eventually a full CPU. From there I built the assembler that translates assembly instructions into the machine code the CPU actually runs. Every layer had to work before the next one could be built on top of it, so debugging meant tracing problems all the way down to the gate level when something didn't add up.\n\n## Tech / Skills\n`HDL` `Boolean Logic` `Computer Architecture` `Assembly` `CPU Design` `Nand2Tetris Hardware Simulator` `CPU Emulator`\n\n## Outcome\nWorking CPU and assembler capable of running custom assembly programs — built entirely from a single logic gate up."
//     },
//     {
//       name: "Data Structures & Algorithms",
//       slides: []
//     },
//     {
//       name: "Computer Systems",
//       slides: []
//     },
//     {
//       name: "Software Engineering",
//       slides: [
//         {
//           src: "/331-proj2-order.png",
//           caption: "JavaFX-Based Boba POS GUI (Project 2)",
//         },
//         {
//           src: "/331-proj2-add-item.png",
//           caption: "Add Item Popup",
//         },
//         {
//           src: "/331-proj2-add-associated-ingredients.png",
//           caption: "Ingredient Linking to Seasonal Drinks",
//         },


//         {
//           src: "/331-proj3-customer-kiosk.png",
//           caption: "Dynamic Website Based Boba POS Customer Kiosk (Project 3)",
//         },
//         {
//           src: "/331-proj3-customer-customizations-popup.png",
//           caption: "Accessible Customer Customizations Popup",
//         },
//         {
//           src: "/331-proj3-customer-cart.png",
//           caption: "Customer Cart with Loyalty Point System",
//         },
//         {
//           src: "/331-proj3-employee-kiosk.png",
//           caption: "Simplified Employee View Kiosk",
//         },
//         {
//           src: "/331-proj3-manager-reports.webp",
//           caption: "Daily Sales Report for Manager, One of Many Available Reports",
//         },
//       ],
//       portfolioLink: {
//         label: "See Pearl Tea POS →",
//         href: "/portfolio#boba-pos-system",
//       },
//     },
//     {
//       name: "Algorithm Design",
//       slides: []
//     },
//   ],

//   "CS Electives": [
//     {
//       name: "Machine Learning",
//       slides: [
//         {
//           src: "/421-3d-svm-scatterplot-with-margin.png",
//           caption: "SVM Hyperplane and Margin Visualization",
//         },
//         {
//           src: "/421-xgboost-roc-curve.png",
//           caption: "XGBoost ROC Curve",
//         },
//         {
//           src: "/421-eda-correlation-heatmap.png",
//           caption: "EDA Pearson's Correlation Heatmap",
//         },
//       ]
//     },
//     {
//       name: "Computer Graphics",
//       slides: [
//         {
//           src: "/441-a3-shader.png",
//           caption: "Cell Shader with Stanford Bunny and Utah Teapot",
//         },
//         {
//           src: "/441-a4-topdown.png",
//           caption: "Top-down and Freelook Camera Scene",
//         },
//         {
//           src: "/441-a5-deferredrendering.png",
//           caption: "Scene with Deferred Rendering and Light Attenuation",
//         },
//         {
//           src: "/441-a6-raytracing.png",
//           caption: "Ray Tracing Scene",
//         },
//       ]
//     },
//     {
//       name: "Computer Science Research",
//       slides: [
//         {
//           src: "/491-annomath-interface.png",
//           caption: "Interactive Interface Graphic for AnnoMath",
//         },
//         {
//           src: "/491-annomath-technical-pipeline.png",
//           caption: "Full Technical Pipeline Graphics for AnnoMath",
//         },
//         {
//           src: "491-annotation-coding-example.png",
//           caption: "Annotations and Color Changes from Open Coding of Khan Academy Math Videos",
//         },
//       ],
//       portfolioLink: {
//         label: "See AnnoMath →",
//         href: "/portfolio#annomath",
//       },
//     },
//   ],

//   "Statistics": [
//     {
//       name: "Statistics I & II",
//       slides: []
//     },
//     {
//       name: "Statistical Computing",
//       slides: [
//         {
//           src: "/stat404-nyc-airbnb-neighborhood-vs-price.png",
//           caption: "Boxplots Comparing NYC Neighborhoods and Prices using Airbnb Listing Data",
//         },
//         {
//           src: "/stat404-poly-plot.png",
//           caption: "Polynomial Fit Plot using Boston Housing Dataset",
//         },
//         {
//           src: "/stat404-residuals-vs-fitted.png",
//           caption: "Residuals vs Fitted Graph with Boston Housing Dataset",
//         },
//         {
//           src: "/stat404-theta1-hist.png",
//           caption: "Parameter Distribution Graph",
//         },
//       ]
//     },
//   ],

//   "AI in Business": [
//     {
//       name: "Machine Learning & Predictive Modeling for Business",
//       slides: [
//         {
//           src: "460-machine-learning-mock-flow.png",
//           caption: "ML System Designed for a Local Business for Semester-long Mock Project",
//         },
//       ]
//     },
//     {
//       name: "Business with Generative AI",
//       slides: [
//         {
//           src: "450-arts-participation-by-age-group.png",
//           caption: "Market Analysis: Arts Participation by Age Group to Identify Target Demographics",
//         },
//         {
//           src: "450-arts-participation-heatmap-by-region.png",
//           caption: "Market Analysis: Arts Participation by Region to Assess Geographic Demand",
//         },
//         {
//           src: "450-michaels-profit-margins-over-time.png",
//           caption: "Competitor Analysis: Michaels Profit Margins Over Time",
//         },
//         {
//           src: "450-retail-sales-over-time.png",
//           caption: "Partnership Viability: Retail Sales Trends",
//         },
//       ]
//     },
//     {
//       name: "Business Storytelling using AI",
//       slides: [
//         {
//           src: "455-gnn-movie-recommendation-calibration-plot.png", 
//           caption: "Calibration Plot for a GNN-Based Movie Recommendation Model",
//         },
//         {
//           src: "455-who-regions.png",
//           caption: "WHO Regions for Geospatial Analysis of Global COVID-19 Data",
//         },
//         {
//           src: "455-covid-new-deaths.png",
//           caption: "COVID-19 New Deaths Over Time from WHO Geospatial Data",
//         },
        
//         {
//           src: "455-ga4-gertificate.png",
//           caption: "Google Analytics 4 Certification: Manage GA4 Data and Learn to Read Reports",
//         },
//       ]
//     },
//   ],
// };


// type Slide = {
//   src: string;
//   caption: string;
// };

// type Course = {
//   name: string;
//   slides: Slide[];
//   // readme?: string;
//   portfolioLink?: { label: string; href: string };
// };

type Slide = {
  id: string;
  src: string;
};

type Course = {
  id: string;
  slides: Slide[];
  portfolioLink?: { href: string; name: string };
};

type CategoryData = {
  id: string;
  courses: Course[];
};

const courseworkData: CategoryData[] = [
  {
    id: "required-cs",
    courses: [
      { id: "program-design", slides: [] },
      { id: "discrete-structures", slides: [] },
      { id: "linear-algebra", slides: [] },
      { id: "computer-organization", slides: [] },
      { id: "data-structures-algorithms", slides: [] },
      { id: "computer-systems", slides: [] },
      {
        id: "software-engineering",
        slides: [
          { id: "se-1", src: "/331-proj2-order.png" },
          { id: "se-2", src: "/331-proj2-add-item.png" },
          { id: "se-3", src: "/331-proj2-add-associated-ingredients.png" },
          { id: "se-4", src: "/331-proj3-customer-kiosk.png" },
          { id: "se-5", src: "/331-proj3-customer-customizations-popup.png" },
          { id: "se-6", src: "/331-proj3-customer-cart.png" },
          { id: "se-7", src: "/331-proj3-employee-kiosk.png" },
          { id: "se-8", src: "/331-proj3-manager-reports.webp" },
        ],
        portfolioLink: { href: "/portfolio#pearl-tea", name: "Pearl Tea POS" },
      },
      { id: "algorithm-design", slides: [] },
    ],
  },
  {
    id: "cs-electives",
    courses: [
      {
        id: "machine-learning",
        slides: [
          { id: "ml-1", src: "/421-3d-svm-scatterplot-with-margin.png" },
          { id: "ml-2", src: "/421-xgboost-roc-curve.png" },
          { id: "ml-3", src: "/421-eda-correlation-heatmap.png" },
        ],
      },
      {
        id: "computer-graphics",
        slides: [
          { id: "cg-1", src: "/441-a3-shader.png" },
          { id: "cg-2", src: "/441-a4-topdown.png" },
          { id: "cg-3", src: "/441-a5-deferredrendering.png" },
          { id: "cg-4", src: "/441-a6-raytracing.png" },
        ],
      },
      {
        id: "cs-research",
        slides: [
          { id: "res-1", src: "/491-annomath-interface.png" },
          { id: "res-2", src: "/491-annomath-technical-pipeline.png" },
          { id: "res-3", src: "491-annotation-coding-example.png" },
        ],
        portfolioLink: { href: "/portfolio#annomath", name: "AnnoMath" },
      },
    ],
  },
  {
    id: "statistics",
    courses: [
      { id: "statistics-1-2", slides: [] },
      {
        id: "statistical-computing",
        slides: [
          { id: "sc-1", src: "/stat404-nyc-airbnb-neighborhood-vs-price.png" },
          { id: "sc-2", src: "/stat404-poly-plot.png" },
          { id: "sc-3", src: "/stat404-residuals-vs-fitted.png" },
          { id: "sc-4", src: "/stat404-theta1-hist.png" },
        ],
      },
    ],
  },
  {
    id: "ai-in-business",
    courses: [
      {
        id: "ml-predictive-modeling",
        slides: [
          { id: "mlp-1", src: "460-machine-learning-mock-flow.png" },
        ],
      },
      {
        id: "business-genai",
        slides: [
          { id: "bg-1", src: "450-arts-participation-by-age-group.png" },
          { id: "bg-2", src: "450-arts-participation-heatmap-by-region.png" },
          { id: "bg-3", src: "450-michaels-profit-margins-over-time.png" },
          { id: "bg-4", src: "450-retail-sales-over-time.png" },
        ],
      },
      {
        id: "business-storytelling-ai",
        slides: [
          { id: "bs-1", src: "455-gnn-movie-recommendation-calibration-plot.png" },
          { id: "bs-2", src: "455-who-regions.png" },
          { id: "bs-3", src: "455-covid-new-deaths.png" },
          { id: "bs-4", src: "455-ga4-gertificate.png" },
        ],
      },
    ],
  },
];

type Coursework = Record<string, Course[]>;

type TranslatedSlide = Slide & { caption: string };
type TranslatedCourse = Omit<Course, "slides"> & {
  name: string;
  slides: TranslatedSlide[];
  portfolioLink?: { label: string; href: string };
};
type TranslatedCategory = { id: string; name: string; courses: TranslatedCourse[] };

function getCoursework(t: Record<string, string>): TranslatedCategory[] {
  return courseworkData.map((category) => ({
    id: category.id,
    name: t[`coursework_category_${category.id}`],
    courses: category.courses.map((course) => ({
      ...course,
      name: t[`coursework_course_${course.id}_name`],
      slides: course.slides.map((slide) => ({
        ...slide,
        caption: t[`coursework_slide_${slide.id}_caption`],
      })),
      portfolioLink: course.portfolioLink
        ? {
            href: course.portfolioLink.href,
            label: `${t.coursework_link_see_prefix} ${course.portfolioLink.name} →`,
          }
        : undefined,
    })),
  }));
}




// TODO: edit styling
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// function CourseReadme({ content }: { content: string }) {
//   return (
//     <div className="rounded-lg border border-gray-700 bg-gray-900 overflow-hidden">
//       {/* fake file header bar */}
//       <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700 text-sm text-gray-400">
//         <span>📄</span>
//         <span className="font-mono">README.md</span>
//       </div>

//       <div className="prose prose-invert prose-sm sm:prose-base max-w-none p-6">
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             // style inline code as pill-style skill tags
//             code: ({ children }) => (
//               <span className="inline-block bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full text-xs font-mono mr-1 mb-1">
//                 {children}
//               </span>
//             ),
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// }





// export default function Coursework() {
//   const [selectedCategory, setSelectedCategory] = useState(
//     Object.keys(coursework)[0]
//   );
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

//   const courses = coursework[selectedCategory];
//   const slides = selectedCourse?.slides || [];

//   const [currentSrc, setCurrentSrc] = useState(selectedCourse?.slides[0]?.src);

//   // reset when course changes
//   useEffect(() => {
//     setCurrentSrc(selectedCourse?.slides[0]?.src);
//   }, [selectedCourse]);

//   return (
//     <div className={`flex flex-row gap-12 mb-8 ${selectedCourse && slides.length > 0 ? "justify-center" : "ml-18"}`}>
//       <div>
//         {Object.keys(coursework).map((category) => (
//         <div key={`${category} div`} className={[
//           "flex items-center gap-2",
//           selectedCategory === category && "active",
//           ]
//             .filter(Boolean)
//             .join(" ")
//           }>

//           <FolderIcon size={30} className="cursor-pointer" 
//             onClick={() => {
//             setSelectedCategory(category);
//             setSelectedCourse(null);
//           }}
//           />

//           <button
//           className={[
//             "category-item",
//             "text-lg!",
//             "body-text",
//             "text-left",
//             "text-nowrap",
//             ]
//             .filter(Boolean)
//             .join(" ")
//           }
//           onClick={() => {
//             setSelectedCategory(category);
//             setSelectedCourse(null);
//           }}
//           key={category}
//           >
//             {category}
//           </button>
//         </div>
//         ))}
//       </div>

//       <div>
//         {courses.map((course) => (
//           <div key={course.name} className={[
//             "flex items-center gap-2 whitespace-nowrap", 
//             selectedCourse === course && "active",
//             ]
//               .filter(Boolean)
//               .join(" ")
//             }>
//             <FolderIcon size={30} weight={course.slides.length > 0 ? "fill" : "regular"} 
//               className="cursor-pointer"
//               onClick={() => setSelectedCourse(course)} 
//             />

//             <button
//               key={`${selectedCategory}-${course.name}`}
//               className="text-lg! course-item body-text overflow-hidden text-ellipsis whitespace-nowrap max-w-47.5 
//                 hover:max-w-full"
//               onClick={() => setSelectedCourse(course)}
//             >
//               {course.name}
//             </button>

//             {course.portfolioLink && (
//               <a href={course.portfolioLink.href} title={course.portfolioLink.label}>
//                 <p className="text-subheading hover:text-accent">↗</p>
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
            
//       <div>
//         {selectedCourse ? (
//           <>
//             <h3 className="third-level-headings text-3xl! text-center pb-2">
//               {currentSrc?.replace("/", "")}
//             </h3>
//             {slides.length > 0 ? (
//               <Slideshow key={selectedCourse.name} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
//             ) : (
//               <p className="text-lg! body-text">(Empty.)</p>
//             )}
//           </>
//         ) : (
//           <p className="text-lg! body-text">Please select a course to see details.</p>
//         )}

//         {/* TODO: add "readme files" */}
//         {/* {selectedCourse?.readme && CourseReadme({ content: selectedCourse.readme })} */}
//       </div>
//     </div>
//   )
// }


export default function Coursework() {
  const { t } = useLocale();
  const coursework = getCoursework(t);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    coursework[0]?.id
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedCategory = coursework.find((cat) => cat.id === selectedCategoryId);
  const courses = selectedCategory?.courses || [];
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const slides = selectedCourse?.slides || [];

  const [currentSrc, setCurrentSrc] = useState(selectedCourse?.slides[0]?.src);

  // reset when course changes
  useEffect(() => {
    setCurrentSrc(selectedCourse?.slides[0]?.src);
  }, [selectedCourse]);

  return (
    <div className={`flex flex-row gap-12 mb-8 ${selectedCourse && slides.length > 0 ? "justify-center" : "ml-18"}`}>
      <div>
        {coursework.map((category) => (
        <div key={category.id} className={[
          "flex items-center gap-2",
          selectedCategoryId === category.id && "active",
          ]
            .filter(Boolean)
            .join(" ")
          }>

          <FolderIcon size={30} className="cursor-pointer" 
            onClick={() => {
            setSelectedCategoryId(category.id);
            setSelectedCourseId(null);
          }}
          />

          <button
          className={[
            "category-item",
            "text-lg!",
            "body-text",
            "text-left",
            "text-nowrap",
            ]
            .filter(Boolean)
            .join(" ")
          }
          onClick={() => {
            setSelectedCategoryId(category.id);
            setSelectedCourseId(null);
          }}
          key={category.id}
          >
            {category.name}
          </button>
        </div>
        ))}
      </div>

      <div>
        {courses.map((course) => (
          <div key={course.id} className={[
            "flex items-center gap-2 whitespace-nowrap", 
            selectedCourseId === course.id && "active",
            ]
              .filter(Boolean)
              .join(" ")
            }>
            <FolderIcon size={30} weight={course.slides.length > 0 ? "fill" : "regular"} 
              className="cursor-pointer"
              onClick={() => setSelectedCourseId(course.id)} 
            />

            <button
              key={`${selectedCategoryId}-${course.id}`}
              className="text-lg! course-item body-text overflow-hidden text-ellipsis whitespace-nowrap max-w-47.5 
                hover:max-w-full"
              onClick={() => setSelectedCourseId(course.id)}
            >
              {course.name}
            </button>

            {course.portfolioLink && (
              <a href={course.portfolioLink.href} title={course.portfolioLink.label}>
                <p className="text-subheading hover:text-accent">↗</p>
              </a>
            )}
          </div>
        ))}
      </div>
            
      <div>
        {selectedCourse ? (
          <>
            <h3 className="third-level-headings text-3xl! text-center pb-2">
              {currentSrc?.replace("/", "")}
            </h3>
            {slides.length > 0 ? (
              <Slideshow key={selectedCourse.id} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
            ) : (
              <p className="text-lg! body-text">{t.coursework_empty}</p>
            )}
          </>
        ) : (
          <p className="text-lg! body-text">{t.coursework_select_prompt}</p>
        )}

        {/* TODO: add "readme files" */}
        {/* {selectedCourse?.readme && CourseReadme({ content: selectedCourse.readme })} */}
      </div>
    </div>
  )
}