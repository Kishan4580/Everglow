export default function Loading() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 72 72"
      width="72"
      height="72"
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: " 100%",
        transform: "translate3d(0px, 0px, 0px)",
        contentVisibility: "visible",
      }}
    >
      <defs>
        <clipPath id="__lottie_element_2">
          <rect width="72" height="72" x="0" y="0"></rect>
        </clipPath>
      </defs>
      <g clipPath="url(#__lottie_element_2)">
        <g
          transform="matrix(0.6924399733543396,0,0,0.6924399733543396,0.3780021667480469,-1.8719978332519531)"
          opacity="1"
          style={{ display: "block" }}
        >
          <g
            opacity="1"
            transform="matrix(0.9258300065994263,0,0,0.9258300065994263,50.45500183105469,50.292999267578125)"
          >
            <path
              fill="#DFD7C7"
              fillOpacity="1"
              d=" M-37.5,5.75 C-45.20136642456055,5.9983015060424805 -50.28499984741211,9.850000381469727 -50.25,16.75 C-50.20500183105469,25.457000732421875 -50.25,31.5 -50.25,31.5 C-50.25,31.5 -50.42100143432617,37.95600128173828 -50.25,44.75 C-49.95500183105469,56.457000732421875 -37.25,55.770999908447266 -37.25,55.770999908447266 C-37.25,55.770999908447266 -15.508000373840332,55.89099884033203 -11.75,55.75 C-3.9549999237060547,55.457000732421875 0.25,51.900001525878906 0.25,45 C0.25,45 0.375,39.900001525878906 0.375,39.900001525878906 C0.41999998688697815,32.707000732421875 3.2939999103546143,30.957000732421875 9.949999809265137,31 C9.949999809265137,31 39.125,31 39.125,31 C46.41999816894531,30.832000732421875 49.55699920654297,21.577999114990234 49.75,17.25 C49.91999816894531,13.456999778747559 47.54499816894531,5.331999778747559 39.25,5.125 C39.25,5.125 33.41999816894531,5.206999778747559 30.375,4.75 C28.086999893188477,4.4070000648498535 26.54400062561035,2.4560000896453857 25.304000854492188,-0.09799999743700027 C24.440000534057617,-1.878000020980835 24.327999114990234,-7.645999908447266 24.327999114990234,-7.645999908447266 C24.327999114990234,-7.645999908447266 24.360000610351562,-21.736000061035156 24.25,-25.25 C24.045000076293945,-31.792999267578125 13.54772663116455,-44.736751556396484 -0.5,-44.75 C-14.159284591674805,-44.763893127441406 -25.8290958404541,-43.34814453125 -38.710655212402344,-42.64128875732422 C-51.05150604248047,-42.566768646240234 -51.744476318359375,-18.898475646972656 -37.69971466064453,-18.859399795532227 C-21.31131935119629,-18.183443069458008 -22.45606231689453,5.249248027801514 -37.5,5.75z"
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,0.22699999809265137,0.07699999958276749)"
          >
            <path fill="rgb(0,237,100)" fillOpacity="1" d=" M53.25,49"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

const SmallLoading = () => {
  return (
    <div className=" h-25 w-25 flex justify-center items-center">
      <svg
        className="  size-1/4 animate-spin "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75 bg-blue-700"
          fill="#1447e6"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};
export { SmallLoading };

// rotate animation {
//     transform: rotate(10.6686deg);
// }
// .product-add-to-cart-loading:after {
//     -webkit-animation: rotate 1s infinite;
//     animation: rotate 1s infinite;
//     -webkit-animation-timing-function:
// linear;
//     animation-timing-function:
// linear;
//     border: solid 1px var(--wp--preset--color--primary);
//     border-radius: 50%;
//     border-right-color: var(--wp--preset--color--accent-border);
//     border-bottom-color: var(--wp--preset--color--accent-border);
//     content: "";
//     display: inline-block;
//     background-color: transparent;
//     margin: 0;
//     margin-left: 0px;
//     margin-right: 0px;
//     width: 16px;
//     height: 16px;
//     position: relative;
//     top: 1px;
//     right: 0;
// }

const RainbowLoading = () => {
  return (
    <svg viewBox="0 0 200 200" fill="none">
      <defs>
        <linearGradient id="part1">
          <stop offset="0%" stop-color="#03162600"></stop>
          <stop offset="100%" stop-color="#03162600"></stop>
        </linearGradient>
        <linearGradient id="part2">
          <stop offset="0%" stop-color="#031626"></stop>
          <stop offset="100%" stop-color="#03162600"></stop>
        </linearGradient>
        <linearGradient id="part3" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#025FB1"></stop>
          <stop offset="100%" stop-color="#031626"></stop>
        </linearGradient>
        <linearGradient id="part4">
          <stop offset="0%" stop-color="#025FB1"></stop>
          <stop offset="100%" stop-color="#0088FF"></stop>
        </linearGradient>
        <linearGradient id="part5" gradientTransform="rotate(45)">
          <stop offset="0%" stop-color="#0088FF"></stop>
          <stop offset="100%" stop-color="#9933FF"></stop>
        </linearGradient>
        <linearGradient id="part6" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#9933FF"></stop>
          <stop offset="100%" stop-color="#FF006E"></stop>
        </linearGradient>
        <linearGradient id="part7" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#FF006E"></stop>
          <stop offset="100%" stop-color="#FF006E"></stop>
        </linearGradient>
      </defs>
      <g stroke="currentColor" stroke-width="28">
        <path
          stroke="url(#part1)"
          d=" M 184 100 A 84 84 0 0 1 126 180"
          stroke-linecap="round"
        ></path>
        <path
          stroke="url(#part2)"
          d=" M 126 180 A 84 84 0 0 1 32 149"
          stroke-dasharray="106"
          stroke-linecap="round"
        >
          <animate
            attributeName="strokeDashoffset"
            keyTimes="0; 0.4; 0.5; 0.6; 1"
            values="106; 106; 212; 106; 106"
            dur="2.6s"
            repeatCount="indefinite"
          ></animate>
        </path>
        <path
          stroke="url(#part3)"
          d=" M 32 149 A 84 84 0 0 1 32 51"
          stroke-dasharray="105"
          stroke-linecap="round"
        >
          <animate
            attributeName="strokeDashoffset"
            keyTimes="0; 0.3; 0.4; 0.6; 0.7;  1"
            values="105; 105; 210; 210; 105; 105"
            dur="2.6s"
            repeatCount="indefinite"
          ></animate>
        </path>
        <path
          stroke="url(#part4)"
          d=" M 32 51 A 84 84 0 0 1 126 20"
          stroke-dasharray="106"
          stroke-linecap="round"
        >
          <animate
            attributeName="strokeDashoffset"
            keyTimes="0; 0.2; 0.3; 0.7; 0.8; 1"
            values="106; 106; 212; 212; 106; 106    "
            dur="2.6s"
            repeatCount="indefinite"
          ></animate>
        </path>
        <path
          stroke="url(#part5)"
          d=" M 126 20 A 84 84 0 0 1 180 74"
          stroke-dasharray="80"
          stroke-linecap="round"
        >
          <animate
            attributeName="strokeDashoffset"
            keyTimes="0; 0.1; 0.2; 0.8; 0.9; 1"
            values="80; 80; 160; 160; 80; 80"
            dur="2.6s"
            repeatCount="indefinite"
          ></animate>
        </path>
        <path
          stroke="url(#part7)"
          stroke-linecap="round"
          d=" M 184 97 A 84 84 0 0 1 184 99"
        ></path>
        <path
          stroke="url(#part6)"
          d=" M 180 74 A 84 84 0 0 1 184 100"
          stroke-dasharray="25"
          stroke-linecap="round"
        >
          <animate
            attributeName="strokeDashoffset"
            keyTimes="0; 0.1; 0.9; 1"
            values="35; 50; 50; 35"
            dur="2.6s"
            repeatCount="indefinite"
          ></animate>
        </path>
      </g>
    </svg>
  );
};
