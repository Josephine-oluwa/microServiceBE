import express, {Request, Response} from "express"
import PrismaClient from "@PrismaClient"

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
    try {
        const {title, description, price} = req.body;

        const {userID} = req.params;

        const product =await prisma.authModel.create({
            data: {
                title,
                description,
                price,
                userID
            }
        })
    } catch (error) {
        return res.status(404).json({
message: "Error"
        })
    }
}
