function Fallback() {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div>
        {/* Your content goes here */}
        <h1 className=" text-danger">Error was Occure.</h1>
        <p className=" text-warning">Something went wrong try again...!.</p>
      </div>
    </div>
  );
}

export default Fallback;
