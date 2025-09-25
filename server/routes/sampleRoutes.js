import express from "express";
import Sample from "../models/sampleModel.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Sample
router.post("/", protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    const sample = new Sample({ name, description, user: req.user.id });
    await sample.save();
    res.status(201).json(sample);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all Samples (for logged in user)
router.get("/", protect, async (req, res) => {
  try {
    const samples = await Sample.find({ user: req.user.id });
    res.json(samples);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Sample
router.put("/:id", protect, async (req, res) => {
  try {
    const { name, description } = req.body;
    const sample = await Sample.findById(req.params.id);

    if (!sample) return res.status(404).json({ message: "Sample not found" });

    // Only owner can update
    if (sample.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    sample.name = name || sample.name;
    sample.description = description || sample.description;
    const updatedSample = await sample.save();
    res.json(updatedSample);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Sample
router.delete("/:id", protect, async (req, res) => {
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) return res.status(404).json({ message: "Sample not found" });

    if (sample.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await sample.deleteOne();
    res.json({ message: "Sample removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
