import db from "../../lib/db.js";
import path from 'path'
import fs from 'fs'

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email = formData.get("email_id");
    const image = formData.get("image");
    let imageName = null;

    console.log(image,'image', image.name)

    if (image && image.name) {
      // Generate a unique filename (to avoid conflicts)
      imageName = Date.now() + "-" + image.name;

      // Save the file in public/uploads
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure folder exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      fs.writeFileSync(path.join(uploadDir, imageName), buffer);
    }
    const [result] = await db.query(
      "INSERT INTO School (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, imageName]
    );

    return new Response(
      JSON.stringify({ message: "School added successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting school:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add school", details: error.message }),
      { status: 500 }
    );
  }
}
