
import { useNavigate } from "react-router-dom";

// category 
const category = [
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3081/3081648.png',
        name: 'School Supplies'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2503/2503536.png',
        name: 'Uniforms'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3659/3659899.png',
        name: 'Electronics'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/2942/2942544.png',
        name: 'Bags'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3321/3321681.png',
        name: 'Sports'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3262/3262308.png',
        name: 'Art Supplies'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/8062/8062290.png',
        name: 'Books'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/256/3771/3771436.png',
        name: 'Music'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                <div className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
                    <div className="flex">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    <div onClick={() => navigate(`/category/${item.name}`)} className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1">
                                        <div className="flex justify-center mb-12">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 lg:w-16 lg:h-16 object-contain mt-2 lg:mt-4" />
                                        </div>
                                    </div>
                                    <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;
