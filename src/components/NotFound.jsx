import React from "react";
import FuzzyText from "./FuzzyText";

function NotFound() {
  return (
    <div className="w-full h-[678px] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="dark:hidden flex flex-col gap-y-8">
        <FuzzyText baseIntensity={0.2} color={"#000"}>
          404
        </FuzzyText>
        <FuzzyText baseIntensity={0.2} color={"#000"} fontSize="2rem">
          هیچ صفحه ای پیدا نشد
        </FuzzyText>
      </div>
      <div className="dark:flex hidden flex-col gap-y-8">
        <FuzzyText baseIntensity={0.2} color={"#fff"}>
          404
        </FuzzyText>
        <FuzzyText baseIntensity={0.2} color={"#fff"} fontSize="2rem">
          هیچ صفحه ای پیدا نشد
        </FuzzyText>
      </div>
    </div>
  );
}

export default NotFound;
