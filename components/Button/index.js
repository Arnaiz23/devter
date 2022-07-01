export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background-color: #000;
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 800;
          gap: 10px;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
          user-select: none;
        }

        button[disabled] {
          opacity: 0.2;
          pointer-events: none;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
