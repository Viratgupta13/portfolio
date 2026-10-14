export default function Words({ text }) {
  return text.split(' ').map((w, i, a) => (
    <span key={i}>
      <span className="word"><span>{w}</span></span>{i < a.length - 1 ? ' ' : ''}
    </span>
  ));
}
