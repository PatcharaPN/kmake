"use client";

import { useState } from "react";

const categories = [
  {
    title: "",
    type: "emergency",
    amount: 2000,
    image: "/images/emergency.png",
  },
  {
    title: "",
    type: "saving",
    amount: 289210,
    image: "/images/saving.png",
  },
  {
    title: "",
    type: "food",
    amount: 0,
    image: "/images/food.png",
  },
  {
    title: "",
    type: "travel",
    amount: 0,
    image: "/images/travel.png",
  },
];

const YEAR_365_AMOUNT = 11282;

const totalAmount =
  categories.reduce((sum, c) => sum + c.amount, 0) + YEAR_365_AMOUNT;

const formatBaht = (n: number) =>
  `฿ ${n.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function Icon({ name, size = 25 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 11 9-8 9 8v10h-6v-7H9v7H3z" />
        </svg>
      );

    case "cloud":
      return (
        <svg {...common}>
          <path d="M6 18a5 5 0 0 1 0-10 7 7 0 0 1 13 2 4 4 0 0 1 0 8z" />
        </svg>
      );

    case "bank":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M10 6h3a2 2 0 0 1 0 4h-3m0-4v12m0-5h4a2 2 0 0 1 0 4h-4" />
        </svg>
      );

    case "scan":
      return (
        <svg {...common}>
          <path d="M4 8V4h4m8 0h4v4M4 16v4h4m8 0h4v-4M4 12h16" />
        </svg>
      );

    case "notification":
      return (
        <svg {...common}>
          <path d="M4 5h16v13H9l-5 3z" />
          <path d="M8 10h8m-8 4h5" />
        </svg>
      );

    case "expense":
      return (
        <svg {...common}>
          <path d="M3 20V4M3 20h19M7 16v-5m5 5V7m5 9V3m4 13V9" />
        </svg>
      );

    case "history":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="15" height="19" rx="2" />
          <path d="M9 8h7m-3.5-2v10m-2-2c0 2 4 2 4 0s-4-2-4-4 4-2 4 0" />
        </svg>
      );

    case "more":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="4" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="20" cy="12" r="1.8" />
        </svg>
      );

    default:
      return null;
  }
}

export default function CloudPocketPage() {
  const [activeTab, setActiveTab] = useState("Cloud Pocket");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const tabs = [
    { name: "Home", icon: "home" },
    { name: "Cloud Pocket", icon: "cloud" },
    { name: "Banking", icon: "bank" },
    { name: "Scan", icon: "scan" },
    { name: "Notification", icon: "notification" },
  ];

  return (
    <main className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-brand">
          <h1>Cloud Pocket</h1>

          <button className="add-button" onClick={() => alert("Add Money")}>
            Add Money +
          </button>
        </div>

        <div className="header-actions">
          <button onClick={() => alert("Expense Summary")}>
            <Icon name="expense" size={27} />
            <span>
              Expense
              <br />
              Summary
            </span>
          </button>

          <button onClick={() => alert("History / Statement")}>
            <Icon name="history" size={27} />
            <span>
              History/
              <br />
              Statement
            </span>
          </button>

          <button onClick={() => alert("Other")}>
            <Icon name="more" size={27} />
            <span>Other</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="content">
        {/* CASHBOX (รวมยอดทุกรายการ) */}
        <div className="cashbox">
          <div className="cashbox-logo">
            <span>m</span>
          </div>

          <div className="cashbox-info">
            <p>Cashbox</p>
            <div className="balance-mask">{formatBaht(totalAmount)}</div>
          </div>

          <span className="arrow">›</span>
        </div>

        {/* CATEGORY GRID */}
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.type}
              className="category-card"
              onClick={() => setSelectedCategory(category.title)}
            >
              <div
                className="category-art"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              <div className="category-title">{category.title}</div>

              <div className="category-amount">
                {formatBaht(category.amount)}
              </div>
            </button>
          ))}

          {/* 365 CARD */}
          <button
            className="category-card year-card"
            onClick={() => setSelectedCategory("365")}
          >
            <div
              className="year-art"
              style={{
                backgroundImage: "url(/images/365.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="category-title">365 💰</div>

            <div className="category-amount">{formatBaht(YEAR_365_AMOUNT)}</div>
          </button>
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={activeTab === tab.name ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab(tab.name)}
          >
            <div className="nav-icon">
              <Icon name={tab.icon} size={27} />
            </div>

            <span>{tab.name}</span>
          </button>
        ))}
      </nav>

      {/* CATEGORY MODAL */}
      {selectedCategory && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCategory(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCategory}</h2>
            <p>รายละเอียดหมวดหมู่</p>

            <button onClick={() => setSelectedCategory(null)}>Close</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #ffffff;
          font-family: Arial, "Noto Sans Thai", sans-serif;
          color: #354052;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .app {
          width: 100%;
          max-width: 480px;
          min-height: 100vh;
          margin: 0 auto;
          padding-bottom: 100px;
          background: white;
          overflow: hidden;
        }

        /* HEADER */

        .header {
          min-height: 158px;
          padding: 30px 20px 18px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .header-brand h1 {
          font-size: 27px;
          font-weight: 750;
          letter-spacing: -1px;
          margin: 5px 0 13px;
          white-space: nowrap;
        }

        .add-button {
          background: #52c5c9;
          color: white;
          border: none;
          border-radius: 30px;
          padding: 12px 19px;
          font-size: 15px;
        }

        .header-actions {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-align: center;
        }

        .header-actions button {
          border: none;
          background: transparent;
          color: #354052;
          padding: 0;
          font-size: 12px;
          line-height: 1.4;
          min-width: 46px;
        }

        .header-actions svg {
          display: block;
          margin: 0 auto 5px;
        }

        /* CONTENT */

        .content {
          padding: 20px;
          min-height: calc(100vh - 250px);
          background: radial-gradient(
            ellipse at 50% 40%,
            #c8f1f0 0%,
            #dff8f7 65%,
            #d2f2f1 100%
          );
        }

        /* CASHBOX */

        .cashbox {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 100px;
          padding: 16px;
          background: white;
          border-radius: 27px;
          gap: 14px;
          margin-bottom: 22px;
          text-align: left;
        }

        .cashbox-logo {
          width: 65px;
          height: 65px;
          flex-shrink: 0;
          border: 2px solid #eff0f4;
          border-radius: 22px;
          display: grid;
          place-items: center;
        }

        .cashbox-logo span {
          font-size: 39px;
          font-weight: bold;
          background: linear-gradient(90deg, #079ac9, #35c5a1, #a7ce37);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .cashbox-info {
          flex: 1;
          min-width: 0;
        }

        .cashbox-info p {
          font-size: 17px;
          color: #8791a0;
          margin: 0 0 3px;
        }

        .balance-mask {
          min-height: 23px;
          font-size: 18px;
          font-weight: 700;
          color: #354052;
        }

        .arrow {
          font-size: 33px;
          color: #8793a0;
          margin-right: 2px;
        }

        /* CATEGORY GRID */

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .category-card {
          width: 100%;
          min-width: 0;
          min-height: 215px;
          padding: 0;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 28px;
          overflow: hidden;
          background-color: white;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          text-align: left;
          box-shadow: 0 3px 12px rgba(120, 180, 180, 0.08);
          color: #828c9b;
        }

        .category-art {
          height: 112px;
          background-color: #d7faf1;
          position: relative;
          overflow: hidden;
        }

        /* CARD TEXT */

        .category-title {
          font-size: 16px;
          padding: 9px 12px 0;
          min-height: 47px;
          white-space: normal;
        }

        .category-amount {
          padding: 4px 12px 16px;
          font-size: 18px;
          font-weight: 700;
          color: #000;
          letter-spacing: -0.3px;
        }

        /* 365 */

        .year-card {
          background: #ffffff;
          position: relative;
        }

        .year-art {
          height: 112px;
          background-color: #d8ffd1;
        }

        /* BOTTOM NAVIGATION */

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 480px;
          min-height: 82px;
          padding: 8px 3px max(12px, env(safe-area-inset-bottom));
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 -3px 15px rgba(100, 160, 160, 0.08);
          z-index: 10;
        }

        .nav-item {
          border: none;
          background: transparent;
          color: #8993a1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 12px;
          min-width: 55px;
          padding: 0;
        }

        .nav-icon {
          height: 42px;
          width: 47px;
          display: grid;
          place-items: center;
        }

        .nav-item.active {
          color: #46c7c6;
          font-weight: bold;
        }

        .nav-item.active .nav-icon {
          background: #5bd6bd;
          color: white;
          border-radius: 14px;
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          background: rgba(0, 0, 0, 0.35);
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .modal {
          background: white;
          width: 100%;
          max-width: 350px;
          border-radius: 25px;
          padding: 25px;
          text-align: center;
        }

        .modal button {
          border: none;
          background: #52c5c9;
          color: white;
          border-radius: 20px;
          padding: 10px 25px;
        }

        @media (max-width: 360px) {
          .header {
            padding-left: 12px;
            padding-right: 12px;
          }

          .header-brand h1 {
            font-size: 22px;
          }

          .header-actions {
            gap: 6px;
          }

          .content {
            padding: 12px;
          }

          .category-grid {
            gap: 12px;
          }

          .category-title {
            font-size: 14px;
          }

          .category-amount {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
