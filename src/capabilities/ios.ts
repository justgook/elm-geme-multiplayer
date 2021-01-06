export function iOS(): boolean {
    return (
        ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    )
}

function swipeEndOnce(callback: () => void) {
    let isScrolling: number

    function done() {
        callback()
        window.removeEventListener("scroll", handler, false)
    }

    function handler() {
        window.clearTimeout(isScrolling)
        isScrolling = window.setTimeout(done, 66)
    }

    window.addEventListener("scroll", handler, false)
}

export function initOverlay(): void {
    function checkSwipe() {
        console.log("checkSwipe")
        if (window.innerHeight === (window.innerHeight > window.innerWidth ? window.screen.height : window.screen.width)) {
            console.log("checkSwipe::disableSwipe")
            disableSwipe()
        } else {
            console.log("checkSwipe::enableSwipe")
            enableSwipe()
        }
    }

    function enableSwipe() {
        window.scrollTo(0, 0)
        document.documentElement.classList.add("swipe")
        document.body.classList.add("swipe")
        swipeEndOnce(disableSwipe)
    }

    function disableSwipe() {
        window.scrollTo(0, 0)
        console.log("disableSwipe")
        if (window.innerHeight === (window.innerHeight > window.innerWidth ? window.screen.height : window.screen.width)) {
            document.documentElement.classList.remove("swipe")
            document.body.classList.remove("swipe")
        } else {
            requestAnimationFrame(() => swipeEndOnce(disableSwipe))
        }
    }

    checkSwipe()
    window.addEventListener("resize", checkSwipe)
}

//mobile fixes and ios
document.addEventListener("gesturestart", (e: Event) => e.preventDefault(), false)
