
import {FC, MutableRefObject, ReactNode, useEffect, useRef} from 'react'

import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock"

import {useUiContext} from "@context/UiContext";

interface Props {
  children: ReactNode,
}

const Sidebar: FC<Props> = ({ children }) => {

  const {isSidebarOpen, closeSidebar} = useUiContext()
  const ref = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    if (ref.current) {
        if (isSidebarOpen) {
          disableBodyScroll(ref.current)
        } else {
          enableBodyScroll(ref.current)
        }
    }

    return () => clearAllBodyScrollLocks()

  }, [isSidebarOpen]);


  return (
    <>
      { isSidebarOpen ? (
        <div ref={ref} className="fixed inset-0 overflow-hidden h-full z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div
              onClick={closeSidebar}
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
              <div className="h-full md:w-screen md:max-w-md">
                <div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">
                  {children}
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : null }
    </>
  )
}

export default Sidebar
