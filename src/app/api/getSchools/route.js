import  db from "../../lib/db.js";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM School"
    );

     return new Response(
      JSON.stringify({ message: "School added successfully", rows }),
      { status: 200 }
    );
    
  } catch (err) {
    new Response(
      JSON.stringify({ error: "Failed to add school", details: err.message }),
      { status: 500 }
    );
  }
}
