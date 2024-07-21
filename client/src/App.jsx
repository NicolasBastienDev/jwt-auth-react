import { Suspense } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  const user = useLoaderData();
  console.log(user);
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <AuthProvider>
        <Header />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}
export default App;
