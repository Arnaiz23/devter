export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
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
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
