// NetworkStatus.jsx
import React, { useEffect, useState } from "react";

const PROBE_URL = "https://www.gstatic.com/generate_204"; // small 204 response for connectivity check

function checkOnlineByFetch(timeout = 3000) {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const id = setTimeout(() => {
      controller.abort();
      resolve(false);
    }, timeout);

    fetch(PROBE_URL, { method: "GET", mode: "no-cors", signal: controller.signal })
      .then(() => {
        clearTimeout(id);
        resolve(true);
      })
      .catch(() => {
        clearTimeout(id);
        resolve(false);
      });
  });
}

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isReachable, setIsReachable] = useState(true);
  const [checking, setChecking] = useState(false);
  const [inNetShow, setInNetShow] =  useState(false)
  useEffect(() => {
    // initial probe when component mounts (to confirm)
    (async () => {
      setChecking(true);
      const ok = await checkOnlineByFetch();
      setIsReachable(ok);
      if (!ok) setIsOnline(false);
      setChecking(false);
    })();

    function handleOnline() {
      setIsOnline(true);
      // verify real connectivity with fetch
      (async () => {
        setChecking(true);
        const ok = await checkOnlineByFetch();
        setIsReachable(ok);
        setChecking(false);
        setInNetShow(false)
      })();
    }
    function handleOffline() {
      setIsOnline(false);
      setIsReachable(false);
      setInNetShow(true)
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // manual retry triggered by user
  const handleRetry = async () => {
    setChecking(true);
    const ok = await checkOnlineByFetch();
    setIsReachable(ok);
    setIsOnline(ok && navigator.onLine);
    setChecking(false);
  };

  // UI: show nothing when online & reachable
  if (isOnline && isReachable) return null;

  return (
      inNetShow &&   <div style={bannerWrap} >
      <div style={banner}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="18" r="2" fill="#fff" />
          </svg>
          <div>
            <div style={{ fontWeight: 700 }}>
              {isOnline ? "No Internet access" : "You are offline"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>
              {checking ? "Checking connection..." :
                isReachable ? "Connected (navigator reports online)" :
                "No internet — some features may not work"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleRetry} style={retryBtn} disabled={checking}>
            {checking ? "Checking..." : "Retry"}
          </button>
          <button onClick={() => window.location.reload()} style={closeBtn}>
            Reload
          </button>
        </div>
      </div>
      <button onClick={()=> setInNetShow(false)}>Cancel</button>
    </div>
  );
}

/* inline styles (copy to CSS if you prefer) */
const bannerWrap = {
  position: "fixed",
  top: 12,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
  width: "min(980px, calc(100% - 24px))",
};

const banner = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  background: "linear-gradient(90deg,#ff6b6b,#ff4757)",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: 10,
  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
};

const retryBtn = {
  background: "#fff",
  color: "#ff4757",
  border: "none",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
};

const closeBtn = {
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.2)",
  padding: "8px 12px",
  borderRadius: 8,
  cursor: "pointer",
};
