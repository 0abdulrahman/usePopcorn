function LoadingSpinner({ autoHeight }) {
  return (
    <div className={`spinner ${autoHeight ? "spinner-auto-height" : null}`}>
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
