// src/components/ProfessorCardSkeleton.tsx
export default function ProfessorCardSkeleton() {
  return (
    <div className="message" aria-busy="true" aria-live="polite">
      <div className="message-avatar">⏳</div>
      <div className="message-content">
        <div className="message-author">Lade Professor …</div>
        <div className="message-text">Bitte warten …</div>
      </div>
    </div>
  );
}
