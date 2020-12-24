(() => {
  const API_TOKEN = "https://api.github.com/users/",
    form = document.getElementById("search_form"),
    input = document.getElementById("search_input"),
    output = document.getElementById("user_results"),
    form_container = document.getElementById("form_container");

  const search_users = async (username) => {
    try {
      const { data } = await axios(API_TOKEN + username)

      append_data(data);
    } catch (err) {
      if (err.response.status == 404) {
        setTimeout(() => {
          errBlock()
        }, 150);
      }
    }
  }


  function append_data(userData) {
    const output_text = `
      <div class="top_results">
        <div class="user_avatar left_pane" id="user_avatar">
          <img src="${userData.avatar_url}" alt="${userData.login}">
        </div>
        <div class="right_pane user_details" id="user_details">
          <a href="${userData.html_url}" target="_blank" class="user_name">${userData.name}</a>
          <div class="username">${userData.login}</div>
          <div class="user_bio">${userData.bio}</div>
        </div>
      </div>

      <div class="bottom_results">
        <div class="repositories" id="repositories">${userData.public_repos} Repositories</div>
        <span>•</span>
        <div class="followers" id="followers">${userData.followers} Followers</div>
        <span>•</span>
        <div class="following" id="following">${userData.following} Following</div>
      </div>
    `;

    output.innerHTML = output_text;
    form_container.classList.remove("inactive");
    setTimeout(() => {
      output.classList.add("results_active");
    }, 150);
  }

  function errBlock() {
    let errTarget = document.getElementById("errBlock");
    errTarget.classList.add("error_fortune")

    errTarget.addEventListener("click", (e) => {
      e.target.classList.remove("error_fortune")
    })
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let search_data = input.value;

    console.log(search_data)
    output.classList.remove("results_active")
    if (search_data === "" || search_data === " ") {
      form_container.classList.add("inactive");
    } else if (search_data) {
      search_users(search_data)
    } else {
      return;
    }
  })

  // !! ScrollBars !!
  document.addEventListener("DOMContentLoaded", function () {
    OverlayScrollbars(document.querySelectorAll("body"), {});
  });
})();