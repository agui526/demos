$(function () {

    let data = {
        client_id: 'a9289d21b4dd2cd324f6',
        client_secret: '55268db5991f35ab4a721d59cc687ac95da54280'
    }
    let timerUser, timerRepos, timerMore;
    let userRepos;
    let flag = false;
    let page = 1;

    let $user = $('#username');
    let $search = $('#search');
    let $more = $('.more');

    $user.on('keyup', function (event) {

        clearTimeout(timerUser);

        let fetchUser, fetchRepos;

        if ($user.val().length === 0) return;

        timerUser = setTimeout(async function () {

            if (fetchUser) fetchUser.abort();
            if (fetchRepos) fetchRepos.abort();

            try {
                fetchUser = $.ajax({
                    url: `https://api.github.com/users/${$user.val()}`
                }, data);
                fetchRepos = $.ajax({
                    url: `https://api.github.com/users/${$user.val()}/repos`
                }, data);

                let [user, repos] = await Promise.all([fetchUser, fetchRepos]);
                userRepos = repos;
                showProfile(user);
                showRepos(repos);

            } catch (error) {
                clear();
            }

        }, 300);

    })

    $search.on('keyup', function (event) {

        clearTimeout(timerRepos);

        // if ($(this).val().length === 0) return;

        let searchRepo = $(this).val().trim();

        timerRepos = setTimeout(function () {
            if (searchRepo) {
                showRepos(userRepos.filter((repo) => repo.name.indexOf(searchRepo) > -1));
                flag = !!searchRepo;
            } else if(!searchRepo && flag) {
                showRepos(userRepos);
                flag = false;
            } else {
                return;
            }
        }, 300)
    })

    $more.on('click', function(event) {

        page++;

        (async function() {
            let url = `https://api.github.com/users/${$user.val()}/repos?page=${page}`;
            let res = await fetch(url, data);
            let repos = await res.json();
            userRepos = userRepos.concat(repos);
            showRepos(userRepos);
        })()

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

    function showRepos(repos) {

        repos.sort((a, b) => b.stargazers_count - a.stargazers_count)

        let reposHTML = repos.map(function (repo) {
            return `<a href="${repo.html_url}" class="panel-block panel-repo" target="_blank">
          <span class="panel-icon"><i class="octicon octicon-repo"></i></span>
          ${repo.name}
          <span class="star-count">${repo.stargazers_count}</span> 
          <i class="octicon octicon-star"></i>
        </a>`
        }).join('')

        $('.reposList').html(reposHTML)
    };

    function clear() {
        $('.profile').html('')
        $('.reposList').html('')
    };

})