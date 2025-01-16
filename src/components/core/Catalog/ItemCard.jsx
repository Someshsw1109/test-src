import React, { useEffect, useState } from 'react';
import RatingStars from '../Homepage/common/RatingStars.jsx';
import GetAvgRating from '../../../../utils/avgRating.js';
import { Link } from 'react-router-dom';

const CatalogCard = ({ item, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(item.ratingAndReviews);
    setAvgReviewCount(count);
  }, [item]);

  return (
    <div className='mb-4 hover:scale-[1.03] transition-all duration-200 z-50'>
      <Link to={`/courses/${item?._id}`}>
        <div>
          <div>
            <img
              src={item?.thumbnail}
              alt='item thumbnail'
              className={`${Height} rounded-xl object-cover`}
            />
          </div>
          <div className='flex flex-col gap-2 px-1 py-3'>
            <p className='text-sm md:text-xl text-richblack-5'>{item?.name}</p>
            <div className='flex gap-x-3'>
              <span className='text-yellow-50'>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className='md:block hidden md:text-xl text-richblack-5'>{item?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p className='text-sm md:text-xl text-richblack-5'>Rs. {item?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CatalogCard;
