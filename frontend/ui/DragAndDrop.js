export const initializeDragAndDrop = () => {
  const dialogs = document.querySelectorAll(".dialog");
  let startX;
  let startY;
  let scrollX;
  let scrollY;
  let isDown = false;

  dialogs.forEach((dialog) => {
    dialog.addEventListener("mousedown", (e) => {
      startX = e.clientX - dialog.getBoundingClientRect().left;
      startY = e.clientY - dialog.getBoundingClientRect().top;
      console.log({ startX, startY });
      isDown = true;
      dialog.style.cursor = "grabbing";
    });

    dialog.addEventListener("mouseup", () => {
      isDown = false;
      dialogs.forEach((dialog) => (dialog.style.cursor = "grab"));
    });

    dialog.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      // e.preventDefault();
      const x = e.clientX - dialog.offsetLeft;
      const y = e.clientY - dialog.offsetTop;

      console.log({ x, y });

      // dialog.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      dialog.style.transform = `translate(calc(${x}px - ${startX}px), calc(${y}px - ${startY}px))`;
      // dialog.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    });
  });
};
