function Testimonial() {
  return (
    <>
      {/* Testimonial Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">Our Clients Say!</h1>
            <div>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </div>
          </div>
          <div
            className="owl-carousel testimonial-carousel wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="testimonial-item bg-light rounded p-5">
              <div className="fs-5">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd erat eos
              </div>
              <div
                className="d-flex align-items-center bg-white me-n5"
                style={{ borderRadius: "50px 0 0 50px" }}
              >
                <img
                  width={400}
                  height={400}
                  className="img-fluid flex-shrink-0 rounded-circle"
                  src="/img/testimonial-1.jpg"
                  style={{ width: "90px", height: "90px" }}
                  alt="img"
                />
                <div className="ps-3">
                  <h3 className="mb-1">Client Name</h3>
                  <span>Profession</span>
                </div>
                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
              </div>
            </div>
            <div className="testimonial-item bg-light rounded p-5">
              <div className="fs-5">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd erat eos
              </div>
              <div
                className="d-flex align-items-center bg-white me-n5"
                style={{ borderRadius: "50px 0 0 50px" }}
              >
                <img
                  width={400}
                  height={400}
                  className="img-fluid flex-shrink-0 rounded-circle"
                  src="/img/testimonial-2.jpg"
                  style={{ width: "90px", height: "90px" }}
                  alt="img"
                />
                <div className="ps-3">
                  <h3 className="mb-1">Client Name</h3>
                  <span>Profession</span>
                </div>
                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
              </div>
            </div>
            <div className="testimonial-item bg-light rounded p-5">
              <div className="fs-5">
                Tempor stet labore dolor clita stet diam amet ipsum dolor duo
                ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet
                est kasd kasd erat eos
              </div>
              <div
                className="d-flex align-items-center bg-white me-n5"
                style={{ borderRadius: "50px 0 0 50px" }}
              >
                <img
                  width={400}
                  height={400}
                  className="img-fluid flex-shrink-0 rounded-circle"
                  src="/img/testimonial-3.jpg"
                  style={{ width: "90px", height: "90px" }}
                  alt="img"
                />
                <div className="ps-3">
                  <h3 className="mb-1">Client Name</h3>
                  <span>Profession</span>
                </div>
                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End  */}
    </>
  );
}

export default Testimonial;
