import express from "express";
import cors from "cors";
import { prismaClient } from "db/client";
import authentication from "./utils/auth";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", async (req, res) => {
  res.status(200).json({ message: "server healthy" });
});

app.get("/api/v1/websites", authentication, async (req, res) => {
  const userId = req.userId;
  const websites = await prismaClient.website.findMany({
    where: {
      userId,
    },
    select: { id: true, url: true, ticks: true },
  });
  res.status(200).json(websites);
});

app.post("/api/v1/website", authentication, async (req, res) => {
  const { url } = req.body;
  const userId = req.userId as string;
  const newWebsite = await prismaClient.website.create({
    data: {
      url,
      userId,
    },
  });
  res.status(201).json({ message: "website added successfuly" });
});

app.delete("/api/v1/website/:id", authentication, async (req, res) => {
  const websiteId = req.params.id as string;
  const userId = req.userId as string;

  const deletedWebsite = await prismaClient.website.deleteMany({
    where: {
      id: websiteId,
      userId,
    },
  });

  if (deletedWebsite.count === 0) {
    res.status(404).json({ message: "website not found" });
    return;
  }

  res.status(200).json({ message: "website deleted successfuly" });
});

app.post("/api/v1/auth/google", async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
    if (!token) {
      res.status(400).json({
        message: "Google token is required",
      });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(400).json({
        message: "Invalid Google token",
      });
      return;
    }

    const email = payload.email;
    const name = payload.name as string;
    const googleId = payload.sub;

    let user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email,
          name,
          googleId,
        },
      });
    }

    const appToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );
    res.json({
      message: "Login successful",
      token: appToken,
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
        image: payload.picture,
      },
    });
    return;
  } catch (e) {
    console.log("Error occured while loggin in", e);
  }
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
