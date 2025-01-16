import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { categories } from '../../services/apis.js';
import { apiConnector } from '../../services/apniconnect.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from "../../components/layout/Layout";
import getCatalogPageData from '../../services/operations/pageAndComponentData.js';
import ItemSlider from "../../components/core/Catalog/ItemSlider.jsx"
import CatalogCard from '../../components/core/Catalog/ItemCard.jsx';

const CategoryPage = () => {
    const Catalog = useParams();
    const [Desc, setDesc] = useState([]);
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const [categoryID, setcategoryID] = useState(null);
    const [activeOption, setActiveOption] = useState(1);
    const dispatch = useDispatch();
   
  
    const fetchSublinks=  async ()=>{
      try {
          const result = await apiConnector("GET",categories.CATEGORIES_API);
          const category_id= result.data.data.filter((item)=>item.name=== Catalog.catalog)[0]._id;
          setcategoryID(category_id);      
          setDesc(result.data.data.filter((item)=>item.name=== Catalog.catalog)[0]);
          // console.log("Desc",Desc);  
          console.log("category id:",category_id);
      } catch (error) {
          console.log("could not fetch sublinks");
          console.log(error);
      }
  }
  useEffect(() => {
      fetchSublinks();
  }, [Catalog])
  
  useEffect(() => {
      const fetchCatalogPageData = async () => {
        console.log("page data pe aagye:");
              const result = await getCatalogPageData(categoryID,dispatch);
              console.log("result",result);
              setCatalogPageData(result);
      }
      if (categoryID) {
          fetchCatalogPageData();
      }
  }, [categoryID])
  
  useEffect(() => {
    console.log("Updated CatalogPageData:", CatalogPageData);
  }, [CatalogPageData]);
    return (
        <Layout>
             <div className=' box-content bg-richblack-800 px-4'>
      <div className='mx-auto flex min-h-[260px]  flex-col justify-center gap-4 '>
        <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{Catalog.catalog}</span> </p>
        <p className='text-3xl text-richblack-5'>{Catalog?.catalog}</p>
        <p className='max-w-[870px] text-richblack-200'>
          {Desc?.description}
        </p>
      </div>
      </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
          <button onClick={()=>{setActiveOption(1)}}  className={activeOption===1? `px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer` }>Most Populer</button>
          <button onClick={()=>{setActiveOption(2)}} className={activeOption===1?'px-4 py-2 text-richblack-50 cursor-pointer':'px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer'}>New</button>
        </div>
        <ItemSlider Items={CatalogPageData?.selectedItems}/>        
      </div>

      
      
      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl text-white'>
          Frequently BoughtTogether
          </h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.mostSellingItems?.map((item,index)=>(
                <CatalogCard key={index} item={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            }
          </div>
      </div>
        </Layout>
    );
}

export default CategoryPage;