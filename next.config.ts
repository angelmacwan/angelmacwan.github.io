import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'export', // Enables static exports
	images: {
		unoptimized: true, // Required for GitHub Pages hosting
	},
	// Optional: If you use trailing slashes for cleaner URLs
	// trailingSlash: true,
};

export default nextConfig;
