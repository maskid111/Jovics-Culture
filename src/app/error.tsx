"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container-x py-20 text-center">
      <p className="eyebrow text-accent">A moment to refresh</p>
      <h1 className="title mt-5">Something needs a little care.</h1>
      <p className="copy mt-5">
        We couldn’t load this page. Give it another try.
      </p>
      <button className="btn btn-primary mt-7" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
