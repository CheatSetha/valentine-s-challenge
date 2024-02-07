"use client";

import { useEffect, useRef, useState } from "react";
import JSConfetti from "js-confetti";
import Image from "next/image";

function HomePage() {
  const [btnPosition, setBtnPosition] = useState({ x: 0, y: 0 });
  const [isOnHover, setIsOnHover] = useState(false);
  const [content, setContent] = useState(" Will you be my valentine?");
  const [imgSrc, setImgSrc] = useState("/1.gif");
  const btnOrgPosition = useRef(null);

  const jsConfetti = new JSConfetti();
  const btnClickHandler = async () => {
    setIsOnHover(false);
    setContent("Thank you for accepting my proposal! 💘");
    setImgSrc("/2.gif");
    // animation for 10 times
    for (let i = 0; i < 10; i++) {
      await jsConfetti.addConfetti();
      await jsConfetti.addConfetti({
        emojis: ["🌈", " 🦄", " 🦄", "✨", "🌸", "🌸", "🦄"],
        emojiSize: 30,
        confettiNumber: 80,
      });
      await jsConfetti.addConfetti({
        emojis: ["🦄"],
        emojiSize: 50,
        confettiNumber: 30,
      });
    }
    console.log("Confetti animation completed!");
  };

  const getRandomPosition = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const maxY = window.innerHeight - 100;
    const maxX = window.innerWidth - 100;
    return { x: x > maxX ? maxX : x, y: y > maxY ? maxY : y };
  };

  const handleMoveBtnOnHover = () => {
    const newPosition = getRandomPosition();
    setIsOnHover(true);
    setBtnPosition(newPosition);
  };

  useEffect(() => {
    const btnPosition = btnOrgPosition.current.getBoundingClientRect();
    console.log(
      "correct btn position",
      btnPosition?.x,
      " y = ",
      btnPosition?.y
    );
    setBtnPosition({ x: btnPosition?.x, y: btnPosition?.y });
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        <Image
          className="rounded-md mb-5 w-full sm:px-3 "
          src={imgSrc}
          width={400}
          height={300}
          alt="how image"
        />
        <h4 className="font-light text-2xl text-gray-700 mb-5 text-center">
          {content}
        </h4>
        {/* button section */}
        <div className="flex justify-center gap-5 items-center">
          <button
            onClick={btnClickHandler}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2"
          >
            Yes
          </button>
          <button
            ref={btnOrgPosition}
            onMouseEnter={handleMoveBtnOnHover}
            style={{
              left: btnPosition.x,
              top: btnPosition.y,
              transition: "left 0.5s ease, top 0.5s ease", // Add smooth transition
            }}
            className={`${
              isOnHover ? "absolute " : " "
            } text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
