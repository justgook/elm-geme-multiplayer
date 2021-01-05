function autoEnterFullScreen(targetNode) {
  if (document.fullscreenEnabled && !document.fullscreenElement) {
    const target = targetNode || document.body;
    function setUserInteraction() {
      const click = () => {
        target.requestFullscreen();
        target.removeEventListener("click", click);
      };
      target.addEventListener("click", click);
    }
    target.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        setUserInteraction();
      }
    });
    target.requestFullscreen().catch(setUserInteraction);
  }
}
