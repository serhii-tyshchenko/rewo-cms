export default function SuspenseFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        gap: 12,
        padding: 16,
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 50 50"
        aria-hidden="true"
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
      <span>Loading…</span>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
