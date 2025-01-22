import express from 'express';
import multer from 'multer';
import User from '../models/users.js';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Image upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage }).single('image');

// Add User Route
router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    user.save()
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'User added successfully!',
            };
            res.redirect('/');
        })
        .catch((err) => {
            console.error("Error saving user:", err);
            res.status(500).json({ message: err.message });
        });
});

// Home Route
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('index.ejs', { title: 'Home Page', users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: err.message });
    }
});

// Add User Page
router.get('/add', (req, res) => {
    res.render("add_users", { title: "Add Users" });
});

// Edit User Page
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.redirect('/');
            }
            res.render('edit_user', { title: "Edit User", user });
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/');
        });
});

// Update User Route
router.post('/update/:id', upload, (req, res) => {
    const id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;

        // Delete old image
        if (req.body.old_image) {
            const oldImagePath = './uploads/' + req.body.old_image;
            if (fs.existsSync(oldImagePath)) {
                try {
                    fs.unlinkSync(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err);
                }
            }
        }
    } else {
        new_image = req.body.old_image;
    }

    User.findByIdAndUpdate(
        id,
        { name: req.body.name, email: req.body.email, phone: req.body.phone, image: new_image },
        { new: true }
    )
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'User updated successfully!',
            };
            res.redirect('/');
        })
        .catch((err) => {
            console.error("Error updating user:", err);
            res.status(500).json({ message: err.message });
        });
});

// Delete User Route
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Find and delete the user
        const result = await User.findByIdAndDelete(id);

        // Check if the user exists
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the associated image if it exists
        if (result.image) {
            const imagePath = './uploads/' + result.image;
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (err) {
                    console.error("Error deleting image:", err);
                }
            }
        }

        // Set success message and redirect
        req.session.message = {
            type: 'info',
            message: 'User deleted successfully!',
        };
        res.redirect('/');
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: err.message });
    }
});


export default router;
