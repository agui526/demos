$(function () {

    let $user = document.querySelector('#username');

    let data = {
        client_id: 'a9289d21b4dd2cd324f6',
        client_secret: '55268db5991f35ab4a721d59cc687ac95da54280'
    }
    let timerId;

    $user.on('keyup', function (event) {

        clearTimeout(timerId);

        let fetchUser, fetchRepos;

        if ($(this).val().trim().length === 0) return;

        timerId = settimerout(async function () {

            try {
                fetchUser = $.ajax({
                    url: `https://api.github.com/users/${$(this).val()}`
                }, data);
                fetchRepos = $.ajax({
                    url: `https://api.github.com/users/${$(this).val()}/repos`
                }, data);

                let [user, repos] = await Promise.all([fetchUser, fetchRepos]);

                showProfile(user);

            } catch (error) {
                clear();
            }

        }, 300);

    })

    function showProfile(user) {
        $('.profile').html(`
        <div class="card">
        <div class="card-header">
          <p class="card-header-title">${user.name}</p>
        </div>
        <div class="user"> 
          <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
          <div class="info">
            <p class="item">关注数 <strong>${user.following}</strong></p>
            <p class="item">粉丝数 <strong>${user.followers}</strong></p>
            <p class="item">仓库数 <strong>${user.public_repos}</strong></p>
            <p class="item">所在地 <strong>${user.location}</strong></p>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" href="${user.html_url}" target="_blank">
            <i class="octicon octicon-mark-github" style="margin-right: 8px"></i>
            Github 主页
          </a>
        </footer>
      </div>
        `);
    };

    function clear() {
        $('.profile').html('')
        $('.repos').html('')
    };


})