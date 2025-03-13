
import FeatureMovies from "../../components/FeatureMovies";
import MediaList from "../../components/MediaList/MediaList";
import { TRENDING_TABS } from "../../libs/constant";

function HomePage() {


  return (
    <div>
      
      <FeatureMovies />
      <MediaList TABS={TRENDING_TABS} Title="TOP Trending" />
    </div>
  );
}

export default HomePage;
