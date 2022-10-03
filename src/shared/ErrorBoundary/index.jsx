import PropTypes from 'prop-types';

ErrorFallback.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};


export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button type="button" className="border-2 border-solid p-2 hover:bg-slate-300 active:bg-slate-500" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

/*
 * E.g. 

function Bomb() {
  throw new Error('💥 CABOOM 💥')
}

function App() {
  const [explode, setExplode] = React.useState(false)
    return (
      <div>
        <button onClick={() => setExplode(e => !e)}>toggle explode</button>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setExplode(false)}
          resetKeys={[explode]}
        >
          {explode ? <Bomb /> : null}
        </ErrorBoundary>
      </div>
    )
}

*/