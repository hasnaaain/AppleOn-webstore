import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import NewArrivalsTabs from '../components/home/NewArrivalsTabs';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PromoBanners from '../components/home/PromoBanners';
import BestSellers from '../components/home/BestSellers';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      <NewArrivalsTabs />
      <WhyChooseUs />
      <PromoBanners />
      <BestSellers />
    </>
  );
}
