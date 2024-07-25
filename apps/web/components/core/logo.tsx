

import { useTheme } from "next-themes";


/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <svg
        width="118"
        height="40.44"
        viewBox="0 0 357.853 74.44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="svgGroup"
          strokeLinecap="round"
          fillRule="evenodd"
          fontSize="8pt"
          stroke="#8b5ac6"
          strokeWidth="0.50mm"
          fill="#7c3aed"
          style={{ stroke: "#8b5cf6", strokeWidth: "0.20mm", fill: "#7c3aed" }}
        >
          <path
            d="M 11.397 74.159 A 140.622 140.622 0 0 0 12.253 74.4 Q 13.54 74.456 14.952 74.434 A 58.048 58.048 0 0 0 17.253 74.35 A 47.861 47.861 0 0 0 19.53 74.171 A 37.195 37.195 0 0 0 22.203 73.8 Q 23.926 73.494 24.74 73.188 A 2.91 2.91 0 0 0 25.153 73 A 7.238 7.238 0 0 0 25.576 72.803 A 6.075 6.075 0 0 0 26.403 72.3 A 2.396 2.396 0 0 1 26.465 72.257 Q 26.833 72.006 27.423 71.796 A 8.716 8.716 0 0 1 28.053 71.6 A 1.625 1.625 0 0 0 28.188 71.606 Q 29.065 71.606 30.22 70.693 A 10.283 10.283 0 0 0 31.003 70 A 16.305 16.305 0 0 0 31.657 69.328 Q 32.892 67.982 33.453 66.7 A 7.69 7.69 0 0 0 33.696 65.644 Q 33.809 64.935 33.809 64.152 A 11.265 11.265 0 0 0 33.803 63.8 A 11.097 11.097 0 0 0 33.678 62.462 A 13.599 13.599 0 0 0 33.203 60.45 A 11.215 11.215 0 0 0 32.649 59.036 A 13.521 13.521 0 0 0 31.453 57 Q 30.853 55.7 29.103 54 A 23.265 23.265 0 0 0 28.492 53.428 Q 27.678 52.692 26.69 51.928 A 43.931 43.931 0 0 0 24.653 50.45 Q 21.953 48.6 18.553 46.7 A 48.72 48.72 0 0 1 18.31 46.555 Q 14.572 44.322 12.053 41.9 A 26.909 26.909 0 0 1 11.107 40.946 Q 9.969 39.737 9.401 38.771 A 4.718 4.718 0 0 1 8.953 37.8 A 3.992 3.992 0 0 1 8.691 36.934 Q 8.499 35.916 8.727 34.583 A 11.866 11.866 0 0 1 8.953 33.55 Q 9.653 30.9 11.353 28.6 A 109.73 109.73 0 0 1 12.272 27.067 Q 13.021 25.839 13.717 24.78 A 55.421 55.421 0 0 1 15.003 22.9 A 14.83 14.83 0 0 1 16.514 21.098 A 10.96 10.96 0 0 1 18.653 19.4 Q 20.015 18.816 20.578 18.149 A 1.611 1.611 0 0 0 20.953 17.4 A 0.382 0.382 0 0 1 21.023 17.313 Q 21.253 17.083 22.162 16.476 A 44.972 44.972 0 0 1 22.503 16.25 A 114.72 114.72 0 0 1 23.473 15.622 Q 23.99 15.291 24.57 14.926 A 230.286 230.286 0 0 1 26.053 14 L 30.253 11.4 A 95.955 95.955 0 0 1 31.507 10.636 Q 32.105 10.279 32.644 9.97 A 46.35 46.35 0 0 1 33.853 9.3 A 49.843 49.843 0 0 1 34.272 9.079 Q 35.141 8.626 35.434 8.528 A 0.429 0.429 0 0 1 35.553 8.5 A 1.032 1.032 0 0 0 35.607 8.512 Q 35.888 8.567 35.941 8.393 A 0.319 0.319 0 0 0 35.953 8.3 L 35.953 8 A 0.098 0.098 0 0 1 35.982 7.938 Q 36.112 7.787 36.845 7.566 A 14.467 14.467 0 0 1 37.253 7.45 A 29.026 29.026 0 0 1 37.893 7.286 Q 38.987 7.018 40.403 6.75 Q 42.253 6.4 43.803 6.2 Q 45.353 6 45.953 6.2 A 2.528 2.528 0 0 1 46.223 6.255 Q 47.735 6.654 47.36 8.8 A 7.112 7.112 0 0 1 47.253 9.3 A 10.668 10.668 0 0 1 46.912 10.393 Q 46.255 12.176 44.797 14.569 A 52.912 52.912 0 0 1 43.353 16.8 A 76.106 76.106 0 0 0 42.729 17.508 Q 41.272 19.181 40.637 20.137 A 5.488 5.488 0 0 0 40.303 20.7 Q 39.96 21.388 39.831 21.958 A 2.92 2.92 0 0 0 39.753 22.6 Q 39.7 23.614 39.945 24.129 A 0.853 0.853 0 0 0 40.603 24.65 A 1.234 1.234 0 0 0 40.665 24.658 Q 41.641 24.763 44.353 23.6 A 13.747 13.747 0 0 0 46.911 21.731 A 18.652 18.652 0 0 0 49.003 19.45 Q 51.153 16.7 52.253 13.55 A 15.171 15.171 0 0 0 52.293 13.434 Q 52.977 11.423 52.921 9.72 A 6.936 6.936 0 0 0 52.653 8 A 9.685 9.685 0 0 0 52.488 7.054 A 7.763 7.763 0 0 0 51.003 3.9 Q 49.653 2.2 47.603 1.15 Q 45.553 0.1 43.053 0 A 9.931 9.931 0 0 0 42.914 0.001 Q 41.101 0.026 38.632 0.709 A 35.588 35.588 0 0 0 36.153 1.5 Q 33.266 2.531 29.197 4.366 A 198.553 198.553 0 0 0 25.253 6.2 Q 23.253 8.1 21.553 8.8 Q 19.853 9.5 19.353 9.8 L 19.103 9.8 A 0.231 0.231 0 0 0 18.941 9.866 Q 18.855 9.946 18.798 10.124 A 1.612 1.612 0 0 0 18.753 10.3 L 17.853 11.15 A 91.814 91.814 0 0 0 17.41 11.572 A 80.311 80.311 0 0 0 16.153 12.8 A 7.622 7.622 0 0 0 15.849 13.004 Q 15.159 13.492 14.262 14.323 A 33.259 33.259 0 0 0 13.353 15.2 A 59.343 59.343 0 0 0 12.01 16.589 A 73.295 73.295 0 0 0 9.853 19 A 63.247 63.247 0 0 0 8.962 20.063 A 54.711 54.711 0 0 0 6.603 23.15 A 38.49 38.49 0 0 0 6.473 23.336 Q 5.567 24.633 5.011 25.662 A 11.644 11.644 0 0 0 4.553 26.6 A 12.055 12.055 0 0 0 3.733 28.484 A 13.799 13.799 0 0 0 3.053 32 Q 2.853 35 3.653 37.65 Q 4.453 40.3 6.053 41.8 A 10.082 10.082 0 0 0 6.686 42.778 Q 7.548 43.965 8.953 45.3 Q 10.953 47.2 13.203 48.75 Q 14.645 49.743 15.819 50.428 A 21.935 21.935 0 0 0 17.053 51.1 Q 18.453 51.8 19.703 52.4 Q 20.953 53 22.453 53.7 A 3397.184 3397.184 0 0 0 22.594 53.833 Q 24.385 55.53 25.203 56.3 A 26.991 26.991 0 0 1 25.471 56.556 Q 25.889 56.96 26.176 57.277 A 7.009 7.009 0 0 1 26.453 57.6 A 3.294 3.294 0 0 1 26.577 57.765 Q 26.745 58.004 26.893 58.3 A 6.147 6.147 0 0 1 27.153 58.9 A 11.214 11.214 0 0 1 27.196 58.965 Q 28.244 60.593 28.244 61.845 A 2.569 2.569 0 0 1 27.903 63.15 A 3.733 3.733 0 0 1 27.353 63.868 Q 26.528 64.726 24.929 65.542 A 21.349 21.349 0 0 1 23.253 66.3 Q 19.653 67.9 15.703 68.05 A 22.871 22.871 0 0 1 14.835 68.067 Q 13.709 68.067 12.651 67.952 A 16.249 16.249 0 0 1 8.603 67 Q 5.453 65.8 4.153 63.5 A 17.089 17.089 0 0 0 3.998 63.178 Q 3.487 62.149 3.084 61.727 A 1.195 1.195 0 0 0 2.803 61.5 Q 2.353 61.254 1.534 61.746 A 5.219 5.219 0 0 0 1.153 62 A 8.091 8.091 0 0 0 0.853 62.143 Q 0.046 62.551 0.003 62.85 A 0.29 0.29 0 0 0 0.002 62.857 Q -0.032 63.152 0.431 64.21 A 22.636 22.636 0 0 0 0.653 64.7 A 12.302 12.302 0 0 0 0.959 65.334 Q 1.316 66.027 1.853 66.9 Q 2.653 68.2 3.903 69.55 Q 5.153 70.9 6.653 71.8 A 5.51 5.51 0 0 1 7.04 71.848 Q 7.519 71.926 7.811 72.079 A 0.997 0.997 0 0 1 8.103 72.3 Q 8.386 72.623 8.31 73.012 A 1.055 1.055 0 0 1 8.253 73.2 L 9.353 73.55 A 42.311 42.311 0 0 0 9.593 73.625 Q 10.35 73.861 11.397 74.159 Z M 213.353 63.7 L 212.253 62.8 Q 211.796 62.343 211.673 61.844 A 1.563 1.563 0 0 1 211.653 61.75 A 2.118 2.118 0 0 1 211.62 61.404 Q 211.617 61.175 211.658 60.923 A 3.71 3.71 0 0 1 211.753 60.5 L 214.053 53.9 Q 215.653 50.3 216.253 48.65 Q 216.853 47 216.853 46.55 A 1.01 1.01 0 0 0 216.846 46.425 Q 216.808 46.12 216.561 46.197 A 0.455 0.455 0 0 0 216.553 46.2 A 3.064 3.064 0 0 0 216.072 46.306 Q 215.572 46.454 214.878 46.784 A 18.364 18.364 0 0 0 214.153 47.15 A 11.095 11.095 0 0 0 213.381 47.598 Q 212.636 48.074 212.248 48.535 A 2.325 2.325 0 0 0 212.053 48.8 Q 211.7 48.8 211.034 49.503 A 8.44 8.44 0 0 0 210.853 49.7 A 9.146 9.146 0 0 1 209.827 50.681 A 12.031 12.031 0 0 1 208.853 51.4 Q 208.153 52.6 206.103 54.5 Q 204.053 56.4 202.053 58.4 A 16.19 16.19 0 0 0 200.607 59.796 A 21.114 21.114 0 0 0 199.503 61.1 A 101.856 101.856 0 0 0 198.622 62.244 Q 197.935 63.15 197.403 63.9 Q 196.589 65.05 196.279 65.098 A 0.17 0.17 0 0 1 196.253 65.1 Q 194.953 65.1 193.903 64.4 A 3.363 3.363 0 0 1 192.943 63.402 Q 192.588 62.85 192.353 62.1 Q 191.642 60.589 192.195 58.012 A 15.058 15.058 0 0 1 192.353 57.35 Q 193.153 54.3 194.153 49.4 Q 194.553 47.9 194.653 47.2 A 7.883 7.883 0 0 1 194.862 46.214 A 9.346 9.346 0 0 1 195.003 45.75 Q 195.244 45.028 195.855 43.518 A 114.354 114.354 0 0 1 195.903 43.4 Q 196.553 41.802 197.95 38.607 A 430.225 430.225 0 0 0 197.953 38.6 Q 198.506 37.099 198.716 36.191 A 6.437 6.437 0 0 0 198.803 35.75 Q 198.952 34.808 198.953 34.407 A 2.179 2.179 0 0 0 198.953 34.4 A 3.021 3.021 0 0 1 199.074 33.53 A 2.484 2.484 0 0 1 199.503 32.7 Q 200.053 32 200.853 31.7 Q 201.653 31.4 202.353 31.6 A 3.406 3.406 0 0 1 204.018 32.424 A 4.339 4.339 0 0 1 204.303 32.7 Q 205.084 33.526 205.232 34.942 A 6.173 6.173 0 0 1 205.253 35.2 A 7.114 7.114 0 0 1 205.278 35.713 Q 205.284 36.259 205.199 36.748 A 4.623 4.623 0 0 1 205.053 37.35 Q 204.753 38.3 204.453 39.1 L 203.353 41.8 A 28.099 28.099 0 0 0 203.085 42.413 Q 202.653 43.425 202.053 45 Q 201.253 47.1 200.653 48.85 Q 200.105 50.449 200.058 50.837 A 0.531 0.531 0 0 0 200.053 50.9 Q 200.153 51.2 200.753 50.75 A 13.901 13.901 0 0 0 201.163 50.43 Q 201.65 50.034 202.303 49.45 Q 203.253 48.6 204.253 47.8 A 38.408 38.408 0 0 1 207.401 45.121 A 45.264 45.264 0 0 1 209.003 43.95 Q 211.653 42.1 214.053 40.8 A 45.657 45.657 0 0 1 215.185 40.206 Q 216.373 39.605 217.217 39.285 A 8.986 8.986 0 0 1 217.753 39.1 Q 219.113 39.1 219.801 39.484 A 1.573 1.573 0 0 1 220.103 39.7 A 29.085 29.085 0 0 1 220.481 40.056 Q 221.147 40.694 222.353 41.9 A 2.72 2.72 0 0 1 223.101 43.334 A 3.565 3.565 0 0 1 223.153 43.7 A 7.975 7.975 0 0 1 223.187 44.422 A 7.009 7.009 0 0 1 223.053 45.8 A 6.396 6.396 0 0 1 223.002 45.99 Q 222.871 46.451 222.516 47.556 A 178.337 178.337 0 0 1 222.453 47.75 Q 221.953 49.3 221.503 50.7 L 221.053 52.1 L 222.203 51.1 Q 223.353 50.1 224.753 48.95 A 280.694 280.694 0 0 0 225.41 48.409 Q 226.041 47.887 226.487 47.511 A 61.595 61.595 0 0 0 226.853 47.2 Q 230.753 44.2 233.653 43.4 Q 236.496 42.616 238.282 45.388 A 7.899 7.899 0 0 1 238.353 45.5 A 4.619 4.619 0 0 1 239.042 46.28 Q 239.571 47.047 239.603 47.9 Q 239.649 49.097 239.653 51.906 A 381.426 381.426 0 0 1 239.653 52.4 Q 239.753 53.7 239.853 55.5 Q 239.953 57.3 240.103 58.75 Q 240.253 60.2 240.453 60.5 Q 240.726 60.864 241.455 61.104 A 4.873 4.873 0 0 0 241.603 61.15 A 10.024 10.024 0 0 0 242.188 61.301 Q 242.88 61.46 243.823 61.596 A 31.211 31.211 0 0 0 243.853 61.6 A 3.35 3.35 0 0 1 244.528 61.756 Q 244.915 61.893 245.177 62.124 A 1.552 1.552 0 0 1 245.653 62.9 A 1.306 1.306 0 0 1 245.701 63.245 Q 245.701 64.158 244.353 65 Q 242.853 65.9 241.053 65.8 A 13.211 13.211 0 0 1 239.36 65.601 A 9.861 9.861 0 0 1 237.853 65.2 Q 237.362 65.003 236.386 64.226 A 20.82 20.82 0 0 1 236.353 64.2 A 3.824 3.824 0 0 1 235.659 63.457 Q 235.114 62.708 234.681 61.527 A 12.625 12.625 0 0 1 234.653 61.45 Q 233.986 59.59 233.955 56.319 A 33.939 33.939 0 0 1 233.953 56 Q 234.03 53.703 234.077 52.168 A 635.553 635.553 0 0 0 234.103 51.3 A 6.917 6.917 0 0 0 234.106 51.201 Q 234.121 50.205 233.826 49.829 A 0.571 0.571 0 0 0 233.353 49.6 Q 232.661 49.6 230.885 50.76 A 28.082 28.082 0 0 0 230.303 51.15 Q 228.053 52.7 225.153 55.3 A 89.428 89.428 0 0 0 221.489 58.784 A 106.83 106.83 0 0 0 219.253 61.1 A 62.171 62.171 0 0 1 217.842 62.604 A 53.357 53.357 0 0 1 217.303 63.15 Q 216.353 64.1 215.453 64.35 Q 214.756 64.544 213.879 64.047 A 4.918 4.918 0 0 1 213.353 63.7 Z M 53.153 40.5 L 55.853 34.7 L 51.853 33.6 Q 51.153 33.4 50.703 32.8 A 3.704 3.704 0 0 1 50.496 32.495 Q 50.305 32.18 50.265 31.931 A 0.808 0.808 0 0 1 50.253 31.8 A 1.856 1.856 0 0 1 50.357 31.216 Q 50.529 30.7 50.985 30.073 A 7.946 7.946 0 0 1 51.153 29.85 A 10.605 10.605 0 0 1 51.473 29.459 Q 52.128 28.7 52.453 28.7 Q 52.953 28.8 54.303 28.8 Q 55.653 28.8 56.953 28.7 Q 57.98 28.621 58.383 28.542 A 1.433 1.433 0 0 0 58.553 28.5 A 3.411 3.411 0 0 0 59.003 28.228 A 4.436 4.436 0 0 0 59.353 27.95 A 1.663 1.663 0 0 0 59.684 27.545 Q 59.796 27.357 59.881 27.123 A 3.338 3.338 0 0 0 59.953 26.9 Q 60.453 25.8 60.853 24.85 A 14.235 14.235 0 0 1 61.196 24.102 Q 61.396 23.695 61.642 23.249 A 26.375 26.375 0 0 1 61.953 22.7 Q 62.435 21.806 62.798 21.102 A 55.865 55.865 0 0 0 63.103 20.5 Q 63.448 19.811 64.115 18.712 A 62.942 62.942 0 0 1 64.553 18 Q 64.936 17.464 65.378 16.752 A 36.068 36.068 0 0 0 65.653 16.3 Q 66.253 15.3 67.153 14.6 Q 68 13.847 68.892 13.847 A 2.123 2.123 0 0 1 69.003 13.85 A 2.048 2.048 0 0 1 69.616 13.99 Q 70.185 14.205 70.897 14.746 A 11.215 11.215 0 0 1 71.453 15.2 Q 72.253 16.2 72.353 16.7 Q 72.444 17.156 71.706 18.358 A 14.056 14.056 0 0 1 71.553 18.6 A 33.738 33.738 0 0 1 69.962 21.575 A 37.085 37.085 0 0 1 69.703 22 Q 68.653 23.7 67.753 25.4 Q 66.153 27.6 67.153 27.9 A 1.768 1.768 0 0 0 67.424 27.955 Q 68.671 28.121 72.753 27.5 Q 75.181 27.082 76.487 27.539 A 2.746 2.746 0 0 1 76.953 27.75 A 2.912 2.912 0 0 1 78.352 29.644 A 4.324 4.324 0 0 1 78.453 30.2 A 11.993 11.993 0 0 1 78.503 30.671 Q 78.647 32.36 78.146 32.935 A 0.858 0.858 0 0 1 77.953 33.1 Q 77.153 33.6 73.353 33.6 A 43.037 43.037 0 0 1 71.652 33.851 Q 70.827 33.954 70.107 34.006 A 20.34 20.34 0 0 1 69.253 34.05 Q 67.617 34.098 66.814 34.1 A 27.152 27.152 0 0 1 66.753 34.1 A 87.305 87.305 0 0 1 66.228 34.139 Q 65.366 34.2 65.053 34.2 Q 64.653 34.2 63.853 34.4 A 3.106 3.106 0 0 0 63.387 34.554 Q 62.941 34.744 62.703 35.05 Q 62.468 35.352 62.21 35.813 A 11.826 11.826 0 0 0 61.953 36.3 Q 61.606 36.647 60.957 37.975 A 31.857 31.857 0 0 0 60.753 38.4 Q 59.96 40.087 58.772 42.069 A 57.83 57.83 0 0 1 58.753 42.1 Q 57.353 46.3 56.353 50.45 A 100.226 100.226 0 0 0 54.992 57.029 A 89.083 89.083 0 0 0 54.753 58.5 A 17.048 17.048 0 0 0 54.652 59.228 Q 54.477 60.736 54.702 61.556 A 1.956 1.956 0 0 0 54.853 61.95 Q 55.353 62.9 57.453 63.1 Q 58.484 63.194 60.699 63.068 A 68.396 68.396 0 0 0 61.003 63.05 A 31.311 31.311 0 0 0 62.432 62.932 Q 63.891 62.775 64.853 62.5 Q 65.953 62 67.153 61.45 A 24.117 24.117 0 0 0 68.575 60.743 A 20.017 20.017 0 0 0 69.353 60.3 Q 70.253 59.8 71.153 59.25 L 72.053 58.7 A 2.075 2.075 0 0 1 72.233 58.452 Q 72.613 58.007 73.047 58.155 A 0.857 0.857 0 0 1 73.153 58.2 A 1.283 1.283 0 0 1 73.542 58.513 Q 73.826 58.838 74.053 59.422 A 6.01 6.01 0 0 1 74.153 59.7 A 6.414 6.414 0 0 1 73.948 61.279 A 8.134 8.134 0 0 1 73.653 62.2 Q 73.153 63.5 69.953 65.3 A 30.64 30.64 0 0 1 66.75 67.053 Q 64.076 68.302 61.703 68.65 Q 57.953 69.2 55.353 68.7 A 3.982 3.982 0 0 1 54.311 68.348 Q 53.868 68.13 53.417 67.796 A 7.587 7.587 0 0 1 53.103 67.55 Q 51.953 66.6 51.103 65.35 Q 50.253 64.1 49.953 63.1 A 0.428 0.428 0 0 0 49.927 62.96 Q 49.884 62.838 49.773 62.688 A 2.072 2.072 0 0 0 49.703 62.6 L 49.453 62.3 A 0.558 0.558 0 0 1 49.295 62.071 Q 49.051 61.506 49.006 59.774 A 27.117 27.117 0 0 1 49.003 59.65 A 32.098 32.098 0 0 1 48.996 58.967 Q 48.996 57.927 49.06 56.785 A 51.15 51.15 0 0 1 49.253 54.4 A 62.591 62.591 0 0 1 49.451 52.705 Q 49.678 50.969 49.953 49.8 Q 50.453 48.2 51.453 45.45 A 156.334 156.334 0 0 0 52.325 42.993 Q 52.724 41.834 53.059 40.795 A 91.922 91.922 0 0 0 53.153 40.5 Z M 318.352 64.68 A 7.77 7.77 0 0 0 319.753 64.8 A 4.479 4.479 0 0 0 320.346 64.61 Q 321.394 64.186 321.553 63.35 A 1.616 1.616 0 0 0 321.582 63.047 Q 321.582 62.383 321.045 61.662 A 5.162 5.162 0 0 0 320.553 61.1 Q 320.197 60.744 319.858 60.246 A 9.226 9.226 0 0 1 319.403 59.5 A 7.605 7.605 0 0 1 319.263 59.233 Q 319.065 58.837 318.941 58.465 A 4.077 4.077 0 0 1 318.753 57.65 A 2.841 2.841 0 0 1 318.749 57.611 Q 318.687 57.011 318.938 56.855 A 0.4 0.4 0 0 1 319.153 56.8 L 319.153 56.75 L 319.153 56.3 A 1.009 1.009 0 0 1 319.022 56.292 Q 318.945 56.282 318.886 56.259 A 0.274 0.274 0 0 1 318.703 56.05 L 318.653 55.8 A 0.618 0.618 0 0 0 318.811 55.66 Q 319.095 55.314 319.26 54.369 A 10.945 10.945 0 0 0 319.353 53.7 Q 319.553 51.9 319.503 49.7 Q 319.453 47.5 319.053 46.2 Q 318.953 45.8 318.903 45.4 Q 318.853 45 318.853 44.6 A 2.064 2.064 0 0 0 318.758 44.314 Q 318.558 43.831 318.074 43.236 A 9.887 9.887 0 0 0 317.553 42.65 Q 316.453 41.5 315.203 40.65 Q 314.354 40.072 313.712 39.887 A 2.027 2.027 0 0 0 313.153 39.8 A 0.929 0.929 0 0 0 313.147 39.8 Q 312.845 39.802 312.266 39.999 A 10.154 10.154 0 0 0 311.853 40.15 A 22.024 22.024 0 0 0 311.519 40.283 A 19.622 19.622 0 0 0 310.153 40.9 A 3.949 3.949 0 0 0 309.563 41.075 Q 308.621 41.425 307.103 42.35 A 65.257 65.257 0 0 0 306.343 42.821 A 58.031 58.031 0 0 0 303.253 44.9 A 72.014 72.014 0 0 0 302.638 45.349 Q 301.703 46.039 301.234 46.443 A 5.23 5.23 0 0 0 300.953 46.7 Q 300.153 47.2 298.803 48.15 Q 298.044 48.684 297.38 49.14 A 92.996 92.996 0 0 1 296.403 49.8 L 295.353 50.5 A 1.643 1.643 0 0 1 295.36 50.36 Q 295.387 50.04 295.534 49.6 A 7.146 7.146 0 0 1 295.703 49.15 Q 296.053 48.3 296.753 46.7 Q 298.839 43.32 299.606 41.051 A 8.807 8.807 0 0 0 300.003 39.45 A 6.07 6.07 0 0 0 300.06 38.624 Q 300.06 37.393 299.55 36.198 A 8.222 8.222 0 0 0 298.553 34.5 Q 297.653 33.3 296.553 32.95 A 2.436 2.436 0 0 0 296.324 32.889 Q 295.681 32.751 295.146 33.031 A 2.03 2.03 0 0 0 294.653 33.4 A 0.831 0.831 0 0 0 294.187 33.54 A 1.123 1.123 0 0 0 293.953 33.75 A 1.08 1.08 0 0 0 293.837 33.913 Q 293.723 34.11 293.729 34.321 A 0.816 0.816 0 0 0 293.753 34.5 Q 293.628 36 293.367 37.188 A 11.969 11.969 0 0 1 293.003 38.5 Q 292.453 40.1 291.053 42.5 A 145.713 145.713 0 0 0 290.96 42.714 Q 290.63 43.472 290.267 44.327 A 249.757 249.757 0 0 0 289.503 46.15 Q 288.912 47.575 288.636 48.59 A 8.277 8.277 0 0 0 288.453 49.4 A 14.59 14.59 0 0 0 288.179 49.827 Q 287.59 50.781 287.303 51.6 A 3.823 3.823 0 0 1 287.182 51.907 Q 287.016 52.276 286.82 52.448 A 0.547 0.547 0 0 1 286.453 52.6 A 5.503 5.503 0 0 0 286.372 52.82 Q 286.225 53.24 285.988 54.053 A 76.595 76.595 0 0 0 285.803 54.7 Q 285.353 56.3 285.053 57.9 Q 284.819 59.15 284.768 59.729 A 3.167 3.167 0 0 0 284.753 60 A 2.032 2.032 0 0 0 284.871 60.202 Q 285.112 60.569 285.644 61.14 A 16.129 16.129 0 0 0 285.653 61.15 Q 286.353 61.9 287.053 62.7 Q 288.053 63.5 288.603 63.85 Q 289.153 64.2 289.953 63.8 A 0.941 0.941 0 0 0 290.237 63.757 Q 290.676 63.62 290.99 63.037 A 3.591 3.591 0 0 0 291.203 62.55 A 2.907 2.907 0 0 1 291.22 62.504 Q 291.577 61.564 292.89 59.995 A 32.628 32.628 0 0 1 293.853 58.9 Q 296.653 56.5 299.803 54.3 Q 302.953 52.1 305.853 50.25 A 546.463 546.463 0 0 1 306.453 49.868 Q 308.943 48.284 310.553 47.3 A 9.408 9.408 0 0 1 310.926 47.101 Q 312.009 46.554 312.706 46.599 A 1.36 1.36 0 0 1 313.003 46.65 A 0.929 0.929 0 0 1 313.514 47.051 Q 313.771 47.436 313.882 48.16 A 7.316 7.316 0 0 1 313.953 48.9 A 53.643 53.643 0 0 0 313.96 49.779 A 44.038 44.038 0 0 0 314.003 51.15 Q 314.053 52.2 313.653 52.6 A 0.963 0.963 0 0 0 313.617 52.667 Q 313.415 53.074 313.368 54.022 A 12.706 12.706 0 0 0 313.353 54.65 A 20.677 20.677 0 0 0 313.388 55.841 A 25.189 25.189 0 0 0 313.603 57.95 Q 313.853 59.7 314.253 61.1 A 10.252 10.252 0 0 0 314.608 61.816 Q 315.399 63.261 316.453 63.95 A 4.505 4.505 0 0 0 316.849 64.181 Q 317.52 64.528 318.352 64.68 Z M 251.209 69.508 A 4.373 4.373 0 0 0 251.753 69.4 A 2.164 2.164 0 0 0 252.07 69.208 A 1.381 1.381 0 0 0 252.653 68.25 A 5.477 5.477 0 0 0 252.679 68.007 Q 252.735 67.378 252.749 66.071 A 90.971 90.971 0 0 0 252.753 65.1 Q 252.753 63.17 253.395 60.383 A 47.156 47.156 0 0 1 254.103 57.7 Q 255.453 53.1 257.053 47.6 Q 258.328 44.173 258.587 42.842 A 2.996 2.996 0 0 0 258.653 42.3 L 258.703 41.75 A 1.282 1.282 0 0 1 258.721 41.621 Q 258.773 41.356 258.931 41.258 A 0.413 0.413 0 0 1 259.153 41.2 A 2.294 2.294 0 0 0 259.288 41.054 Q 259.405 40.914 259.48 40.775 A 1.076 1.076 0 0 0 259.603 40.4 Q 259.653 40 259.653 39.6 Q 259.653 39.4 260.153 38.15 A 94.149 94.149 0 0 1 260.49 37.32 Q 260.671 36.88 260.876 36.392 A 186.249 186.249 0 0 1 261.403 35.15 Q 262.153 33.4 262.853 31.85 A 138.005 138.005 0 0 1 263.165 31.165 Q 263.647 30.113 263.953 29.5 A 34.816 34.816 0 0 1 264.198 28.789 Q 264.319 28.453 264.434 28.156 A 16.904 16.904 0 0 1 264.703 27.5 A 7.947 7.947 0 0 0 264.829 27.196 Q 264.976 26.82 265.026 26.553 A 1.37 1.37 0 0 0 265.053 26.3 A 0.395 0.395 0 0 1 265.054 26.283 Q 265.072 25.863 265.953 24.15 A 39.409 39.409 0 0 0 266.397 23.259 A 45.132 45.132 0 0 0 267.653 20.4 A 13406.468 13406.468 0 0 0 267.722 20.256 Q 269.57 16.366 270.453 14.5 A 47.165 47.165 0 0 0 270.827 13.692 Q 271.205 12.853 271.437 12.234 A 10.185 10.185 0 0 0 271.653 11.6 A 5.891 5.891 0 0 0 271.673 11.533 Q 271.817 11.03 271.887 10.453 A 9.584 9.584 0 0 0 271.953 9.3 A 18.206 18.206 0 0 0 271.95 8.968 Q 271.941 8.48 271.906 8.045 A 10.22 10.22 0 0 0 271.803 7.2 Q 271.653 6.3 270.853 5.6 L 269.653 4.4 L 269.253 4 Q 268.853 4 268.403 4.1 Q 267.953 4.2 267.653 4.5 A 2.814 2.814 0 0 0 267.39 4.512 Q 266.785 4.569 266.453 4.9 Q 266.175 5.178 266.09 5.65 A 2.55 2.55 0 0 0 266.053 6.1 A 0.777 0.777 0 0 1 266.053 6.13 Q 266.036 6.563 265.558 8.134 A 63.125 63.125 0 0 1 265.303 8.95 A 136.841 136.841 0 0 1 264.791 10.521 Q 264.512 11.358 264.19 12.298 A 288.768 288.768 0 0 1 263.353 14.7 Q 262.153 18.1 260.803 21.6 Q 259.453 25.1 258.303 27.95 A 95.729 95.729 0 0 1 257.783 29.215 Q 256.987 31.108 256.453 32.1 A 1.345 1.345 0 0 1 256.379 32.538 A 1.758 1.758 0 0 1 256.203 32.9 A 1.83 1.83 0 0 0 256.061 33.175 A 1.374 1.374 0 0 0 255.953 33.7 A 1.372 1.372 0 0 1 255.952 33.761 Q 255.935 34.148 255.703 34.75 Q 255.453 35.4 255.453 35.9 Q 255.053 36.3 254.703 37.3 Q 254.512 37.847 254.425 38.334 A 4.376 4.376 0 0 0 254.353 39.1 A 3.292 3.292 0 0 1 254.324 39.538 A 3.678 3.678 0 0 1 254.053 40.5 A 2.743 2.743 0 0 1 253.983 40.653 Q 253.707 41.2 253.353 41.2 Q 253.191 41.525 252.731 42.675 A 127.923 127.923 0 0 0 252.503 43.25 A 53.742 53.742 0 0 0 252.461 43.357 Q 251.831 44.968 251.153 47 A 200.555 200.555 0 0 0 250.81 48.041 A 177.65 177.65 0 0 0 249.853 51.05 A 67.354 67.354 0 0 0 249.594 51.912 Q 249.206 53.234 249.053 54 A 3.502 3.502 0 0 1 249.052 54.104 Q 249.038 54.554 248.912 55.175 A 12.974 12.974 0 0 1 248.753 55.85 A 16.118 16.118 0 0 1 248.591 56.428 A 18.411 18.411 0 0 1 247.953 58.2 A 35.469 35.469 0 0 0 247.786 59.02 Q 247.305 61.531 247.313 63.552 A 15.071 15.071 0 0 0 247.353 64.6 A 11.327 11.327 0 0 0 247.54 66.003 Q 247.688 66.736 247.932 67.327 A 4.473 4.473 0 0 0 248.703 68.6 A 3.338 3.338 0 0 0 248.795 68.7 Q 249.754 69.699 251.209 69.508 Z M 156.853 42.4 L 156.853 41.8 A 0.89 0.89 0 0 1 156.909 41.517 Q 157.056 41.089 157.591 40.375 A 13.181 13.181 0 0 1 157.803 40.1 A 28.876 28.876 0 0 1 158.721 39.002 Q 159.366 38.266 160.153 37.45 Q 161.553 36 163.053 34.65 A 29.596 29.596 0 0 1 163.941 33.881 Q 164.768 33.194 165.406 32.791 A 7.599 7.599 0 0 1 165.553 32.7 A 10.992 10.992 0 0 1 168.091 31.428 A 9.436 9.436 0 0 1 169.903 31 A 6.29 6.29 0 0 1 170.618 30.945 Q 170.671 30.944 170.724 30.944 A 4.661 4.661 0 0 1 173.753 32 L 174.753 33 A 33.23 33.23 0 0 0 175.414 33.641 Q 175.755 33.964 176.141 34.314 A 56.405 56.405 0 0 0 176.403 34.55 A 898.559 898.559 0 0 1 178.338 36.286 A 3717.915 3717.915 0 0 0 178.353 36.3 L 182.053 39.6 L 180.253 44.6 A 19.486 19.486 0 0 0 179.661 46.848 Q 179.143 49.475 179.603 51.6 Q 180.253 54.6 181.553 56.8 A 3.594 3.594 0 0 0 182.118 57.661 Q 182.429 58.019 182.86 58.367 A 8.708 8.708 0 0 0 183.603 58.9 Q 184.952 59.77 186.187 60.035 A 5.39 5.39 0 0 0 186.553 60.1 A 3.219 3.219 0 0 1 187.965 60.639 A 3.796 3.796 0 0 1 188.053 60.7 A 1.596 1.596 0 0 1 188.674 61.629 Q 188.753 61.93 188.753 62.3 Q 188.753 63.044 188.532 63.566 A 2.02 2.02 0 0 1 188.353 63.9 Q 188.022 64.397 187.279 64.619 A 3.587 3.587 0 0 1 186.953 64.7 Q 183.911 65.069 181.251 63.398 A 10.551 10.551 0 0 1 180.803 63.1 A 12.579 12.579 0 0 1 178.604 61.093 Q 176.997 59.267 175.553 56.5 Q 175.153 55.9 174.503 54.25 A 56.51 56.51 0 0 1 174.279 53.672 Q 173.941 52.786 173.813 52.339 A 3.116 3.116 0 0 1 173.753 52.1 A 90.418 90.418 0 0 1 173.527 52.381 Q 173.197 52.791 172.626 53.493 A 885.665 885.665 0 0 1 172.253 53.95 Q 171.163 55.288 170.564 55.889 A 8.395 8.395 0 0 1 170.553 55.9 Q 163.453 63.1 158.303 65.55 A 15.733 15.733 0 0 1 156.376 66.324 Q 152.496 67.574 149.753 65.8 A 4.039 4.039 0 0 0 149.334 65.127 A 3.064 3.064 0 0 0 148.753 64.55 A 2.75 2.75 0 0 1 148.505 64.342 Q 148.253 64.101 148.182 63.876 A 0.58 0.58 0 0 1 148.153 63.7 A 7.195 7.195 0 0 0 148.134 63.18 A 8.664 8.664 0 0 0 148.103 62.85 Q 148.053 62.4 147.653 62 Q 147.199 61.455 147.652 59.632 A 13.851 13.851 0 0 1 147.753 59.25 A 25.78 25.78 0 0 1 148.26 57.654 Q 148.547 56.835 148.921 55.91 A 60.924 60.924 0 0 1 149.753 53.95 Q 151.153 50.8 153.053 47.3 Q 153.733 46.62 154.413 45.58 A 16.69 16.69 0 0 0 154.653 45.2 A 28.114 28.114 0 0 1 155.006 44.64 Q 155.547 43.806 155.853 43.5 A 1.069 1.069 0 0 1 156.026 42.922 A 1.451 1.451 0 0 1 156.153 42.75 A 1.123 1.123 0 0 1 156.387 42.54 A 0.831 0.831 0 0 1 156.853 42.4 Z M 134.153 65.9 Q 132.053 67.7 129.303 68 A 10.427 10.427 0 0 1 128.172 68.062 A 10.332 10.332 0 0 1 123.953 67.15 Q 121.353 66 119.653 63.6 Q 117.953 61.4 117.453 58.55 A 17.336 17.336 0 0 1 117.254 56.947 Q 117.058 54.502 117.353 51.1 A 17.712 17.712 0 0 1 118.565 45.96 A 22.496 22.496 0 0 1 119.853 43.25 Q 122.053 39.3 125.203 36.2 A 24.617 24.617 0 0 1 127.706 34.031 Q 129.088 32.996 130.461 32.332 A 13.317 13.317 0 0 1 131.453 31.9 A 8.375 8.375 0 0 1 132.225 31.44 Q 133.169 30.948 133.902 30.948 A 2.123 2.123 0 0 1 134.003 30.95 Q 135.034 30.999 137.174 31.193 A 213.46 213.46 0 0 1 137.253 31.2 A 19.603 19.603 0 0 1 138.456 31.392 Q 139.64 31.623 140.411 31.96 A 4.762 4.762 0 0 1 140.703 32.1 Q 141.853 32.7 142.553 33.7 Q 143.712 34.859 144.274 35.988 A 5.538 5.538 0 0 1 144.553 36.65 A 9.099 9.099 0 0 1 145.005 38.62 A 8.015 8.015 0 0 1 145.053 39.5 A 6.935 6.935 0 0 1 144.568 41.026 Q 143.931 42.483 142.569 44.26 A 28.413 28.413 0 0 1 142.103 44.85 A 18.328 18.328 0 0 1 137.522 48.856 A 22.557 22.557 0 0 1 135.453 50 A 13.155 13.155 0 0 1 132.326 50.579 Q 131.512 50.633 130.653 50.6 A 9.866 9.866 0 0 1 128.707 50.341 Q 127.369 50.017 126.353 49.3 A 5.898 5.898 0 0 0 125.887 49.125 Q 125.006 48.839 124.462 49.031 A 1.111 1.111 0 0 0 123.853 49.55 A 3.529 3.529 0 0 0 123.596 50.151 Q 123.245 51.178 122.932 53.287 A 57.347 57.347 0 0 0 122.753 54.6 A 21.932 21.932 0 0 0 122.669 55.628 Q 122.544 57.784 122.947 59.167 A 4.527 4.527 0 0 0 123.353 60.15 Q 124.353 61.9 126.053 62.2 Q 127.702 62.53 128.773 62.69 A 23.622 23.622 0 0 0 129.203 62.75 A 2.39 2.39 0 0 0 129.513 62.77 Q 130.554 62.77 131.994 61.934 A 10.777 10.777 0 0 0 132.053 61.9 A 66.796 66.796 0 0 1 132.611 61.555 Q 133.71 60.883 134.042 60.754 A 1.044 1.044 0 0 1 134.053 60.75 A 2.112 2.112 0 0 0 134.395 60.587 A 1.574 1.574 0 0 0 134.703 60.35 L 135.953 59.1 A 46.298 46.298 0 0 1 136.285 58.772 Q 136.753 58.313 137.053 58.05 A 1.426 1.426 0 0 1 137.499 57.779 A 1.301 1.301 0 0 1 137.953 57.7 A 1.084 1.084 0 0 1 138.62 57.932 A 1.619 1.619 0 0 1 138.853 58.15 Q 139.177 58.514 139.501 58.715 A 1.927 1.927 0 0 0 139.653 58.8 A 1.193 1.193 0 0 1 139.905 58.824 Q 140.53 58.959 140.162 59.864 A 3.41 3.41 0 0 1 140.103 60 A 6.107 6.107 0 0 1 139.657 60.794 Q 139.138 61.586 138.253 62.535 A 22.424 22.424 0 0 1 137.953 62.85 Q 136.353 64.5 134.153 65.9 Z M 346.953 65.9 Q 344.853 67.7 342.103 68 A 10.427 10.427 0 0 1 340.972 68.062 A 10.332 10.332 0 0 1 336.753 67.15 Q 334.153 66 332.453 63.6 Q 330.753 61.4 330.253 58.55 A 17.336 17.336 0 0 1 330.054 56.947 Q 329.858 54.502 330.153 51.1 A 17.712 17.712 0 0 1 331.365 45.96 A 22.496 22.496 0 0 1 332.653 43.25 Q 334.853 39.3 338.003 36.2 A 24.617 24.617 0 0 1 340.506 34.031 Q 341.888 32.996 343.261 32.332 A 13.317 13.317 0 0 1 344.253 31.9 A 8.375 8.375 0 0 1 345.025 31.44 Q 345.969 30.948 346.702 30.948 A 2.123 2.123 0 0 1 346.803 30.95 Q 347.834 30.999 349.974 31.193 A 213.46 213.46 0 0 1 350.053 31.2 A 19.603 19.603 0 0 1 351.256 31.392 Q 352.44 31.623 353.211 31.96 A 4.762 4.762 0 0 1 353.503 32.1 Q 354.653 32.7 355.353 33.7 Q 356.512 34.859 357.074 35.988 A 5.538 5.538 0 0 1 357.353 36.65 A 9.099 9.099 0 0 1 357.805 38.62 A 8.015 8.015 0 0 1 357.853 39.5 A 6.935 6.935 0 0 1 357.368 41.026 Q 356.731 42.483 355.369 44.26 A 28.413 28.413 0 0 1 354.903 44.85 A 18.328 18.328 0 0 1 350.322 48.856 A 22.557 22.557 0 0 1 348.253 50 A 13.155 13.155 0 0 1 345.126 50.579 Q 344.312 50.633 343.453 50.6 A 9.866 9.866 0 0 1 341.507 50.341 Q 340.169 50.017 339.153 49.3 A 5.898 5.898 0 0 0 338.687 49.125 Q 337.806 48.839 337.262 49.031 A 1.111 1.111 0 0 0 336.653 49.55 A 3.529 3.529 0 0 0 336.396 50.151 Q 336.045 51.178 335.732 53.287 A 57.347 57.347 0 0 0 335.553 54.6 A 21.932 21.932 0 0 0 335.469 55.628 Q 335.344 57.784 335.747 59.167 A 4.527 4.527 0 0 0 336.153 60.15 Q 337.153 61.9 338.853 62.2 Q 340.502 62.53 341.573 62.69 A 23.622 23.622 0 0 0 342.003 62.75 A 2.39 2.39 0 0 0 342.313 62.77 Q 343.354 62.77 344.794 61.934 A 10.777 10.777 0 0 0 344.853 61.9 A 66.796 66.796 0 0 1 345.411 61.555 Q 346.51 60.883 346.842 60.754 A 1.044 1.044 0 0 1 346.853 60.75 A 2.112 2.112 0 0 0 347.195 60.587 A 1.574 1.574 0 0 0 347.503 60.35 L 348.753 59.1 A 46.298 46.298 0 0 1 349.085 58.772 Q 349.553 58.313 349.853 58.05 A 1.426 1.426 0 0 1 350.299 57.779 A 1.301 1.301 0 0 1 350.753 57.7 A 1.084 1.084 0 0 1 351.42 57.932 A 1.619 1.619 0 0 1 351.653 58.15 Q 351.977 58.514 352.301 58.715 A 1.927 1.927 0 0 0 352.453 58.8 A 1.193 1.193 0 0 1 352.705 58.824 Q 353.33 58.959 352.962 59.864 A 3.41 3.41 0 0 1 352.903 60 A 6.107 6.107 0 0 1 352.457 60.794 Q 351.938 61.586 351.053 62.535 A 22.424 22.424 0 0 1 350.753 62.85 Q 349.153 64.5 346.953 65.9 Z M 82.453 65.9 Q 81.553 65.2 81.203 64.5 A 1.469 1.469 0 0 1 81.092 64.18 Q 80.911 63.413 81.153 61.8 A 50.962 50.962 0 0 1 81.454 59.474 Q 81.672 58.059 81.953 56.85 A 248.787 248.787 0 0 1 82.429 54.844 Q 82.677 53.817 82.96 52.675 A 435.485 435.485 0 0 1 83.153 51.9 Q 83.346 50.741 84.239 47.997 A 98.428 98.428 0 0 1 84.303 47.8 Q 85.253 44.9 86.653 41.5 Q 88.053 38.1 89.453 35.05 Q 90.607 32.536 91.489 31.075 A 15.264 15.264 0 0 1 91.853 30.5 A 2.572 2.572 0 0 1 93.222 29.996 Q 93.349 29.986 93.482 29.986 A 3.71 3.71 0 0 1 93.803 30 Q 94.953 30.1 95.753 30.9 A 1.742 1.742 0 0 1 96.369 31.985 Q 96.515 32.814 96.103 34.05 Q 95.353 36.3 93.053 41.1 L 91.253 45.15 Q 90.692 46.413 90.743 46.713 A 0.182 0.182 0 0 0 90.753 46.75 Q 90.841 46.969 91.468 46.611 A 5.499 5.499 0 0 0 91.653 46.5 A 5.904 5.904 0 0 1 92.126 45.778 Q 92.753 44.947 93.853 43.95 A 58.935 58.935 0 0 1 97.197 41.144 A 63.795 63.795 0 0 1 97.253 41.1 Q 99.053 39.7 100.653 38.6 A 64.917 64.917 0 0 1 101.305 38.157 Q 102.385 37.434 102.853 37.2 A 7.826 7.826 0 0 1 103.891 36.659 A 9.98 9.98 0 0 1 104.703 36.35 A 30.627 30.627 0 0 0 105.187 36.185 Q 105.838 35.955 106.14 35.807 A 2.659 2.659 0 0 0 106.153 35.8 A 8.697 8.697 0 0 1 108.783 35.004 Q 109.304 34.936 109.829 34.936 A 8.248 8.248 0 0 1 110.853 35 Q 113.253 35.3 113.853 36.8 A 2.118 2.118 0 0 0 113.983 37.323 A 1.508 1.508 0 0 0 114.503 38 L 115.053 38.4 A 0.799 0.799 0 0 1 115.212 38.414 Q 115.464 38.466 115.503 38.7 L 115.553 39 Q 115.553 39.577 114.84 39.78 A 2.543 2.543 0 0 1 114.503 39.85 Q 113.79 39.952 112.822 40.031 A 51.552 51.552 0 0 1 111.853 40.1 A 9.038 9.038 0 0 0 110.637 40.273 A 6.761 6.761 0 0 0 109.553 40.6 Q 108.553 41 107.153 41.6 A 395.991 395.991 0 0 0 101.65 44.844 A 349.008 349.008 0 0 0 99.903 45.9 A 27.911 27.911 0 0 0 95.895 48.887 A 35.718 35.718 0 0 0 93.253 51.5 Q 92.553 52.3 91.853 53.4 Q 91.153 54.5 90.353 55.8 A 1.859 1.859 0 0 0 90.096 56.138 Q 89.724 56.738 89.353 58 A 55.384 55.384 0 0 0 88.737 60.267 A 46.988 46.988 0 0 0 88.503 61.25 A 60.091 60.091 0 0 0 88.384 61.787 Q 88.153 62.856 88.153 63.1 L 87.853 64.05 A 5.542 5.542 0 0 1 87.27 65.304 A 6.887 6.887 0 0 1 86.853 65.9 A 9.664 9.664 0 0 1 86.352 66.519 Q 85.534 67.439 84.932 67.496 A 0.833 0.833 0 0 1 84.853 67.5 A 1.255 1.255 0 0 1 84.38 67.39 Q 83.707 67.111 82.678 66.121 A 16.682 16.682 0 0 1 82.453 65.9 Z M 172.553 44.5 L 174.753 40.9 A 14.111 14.111 0 0 0 174.179 39.721 Q 173.541 38.563 172.847 37.948 A 3.548 3.548 0 0 0 172.603 37.75 A 6.822 6.822 0 0 0 172.001 37.349 Q 171.366 36.977 170.858 36.913 A 1.644 1.644 0 0 0 170.653 36.9 A 2.17 2.17 0 0 0 169.875 37.069 Q 168.676 37.538 166.803 39.3 A 32.768 32.768 0 0 0 164.842 41.325 Q 163.166 43.2 161.353 45.7 A 76.304 76.304 0 0 0 157.256 52.006 A 88.735 88.735 0 0 0 155.853 54.5 A 57.558 57.558 0 0 0 154.701 56.941 A 48.523 48.523 0 0 0 154.103 58.35 L 153.353 60.2 A 0.293 0.293 0 0 0 153.573 60.499 Q 154.041 60.66 155.503 60.15 Q 157.175 59.567 159.057 58.229 A 24.22 24.22 0 0 0 160.153 57.4 Q 163.553 54.5 167.003 51 A 67.048 67.048 0 0 0 169.584 48.239 Q 170.822 46.832 171.814 45.516 A 35.475 35.475 0 0 0 172.553 44.5 Z M 265.75 64.636 A 4.444 4.444 0 0 0 266.753 66.2 Q 267.996 67.588 268.731 67.588 A 0.671 0.671 0 0 0 269.203 67.4 A 1.776 1.776 0 0 0 269.517 66.971 Q 270.138 65.86 270.853 62.6 A 6.388 6.388 0 0 0 271.253 61.852 A 7.957 7.957 0 0 0 271.653 60.75 A 32.566 32.566 0 0 0 271.864 59.977 A 27.317 27.317 0 0 0 272.153 58.75 A 19.01 19.01 0 0 1 272.192 58.569 Q 272.312 58.027 272.431 57.646 A 4.853 4.853 0 0 1 272.553 57.3 Q 272.953 56 273.503 54.55 Q 273.881 53.553 274.189 52.863 A 14.082 14.082 0 0 1 274.453 52.3 A 10.637 10.637 0 0 1 274.517 51.954 Q 274.623 51.426 274.792 50.844 A 19.166 19.166 0 0 1 275.203 49.6 Q 275.753 48.1 276.153 47.3 A 28.669 28.669 0 0 0 276.176 47.25 Q 276.885 45.696 277.213 44.48 A 8.678 8.678 0 0 0 277.453 43.3 Q 277.553 42.5 277.403 41.9 A 2.103 2.103 0 0 0 276.853 40.9 A 20.447 20.447 0 0 0 276.71 40.675 Q 275.81 39.275 275.253 38.95 A 1.156 1.156 0 0 0 274.897 38.818 Q 274.338 38.705 273.453 39 A 3.613 3.613 0 0 0 273.095 39.039 Q 272.266 39.175 271.991 39.691 A 1.275 1.275 0 0 0 271.853 40.3 A 4.632 4.632 0 0 1 271.839 40.356 Q 271.745 40.713 271.427 41.742 A 188.752 188.752 0 0 1 271.253 42.3 A 558.967 558.967 0 0 1 270.921 43.359 Q 270.535 44.588 270.053 46.1 Q 269.353 48.3 268.553 50.55 A 83.802 83.802 0 0 1 268.184 51.569 Q 267.88 52.388 267.592 53.109 A 43.998 43.998 0 0 1 267.053 54.4 Q 266.753 55.3 266.453 56.3 Q 266.193 57.167 266.234 57.583 A 0.806 0.806 0 0 0 266.253 57.7 A 0.956 0.956 0 0 1 266.282 57.933 Q 266.282 58.229 266.103 58.55 Q 265.931 58.859 265.878 59.334 A 4.155 4.155 0 0 0 265.853 59.8 A 3.853 3.853 0 0 0 265.712 60.119 Q 265.568 60.486 265.477 60.924 A 7.273 7.273 0 0 0 265.353 61.8 Q 265.253 63 265.603 64.2 A 5.433 5.433 0 0 0 265.75 64.636 Z M 134.053 44.7 A 9.396 9.396 0 0 0 135.142 44.11 Q 135.735 43.74 136.353 43.25 A 11.256 11.256 0 0 0 138.129 41.504 A 10.304 10.304 0 0 0 138.403 41.15 A 6.822 6.822 0 0 0 138.805 40.547 Q 139.176 39.913 139.24 39.405 A 1.644 1.644 0 0 0 139.253 39.2 A 2.684 2.684 0 0 0 138.379 37.206 A 4.04 4.04 0 0 0 137.953 36.85 A 2.746 2.746 0 0 0 136.913 36.393 Q 135.898 36.169 134.444 36.502 A 10.745 10.745 0 0 0 134.053 36.6 A 4.511 4.511 0 0 0 133.224 36.925 Q 132.837 37.119 132.419 37.4 A 11.414 11.414 0 0 0 131.553 38.05 Q 130.153 39.2 128.903 40.6 A 34.257 34.257 0 0 0 128.036 41.608 Q 127.372 42.413 126.903 43.1 Q 126.234 44.082 126.321 44.347 A 0.133 0.133 0 0 0 126.353 44.4 A 0.895 0.895 0 0 0 126.619 44.668 Q 127.058 44.972 128.053 45.15 Q 129.403 45.391 131.079 45.307 A 18.443 18.443 0 0 0 131.203 45.3 Q 132.463 45.228 133.386 44.949 A 5.372 5.372 0 0 0 134.053 44.7 Z M 346.853 44.7 A 9.396 9.396 0 0 0 347.942 44.11 Q 348.535 43.74 349.153 43.25 A 11.256 11.256 0 0 0 350.929 41.504 A 10.304 10.304 0 0 0 351.203 41.15 A 6.822 6.822 0 0 0 351.605 40.547 Q 351.976 39.913 352.04 39.405 A 1.644 1.644 0 0 0 352.053 39.2 A 2.684 2.684 0 0 0 351.179 37.206 A 4.04 4.04 0 0 0 350.753 36.85 A 2.746 2.746 0 0 0 349.713 36.393 Q 348.698 36.169 347.244 36.502 A 10.745 10.745 0 0 0 346.853 36.6 A 4.511 4.511 0 0 0 346.024 36.925 Q 345.637 37.119 345.219 37.4 A 11.414 11.414 0 0 0 344.353 38.05 Q 342.953 39.2 341.703 40.6 A 34.257 34.257 0 0 0 340.836 41.608 Q 340.172 42.413 339.703 43.1 Q 339.034 44.082 339.121 44.347 A 0.133 0.133 0 0 0 339.153 44.4 A 0.895 0.895 0 0 0 339.419 44.668 Q 339.858 44.972 340.853 45.15 Q 342.203 45.391 343.879 45.307 A 18.443 18.443 0 0 0 344.003 45.3 Q 345.263 45.228 346.186 44.949 A 5.372 5.372 0 0 0 346.853 44.7 Z M 276.071 25.13 A 3.2 3.2 0 0 0 276.453 25.6 A 6.051 6.051 0 0 0 276.882 25.909 Q 277.835 26.531 278.715 26.531 A 2.453 2.453 0 0 0 279.103 26.5 A 2.162 2.162 0 0 0 279.634 26.339 Q 280.665 25.884 281.853 24.3 A 28.073 28.073 0 0 0 282.521 23.453 Q 283.319 22.398 283.73 21.605 A 4.927 4.927 0 0 0 284.053 20.85 Q 284.36 19.891 283.902 18.549 A 8.136 8.136 0 0 0 283.553 17.7 A 8.923 8.923 0 0 0 283.069 16.998 Q 282.708 16.528 282.33 16.185 A 3.888 3.888 0 0 0 281.403 15.55 A 2.532 2.532 0 0 0 281.271 15.491 Q 280.185 15.046 279.053 15.8 A 1.25 1.25 0 0 0 278.677 15.963 A 1.493 1.493 0 0 0 278.353 16.25 A 1.451 1.451 0 0 0 278.226 16.422 A 1.069 1.069 0 0 0 278.053 17 A 2.3 2.3 0 0 1 278.084 17.379 Q 278.084 18.121 277.634 19.002 A 7.2 7.2 0 0 1 277.153 19.8 A 12.283 12.283 0 0 1 277.121 19.847 Q 276.041 21.401 275.253 21.5 A 0.165 0.165 0 0 0 275.127 21.555 Q 274.979 21.716 275.053 22.35 Q 275.153 23.2 275.553 24.15 A 6.994 6.994 0 0 0 275.747 24.572 Q 275.902 24.881 276.071 25.13 Z"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </>
  );
};

export default Logo;