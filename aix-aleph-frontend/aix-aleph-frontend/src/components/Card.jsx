export default function Card({ title, actions, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-semibold">{title}</h3>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

