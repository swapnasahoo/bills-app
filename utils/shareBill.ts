import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { BillEntry, User } from "@/context/UserDataContext";

export async function shareBill(foundUser: User, item: BillEntry) {
  const safe = (v: any, fallback = "N/A") =>
    v === undefined || v === null || v === "" ? fallback : v;

  const userName = safe(foundUser?.name, "Name not available");
  const roomNo = safe(foundUser?.roomNo, "Room number not available");

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
      body {
        font-family: Inter, -apple-system, BlinkMacSystemFont, Arial, sans-serif;
        background: #eef1f6;
        padding: 40px;
        display: flex;
        justify-content: center;
      }

      .card {
        background: #ffffff;
        width: 420px;
        border-radius: 22px;
        padding: 36px;
        box-shadow: 0 12px 35px rgba(0,0,0,0.08);
        border-top: 2px solid #e5e7eb;
        border-bottom: 2px solid #e5e7eb;
      }


      .title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 6px;
        letter-spacing: -0.5px;
        color: #111827;
      }

      .sub {
        font-size: 24px;
        color: #0f84fa;
        margin-bottom: 28px;
      }

      .total {
        font-size: 48px;
        font-weight: 700;
        margin: 10px 0 32px;
        letter-spacing: -1px;
        color: #111827;
      }

      .section-label {
        font-size: 13px;
        color: #9ca3af;
        text-transform: uppercase;
        margin-bottom: 6px;
        letter-spacing: 0.6px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f3;
        font-size: 16px;
      }

      .row:last-of-type {
        border-bottom: none;
      }

      .label {
        font-size: 16px;
        color: #9ca3af;
        font-weight: 400;
      }

      .label.strong {
        font-size: 16px;
        font-weight: 600;
        color: #111827;
      }

      .value {
        font-size: 17px;
        font-weight: 400;
        color: #111827;
      }

      .value.strong {
        font-weight: 600;
      }


      .status {
        display: inline-block;
        margin-top: 24px;
        padding: 10px 20px;
        font-size: 18px;
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
      <div class="sub">Room ${roomNo} • ${userName}</div>

      <div class="total">₹${safe(item.total)}</div>

      <div class="section-label">DETAILS</div>

      <div class="row">
        <span class="label">Invoice Date</span>
        <span class="value">${new Date(item.date).toLocaleDateString(
          "en-GB"
        )}</span>
      </div>

      <div class="row">
        <span class="label strong">Rent</span>
        <span class="value strong">₹${safe(item.rent)}</span>
      </div>

      <div class="row">
        <span class="label strong">Fix</span>
        <span class="value strong">₹${safe(item.fix)}</span>
      </div>

      <div class="row">
        <span class="label">Previous Unit</span>
        <span class="value">${safe(item.prevUnit)}</span>
      </div>

      <div class="row">
        <span class="label">Current Unit</span>
        <span class="value">${safe(item.currUnit)}</span>
      </div>

      <div class="row">
        <span class="label">Units Used</span>
        <span class="value">${safe(item.reading)}</span>
      </div>

      <div class="row">
        <span class="label">Rate per Unit</span>
        <span class="value">₹${safe(item.unitCost)}</span>
      </div>

      <div class="row">
        <span class="label strong">Energy Charges</span>
        <span class="value strong">₹${safe(item.readingCost)}</span>
      </div>

      ${
        item.prevDue
          ? `<div class="row">
              <span class="label strong">Previous Due</span>
              <span class="value strong">₹${safe(item.prevDue)}</span>
            </div>`
          : ""
      }

      <div class="row">
        <span class="label">Payment Method</span>
        <span class="value">${finalPaymentMethod}</span>
      </div>

      <span class="status">${
        Number(item.paymentMethod) === 0 ? "UNPAID" : "PAID"
      }</span>

    </div>
  </body>
</html>
`;

  // Generate PDF
  const { uri } = await Print.printToFileAsync({ html });

  // Share PDF
  await Sharing.shareAsync(uri);
}
