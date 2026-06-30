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
      <h1 className="heading-text text-text mt-5">Portfolio</h1>
      
      <div className="center">
        <Cards/>
      </div>

      <Footer/>
    </div>
  );
}
