import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <div>Something went wrong.</div>;
    }

    // Render children if no error occurred
    return this.props.children;
  }
}

// Wrap your root component with the error boundary
const AppWithBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

ReactDOM.render(<AppWithBoundary />, document.getElementById("root"));
