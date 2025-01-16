import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ItemInformationForm from './ItemInformation/ItemInformationForm.jsx';
import PublishItem from './PublishItem/PublishItem.jsx';

const RenderSteps = () => {
    const { step } = useSelector((state) => state.item);

    // Updated steps array with only two steps
    const steps = [
        { id: 1, title: 'Item Information' },
        { id: 2, title: 'Publishing Item' },
    ];

    return (
        <>
            {/* Steps Header */}
            <div className="flex justify-center items-center bg-white">
                <div className="flex flex-col w-[calc(100vw-20%)] md:w-fit items-start">
                    {/* Step Indicators */}
                    <div className="ml-10 relative mb-2 flex w-full justify-center">
                        {steps.map((item, index) => (
                            <div key={item.id} className="flex w-full justify-between">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                                            step === item.id
                                                ? 'bg-yellow-900 border-yellow-50 text-yellow-50'
                                                : 'border-richblack-700 bg-richblack-800 text-richblack-300'
                                        }`}
                                    >
                                        {step > item.id ? <FaCheck /> : item.id}
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-[calc(34px/2)] w-full border-dashed border-b-2 ${
                                            step > item.id ? 'border-yellow-50' : 'border-richblack-700'
                                        }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Titles */}
                    <div className="relative mb-16 flex w-full select-none justify-between">
                        {steps.map((item) => (
                            <div key={item.id} className="flex md:min-w-[180px] flex-col items-start">
                                <p className="ml-3 md:ml-0 text-[10px] md:text-sm text-richblack-5">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step Content */}
            <div>
                {step === 1 && <ItemInformationForm />}
                {step === 2 && <PublishItem />}
            </div>
        </>
    );
};

export default RenderSteps;
