import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Appointment from "./components/appointment/Appointment";
import Carousel from "./components/carousel/carousel";
import Facilities from "./components/facilities/Facilities";
import CallToAction from "./components/getStarted/GetStarted";
import Layout from "./components/layout/layout";
import Login from "./components/login/Login";
import AboutCmpo from "./components/pages/AboutCmpo";
import ClassesName from "./components/pages/Classes";
import ContactUs from "./components/pages/ContactUs";
import NotFound from "./components/pages/NotFound";
import GustRoute from "./components/routes/GustRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import PageHadler from "./components/shared/PageHadler";
import SignUp from "./components/signUp/SignUp";
import PopularTeachers from "./components/popularTeachers/PopularTeachers";
import Testimonial from "./components/testimonial/Testimonial";
import useAuth from "./hooks/useAuth";

function App() {
  const { loading } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout>
            <Carousel />
            <Facilities />
            <AboutCmpo />
            <CallToAction />
            <ClassesName />
            <Appointment />
            <PopularTeachers />
            <Testimonial />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/about",
      element: (
        <PrivateRoute>
          <Layout>
            <PageHadler pageName="About Us" rootName="Home" subRoot="Pages" />
            <AboutCmpo />
            <CallToAction />
            <PopularTeachers />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/classes",
      element: (
        <PrivateRoute>
          <Layout>
            <PageHadler pageName="Classes" rootName="Home" subRoot="Pages" />
            <ClassesName />
            <Appointment />
            <Testimonial />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <PrivateRoute>
          <Layout>
            <PageHadler pageName="Contact-Us" rootName="Home" subRoot="Pages" />
            <ContactUs />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <GustRoute>
          <Layout>
            <Login />
          </Layout>
        </GustRoute>
      ),
    },
    {
      path: "/signUp",
      element: (
        <GustRoute>
          <Layout>
            <SignUp />
          </Layout>
        </GustRoute>
      ),
    },
    // {
    //   path: "/admin",
    //   element: <h2>admin hello</h2>,
    // },
    // {
    //   path: "/admin/dashboard",

    //   children: [
    //     {
    //       index: true,
    //       element: <h2>Hello Chilodern!</h2>,
    //     },
    //   ],
    // },
    //
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  if (loading) {
    return (
      <h2 className="text-center text-success fw-bolder text-xl">Loading...</h2>
    );
  }
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
