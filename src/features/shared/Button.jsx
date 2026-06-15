export default function Button({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={active ? "btn active" : "btn"}
    >
      {children}
    </button>
  );
}
