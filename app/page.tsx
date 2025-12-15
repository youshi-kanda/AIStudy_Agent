export const runtime = 'edge';

export default function Page() {
  return (
    <div style={{ color: 'white', padding: 40, background: 'black', minHeight: '100vh' }}>
      <h1>DIAGNOSTIC MODE</h1>
      <p>HOME PAGE IS RENDERING</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  )
}
