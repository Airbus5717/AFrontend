const pagesToObserve = {
  courses: "academy-courses-show",
  contents: "academy-contents-show",
  account: "academy-user-account",
  userCourses: "academy-user-account-courses",
  category: "academy-categories-show",
  profile: "profile-page",
  level: "teacher-page",
};

const elmntsToBeRemoved = {
  ".no-cards": "category",
};

const observer = new MutationObserver((mutations, observer) =>
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList")
      if (mutation.addedNodes.length === 0) return;
    const node = mutation.addedNodes[0];
    if (!node || !node.querySelector) return;

    redirect(redirects);

    let pageName = getPageName(location.pathname);

    tryCatch(header);

    // check the activatibility of header link
    tryCatch(headerLinks);

    if (document.querySelector(".app-layout footer.footer")) {
      if (document.querySelector(".app-layout footer.footer .container .row")) {
        tryCatch(Footer);
      }
    }

    // add style to main tag based on page
    tryCatch(() => addStyle(pagesToObserve, pageName));

    tryCatch(auth);

    tryCatch(cards);
    // clear the styles of main, if the page is unknown
    if (pageName === "unknown") {
      tryCatch(() => clearOther(pagesToObserve));
    }

    switch (pageName) {
      case "courses":
        courseInfo();
        break;
      case "contents":
        courseContent();
        break;
      case "category":
        category();
        tryCatch(() =>
          window.addEventListener("popstate", function (e) {
            if (e.state.url.startsWith("/categories")) {
              let main = this.document.querySelector("main");
              main.classList.add("academy-categories-show");

              if (main) {
                if (
                  main.children.length === 0 &&
                  !main.querySelector(".no-courses")
                ) {
                  category();
                }
              }
            }
          })
        );
        break;
      case "level":
        level();
        break;
      case "userCourses":
        userCourses();
        break;
    }
  })
);
observer.observe(document.body, { subtree: true, childList: true });
