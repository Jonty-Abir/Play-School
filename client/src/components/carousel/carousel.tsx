/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import useSWR from "swr";
import uniqid from "uniqid";
import { getAllCarousel } from "../../helper/helper";
import { ICarousel } from "../../interface/interface";

function CarouselCompo() {
  const {
    data: carousel,
    error,
    isLoading,
  } = useSWR(["get_all_carousel"], getAllCarousel, {
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
  // const carousel: ICarousel[] = data;
  return (
    <>
      {/* Carousel Start */}
      <div className="container-fluid p-0 mb-5">
        <div className="header-carousel position-relative">
          <Carousel
            showArrows={false}
            autoPlay={true}
            showThumbs={false}
            infiniteLoop={true}
            interval={2000}
            showStatus={false}
            swipeable={true}
            emulateTouch={true}
          >
            {carousel &&
              //@ts-ignore
              carousel?.length > 0 &&
              //@ts-ignore
              carousel?.map((item: ICarousel) => (
                <div
                  key={uniqid()}
                  className="owl-carousel-item position-relative"
                >
                  <img
                    className="img-fluidc w-100 h-auto"
                    src={item.image}
                    alt="img"
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                    style={{ background: "rgba(0, 0, 0, .2)" }}
                  >
                    <div className="container">
                      <div className="row justify-content-start">
                        <div className="col-10 col-lg-8">
                          <h1 className="display-2 text-white animated slideInDown mb-4">
                            {item.title}
                          </h1>
                          <div className="fs-5 fw-medium text-white mb-4 pb-2">
                            {item.subTitle}
                          </div>
                          <a
                            href=""
                            className="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft"
                          >
                            Learn More
                          </a>
                          <a
                            href=""
                            className="btn btn-dark rounded-pill py-sm-3 px-sm-5 animated slideInRight"
                          >
                            Our classNamees
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
      {/* Carousel End */}
    </>
  );
}

export default CarouselCompo;
