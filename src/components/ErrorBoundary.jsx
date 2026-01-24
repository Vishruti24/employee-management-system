import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-500 mt-2">Please refresh the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
