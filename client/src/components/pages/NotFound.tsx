import Layout from "../layout/layout";
import PageHadler from "../shared/PageHadler";

function NotFound() {
  return (
    <>
      <Layout isSpinner={false}>
        {/* Page Header End  */}
        <PageHadler pageName="404 Error" rootName="Home" subRoot="Pages" />
        {/* Page Header End */}

        {/* 404 Start */}
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                <h1 className="display-1">404</h1>
                <h1 className="mb-4">Page Not Found</h1>
                <div className="mb-4">
                  We{"’"}re sorry, the page you have looked for does not exist
                  in our website! Maybe go to our home page or try to use a
                  search?
                </div>
                <a className="btn btn-primary rounded-pill py-3 px-5" href="">
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 404 End */}
      </Layout>
    </>
  );
}

export default NotFound;
