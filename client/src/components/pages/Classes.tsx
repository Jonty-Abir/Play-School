import swr from "swr";
import { getAllClasses } from "../../helper/helper";

function Classes() {
  const {
    data: classes,
    error,
    isLoading,
  } = swr(["get_all_classes"], getAllClasses, {
    revalidateOnReconnect: true,
    suspense: true,
  });

  if (isLoading) {
    return (
      <h2 className=" text-success d-flex justify-content-center align-content-center">
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className=" text-danger d-flex justify-content-center align-content-center">
        Something went wrong..!
      </h2>
    );
  }

  return (
    <>
      {" "}
      {/* classNamees Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">School Classes</h1>
            <div>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </div>
          </div>
          <div className="row g-4">
            {classes &&
              classes?.map((item) => (
                <div
                  key={item?._id}
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="classNamees-item">
                    <div className="bg-light rounded-circle w-75 mx-auto p-3">
                      <img
                        width={400}
                        height={400}
                        className="img-fluid rounded-circle"
                        src={item?.poster}
                        alt="img"
                      />
                    </div>
                    <div className="bg-light rounded p-4 pt-5 mt-n5">
                      <a className="d-block text-center h3 mt-3 mb-4" href="">
                        {item?.tropicName}
                      </a>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center">
                          <img
                            width={400}
                            height={400}
                            className="rounded-circle flex-shrink-0"
                            src={item?.teacher?.avatar}
                            alt="img"
                            style={{ width: "45px", height: "45px" }}
                          />
                          <div className="ms-3">
                            <h6 className="text-primary mb-1">
                              {item?.teacher?.name}
                            </h6>
                            <small>{item?.teacher?.role}</small>
                          </div>
                        </div>
                        <span className="bg-primary text-white rounded-pill py-2 px-3">
                          ${item?.teacher?.fees}
                        </span>
                      </div>
                      <div className="row g-1">
                        <div className="col-4">
                          <div className="border-top border-3 border-primary pt-2">
                            <h6 className="text-primary mb-1">Age:</h6>
                            <small>{item?.age} Years</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="border-top border-3 border-success pt-2">
                            <h6 className="text-success mb-1">Time:</h6>
                            <small>{item?.classTime} AM</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="border-top border-3 border-warning pt-2">
                            <h6 className="text-warning mb-1">Capacity:</h6>
                            <small>{item?.capacity} Kids</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* classNamees End */}
    </>
  );
}

export default Classes;
