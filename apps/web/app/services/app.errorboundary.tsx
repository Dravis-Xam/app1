"use client";

import * as React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { fallback?: React.ReactNode; children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { fallback?: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 text-red-600">
            <h2 className="font-bold">Something went wrong.</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
