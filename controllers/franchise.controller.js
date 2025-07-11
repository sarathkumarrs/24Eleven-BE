const Franchise = require("../models/franchise.model");

exports.createFranchise = async (req, res) => {
  try {
    const {
      image,
      name,
      address,
      contact_number,
      email,
      location,
    } = req.body;

    const user_id = req.user.id;

    if (!name || !address || !contact_number || !email || !location?.coordinates) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Use $geoNear to find the closest franchise and get distance
    const [nearby] = await Franchise.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: location.coordinates, // [lng, lat]
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: 10000, // 10 km in meters
        },
      },
      { $limit: 1 }
    ]);

    if (nearby) {
      const km = (nearby.distance / 1000).toFixed(2);
      return res.status(409).json({
        message: `A franchise already exists ${km} km away. Only one allowed within 10 km.`,
        distance_in_km: parseFloat(km),
        nearby_franchise: {
          id: nearby._id,
          name: nearby.name,
          address: nearby.address,
        }
      });
    }

    // ✅ No nearby franchise — create new one
    const franchise = new Franchise({
      image,
      name,
      address,
      contact_number,
      email,
      user_id,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });

    await franchise.save();

    res.status(201).json({ message: "Franchise created successfully", franchise });
  } catch (error) {
    console.error("Create franchise error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update Franchise
exports.updateFranchise = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      name,
      address,
      contact_number,
      email,
      location,
    } = req.body;

    const franchise = await Franchise.findById(id);
    if (!franchise) return res.status(404).json({ message: "Franchise not found" });

    // Update only fields that were sent
    if (image !== undefined) franchise.image = image;
    if (name) franchise.name = name;
    if (address) franchise.address = address;
    if (contact_number) franchise.contact_number = contact_number;
    if (email) franchise.email = email;
    if (location?.coordinates) {
      franchise.location = {
        type: "Point",
        coordinates: location.coordinates,
      };
    }

    await franchise.save();

    res.json({ message: "Franchise updated successfully", franchise });
  } catch (error) {
    console.error("Update franchise error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getMyFranchises = async (req, res) => {
  try {
    const userId = req.user.id;

    const franchises = await Franchise.find({ user_id: userId });

    res.json({ franchises });
  } catch (error) {
    console.error("Get my franchises error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getMyFranchiseById = async (req, res) => {
  try {
    console.log(1231);
    
    const userId = req.user.id;
    const franchiseId = req.params.id;

    const franchise = await Franchise.findOne({ _id: franchiseId, user_id: userId });

    if (!franchise) {
      return res.status(404).json({ message: "Franchise not found or access denied" });
    }

    res.json({ franchise });
  } catch (error) {
    console.error("Get franchise by ID error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
