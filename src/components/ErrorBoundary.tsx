import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    console.error('Error caught by boundary:', error);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-8">
            <AlertTriangle size={48} className="text-red-600" />
          </div>

          <h1 className="text-3xl font-display font-bold text-slate-900 mb-3">
            Oups ! Une erreur est survenue
          </h1>

          <p className="text-slate-600 text-center mb-6 max-w-md">
            L'application a rencontré un problème inattendu. Veuillez essayer à nouveau.
          </p>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="w-full max-w-2xl bg-slate-100 rounded-2xl p-4 mb-8 border border-slate-200">
              <p className="font-mono text-sm text-slate-700 whitespace-pre-wrap break-words">
                {this.state.error.toString()}
              </p>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-colors shadow-md"
          >
            <RefreshCw size={18} />
            <span>Réessayer</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
