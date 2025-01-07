const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body
        const {id} = req.params
        
    } catch (error) {
        console.error("An error occurred: ", error.message)
        res.status(500).json({message: "Internal server error"})
    }
}


export {sendMessage}