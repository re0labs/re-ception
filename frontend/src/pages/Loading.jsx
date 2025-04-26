import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="loading-icon">
        <i className="fa-solid fa-spinner fa-spin"></i> {/* Animated spinner */}
      </div>
      <p>Analyzing...</p>
    </div>
  );
};

export default Loading;
