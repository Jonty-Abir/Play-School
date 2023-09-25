import swr from "swr";
import { getAllFacilities } from "../../helper/helper";

function Facilities() {
  const {
    data: facilities,
    error,
    isLoading,
  } = swr(["get_all_facilities"], getAllFacilities, {
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
      {/* Facilities Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <h1 className="mb-3">School Facilities</h1>
            <div>
              Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut
              dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed
              rebum vero dolor duo.
            </div>
          </div>
          <div className="row g-4">
            {facilities &&
              facilities.map((item,i) => (
                <div
                  key={item?._id}
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="facility-item">
                    <div className= {`facility-icon ${coloArray[i]}`}>
                      <span className="bg-primary"></span>
                      <img
                        className="img-fluid rounded-lg"
                        src={item.image}
                        alt="poster"
                      />
                      <span className="bg-primary"></span>
                    </div>
                    <div className={`facility-text ${coloArray[i]}`}>
                      <h3 className="text-primary mb-3">{item?.title}</h3>
                      <div className="mb-0">{item?.subTitle}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Facilities End */}
    </>
  );
}

export default Facilities;

const coloArray = ["bg-success", "bg-info", "bg-warning", "bg-primary"];
