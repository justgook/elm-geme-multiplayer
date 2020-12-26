// FullScreen API
function autoEnterFullScreen(targetNode: HTMLElement) {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        const target = targetNode || document.body

        function setUserInteraction() {
            const click = () => {
                target.requestFullscreen()
                target.removeEventListener("click", click)
            }
            target.addEventListener("click", click)
        }

        target.addEventListener("fullscreenchange", () => {
            if (!document.fullscreenElement) {
                setUserInteraction()
            }
        })

        // Enter Fullscreen or wait for user click
        target.requestFullscreen().catch(setUserInteraction)
    }
}
