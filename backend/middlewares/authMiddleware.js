import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/generateTokens'

const authorize = async (req, res, next) =>{
    const accessToken = req.headers["authorization"]?.split(" ")[1]
    const refreshToken = req.headers["x-refresh-token"]

    try {
        if(accessToken){
            const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
            req.user = user
            return next()
        }
    } catch (error) {
        console.error("Invalid access token: ", error)
    }

    if (refreshToken){
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
            const {userId, tokenVersion} = decoded

            const storedTokenVersion = await getRefreshTokenVersion(userId)
            if(tokenVersion !== storedTokenVersion){
                return res.status(401).json({message: "Invalid refresh token version"})
            }

            const user = await getUserById(userId)
            if (!user){
                return res.status(401).json({message:"User not found"})
            }

            const newAccessToken = generateAccessToken(user._id)

            req.user = {userId: user._id}
            req.setHeader("Authorization", `Bearer ${newAccessToken}`)
            
            return next()

        } catch (error) {
            console.error("Refresh Token invalid: ", error)
            return res.status(401).json({message: "Unauthorized"})
        }
    }

    return res.status(401).json({message: "Unauthorized"})
}

export default authorize