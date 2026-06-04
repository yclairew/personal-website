import Image from "next/image";
import ".././globals.css"
import Nav from "../../components/nav";
import Footer from "../../components/footer"


export default function Qualifications() {
  return (
    <div className="bg-background">
      <title>Claire Wu</title>
      <Nav/>

      <h1 className="qualifications-text heading-text">Qualifications</h1>

      <h2 className="reveal-box areas-subheading subheadings">Fields That Inspire Me</h2>
      <div className="areas-text-container areas-text">
        <h3 className="text-4xl third-level-headings">Data Science</h3>
        <div className="first-interest body-text">
          Data is everywhere, and analyses of it can reveal insights. To explore 
          the field, I collaborated to work with Signify Health to create a system 
          that brings healthcare services to patients' doorsteps. I am grateful to 
          work on a project combining two powerful fields (computer science and 
          statistics) to have a direct, positive impact on patients.  
        </div>

        
        <h3 className="text-4xl third-level-headings">Artificial intelligence (AI)</h3>
        <div className="second-interest body-text">
          I like exploring AI, the theory behind machine learning, and the 
          impact AI tools can have on the software industry. To pursue this 
          interest, I am working on an AI-powered multimodial college math 
          tutoring system as part of my research under {" "}
          <a href="https://www.xiameng.org/">Dr. Xia</a> in the 
          Department of Computer Science & Engineering.
        </div>


        <h3 className="text-4xl third-level-headings">Business</h3>
        <div className="third-interest body-text">
          Inspired my dad, I developed an interest in business early on. 
          In high school, I pursued and graduated with an Associate degree 
          in Business through dual credit. Currently, I am earning a minor 
          under Mays Business School in AI in Business.
        </div>
      </div>

      <h2 className="qualifications-subheadings subheadings">Coursework</h2>

      <div>
        <ul>
          <li className="body-text">Machine Learning</li>
          {/* <!-- assets/421-3d-svm-scatterplot-with-margin.png -->
          <!-- assets/421-xgboost-roc-curve.png -->
          <!-- assets/421-eda-correlation-heatmap.png --> */}

          <li className="body-text">Computer Graphics</li>
          {/* <!-- assets/441-a3-shader.png -->
          <!-- assets/441-a4-topdown.png -->
          <!-- assets/441-a5-deferredrendering.png -->
          <!-- assets/441-a6-raytracing.png --> */}

          <li className="body-text">Computer Science Research</li>
          <li className="body-text">Software Engineering</li>
          {/* <!-- assets/331-proj2-order.png -->
          <!-- assets/331-proj2-add-item.png -->
          <!-- assets/331-proj2-add-associated-ingredients.png --> */}

          <li className="body-text">Data Structures & Algorithms</li>
          <li className="body-text">Statistical Computing</li>
          {/* <!-- assets/stat404-poly-plot.png -->
          <!-- assets/stat404-residuals-vs-fitted.png -->
          <!-- assets/stat404-theta1-hist.png --> */}
          
          <li className="body-text">Algorithm Design</li>
          <li className="body-text">Statistics I & II</li>
          <li className="body-text">Machine Learning for Business</li>
          <li className="body-text">Linear Algebra</li>
          <li className="body-text">Business with Generative AI</li>
          <li className="body-text">Business Storytelling using AI</li>
          <li className="body-text">Computer Systems</li>
          <li className="body-text">Computer Organization</li>
          <li className="body-text">Discrete Structures</li>
          <li className="body-text">Program Design</li>
        </ul>
      </div>


      <div className="flex bg-accent-light ml-10 mr-10 p-5">
        <div className="flex-1">
          <p className="reveal-box body-text text-text">Check out my resume!</p>
          <button className="bg-background p-3 rounded-xl">
            <a href="Claire Wu Resume.pdf#view=Fit" target="_blank" rel="noopener noreferrer">Open ↗</a>
          </button>
        </div>
        <div className="flex flex-1 justify-end">
          <iframe className="reveal-box resume h-100 w-auto" src="Claire Wu Resume.pdf#view=Fit" allow="autoplay"></iframe>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}
