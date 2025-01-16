import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CatalogCard from './ItemCard';

const CourseList = ({ Items }) => {
  return (
    <div className="flex flex-col gap-4 text-white">
      {Items?.length ? (
        Items.map((item) => (
          <CatalogCard key={item._id} item={item} Height="lg:h-[250px] h-[100px]" />
        ))
      ) : (
        <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
              <Skeleton className="md:h-[20px] w-[70px] rounded-md" />
              <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
              <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
            </div>
          ))}
        </SkeletonTheme>
      )}
    </div>
  );
};

export default CourseList;
