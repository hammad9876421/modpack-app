export default function AppButton({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`app-button ${className}`}
    >
      {children}
    </button>
  );
}
