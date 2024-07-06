

const nextConfig = {
    typescript: { ignoreBuildErrors: true },
    reactStrictMode: false,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
