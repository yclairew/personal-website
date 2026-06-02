import Image from "next/image";
import ".././globals.css"
import Nav from "../../components/nav";
import Footer from "../../components/footer"


export default function Service() {
  return (
    <div>
      <title>Claire Wu</title>
      <Nav/>
      <h1 className="heading-text" id="service-heading">Service</h1>

      <div className="service-container">
          {/* <div className="slideshow-container">
              <div className="mySlides">
                  <img className="slide-img" src="assets/park-cleanup.jpg">
                  <div className="photo-captions">Austin Park Cleanup</div>
                  
                  <div className="arrows">
                      <a onclick="plusSlides(-1)">&#10229;</a>
                      <div className="numbertext">1 / 4</div>
                      <a onclick="plusSlides(1)">&#10230;</a>
                  </div>
              </div>

              <div className="mySlides">
                  <img className="slide-img" src="assets/flo-bowl.jpg">
                  <div className="photo-captions">FLO Bowl Volunteering</div>
                  
                  <div className="arrows">
                      <a onclick="plusSlides(-1)">&#10229;</a>
                      <div class="numbertext">2 / 4</div>
                      <a onclick="plusSlides(1)">&#10230;</a>
                  </div>
              </div>

              <div class="mySlides">
                  <img class="slide-img" src="assets/freshman-big-event.jpg">
                  <div class="photo-captions">Freshman Year at Big Event with MSC FISH</div>
                  

                  <div class="arrows">
                      <a onclick="plusSlides(-1)">&#10229;</a>
                      <div class="numbertext">3 / 4</div>
                      <a onclick="plusSlides(1)">&#10230;</a>
                  </div>
              </div>

              <div class="mySlides">
                  <img class="slide-img" src="assets/sophomore-big-event.png">
                  <div class="photo-captions">Sophomore Year at Big Event with Aggies Create</div>
                  
                  <div class="arrows" id="arrows">
                      <a onclick="plusSlides(-1)">&#10229;</a>
                      <p class="numbertext">4 / 4</p>
                      <a onclick="plusSlides(1)">&#10230;</a>
                  </div>
              </div>
          </div> */}

          <div className="reveal-box service-text-container">
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

      <div className="reveal-box extra-service-text-container">
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
