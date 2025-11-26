import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { BillEntry, User } from "@/context/UserDataContext";

export async function shareBill(foundUser: User, item: BillEntry) {
  const safe = (v: any, fallback = "N/A") =>
    v === undefined || v === null || v === "" ? fallback : v;

  const userName = safe(foundUser?.name, "Name not available");
  const officeNo = safe(foundUser?.officeNo, "Office number not available");

  let finalPaymentMethod = "";

  switch (Number(item.paymentMethod)) {
    case 0:
      finalPaymentMethod = "None";
      break;
    case 1:
      finalPaymentMethod = "Cash";
      break;
    case 2:
      finalPaymentMethod = "Online";
      break;
    default:
      finalPaymentMethod = "N/A";
  }

  const html = `
<html>
  <head>
    <meta charset="UTF-8" />

    <style>
      @page {
        size: A4 portrait;
        margin: 0;
      }

      html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        background: #eef1f6;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .card {
        background: #ffffff;
        width: 560px;
        border-radius: 22px;
        padding: 16px; /* ✅ reduced from 24 */
        border-top: 2px solid #e5e7eb;
        border-bottom: 2px solid #e5e7eb;
        page-break-inside: avoid;
      }

      .title {
        font-size: 54px;
        font-weight: 700;
        margin-bottom: 4px; /* ✅ reduced */
        color: #111827;
      }

      .office {
        font-size: 42px;
        color: #0f84fa;
        margin-bottom: 2px; /* ✅ reduced */
      }

      .name {
        font-size: 42px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 20px; /* ✅ reduced */
      }

      .total {
        font-size: 68px;
        font-weight: 700;
        margin: 8px 0 20px; /* ✅ reduced */
        color: ${Number(item.paymentMethod) === 0 ? "#ef4444" : "#10b981"};
      }

      .section-label {
        font-size: 32px;
        color: #6b7280;
        margin-bottom: 8px; /* ✅ reduced */
        text-transform: uppercase;
      }

      .divider {
        height: 1px;
        background: #d1d5db;
        margin-bottom: 8px; /* ✅ reduced */
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px; /* ✅ reduced from 14 */
      }

      .row + .divider-row {
        height: 1px;
        background: #d1d5db;
        margin-bottom: 10px; /* ✅ reduced */
      }

      .label {
        font-size: 36px;
        color: #9ca3af;
      }

      .label.strong {
        font-weight: 600;
        color: #111827;
      }

      .value {
        font-size: 36px;
        color: #111827;
      }

      .value.strong {
        font-weight: 600;
      }

      .status-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px; /* ✅ reduced */
      }

      .status {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 170px;
        height: 60px;
        font-size: 46px;
        font-weight: 700;
        border-radius: 999px;
        color: #ffffff;
        background: ${Number(item.paymentMethod) === 0 ? "#ef4444" : "#10b981"};
      }
    </style>
  </head>

  <body>
    <div class="card">

      <div class="title">${safe(item.month)} Bill</div>
      <div class="office">Office No: ${officeNo}</div>
      <div class="name">Name: ${userName}</div>

      <div class="total">₹${safe(item.total)}</div>

      <div class="section-label">DETAILS</div>

      <div class="divider"></div>

      <div class="row">
        <span class="label">Invoice Date</span>
        <span class="value">${new Date(item.date).toLocaleDateString(
          "en-GB"
        )}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label strong">Rent</span>
        <span class="value strong">₹${safe(item.rent)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label strong">Fix</span>
        <span class="value strong">₹${safe(item.fix)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label">Previous Unit</span>
        <span class="value">${safe(item.prevUnit)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label">Current Unit</span>
        <span class="value">${safe(item.currUnit)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label strong">Units Used</span>
        <span class="value strong">${safe(item.reading)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label">Rate per Unit</span>
        <span class="value">₹${safe(item.unitCost)}</span>
      </div>
      <div class="divider-row"></div>

      <div class="row">
        <span class="label strong">Energy Charges</span>
        <span class="value strong">₹${safe(item.readingCost)}</span>
      </div>
      <div class="divider-row"></div>

      ${
        item.prevDue
          ? `
            <div class="row">
              <span class="label strong">Previous Due</span>
              <span class="value strong">₹${safe(item.prevDue)}</span>
            </div>
            <div class="divider-row"></div>
          `
          : ""
      }

      <div class="row">
        <span class="label">Payment Method</span>
        <span class="value">${finalPaymentMethod}</span>
      </div>

      <div class="status-wrapper">
        <div class="status">
          ${Number(item.paymentMethod) === 0 ? "UNPAID" : "PAID"}
        </div>
      </div>

    </div>
  </body>
</html>
`;

  // Generate PDF
  const { uri } = await Print.printToFileAsync({ html });

  // Share PDF
  await Sharing.shareAsync(uri);
}
