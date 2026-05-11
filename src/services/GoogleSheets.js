const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxqqNYAmMiIZI6XvfZU57KGFhiPD7b2eFz1ZqNOv-OK7SxhpGNu9OVxM8BYd_n9IxexQw/exec";

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