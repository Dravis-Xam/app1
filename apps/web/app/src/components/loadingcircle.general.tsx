export default function LoadingCircle() {
    return <div className="loading-spinner text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
}