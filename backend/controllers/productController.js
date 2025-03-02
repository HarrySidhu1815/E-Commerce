

// function for add Product

const addProduct = async (req,res) => {
    try {
        const {name, description, price, category, subCategory, bestseller, sizes} = req.body
    
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        
        console.log(name, description, price, category, subCategory, bestseller, sizes)
        console.log( image1, image2, image3, image4)

        res.json({})
        
    } catch (error) {
        res.json({sucess: false, message: error.message})
    }

}

// function for removing Product

const removeProduct = async (req,res) => {

}

// function for list Products

const listProducts = async (req,res) => {

}

// function for listing single Product

const listSingleProduct = async (req,res) => {

}

export {addProduct, removeProduct, listProducts, listSingleProduct}