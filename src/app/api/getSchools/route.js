import db from "../../lib/db.js";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM School"
    );

    return new Response(
      JSON.stringify({ message: "Schools fetched successfully", rows }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching schools:", err);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch schools",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
