import { ReactNotifications } from "react-notifications-component";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";
import 'react-notifications-component/dist/theme.css';
import Footer from "../Footer/Footer";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            
            <header>
                <Header/>
            </header>
            

            <main><Routing /></main>

            <Footer />

			
        </div>
    );
}

export default Layout;
