import { prisma } from "../config/db.js";

// POST /watchlist
export const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // Verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if already added (for this user)
  const existingInWatchlist = await prisma.watchListItem.findFirst({
    where: { userId: req.user.id, movieId },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  // Create watchlist item
  const watchlistItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  return res.status(201).json({
    status: "success",
    data: { watchlistItem },
  });
};

// DELETE /watchlist/:id
export const removeFromWatchList = async (req, res) => {
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "You do not have permission to delete this item" });
  }

  await prisma.watchListItem.delete({
    where: { id: req.params.id },
  });

  return res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

// PUT /watchlist/:id
export const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  // Build update data only with provided fields
  const updateData = {};
  if (status !== undefined) updateData.status = status;
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  const updatedItem = await prisma.watchListItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  return res.status(200).json({
    status: "success",
    data: { watchlistItem: updatedItem },
  });
};
