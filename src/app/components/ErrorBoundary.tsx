import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center min-h-[50vh] flex flex-col items-center justify-center bg-[#0B0F19]">
          <h1 className="text-white text-2xl font-semibold mb-4">// CRITICAL_SYSTEM_FAULT //</h1>
          <p className="text-pink-500 font-mono mb-6">{this.state.error?.message || 'Unknown sector error'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-pink-500/30 bg-pink-950/20 text-pink-400 rounded-md hover:bg-pink-500/20 font-mono transition-colors"
          >
            RESTABLISH_DATALINK
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
