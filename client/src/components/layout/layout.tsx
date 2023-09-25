import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "../../App.css";
import Fallback from "../ErrorBoundary/Fallback";
import Footer from "../common/footer";
import NavBar from "../common/navbar";
import Spinners from "../shared/spinners";

function Layout({
  children,
  isSpinner,
}: {
  children: React.ReactNode;
  isSpinner?: boolean;
}) {
  return (
    <>
      {/* Template Javascript */}
      <main>
        <div className="container-xxl bg-white p-0">
          {isSpinner && <Spinners />}
          <NavBar />
          <ErrorBoundary fallback={<Fallback />}>
            <Suspense fallback={<h2 className="loading">loading...</h2>}>
              {children}
            </Suspense>
          </ErrorBoundary>
          <Footer />
          {/* Back to Top */}
          <a
            href="#"
            className="btn btn-lg btn-primary btn-lg-square back-to-top"
          >
            <i className="bi bi-arrow-up"></i>
          </a>
        </div>
      </main>
    </>
  );
}

export default Layout;
