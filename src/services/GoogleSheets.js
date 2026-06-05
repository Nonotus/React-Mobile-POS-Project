const GOOGLE_SCRIPT_URL =
  "broken url";

export default async function saveToGoogleSheets(data) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    });

    console.log("Sent");

    return true;
  } catch (err) {
    console.error("ERROR:", err);

    return false;
  }
}