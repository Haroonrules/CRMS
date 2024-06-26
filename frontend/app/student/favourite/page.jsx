"use client";

import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { getAllCourses } from "../../firebase/methods";
import { toast } from "sonner";
import { Loading, Loader } from "../../components/loader";

const Page = () => {
  const [courses, setCourses] = useState();

  const getCourses = async () => {
    try {
      toast.loading("Getting courses");
      console.log("getting courses");
      const courses = await getAllCourses();
      console.log(courses);
      setCourses([courses[0], courses[1], courses[2]]);
      toast.dismiss();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (courses === undefined) {
      getCourses();
    }
  }, []);

  return (
    <div className="w-full ">
      <h2 className="text-2xl mt-14 ml-10 text-[#86B6F6]">Favourite courses</h2>
      <div className="flex justify-around w-full flex-wrap mt-10 ">
        {courses ? (
          courses.map((course, key) => {
            return <Card course={course} id={key} />;
          })
        ) : (
          <div>
            Loading... <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
