function AboutCmpo() {
  return (
    <>
      {/* About Start */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <h1 className="mb-4">
                Learn More About Our Work And Our Cultural Activities
              </h1>
              <div>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </div>
              <div className="mb-4">
                Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No
                stet est diam rebum amet diam ipsum. Clita clita labore, dolor
                duo nonumy clita sit at, sed sit sanctus dolor eos, ipsum labore
                duo duo sit no sea diam. Et dolor et kasd ea. Eirmod diam at
                dolor est vero nonumy magna.
              </div>
              <div className="row g-4 align-items-center">
                <div className="col-sm-6">
                  <a className="btn btn-primary rounded-pill py-3 px-5" href="">
                    Read More
                  </a>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <img
                      width={400}
                      height={400}
                      className="rounded-circle flex-shrink-0"
                      src="/img/user.jpg"
                      alt="img"
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div className="ms-3">
                      <h6 className="text-primary mb-1">Jhon Doe</h6>
                      <small>CEO & Founder</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 about-img wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="row">
                <div className="col-12 text-center">
                  <img
                    width={400}
                    height={400}
                    className="img-fluid w-75 rounded-circle bg-light p-3"
                    src="/img/about-1.jpg"
                    alt="img"
                  />
                </div>
                <div
                  className="col-6 text-start"
                  style={{ marginTop: "-150px" }}
                >
                  <img
                    width={400}
                    height={400}
                    className="img-fluid w-100 rounded-circle bg-light p-3"
                    src="/img/about-2.jpg"
                    alt="img"
                  />
                </div>
                <div className="col-6 text-end" style={{ marginTop: "-150px" }}>
                  <img
                    width={400}
                    height={400}
                    className="img-fluid w-100 rounded-circle bg-light p-3"
                    src="/img/about-3.jpg"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
}

export default AboutCmpo;
