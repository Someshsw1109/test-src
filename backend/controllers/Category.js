import Category from "../Schema/Category.js"
import Item from "../Schema/Item.js"

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Log the request body to debug
        console.log("Request Body:", req.body);

        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });
        
        console.log("Category Details:", CategorysDetails);
        return res.status(200).json({
            success: true,
            message: "Categories Created Successfully",
        });
    } catch (error) {
        // Log the error message for debugging
        console.error("Error creating category:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export { createCategory };





const showAllCategories=async(req,res)=>{
    try{
        const allCategory=await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            data:allCategory,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
export {showAllCategories};




const addItemToCategory = async (req, res) => {
	const { itemId, categoryId } = req.body;
	console.log("category id", categoryId);
	try {

		const category = await Category.findById(categoryId);
		console.log("category:",category);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const item = await Item.findById(itemId);
		console.log("item:",item);
		if (!item) {
			return res.status(404).json({
				success: false,
				message: "item not found",
			});
		}
		if(category.item.includes(itemId)){
			return res.status(200).json({
				success: true,
				message: "item already exists in the category",
			});
		}
		category.item.push(itemId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "item added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}
export {addItemToCategory}





const categoryPageDetails=async(req,res)=>{
	try {
		
		const { categoryId } = req.body;
		console.log("category page detial ke try mai aaaa:");
		// Get courses for the specified category
		console.log("category id:",categoryId);
		const selectedCategory = await Category.findById(categoryId)
    .populate({
        path: "item",
        match: { status: "Published" },
        populate: [{ path: "admin" }, { path: "ratingAndReviews" }]
    })
    .exec()
    .catch((err) => {
        console.error("Error fetching selected category:", err);
        return null;
    });

if (!selectedCategory) {
    console.log("Category not found or an error occurred.");
    return res.status(404).json({ success: false, message: "Category not found or an error occurred." });
}

		// Handle the case when there are no courses
		if (selectedCategory.item.length === 0) {
			console.log("No item found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No items found for the selected category.",
			});
		}

		const selectedItems = selectedCategory.item;
		console.log("selected course:",selectedItems);

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		}).populate({path:"item",match:{status:"Published"},populate:([{path:"admin"},{path:"ratingAndReviews"}])});
		let differentItems = [];
		for (const category of categoriesExceptSelected) {
			differentItems.push(...category.item);
		}

		// Get top-selling courses across all categories
		const allCategories = await Category.find().populate({path:"item",match:{status:"Published"},populate:([{path:"admin"},{path:"ratingAndReviews"}])});
		console.log("allcategories:",allCategories);
		const allItems = allCategories.flatMap((category) => category.course);
		console.log("all items of a category:",allItems);
		const mostSellingItems = allItems
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedItems: selectedItems,
			differentItems: differentItems,
			mostSellingItems: mostSellingItems,
			success: true,
		});
		console.log("most selling:",mostSellingItems);
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}
export {categoryPageDetails}





