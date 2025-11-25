import * as Print from "expo-print";
import * as Sharing from "expo-sharing"

import { User, BillEntry } from "@/context/UserDataContext";

export async function shareBill(foundUser: User, item: BillEntry, ) {
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
      }

      .header {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 6px;
        letter-spacing: -0.5px;
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
      }

      .section {
        margin-bottom: 28px;
      }

      .label {
        font-size: 13px;
        color: #9ca3af;
        text-transform: uppercase;
        margin-bottom: 6px;
        letter-spacing: 0.6px;
      }

      .value {
        font-size: 17px;
        font-weight: 500;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f3;
        font-size: 16px;
      }

      .status {
        display: inline-block;
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 999px;
        margin-top: 20px;
        color: #fff;
        background: ${Number(item.paymentMethod) === 0 ? "#ef4444" : "#10b981"};
      }

      .footer {
        text-align: center;
        margin-top: 36px;
        font-size: 12px;
        color: #9ca3af;
      }
    </style>
  </head>

  <body>
    <div class="card">

      <div class="header">${safe(item.month)} Bill</div>
      <div class="sub">Room ${roomNo} • ${userName}</div>

      <div class="total">₹${safe(item.total)}</div>

      <div class="section">
        <div class="label">Invoice Date</div>
        <div class="value">${new Date(item.date).toLocaleDateString(
          "en-GB"
        )}</div>
      </div>

      <div class="label">Details</div>

      <div class="row"><span>Rent</span><span>₹${safe(item.rent)}</span></div>
      <div class="row"><span>Fix</span><span>₹${safe(item.fix)}</span></div>
      <div class="row"><span>Previous Unit</span><span>${safe(
        item.prevUnit
      )}</span></div>
      <div class="row"><span>Current Unit</span><span>${safe(
        item.currUnit
      )}</span></div>
      <div class="row"><span>Reading</span><span>${safe(
        item.reading
      )}</span></div>
      <div class="row"><span>Unit Cost</span><span>₹${safe(
        item.unitCost
      )}</span></div>
      <div class="row"><span>Reading Cost</span><span>₹${safe(
        item.readingCost
      )}</span></div>
      <div class="row"><span>Payment Method</span><span>${finalPaymentMethod}</span></div>

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
