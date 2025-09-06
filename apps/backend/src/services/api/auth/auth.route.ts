import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../database/prisma.init";

const router =  Router();

const loginHandler = (req: any, res: any) => {
    // Handle login logic
    const { username, password } = req.body;

    const matchedUser = prisma.user.findUnique({
        where: { username }
    });

    if (!matchedUser) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = bcrypt.compareSync(password, matchedUser.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate and return a token (e.g., JWT)
    const userAgent = req.headers['user-agent'] || '';
    const jwt = require('jsonwebtoken'); // Use require or import at top level
    const jwt_token = jwt.sign(
        { id: matchedUser.id, username: matchedUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    let clientType: 'mobile' | 'desktop' | 'web' = 'web';
    switch (true) {
        case /mobile|android|iphone|ipad/i.test(userAgent):
            clientType = 'mobile';
            break;
        case /windows|macintosh|linux/i.test(userAgent):
            clientType = 'desktop';
            break;
        default:
            clientType = 'web';
            break;
    }

    if (clientType === 'desktop') {
        // Use cookies for authentication
        res.cookie('authToken', jwt_token, { secure: true, httpOnly: true });
    } else {
        // Send token in response body for mobile/web
        res.json({ message: "Login successful", authToken: jwt_token });
        return;
    }
    res.json({ message: "Login successful" });
};
const registerHandler = (req: any, res: any) => {
    const { username, password, recaptcha } = req.body;

    // Validate reCAPTCHA
    if (process.env.RECAPTCHA_SECRET_KEY) {
        const fetch = require('node-fetch');
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`;
        fetch(verifyUrl, { method: 'POST' })
            .then((response: any) => response.json())
            .then(async (data: any) => {
                if (!data.success) {
                    return res.status(400).json({ message: "reCAPTCHA verification failed" });
                }
                // Check if user already exists
                const existingUser = await prisma.user.findUnique({
                    where: { username }
                });
                if (existingUser) {
                    return res.status(400).json({ message: "Username already taken" });
                }
                // Hash password
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                // Create user
                const newUser = await prisma.user.create({
                    data: { username, passwordHash }
                });
                res.json({ message: "Registration successful", userId: newUser.id });
            })
            .catch((err: any) => {
                console.error("reCAPTCHA verification error:", err);
                res.status(500).json({ message: "Internal server error" });
            });
    } else {
        res.status(500).json({ message: "reCAPTCHA not configured" });
    }
};

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;