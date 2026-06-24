"use client";
import { useState } from "react";
import "../app/globals.css";
import Slideshow from "@/components/Slideshow";


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
          caption: "Order System UI",
        },
        {
          src: "/331-proj2-add-item.png",
          caption: "Add Item Flow",
        },
        {
          src: "/331-proj2-add-associated-ingredients.png",
          caption: "Ingredient Linking",
        },
      ]
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
          caption: "SVM Margin Visualization",
        },
        {
          src: "/421-xgboost-roc-curve.png",
          caption: "XGBoost ROC Curve",
        },
        {
          src: "/421-eda-correlation-heatmap.png",
          caption: "EDA Correlation Heatmap",
        },
      ]
    },
    {
      name: "Computer Graphics",
      slides: [
        {
          src: "/441-a3-shader.png",
          caption: "Shader Pipeline",
        },
        {
          src: "/441-a4-topdown.png",
          caption: "Top-down Scene View",
        },
        {
          src: "/441-a5-deferredrendering.png",
          caption: "Deferred Rendering",
        },
        {
          src: "/441-a6-raytracing.png",
          caption: "Ray Tracing",
        },
      ]
    },
    {
      name: "Computer Science Research",
      slides: []
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
          src: "/stat404-poly-plot.png",
          caption: "Polynomial Fit Plot",
        },
        {
          src: "/stat404-residuals-vs-fitted.png",
          caption: "Residuals vs Fitted",
        },
        {
          src: "/stat404-theta1-hist.png",
          caption: "Parameter Distribution",
        },
      ]
    },
  ],

  "AI in Business": [
    {
      name: "Machine Learning for Business",
      slides: []
    },
    {
      name: "Business with Generative AI",
      slides: []
    },
    {
      name: "Business Storytelling using AI",
      slides: []
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
};

type Coursework = Record<string, Course[]>;



export default function Coursework() {
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(coursework)[0]
  );
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses = coursework[selectedCategory];
  const slides = selectedCourse?.slides || [];

  return (
    <div className="flex flex-row gap-4">
      <div>
        {Object.keys(coursework).map((category) => (
        <button
        className={[
          "category-item",
          "body-text",
          selectedCategory === category && "active",
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
        ))}
      </div>

      <div>
        <ul>
        {courses.map((course) => (
          <li
              key={`${selectedCategory}-${course.name}`}
              className="body-text"
              onClick={() => {
                setSelectedCourse(course);
              }}
          >
              {course.name}
          </li>
        ))}
        </ul>
      </div>
            
      <div>
        {selectedCourse ? (
          <>
            <h3 className="third-level-headings text-3xl">
              {selectedCourse.name}
            </h3>
            {slides.length > 0 ? (
              <Slideshow slides={slides} />
            ) : (
              <p className="body-text">(Empty.)</p>
            )}
          </>
        ) : (
          <p className="body-text">Please select a course to see details.</p>
        )}
      </div>
    </div>
  )
}
