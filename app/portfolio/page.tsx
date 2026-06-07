import Image from "next/image";
import ".././globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cards from "@/components/Cards";

export default function Portfolio() {
  return (
    <div className="bg-background">
      <title>Claire Wu</title>
      <Nav/>
      <h1 className="portfolio-heading heading-text text-text">Portfolio</h1>
      
      <div className="center">
        <Cards/>
      </div>

      <Footer/>
    </div>
  );
}
