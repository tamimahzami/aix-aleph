// src/components/Modal.jsx
import React from 'react';

export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e)=>e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button style={styles.close} onClick={onClose} aria-label="Schließen">✕</button>
        </div>
        <div style={styles.body}>{children}</div>
        {footer && <div style={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position:'fixed', inset:0, background:'rgba(0,0,0,0.3)',
    display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', zIndex: 2000
  },
  modal: {
    width:'100%', maxWidth:600, background:'#fff', borderRadius:8, boxShadow:'0 10px 25px rgba(0,0,0,0.15)',
    display:'flex', flexDirection:'column'
  },
  header: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.25rem', borderBottom:'1px solid #e5e7eb'},
  title: { margin:0, fontSize:'1.1rem' },
  close: { border:'none', background:'transparent', fontSize:'1.25rem', cursor:'pointer' },
  body: { padding:'1rem 1.25rem' },
  footer: { padding:'0.75rem 1.25rem', borderTop:'1px solid #e5e7eb', display:'flex', gap:'0.5rem', justifyContent:'flex-end' }
};
