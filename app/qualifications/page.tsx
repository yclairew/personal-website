"use client";

import Image from "next/image";
import ".././globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Coursework from "@/components/Coursework";
import Overscroll_color from "@/components/Overscroll_color";


export default function Qualifications() {
  Overscroll_color(); 

  return (
    <div className="bg-background">
      <title>Claire Wu</title>
      <Nav/>

      <h1 className="qualifications-text heading-text mt-5">Qualifications</h1>

      <div className="inspire-div ml-12 mr-20 mb-30">
        <h2 className="reveal-box areas-subheading subheadings mb-7 text-5xl!">Fields That Inspire Me</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="body-text border-l-3 border-accent pl-4">
            <h3 className="text-4xl third-level-headings mb-2">Data Science</h3>
            <p className="text-2xl">
              Data is everywhere, and analyses of it can reveal insights. To explore 
              the field, I collaborated to work with{" "}
              <a href="https://www.signifyhealth.com/" target="_blank" rel="noopener noreferrer">Signify Health</a>{" "}
              to create a system 
              that brings healthcare services to patients' doorsteps. I am grateful to 
              have worked on a project combining two powerful fields (computer science and 
              statistics) to have a direct, positive impact on patients.  
            </p>
          </div>

          <div className="body-text border-l-3 border-accent pl-4">
            <h3 className="text-4xl third-level-headings mb-2">Artificial intelligence (AI)</h3>
            <p className="text-2xl">
              I like exploring AI, the theory behind machine learning, and the 
              impact AI tools can have on the software industry. To pursue this 
              interest, I am working on an AI-powered multimodial college math 
              tutoring system as part of my research under {" "}
              <a href="https://www.xiameng.org/" target="_blank" rel="noopener noreferrer">Dr. Xia</a> in the 
              Department of Computer Science & Engineering. Also, I recently took 
              CSCE 421 (Machine Learning). 
            </p>
          </div>

          <div className="body-text border-l-4 border-accent pl-4">
            <h3 className="text-4xl third-level-headings mb-2">Business</h3>
            <p className="text-2xl">
              Inspired my dad, I developed an interest in business early on. 
              In high school, I pursued and graduated with an Associate degree 
              in Business through dual credit. Currently, I am earning a minor 
              under Mays Business School in  {" "}
              <a href="https://mays.tamu.edu/ai/ai-minor/" target="_blank" rel="noopener noreferrer">AI in business</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-accent-light pt-4 pb-4 mb-10">
        <h2 className="qualifications-subheadings subheadings ml-12 mb-6 text-5xl!">Coursework</h2>
        <Coursework/>
      </div>

      <div className="flex ml-10 mr-10 pl-5 pr-5 pt-10 pb-10 mt-30 mb-35">
        <div className="flex-1 flex-col flex gap-10 justify-center items-center">
          <p className="reveal-box body-text text-text text-center w-lg">Please check out and download my resume here!</p>
          <div className="flex flex-row gap-8">
            <button className="bg-accent p-3 rounded-xl w-fit">
              <a href="Claire Wu Resume.pdf#view=Fit" target="_blank" rel="noopener noreferrer" className="text-white! decoration-white! no-underline!">Open ↗</a>
            </button>
            <button className="border-2 border-accent p-3 rounded-xl w-fit">
              <a href="Claire Wu Resume.pdf" download className="text-accent! no-underline!">
                Download ↓
              </a>
            </button>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <iframe className="rounded-xl border border-gray-200 shadow-sm reveal-box resume h-110 w-auto" src="Claire Wu Resume.pdf#view=Fit" allow="autoplay"></iframe>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}
