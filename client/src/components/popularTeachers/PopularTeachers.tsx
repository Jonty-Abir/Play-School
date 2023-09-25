import swr from "swr";
import { getAllPopularTeacher } from "../../helper/helper";
function PopularTeachers() {
  const {
    data: popularTeachers,
    error,
    isLoading,
  } = swr(["get_all_popularTeacher"], getAllPopularTeacher, {
    revalidateOnReconnect: true,
    suspense: true,
  });
  if (error && !isLoading) {
    return (
      <h2 className=" text-danger d-flex justify-content-center align-content-center">
        Something went wrong..!
      </h2>
    );
  }

  return (
    <>
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">Popular Teachers</h1>
            <div>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </div>
          </div>
          <div className="row g-4">
            {popularTeachers &&
              popularTeachers?.map((item) => (
                <div
                  key={item?._id}
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="team-item position-relative">
                    <img
                      width={400}
                      height={400}
                      className="img-fluid rounded-circle w-75"
                      src={item?.avatar}
                      alt="img"
                    />
                    <div className="team-text">
                      <h3>{item?.fullName}</h3>
                      <div>{item?.designation}</div>
                      <div className="d-flex align-items-center">
                        <a className="btn btn-square btn-primary mx-1" href="">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a className="btn btn-square btn-primary  mx-1" href="">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a className="btn btn-square btn-primary  mx-1" href="">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item position-relative">
                <img
                  width={400}
                  height={400}
                  className="img-fluid rounded-circle w-75"
                  src="/img/team-2.jpg"
                  alt="img"
                />
                <div className="team-text">
                  <h3>Full Name</h3>
                  <div>Designation</div>
                  <div className="d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href="">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a className="btn btn-square btn-primary  mx-1" href="">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a className="btn btn-square btn-primary  mx-1" href="">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
}

export default PopularTeachers;
