import HomePageDesktop from "@/components/HomepageDesktop";
import HomePageMobile from "@/components/HomePageMobile";

const page = () => {
  return (
    <>
      <div className="hidden md:block">
        <HomePageDesktop />
      </div>
      <div className="block md:hidden">
        <HomePageMobile />
      </div>
    </>
  );
};

export default page;
