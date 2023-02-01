const BrandModel = require('./brand.model')
const slugify = require("slugify")
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')




// create new Brand
const createBrand = catchAsyncErrors(async (req, res , next) => {
    const { name } = req.body;
    let newBrand = new BrandModel({ name, slug: slugify(name) });
    await newBrand.save();
    if(!newBrand){
        return next(new AppError(`can not create New Brand`, 400));
    }
    res.status(200).json(newBrand);
})




// get All Brands
const getBrands = catchAsyncErrors(async (req, res ,next) => {
    let Brands = await BrandModel.find({});
    if(!Brands){
        return next(new AppError(`Categories Not Found`, 400));
    }
    res.status(200).json(Brands);
})


// get Brand By ID 
const getBrandyByID = catchAsyncErrors(async (req, res ,next) => {
    let brand = await BrandModel.findById(req.params.id);
    if (!brand) {
        return next(new AppError(`Brand Not Found`, 404));
    }
    res.status(200).json(brand);
})


// update Brand
const updateBrand= catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name} = req.body;
    let updatedBrand= await BrandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

    if (!updatedBrand) {
        return next(new AppError(`Brand Not Found To Update`, 404));
    }
    res.status(200).json(updatedBrand);
})

//delete subCategory
const deleteBrand = catchAsyncErrors(async (req, res,next) => {
    const { id } = req.params;
    let deletedBrand = await brandModel.findByIdAndDelete(id);
    if (!deletedBrand) {
        return next(new AppError(`Brand Not Found To Delete`, 404));
    }
    res.status(200).json({ message: `${deleteBrand.name}Brand has Been Deleted` });
})




module.exports = {
    createBrand,
    getBrands,
    getBrandyByID,
    updateBrand,
    deleteBrand
}