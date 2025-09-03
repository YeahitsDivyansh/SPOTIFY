import getBuffer from "./config/dataUri.js";
import TryCatch from "./TryCatch.js";
import type { Request } from "express";
import cloudinary from 'cloudinary';
import { sql } from "./config/db.js";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

export const addAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
    if (req.user?.role !== 'admin') {
        res.status(401).json({ message: "You are not admin" });
        return;
    }

    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(400).json({ message: "Failed to generate file buffer" });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "albums",
    });

    const result = await sql`
   INSERT INTO albums (title, description, thumbnail) VALUES (${title}, ${description}, ${cloud.secure_url}) RETURNING *
  `;

    res.json({
        message: "Album created successfully",
        album: result[0]
    });
});