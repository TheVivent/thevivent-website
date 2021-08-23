import { useState } from 'react';

export default function WIP() {
  const [wip, setWIP] = useState<boolean>(
    // true
    process.env.NODE_ENV === 'production' ? true : false
  );

  if (!wip) return null;

  return (
    <div
      style={{ zIndex: 1000 }}
      className="position-absolute vh-100 vw-100 bg-black bg-opacity-75 d-flex align-items-center text-center"
      onClick={() => setWIP(false)}
    >
      <div className="w-100 text-center">
        <h1>WORK</h1>
        <h1>IN</h1>
        <h1>PROGRESS</h1>
      </div>
    </div>
  );
}
