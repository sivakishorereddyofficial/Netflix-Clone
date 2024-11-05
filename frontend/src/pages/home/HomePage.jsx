import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
	const { user } = useAuthStore();

	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;


// Vyshnavi
const HomePage = () => {
	return <div className='hero-bg h-screen w-full'>HomePage</div>;
  }
  export default HomePage;