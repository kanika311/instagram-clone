import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

const stories = [
  { username: "vanshikaja...", img: "/photos/pic1.jpg" },
  { username: "_priyanshi...", img: "/photos/pic2.jpg" },
  { username: "__sheisgla...", img: "/photos/pic2.jpg" },
  { username: "gungun_c...", img: "/photos/pic1.jpg" },
  { username: "mkgupta0...", img: "/photos/pic1.jpg" },
  { username: "rao.aman._", img: "/photos/pic3.jpg" },
  { username: "shary_gup...", img: "/photos/pic2.jpg"},
  { username: "simran.ag...", img: "/photos/pic1.jpg" },
  { username: "simran.ag...", img: "/photos/pic2.jpg" },
  { username: "simran.ag...", img: "/photos/pic2.jpg" },
  { username: "simran.ag...", img: "/photos/pic1.jpg" },
  { username: "simran.ag...", img: "/photos/pic1.jpg" },
  { username: "simran.ag...", img: "/photos/pic1.jpg" },
];

const StorySection = () => {
  return (
    <div className="flex space-x-4 p-4  overflow-x-auto no-scrollbar w-[70%]">
      {stories.map((story, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full p-1 border-2 border-pink-500">
            <Image 
              src={story.img} 
              alt={story.username} 
              width={100} 
              height={100} 
              className="rounded-[100%] object-cover w-14 h-13 " 
            />
          </div>
          <p className="text-xs text-gray-700 truncate w-16 text-center">{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default StorySection;
