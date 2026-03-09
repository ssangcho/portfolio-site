function TimingNote({ label, ms, desc, sub }) {
  return (
    <div className="tn-row">
      <div className={`tn-tag${sub ? ' tn-tag--sub' : ''}`}>
        <span className="tn-label">{label}</span>
        <span className="tn-divider">|</span>
        <span className="tn-ms">{ms}ms</span>
      </div>
      <p className="tn-desc">{desc}</p>
    </div>
  );
}

export default TimingNote;
