import { ReactNode } from "react"

export const InfoMarker = ({children}: {children: ReactNode}) => {
  return (
    <div
      className="relative"
      style={{
        width: 32,
        height: 51
      }}
    >
      <span
        className="absolute text-xl"
        style={{
          left: "50%",
          marginTop: 3,
          transform: 'translateX(-50%)'
        }}
      >
        {children}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="51" viewBox="0 0 32 51" fill="none">
        <path d="M0.348659 10.0522C0.77436 4.38276 5.49854 0 11.1839 0H20.331C26.29 0 31.2415 4.59366 31.6877 10.5359C31.8956 13.3051 31.8956 16.0861 31.6877 18.8553L31.3699 23.0876C31.0601 27.2133 29.642 31.1789 27.2653 34.5655L16.4762 49.9395C16.2446 50.2697 15.7554 50.2697 15.5238 49.9395L4.41334 34.1077C2.24699 31.0207 0.95439 27.4061 0.672013 23.6454L0.348659 19.339C0.116546 16.2478 0.116546 13.1434 0.348659 10.0522Z" fill="#003049"/>
      </svg>
    </div>
  )
}
