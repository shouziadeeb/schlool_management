import db from "../../lib/db.js";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
    let imageUrl = null;

    if (image && image.name) {
      const buffer = Buffer.from(await image.arrayBuffer());

      // Upload to Cloudinary
      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "schools" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageUrl = uploadRes.secure_url; // Cloudinary hosted URL
    }

    // Save record in MySQL
    const [result] = await db.query(
      "INSERT INTO School (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, imageUrl]
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
