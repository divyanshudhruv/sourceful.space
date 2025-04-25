import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-5 bg-white sm:py-5 lg:py-5">
      <div className="max-w-2xl mx-auto text-center mt-8">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          How does it work?
        </h2>

        <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-500">
          Discover how Sourceful works and how it can help you connect with the
          open-source community.
        </p>
      </div>
      <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
        <div className="relative mt-5 lg:mt-10">
          <div className="absolute inset-x-0 hidden xl:px-36 top-2 md:block md:px-16 lg:px-24">
            <img
              className="w-full"
              style={{ clipPath: "inset(0 50px 0 50px)" }}
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-10 md:grid-cols-3 gap-x-0">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  📌{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Create a &apos;Pin&apos;
              </h3>
              <p className="mt-4 text-base text-gray-600 max-w-3xs mx-auto">
                Start by creating a &apos;Pin&apos; to showcase your project or
                idea. It&apos;s quick and easy to get started.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  ✍️{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Add Details
              </h3>
              <p className="mt-4 text-base text-gray-600 max-w-3xs mx-auto">
                Provide all the necessary details about your project to attract
                attention and build interest.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                <span className="text-xl font-semibold text-gray-700">
                  {" "}
                  🫂{" "}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                Wait for People
              </h3>
              <p className="mt-4 text-base text-gray-600 max-w-3xs mx-auto">
                Sit back and wait for investors or developers to discover your
                project and collaborate with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
