import { Component } from 'react';

import './error-boundary.scss';

const NAME_SPACE = 'error-boundary';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  override render() {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    if (!errorInfo) {
      return children;
    }

    return (
      <div className={NAME_SPACE}>
        <h2 className={`${NAME_SPACE}__title`}>
          Sorry. Something went wrong 😞
        </h2>
        <div className={`${NAME_SPACE}__details`}>
          <p>
            {error && <strong>{error.toString()}</strong>}
            <br />
            {errorInfo.componentStack}
          </p>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
