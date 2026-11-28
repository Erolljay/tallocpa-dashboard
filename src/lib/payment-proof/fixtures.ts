/** Test fixtures: real payment confirmation emails (names and numbers as the Owner shared them). */

// UnionBank Business Banking's bills payment confirmation to the BIR, as the Owner
// received it (both halves of the email), in the HTML shape Gmail delivers.
export const UNIONBANK_FROM = "UnionBank Business Banking <noreply@unionbankph.com>";
export const UNIONBANK_SUBJECT = "Successful Bills Payment (CHARLIE SINDOL)";
export const UNIONBANK_HTML = `
<html><head><style>.x{color:red}</style></head><body>
<h2>CHARLIE SINDOL</h2>
<p>Your transaction was successful!</p>
<p>Your transaction was successfully posted to the indicated biller. UB661855 serves as your UnionBank reference number.</p>
<table>
<tr><td>Created by</td><td>Maria Santos on November 10, 2026, 09:41 AM</td></tr>
<tr><td>Organization</td><td>EJ TALLO CLOUD ACCOUNTING AND AUDITING SERVICES</td></tr>
<tr><td>Source Account</td><td>EJ TALLO CLOUD ACCOUNTING AND AUDITING SERVICES<br>0001 8002 5831<br>CORPORATE REGULAR CHECKING ACCOUNT</td></tr>
</table>
<h3>Payment to</h3>
<table>
<tr><td>Biller</td><td>Bureau of Internal Revenue (BIR)</td></tr>
<tr><td>BIR Reference Number</td><td>So20261110144036163431386 1</td></tr>
<tr><td>TIN</td><td>180359760</td></tr>
<tr><td>TIN Branch Code</td><td>00000</td></tr>
<tr><td>Form Type</td><td>0619E</td></tr>
<tr><td>Tax Type</td><td>WE</td></tr>
<tr><td>Return Period</td><td>10/31/2026</td></tr>
</table>
<h3>Transaction Details</h3>
<table>
<tr><td>Amount</td><td>PHP 20,578.58</td></tr>
<tr><td>Service Fee</td><td>Free</td></tr>
<tr><td>Schedule</td><td>Immediately</td></tr>
</table>
<p>Note: Please do not forget to file the corresponding tax return for this payment.</p>
</body></html>`;
export const UNIONBANK_RECEIVED = "2026-11-10T01:41:30Z";
