import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign(
       { id },
        process.env.JWT_SCERET,
        {
           expiresIn:"30d"
        }
        );
}

