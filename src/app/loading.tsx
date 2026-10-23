export default function Loading() {
  return (
    <div className="container-x py-20" role="status">
      <p className="eyebrow text-accent">A little care is on its way</p>
      <div className="mt-6 h-12 max-w-xl rounded-xl bg-sand" />
      <div className="mt-4 h-5 max-w-sm rounded-lg bg-sand" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
