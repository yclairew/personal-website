import Image from "next/image";
import ".././globals.css"
import Nav from "../../components/nav";
import Cards from '@/components/Cards'

export default function Portfolio() {
  return (
    <div>
      <title>Claire Wu</title>
      <Nav/>
      <h1 className="portfolio-heading heading-text">Portfolio</h1>
      
      <div className="center">
        <Cards/>
      </div>
    </div>
  );
}
