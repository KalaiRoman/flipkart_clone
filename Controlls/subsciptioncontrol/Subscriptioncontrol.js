import subscription_shema from "../../Models/subscribtion/subscription_shema.js"

export const createPlans = async (req, res) => {
    try {
        const response = await subscription_shema(req.body);
        await response.save();
        res.status(201).json({ message: "created plans" })
    } catch (error) {

    }
}

export const getPlans = async (req, res) => {
    try {
        const response = await subscription_shema.find({});
        res.status(200).json({ message: "get plans", data: response })
    } catch (error) {
    }
}