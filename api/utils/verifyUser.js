import jwt from "jsonwebtoken";

export const verifyToken= (req, res, next)=>{
    const token= req.cookies.access_token;

    console.log(token);

    if(!token)
        return res.status(401).send({message: "unauthorized"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err)
            return res.status(403).send("forbidden");
        req.user= user;
        next();
    })
}