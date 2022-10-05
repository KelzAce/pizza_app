const orderModel = require ("")


// formation about orders

ordersInfo = async (req, res, next) => {
    try{
       // checking for authenticated roles
        if (req.authenticatedUser.role !== "admin"){
            return res.status (401).send({
                Message: "Unauthorized"
            })
        }
    const orders = await orderModel.find({})
    const resObj = {}
    resObj.states = orders.reduce(obj, x) => {
        if (!obj[x.state]) obj[x.state] = 0
        obj [x.state]++
        return obj
    }, 
    return res.json ({status: true, data: resObj})
    }catch(err){
        next(err)
    }
}


//get all order
const getOrderById = async (req, res, next) =>{
    try{
        const {orderId} = req.params
        const order = await orderModel.findById(orderId)
        if (!order){
            return res.status(404).json({
                status: false,
                data: null
            })
        }
        return res.json ({status:true, data: order})
    } catch(err){
        next(err)
    }
}

//create a new order
const createOrder = async (req, res, next) =>{
    try{
        const body = req.body

        const total_price = body.items.reduce((prev, curr) =>{
            return (prev += curr.qunatity * price)
        }, 0)

        const orderObject = {
            items: body.items, 
            created_at: new Date(),
            total_price
        }

        const order = new orderModel (orderObject)
        order
        .save()
        .then((result) => {
            return res.status (201).json({
                status: true, 
                data: result
            })
            .catch (err) => {
                res.status(500)
                console.log("An Error Occured", err.Message)
                return res.json({error: "Error creating order"})
            })
        } catch (err){
            next(err)
        }
    }

    // update order state
    const updateOrder = async (req, res, next) => {
        try{
            // catch for authenticated users role
            if (req.authenticatedUser.role !== "admin"){
                return res.status(401).send({message: "Unauthorized"})
            }

            const {Id } = req.params
            const {state } = req.body

            const order = await orderModel.findById(Id)

            if (!order){
                return res.status(404).json({status: false, data: null})
            }

            order.state = state

            await order.save()

            return res.json ({status: true, data: order})
        }catch (err){
            console.log(err)
            next(err)
        }
    }

    // Delete order
    const deleteOrder = async(req, res, next) => {
        try{
            if (req.authenticatedUser.role !== "admin"){
                return res.status(401).send({message: "Unauthorized"})
            }

            const {Id } = req.params

            const order = await orderModel.findOne(Id)
            const deleted = await order.remove()


            if (deleted){
                return res.status(204).json({status: true})
            }
        } catch(err){
            next(err)
        }
    }

    module.exports = {getOrdersInfo, getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder}
