/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "zduscsbntjgsqtjtusok.supabase.co"
    ],
  },
};

export default nextConfig;

