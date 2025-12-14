// export const runtime = 'edge';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-10">
      <h1 className="text-6xl font-bold text-red-500">
        HELLO WORLD - DEBUGGING
      </h1>
      <p className="mt-4 text-xl">
        If you see this, the deployment pipeline is working.
      </p>
    </div>
  );
}
