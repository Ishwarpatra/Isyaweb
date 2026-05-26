import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside boundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 bg-gray-950/40 border border-red-500/10 rounded-2xl relative hud-corners my-8">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-500 rounded-br-lg" />

          <div className="flex flex-col items-center text-center max-w-md">
            <AlertOctagon size={48} className="text-red-500 mb-4 animate-pulse" />
            <h3 className="font-mono text-white text-lg font-bold tracking-wider mb-2">
              SYSTEM_FAULT_DETECTED
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              A runtime anomaly occurred while drawing this component. Stack trace has been logged to the security terminal.
            </p>
            {this.state.error && (
              <pre className="w-full p-3 bg-red-950/20 border border-red-500/15 rounded-lg text-red-400 font-mono text-xs truncate text-left mb-6">
                {this.state.error.name}: {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              REBOOT_COMPONENT
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
