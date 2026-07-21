"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { FolderIcon } from "@phosphor-icons/react";
import "../app/globals.css";
import Slideshow from "@/components/Slideshow";
import { useLocale } from "@/lib/i18n/Locale_context";


type Slide = {
  id: string;
  src: string;
  alt: string;
};

type Course = {
  id: string;
  slides: Slide[];
  readme?: string;
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
      { 
        id: "program-design", 
        slides: [],
        readme: "/120-README.md"
      },
      { 
        id: "discrete-structures", 
        slides: [], 
        readme: "/222-README.md"
      },
      { 
        id: "linear-algebra", 
        slides: [],
        readme: "/304-README.md" 
      },
      { 
        id: "computer-organization", 
        slides: [],
        readme: "/312-README.md"
      },
      { 
        id: "data-structures-algorithms", 
        slides: [],
        readme: "/221-README.md" 
      },
      { 
        id: "computer-systems", 
        slides: [], 
        readme: "/313-README.md"
      },
      {
        id: "software-engineering",
        slides: [
          {
            id: "se-1",
            src: "/331-proj2-order.png",
            alt: "JavaFX-based Boba POS GUI for Project 2.",
          },
          {
            id: "se-2",
            src: "/331-proj2-add-item.png",
            alt: "Add Item popup interface for the Boba POS system.",
          },
          {
            id: "se-3",
            src: "/331-proj2-add-associated-ingredients.png",
            alt: "Ingredient linking interface for connecting ingredients to seasonal drinks.",
          },
          {
            id: "se-4",
            src: "/331-proj3-customer-kiosk.png",
            alt: "Dynamic website-based Boba POS customer kiosk for Project 3.",
          },
          {
            id: "se-5",
            src: "/331-proj3-customer-customizations-popup.png",
            alt: "Accessible customer customizations popup for the Boba POS kiosk.",
          },
          {
            id: "se-6",
            src: "/331-proj3-customer-cart.png",
            alt: "Customer cart interface with loyalty point system.",
          },
          {
            id: "se-7",
            src: "/331-proj3-employee-kiosk.png",
            alt: "Simplified employee view kiosk interface.",
          },
          {
            id: "se-8",
            src: "/331-proj3-manager-reports.webp",
            alt: "Daily sales report dashboard for managers with multiple available reports.",
          },
        ],
        portfolioLink: { href: "/portfolio#pearl-tea", name: "Pearl Tea POS" },
      },
      { 
        id: "algorithm-design", 
        slides: [],
        readme: "/411-README.md"
      },
    ],
  },
  {
    id: "cs-electives",
    courses: [
      {
        id: "machine-learning",
        slides: [
          {
            id: "ml-1",
            src: "/421-3d-svm-scatterplot-with-margin.png",
            alt: "SVM hyperplane and margin visualization.",
          },
          {
            id: "ml-2",
            src: "/421-xgboost-roc-curve.png",
            alt: "XGBoost ROC curve showing model performance.",
          },
          {
            id: "ml-3",
            src: "/421-eda-correlation-heatmap.png",
            alt: "EDA Pearson's correlation heatmap showing feature relationships.",
          },
        ],
      },
      {
        id: "computer-graphics",
        slides: [
          {
            id: "cg-1",
            src: "/441-a3-shader.gif",
            alt: "Exploring shaders, materials, time-based animations with Stanford Bunny and Utah Teapot",
          },
          {
            id: "cg-2",
            src: "/441-a4-topdown.gif",
            alt: "Top-down and freelook camera scene demonstration.",
          },
          {
            id: "cg-3",
            src: "/441-a5-deferredrendering.gif",
            alt: "Animated scene rendered with deferred rendering and light attenuation.",
          },
          {
            id: "cg-4",
            src: "/441-a6-raytracing.png",
            alt: "Ray tracing scene rendering demonstration.",
          },
        ],
      },
      {
        id: "cs-research",
        slides: [
          {
            id: "res-1",
            src: "/491-annomath-interface.png",
            alt: "Interactive interface graphic for AnnoMath.",
          },
          {
            id: "res-2",
            src: "/491-annomath-technical-pipeline.png",
            alt: "Full technical pipeline graphic for AnnoMath.",
          },
          {
            id: "res-3",
            src: "/491-annotation-coding-example.png",
            alt: "Example of annotations and color changes from open coding of Khan Academy math videos.",
          },
        ],
        portfolioLink: { href: "/portfolio#annomath", name: "AnnoMath" },
      }, 
    ],
  },
  {
    id: "statistics",
    courses: [
      { 
        id: "statistics-1-2", 
        slides: [], 
        readme: "/211-212-README.md"
      },
      {
        id: "statistical-computing",
        slides: [
          {
            id: "sc-1",
            src: "/stat404-nyc-airbnb-neighborhood-vs-price.png",
            alt: "Boxplots comparing NYC neighborhoods and prices using Airbnb listing data.",
          },
          {
            id: "sc-2",
            src: "/stat404-poly-plot.png",
            alt: "Polynomial fit plot using the Boston Housing dataset.",
          },
          {
            id: "sc-3",
            src: "/stat404-residuals-vs-fitted.png",
            alt: "Residuals versus fitted graph using the Boston Housing dataset.",
          },
          {
            id: "sc-4",
            src: "/stat404-theta1-hist.png",
            alt: "Parameter distribution graph showing statistical parameter values.",
          },
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
          {
            id: "mlp-1",
            src: "/460-machine-learning-mock-flow.png",
            alt: "Flowchart depicting a machine learning system designed for a local business as a semester-long mock project.",
          },
        ],
      },
      {
        id: "business-genai",
        slides: [
          {
            id: "bg-1",
            src: "/450-arts-participation-by-age-group.png",
            alt: "Market analysis showing arts participation by age group to identify target demographics.",
          },
          {
            id: "bg-2",
            src: "/450-arts-participation-heatmap-by-region.png",
            alt: "Market analysis showing arts participation by region to assess geographic demand.",
          },
          {
            id: "bg-3",
            src: "/450-michaels-profit-margins-over-time.png",
            alt: "Competitor analysis showing Michaels profit margins over time.",
          },
          {
            id: "bg-4",
            src: "/450-retail-sales-over-time.png",
            alt: "Partnership viability analysis showing retail sales trends over time.",
          },
        ],
      },
      {
        id: "business-storytelling-ai",
        slides: [
          {
            id: "bs-1",
            src: "/455-gnn-movie-recommendation-calibration-plot.png",
            alt: "Calibration plot for a GNN-based movie recommendation model.",
          },
          {
            id: "bs-2",
            src: "/455-who-regions.png",
            alt: "WHO regions visualization for geospatial analysis of global COVID-19 data.",
          },
          {
            id: "bs-3",
            src: "/455-covid-new-deaths.png",
            alt: "COVID-19 new deaths over time from WHO geospatial data.",
          },
          {
            id: "bs-4",
            src: "/455-ga4-gertificate.png",
            alt: "Google Analytics 4 certification for managing GA4 data and reading reports.",
          },
        ],
      },
    ],
  },
];

type Coursework = Record<string, Course[]>;

type TranslatedSlide = Slide & { caption: string };
type TranslatedCourse = Omit<Course, "slides" | "portfolioLink"> & {
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


function insertQueryBeforeHash(href: string, query: string) {
  const [path, hash] = href.split("#");
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${query}${hash ? `#${hash}` : ""}`;
}



export default function CourseworkSection() {
  const [readmesLoaded, setReadmesLoaded] = useState(false);

  const { t, locale } = useLocale();

  const isSimplifiedChinese = locale === "zh-Hans";
  const isTraditionalChinese = locale === "zh-Hant";  

  const coursework = getCoursework(t);

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    coursework[0]?.id
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const selectedCategory = coursework.find((cat) => cat.id === selectedCategoryId);
  const courses = selectedCategory?.courses || [];
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const slides = selectedCourse?.slides || [];

  const readmePath =
  isSimplifiedChinese
    ? selectedCourse?.readme?.replace(/\.md$/, "-zh-s.md")
    : isTraditionalChinese
    ? selectedCourse?.readme?.replace(/\.md$/, "-zh-t.md")
    : selectedCourse?.readme; // for typing animation

  const [currentSrc, setCurrentSrc] = useState(selectedCourse?.slides[0]?.src);

  const [notHoverable, setNotHoverable] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const useCondensedLayout = notHoverable || smallScreen;
  
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const toggleCategory = (id: string) => {
    setExpandedCategoryId(prev => (prev === id ? null : id));
  };


  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => (
    <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
      <span className={`absolute block h-0.5 w-full bg-text transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      <span className={`absolute block h-0.5 w-full bg-text transition-transform duration-200 rotate-90 ${isOpen ? "rotate-180" : ""}`} />
    </span>
  );

  const [readmeMap, setReadmeMap] = useState<Record<string, string>>({});

  const markdownComponents = useMemo(() => ({
    h2: ({ children }) => <h2 className="text-xl lg:text-3xl third-level-headings mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg lg:text-2xl third-level-headings mb-2 mt-4">{children}</h3>,
    p: ({ children }) => <p className="body-text text-base lg:text-xl mb-3">{children}</p>,
    ul: ({ children }) => <ul className="body-text border-l-3 border-accent pl-4 space-y-1 mb-3">{children}</ul>,
    li: ({ children }) => <li className="text-base lg:text-xl list-disc list-inside">{children}</li>,
    strong: ({ children }) => <strong className="text-accent font-semibold">{children}</strong>,
    a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  }), []);

  const renderCoursework = () => {
    if (!coursework) return null;

    if (useCondensedLayout) {
      return (
        <div>
          {coursework.map((category) => {
            const isExpanded = expandedCategoryId === category.id;

            return (
              <div key={category.id}>
                <div className={[
                  "flex gap-2 pl-1 pr-1 ml-6 mr-6 mb-1",
                  selectedCategoryId === category.id && "active",
                ].filter(Boolean).join(" ")}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setSelectedCourseId(null);
                    toggleCategory(category.id)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FolderIcon size={30} className="cursor-pointer" />

                    <button
                      className="category-item text-sm 
                      body-text text-left text-nowrap"
                    >
                      {category.name}
                    </button>
                  </div>

                  <button className="ml-auto" aria-label={isExpanded ? "Collapse category" : "Expand category"}>
                    <ToggleIcon isOpen={isExpanded} />
                  </button>
                </div>

                {isExpanded && (
                  <>
                    <div className="ml-9 mr-6">
                      {courses.map((course) => {
                        const isSelected = selectedCourseId === course.id;

                        return (
                          <div key={course.id}>
                            <div className={[
                              "flex pl-1 pr-1 gap-2",
                              isSelected && "active",
                              ].filter(Boolean).join(" ")}
                              onClick={() => setSelectedCourseId(course.id)}
                            >
                              <div className="flex items-center gap-2">
                                <FolderIcon
                                  size={30}
                                  weight={course.slides.length > 0 ? "fill" : "regular"}
                                  className="cursor-pointer shrink-0"
                                />

                                <button
                                  key={`${selectedCategoryId}-${course.id}`}
                                  className="text-sm course-item body-text text-wrap max-w-60
                                    text-left hover:max-w-full"
                                >
                                  {course.name}
                                </button>

                              </div>

                              {course.portfolioLink && (
                                <Link
                                  href={insertQueryBeforeHash(course.portfolioLink.href, "from=coursework")}
                                  title={course.portfolioLink.label}
                                >
                                  <p className="text-subheading hover:text-accent">↗</p>
                                </Link>
                              )}
                            </div>

                            {isSelected && (course.slides.length > 0 || readmeMap[selectedCourse?.id]) && (
                              <>
                                <h3 className={`third-level-headings text-xl text-center pb-2
                                mt-5 lg:mt-0 ${course.slides.length === 0 && "mt-3"}`}
                                >
                                  {slides.length > 0 ? currentSrc?.replace("/", "") : readmePath?.replace("/", "")}
                                </h3>


                                {slides.length > 0 ? (
                                  <Slideshow key={selectedCourse?.id} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
                                ) : readmeMap[selectedCourse.id] ? (
                                  <div className="readme mb-8">
                                    <ReactMarkdown
                                      
                                    >
                                      {readmeMap[selectedCourse?.id]}
                                    </ReactMarkdown>
                                  </div>
                                  ) : null}
                              </>
                            )}

                          </div>
                        );
                      })}
                    </div>
                </>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    else {
      return (
        <div className={`flex flex-row gap-12 mb-8 ${
            selectedCourse && (slides.length > 0 || readmeMap[selectedCourse.id]) 
              ? "justify-center" 
              : "ml-18"
          }`}
        >
          <div>
            {coursework.map((category) => (
            <div key={category.id} 
              className={[
              "flex items-center gap-2 pr-1",
              selectedCategoryId === category.id && "active",
              ]
                .filter(Boolean)
                .join(" ")
              }
              onClick={() => {
                setSelectedCategoryId(category.id);
                setSelectedCourseId(null);
              }}
            >

              <FolderIcon size={30} className="cursor-pointer"/>

              <button
              className={[
                "category-item",
                "text-xl",
                "body-text",
                "text-left",
                "text-nowrap",
                ]
                .filter(Boolean)
                .join(" ")
              }
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
                "flex lg:items-center gap-2 lg:whitespace-nowrap pr-2", 
                selectedCourseId === course.id && "active",
                ]
                  .filter(Boolean)
                  .join(" ")
                }
                onClick={() =>
                  setSelectedCourseId((prev) =>
                    prev === course.id ? null : course.id
                  )
                }
              >
                <FolderIcon size={30} weight={course.slides.length > 0 ? "fill" : "regular"} 
                  className="cursor-pointer shrink-0"
                />

                <button
                  key={`${selectedCategoryId}-${course.id}`}
                  className={`text-lg course-item body-text text-wrap max-w-48 
                    lg:overflow-hidden lg:text-ellipsis 
                    lg:whitespace-nowrap pr-20 hover:max-w-full`}
                >
                  {course.name}
                </button>

                {course.portfolioLink && (
                  <Link
                    href={insertQueryBeforeHash(course.portfolioLink.href, "from=coursework")}
                    title={course.portfolioLink.label}
                  >
                    <p className="text-subheading hover:text-accent">↗</p>
                  </Link>
                )}

              </div>
            ))}
          </div>
                
          <div>
            {selectedCourse ? (
              <>
                <h3 className={`third-level-headings text-3xl text-center pb-2`}>
                  {slides.length > 0 ? currentSrc?.replace("/", "") : readmePath?.replace("/", "")}
                </h3>
                {slides.length > 0 ? (
                  <Slideshow key={selectedCourse.id} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
                ) : readmeMap[selectedCourse.id] ? (
                  <div className="readme">
                    <ReactMarkdown
                      components={markdownComponents}
                    >
                      {readmeMap[selectedCourse.id]}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-lg body-text">{t.coursework_empty}</p>
                )}

              </>
            ) : (
              <p className="text-lg body-text">{t.coursework_select_prompt}</p>
            )}

          </div>
        </div>
      );
    }
  }



  useEffect(() => {
    setCurrentSrc(selectedCourse?.slides[0]?.src); // reset when course changes
  }, [selectedCourse?.id]);


  useEffect(() => {
    setNotHoverable(window.matchMedia("(hover: none)").matches);
    setSmallScreen(window.matchMedia("(max-width: 768px)").matches);
  }, []);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  useEffect(() => {
    if (!coursework) return;

    const allCourses = coursework.flatMap((cat) => cat.courses ?? courses);
    const readmesToFetch = allCourses.filter((c) => c.readme);

    Promise.all(
      readmesToFetch.map((c) => {
        return fetch(readmePath)
          .then((res) => res.text())
          .then((text) => [c.id, text] as const)
          .catch(() => [c.id, null] as const);
      })
    ).then((entries) => {
      setReadmeMap(Object.fromEntries(entries.filter(([, text]) => text !== null)));
      setReadmesLoaded(true);
    });
  }, [coursework, readmePath]);

  if (!readmesLoaded) return null;

  return (
    <div>
      {renderCoursework()}
    </div>
  )
}