"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listAgents, isLoggedIn, getCompanyName, logout } from "@/lib/api";

const TYPE_LABELS = {
  support_qa: "💬 Support",
  social_marketing: "📣 Marketing",
  social_monitor: "📡 Monitor",
};

const AGENT_TYPES = [
  { type: "support_qa", icon: "💬", label: "Customer Support Agent", desc: "Answer questions from your knowledge base" },
  { type: "social_marketing", icon: "📣", label: "Social Media Marketing", desc: "Generate posts and content for your brand" },
  { type: "social_monitor", icon: "📡", label: "Social Media Monitor", desc: "Scan mentions, classify and auto-reply" },
];

const STATUS_COLORS = {
  ready: "var(--success)",
  building: "var(--warning)",
  crawling: "var(--warning)",
  error: "var(--error)",
};

export default function DashboardPage() {
  const router = useRouter();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }
    setCompanyName(getCompanyName());
    listAgents()
      .then(setAgents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="page">
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-color)",
          background: "var(--bg-secondary)",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "var(--text-primary)", fontWeight: 700, fontSize: "1.1rem" }}>
          Agent²
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            {companyName}
          </span>
          <button className="btn btn-ghost" onClick={handleLogout} style={{ padding: "6px 12px", fontSize: "0.85rem" }}>
            Log out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <h1 style={{ fontSize: "1.75rem" }}>Your Agents</h1>
          <div style={{ position: "relative" }}>
            <button
              className="btn btn-primary"
              onClick={() => setShowTypeMenu((v) => !v)}
            >
              + Create Agent
            </button>
            {showTypeMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 12,
                  padding: 8,
                  zIndex: 100,
                  minWidth: 260,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                {AGENT_TYPES.map((t) => (
                  <Link
                    key={t.type}
                    href={`/build?type=${t.type}`}
                    style={{ textDecoration: "none" }}
                    onClick={() => setShowTypeMenu(false)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-tertiary)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{t.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>{t.label}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && <div className="loading-spinner" />}

        {!loading && agents.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: 48 }}>
            <p style={{ fontSize: "2rem", marginBottom: 12 }}>🤖</p>
            <h3 style={{ marginBottom: 8 }}>No agents yet</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
              Choose an agent type to get started
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {AGENT_TYPES.map((t) => (
                <Link key={t.type} href={`/build?type=${t.type}`} className="btn btn-primary" style={{ fontSize: "0.9rem" }}>
                  {t.icon} {t.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {!loading && agents.length > 0 && (
          <div style={{ display: "grid", gap: 16 }}>
            {agents.map((agent) => (
              <div className="card" key={agent.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <h3 style={{ fontSize: "1.1rem" }}>{agent.name}</h3>
                    <span
                      style={{
                        padding: "2px 8px",
                        background: "rgba(124, 58, 237, 0.15)",
                        borderRadius: 100,
                        fontSize: "0.75rem",
                        color: "var(--accent-primary)",
                      }}
                    >
                      {TYPE_LABELS[agent.agent_type] || agent.agent_type}
                    </span>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: STATUS_COLORS[agent.status] || "var(--text-muted)",
                      }}
                    />
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {agent.url}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={agent.url} className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                    Open
                  </Link>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}${agent.url}`);
                    }}
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
