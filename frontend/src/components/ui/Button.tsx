export default function Button({children, onClick}:{children: React.ReactNode, onClick: () => void}) {
  return (
    <button className="bg-primary text-white select-none cursor-pointer px-8 py-2 rounded hover:opacity-95 transition" onClick={onClick}>
      {children}
    </button>
  )
}
