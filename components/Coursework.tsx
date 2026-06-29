"use client";
import { useEffect, useState } from "react";
import "../app/globals.css";
import Slideshow from "@/components/Slideshow";
import { FolderIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";


const coursework: Coursework = {
  "Required CS": [
    {
      name: "Program Design",
      slides: []
    },
    {
      name: "Discrete Structures",
      slides: []
    },
    {
      name: "Linear Algebra",
      slides: []
    },
    {
      name: "Computer Organization",
      slides: []
    },
    {
      name: "Data Structures & Algorithms",
      slides: []
    },
    {
      name: "Computer Systems",
      slides: []
    },
    {
      name: "Software Engineering",
      slides: [
        {
          src: "/331-proj2-order.png",
          caption: "JavaFX-Based Boba POS GUI (Project 2)",
        },
        {
          src: "/331-proj2-add-item.png",
          caption: "Add Item Popup",
        },
        {
          src: "/331-proj2-add-associated-ingredients.png",
          caption: "Ingredient Linking to Seasonal Drinks",
        },


        {
          src: "/331-proj3-customer-kiosk.png",
          caption: "Dynamic Website Based Boba POS Customer Kiosk (Project 3)",
        },
        {
          src: "/331-proj3-customer-customizations-popup.png",
          caption: "Accessible Customer Customizations Popup",
        },
        {
          src: "/331-proj3-customer-cart.png",
          caption: "Customer Cart with Loyalty Point System",
        },
        {
          src: "/331-proj3-employee-kiosk.png",
          caption: "Simplified Employee View Kiosk",
        },
        {
          src: "/331-proj3-manager-reports.webp",
          caption: "Daily Sales Report for Manager, One of Many Available Reports",
        },
      ],
      portfolioLink: {
        label: "See Pearl Tea POS →",
        href: "/portfolio#boba-pos-system",
      },
    },
    {
      name: "Algorithm Design",
      slides: []
    },
  ],

  "CS Electives": [
    {
      name: "Machine Learning",
      slides: [
        {
          src: "/421-3d-svm-scatterplot-with-margin.png",
          caption: "SVM Hyperplane and Margin Visualization",
        },
        {
          src: "/421-xgboost-roc-curve.png",
          caption: "XGBoost ROC Curve",
        },
        {
          src: "/421-eda-correlation-heatmap.png",
          caption: "EDA Pearson's Correlation Heatmap",
        },
      ]
    },
    {
      name: "Computer Graphics",
      slides: [
        {
          src: "/441-a3-shader.png",
          caption: "Cell Shader with Stanford Bunny and Utah Teapot",
        },
        {
          src: "/441-a4-topdown.png",
          caption: "Top-down and Freelook Camera Scene",
        },
        {
          src: "/441-a5-deferredrendering.png",
          caption: "Scene with Deferred Rendering and Light Attenuation",
        },
        {
          src: "/441-a6-raytracing.png",
          caption: "Ray Tracing Scene",
        },
      ]
    },
    {
      name: "Computer Science Research",
      slides: [
        {
          src: "/491-annomath-interface.png",
          caption: "Interactive Interface Graphic for AnnoMath",
        },
        {
          src: "/491-annomath-technical-pipeline.png",
          caption: "Full Technical Pipeline Graphics for AnnoMath",
        },
        {
          src: "491-annotation-coding-example.png",
          caption: "Annotations and Color Changes from Open Coding of Khan Academy Math Videos",
        },
      ],
      portfolioLink: {
        label: "See AnnoMath →",
        href: "/portfolio#annomath",
      },
    },
  ],

  "Statistics": [
    {
      name: "Statistics I & II",
      slides: []
    },
    {
      name: "Statistical Computing",
      slides: [
        {
          src: "/stat404-nyc-airbnb-neighborhood-vs-price.png",
          caption: "Boxplots Comparing NYC Neighborhoods and Prices using Airbnb Listing Data",
        },
        {
          src: "/stat404-poly-plot.png",
          caption: "Polynomial Fit Plot using Boston Housing Dataset",
        },
        {
          src: "/stat404-residuals-vs-fitted.png",
          caption: "Residuals vs Fitted Graph with Boston Housing Dataset",
        },
        {
          src: "/stat404-theta1-hist.png",
          caption: "Parameter Distribution Graph",
        },
      ]
    },
  ],

  "AI in Business": [
    {
      name: "Machine Learning & Predictive Modeling for Business",
      slides: [
        {
          src: "460-machine-learning-mock-flow.png",
          caption: "ML System Designed for a Local Business for Semester-long Mock Project",
        },
      ]
    },
    {
      name: "Business with Generative AI",
      slides: [
        {
          src: "450-arts-participation-by-age-group.png",
          caption: "Market Analysis: Arts Participation by Age Group to Identify Target Demographics",
        },
        {
          src: "450-arts-participation-heatmap-by-region.png",
          caption: "Market Analysis: Arts Participation by Region to Assess Geographic Demand",
        },
        {
          src: "450-michaels-profit-margins-over-time.png",
          caption: "Competitor Analysis: Michaels Profit Margins Over Time",
        },
        {
          src: "450-retail-sales-over-time.png",
          caption: "Partnership Viability: Retail Sales Trends",
        },
      ]
    },
    {
      name: "Business Storytelling using AI",
      slides: [
        {
          src: "455-gnn-movie-recommendation-calibration-plot.png", 
          caption: "Calibration Plot for a GNN-Based Movie Recommendation Model",
        },
        {
          src: "455-who-regions.png",
          caption: "WHO Regions for Geospatial Analysis of Global COVID-19 Data",
        },
        {
          src: "455-covid-new-deaths.png",
          caption: "COVID-19 New Deaths Over Time from WHO Geospatial Data",
        },
        
        {
          src: "455-ga4-gertificate.png",
          caption: "Google Analytics 4 Certification: Manage GA4 Data and Learn to Read Reports",
        },
      ]
    },
  ],
};


type Slide = {
  src: string;
  caption: string;
};

type Course = {
  name: string;
  slides: Slide[];
  portfolioLink?: { label: string; href: string };
};

type Coursework = Record<string, Course[]>;



export default function Coursework() {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(coursework)[0]
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = coursework[selectedCategory];
  const slides = selectedCourse?.slides || [];

  const [currentSrc, setCurrentSrc] = useState(selectedCourse?.slides[0]?.src);

  // reset when course changes
  useEffect(() => {
    setCurrentSrc(selectedCourse?.slides[0]?.src);
  }, [selectedCourse]);

  return (
    <div className={`flex flex-row gap-12 mb-8 ${selectedCourse && slides.length > 0 ? "justify-center" : "ml-18"}`}>
      <div>
        {Object.keys(coursework).map((category) => (
        <div key={`${category} div`} className={[
          "flex items-center gap-2",
          selectedCategory === category && "active",
          ]
            .filter(Boolean)
            .join(" ")
          }>

          <FolderIcon size={30} className="cursor-pointer" 
            onClick={() => {
            setSelectedCategory(category);
            setSelectedCourse(null);
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
            setSelectedCategory(category);
            setSelectedCourse(null);
          }}
          key={category}
          >
            {category}
          </button>
        </div>
        ))}
      </div>

      <div>
        {courses.map((course) => (
          <div key={course.name} className={[
            "flex items-center gap-2 whitespace-nowrap", 
            selectedCourse === course && "active",
            ]
              .filter(Boolean)
              .join(" ")
            }>
            <FolderIcon size={30} weight={course.slides.length > 0 ? "fill" : "regular"} 
              className="cursor-pointer"
              onClick={() => setSelectedCourse(course)} 
            />

            <button
              key={`${selectedCategory}-${course.name}`}
              className="text-lg! course-item body-text overflow-hidden text-ellipsis whitespace-nowrap max-w-47.5 
                hover:max-w-full"
              onClick={() => setSelectedCourse(course)}
            >
              {course.name}
            </button>

            {course.portfolioLink && (
              <a href={course.portfolioLink.href} title={course.portfolioLink.label}>
                <ArrowSquareOutIcon size={18} className="text-subheading hover:text-accent" />
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
              <Slideshow key={selectedCourse.name} slides={slides} onSlideChange={(slide) => setCurrentSrc(slide.src)} />
            ) : (
              <p className="text-lg! body-text">(Empty.)</p>
            )}
          </>
        ) : (
          <p className="text-lg! body-text">Please select a course to see details.</p>
        )}
      </div>
    </div>
  )
}
