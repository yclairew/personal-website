"use client";

import Image from "next/image";
import ".././globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Slideshow from "@/components/Slideshow";
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';


const serviceSlides = [
  { src: "park-cleanup.jpg", caption: "Austin Park Cleanup" },
  { src: "flo-bowl.jpg", caption: "FLO Bowl Volunteering" },
  { src: "freshman-big-event.jpg", caption: "Freshman Year at Big Event with MSC FISH" },
  { src: "sophomore-big-event.png", caption: "Sophomore Year at Big Event with Aggies Create" }
];


export default function Service() {
    const ref1 = useAnimateOnScroll();  
    const ref2 = useAnimateOnScroll();  
  return (
    <div className="bg-background">
      <title>Claire Wu</title>
      <Nav/>
      <h1 className="heading-text text-text" id="service-heading">Service</h1>

      <div className="service-container">
          <Slideshow slides={serviceSlides}/>

          <div ref={ref1} className="animate-target service-text-container pt-10 pb-8 ml-12 mr-12">
              <p className="service-text body-text">
                  I have always been passionate about serving the community. In middle school and high school, I would volunteer 
                  at the thrift store and help make sandwiches for the homeless. This love for service extended into college, and I joined a 
                  Freshman Leadership Organization (FLO) called {" "}
                  <a href="https://fish.tamu.edu/">MSC FISH</a>, 
                  Memorial Student Center Freshmen in Service and Hosting. Through MSC FISH, I participated in various service opportunities, 
                  such as picking up trash at a park and volunteering at the food bank. 
              </p>
          </div>
      </div>

      <div ref={ref2} className="animate-target extra-service-text-container ml-12 mr-12">
          <p className="body-text">
              Since freshman year, I 
              have continued to participate in community service, including Texas A&M's annual service event called {" "}
              <a href="https://bigevent.tamu.edu/">Big Event</a>, which gives students a 
              chance to serve residents of the Bryan-College Station area. 
              
              
              Giving back to the community is very 
              important to me, and I would love to be part of a corporate culture that is committed to that cause.
          </p>
      </div>

      <Footer/>
    </div>
  );
}
