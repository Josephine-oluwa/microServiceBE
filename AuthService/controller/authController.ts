import express, {Response, Request} from "express"
import bcrypt from "bcrypt"
import prisma from "prisma"
import jwt from "jsonwebtoken"
import { openingMail } from "../utils/email"

export const createUser = async (req: Request, res: Response)  => {
    try {
        const {userName, email, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const token = jwt.sign({hashed}, "starting")

        const user = await prisma.authModel.create({
            data: {
                userName,
                email,
                password: hashed,
                token
            }
        })
        return res.status(404).json({
            message: "created",
            data: user
        })

    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })

        openingMail().then(()=> {
            console.log("email is sent")
        })
    }
}


export const signInUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.authModel.findUnique({
        where: { email },
      });
  
      if (user) {
        const check = await bcrypt.compare(password, user.password);
  
        if(check){
            if (user.verified && user.token === ""){
                const token = jwt.sign({id: user.id}, "tokenSecret")
                return res.status(200).json({
                    message: "welcome",
                    data: token
                })
            }
        }
        } else {
          return res.status(404).json({
            message: "incorrect password",
          });
        }
    } catch (error) {
      return res.status(404).json({
        message: "Error deleting Account",
      });
    }
}

  
  export const verifyUser = async (req: Request, res: Response) => {
    try {
      const {userID} = req.params
  
      const user = await prisma.authModel.findUnique({
        id: userID
      });
  
      if (user?.token !== "") {
        const userData = await prisma.authModel.update({
            where: {id: user?.id},
            data: {
                verified: true,
                token: true
            }
        })
  
    return res.status(404).json({
            message: "incorrect password",
          }) 
        }else {
        return res.status(404).json({
          message: "can't find user",
        });
        }
      } catch (error) {
      return res.status(404).json({
        message: "Error deleting Account",
      });
    }
}


export const getAllUser = async (res: Response, req: Request)=> {
   try {
    const user = await prisma.authModel.findMany({})

    res.status(200).json({
        message:"Getting all user",
        data:user
    })
   } catch (error) {
    res.status(404).json({
        message:"Error getting all user"
    })
   }
    }

