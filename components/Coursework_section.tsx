"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderIcon } from "@phosphor-icons/react";
import "../app/globals.css";
import Slideshow from "@/components/Slideshow";
import { useLocale } from "@/lib/i18n/Locale_context";


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

  const [notHoverable, setNotHoverable] = useState(false);

  // reset when course changes
  useEffect(() => {
    setCurrentSrc(selectedCourse?.slides[0]?.src);
    setNotHoverable(window.matchMedia('(hover: none)').matches);
  }, [selectedCourse]);

  return (
    <div className={`flex flex-row gap-12 mb-8 ${selectedCourse && slides.length > 0 ? "justify-center" : "ml-18"}`}>
      <div>
        {coursework.map((category) => (
        <div key={category.id} className={[
          "flex items-center gap-2 pr-1",
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
            "text-xs",
            "lg:text-lg!",
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
            "flex lg:items-center gap-2 lg:whitespace-nowrap pr-2", 
            selectedCourseId === course.id && "active",
            ]
              .filter(Boolean)
              .join(" ")
            }>
            <FolderIcon size={30} weight={course.slides.length > 0 ? "fill" : "regular"} 
              className="cursor-pointer shrink-0"
              onClick={() => setSelectedCourseId(course.id)} 
            />

            <button
              key={`${selectedCategoryId}-${course.id}`}
              className="text-xs lg:text-lg! course-item body-text text-wrap max-w-48 
                lg:overflow-hidden lg:text-ellipsis 
                lg:whitespace-nowrap pr-20 hover:max-w-full"
              onClick={() => setSelectedCourseId(course.id)}
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
            <h3 className="third-level-headings text-3xl! text-center pb-2">
              {currentSrc?.replace("/", "")}
            </h3>
            {slides.length > 0 ? (
              <Slideshow key={selectedCourse.id} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
            ) : (
              <p className="text-xs lg:text-lg! body-text">{t.coursework_empty}</p>
            )}
          </>
        ) : (
          <p className="text-xs lg:text-lg! body-text">{t.coursework_select_prompt}</p>
        )}

      </div>
    </div>
  )
}