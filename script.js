/* =========================================================
   FOMIXA 07 — FINAL PORTFOLIO SCRIPT
   =========================================================

   Folder Structure:

   FOMIXA_07_RESPONSIVE_FINAL/
   │
   ├── Advertising Design/
   │   ├── 1 (1).png
   │   ├── 1 (2).png
   │   ├── ...
   │   └── 1 (46).png
   │
   ├── Cover Design/
   │   ├── 1.png
   │   ├── 2.png
   │   ├── ...
   │   └── 57.png
   │
   ├── Social Media Design/
   │   ├── 1.png
   │   ├── 2.png
   │   ├── ...
   │   └── 137.png
   │
   ├── assets/
   │
   ├── index.html
   ├── style.css
   └── script.js

   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const portfolio = document.getElementById("portfolio");
const modal = document.getElementById("modal");
const media = document.getElementById("media");
const closeBtn = document.getElementById("close");


/* =========================================================
   CATEGORY NAMES
   ========================================================= */

const cats = {
  social: "Social Media Design",
  cover: "Cover Design",
  ads: "Advertising Design"
};


/* =========================================================
   FILE LISTS
   ========================================================= */


/* ---------------------------------------------------------
   SOCIAL MEDIA
   1 → 137
   --------------------------------------------------------- */

const socialFiles = Array.from(
  { length: 137 },
  (_, i) => `${i + 1}.png`
);


/* ---------------------------------------------------------
   COVER DESIGN
   1 → 57
   --------------------------------------------------------- */

const coverFiles = Array.from(
  { length: 57 },
  (_, i) => `${i + 1}.png`
);


/* ---------------------------------------------------------
   ADVERTISING DESIGN
   1 (1) → 1 (46)
   --------------------------------------------------------- */

const advertisingFiles = Array.from(
  { length: 46 },
  (_, i) => `1 (${i + 1}).png`
);


/* =========================================================
   ALL CATEGORIES
   ========================================================= */

const categoryFiles = {

  social: socialFiles,

  cover: coverFiles,

  ads: advertisingFiles

};


/* =========================================================
   FOLDER PATHS
   ========================================================= */

const folderPaths = {

  social: "Social Media Design",

  cover: "Cover Design",

  ads: "Advertising Design"

};


/* =========================================================
   HELPERS
   ========================================================= */


/* ---------------------------------------------------------
   Encode file path safely
   --------------------------------------------------------- */

function getFilePath(category, fileName) {

  const folder = folderPaths[category];

  return encodeURI(
    `${folder}/${fileName}`
  );

}


/* ---------------------------------------------------------
   Detect video
   --------------------------------------------------------- */

function isVideo(fileName) {

  return /\.(mp4|webm|ogg|mov)$/i.test(
    fileName
  );

}


/* ---------------------------------------------------------
   Detect image
   --------------------------------------------------------- */

function isImage(fileName) {

  return /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(
    fileName
  );

}


/* =========================================================
   CREATE MEDIA
   ========================================================= */

function createMediaElement(
  path,
  fileName,
  alt = ""
) {

  /* ---------------- VIDEO ---------------- */

  if (isVideo(fileName)) {

    const video =
      document.createElement("video");

    video.src = path;

    video.muted = true;

    video.loop = true;

    video.autoplay = true;

    video.playsInline = true;

    video.preload = "metadata";

    return video;

  }


  /* ---------------- IMAGE ---------------- */

  const img =
    document.createElement("img");

  img.src = path;

  img.alt = alt;

  img.loading = "lazy";

  img.decoding = "async";

  return img;

}


/* =========================================================
   CLEAR PORTFOLIO
   ========================================================= */

function clearPortfolio() {

  if (!portfolio) return;

  portfolio.innerHTML = "";

}


/* =========================================================
   RENDER MAIN FOLDERS
   ========================================================= */

function renderFolders() {

  if (!portfolio) return;

  clearPortfolio();


  Object.keys(categoryFiles).forEach(
    category => {

      const files =
        categoryFiles[category];


      /* ---------------- CARD ---------------- */

      const card =
        document.createElement("article");

      card.className =
        "folder-card show";


      /* ---------------- THUMB ---------------- */

      const thumb =
        document.createElement("div");

      thumb.className =
        "thumb";


      if (files.length > 0) {

        const firstFile =
          files[0];

        const path =
          getFilePath(
            category,
            firstFile
          );


        const image =
          createMediaElement(
            path,
            firstFile,
            cats[category]
          );


        image.onerror =
          function () {

            this.style.display =
              "none";

          };


        thumb.appendChild(image);

      }


      /* ---------------- COUNT ---------------- */

      const count =
        document.createElement("span");

      count.className =
        "count";


      count.textContent =
        `${files.length} ${
          files.length === 1
            ? "عمل"
            : "أعمال"
        }`;


      thumb.appendChild(count);


      /* ---------------- META ---------------- */

      const meta =
        document.createElement("div");

      meta.className =
        "meta";


      const title =
        document.createElement("h3");

      title.textContent =
        cats[category];


      const description =
        document.createElement("small");

      description.textContent =
        "اضغط لعرض كل الأعمال";


      meta.appendChild(title);

      meta.appendChild(description);


      /* ---------------- APPEND ---------------- */

      card.appendChild(thumb);

      card.appendChild(meta);


      /* ---------------- CLICK ---------------- */

      card.addEventListener(
        "click",
        () => {

          renderWorks(category);

        }
      );


      portfolio.appendChild(card);

    }
  );

}


/* =========================================================
   RENDER WORKS
   ========================================================= */

function renderWorks(category) {

  if (!portfolio) return;

  clearPortfolio();


  /* =======================================================
     BACK BUTTON
     ======================================================= */

  const back =
    document.createElement("button");

  back.className =
    "back-btn";

  back.type =
    "button";

  back.textContent =
    "← رجوع للأقسام";


  back.addEventListener(
    "click",
    renderFolders
  );


  portfolio.appendChild(back);


  /* =======================================================
     GET FILES
     ======================================================= */

  const files =
    categoryFiles[category] || [];


  /* =======================================================
     EMPTY
     ======================================================= */

  if (!files.length) {

    const empty =
      document.createElement("div");

    empty.className =
      "empty";

    empty.textContent =
      "لا توجد أعمال في هذا القسم حتى الآن.";


    portfolio.appendChild(empty);

    return;

  }


  /* =======================================================
     CREATE EVERY WORK
     ======================================================= */

  files.forEach(
    (fileName, index) => {

      const path =
        getFilePath(
          category,
          fileName
        );


      /* ---------------- CARD ---------------- */

      const card =
        document.createElement("article");

      card.className =
        "card show";


      /* ---------------- THUMB ---------------- */

      const thumb =
        document.createElement("div");

      thumb.className =
        "thumb";


      const image =
        createMediaElement(
          path,
          fileName,
          `${cats[category]} ${index + 1}`
        );


      /* ---------------------------------------------------
         If file doesn't exist
         --------------------------------------------------- */

      image.onerror =
        function () {

          card.classList.add(
            "file-missing"
          );

          card.style.display =
            "none";

        };


      thumb.appendChild(image);


      /* ===================================================
         META
         =================================================== */

      const meta =
        document.createElement("div");

      meta.className =
        "meta";


      const title =
        document.createElement("h3");


      title.textContent =
        `${cats[category]} #${index + 1}`;


      const categoryName =
        document.createElement("small");


      categoryName.textContent =
        cats[category];


      meta.appendChild(title);

      meta.appendChild(
        categoryName
      );


      /* ===================================================
         PREVIEW BUTTON
         =================================================== */

      const preview =
        document.createElement("button");

      preview.className =
        "preview";

      preview.type =
        "button";

      preview.textContent =
        "معاينة العمل ↗";


      preview.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          openModal(
            path,
            fileName
          );

        }
      );


      /* ===================================================
         IMAGE CLICK
         =================================================== */

      thumb.addEventListener(
        "click",
        () => {

          openModal(
            path,
            fileName
          );

        }
      );


      /* ===================================================
         APPEND
         =================================================== */

      card.appendChild(
        thumb
      );

      card.appendChild(
        meta
      );

      card.appendChild(
        preview
      );


      portfolio.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   MODAL
   ========================================================= */

function openModal(
  path,
  fileName
) {

  if (!modal || !media)
    return;


  /* Clear old media */

  media.innerHTML = "";


  /* Create new media */

  const element =
    createMediaElement(
      path,
      fileName,
      "FOMIXA 07"
    );


  /* =======================================================
     VIDEO SETTINGS
     ======================================================= */

  if (isVideo(fileName)) {

    element.controls =
      true;

    element.autoplay =
      true;

    element.muted =
      false;

  }


  /* =======================================================
     ERROR
     ======================================================= */

  element.onerror =
    function () {

      media.innerHTML =
        `
        <div class="empty">
          تعذر فتح التصميم.
        </div>
        `;

    };


  /* =======================================================
     SHOW
     ======================================================= */

  media.appendChild(
    element
  );


  modal.classList.add(
    "show"
  );


  document.body.classList.add(
    "modal-open"
  );

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

  if (!modal)
    return;


  modal.classList.remove(
    "show"
  );


  document.body.classList.remove(
    "modal-open"
  );


  if (media) {

    media.innerHTML =
      "";

  }

}


/* =========================================================
   CLOSE BUTTON
   ========================================================= */

if (closeBtn) {

  closeBtn.addEventListener(
    "click",
    closeModal
  );

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   HEADER SCROLL
   ========================================================= */

const header =
  document.querySelector(
    "header"
  );


window.addEventListener(
  "scroll",
  () => {

    if (!header)
      return;


    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );

  }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
  document.querySelector(
    ".menu-toggle"
  );


const navLinks =
  document.querySelector(
    ".nav-links"
  );


if (
  menuToggle &&
  navLinks
) {

  menuToggle.addEventListener(
    "click",
    () => {

      navLinks.classList.toggle(
        "mobile-open"
      );

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "mobile-open"
            );

          }
        );

      }
    );

}


/* =========================================================
   SECTION VISIBILITY
   ========================================================= */

document
  .querySelectorAll(
    ".section, .about, .contact"
  )
  .forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

renderFolders();


/* =========================================================
   DONE
   ========================================================= */

console.log(
  "FOMIXA 07 Portfolio Loaded Successfully."
);

console.log(
  "Social Media: 137 files"
);

console.log(
  "Cover Design: 57 files"
);

console.log(
  "Advertising Design: 46 files"
);