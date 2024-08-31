const usermodel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const fs = require("fs")
const path = require('path');
const JWT = require("jsonwebtoken");
const cloudinary = require("../Cloudinary/Cloudinary");

const registration = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        console.log(name, email, phone, password, role)
        const file = req.file
      

        // Check if all required fields are provided
        if (!name || !email || !phone || !password || !role || !file) {
            return res.status(400).json({
                message: "Bad Request: Missing required fields",
                success: false
            });
        }
        const filePath = file.path
        let cloudImageRespone = null
        if(filePath){
            cloudImageRespone = await cloudinary.uploader.upload(filePath,{
                folder: 'images',
             resource_type: 'image',
             type: 'upload',
            })
            fs.unlinkSync(filePath);
        }

        // Check if user already exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = new usermodel({
            name, email, phone, password: hashedPassword,role, profile: {
                profilePhoto: cloudImageRespone.secure_url
            }
        });
        let result = await user.save();

        // Convert result to object and remove password
        result = result.toObject();
        delete result.password;

        // Send success response
        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: result
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error during registration",
            success: false,
            error: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if all required fields are provided
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Bad Request: Missing required fields",
                success: false
            });
        }

        // Check user existence
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Compare passwords
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(404).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account does not exist in your current role",
                success: false
            });
        }

        // Generate token
        const token = JWT.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "2d" });

        // Send response with token in cookie
        res.status(200).cookie("token", token, {
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
            httpOnly: true,
            sameSite: 'Strict'
        }).json({
            message: `Welcome ${user.name}`,
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profile: user.profile
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error during login",
            success: false,
            error: error.message
        });
    }
};


// logout
const logout = async (req, res) => {
    try {

        res.status(200).cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
            sameSite: 'Strict'
        }).json({
            message: "Logout successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error during logout",
            success: false,
            error: error.message
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the user ID is passed as a URL parameter
        const { name, email, skills, bio, phone } = req.body;
        const file = req.file;
        
       const filePath = file?.path
       let cloudResponse = null
       if(filePath){
         cloudResponse =  await cloudinary.uploader.upload(filePath,{
            folder: 'resumes',
             resource_type: 'raw',
             type: 'upload',
         })
         fs.unlinkSync(filePath);
       }
    

        // Check if the new email is already taken by another user
        if (email) {
            const existingUser = await usermodel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email already exists",
                    success: false
                });
            }
        }

        // Construct the update object
        let updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;

        // Initialize the profile object if needed
        const currentUser = await usermodel.findById(id);

        // Only initialize and update profile fields if new data is provided
        if (bio || skills || cloudResponse) {
            updates.profile = currentUser.profile || {}; // Start with the existing profile
        
            // Update the profile with new data
            if (bio) updates.profile.bio = bio;
            if (skills) updates.profile.skills = skills.split(",");
            if (cloudResponse) {
                updates.profile.resume = cloudResponse.secure_url; // Save file URL
                updates.profile.resumeOriginalName = file.originalname; // Save filename
            }
        }

        // Find the user by ID and update their profile
        const user = await usermodel.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true // Run validation against the schema
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Send the updated user profile as the response
        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });

    } catch (error) {
        if (!res.headersSent) {
            // Ensure only one response is sent
            return res.status(500).json({
                message: "Server error during profile update",
                success: false,
                error: error.message
            });
        } else {
            console.error('Error sending response:', error.message);
        }
    }
};


module.exports = updateProfile;


module.exports = { registration, login, logout,updateProfile };
