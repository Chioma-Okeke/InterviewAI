import React from "react";
import backgroundSrc from "../../assets/background2.png";
import demoImage from "../../assets/demoImage.png";

function Section() {
    return (
        <main className="text-primary-dark dark:text-primary-light">
            <div
                // style={{ backgroundImage: `url(${backgroundSrc})` }}
                className=" h-[600px] overflow-hidden"
            >
                <img src={backgroundSrc} alt=""  className="mx-auto object-cover object-top demo-image -mt-[300px]"/>
                {/* <div style={{ backgroundImage: `url(${demoImage})` }}
                className="bg-cover bg-bottom bg-no-repeat h-[718.93px] w-[1011px] mx-auto absolute top-[70px] left-1/2 -translate-x-1/2 demo-image">

                </div> */}
                {/* <img
                    src={demoImage}
                    alt=""
                    className="w-[1011px] mx-auto absolute top-[60px] left-1/2 -translate-x-1/2 demo-image"
                /> */}
            </div>
        </main>
    );
}

export default Section;
