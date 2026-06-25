import Image from "next/image";
import ".././globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Coursework from "@/components/Coursework";


export default function Qualifications() {
  return (
    <div className="bg-background">
      <title>Claire Wu</title>
      <Nav/>

      <h1 className="qualifications-text heading-text">Qualifications</h1>

      <div className="inspire-div ml-20 mr-20 pb-15">
        <h2 className="reveal-box areas-subheading subheadings mb-5">Fields That Inspire Me</h2>
        <div className="areas-text-container areas-text">
          <div className="first-interest body-text mb-8">
            <h3 className="text-4xl third-level-headings mb-1">Data Science</h3>
            Data is everywhere, and analyses of it can reveal insights. To explore 
            the field, I collaborated to work with{" "}
            <a href="https://www.signifyhealth.com/" target="_blank" rel="noopener noreferrer">Signify Health</a>{" "}
            to create a system 
            that brings healthcare services to patients' doorsteps. I am grateful to 
            have worked on a project combining two powerful fields (computer science and 
            statistics) to have a direct, positive impact on patients.  
          </div>

          <div className="second-interest body-text mb-8">
            <h3 className="text-4xl third-level-headings mb-1">Artificial intelligence (AI)</h3>
            I like exploring AI, the theory behind machine learning, and the 
            impact AI tools can have on the software industry. To pursue this 
            interest, I am working on an AI-powered multimodial college math 
            tutoring system as part of my research under {" "}
            <a href="https://www.xiameng.org/">Dr. Xia</a> in the 
            Department of Computer Science & Engineering. Also, I recently took 
            CSCE 421 (Machine Learning). 
          </div>

          <div className="third-interest body-text">
            <h3 className="text-4xl third-level-headings mb-1">Business</h3>
            Inspired my dad, I developed an interest in business early on. 
            In high school, I pursued and graduated with an Associate degree 
            in Business through dual credit. Currently, I am earning a minor 
            under Mays Business School in <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">AI in business</a>.
          </div>
        </div>
      </div>

      <h2 className="qualifications-subheadings subheadings ml-8">Coursework</h2>
      <Coursework/>

      <div className="flex bg-accent-light ml-10 mr-10 p-5 rounded-xl border-2 border-accent">
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
