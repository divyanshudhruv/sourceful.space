/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'zduscsbntjgsqtjtusok.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/project-covers/**',
      },
    ],
  },
};

export default nextConfig;
